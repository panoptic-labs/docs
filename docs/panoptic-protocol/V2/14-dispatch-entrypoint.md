# Dispatch Entry Point

The `dispatch` function is the primary entry point for users to manage their option positions. It handles minting new positions, burning existing positions, and settling premium on open positions—all through a single unified interface.

## Overview

```solidity
function dispatch(
    TokenId[] calldata positionIdList,
    TokenId[] calldata finalPositionIdList,
    uint128[] calldata positionSizes,
    int24[3][] calldata tickAndSpreadLimits,
    bool usePremiaAsCollateral,
    uint256 builderCode
) external
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `positionIdList` | List of tokenIds to process (mint, burn, or settle) |
| `finalPositionIdList` | Expected position list after all operations complete |
| `positionSizes` | Position sizes for mints; matches stored size for settles; ignored for burns |
| `tickAndSpreadLimits` | Per-position array of [tickLimitLow, tickLimitHigh, spreadLimit] |
| `usePremiaAsCollateral` | Whether to include all accumulated premia in collateral calculations |
| `builderCode` | Builder referral code for fee sharing (0 if none) |

## Operation Determination

The function determines which operation to perform based on the current state of each position:

```solidity
PositionBalance positionBalanceData = s_positionBalance[msg.sender][tokenId];

if (PositionBalance.unwrap(positionBalanceData) == 0) {
    // Position doesn't exist → MINT
    _mintOptions(...)
} else {
    uint128 positionSize = positionBalanceData.positionSize();
    
    if (positionSize == positionSizes[i]) {
        // Size matches stored → SETTLE PREMIUM
        _settleOptions(...)
    } else {
        // Size differs → BURN (close position)
        _burnOptions(...)
    }
}
```

### Decision Matrix

| Position Exists | Size Match | Operation |
|-----------------|------------|-----------|
| No | N/A | Mint |
| Yes | Yes | Settle Premium |
| Yes | No | Burn |

## Safe Mode Enforcement

When safe mode level exceeds 1, additional restrictions apply:

```solidity
if (riskParameters.safeMode() > 1) {
    // Enforce tick limits are properly ordered (covered positions)
    if (_tickLimits[0] > _tickLimits[1]) {
        (_tickLimits[0], _tickLimits[1]) = (_tickLimits[1], _tickLimits[0]);
    }
}

// Prevent new mints when safe mode > 2
if (riskParameters.safeMode() > 2) revert Errors.StaleOracle();
```

| Safe Mode Level | Effect |
|-----------------|--------|
| 0-1 | Normal operation |
| 2 | Positions must be minted/burnt as covered |
| 3+ | No new positions can be minted |

## Price Impact Protection

The function tracks cumulative tick movement to prevent excessive price manipulation:

```solidity
// Track starting tick
cumulativeTickDeltas = cumulativeTickDeltas.addToLeftSlot(startTick);

// After each operation, accumulate deviation
cumulativeTickDeltas = cumulativeTickDeltas.addToRightSlot(
    int128(Math.abs(cumulativeTickDeltas.leftSlot() - finalTick))
);

// Reject if total deviation exceeds limit
if (cumulativeTickDeltas.rightSlot() > int256(uint256(2 * riskParameters.tickDeltaLiquidation())))
    revert Errors.PriceImpactTooLarge();
```

This prevents users from manipulating prices through large position changes within a single transaction.

## Post-Operation Validation

After all operations complete:

```solidity
// Validate solvency with BP_DECREASE_BUFFER
OraclePack oraclePack = _validateSolvency(
    msg.sender,
    finalPositionIdList,
    riskParameters.bpDecreaseBuffer(),
    usePremiaAsCollateral,
    riskParameters.safeMode()
);

// Update oracle if new observation is warranted
if (OraclePack.unwrap(oraclePack) != 0) s_oraclePack = oraclePack;
```

The `bpDecreaseBuffer` (133.33%) ensures users maintain extra margin after operations that could decrease their buying power.

---

# Mint Options Flow

The `_mintOptions` function creates a new option position.

## Function Signature

```solidity
function _mintOptions(
    TokenId tokenId,
    uint128 positionSize,
    uint24 effectiveLiquidityLimit,
    address owner,
    int24[2] memory tickLimits,
    RiskParameters riskParameters
) internal returns (LeftRightSigned paidAmounts, int24 finalTick)
```

## Flow Diagram

```
_mintOptions
│
├─► SFPM.mintTokenizedPosition()
│   ├─ Deploy liquidity to Uniswap (shorts)
│   ├─ Remove liquidity from Uniswap (longs)
│   └─ Return: collectedByLeg, netAmmDelta, finalTick
│
├─► _updateSettlementPostMint()
│   ├─ Add tokenId to positions hash
│   ├─ Check liquidity spread limits
│   ├─ Update s_settledTokens with collected fees
│   ├─ Store premium accumulator snapshots
│   └─ Adjust s_grossPremiumLast for new liquidity
│
├─► _payCommissionAndWriteData()
│   ├─ Compute long/short amounts
│   ├─ Call collateralToken0.settleMint()
│   ├─ Call collateralToken1.settleMint()
│   └─ Return: utilizations, paidAmounts
│
└─► Store position balance data
    ├─ positionSize
    ├─ poolUtilizations (at mint)
    └─ Emit OptionMinted event
```

## Key Steps

### 1. SFPM Interaction

```solidity
(collectedByLeg, netAmmDelta, finalTick) = SFPM.mintTokenizedPosition(
    poolKey(),
    tokenId,
    positionSize,
    tickLimits[0],
    tickLimits[1]
);
```

The SFPM handles actual liquidity deployment/removal in Uniswap.

### 2. Settlement Updates

```solidity
_updateSettlementPostMint(
    riskParameters,
    tokenId,
    collectedByLeg,
    positionSize,
    effectiveLiquidityLimit,
    owner
);
```

This function:
- Adds the position to the user's positions hash
- Verifies liquidity spread doesn't exceed limits
- Credits collected Uniswap fees to `s_settledTokens`
- Snapshots current premium accumulators for the user
- Adjusts `s_grossPremiumLast` for shorts to maintain premium accounting

### 3. Commission and Collateral Settlement

```solidity
(poolUtilizations, paidAmounts) = _payCommissionAndWriteData(
    tokenId,
    positionSize,
    owner,
    netAmmDelta,
    riskParameters
);
```

Calls `settleMint` on both CollateralTrackers to:
- Update asset tracking
- Charge commission fees
- Handle share minting/burning

### 4. Position Data Storage

```solidity
PositionBalance balanceData = PositionBalanceLibrary.storeBalanceData(
    positionSize,
    poolUtilizations,
    0  // tick data
);
s_positionBalance[owner][tokenId] = balanceData;

emit OptionMinted(owner, tokenId, balanceData);
```

---

# Burn Options Flow

The `_burnOptions` function closes an existing option position.

## Function Signature

```solidity
function _burnOptions(
    TokenId tokenId,
    uint128 positionSize,
    int24[2] memory tickLimits,
    address owner,
    bool commitLongSettled,
    RiskParameters riskParameters
) internal returns (
    LeftRightSigned paidAmounts,
    LeftRightSigned[4] memory premiaByLeg,
    int24 finalTick
)
```

## Flow Diagram

```
_burnOptions
│
├─► SFPM.burnTokenizedPosition()
│   ├─ Remove liquidity from Uniswap (shorts)
│   ├─ Return liquidity to Uniswap (longs)
│   └─ Return: collectedByLeg, netAmmDelta, finalTick
│
├─► _updateSettlementPostBurn()
│   ├─ Compute premium owed per leg
│   ├─ Update s_settledTokens
│   ├─ For longs: deduct premium paid
│   ├─ For shorts: compute available premium
│   ├─ Adjust s_grossPremiumLast
│   ├─ Clear position from s_options
│   ├─ Clear position from s_positionBalance
│   └─ Remove tokenId from positions hash
│
├─► Emit OptionBurnt event
│
└─► CollateralTracker.settleBurn() for each token
    ├─ Update asset tracking
    ├─ Settle realized premium
    └─ Handle share minting/burning
```

## Key Steps

### 1. SFPM Interaction

```solidity
(collectedByLeg, netAmmDelta, finalTick) = SFPM.burnTokenizedPosition(
    poolKey(),
    tokenId,
    positionSize,
    tickLimits[0],
    tickLimits[1]
);
```

### 2. Settlement Updates

```solidity
(realizedPremia, premiaByLeg) = _updateSettlementPostBurn(
    owner,
    tokenId,
    collectedByLeg,
    positionSize,
    riskParameters,
    LeftRightSigned.wrap(commitLongSettled ? int128(1) : int128(0))
);
```

The `commitLongSettled` flag controls whether long premium is committed to storage:
- **true**: Normal burns, premium is settled
- **false**: Liquidations, premium settlement is deferred for haircut processing

### 3. Collateral Settlement

```solidity
int128 paid0 = collateralToken0().settleBurn(
    owner,
    longAmounts.rightSlot(),
    shortAmounts.rightSlot(),
    netAmmDelta.rightSlot(),
    realizedPremia.rightSlot(),
    riskParameters
);

int128 paid1 = collateralToken1().settleBurn(
    owner,
    longAmounts.leftSlot(),
    shortAmounts.leftSlot(),
    netAmmDelta.leftSlot(),
    realizedPremia.leftSlot(),
    riskParameters
);
```

---

# Settle Options Flow

The `_settleOptions` function settles accumulated premium on an open position without closing it.

## Function Signature

```solidity
function _settleOptions(
    address owner,
    TokenId tokenId,
    uint128 positionSize,
    RiskParameters riskParameters,
    int24 currentTick
) internal
```

## Flow Diagram

```
_settleOptions
│
├─► _updateSettlementPostBurn() with special flags
│   ├─ Compute premium owed per leg
│   ├─ Update s_settledTokens
│   ├─ For longs: settle premium owed
│   ├─ For shorts: collect available premium (if owner == msg.sender)
│   ├─ Update premium accumulator snapshots
│   └─ Keep position open (don't clear data)
│
└─► CollateralTracker.settleBurn() for each token
    ├─ longAmounts = 0, shortAmounts = 0
    ├─ ammDeltaAmount = 0
    └─ Only settles realizedPremia
```

## Key Difference from Burn

The settle operation uses a special flag encoding:

```solidity
LeftRightSigned.wrap(1).addToLeftSlot(1 + (int128(currentTick) << 2))
```

This signals to `_updateSettlementPostBurn`:
- **rightSlot != 0**: Commit long premium to storage
- **leftSlot != 0**: Keep position open (don't remove from hash)

## Use Cases

1. **Long Position Holders**: Settle premium they owe to continue holding
2. **Short Position Holders**: Collect accumulated premium without closing
3. **External Callers**: Can trigger settlement on behalf of others via `dispatchFrom`

## Premium Collection for Shorts

When `msg.sender == owner`, shorts can auto-collect their available premium:

```solidity
if (commitLongSettledAndKeepOpen.leftSlot() == 0 || msg.sender == owner) {
    // Calculate and collect available premium
    LeftRightUnsigned availablePremium = _getAvailablePremium(...);
    settledTokens = settledTokens.sub(availablePremium);
    realizedPremia = realizedPremia.add(availablePremium);
}
```

This allows sellers to realize their earned premium while keeping positions open.
