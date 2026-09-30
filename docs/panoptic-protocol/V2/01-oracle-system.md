# Oracle System

Panoptic V2 uses internal AMM-derived observations for risk and solvency. Describing option pricing as oracle-free does not mean that collateral checks operate without price observations.

## Engine-specific periods

The engine exposes `EMA_PERIODS`, packing four 24-bit periods in seconds: spot, fast, slow, and eons. Read the [engine-specific tables](/docs/contracts/parameters) for the current values. The stock engines use longer periods than the crypto blue-chip engine.

`OraclePack` stores smoothed ticks, rolling observations, an epoch, and a guardian lock. Its layout is separate from the packed period configuration. Use the [OraclePack reference](/docs/contracts/V2/types/library.OraclePackLibrary) for encoding and decoding.

## Updating observations

`PanopticPool.pokeOracle()` allows permissionless updates; position operations also interact with the oracle. Observation updates use 64-second epochs and depend on interactions, so an epoch boundary does not guarantee a transaction or fresh observation.

The update logic smooths ticks over the configured periods, limits convergence, and clamps observation movement using `MAX_CLAMP_DELTA`. These controls do not make spot, EMA, median, and latest-observation ticks interchangeable.

## Solvency prices

`getSolvencyTicks` normally checks the spot-derived oracle tick. When the squared deviations from the median exceed the engine's threshold, or safe mode is active, it returns four checks: spot, median, latest observation, and current AMM tick.

`dispatchFrom` uses its own four-tick solvency assessment, including the TWAP-derived tick. Do not substitute the normal mint solvency check when estimating liquidation eligibility.

See [safe mode](./02-safe-mode.md), [dispatchFrom](./15-dispatchfrom-entrypoint.md), and the [RiskEngine reference](/docs/contracts/V2/RiskEngine/contract.RiskEngine) for the call-specific rules. Keep reads at a common block when comparing observations with balances and position state.
