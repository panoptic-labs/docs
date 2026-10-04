import {
  createPublicClient,
  createWalletClient,
  createTestClient,
  http,
  parseEther,
  keccak256,
  encodeAbiParameters,
  toHex,
  erc20Abi,
  formatUnits,
} from 'viem'
import { mainnet } from 'viem/chains'
import {
  getPoolMetadata,
  getPool,
  getAccountCollateral,
  getOpenPositionIds,
  getPositions,
  createTokenIdBuilder,
  roundToTickSpacing,
  approveAndWait,
  depositAndWait,
  simulateOpenPosition,
  openPositionAndWait,
  simulateClosePosition,
  closePositionAndWait,
  simulateWithdraw,
  withdrawAndWait,
} from '@panoptic-eng/sdk/v2'
import {
  FORK_BLOCK,
  SANDBOX_CHAIN_ID,
  LOCAL_RPC,
  requireSandbox,
} from './safety.mjs'

const chain = { ...mainnet, id: SANDBOX_CHAIN_ID, name: 'Panoptic sandbox' }
const transport = http(LOCAL_RPC, { timeout: 15_000, retryCount: 0 })
const client = createPublicClient({ chain, transport })
const account = '0x000000000000000000000000000000000000dEaD'
const poolAddress = '0x00000000563b70d704f4c6675a5f6ac989fbae13'
const positionSize = 1_000_000_000n

function requireSuccess(receipt) {
  if (receipt.status !== 'success')
    throw new Error('Transaction reverted; reread account state')
  console.log(
    'Confirmed:',
    receipt.hash,
    'at block',
    receipt.blockNumber.toString(),
  )
}

function requirePreview(result) {
  if (!result.success) {
    const name =
      result.error.errorName ??
      result.error.message.match(/Error: (\w+)\(/)?.[1]
    throw new Error(
      `Simulation rejected: ${name ?? 'inspect local RPC and account state'}`,
    )
  }
  console.log('Simulation passed')
}

async function readAccount() {
  const blockNumber = await client.getBlockNumber({ cacheTime: 0 })
  const collateral = await getAccountCollateral({
    client,
    poolAddress,
    account,
    blockNumber,
  })
  const ids =
    collateral.legCount === 0n
      ? []
      : await getOpenPositionIds({
          client,
          poolAddress,
          account,
          chainId: BigInt(SANDBOX_CHAIN_ID),
          fromBlock: FORK_BLOCK + 1n,
          toBlock: blockNumber,
        })
  if (!ids)
    throw new Error(
      'Position recovery incomplete; refusing to use an empty list',
    )
  const result = await getPositions({
    client,
    poolAddress,
    owner: account,
    tokenIds: ids,
    blockNumber,
  })
  const recoveredLegs = result.positions.reduce(
    (sum, position) => sum + BigInt(position.legs.length),
    0n,
  )
  if (recoveredLegs !== collateral.legCount)
    throw new Error('Recovered leg count differs from account state')
  return { blockNumber, collateral, positions: result.positions, ids }
}

async function main() {
  const action = process.argv[2]
  if (!['fund', 'open', 'status', 'close', 'withdraw'].includes(action)) {
    throw new Error('Choose fund, open, status, close, or withdraw')
  }
  await requireSandbox(client)
  const metadata = await getPoolMetadata({ client, poolAddress })
  if (
    metadata.token0Asset !== '0x0000000000000000000000000000000000000000' ||
    metadata.token1Asset.toLowerCase() !==
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  ) {
    throw new Error('Unexpected fixture tokens')
  }
  const state = await readAccount()
  if (action !== 'status') {
    const testClient = createTestClient({ chain, transport, mode: 'anvil' })
    await testClient.impersonateAccount({ address: account })
    const walletClient = createWalletClient({ chain, transport, account })
    const write = { client, walletClient, account }
    if (action === 'fund') {
      if (
        state.blockNumber !== FORK_BLOCK ||
        state.ids.length ||
        state.collateral.token0.shares ||
        state.collateral.token1.shares
      ) {
        throw new Error(
          'Fixture already used; restart Anvil before funding again',
        )
      }
      await testClient.setBalance({
        address: account,
        value: parseEther('100'),
      })
      const assets = 1_000_000_000n
      // USDC balance mapping slot 9 is specific to this pinned Ethereum fixture.
      await testClient.setStorageAt({
        address: metadata.token1Asset,
        index: keccak256(
          encodeAbiParameters(
            [{ type: 'address' }, { type: 'uint256' }],
            [account, 9n],
          ),
        ),
        value: toHex(assets, { size: 32 }),
      })
      const balance = await client.readContract({
        address: metadata.token1Asset,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account],
      })
      if (balance !== assets)
        throw new Error('USDC fixture balance verification failed')
      requireSuccess(
        await approveAndWait({
          ...write,
          tokenAddress: metadata.token1Asset,
          spenderAddress: metadata.collateralToken1Address,
          amount: assets,
        }),
      )
      requireSuccess(
        await depositAndWait({
          ...write,
          collateralTrackerAddress: metadata.collateralToken1Address,
          assets,
        }),
      )
      requireSuccess(
        await depositAndWait({
          ...write,
          collateralTrackerAddress: metadata.collateralToken0Address,
          assets: parseEther('1'),
          isNativeETH: true,
        }),
      )
    } else if (action === 'open' || action === 'close') {
      // Pool deployment lookups use Ethereum; transactions remain on sandbox chain 31337.
      const pool = await getPool({
        client,
        poolAddress,
        chainId: 1n,
        blockNumber: state.blockNumber,
      })
      const params = {
        client,
        poolAddress,
        account,
        positionSize,
        builderCode: 0n,
        tickLimitLow: pool.currentTick - metadata.tickSpacing,
        tickLimitHigh: pool.currentTick + metadata.tickSpacing,
        spreadLimit: 0n,
        swapAtMint: false,
        usePremiaAsCollateral: false,
      }
      if (action === 'open') {
        if (state.ids.length)
          throw new Error(
            'Close the existing example position before opening another',
          )
        const tokenId = createTokenIdBuilder(metadata.poolId)
          .addCall({
            asset: 0n,
            isLong: false,
            optionRatio: 1n,
            strike: roundToTickSpacing(pool.currentTick, metadata.tickSpacing),
            width: 2n,
          })
          .build()
        const intent = { ...params, tokenId, existingPositionIds: state.ids }
        requirePreview(
          await simulateOpenPosition({
            ...intent,
            chainId: 1n,
            blockNumber: state.blockNumber,
          }),
        )
        requireSuccess(await openPositionAndWait({ ...intent, walletClient }))
      } else {
        const [position] = state.positions
        if (state.positions.length !== 1 || !position)
          throw new Error('Expected exactly one example position')
        const intent = {
          ...params,
          tokenId: position.tokenId,
          positionSize: position.positionSize,
          positionIdList: state.ids,
        }
        requirePreview(
          await simulateClosePosition({
            ...intent,
            blockNumber: state.blockNumber,
          }),
        )
        requireSuccess(await closePositionAndWait({ ...intent, walletClient }))
      }
    } else {
      if (state.ids.length)
        throw new Error('Close the position before withdrawing')
      for (const collateralTrackerAddress of [
        metadata.collateralToken0Address,
        metadata.collateralToken1Address,
      ]) {
        const fresh = await getAccountCollateral({
          client,
          poolAddress,
          account,
          blockNumber: await client.getBlockNumber({ cacheTime: 0 }),
        })
        const assets =
          collateralTrackerAddress === metadata.collateralToken0Address
            ? fresh.token0.availableAssets
            : fresh.token1.availableAssets
        if (assets === 0n) continue
        const intent = { ...write, collateralTrackerAddress, assets }
        requirePreview(await simulateWithdraw(intent))
        requireSuccess(await withdrawAndWait(intent))
      }
    }
  }
  const refreshed = await readAccount()
  console.log(
    JSON.stringify(
      {
        block: refreshed.blockNumber.toString(),
        positions: refreshed.ids.map(String),
        collateral: {
          ETH: formatUnits(refreshed.collateral.token0.assets, 18),
          USDC: formatUnits(refreshed.collateral.token1.assets, 6),
        },
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Lifecycle failed')
  process.exitCode = 1
})
