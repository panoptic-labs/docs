# Force Exercise Cost

Force exercise is a mechanism that allows any user to close another user's out-of-range long option positions. When a position is force exercised, the exerciser must pay a cost to the position holder as compensation for the involuntary closure. This page details how that cost is calculated.

## Overview

The force exercise mechanism serves several purposes:

1. **Liquidity Management**: Returns liquidity to the Uniswap pool from positions that are unlikely to be exercised naturally
2. **Capital Efficiency**: Frees up collateral that is locked in far out-of-the-money positions
3. **Market Health**: Prevents accumulation of "dead" positions that consume protocol resources

## Cost Calculation

The `exerciseCost` function computes the fee that an exerciser must pay:

```solidity
function exerciseCost(
    int24 currentTick,
    int24 oracleTick,
    TokenId tokenId,
    PositionBalance positionBalance
) external view returns (LeftRightSigned exerciseFees)
```

### Inputs

| Parameter | Description |
|-----------|-------------|
| `currentTick` | Current price tick from Uniswap |
| `oracleTick` | Price from the protocol's internal oracle |
| `tokenId` | The position being force exercised |
| `positionBalance` | Position data including size |

### Output

`exerciseFees` returns a LeftRight-packed value containing:
- **Right slot**: Fee amount in token0
- **Left slot**: Fee amount in token1

Negative values indicate fees paid **to** the position holder.

## Cost Components

The exercise cost has two components:

### 1. Base Exercise Fee

A percentage of the position's notional value based on how far the position is from being in-range:

```solidity
int256 fee = hasLegsInRange ? -int256(FORCE_EXERCISE_COST) : -int256(ONE_BPS);
```

| Condition | Fee |
|-----------|-----|
| Any leg in-range | `FORCE_EXERCISE_COST` (configurable base rate) |
| All legs out-of-range | `ONE_BPS` (0.1% = 10 basis points) |

The fee is applied to the total long amounts:
```solidity
exerciseFees = exerciseFees
    .addToRightSlot(int128((longAmounts.rightSlot() * fee) / int256(DECIMALS)))
    .addToLeftSlot(int128((longAmounts.leftSlot() * fee) / int256(DECIMALS)));
```

### 2. Oracle Price Differential

Compensation for any price differential between the current tick and oracle tick:

```solidity
exerciseFees = exerciseFees.sub(
    LeftRightSigned.wrap(0)
        .addToRightSlot(
            int128(uint128(currentValue0)) - int128(uint128(oracleValue0))
        )
        .addToLeftSlot(
            int128(uint128(currentValue1)) - int128(uint128(oracleValue1))
        )
);
```

This ensures the position holder isn't disadvantaged if the current price deviates from the oracle price.

## Range Detection

A leg is considered "in-range" if the current tick falls within its liquidity range:

```solidity
int24 range = int24(
    int256(Math.unsafeDivRoundingUp(
        uint24(tokenId.width(leg) * tokenId.tickSpacing()),
        2
    ))
);

if (Math.abs(currentTick - tokenId.strike(leg)) < range) {
    hasLegsInRange = true;
}
```

### Visual Representation

```
Price
  ^
  |                           [In Range - Higher Fee]
  |                        ┌───────────────────────┐
  |                        │    Liquidity Range    │
  |    ◄──── range ────►   │                       │
  |                        └───────────────────────┘
  |                              strike
  |
  |  [Out of Range - Lower Fee]
  +──────────────────────────────────────────────────► Tick
```

## Legs Considered

The exercise cost calculation only considers **long option legs**:

```solidity
for (uint256 leg = 0; leg < tokenId.countLegs(); ++leg) {
    // Skip short legs
    if (tokenId.isLong(leg) == 0) continue;
    
    // Skip credit/loan legs (width = 0)
    if (tokenId.width(leg) == 0) continue;
    
    // ... process this leg
}
```

Short legs and width-0 legs (credits/loans) are excluded because:
- Short positions can't be force exercised
- Credits and loans don't have a liquidity range concept

## Price Differential Compensation

For each long leg, the function calculates the difference in position value between the current and oracle prices:

```solidity
LiquidityChunk liquidityChunk = PanopticMath.getLiquidityChunk(
    tokenId, leg, positionBalance.positionSize()
);

// Value at current price
(currentValue0, currentValue1) = Math.getAmountsForLiquidity(
    currentTick, liquidityChunk
);

// Value at oracle price
(oracleValue0, oracleValue1) = Math.getAmountsForLiquidity(
    oracleTick, liquidityChunk
);
```

### Why This Matters

When the current price crosses a long chunk's range:
- The chunk's composition changes (swaps between token0 and token1)
- This change can be at a price more or less favorable than market
- The compensation ensures the exercisee isn't harmed by temporary price deviations

### Example

Consider a long position with range [1000, 1100] (price in token1/token0 terms):

| Scenario | Current Price | Oracle Price | Compensation |
|----------|---------------|--------------|--------------|
| Current > Oracle | 1050 | 1025 | Exercisee compensated |
| Current < Oracle | 1000 | 1025 | Exerciser benefits |
| Current = Oracle | 1025 | 1025 | No compensation |

## Cost Structure Summary

The total exercise cost to the exerciser consists of:

```
Exercise Cost = Base Fee + Price Differential Compensation

Where:
- Base Fee = (position notional) × (fee rate)
- Fee Rate = FORCE_EXERCISE_COST if any leg in-range
           = ONE_BPS (0.1%) if all legs out-of-range
- Price Differential = Σ(oracleValue - currentValue) for all long legs
```

## Design Rationale

### Why Charge a Cost?

1. **Fair Compensation**: Position holders shouldn't have their positions closed without compensation
2. **Spam Prevention**: Prevents griefing attacks where exercisers repeatedly close positions
3. **Strategic Alignment**: Higher costs for in-range positions discourage premature exercise

### Why Different Rates for In-Range vs Out-of-Range?

- **In-Range Positions**: Have higher potential value; require higher compensation
- **Out-of-Range Positions**: Lower probability of becoming valuable; minimal fee sufficient

### Why Use Oracle Price for Compensation?

- Prevents manipulation where exerciser moves the current price before exercising
- Ensures fair value regardless of temporary price fluctuations
- Oracle provides a more stable reference for settlement

## Negative Fee Values

Note that exercise fees are returned as **negative values** because they represent outflows from the exerciser to the position holder:

```solidity
// Start with negative base fee
int256 fee = hasLegsInRange ? -int256(FORCE_EXERCISE_COST) : -int256(ONE_BPS);
```

This convention ensures:
- Positive values = received by exerciser
- Negative values = paid by exerciser

## Interaction with Liquidation

Force exercise is distinct from liquidation:

| Aspect | Force Exercise | Liquidation |
|--------|----------------|-------------|
| Target | Out-of-range long positions | Insolvent accounts |
| Initiator pays | Yes (exercise cost) | No (receives bonus) |
| Position holder | Receives compensation | Loses collateral |
| Purpose | Liquidity management | Risk management |

## Related: Liquidation Bonus

While not directly part of exercise cost, the `getLiquidationBonus` function computes bonuses for liquidators. This is covered separately as it applies to insolvent accounts rather than force exercises.

The liquidation bonus:
- Compensates liquidators for gas and risk
- Is capped at min(collateralBalance/2, collateral deficit)
- Includes cross-token substitution logic when one token is in surplus
