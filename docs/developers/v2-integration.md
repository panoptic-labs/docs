---
sidebar_position: 2
sidebar_label: Read your first market
---

# Read your first market

Read the tokens, protocol version, underlying AMM, and RiskEngine of an ETH/USDC market on Ethereum. This example uses public reads only: no wallet, private key, funds, or transaction signing is required.

## 1. Create a project

Use Node.js 20.19 through 22.x and pnpm. In a new directory:

```sh
mkdir panoptic-first-market
cd panoptic-first-market
pnpm init
pnpm add @panoptic-eng/sdk@1.0.25 viem@2.41.2 react@18.3.1 react-dom@18.3.1 wagmi@2.19.5 @tanstack/react-query@5.90.2
```

This walkthrough pins SDK **1.0.25**. That published release imports React-related peers from its `/v2` entry point even for plain Node functions, so the command includes them. No React provider is needed. Newer releases and repository source may have different exports; use the installed package's types.

## 2. Read the market

Save the following as `read-market.mjs`. The `.mjs` extension enables ES modules without changing `package.json`.

The example selects Ethereum Panoptic V2 pool `0x00000000563b70d704f4c6675a5f6ac989fbae13`, which uses the Uniswap v4 ETH/USDC market. This is a PanopticPool address, not a factory, RiskEngine, or underlying Uniswap pool identifier.

```js
import {createPublicClient, http} from 'viem'
import {mainnet} from 'viem/chains'
import {getPoolMetadata, fetchPoolId} from '@panoptic-eng/sdk/v2'

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.ETHEREUM_RPC_URL, {timeout: 10_000, retryCount: 1}),
})
if (await client.getChainId() !== mainnet.id) throw new Error('Expected Ethereum mainnet')
const poolAddress = '0x00000000563b70d704f4c6675a5f6ac989fbae13'
const metadata = await getPoolMetadata({client, poolAddress})
const {poolId, _meta} = await fetchPoolId({client, poolAddress})
console.log(JSON.stringify({
  market: `${metadata.token0Symbol}/${metadata.token1Symbol}`,
  chainId: mainnet.id,
  panopticVersion: 'V2',
  underlyingAmm: metadata.isV4 ? 'Uniswap v4' : 'Uniswap v3',
  poolAddress,
  token0: {
    symbol: metadata.token0Symbol,
    address: metadata.token0Asset,
    decimals: metadata.token0Decimals.toString(),
  },
  token1: {
    symbol: metadata.token1Symbol,
    address: metadata.token1Asset,
    decimals: metadata.token1Decimals.toString(),
  },
  riskEngine: metadata.riskEngineAddress,
  poolId: poolId.toString(),
  tickSpacing: metadata.tickSpacing.toString(),
  blockNumber: _meta.blockNumber.toString(),
}, null, 2))
```

Run it:

```sh
node read-market.mjs
```

When `ETHEREUM_RPC_URL` is unset, viem uses its default public Ethereum RPC. If it is unavailable or throttled, set `ETHEREUM_RPC_URL` to your full Ethereum RPC endpoint and rerun the command. Keep credential-bearing URLs out of source control and shared error logs. This pinned SDK release does not expose the newer RPC configuration helpers.

## 3. Understand the result

The pool metadata below was checked on Ethereum at block `26107487` using published SDK 1.0.25. The example reads the latest block, so `blockNumber` will change:

| Field | Expected value | Meaning |
| --- | --- | --- |
| `market` | `ETH/USDC` | Symbols in the pool's token0/token1 order. |
| `chainId` | `1` | Ethereum mainnet. |
| `panopticVersion` | `V2` | The protocol version selected by this example. |
| `underlyingAmm` | `Uniswap v4` | The AMM used by this Panoptic pool. |
| `token0.decimals` | `"18"` | Native ETH precision; its asset address is the zero address. |
| `token1.decimals` | `"6"` | USDC precision. |
| `riskEngine` | `0x000000000000075e29cdaa9cb640a69e148ca7da` | The pool's collateral and fee policy contract; address casing may differ. |
| `poolId` | A decimal string | The encoded Panoptic pool identifier used to construct positions. |
| `tickSpacing` | `"60"` | The underlying market's tick grid. |
| `blockNumber` | A decimal string | The block reported by `fetchPoolId`. |

`getPoolMetadata` and `fetchPoolId` are separate reads. This output identifies the market; it is not an atomic account-risk snapshot or evidence that a proposed trade can execute. Integer values stay as `bigint` during processing and become strings for JSON output.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| A missing React, Wagmi, or React Query module | Install all packages in step 1 for SDK 1.0.25, even in Node. |
| Import or module syntax error | Use Node 20.19 through 22.x, save the file with `.mjs`, and run it from the project where dependencies were installed. |
| Timeout, HTTP 429, or RPC connection error | Check connectivity and retry after the endpoint's backoff period. Public RPC capacity is shared; set `ETHEREUM_RPC_URL` to your own endpoint if the default is throttled. |
| `Expected Ethereum mainnet` | Your client must use Ethereum chain ID 1 and an Ethereum RPC endpoint. |
| Contract read fails after changing the address | Use a deployed V2 PanopticPool on the selected chain. A factory, underlying AMM pool, or pool ID cannot replace it. |

For further setup and RPC issues, see [Troubleshooting](./troubleshooting).

## Next steps

Continue with [Simulate your first position](./simulate-position) to construct a short call and evaluate it without signing a transaction.

Follow [How an integration works](./integration-workflow) to connect market reads to collateral funding, position construction, simulation, and transaction tracking.

To explore another market, use [pool discovery](../subgraph/queries#discover-pools) and [deployment addresses](../contracts/deployment-addresses), then verify the selected pool on-chain. Changing chains also requires the matching client configuration; addresses and cached state are chain-specific.
