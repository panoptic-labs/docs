# DispatchFrom Entry Point

The `dispatchFrom` function enables third parties to interact with another user's positions for liquidations, force exercises, and long premium settlements. The specific operation is determined by the account's solvency state and the relationship between input position lists.

## Overview

```solidity
function dispatchFrom(
    TokenId[] calldata positionIdListFrom,
    address account,
    TokenId[] calldata positionIdListTo,
    TokenId[] calldata positionIdListToFinal,
    LeftRightUnsigned usePremiaAsCollateral
) external payable
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `positionIdListFrom` | Caller's (msg.sender) current positions |
| `account` | Target account being acted upon |
| `positionIdListTo` | Target account's current positions |
| `positionIdListToFinal` | Expected positions after operation |
| `usePremiaAsCollateral` | Packed flags: leftSlot for caller, rightSlot for target |

## Operation Determination

The function determines which operation to execute based on two factors:

1. **Solvency State**: Is the target account solvent at all checked price ticks?
2. **List Lengths**: How do `positionIdListTo` and `positionIdListToFinal` compare?

### Solvency Check

The account is checked at four price points:

```solidity
int24[] memory atTicks = new int24[](4);
atTicks[0] = spotTick;      // 10-minute EMA
atTicks[1] = twapTick;      // Weighted TWAP from oracle
atTicks[2] = latestTick;    // Most recent observation
atTicks[3] = currentTick;   // Current Uniswap tick

solvent = _checkSolvencyAtTicks(
    account,
    0,                          // No safe mode override
    positionIdListTo,
    currentTick,
    atTicks,
    COMPUTE_PREMIA_AS_COLLATERAL,
    NO_BUFFER                   // No additional margin buffer
);
```

### Decision Matrix

| Solvent Count | Final Length | To Length | Operation |
|---------------|--------------|-----------|-----------|
| 4 (all) | = To Length | N/A | **Settle Premium** |
| 4 (all) | To Length - 1 | N/A | **Force Exercise** |
| 0 (none) | 0 | N/A | **Liquidation** |
| 1-3 (partial) | Any | Any | **Revert** (NotMarginCalled) |

```solidity
if (solvent == numberOfTicks) {
    // Solvent at all ticks
    if (toLength == finalLength) {
        _settlePremium(...);           // Same length = settle
    } else if (toLength == finalLength + 1) {
        _forceExercise(...);           // One shorter = exercise
    } else if (finalLength == 0) {
        revert Errors.NotMarginCalled(); // Was meant for liquidation but solvent
    }
} else if (solvent == 0) {
    // Insolvent at all ticks
    if (finalLength != 0) revert Errors.InputListFail();
    _liquidate(...);
} else {
    // Partially solvent - can't proceed
    revert Errors.NotMarginCalled();
}
```

## Price Manipulation Protection

Before any operation, the function validates that the current price hasn't been manipulated:

```solidity
int256 MAX_TWAP_DELTA_LIQUIDATION = int256(uint256(riskParameters.tickDeltaLiquidation()));

if (Math.abs(currentTick - twapTick) > MAX_TWAP_DELTA_LIQUIDATION)
    revert Errors.StaleOracle();
```

This prevents attackers from:
- Manipulating the current price to trigger unfair liquidations
- Executing force exercises at manipulated prices

## Post-Operation Validation

Both the target account and caller must remain solvent:

```solidity
// Validate target account (after operation)
_validateSolvency(
    account,
    positionIdListToFinal,
    NO_BUFFER,
    usePremiaAsCollateral.rightSlot() > 0,
    0
);

// Validate caller
_validateSolvency(
    msg.sender,
    positionIdListFrom,
    NO_BUFFER,
    usePremiaAsCollateral.leftSlot() > 0,
    0
);
```

---

# Liquidation Flow

Liquidation occurs when an account is insolvent at all four checked price ticks. All positions are closed and a bonus is paid to the liquidator.

## Function Signature

```solidity
function _liquidate(
    address liquidatee,
    TokenId[] calldata positionIdList,
    int24 twapTick,
    int24 currentTick
) internal
```

## Flow Diagram

```
_liquidate
│
├─► Calculate accumulated premia
│   └─ _calculateAccumulatedPremia(liquidatee, positionIdList, ...)
│
├─► Get margin data from RiskEngine
│   └─ riskEngine().getMargin(...)
│
├─► Delegate virtual shares to liquidatee
│   ├─ collateralToken0().delegate(liquidatee)
│   └─ collateralToken1().delegate(liquidatee)
│
├─► Burn all positions (without committing long premium)
│   └─ _burnAllOptionsFrom(liquidatee, ..., DONOT_COMMIT_LONG_SETTLED, ...)
│
├─► Calculate liquidation bonus
│   └─ riskEngine().getLiquidationBonus(...)
│
├─► Process premium haircut (if protocol loss)
│   └─ PanopticMath.haircutPremia(...)
│
├─► Settle with liquidator
│   ├─ collateralToken0().settleLiquidation(liquidator, liquidatee, bonus0)
│   └─ collateralToken1().settleLiquidation(liquidator, liquidatee, bonus1)
│
└─► Emit AccountLiquidated event
```

## Key Steps

### 1. Premium Calculation

```solidity
(shortPremium, longPremium, positionBalanceArray) = _calculateAccumulatedPremia(
    liquidatee,
    positionIdList,
    COMPUTE_PREMIA_AS_COLLATERAL,
    ONLY_AVAILABLE_PREMIUM,      // Only settled premium counts
    currentTick
);
```

### 2. Virtual Share Delegation

The protocol delegates virtual shares to ensure the liquidatee has enough balance to settle all position closures:

```solidity
collateralToken0().delegate(liquidatee);  // Adds 2^248 - 1 shares
collateralToken1().delegate(liquidatee);
```

This is necessary because the liquidatee may not have enough shares to cover the settlement amounts for burning their positions.

### 3. Position Burning

```solidity
(netPaid, premiasByLeg) = _burnAllOptionsFrom(
    liquidatee,
    MIN_SWAP_TICK,           // No price limits during liquidation
    MAX_SWAP_TICK,
    DONOT_COMMIT_LONG_SETTLED,  // Don't commit long premium yet
    positionIdList
);
```

The `DONOT_COMMIT_LONG_SETTLED` flag prevents long premium from being committed to storage. This is critical because:
- The premium may need to be haircut if there's protocol loss
- Committing first could allow shorts to withdraw tokens that will later be clawed back

### 4. Bonus Calculation

```solidity
(bonusAmounts, collateralRemaining) = riskEngine().getLiquidationBonus(
    tokenData0,
    tokenData1,
    Math.getSqrtRatioAtTick(twapTick),
    netPaid,
    shortPremium
);
```

The bonus is calculated as:
- `min(collateralBalance/2, collateralDeficit)`
- Split proportionally between token0 and token1 based on requirements
- Cross-token substitution applied if one token has surplus

### 5. Premium Haircut

If there's protocol loss, premium owed to the liquidatee is haircut:

```solidity
LeftRightSigned bonusDeltas = PanopticMath.haircutPremia(
    liquidatee,
    positionIdList,
    premiasByLeg,
    collateralRemaining,
    collateralToken0(),
    collateralToken1(),
    Math.getSqrtRatioAtTick(twapTick),
    s_settledTokens
);
bonusAmounts = bonusAmounts.add(bonusDeltas);
```

This ensures PLPs aren't forced to pay out premium to a liquidator who colluded with the liquidatee.

### 6. Settlement

```solidity
// Native currency support for token0
collateralToken0().settleLiquidation{value: msg.value}(
    msg.sender,    // liquidator
    liquidatee,
    bonusAmounts.rightSlot()
);

collateralToken1().settleLiquidation(
    msg.sender,
    liquidatee,
    bonusAmounts.leftSlot()
);
```

The `settleLiquidation` function:
- Revokes the delegated virtual shares
- Transfers bonus to liquidator (or from liquidator if negative)
- Handles any protocol loss

---

# Force Exercise Flow

Force exercise allows anyone to close another user's out-of-range long positions in exchange for paying an exercise fee.

## Function Signature

```solidity
function _forceExercise(
    address account,
    TokenId tokenId,
    int24 twapTick,
    int24 currentTick
) internal
```

## Prerequisites

```solidity
// Position must have at least one long leg
if (tokenId.countLongs() == 0) revert Errors.NoLegsExercisable();
```

## Flow Diagram

```
_forceExercise
│
├─► Get position data and calculate exercise fee
│   ├─ positionSize = s_positionBalance[account][tokenId].positionSize()
│   └─ exerciseFees = riskEngine().exerciseCost(currentTick, twapTick, tokenId, positionBalance)
│
├─► Delegate virtual shares to account
│   ├─ collateralToken0().delegate(account)
│   └─ collateralToken1().delegate(account)
│
├─► Burn the position
│   └─ _burnOptions(tokenId, positionSize, [MIN_SWAP_TICK, MAX_SWAP_TICK], account, COMMIT_LONG_SETTLED, ...)
│
├─► Calculate refund amounts (handle token imbalances)
│   └─ riskEngine().getRefundAmounts(account, exerciseFees, twapTick, ct0, ct1)
│
├─► Execute refunds between exerciser and account
│   ├─ collateralToken0().refund(account, msg.sender, refundAmounts.rightSlot())
│   └─ collateralToken1().refund(account, msg.sender, refundAmounts.leftSlot())
│
├─► Revoke virtual shares
│   ├─ collateralToken0().revoke(account)
│   └─ collateralToken1().revoke(account)
│
└─► Emit ForcedExercised event
```

## Key Steps

### 1. Exercise Fee Calculation

```solidity
exerciseFees = riskEngine().exerciseCost(
    currentTick,
    twapTick,
    tokenId,
    positionBalance
);
```

The exercise cost includes:
- Base fee (higher if position is in-range, lower if far OTM)
- Price differential compensation between current and oracle prices

### 2. Position Burning

```solidity
int24[2] memory tickLimits;
tickLimits[0] = MIN_SWAP_TICK;  // No ITM swapping
tickLimits[1] = MAX_SWAP_TICK;

_burnOptions(
    tokenId,
    positionSize,
    tickLimits,
    account,
    COMMIT_LONG_SETTLED,    // Commit premium (unlike liquidation)
    riskParameters
);
```

Unlike liquidation, force exercise **does** commit long premium because:
- The account is solvent
- No protocol loss risk
- Normal premium flow should occur

### 3. Refund Amount Calculation

```solidity
LeftRightSigned refundAmounts = riskEngine().getRefundAmounts(
    account,
    exerciseFees,
    twapTick,
    ct0,
    ct1
);
```

If the exercised account lacks sufficient balance in one token:
- The deficit is converted to the other token
- Exerciser receives equivalent value in the surplus token
- Ensures the exercise can complete even with imbalanced holdings

### 4. Token Transfers

```solidity
// Positive = transfer from account to exerciser
// Negative = transfer from exerciser to account
ct0.refund(account, msg.sender, refundAmounts.rightSlot());
ct1.refund(account, msg.sender, refundAmounts.leftSlot());
```

---

# Settle Premium Flow

Premium settlement allows third parties to force long position holders to pay their accumulated premium, making it available for short sellers to withdraw.

## Function Signature

```solidity
function _settlePremium(
    address owner,
    TokenId tokenId,
    int24 twapTick,
    int24 currentTick
) internal
```

## Flow Diagram

```
_settlePremium
│
├─► Delegate virtual shares to owner
│   ├─ collateralToken0().delegate(owner)
│   └─ collateralToken1().delegate(owner)
│
├─► Settle options (keep position open)
│   └─ _settleOptions(owner, tokenId, positionSize, riskParameters, currentTick)
│
├─► Calculate refund amounts
│   └─ riskEngine().getRefundAmounts(owner, LeftRightSigned.wrap(0), twapTick, ct0, ct1)
│
├─► Execute refunds (caller pays for owner's shortfall)
│   ├─ collateralToken0().refund(owner, msg.sender, refundAmounts.rightSlot())
│   └─ collateralToken1().refund(owner, msg.sender, refundAmounts.leftSlot())
│
└─► Revoke virtual shares
    ├─ collateralToken0().revoke(owner)
    └─ collateralToken1().revoke(owner)
```

## Purpose

Short sellers need long buyers to pay their accumulated premium before the shorts can withdraw their earnings. If a long holder is neglecting to settle:

1. Any third party can call `dispatchFrom` to force settlement
2. The long's premium debt is paid
3. `s_settledTokens` is increased, making premium available to shorts
4. The long position remains open

## Key Steps

### 1. Position Validation

```solidity
uint128 positionSize = s_positionBalance[owner][tokenId].positionSize();
if (positionSize == 0) revert Errors.PositionNotOwned();
```

### 2. Premium Settlement

```solidity
_settleOptions(owner, tokenId, positionSize, riskParameters, currentTick);
```

This calls `_updateSettlementPostBurn` with flags to:
- Commit long premium to `s_settledTokens`
- Keep the position open
- Update premium accumulator snapshots

### 3. Balance Redistribution

```solidity
LeftRightSigned refundAmounts = riskEngine().getRefundAmounts(
    owner,
    LeftRightSigned.wrap(0),  // No exercise fees
    twapTick,
    ct0,
    ct1
);
```

If the owner lacks sufficient collateral in one token:
- The caller covers the shortfall
- Caller receives equivalent value in the other token
- This incentivizes settlement when the owner has imbalanced collateral

---

# Summary

| Operation | Trigger | Account State | Position Effect |
|-----------|---------|---------------|-----------------|
| **Liquidation** | Insolvent at all ticks | Insolvent | All positions closed |
| **Force Exercise** | Final list one shorter | Solvent | Single position closed |
| **Settle Premium** | Same list lengths | Solvent | Position remains open |

| Operation | Caller Pays | Caller Receives | Account Effect |
|-----------|-------------|-----------------|----------------|
| **Liquidation** | Nothing (or negative bonus) | Liquidation bonus | Positions closed, collateral claimed |
| **Force Exercise** | Exercise fee | Position closure | Position closed, receives fee |
| **Settle Premium** | Token shortfall | Surplus token | Premium debt paid |
