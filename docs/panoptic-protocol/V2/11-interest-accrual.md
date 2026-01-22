# Interest Accrual System

The Panoptic Protocol implements a compound interest system that tracks borrowing costs for option sellers. This page explains how interest accrues, how it's tracked per user, and how the settlement process works.

## Overview

When users sell options, they effectively borrow assets from liquidity providers. The protocol charges interest on these borrowed amounts, which accrues continuously and compounds over time. The interest system uses a global "borrow index" that tracks how much $1 of debt has grown since protocol inception.

## Core Concepts

### Borrow Index

The borrow index is a global accumulator that starts at 1e18 (representing 1.0) and increases as interest compounds:

```solidity
/// @notice Global interest rate accumulator
/// @dev Layout:
///      - Left slot (106 bits): Accumulated unrealized interest
///      - Next 38 bits: the rateAtTarget value in WAD
///      - Next 32 bits: Last interaction epoch (timestamp/4)
///      - Lowest 80 bits: Global borrow index in WAD (starts at 1e18)
MarketState internal s_marketState;
```

**Example**:
- User borrows 100 tokens when `globalIndex = 1.0e18`
- Time passes, `globalIndex` grows to `1.2e18` (20% growth)
- User now owes: `100 × (1.2e18 / 1.0e18) = 120 tokens`

### User Interest State

Each user's borrowing state is tracked in a packed storage slot:

```solidity
/// @dev Packed layout:
///      - Left slot (128 bits): Net borrows = netShorts - netLongs
///      - Right slot (128 bits): User's borrow index snapshot
mapping(address account => LeftRightSigned interestState) internal s_interestState;
```

| Field | Description |
|-------|-------------|
| `netBorrows` | User's net borrowed amount (positive = borrower) |
| `userBorrowIndex` | Global index when user last accrued |

### Interest Calculation

Interest owed is calculated using the ratio between current and user's last index:

```solidity
function _getUserInterest(
    LeftRightSigned userState,
    uint256 currentBorrowIndex
) internal pure returns (uint128 interestOwed) {
    int128 netBorrows = userState.leftSlot();
    uint128 userBorrowIndex = uint128(userState.rightSlot());
    
    if (netBorrows <= 0 || userBorrowIndex == 0 || currentBorrowIndex == userBorrowIndex) {
        return 0;
    }
    
    interestOwed = Math.mulDivRoundingUp(
        uint128(netBorrows),
        currentBorrowIndex - userBorrowIndex,
        userBorrowIndex
    ).toUint128();
}
```

**Formula**: `interestOwed = netBorrows × (currentIndex - userIndex) / userIndex`

## The Accrual Workflow

### When Accrual Occurs

Interest is accrued before any user action that affects balances:

```solidity
function deposit(uint256 assets, address receiver) external payable returns (uint256 shares) {
    _accrueInterest(msg.sender, IS_DEPOSIT);
    // ... rest of deposit logic
}

function withdraw(...) external returns (uint256 shares) {
    _accrueInterest(owner, IS_NOT_DEPOSIT);
    // ... rest of withdraw logic
}

function transfer(address recipient, uint256 amount) public returns (bool) {
    _accrueInterest(msg.sender, IS_NOT_DEPOSIT);
    // ... rest of transfer logic
}
```

### The `_accrueInterest` Function

This is the core interest settlement function:

```solidity
function _accrueInterest(address owner, bool isDeposit) internal {
    // Step 1: Calculate current global state
    (
        uint128 currentBorrowIndex,
        uint128 _unrealizedGlobalInterest,
        uint256 currentEpoch
    ) = _calculateCurrentInterestState(_assetsInAMM, _updateInterestRate());
    
    // Step 2: Get user's state
    LeftRightSigned userState = s_interestState[owner];
    int128 netBorrows = userState.leftSlot();
    int128 userBorrowIndex = int128(currentBorrowIndex);
    
    // Step 3: Calculate and settle user's interest (if borrower)
    if (netBorrows > 0) {
        uint128 userInterestOwed = _getUserInterest(userState, currentBorrowIndex);
        // ... settlement logic
    }
    
    // Step 4: Update storage
    s_interestState[owner] = LeftRightSigned.wrap(0)
        .addToRightSlot(userBorrowIndex)
        .addToLeftSlot(netBorrows);
    
    s_marketState = MarketStateLibrary.storeMarketState(
        currentBorrowIndex,
        currentEpoch,
        s_marketState.rateAtTarget(),
        _unrealizedGlobalInterest
    );
}
```

### Step-by-Step Breakdown

#### Step 1: Calculate Current Interest State

```solidity
function _calculateCurrentInterestState(
    uint128 _assetsInAMM,
    uint128 interestRateSnapshot
) internal view returns (
    uint128 currentBorrowIndex,
    uint128 _unrealizedGlobalInterest,
    uint256 currentEpoch
) {
    currentEpoch = block.timestamp >> 2;  // Epoch = timestamp / 4
    uint256 previousEpoch = accumulator.marketEpoch();
    uint128 deltaTime = uint32(currentEpoch - previousEpoch) << 2;
    
    if (deltaTime > 0) {
        // Calculate interest growth factor
        uint128 rawInterest = Math.wTaylorCompounded(interestRateSnapshot, deltaTime);
        
        // Calculate interest owed on borrowed amount
        uint128 interestOwed = Math.mulDivWadRoundingUp(_assetsInAMM, rawInterest);
        _unrealizedGlobalInterest += interestOwed;
        
        // Update borrow index
        uint128 _borrowIndex = (WAD + rawInterest).toUint128();
        currentBorrowIndex = Math.mulDivWadRoundingUp(currentBorrowIndex, _borrowIndex);
    }
}
```

**Key Points**:
- Uses epochs (timestamp/4) for gas-efficient time tracking
- Applies Taylor series approximation for compound interest
- Updates both unrealized interest and borrow index

#### Step 2: Settle User Interest

When a user owes interest, it's paid by burning their shares:

```solidity
if (userInterestOwed != 0) {
    uint256 _totalAssets = s_depositedAssets + _assetsInAMM + _unrealizedGlobalInterest;
    
    // Convert interest to shares
    uint256 shares = Math.mulDivRoundingUp(
        userInterestOwed,
        totalSupply(),
        _totalAssets
    );
    
    uint256 userBalance = balanceOf[owner];
    
    if (shares > userBalance) {
        // INSOLVENCY CASE
        // ... handle partial payment
    } else {
        // SOLVENT CASE: Pay in full
        _burn(owner, shares);
    }
}
```

### Insolvency Handling

When a user cannot pay their full interest, the protocol handles it differently based on context:

#### During Withdrawals/Transfers (isDeposit = false)

```solidity
if (!isDeposit) {
    // Pay what you can
    burntInterestValue = Math.mulDiv(userBalance, _totalAssets, totalSupply());
    
    emit InsolvencyPenaltyApplied(
        owner,
        userInterestOwed,
        burntInterestValue,
        userBalance
    );
    
    _burn(owner, userBalance);
    
    // DO NOT update index - debt continues compounding
    userBorrowIndex = userState.rightSlot();
}
```

**Consequences**:
- User's entire balance is burned
- Original index is preserved (debt keeps compounding)
- User must pay the remaining interest later

#### During Deposits (isDeposit = true)

```solidity
if (isDeposit) {
    // Don't settle - user is adding collateral
    burntInterestValue = 0;
    userBorrowIndex = userState.rightSlot();
}
```

**Rationale**: If a user is depositing, they're adding collateral. The protocol allows them to proceed without forcing settlement, giving them a chance to become solvent.

### Unrealized vs. Realized Interest

The protocol tracks two interest pools:

| Type | Storage | Description |
|------|---------|-------------|
| **Unrealized** | `s_marketState.unrealizedInterest()` | Interest accrued but not yet paid |
| **Realized** | Burned from user shares | Interest collected from borrowers |

When a user pays interest:
```solidity
if (burntInterestValue > _unrealizedGlobalInterest) {
    _unrealizedGlobalInterest = 0;
} else {
    _unrealizedGlobalInterest -= burntInterestValue;
}
```

## Interest Rate Updates

The interest rate is dynamically updated based on pool utilization:

```solidity
function _updateInterestRate() internal returns (uint128) {
    (uint128 avgRate, uint256 endRateAtTarget) = riskEngine().updateInterestRate(
        _poolUtilizationWad(),
        s_marketState
    );
    s_marketState = s_marketState.updateRateAtTarget(uint40(endRateAtTarget));
    return avgRate;
}
```

See [Adaptive Interest Rate Model](./09-interest-rate-model.md) for the complete rate calculation logic.

## View Functions

### Check Interest Owed

```solidity
function owedInterest(address owner) external view returns (uint128) {
    return _owedInterest(owner);
}
```

### Preview Interest (Including Uncompounded)

```solidity
function previewOwedInterest(address owner) external view returns (uint128) {
    uint256 simulatedBorrowIndex = _calculateCurrentBorrowIndex();
    LeftRightSigned userState = s_interestState[owner];
    return _getUserInterest(userState, simulatedBorrowIndex);
}
```

### Get User's Interest State

```solidity
function interestState(address user) external view returns (
    int128 userBorrowIndex,
    int128 netBorrows
) {
    return (s_interestState[user].rightSlot(), s_interestState[user].leftSlot());
}
```

### Get Assets Including Interest Owed

```solidity
function assetsAndInterest(address owner) external view returns (uint256, uint256) {
    return (convertToAssets(balanceOf[owner]), _owedInterest(owner));
}
```

## Integration with Total Assets

Unrealized interest is included in `totalAssets()`:

```solidity
function totalAssets() public view returns (uint256) {
    return uint256(s_depositedAssets) + s_assetsInAMM + s_marketState.unrealizedInterest();
}
```

This ensures share prices reflect accrued but unpaid interest.

## Timing and Epochs

The protocol uses epochs (4-second intervals) rather than raw timestamps:

```solidity
currentEpoch = block.timestamp >> 2;  // Divide by 4
previousTime = accumulator.marketEpoch() << 2;  // Multiply by 4
```

**Benefits**:
- Reduces storage requirements (32 bits instead of 256)
- Avoids Y2K38 problem by using shifted timestamps
- 4-second granularity is sufficient for interest calculations

## Summary

| Component | Purpose |
|-----------|---------|
| **Borrow Index** | Global compound growth factor since inception |
| **User Index** | Snapshot when user last settled interest |
| **Unrealized Interest** | Accumulated but not yet collected |
| **Net Borrows** | User's net borrowed amount |
| **`_accrueInterest`** | Settles interest before user actions |
| **Insolvency Handling** | Partial payment with continued compounding |

The interest system ensures:
1. Borrowers pay fair rates based on utilization
2. Lenders earn yield from borrower interest
3. Insolvent users' debts continue compounding
4. All calculations use efficient packed storage
