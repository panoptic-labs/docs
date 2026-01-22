# SFPM Position Creation

The SemiFungiblePositionManager (SFPM) handles the low-level mechanics of creating option positions in Uniswap V4. This document covers two key mechanisms: zero-width legs for loans and credits, and the finalTick return value for slippage protection.

## Overview

The `_createPositionInAMM` function processes each leg of a tokenId and routes it based on the leg's width:

```solidity
for (uint256 leg = 0; leg < tokenId.countLegs(); ) {
    if (tokenId.width(leg) == 0) {
        // Zero-width: Loan or Credit (no Uniswap liquidity)
        // Handle as pure token transfer via ITM amounts
    } else {
        // Standard option leg with liquidity range
        // Deploy/remove liquidity in Uniswap
    }
}
```

---

## Zero-Width Legs (Loans and Credits)

When a leg has `width == 0`, it represents a loan or credit position rather than an option with a liquidity range. These positions don't interact with Uniswap's AMM—they're pure token transfers handled through the CollateralTracker.

### Position Types

| Width | isLong | Type | Effect |
|-------|--------|------|--------|
| 0 | 0 | **Loan** | Borrow tokens from the pool |
| 0 | 1 | **Credit** | Deposit tokens as collateral credit |

### Code Flow

```solidity
if (tokenId.width(leg) == 0) {
    uint256 isLong = tokenId.isLong(leg);
    
    // Calculate the notional amount for this leg
    LeftRightUnsigned amountsMoved = PanopticMath.getAmountsMoved(
        tokenId,
        positionSize,
        leg,
        true  // useFullPrecision
    );
    
    // Determine direction: loans are negative (outflow), credits are positive (inflow)
    int128 signMultiplier = isLong == 0 ? int128(-1) : int128(1);
    
    // Route to correct token based on tokenType
    uint256 tokenType = tokenId.tokenType(leg);
    int128 itm0 = tokenType == 1 ? int128(0) : signMultiplier * int128(amountsMoved.rightSlot());
    int128 itm1 = tokenType == 0 ? int128(0) : signMultiplier * int128(amountsMoved.leftSlot());
    
    // Accumulate into ITM amounts for settlement
    itmAmounts = itmAmounts.addToRightSlot(itm0).addToLeftSlot(itm1);
}
```

### Key Mechanics

**No Uniswap Interaction**: Zero-width legs bypass `_createLegInAMM` entirely. No liquidity is minted or burned in Uniswap V4.

**ITM Amount Accumulation**: The token amounts are accumulated into `itmAmounts`, which tracks the net token flow:
- **Negative values**: Tokens flow out (loans)
- **Positive values**: Tokens flow in (credits)

**Token Type Routing**: The `tokenType` determines which token is affected:
- `tokenType == 0`: Affects token0 (currency0)
- `tokenType == 1`: Affects token1 (currency1)

**Sign Multiplier Logic**:
```
isLong == 0 (Loan):   signMultiplier = -1  → Negative ITM (tokens out)
isLong == 1 (Credit): signMultiplier = +1  → Positive ITM (tokens in)
```

### Settlement Path

After all legs are processed, the accumulated `itmAmounts` flow through the standard settlement:

```solidity
{
    LeftRightSigned cumulativeDelta = totalMoved.sub(totalCollected);

    // Handle token0 settlement
    if (cumulativeDelta.rightSlot() > 0) {
        POOL_MANAGER_V4.burn(account, currency0, uint128(cumulativeDelta.rightSlot()));
    } else if (cumulativeDelta.rightSlot() < 0) {
        POOL_MANAGER_V4.mint(account, currency0, uint128(-cumulativeDelta.rightSlot()));
    }

    // Handle token1 settlement
    if (cumulativeDelta.leftSlot() > 0) {
        POOL_MANAGER_V4.burn(account, currency1, uint128(cumulativeDelta.leftSlot()));
    } else if (cumulativeDelta.leftSlot() < 0) {
        POOL_MANAGER_V4.mint(account, currency1, uint128(-cumulativeDelta.leftSlot()));
    }
}
```

### Use Cases

**Loans (width=0, isLong=0)**:
- Borrow tokens from the Panoptic pool
- Used for leveraged positions or liquidity needs
- Requires 100% + seller collateral ratio as margin

**Credits (width=0, isLong=1)**:
- Deposit tokens as additional collateral
- Adds to user's collateral balance
- No margin requirement (adds to buying power)

### Composite Strategies with Zero-Width Legs

Zero-width legs enable capital-efficient composite strategies:

| Strategy | Components | Effect |
|----------|------------|--------|
| Prepaid Long | Credit + Long Option | Credit covers long premium |
| Cash-Secured Short | Credit + Short Option | Credit provides collateral |
| Upfront Short | Loan + Short Option | Borrow to deploy as short |
| Option-Protected Loan | Loan + Long Option | Option hedges loan exposure |
| Delayed Swap | Credit + Loan (different tokens) | Synthetic token exchange |

---

## FinalTick Return Value

The SFPM returns the `finalTick` (current pool tick after position creation) to enable slippage protection and price tracking at the PanopticPool level.

### Return Signature

```solidity
function mintTokenizedPosition(
    bytes calldata poolKey,
    TokenId tokenId,
    uint128 positionSize,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external returns (
    LeftRightUnsigned[4] memory collectedByLeg,
    LeftRightSigned totalMoved,
    int24 finalTick  // ← Current tick after all operations
)
```

### Implementation

The finalTick is captured in `unlockCallback` after all position operations complete:

```solidity
function unlockCallback(bytes calldata data) external returns (bytes memory) {
    // ... decode parameters and create position ...
    
    (
        LeftRightUnsigned[4] memory collectedByLeg,
        LeftRightSigned totalMoved
    ) = _createPositionInAMM(account, key, invertedLimits, positionSize, tokenId, isBurn);

    // Capture current tick AFTER all AMM interactions
    int24 currentTick = getCurrentTick(abi.encode(key));
    
    // Validate tick is within acceptable bounds
    if (invertedLimits) (tickLimitLow, tickLimitHigh) = (tickLimitHigh, tickLimitLow);
    if ((currentTick >= tickLimitHigh) || (currentTick <= tickLimitLow))
        revert Errors.PriceBoundFail(currentTick);
    
    // Return finalTick to caller
    return abi.encode(collectedByLeg, totalMoved, currentTick);
}
```

### Slippage Protection

The SFPM enforces basic slippage bounds internally:

```solidity
// Tick must be strictly within the open interval (tickLimitLow, tickLimitHigh)
if ((currentTick >= tickLimitHigh) || (currentTick <= tickLimitLow))
    revert Errors.PriceBoundFail(currentTick);
```

**Inverted Limits Convention**: When `tickLimitLow > tickLimitHigh`, this signals that ITM swapping should occur. The limits are then swapped for the slippage check:

```solidity
bool invertedLimits = tickLimitLow > tickLimitHigh;
// ... perform ITM swap if invertedLimits ...
if (invertedLimits) (tickLimitLow, tickLimitHigh) = (tickLimitHigh, tickLimitLow);
```

### PanopticPool Usage

The PanopticPool uses the returned `finalTick` for cumulative price impact tracking:

```solidity
// In dispatch():
int24 finalTick;
if (PositionBalance.unwrap(positionBalanceData) == 0) {
    // Mint
    (, finalTick) = _mintOptions(...);
} else if (positionSize == positionSizes[i]) {
    // Settle
    finalTick = SFPM.getCurrentTick(poolKey());
} else {
    // Burn
    (, , finalTick) = _burnOptions(...);
}

// Accumulate tick deviation
cumulativeTickDeltas = cumulativeTickDeltas.addToRightSlot(
    int128(Math.abs(cumulativeTickDeltas.leftSlot() - finalTick))
);

// Reject if total deviation exceeds limit
if (cumulativeTickDeltas.rightSlot() > int256(uint256(2 * riskParameters.tickDeltaLiquidation())))
    revert Errors.PriceImpactTooLarge();
```

This prevents users from executing large position changes that manipulate the pool price within a single transaction.

### Position Balance Storage

The finalTick is also stored in `PositionBalance` for future reference:

```solidity
PositionBalance balanceData = PositionBalanceLibrary.storeBalanceData(
    positionSize,
    poolUtilizations,
    0  // tickData (includes finalTick information)
);
s_positionBalance[owner][tokenId] = balanceData;
```

This allows the protocol to compare the current tick against the tick at mint for:
- Exercise cost calculations
- Margin requirement adjustments
- ITM/OTM status determination

---

## Flow Diagram

```
mintTokenizedPosition / burnTokenizedPosition
│
├─► _unlockAndCreatePositionInAMM()
│   │
│   └─► POOL_MANAGER_V4.unlock()
│       │
│       └─► unlockCallback()
│           │
│           ├─► _createPositionInAMM()
│           │   │
│           │   └─► For each leg:
│           │       │
│           │       ├─► width == 0?
│           │       │   ├─ YES: Accumulate to itmAmounts (no Uniswap)
│           │       │   └─ NO:  _createLegInAMM() (deploy/remove liquidity)
│           │       │
│           │       └─► Accumulate totalMoved, collectedByLeg
│           │
│           ├─► ITM Swap (if invertedLimits && itmAmounts != 0)
│           │
│           ├─► Settlement (mint/burn ERC6909 claims)
│           │
│           ├─► Get finalTick = getCurrentTick()
│           │
│           ├─► Slippage Check (revert if out of bounds)
│           │
│           └─► Return (collectedByLeg, totalMoved, finalTick)
│
└─► Caller receives finalTick for tracking/validation
```

---

## Summary

| Feature | Purpose | Key Behavior |
|---------|---------|--------------|
| **Zero-Width Legs** | Enable loans and credits | Bypass Uniswap, pure token transfer via ITM accumulation |
| **FinalTick Return** | Slippage protection | Captured after all operations, validated against limits |
| **Inverted Limits** | Signal ITM swap intent | Triggers swap, then limits are normalized for validation |
| **Cumulative Tracking** | Price manipulation prevention | PanopticPool tracks total deviation across operations |
