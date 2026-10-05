# Risk Engine Overview

A Panoptic V2 RiskEngine defines collateral, solvency, oracle, interest, and fee policy for a pool. User positions and balances live in PanopticPool and CollateralTracker, rather than in the risk engine.

## Select the pool's engine

Read `PanopticPool.riskEngine()` before applying parameters. The active [crypto blue-chip](/docs/contracts/parameters#crypto-blue-chip), [stocks](/docs/contracts/parameters#stocks), and [inverted stocks](/docs/contracts/parameters#stocks-inverted) engines differ in collateral ratios, loan margin, cross-token buffers, and oracle periods. The parameter page records observations for each address on Ethereum and Robinhood.

The two stock engines use the same stock risk-policy source with reversed token0/token1 cross buffers. A pool's token ordering determines how those coefficients affect its collateral; a symbol such as USDC alone does not identify the engine.

## Responsibilities

- [Collateral and solvency](./04-collateral-overview.md): evaluate complete portfolios in both underlying tokens, including streamia (streaming premium) and interest effects.
- [Oracle system](./01-oracle-system.md) and [safe mode](./02-safe-mode.md): select risk-check prices and restrict operations during divergence or guardian intervention.
- [Interest model](./09-interest-rate-model.md): determine borrow rates from utilization and stored market state.
- [Fees](./10-fee-structure.md): provide commission rates, builder routing, and exercise-cost parameters.
- [Third-party operations](./15-dispatchfrom-entrypoint.md): calculate risk and settlement inputs for liquidation, exercise, and streamia settlement.

## Modularity and migration

The RiskEngine address is part of a pool's immutable clone arguments. Modularity allows different pools to select different risk policies; it does not make an existing pool's engine replaceable.

Moving to a new RiskEngine requires migrating positions/state to a pool configured with that engine. Deployment of a replacement engine does not migrate balances or positions automatically. The guardian can lock or unlock safe mode but cannot change the pool's engine through those controls.

See the [RiskEngine reference](/docs/contracts/V2/RiskEngine/contract.RiskEngine), [stock reference](/docs/contracts/V2/RiskEngine/contract.RiskEngineXStocks), and [PanopticPool reference](/docs/contracts/V2/contract.PanopticPool) for interfaces and pinned public source.
