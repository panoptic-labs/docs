# Utilization and Collateral Ratios

Pool utilization is a fundamental metric that affects collateral requirements throughout the Panoptic Protocol. This page explains how utilization is tracked and how it influences the collateral ratios for different position types.

## Understanding Pool Utilization

Pool utilization measures the balance between buying and selling activity in a Panoptic pool. When more users are selling options (providing liquidity to the pool), utilization is low. When more users are buying options (removing liquidity from the pool), utilization increases.

### Utilization Thresholds

Two key thresholds define the utilization curve:

| Parameter | Value | Description |
|-----------|-------|-------------|
| `TARGET_POOL_UTIL` | 50% | Optimal utilization where buying and selling are balanced |
| `SATURATED_POOL_UTIL` | 90% | High utilization threshold where selling requires 100% collateral |

These values are configured as fractions of `DECIMALS` (10,000,000):
- Target: 5,000,000 (50%)
- Saturated: 9,000,000 (90%)

## Global Utilization

The `_getGlobalUtilization` function determines the highest utilization level across all of a user's positions:

```solidity
function _getGlobalUtilization(
    PositionBalance[] calldata positionBalanceArray
) internal pure returns (PositionBalance globalUtilizations)
```

### Why Global Utilization Matters

Each position records the pool utilization at the time it was minted. When computing collateral requirements for an account:

1. The protocol finds the **maximum** utilization from any position (for each token independently)
2. This maximum is used as the "global utilization" for the entire portfolio
3. All positions are then evaluated using this global utilization

**Rationale**: This approach is conservative. If any position was opened during high utilization, that elevated risk level applies to the entire portfolio, ensuring adequate collateral coverage.

```solidity
for (uint256 i; i < pLength; ) {
    int256 _utilization0 = positionBalance.utilization0();
    int256 _utilization1 = positionBalance.utilization1();
    
    // Keep the higher utilization
    utilization0 = _utilization0 > utilization0 ? _utilization0 : utilization0;
    utilization1 = _utilization1 > utilization1 ? _utilization1 : utilization1;
}
```

## Seller Collateral Ratio

The `_sellCollateralRatio` function determines how much collateral sellers must post:

```solidity
function _sellCollateralRatio(
    int256 utilization
) internal view returns (uint256 sellCollateralRatio)
```

### Collateral Curve for Sellers

```
SELL
COLLATERAL
RATIO
          ^
          |                  max ratio = 100%
   100% - |                _------
          |             _-¯
          |          _-¯
    20% - |---------¯
          |         .       . .
          +---------+-------+-+--->   POOL_
                   50%    90% 100%     UTILIZATION
```

### Calculation

| Utilization Range | Collateral Ratio |
|-------------------|------------------|
| 0% - 50% (Target) | `SELLER_COLLATERAL_RATIO` (base rate, e.g., 20%) |
| 50% - 90% | Linear interpolation from base to 100% |
| > 90% (Saturated) | 100% |

**Formula** (for utilization between target and saturated):
```
sellRatio = minSellRatio + 
    ((DECIMALS - minSellRatio) × (utilization - TARGET)) / 
    (SATURATED - TARGET)
```

### Strangle Adjustment

For strangle positions (indicated by negative utilization), sellers receive 2× capital efficiency:

```solidity
if (utilization < 0) {
    min_sell_ratio /= 2;
    utilization = -utilization;
}
```

This reflects the fact that only one side of a strangle can be in-the-money at any given time.

## Buyer Collateral Ratio

The `_buyCollateralRatio` function determines how much collateral buyers must post:

```solidity
function _buyCollateralRatio(
    uint256 utilization
) internal view returns (uint256 buyCollateralRatio)
```

### Collateral Curve for Buyers

```
BUY
COLLATERAL
RATIO
       ^
       |   buy_ratio = 10%
 10% - |----------__       min_ratio = 5%
 5%  - | . . . . .  ¯¯¯--______
       |         .       . .
       +---------+-------+-+--->   POOL_
                50%    90% 100%      UTILIZATION
```

### Calculation

| Utilization Range | Collateral Ratio |
|-------------------|------------------|
| 0% - 50% (Target) | `BUYER_COLLATERAL_RATIO` (e.g., 10%) |
| 50% - 90% | Linear interpolation from base to base/2 |
| > 90% (Saturated) | `BUYER_COLLATERAL_RATIO / 2` (e.g., 5%) |

**Formula** (for utilization between target and saturated):
```
buyRatio = (BUYER_RATIO + 
    (BUYER_RATIO × (SATURATED - utilization)) / 
    (SATURATED - TARGET)) / 2
```

### Design Rationale

The buyer ratio **decreases** with increasing utilization because:
- High utilization means the pool needs more buyers
- Lower buyer collateral incentivizes buying
- Buyers return funds to the pool, reducing utilization

## Cross-Buffer Ratio

The `_crossBufferRatio` function determines how much surplus collateral in one token can be used to cover requirements in the other:

```solidity
function _crossBufferRatio(
    int256 utilization,
    uint256 crossBuffer
) internal view returns (uint256 crossBufferRatio)
```

### Cross-Buffer Curve

```
CROSS
BUFFER
RATIO
       ^
       |   cross_buffer = 80%
 80% - |----------_
       |         . ¯-_
       |         .    ¯-_
 0% -  +---------+-------∓---+--->   POOL_
                50%     90% 100%      UTILIZATION
```

### Calculation

| Utilization Range | Cross-Buffer Ratio |
|-------------------|-------------------|
| 0% - 50% (Target) | `CROSS_BUFFER` (e.g., 80%) |
| 50% - 90% | Linear decrease from base to 0% |
| > 90% (Saturated) | 0% (no cross-margining) |

**Formula** (for utilization between target and saturated):
```
crossRatio = (crossBuffer × (SATURATED - utilization)) / 
             (SATURATED - TARGET)
```

### How Cross-Buffering Works in Solvency

When checking solvency:

```solidity
// Calculate scaled surplus that can be cross-margined
uint256 scaledSurplusToken0 = Math.mulDiv(
    bal0 > maintReq0 ? bal0 - maintReq0 : 0,
    _crossBufferRatio(globalUtilizations.utilization0(), CROSS_BUFFER_0),
    DECIMALS
);
```

Example:
- User has 100 token0 surplus
- Global utilization is 60% (between target and saturated)
- Cross-buffer at 60% might be ~60%
- Scaled surplus = 100 × 0.60 = 60 token0 can help cover token1 requirements

### Why Cross-Buffer Decreases with Utilization

High utilization signals:
- Potential liquidity stress
- Higher risk of rapid price movements
- Need for more conservative margin

Reducing cross-buffer benefits at high utilization ensures accounts maintain adequate collateral in each token independently, reducing systemic risk.

## Utilization in Practice

### At Position Mint

When a user opens a position:
1. Current pool utilization is recorded in the `PositionBalance`
2. This utilization is stored with the position for its lifetime
3. Future collateral checks use this recorded utilization

### At Solvency Check

When checking account health:
1. All positions' utilizations are compared
2. The maximum utilization becomes the "global" utilization
3. Collateral ratios are computed using this global utilization
4. Cross-buffer benefits are scaled by global utilization

### Effect on Position Types

| Position Type | Effect of Higher Utilization |
|--------------|------------------------------|
| Short options | Higher collateral requirement |
| Long options | Lower collateral requirement (incentive) |
| Strangles | Higher requirement, but still 50% discount |
| Cross-margin | Reduced benefit |

## Summary

The utilization system creates dynamic collateral requirements that:

1. **Protect the protocol** during high-demand periods
2. **Incentivize balance** between buyers and sellers
3. **Reduce cross-margin benefits** when risk is elevated
4. **Use conservative accounting** via global utilization

This design ensures the protocol remains well-collateralized across varying market conditions while providing capital efficiency during normal operation.
