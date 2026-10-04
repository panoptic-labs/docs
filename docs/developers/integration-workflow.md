---
sidebar_position: 5
sidebar_label: How an integration works
---

# How a Panoptic integration works

A trading integration combines SDK protocol functions with your application's wallet, state, and user interface. This guide maps the lifecycle before you implement it. For a runnable first step, [read a live market](./v2-integration).

**Discover a market → connect a wallet → fund collateral → construct a position → simulate → sign a transaction → refresh positions**

## The trading lifecycle

| Step | SDK or data source | Your application supplies |
| --- | --- | --- |
| Discover a market | [Pool discovery](../subgraph/queries#discover-pools), then `getPoolMetadata` and `getPool` | Select a chain and PanopticPool; verify its tokens, underlying AMM, and RiskEngine on-chain. |
| Connect a wallet | A viem wallet client passed to SDK write functions | Wallet connection and authorization, account selection, and chain checks. Keep signing under the user's control. |
| Fund collateral | Collateral reads and deposit/approval transaction wrappers | Select the collateral token and amount, request approval, and wait for successful funding transactions. |
| Construct a position | `fetchPoolId`, `createTokenIdBuilder`, and `decodeTokenId` | The intended strategy, denomination, size, strike, width, leg ratios, and risk partners. Reconcile existing positions before changing them. |
| Simulate | `simulateOpenPosition` or `simulateClosePosition` | The complete existing position list, price bounds, builder code where applicable, and settlement choices. Display the result and handle failures. |
| Sign and submit | `openPosition` or `closePosition` | A wallet client and account, user review, and transaction status handling. Keep submitted parameters consistent with the reviewed simulation. |
| Refresh positions | Transaction `wait()`, RPC reads, and `syncPositions` | Verify receipt success, reconcile account state, and persist tracking progress before dependent operations. |

Function parameters depend on the installed SDK release. Consult that release's types and [SDK documentation](https://github.com/panoptic-labs/panoptic-sdk) when implementing each step.

## Data sources and freshness

The SDK V2 protocol layer uses RPC for pool, collateral, simulation, and transaction operations. An application may use [production subgraphs](../subgraph/queries) to discover pools, accounts, and historical records. Indexed data can lag the chain; use current RPC state for collateral and solvency decisions.

Keep block metadata with dynamic reads. Separately fetched values are not automatically a consistent account snapshot. A simulation describes the state it evaluated: prices, liquidity, utilization, or account state can change before submission.

Position reconstruction needs sufficient RPC history and the account's complete position set. `syncPositions` and storage adapters provide tracking primitives; your application chooses persistence, resumes synchronization, and handles pending transactions and reorgs. An empty position list means the account has no positions, not that discovery has not finished.

Server-side code should use plain SDK functions. React hooks belong in React components. Application state, persistence, and subgraph orchestration remain outside the RPC-only protocol layer.

## Before submitting a position change

1. Verify the connected account, chain, PanopticPool, tokens, and RiskEngine. Engine parameters are pool-specific; do not apply the crypto engine's collateral ratios to a stocks pool.
2. Reconcile the account's **complete** existing position IDs. Pass them as `existingPositionIds` to the simulation and write. An empty array means no existing positions; it must not be used as a placeholder when discovery is incomplete.
3. Select the TokenId, position size, tick bounds, spread limit, builder code, and swap/premia behavior deliberately. Respect token decimals and the pool's tick grid. Do not treat permissive tick limits or a default fee assumption as a safe production configuration.
4. Confirm balances, approvals, and collateral funding, then simulate the intended operation. A successful simulation can become stale as prices, liquidity, utilization, or account state change.
5. Submit through the wallet after user review. The write wrapper returns a transaction result with `wait()`; verify receipt success and refresh the account from RPC before another dependent operation.

Closing a position follows the same simulate, sign, confirm, and refresh sequence. Read the updated collateral state before attempting a withdrawal; collateral that supports remaining positions may not be withdrawable.

## RiskEngine and source versions

Read the pool's engine address and its deployed getters. Source-code defaults, SDK estimates, and indexed parameter descriptions do not override deployed values. A new RiskEngine requires moving to a pool configured with that engine and migrating the relevant positions/state; existing pools do not switch engines automatically.

Use the [public contract repository](https://github.com/panoptic-labs/panoptic-v2-core) for contract implementation details and the [parameter reference](../contracts/parameters) for documented deployment snapshots. The [read-only quickstart](./v2-integration) validates pool metadata; it does not verify every risk helper or execute this transaction lifecycle.
