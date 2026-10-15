# Utilization and Collateral Ratios

Collateral-vault utilization measures assets deployed relative to the vault's accounted assets; it is distinct from utilization of an individual AMM liquidity chunk. Use `CollateralTracker.getPoolData()` for the former and the position-manager interfaces for the latter.

## Collateral curves

The proxy tiers' [parameter tables](/docs/contracts/parameters) provide `TARGET_POOL_UTIL`, `SATURATED_POOL_UTIL`, base option ratios, loan margin, and cross-token buffers.

The seller curve keeps its base ratio below the target, increases toward full collateralization between target and saturation, and uses full collateralization above saturation. Composite-strategy adjustments can alter the starting ratio. The buyer base ratio is constant in these engines; it does not decrease to half its value as utilization rises.

Loan legs use the seller curve with baseline `LOAN_MARGIN_DIVISOR × MAINT_MARGIN_RATE`, then divide the result by `LOAN_MARGIN_DIVISOR`. With divisor 4, additional loan margin rises from 10% to 25% for blue chip and stays at 25% for xStocks. Principal is required in addition to this margin.

## Per-token portfolio utilization

Position balances record utilization when positions are minted. Each position uses its own recorded utilization for collateral requirements. The account-wide maximum for each token feeds only the cross-buffer ramp. In safe mode, the pool-supplied sentinel causes those maxima to be floored at 91% for both new tiers. Read both tokens' state; one token's utilization does not describe the other.

## Cross buffers

Below saturation, the cross-buffer curve returns the configured coefficient. From 90% to 95% utilization it decreases linearly to zero. This discounts surplus used across tokens rather than changing the value of collateral used for its own token's requirement.

The new base coefficients are 90% for both blue-chip tokens and 75% for both xStocks tokens. The legacy snapshot verifies the earlier direct engines at 90%, 92.5%, and 95%; it does not verify the proxy release. See [collateral accounting](./04-collateral-overview.md) and the [RiskEngine reference](/docs/contracts/V2/RiskEngine/contract.RiskEngine).
