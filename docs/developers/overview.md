---
sidebar_position: 1
sidebar_label: Overview
---

# Build with Panoptic

Use the TypeScript SDK to read options markets, simulate trades, manage positions, and inspect collateral and risk. Panoptic V2 supports perpetual options and lending on Uniswap v3 and v4 pools.

:::note Integration status
External app and builder onboarding is early-stage. Start by evaluating the SDK with the read-only quickstart. A production integration requires application-specific funding, wallet authorization, position tracking, and transaction recovery. Builder onboarding is not yet ready for general external integrations.
:::

## Choose your starting point

| Goal | Start here | What you will learn |
| --- | --- | --- |
| Read a live market | [Read your first market](./v2-integration) | Install a pinned SDK release and read an ETH/USDC pool on Ethereum without a wallet or funds. |
| Preview a position | [Simulate your first position](./simulate-position) | Construct a short call, handle rejection, and interpret collateral impact without signing. |
| Execute in a sandbox | [Complete a trade lifecycle](./trade-lifecycle) | Fund, open, recover, close, and withdraw on a local fork with no real funds. |
| Plan a trading integration | [How an integration works](./integration-workflow) | Follow the trading lifecycle and understand what the SDK handles and what your application supplies. |
| Explore the protocol | [Contract architecture](../contracts/smart-contracts-overview) | Understand the contracts behind markets, collateral, and risk. |

Before planning an integration, read [Core concepts](./core-concepts) and [Capabilities and support](./capabilities). For setup and simulation failures, use [Troubleshooting](./troubleshooting).

## What you can build with the SDK

[`@panoptic-eng/sdk`](https://github.com/panoptic-labs/panoptic-sdk) provides typed functions for:

- Reading pool metadata, collateral, and risk parameters.
- Constructing multi-leg positions and simulating position changes.
- Depositing collateral and submitting transactions through a wallet client.
- Reconstructing positions from events and tracking transaction results.

The SDK's V2 protocol functions read from chain RPC and submit transactions through your wallet. Applications can also use [subgraphs](../subgraph/queries) for discovery and historical records. See [data sources and freshness](./integration-workflow#data-sources-and-freshness) before choosing how to assemble account state.

## Automated delta hedging

The [Panoptic hedger bot](https://github.com/panoptic-labs/panoptic-hedger-bot#readme) monitors a Safe's option delta and adjusts hedge loans through scoped Zodiac Roles permissions. Its repository documents setup, preflight checks, dry-run inspection, and explicit live activation. Review the enabled roles and rehearse on a fork before operating it; the SDK tutorials here do not verify the bot's deployment or permissions.

## Understand the instruments

Panoptic options have no scheduled expiry and use [streamia (streaming premium)](../product/streamia). Integrations need to account for ongoing streamia, borrowing interest where applicable, trading commissions, and collateral requirements. Start with the [protocol introduction](../intro) and [risk overview](../panoptic-protocol/risks).

**Panoptic V2** is the protocol version. **Uniswap v3/v4** identifies the underlying AMM. A Panoptic V2 pool can use either AMM; V1 and V1.1 contract interfaces are not interchangeable with V2.

## Reference material

- [SDK source and documentation](https://github.com/panoptic-labs/panoptic-sdk): installation, exported functions, and examples. Use the types from the package version you install.
- [Deployment addresses](../contracts/deployment-addresses): contracts grouped by chain and protocol version.
- [RiskEngine parameters](../contracts/parameters): collateral policy, fees, and builder routing for documented deployments.
- [Public contract source](https://github.com/panoptic-labs/panoptic-v2-core): implementation details.
- [Security and audits](../security/security_audits): reports and their scope.

Continue with [Read your first market](./v2-integration).
