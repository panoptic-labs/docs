---
sidebar_position: 1
sidebar_label: V2 SDK quickstart
---

# Integrate Panoptic v2

Use [`@panoptic-eng/sdk`](https://github.com/panoptic-labs/panoptic-sdk) for typed v2 protocol reads, simulations, position tracking, and transaction wrappers. The public contract source is [`panoptic-v2-core`](https://github.com/panoptic-labs/panoptic-v2-core). Start with the [architecture](../contracts/smart-contracts-overview), [deployment addresses](../contracts/deployment-addresses), and the configuration of the pool's [RiskEngine](../contracts/parameters).

The example below targets the published SDK **1.0.25**, using its `@panoptic-eng/sdk/v2` entry point. Repository code and newer releases may expose different fields or entry points; consult the installed package's types. V1/v1.1 contract interfaces and old Sepolia subgraph examples are not interchangeable with v2.

## Install and read a pool

Use an ESM project (`"type": "module"` in `package.json`) and Node.js 20.19 or newer:

```sh
pnpm add @panoptic-eng/sdk@1.0.25 viem@2.41.2 react@18.3.1 react-dom@18.3.1 wagmi@2.19.5 @tanstack/react-query@5.90.2
```

Version 1.0.25 imports React-related peers from its v2 entry point, including when calling plain functions in Node. The install command includes those peers; this example does not use hooks or require a React provider. For TypeScript, enable `strict` mode and target ES2022.

Set `ETHEREUM_RPC_URL` to your Ethereum RPC endpoint and `PANOPTIC_POOL_ADDRESS` to an actual **v2 PanopticPool** on Ethereum. Use [pool discovery](../subgraph/queries#discover-pools) if you do not have a pool address, then check the deployment and engine on-chain. A factory, RiskEngine, underlying Uniswap pool, or v4 pool ID is not a PanopticPool address.

Save this as `read-pool.mjs` and run `node read-pool.mjs`:

```js
import {createPublicClient, getAddress, http, isAddress} from 'viem';
import {mainnet} from 'viem/chains';
import {getPoolMetadata, fetchPoolId} from '@panoptic-eng/sdk/v2';
const rpcUrl = process.env.ETHEREUM_RPC_URL;
const poolInput = process.env.PANOPTIC_POOL_ADDRESS;
if (!rpcUrl || !poolInput || !isAddress(poolInput)) {
  throw new Error('Set ETHEREUM_RPC_URL and a valid PANOPTIC_POOL_ADDRESS');
}
const client = createPublicClient({chain: mainnet, transport: http(rpcUrl)});
if (await client.getChainId() !== mainnet.id) throw new Error('Wrong RPC chain');
const poolAddress = getAddress(poolInput);
const metadata = await getPoolMetadata({client, poolAddress});
const {poolId, _meta} = await fetchPoolId({client, poolAddress});
console.log({
  poolAddress,
  poolId: poolId.toString(),
  blockNumber: _meta.blockNumber.toString(),
  riskEngine: metadata.riskEngineAddress,
  token0: metadata.token0Asset,
  token1: metadata.token1Asset,
  isV4: metadata.isV4,
  tickSpacing: metadata.tickSpacing.toString(),
});
```

This is a read-only example. `fetchPoolId` returns the encoded pool identifier plus the block metadata for its read. `getPoolMetadata` separately reads pool/token metadata; it is not an atomic account-risk snapshot. Keep integer values as `bigint` internally and convert them to strings for JSON or display.

For Robinhood, use its RPC, chain ID **4663**, and the matching viem chain configuration. Check `client.getChainId()` before selecting deployments. Do not reuse an address or cached state from another chain merely because it has the same hexadecimal representation.

## Build an integration

| Task | SDK v2 exports | Integration responsibility |
| --- | --- | --- |
| Pool and collateral reads | `getPoolMetadata`, `getPool`, `getAccountCollateral` | Select the correct chain/pool and keep block metadata with dynamic reads. |
| Position identity | `fetchPoolId`, `createTokenIdBuilder`, `decodeTokenId` | Validate token ordering, asset denomination, strike/width, leg ratios, and risk partners for the intended strategy. |
| Position reconstruction | `syncPositions`, `createMemoryStorage`, `createFileStorage`, `getTrackedPositionIds` | Supply RPC history, persist state where needed, and reconcile transactions and reorgs. |
| Simulation | `simulateOpenPosition`, `simulateClosePosition` | Supply the complete existing position list, size, explicit tick bounds, and intended settlement options. Handle unsuccessful results and thrown errors. |
| Submission | `openPosition`, `closePosition` | Provide the wallet client and account, review the transaction, wait for its receipt, then refresh state. |

The SDK v2 protocol layer uses RPC. An application may use the [production subgraphs](../subgraph/queries) to discover accounts and historical records, but indexed data is not a substitute for current collateral or solvency checks. Server-side code should call plain SDK functions. Application state, persistence choices, and subgraph orchestration belong outside the protocol read/write layer.

## Before submitting a position change

1. Verify the connected account, chain, PanopticPool, tokens, and RiskEngine. Engine parameters are pool-specific; do not apply the crypto engine's collateral ratios to a stocks pool.
2. Reconcile the account's **complete** existing position IDs. Pass them as `existingPositionIds` to the simulation and write. An empty array means no existing positions; it must not be used as a placeholder when discovery is incomplete.
3. Select the TokenId, position size, tick bounds, spread limit, builder code, and swap/premia behavior deliberately. Respect token decimals and the pool's tick grid. Do not treat permissive tick limits or a default fee assumption as a safe production configuration.
4. Confirm balances, approvals, and collateral funding, then simulate the intended operation. A successful simulation can become stale as prices, liquidity, utilization, or account state change.
5. Submit through the wallet after user review. The write wrapper returns a transaction result with `wait()`; verify receipt success and refresh the account from RPC before another dependent operation.

The quickstart deliberately does not submit a trade. Strategy construction, funding, price limits, and wallet authorization require application-specific inputs. Consult the installed SDK's parameter types rather than copying a generic trade with arbitrary size or strike.

## RiskEngine and source versions

Read the pool's engine address and its deployed getters. Source-code defaults, SDK estimates, and indexed parameter descriptions do not override deployed values. A new RiskEngine requires moving to a pool configured with that engine and migrating the relevant positions/state; existing pools do not switch engines automatically.

Use the [public contract repository](https://github.com/panoptic-labs/panoptic-v2-core) for contract implementation details and the [parameter reference](../contracts/parameters) for documented deployment snapshots. The read-only example validates pool metadata; it does not verify every risk helper or execute the simulation/submission workflow.
