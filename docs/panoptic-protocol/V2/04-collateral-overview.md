# Collateral Tracking Overview

The Panoptic Protocol's collateral system determines how much capital users must maintain to support their option positions. This page provides an overview of the collateral tracking architecture, while subsequent pages detail specific position types and calculation methods.

## Core Concepts

### Maintenance Requirement vs. Balance

Every account is evaluated on two key metrics:

- **Balance**: The total collateral value available to the account
- **Maintenance Requirement**: The minimum collateral needed to keep positions open

An account is **solvent** when its balance exceeds its maintenance requirement. When the balance falls below the requirement, the account becomes subject to liquidation.

### Dual-Token Accounting

The Panoptic Protocol tracks collateral in both tokens of the underlying Uniswap pool:

```solidity
// tokenData0: token0 metrics (right slot = balance, left slot = requirement)
// tokenData1: token1 metrics (right slot = balance, left slot = requirement)
```

This dual-token approach allows:
- Positions collateralized in either token
- Cross-margining between tokens (with haircuts)
- Accurate tracking of multi-token exposures

## Solvency Determination

### The `isAccountSolvent` Function

```solidity
function isAccountSolvent(
    PositionBalance[] calldata positionBalanceArray,
    TokenId[] calldata positionIdList,
    int24 atTick,
    address user,
    LeftRightUnsigned shortPremia,
    LeftRightUnsigned longPremia,
    CollateralTracker ct0,
    CollateralTracker ct1,
    uint256 buffer
) external view returns (bool)
```

This function answers: "Is this account healthy enough to avoid liquidation?"

### Input Parameters

| Parameter | Description |
|-----------|-------------|
| `positionBalanceArray` | Array of position data including size and utilization at mint |
| `positionIdList` | Token IDs of all open positions |
| `atTick` | Price point for evaluation |
| `user` | Account to check |
| `shortPremia` | Premium owed TO the user from short positions |
| `longPremia` | Premium owed BY the user for long positions |
| `ct0`, `ct1` | CollateralTracker contracts for each token |
| `buffer` | Multiplier for additional margin requirement |

### Solvency Logic

The solvency check proceeds in several steps:

#### Step 1: Compute Raw Margin Data

```solidity
(tokenData0, tokenData1, globalUtilizations) = _getMargin(
    positionBalanceArray,
    positionIdList,
    atTick,
    user,
    shortPremia,
    longPremia,
    ct0,
    ct1
);
```

This computes:
- `tokenData0.rightSlot()`: Available balance in token0
- `tokenData0.leftSlot()`: Maintenance requirement in token0
- `tokenData1.rightSlot()`: Available balance in token1
- `tokenData1.leftSlot()`: Maintenance requirement in token1
- `globalUtilizations`: Highest pool utilization from any position

#### Step 2: Apply Buffer to Requirements

```solidity
uint256 maintReq0 = Math.mulDivRoundingUp(tokenData0.leftSlot(), buffer, DECIMALS);
uint256 maintReq1 = Math.mulDivRoundingUp(tokenData1.leftSlot(), buffer, DECIMALS);
```

The buffer provides additional margin during certain operations (like minting) to ensure accounts remain solvent even after the operation completes.

#### Step 3: Compute Surplus Amounts

```solidity
uint256 scaledSurplusToken0 = Math.mulDiv(
    bal0 > maintReq0 ? bal0 - maintReq0 : 0,
    _crossBufferRatio(globalUtilizations.utilization0(), CROSS_BUFFER_0),
    DECIMALS
);
```

Surplus is any collateral exceeding the maintenance requirement. This surplus can be "cross-margined" to help cover shortfalls in the other token, but only after applying a haircut via `_crossBufferRatio`.

#### Step 4: Perform Cross-Asset Solvency Check

The final solvency determination allows surplus from one token to cover deficits in the other:

```solidity
// When sqrtPriceX96 < FP96 (token0 is the numeraire)
bool isSolvent0 = bal0 + convert1to0(scaledSurplusToken1) >= maintReq0;
bool isSolvent1 = convert1to0(bal1) + scaledSurplusToken0 >= convert1to0(maintReq1);
return isSolvent0 && isSolvent1;
```

The account must be solvent in **both** tokens simultaneously after cross-margining.

## Margin Computation

### The `getMargin` Function

For detailed analysis or external queries, the `getMargin` function provides raw margin data without making a solvency decision:

```solidity
function getMargin(
    PositionBalance[] calldata positionBalanceArray,
    int24 atTick,
    address user,
    TokenId[] calldata positionIdList,
    LeftRightUnsigned shortPremia,
    LeftRightUnsigned longPremia,
    CollateralTracker ct0,
    CollateralTracker ct1
) external view returns (
    LeftRightUnsigned tokenData0,
    LeftRightUnsigned tokenData1,
    PositionBalance globalUtilizations
)
```

### What's Included in Balance

The balance (right slot of tokenData) includes:

1. **Base Collateral**: Assets held in the CollateralTracker
2. **Short Premia**: Premium owed to the user from their short positions
3. **Credit Amounts**: Value from credit positions (width=0, isLong=1)

```solidity
balance0 += shortPremia.rightSlot();
balance1 += shortPremia.leftSlot();
balance0 += creditAmounts.rightSlot();
balance1 += creditAmounts.leftSlot();
```

### What's Included in Requirement

The requirement (left slot of tokenData) includes:

1. **Position Requirements**: Collateral needed for each open position
2. **Long Premia**: Premium owed by the user for their long positions
3. **Accrued Interest**: Interest accumulated on any borrowings

```solidity
tokensRequired = tokensRequired.add(longPremia);
tokensRequired = tokensRequired.addToRightSlot(interest0).addToLeftSlot(interest1);
```

## Key Components

### Global Utilization

The protocol tracks the highest utilization level from any of the user's positions:

```solidity
function _getGlobalUtilization(
    PositionBalance[] calldata positionBalanceArray
) internal pure returns (PositionBalance globalUtilizations)
```

This "global utilization" is then used for all positions in the portfolio, ensuring consistent and conservative collateral requirements across the entire account.

See [Utilization and Ratios](./05-utilization-and-ratios.md) for details on how utilization affects collateral requirements.

### Cross-Buffer Ratio

The cross-buffer mechanism allows surplus collateral in one token to help cover requirements in the other, but with a utilization-dependent haircut:

```solidity
function _crossBufferRatio(
    int256 utilization,
    uint256 crossBuffer
) internal view returns (uint256 crossBufferRatio)
```

At low utilization, up to `crossBuffer` (e.g., 80%) of surplus can be cross-margined. As utilization increases, this ratio decreases linearly to 0% at saturated utilization.

See [Utilization and Ratios](./05-utilization-and-ratios.md) for the complete cross-buffer formula.

## Position Aggregation

Total collateral requirements are computed by iterating through all positions:

```solidity
for (uint256 i; i < positionBalanceArray.length; ) {
    (_tokenRequired0, _credits0) = _getRequiredCollateralAtTickSinglePosition(
        tokenId, positionSize, _atTick, utilization0, true  // for token0
    );
    (_tokenRequired1, _credits1) = _getRequiredCollateralAtTickSinglePosition(
        tokenId, positionSize, _atTick, utilization1, false // for token1
    );
    
    tokensRequired = tokensRequired.addToRightSlot(_tokenRequired0).addToLeftSlot(_tokenRequired1);
    creditAmounts = creditAmounts.addToRightSlot(_credits0).addToLeftSlot(_credits1);
}
```

Each position may contribute:
- **Requirements**: Collateral needed to maintain the position
- **Credits**: Value that adds to available balance (from credit positions)

## Liquidation Flow

When `isAccountSolvent` returns `false`:

1. The account can be liquidated
2. The liquidator receives a bonus (computed by `getLiquidationBonus`)
3. Positions are closed at oracle prices
4. Protocol loss (if any) is distributed according to the protocol's loss socialization mechanism

See [Liquidation Bonus](./08-exercise-cost.md) for details on bonus calculations.

## Summary

The collateral tracking system:
- Evaluates both tokens independently with cross-margin benefits
- Accounts for all sources of value (positions, premia, credits)
- Applies utilization-dependent haircuts to cross-margined amounts
- Uses the most conservative (highest) utilization across all positions
- Requires solvency in both tokens simultaneously after all adjustments
