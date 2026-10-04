---
sidebar_position: 7
sidebar_label: Capabilities and support
---

# Capabilities and support

Use this page to scope an evaluation. **External app and builder onboarding remains early-stage.** SDK functionality and documentation examples do not constitute a production service commitment.

The checks below use published **SDK 1.0.25**, Node.js **22.22.0**, and viem **2.41.2**. They describe the examples exercised for these guides, not certification of every SDK operation or deployment.

## Available and demonstrated

| Capability | Evidence | Boundary |
| --- | --- | --- |
| TypeScript SDK from a plain Node script | [Read your first market](./v2-integration) ran with the pinned published package in a separate project. | This release also needs the listed React peers installed. No hooks are used. |
| Ethereum market metadata | The ETH/USDC V2 pool returned token addresses, decimals, AMM type, pool ID, and RiskEngine. | One documented pool; arbitrary pool and engine combinations were not exercised. |
| First-position simulation | [Simulation tutorial](./simulate-position): unfunded rejection on Ethereum and successful simulation with funded collateral on an isolated fork. | One short call, ETH token0 / USDC token1. No live trade was submitted. |
| Indexed discovery examples | The [subgraph examples](../subgraph/queries) were checked against Ethereum and Robinhood production schemas and endpoints. | Discovery and history can lag or have incomplete relationships; RPC state remains authoritative for execution checks. |

The [local trade lifecycle](./trade-lifecycle) additionally verifies approvals, deposits, opening, position recovery in a fresh process, closing, and withdrawal on a pinned Ethereum fork. It uses an impersonated local account, not a live wallet integration.

## Available with integration work

| Capability | Available surface | Work the app still owns |
| --- | --- | --- |
| Other documented chains and markets | [Deployment addresses](../contracts/deployment-addresses) and typed SDK reads. | Verify each selected chain, pool, RiskEngine, and published SDK behavior. A deployment listing is not an end-to-end integration test. |
| Deposits, approvals, opening, closing, and withdrawals | SDK transaction wrappers. | Funding UX, wallet authorization, simulations, successful receipts, and account refresh. These tutorials do not validate a live transaction lifecycle. |
| Existing accounts and multi-leg positions | Position reconstruction, TokenId helpers, and simulations. | Complete position discovery, persistence, reorg recovery, strategy-aware sizing, and both token orderings. The tutorial stops when existing legs are detected. |
| Historical data and updates | RPC event tracking and subgraph queries. | Indexing-lag handling, pagination, provider history limits, reconnects, and reconciliation. |
| React applications | SDK React hooks. | Wallet/provider setup and client lifecycle. Use plain SDK functions in server code. |
| Automated delta hedging | [Hedger-bot source and operator documentation](https://github.com/panoptic-labs/panoptic-hedger-bot#readme). | Separate Safe/role setup, preflight checks, dry-run inspection, activation, and ongoing monitoring. Bot operations are not verified by these SDK examples; review the scope of every enabled role. |
| Builder fee routing | Deployed builder-wallet mechanism and [engine-specific fee splits](../contracts/parameters#fees-and-builder-routing). | Code activation and revenue collection require coordination; this is not self-service onboarding. |

## Not verified or not offered by these guides

| Area | Current expectation |
| --- | --- |
| General external builder onboarding | Not ready. A builder code must resolve to a deployed wallet; factory deployment is owner-controlled. See [BuilderFactory](../contracts/V2/RiskEngine/contract.BuilderFactory). |
| React Native, Expo, and native mobile | Not verified by these examples. A TypeScript package alone does not establish mobile runtime or wallet compatibility. |
| Embedded wallets, smart accounts, and delegated/session signing | No supported end-to-end recipe is established here. Confirm the exact account and authorization flow before planning a launch. |
| Hosted trading HTTP API or managed portfolio stream | These guides document direct SDK/RPC integration, not a hosted service with an availability or latency commitment. |
| Managed testnet with funded example accounts | The tutorials offer a local fork with test funding, plus Ethereum reads and read-only simulations. They do not promise an operated test environment or faucet. |
| Capacity for a particular MAU count | Not benchmarked here. Evaluate concurrent sessions, request patterns, RPC cost, data freshness, and transaction recovery for the intended workload. |

## Before planning a production launch

Use the [integration workflow](./integration-workflow) to identify application responsibilities. Agree on target networks, wallet model, market coverage, and builder activation with the team before committing to an external launch date. Record the SDK version and deployed RiskEngine used in your own verification.
