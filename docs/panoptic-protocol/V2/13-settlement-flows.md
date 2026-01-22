# Settlement Flows

The settlement system handles all balance updates when positions are created or closed. This page details the `settleMint` and `settleBurn` functions that coordinate asset movements, share accounting, and fee collection.

## Overview

Settlement occurs at two critical points in a position's lifecycle:

| Function | Trigger | Purpose |
|----------|---------|---------|
| `settleMint` | Position creation | Handle deposits, update tracking, charge commission |
| `settleBurn` | Position closure | Handle withdrawals, settle premium, charge fees |

Both functions are called by the PanopticPool and update the CollateralTracker's internal state.

---

## settleMint

Called when a user creates a new option position.

### Function Signature

```solidity
function settleMint(
    address optionOwner,
    int128 longAmount,
    int128 shortAmount,
    int128 ammDeltaAmount,
    RiskParameters riskParameters
) external onlyPanopticPool returns (uint32, int128)
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `optionOwner` | Address creating the position |
| `longAmount` | Notional value of long legs |
| `shortAmount` | Notional value of short legs |
| `ammDeltaAmount` | Tokens moved to/from Uniswap |
| `riskParameters` | Current risk parameters (fees, safe mode, etc.) |

### Returns

| Return | Description |
|--------|-------------|
| `utilization` | Pool utilization after the mint (basis points) |
| `tokenPaid` | Net tokens paid/received by the user |

### Flow

```
settleMint
├─ 1. _updateBalancesAndSettle(isCreation=true)
│   ├─ Accrue interest for user
│   ├─ Calculate net borrows
│   ├─ Update credited shares (for longs)
│   ├─ Mint/burn user shares based on tokenToPay
│   ├─ Update s_depositedAssets
│   ├─ Update s_assetsInAMM
│   └─ Update user's interest state
│
├─ 2. Calculate commission
│   ├─ commission = shortAmount + longAmount
│   └─ commissionFee = commission × notionalFee / DECIMALS
│
├─ 3. Distribute commission
│   ├─ If no builder: burn shares
│   └─ If builder: split between protocol and builder
│
└─ 4. Return (utilization, tokenPaid)
```

### Commission Calculation

```solidity
uint128 commission = uint256(int256(shortAmount) + int256(longAmount)).toUint128();
uint128 commissionFee = uint128(
    Math.mulDivRoundingUp(commission, riskParameters.notionalFee(), DECIMALS)
);
uint256 sharesToBurn = Math.mulDivRoundingUp(commissionFee, _totalSupply, _totalAssets);
```

### Commission Distribution

**Without Builder**:
```solidity
if (riskParameters.feeRecipient() == 0) {
    _burn(optionOwner, sharesToBurn);
    emit CommissionPaid(optionOwner, address(0), commissionFee, 0);
}
```

**With Builder**:
```solidity
// Protocol share (65%)
_transferFrom(
    optionOwner,
    address(riskEngine()),
    (sharesToBurn * riskParameters.protocolSplit()) / DECIMALS
);

// Builder share (25%)
_transferFrom(
    optionOwner,
    address(uint160(riskParameters.feeRecipient())),
    (sharesToBurn * riskParameters.builderSplit()) / DECIMALS
);

emit CommissionPaid(
    optionOwner,
    address(uint160(riskParameters.feeRecipient())),
    uint128((commissionFee * riskParameters.protocolSplit()) / DECIMALS),
    uint128((commissionFee * riskParameters.builderSplit()) / DECIMALS)
);
```

---

## settleBurn

Called when a user closes an existing option position.

### Function Signature

```solidity
function settleBurn(
    address optionOwner,
    int128 longAmount,
    int128 shortAmount,
    int128 ammDeltaAmount,
    int128 realizedPremium,
    RiskParameters riskParameters
) external onlyPanopticPool returns (int128)
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `optionOwner` | Address closing the position |
| `longAmount` | Notional value of long legs being closed |
| `shortAmount` | Notional value of short legs being closed |
| `ammDeltaAmount` | Tokens moved from Uniswap |
| `realizedPremium` | Premium to settle (positive = paid to owner) |
| `riskParameters` | Current risk parameters |

### Returns

| Return | Description |
|--------|-------------|
| `tokenPaid` | Net tokens paid/received by the user |

### Flow

```
settleBurn
├─ 1. _updateBalancesAndSettle(isCreation=false)
│   ├─ Accrue interest for user
│   ├─ Calculate net borrows (reversed from mint)
│   ├─ Update credited shares (for longs)
│   ├─ Handle rounding haircut if needed
│   ├─ Mint/burn user shares based on tokenToPay
│   ├─ Update s_depositedAssets (includes realizedPremium)
│   ├─ Update s_assetsInAMM
│   └─ Update user's interest state
│
├─ 2. If realizedPremium != 0, calculate premium fee
│   ├─ premiumFee = |realizedPremium| × premiumFee rate
│   ├─ notionalCap = (long + short) × 10 × notionalFee
│   └─ commissionFee = min(premiumFee, notionalCap)
│
├─ 3. Distribute commission (same as settleMint)
│
└─ 4. Return tokenPaid
```

### Premium Fee Calculation

The premium fee is capped to prevent excessive fees on highly profitable positions:

```solidity
if (realizedPremium != 0) {
    // Premium-based fee
    uint128 commissionP = realizedPremium > 0 
        ? uint128(realizedPremium) 
        : uint128(-realizedPremium);
    uint128 commissionFeeP = uint128(
        Math.mulDivRoundingUp(commissionP, riskParameters.premiumFee(), DECIMALS)
    );
    
    // Notional-based cap (10x notional fee)
    uint128 commissionN = uint256(int256(shortAmount) + int256(longAmount)).toUint128();
    uint128 commissionFeeN = uint128(
        Math.mulDivRoundingUp(commissionN, 10 * riskParameters.notionalFee(), DECIMALS)
    );
    
    // Take the minimum
    commissionFee = Math.min(commissionFeeP, commissionFeeN).toUint128();
}
```

---

## _updateBalancesAndSettle

The shared internal function that handles core balance updates.

### Function Signature

```solidity
function _updateBalancesAndSettle(
    address optionOwner,
    bool isCreation,
    int128 longAmount,
    int128 shortAmount,
    int128 ammDeltaAmount,
    int128 realizedPremium
) internal returns (uint32, int128, uint256, uint256)
```

### Key Calculations

#### Net Borrows

```solidity
int128 netBorrows = isCreation 
    ? shortAmount - longAmount   // Creating: shorts borrow, longs provide
    : longAmount - shortAmount;  // Closing: reversed
```

#### Token To Pay

```solidity
int256 tokenToPay = int256(ammDeltaAmount) - netBorrows - realizedPremium;
```

This represents the net token flow:
- `ammDeltaAmount`: Tokens moved to/from Uniswap
- `netBorrows`: Tokens borrowed/returned
- `realizedPremium`: Premium paid/received

#### Credit Delta (for Long Positions)

```solidity
uint256 creditDelta;
if (longAmount > 0) {
    creditDelta = isCreation
        ? Math.mulDivRoundingUp(uint256(longAmount), _totalSupply, _totalAssets)
        : Math.mulDiv(uint256(longAmount), _totalSupply, _totalAssets);
}
```

Long positions create "credited shares" that affect total supply calculations.

### Rounding Haircut

When closing positions, Uniswap rounding can cause more credited shares to be returned than were originally tracked:

```solidity
if (!isCreation && creditDelta > 0) {
    uint256 _creditedShares = s_creditedShares;
    if (_creditedShares < creditDelta) {
        s_creditedShares = 0;
        // User pays the rounding difference
        tokenToPay += int128(
            Math.mulDivRoundingUp(
                creditDelta - _creditedShares,
                _totalAssets,
                _totalSupply
            ).toUint128()
        );
    } else {
        s_creditedShares -= creditDelta;
    }
}
```

### Share Minting/Burning

Based on `tokenToPay`:

```solidity
if (tokenToPay > 0) {
    // User pays tokens → burn their shares
    uint256 sharesToBurn = Math.mulDivRoundingUp(
        uint256(tokenToPay), _totalSupply, _totalAssets
    );
    
    if (balanceOf[optionOwner] < sharesToBurn)
        revert Errors.NotEnoughTokens(...);
    
    _burn(optionOwner, sharesToBurn);
} else if (tokenToPay < 0) {
    // User receives tokens → mint shares
    uint256 sharesToMint = Math.mulDiv(
        uint256(-tokenToPay), _totalSupply, _totalAssets
    );
    _mint(optionOwner, sharesToMint);
}
```

### State Updates

```solidity
// Update deposited assets (includes premium)
s_depositedAssets = uint256(
    int256(uint256(s_depositedAssets)) - ammDeltaAmount + realizedPremium
).toUint128();

// Update AMM assets
int256 newAssetsInAmm = int256(uint256(s_assetsInAMM));
newAssetsInAmm += isCreation ? int256(shortAmount) : -int256(shortAmount);
s_assetsInAMM = uint256(newAssetsInAmm).toUint128();

// Update user's borrow state
s_interestState[optionOwner] = s_interestState[optionOwner].addToLeftSlot(netBorrows);

// Get and store utilization
uint32 utilization = uint32(_poolUtilization());
```

---

## Settlement Examples

### Example 1: Selling a Put Option

**Action**: Create a short put position worth 1,000 USDC

```
settleMint called with:
├─ longAmount = 0
├─ shortAmount = 1,000 USDC
├─ ammDeltaAmount = 1,000 USDC (deposited to Uniswap)
└─ notionalFee = 10 bps

Calculations:
├─ netBorrows = 1,000 - 0 = 1,000 USDC (borrowed)
├─ tokenToPay = 1,000 - 1,000 - 0 = 0 (net neutral)
├─ commission = 1,000 × 0.001 = 1 USDC
└─ Result: User pays 1 USDC commission, borrows 1,000 USDC
```

### Example 2: Buying a Call Option

**Action**: Create a long call position worth 500 USDC

```
settleMint called with:
├─ longAmount = 500 USDC
├─ shortAmount = 0
├─ ammDeltaAmount = -500 USDC (removed from Uniswap)
└─ notionalFee = 10 bps

Calculations:
├─ netBorrows = 0 - 500 = -500 USDC (provided)
├─ tokenToPay = -500 - (-500) - 0 = 0 (net neutral)
├─ creditDelta = shares for 500 USDC
├─ commission = 500 × 0.001 = 0.5 USDC
└─ Result: User pays 0.5 USDC commission, provides 500 USDC
```

### Example 3: Closing Profitable Long

**Action**: Close long position with 100 USDC profit

```
settleBurn called with:
├─ longAmount = 500 USDC
├─ shortAmount = 0
├─ ammDeltaAmount = 500 USDC (returned from Uniswap)
├─ realizedPremium = 100 USDC (profit)
└─ premiumFee = 5 bps

Calculations:
├─ netBorrows = 500 - 0 = 500 USDC (returned)
├─ tokenToPay = 500 - 500 - 100 = -100 (user receives)
├─ premiumFee = 100 × 0.0005 = 0.05 USDC
├─ notionalCap = 500 × 10 × 0.001 = 5 USDC
├─ commissionFee = min(0.05, 5) = 0.05 USDC
└─ Result: User receives ~99.95 USDC profit
```

---

## Summary

| Aspect | settleMint | settleBurn |
|--------|------------|------------|
| **Trigger** | Position creation | Position closure |
| **Net Borrows** | shorts - longs | longs - shorts |
| **Fee Basis** | Notional only | Premium (capped by notional) |
| **Credit Shares** | Added | Removed |
| **AMM Assets** | Increased | Decreased |
| **Premium** | Not applicable | Settled |

The settlement system ensures:
1. Accurate tracking of all asset flows
2. Fair fee collection with builder revenue sharing
3. Proper handling of borrowed amounts and interest
4. Protection against rounding exploits
5. Consistent utilization tracking via transient storage
