---
sidebar_position: 3
sidebar_label: Simulate your first position
---

# Simulate your first position

Construct a small short call on the Ethereum ETH/USDC market and ask the contracts whether it could open. Read its collateral impact without signing or submitting a transaction.

Start with the project and pinned **SDK 1.0.25** installation from [Read your first market](./v2-integration). Use the same Ethereum RPC configuration.

:::note What you will see
The default address is an unfunded demonstration address. Expect a collateral rejection, not a successful trade preview. **Never send funds to this address.** To evaluate the successful path, optionally set `PANOPTIC_ACCOUNT` to an already funded account with no open legs in this pool; only its public address is needed. Funding an account is outside this tutorial.
:::

## What the example constructs

| Input | Choice and meaning |
| --- | --- |
| Market | The same Ethereum V2 pool as the first tutorial; the script checks the token addresses and ordering. |
| Strategy | One short call leg: `asset: 0n`, `tokenType: 0n` (set by `addCall`), `isLong: false`. Here token0 is ETH and token1 is USDC. |
| Strike | The current pool tick rounded to its tick spacing. You do not need to invent a tick. |
| Width | Two tick-spacing units; the decoded output shows the lower and upper ticks. |
| Size | `1_000_000_000n` protocol position-size units, a small illustrative input. This is **not** 1 ETH, 1 USDC, or a dollar notional. |
| Existing positions | An empty list only after `getAccountCollateral` confirms zero open legs at the simulation block. Accounts with existing legs stop before simulation. |
| Bounds | Current tick plus/minus one tick spacing. These are illustrative tick bounds, not a percentage slippage setting. |
| Other choices | No swap at mint, no premia as collateral, and builder code zero. `spreadLimit: 0n` disables that additional limit; this is not a production execution policy. |

This example is deliberately specific to one pool and one token ordering. See [position identity and denomination](./core-concepts#position-identity-and-denomination) before adapting it to another market or a multi-leg strategy.

## Run the simulation

Save this as `simulate-position.mjs`:

```js
import {createPublicClient, getAddress, http, formatUnits} from 'viem'
import {mainnet} from 'viem/chains'
import {
  getPool, getPoolMetadata, getAccountCollateral, createTokenIdBuilder,
  decodeTokenId, roundToTickSpacing, simulateOpenPosition,
} from '@panoptic-eng/sdk/v2'

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.ETHEREUM_RPC_URL, {timeout: 10_000, retryCount: 1}),
})
if (await client.getChainId() !== mainnet.id) throw new Error('Expected Ethereum mainnet')
const poolAddress = '0x00000000563b70d704f4c6675a5f6ac989fbae13'
const account = getAddress(process.env.PANOPTIC_ACCOUNT ?? '0x000000000000000000000000000000000000dEaD')
const blockNumber = await client.getBlockNumber()
const metadata = await getPoolMetadata({client, poolAddress})
if (metadata.token0Asset !== '0x0000000000000000000000000000000000000000' ||
  metadata.token1Asset.toLowerCase() !== '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48') {
  throw new Error('This example requires ETH as token0 and USDC as token1')
}
const pool = await getPool({client, poolAddress, chainId: 1n, blockNumber})
const collateral = await getAccountCollateral({client, poolAddress, account, blockNumber})
if (collateral.legCount !== 0n) {
  throw new Error('This first-position example requires an account with no open legs in this pool')
}
const strike = roundToTickSpacing(pool.currentTick, metadata.tickSpacing)
const positionSize = 1_000_000_000n
const tokenId = createTokenIdBuilder(metadata.poolId)
  .addCall({asset: 0n, isLong: false, optionRatio: 1n, strike, width: 2n})
  .build()
const tokenAmount = (amount, decimals) => formatUnits(amount, Number(decimals))
console.log(JSON.stringify({
  account, blockNumber, market: 'ETH/USDC', strategy: 'One short call leg',
  tokenId, legs: decodeTokenId(tokenId).legs, positionSize,
  depositedCollateral: {
    ETH: tokenAmount(collateral.token0.assets, metadata.token0Decimals),
    USDC: tokenAmount(collateral.token1.assets, metadata.token1Decimals),
  },
}, (_, value) => typeof value === 'bigint' ? value.toString() : value, 2))

try {
  const result = await simulateOpenPosition({
    client, poolAddress, account, chainId: 1n, blockNumber,
    existingPositionIds: [], tokenId, positionSize,
    tickLimitLow: pool.currentTick - metadata.tickSpacing,
    tickLimitHigh: pool.currentTick + metadata.tickSpacing,
    spreadLimit: 0n, swapAtMint: false, usePremiaAsCollateral: false, builderCode: 0n,
  })
  if (!result.success) {
    console.log({status: 'rejected', reason: result.error.errorName ?? result.error.message.match(/Error: (\w+)\(/)?.[1] ?? 'SimulationFailed'})
  } else {
    const data = result.data
    console.log({
      status: 'simulated',
      token0: {
        symbol: metadata.token0Symbol,
        required: tokenAmount(data.amount0Required, metadata.token0Decimals),
        postCollateral: tokenAmount(data.postCollateral0, metadata.token0Decimals),
        requirement: tokenAmount(data.postMintCollateralReqToken0, metadata.token0Decimals),
      },
      token1: {
        symbol: metadata.token1Symbol,
        required: tokenAmount(data.amount1Required, metadata.token1Decimals),
        postCollateral: tokenAmount(data.postCollateral1, metadata.token1Decimals),
        requirement: tokenAmount(data.postMintCollateralReqToken1, metadata.token1Decimals),
      },
      commission0: data.commission0,
      commission1: data.commission1,
    })
  }
} catch {
  throw new Error('Simulation request failed. Check RPC availability and the troubleshooting guide.')
}
```

Run it from the same project:

```sh
node simulate-position.mjs
```

The script derives pool metadata and the strike, reads collateral, checks the existing leg count, and pins dynamic reads and simulation to one block. It creates no wallet client and requests no signature. To inspect an already funded account instead, set `PANOPTIC_ACCOUNT` to its public address and rerun; leave private keys out of this project.

## Interpret a rejected result

On Ethereum at block `26107609`, the default account had zero ETH and USDC collateral. The script reached the contract simulation and reported:

```text
{ status: 'rejected', reason: 'NotEnoughTokens' }
```

This is a completed simulation whose proposed operation cannot execute in that state. It is different from an RPC request that fails before a result is available. A different block can produce a different rejection if pool conditions change.

Do not treat a rejected result as a quote, replace an unknown position list with `[]`, or repeatedly loosen bounds until the call passes. Check the account's collateral and the reported constraint. The [troubleshooting guide](./troubleshooting#simulation-results) describes the next checks.

## Interpret a successful result

The successful branch was exercised on an isolated Ethereum fork of block `26107609`, with 1 ETH and 1,000 USDC deposited for the demonstration account **on the fork only**. No live-chain transaction was sent. It returned approximately:

```text
status: simulated
ETH required:          -0.000000000557539145
ETH postCollateral:     1.000000000557539144
ETH requirement:        0.00000000020047982
USDC required:          0.000002
USDC postCollateral:    999.999997
USDC requirement:      0
commission0:           null
commission1:           null
```

These values illustrate the fields; they are not a current quote or recommended collateral amounts. Share conversion rounding explains why the pre-simulation collateral can be slightly below the deposited amounts.

| Output | How to interpret it |
| --- | --- |
| `required` | Signed decrease in collateral assets during the simulated operation, in the named token. A negative value means collateral assets increase. It is not the minimum deposit or the full collateral requirement. |
| `postCollateral` | Simulated collateral assets after the operation. This is not necessarily withdrawable collateral. |
| `requirement` | The SDK's decoded post-mint collateral requirement for that token. In this first-position example it covers one position. It is not a standalone maximum-leverage or liquidation calculation. |
| `commission0`, `commission1` | `null` means this simulation cannot separately extract the commission. It does not mean zero fees. |
| `blockNumber` | The state evaluated by the simulation. It can become stale before a later transaction. |

Keep ETH and USDC amounts separate. Do not add them or subtract one token's requirement from the other's balance. The RiskEngine controls cross-collateral treatment. In SDK 1.0.25, collateral-requirement fields may also remain zero when enrichment cannot decode them; do not use those fields alone to authorize a trade. Contract simulation is the execution check.

## Costs and risk beyond this preview

The asset movements are not an all-in price. [Trading commissions](../contracts/parameters#fees-and-builder-routing), [streaming premia](../product/streamia), borrowing interest when applicable, and transaction gas are different costs. Future premia and interest depend on subsequent market and account conditions; this call does not quote them for a holding period.

A successful simulation does not establish a maximum loss, guarantee a future fill, or verify a liquidation price. A production integration also needs strategy-aware sizing, complete position discovery for existing accounts, fresh risk checks, wallet authorization, receipt handling, and reconciliation. Continue with [How an integration works](./integration-workflow) and [Capabilities and support](./capabilities).

Ready to exercise transaction handling locally? Follow [Complete your first trade lifecycle](./trade-lifecycle) for a funded sandbox and runnable scripts.
