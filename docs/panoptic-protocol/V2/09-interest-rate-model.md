# Adaptive Interest Rate Model

V2 adjusts borrow rates according to collateral-vault utilization and stored `rateAtTarget`. The current rate depends on market state and elapsed time, not only an immutable constant.

## Parameters and units

The [per-engine tables](/docs/contracts/parameters) expose the WAD-scaled target utilization, curve steepness, minimum and maximum target rates, initial target rate, adjustment speed, and elapsed-time cap. The proxy release stores these fields internally; use verified implementation configuration rather than legacy getters. Rates use per-second units. Annualizing a per-second rate is not the same as quoting compounded APY.

`TARGET_UTILIZATION` belongs to the interest model and uses WAD scaling; `TARGET_POOL_UTIL` belongs to collateral calculations and uses the engine's `DECIMALS`. Keep them distinct even when their displayed percentages are similar.

Both new tiers set the minimum rate at target to approximately 2% annualized, raised from 0.1%. This bounds the adaptive target rate, not each depositor's yield: the actual borrow rate and lender return still depend on utilization.

## Rate evolution

The model normalizes deviation from target utilization, adjusts the rate at target over time within bounds, and applies a utilization curve around that rate. `updateInterestRate` returns an average rate for accrual and an ending rate-at-target value. The elapsed-time cap limits the adaptation interval; it should not be described as forgiving borrowing interest after that interval.

Each CollateralTracker maintains its own market state. Token0 and token1 can have different utilization and rates. Lending yield also depends on utilization and losses; the quoted borrower rate is not a guaranteed depositor yield.

See [interest accrual](./11-interest-accrual.md), the [RiskEngine reference](/docs/contracts/V2/RiskEngine/contract.RiskEngineProxy), and the [CollateralTracker reference](/docs/contracts/V2/contract.CollateralTracker).
