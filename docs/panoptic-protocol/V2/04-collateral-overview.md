# Collateral Tracking Overview

V2 evaluates a portfolio using both tokens of its underlying AMM pool. Start with the pool's `riskEngine()`, `collateralToken0()`, and `collateralToken1()`; do not infer token ordering from display labels or an assumed quote currency.

## Balances and requirements

`getMargin` returns per-token balances and maintenance requirements, with requirements in each result's left slot and balances in its right slot. Both are in raw units of the corresponding token. This is informational output; use `isAccountSolvent` for the engine's buffered, cross-token decision.

The calculation includes positions, eligible streamia (streaming premium), interest owed, and collateral shares converted to assets. The new implementation aggregates requirements and credits in `uint256`, saturates requirements above `uint128` capacity so oversized requirements remain insolvent, and rejects per-token loan totals above `int128.max` with `PositionTooLarge`. A base collateral ratio multiplied by notional is not a complete portfolio requirement.

In-range short requirements use a `1 - c/2` slope, where `c` is the applicable collateral ratio, to reflect closing cost for wide short positions. The out-of-the-money decay floor is 10 basis points of notional. These adjustments are applied within the leg and strategy calculations, not as a flat portfolio-wide percentage.

## Cross-token collateral

The engine computes each token's surplus after its own buffered requirement. It scales that surplus with the corresponding `CROSS_BUFFER_0` or `CROSS_BUFFER_1` curve before converting it to support the other token's deficit. Conversion direction and rounding depend on price; raw token0 and token1 amounts must never be added directly.

The proxy release uses symmetric coefficients: 90%/90% for blue chip and 75%/75% for xStocks. Legacy stock engines reverse their asymmetric coefficients between token0 and token1. The [parameter page](/docs/contracts/parameters) separates these configurations and explains the utilization-dependent reduction in cross support.

## Portfolio composition

Supply the complete, aligned position ID and balance lists. The engine evaluates multi-leg positions and eligible risk partners, then aggregates requirements in the correct token. Combining calls, puts, loans, or credits does not imply every pair is eligible for netting.

Checks must cover a single leg, a multi-leg strategy, and a portfolio with requirements in both tokens. For mixed-asset portfolios, verify both token orderings, each direction of surplus-to-deficit support, and prices on either side of a unit raw-token ratio. Token decimals belong in display conversions, not arbitrary changes to encoded contract amounts.

## Maintenance versus action buffers

Maintenance solvency and buffered checks after an action are distinct. The engine's `BP_DECREASE_BUFFER` provides additional headroom for applicable actions. Safe mode can require solvency at multiple ticks. Read the [per-engine parameters](/docs/contracts/parameters) and use the relevant pool simulation rather than treating a single displayed collateral percentage as an executable trade limit.

References: [RiskEngine](/docs/contracts/V2/RiskEngine/contract.RiskEngine), [CollateralTracker](/docs/contracts/V2/contract.CollateralTracker), and [composite strategies](./07-composite-strategies.md).
