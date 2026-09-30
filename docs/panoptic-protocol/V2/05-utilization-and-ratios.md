# Utilization and Collateral Ratios

Collateral-vault utilization measures assets deployed relative to the vault's accounted assets; it is distinct from utilization of an individual AMM liquidity chunk. Use `CollateralTracker.getPoolData()` for the former and the position-manager interfaces for the latter.

## Collateral curves

The active engines' [parameter tables](/docs/contracts/parameters) provide `TARGET_POOL_UTIL`, `SATURATED_POOL_UTIL`, base option ratios, loan margin, and cross-token buffers.

The seller curve keeps its base ratio below the target, increases toward full collateralization between target and saturation, and uses full collateralization above saturation. Composite-strategy adjustments can alter the starting ratio. The buyer base ratio is constant in these engines; it does not decrease to half its value as utilization rises.

Loan legs use the seller-curve calculation with `MAINT_MARGIN_RATE` as their additional margin baseline. They do not simply substitute the short-option base ratio or assume zero utilization.

## Per-token portfolio utilization

Position balances record utilization when positions are minted. The RiskEngine derives portfolio utilization for each collateral token from the open positions and uses it in requirement calculations. Read both tokens' state; one token's utilization does not describe the other.

## Cross buffers

Below saturation, the cross-buffer curve returns the configured coefficient. From 90% to 95% utilization it decreases linearly to zero. This discounts surplus used across tokens rather than changing the value of collateral used for its own token's requirement.

The snapshot verifies the curve at 90%, 92.5%, and 95% for both token coefficients of every active engine. See [collateral accounting](./04-collateral-overview.md) and the [RiskEngine reference](/docs/contracts/V2/RiskEngine/contract.RiskEngine).
