# Risk Engine Overview

A Panoptic V2 RiskEngine defines collateral, solvency, oracle, interest, and fee policy for a pool. User positions and balances live in PanopticPool and CollateralTracker.

The proxy-based RiskEngine release launched on Ethereum Mainnet and Robinhood Chain on October 12, 2026. See [core PR #270](https://github.com/panoptic-labs/panoptic-v2-core/pull/270) and the [October 13 app changelog](https://app.panoptic.xyz/changelog).

## Select the pool's engine

Read `PanopticPool.riskEngine()` before applying parameters. New pools bind to a [RiskEngine proxy](/docs/contracts/V2/RiskEngine/contract.RiskEngineProxy); resolve its implementation and use that implementation's verified configuration. One source now serves crypto blue-chip and xStocks tiers with different constructor parameters. The [parameter page](/docs/contracts/parameters) lists both tiers and retains separate legacy observations.

The new tiers use symmetric cross buffers: 90%/90% for blue chip and 75%/75% for xStocks. Legacy stock engines used asymmetric, reversed buffers. Always preserve the pool's actual token0/token1 ordering when evaluating collateral.

## Responsibilities

- [Collateral and solvency](./04-collateral-overview.md): evaluate complete portfolios in both underlying tokens, including streamia (streaming premium) and interest effects.
- [Oracle system](./01-oracle-system.md) and [safe mode](./02-safe-mode.md): select risk-check prices and restrict operations during divergence or guardian intervention.
- [Interest model](./09-interest-rate-model.md): determine borrow rates from utilization and stored market state.
- [Fees](./10-fee-structure.md): provide commission rates, builder routing, and exercise-cost parameters.
- [Third-party operations](./15-dispatchfrom-entrypoint.md): calculate risk and settlement inputs for liquidation, exercise, and streamia settlement.

## Upgrades and migration

The RiskEngine address is part of each pool's and tracker's immutable clone arguments. For new pools, that address is a transparent proxy. Its ProxyAdmin owner can upgrade the implementation and thereby change risk policy for every pool sharing it, without moving positions or collateral. Pools and collateral trackers remain immutable. Multisig upgrade control is live; timelock and governance control are planned.

The guardian's lock/unlock controls are separate from proxy upgrade authority. Upgrades must preserve the engine interface, packed data layouts, `vegoid()`, and the tier's oracle EMA periods. See the [proxy reference](/docs/contracts/V2/RiskEngine/contract.RiskEngineProxy).

Legacy pools point directly to their original engines and cannot switch to a proxy in place. They remain in close-only mode: existing positions can remain open and earn streamia, but new positions cannot be minted. To adopt the release, close positions, withdraw collateral, and redeposit into a new pool. Future compatible upgrades to the proxy-backed pools do not require this migration.
