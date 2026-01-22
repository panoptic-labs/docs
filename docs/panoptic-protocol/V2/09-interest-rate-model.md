# Adaptive Interest Rate Model

The Panoptic Protocol uses a sophisticated adaptive interest rate model based on a PID controller to dynamically adjust borrow rates based on pool utilization. This system ensures equilibrium between liquidity providers and borrowers while remaining responsive to changing market conditions.

## Overview

The interest rate model is designed to:

1. **Target Optimal Utilization**: Drive pool utilization toward a target level
2. **Adapt to Market Conditions**: Automatically adjust base rates over time
3. **Bound Rate Changes**: Prevent extreme rate swings through capped adjustments
4. **Smooth Responses**: Use time-weighted averaging for stable rate progression

## Core Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `TARGET_UTILIZATION` | 66.67% (2/3) | Optimal pool utilization target |
| `CURVE_STEEPNESS` | 4 | Rate curve multiplier at extremes |
| `MIN_RATE_AT_TARGET` | 0.1% APY | Floor for target rate |
| `MAX_RATE_AT_TARGET` | 200% APY | Ceiling for target rate |
| `INITIAL_RATE_AT_TARGET` | 4% APY | Starting target rate |
| `ADJUSTMENT_SPEED` | 50/year | Rate at which target rate adapts |
| `IRM_MAX_ELAPSED_TIME` | 4096 seconds | Maximum time delta for rate updates |

### WAD Scaling

All rate calculations use WAD (10^18) scaling for precision:
```solidity
int256 internal constant WAD = 1e18;
```

Rates are expressed per second, converted from annual rates:
```solidity
int256 public constant MIN_RATE_AT_TARGET = 0.001 ether / int256(365 days);
int256 public constant MAX_RATE_AT_TARGET = 2.0 ether / int256(365 days);
```

## Interest Rate Functions

### `interestRate`

Returns the current average borrow rate:

```solidity
function interestRate(
    uint256 utilization,
    MarketState interestRateAccumulator
) external view returns (uint128)
```

### `updateInterestRate`

Computes the new interest rate and updated rate-at-target for state updates:

```solidity
function updateInterestRate(
    uint256 utilization,
    MarketState interestRateAccumulator
) external view returns (uint128, uint256)
```

## Rate Calculation Logic

### Step 1: Compute Utilization Error

The error measures how far current utilization is from the target:

```solidity
int256 _utilization = int256(utilization);
int256 errNormFactor = _utilization > TARGET_UTILIZATION
    ? WAD - TARGET_UTILIZATION
    : TARGET_UTILIZATION;
int256 err = Math.wDivToZero(_utilization - TARGET_UTILIZATION, errNormFactor);
```

The error is normalized:
- When utilization > target: `err = (util - target) / (1 - target)`
- When utilization < target: `err = (util - target) / target`

This normalization ensures error ranges from -1 to +1.

### Step 2: Determine Rate-at-Target

#### First Interaction

If no previous rate exists, use the initial value:
```solidity
if (startRateAtTarget == 0) {
    avgRateAtTarget = INITIAL_RATE_AT_TARGET;
    endRateAtTarget = INITIAL_RATE_AT_TARGET;
}
```

#### Subsequent Updates

The rate-at-target adapts based on utilization error over time:

```solidity
// Speed of rate adjustment
int256 speed = Math.wMulToZero(ADJUSTMENT_SPEED, err);

// Time since last update (capped)
int256 elapsed = Math.min(
    int256(block.timestamp) - int256(previousTime),
    IRM_MAX_ELAPSED_TIME
);

int256 linearAdaptation = speed * elapsed;
```

The new rate-at-target is computed as:
```solidity
endRateAtTarget = _newRateAtTarget(startRateAtTarget, linearAdaptation);
```

### Step 3: Apply Exponential Adjustment

The `_newRateAtTarget` function applies exponential adjustment with bounds:

```solidity
function _newRateAtTarget(
    int256 startRateAtTarget,
    int256 linearAdaptation
) private pure returns (int256) {
    return Math.bound(
        Math.wMulToZero(startRateAtTarget, Math.wExp(linearAdaptation)),
        MIN_RATE_AT_TARGET,
        MAX_RATE_AT_TARGET
    );
}
```

Formula: `newRate = startRate × e^(linearAdaptation)`

Bounded between MIN and MAX to prevent extreme values.

### Step 4: Compute Average Rate

The average rate uses trapezoidal integration for accuracy:

```solidity
int256 midRateAtTarget = _newRateAtTarget(startRateAtTarget, linearAdaptation / 2);
avgRateAtTarget = (startRateAtTarget + endRateAtTarget + 2 * midRateAtTarget) / 4;
```

This approximation provides better accuracy than simple linear interpolation.

### Step 5: Apply Rate Curve

The final rate applies the curve function to the average rate-at-target:

```solidity
return uint256(_curve(avgRateAtTarget, err));
```

## Rate Curve Function

The curve function adjusts the rate based on utilization error:

```solidity
function _curve(int256 _rateAtTarget, int256 err) private pure returns (int256) {
    int256 coeff = err < 0
        ? WAD - Math.wDivToZero(WAD, CURVE_STEEPNESS)  // 1 - 1/C = 0.75
        : CURVE_STEEPNESS - WAD;                        // C - 1 = 3
    
    return Math.wMulToZero(Math.wMulToZero(coeff, err) + WAD, _rateAtTarget);
}
```

### Curve Behavior

| Utilization | Error | Multiplier | Effect |
|-------------|-------|------------|--------|
| 0% | -1 | 0.25 | Rate = 25% of target |
| 33% | -0.5 | 0.625 | Rate = 62.5% of target |
| 66.67% | 0 | 1 | Rate = target rate |
| 83% | 0.5 | 2.5 | Rate = 250% of target |
| 100% | 1 | 4 | Rate = 400% of target |

### Visual Representation

```
Borrow
Rate
  ^
  |                                    /
  |                                  /
4x|                                /
  |                              /
  |                           ./
2x|                        .-´
  |                     .-´
1x|...................-´
  |              .-´
0.25x|         .-´
  |       .´
  +-------+-------+-------+-------+---> Utilization
  0%    33%    66.67%   83%   100%
               Target
```

## Time-Capping Mechanism

The `IRM_MAX_ELAPSED_TIME` parameter prevents rate drift during periods of inactivity:

```solidity
int256 elapsed = Math.min(
    int256(block.timestamp) - int256(previousTime),
    IRM_MAX_ELAPSED_TIME  // 4096 seconds ≈ 68 minutes
);
```

This ensures:
- Long periods without interaction don't cause extreme rate changes
- The model remains responsive but bounded
- Gas optimization (no need for frequent keeper transactions)

## Rate Adaptation Examples

### Scenario 1: High Utilization

- Current utilization: 90%
- Target utilization: 66.67%
- Error: (90 - 66.67) / (100 - 66.67) = 0.70
- Rate multiplier: ~3.1x

If target rate is 4%, effective rate ≈ 12.4%

Over time, the high utilization error will cause `rateAtTarget` to increase exponentially, further increasing rates until utilization decreases.

### Scenario 2: Low Utilization

- Current utilization: 30%
- Target utilization: 66.67%
- Error: (30 - 66.67) / 66.67 = -0.55
- Rate multiplier: ~0.59x

If target rate is 4%, effective rate ≈ 2.4%

Over time, the negative error will cause `rateAtTarget` to decrease, lowering rates to attract more borrowers.

### Scenario 3: At Target

- Current utilization: 66.67%
- Error: 0
- Rate multiplier: 1x

Rate equals the target rate, and `rateAtTarget` remains stable.

## State Storage

Rate state is stored in the `MarketState` accumulator:
- **38-bit rateAtTarget**: The current target rate (scaled)
- **32-bit epoch**: Timestamp (shifted by 2 bits for Y2K38 avoidance)

```solidity
int256 startRateAtTarget = int256(uint256(interestRateAccumulator.rateAtTarget()));
uint256 previousTime = interestRateAccumulator.marketEpoch() << 2;
```

## Integration with Collateral Tracking

Interest accumulation affects solvency calculations:

```solidity
// In _getMargin
(uint256 balance0, uint256 interest0) = ct0.assetsAndInterest(user);
(uint256 balance1, uint256 interest1) = ct1.assetsAndInterest(user);

// Interest adds to requirements
tokensRequired = tokensRequired
    .addToRightSlot(uint128(interest0))
    .addToLeftSlot(uint128(interest1));
```

Accrued interest increases the collateral requirement, ensuring borrowers maintain adequate margin as their debt grows.

## Events

When rates are updated, the protocol emits:

```solidity
event BorrowRateUpdated(
    address indexed collateralToken,
    uint256 avgBorrowRate,
    uint256 rateAtTarget
);
```

This enables:
- Off-chain rate tracking
- Historical analysis
- Integration with monitoring systems

## Design Rationale

### Why PID Control?

The PID-style controller provides:
- **Proportional response**: Immediate reaction to utilization changes
- **Integral response**: Long-term rate adaptation (via rateAtTarget)
- **Bounded behavior**: Rate caps prevent extreme values

### Why Exponential Adjustment?

Exponential adjustment (`e^x`) provides:
- Smooth rate transitions
- Percentage-based changes (doubling/halving)
- Natural compounding behavior

### Why Trapezoidal Integration?

The trapezoidal method for average rate calculation:
- More accurate than simple averaging
- Accounts for non-linear rate changes over time
- Prevents systematic under/over-estimation

## Summary

The adaptive interest rate model:

1. **Targets 66.67% utilization** through dynamic rate adjustment
2. **Adapts over time** with exponential rate-at-target changes
3. **Bounds rates** between 0.1% and 200% at target (0.025% to 800% effective)
4. **Uses curve steepness of 4x** for 25%-400% rate range around target
5. **Caps time deltas** to prevent rate drift during inactivity
6. **Integrates with solvency** by adding accrued interest to requirements

This creates a self-regulating system that naturally balances liquidity supply and demand while remaining resilient to market shocks.
