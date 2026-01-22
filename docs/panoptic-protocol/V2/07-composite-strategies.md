# Composite Strategies

Composite strategies combine multiple legs with designated risk partners to achieve enhanced capital efficiency. When legs are partnered, the protocol recognizes that their combined risk profile may be less than the sum of individual risks, resulting in reduced collateral requirements.

## Risk Partners Overview

Each leg in a Panoptic position can designate another leg as its "risk partner" via the `riskPartner` field in the TokenId. When two legs reference each other as partners and meet specific criteria, they're treated as a composite strategy rather than independent positions.

```solidity
if (tokenId.riskPartner(index) == index) {
    // No partner - compute as standalone leg
    return _getRequiredCollateralSingleLegNoPartner(...);
} else {
    // Has partner - check for composite strategy
    return _getRequiredCollateralSingleLegPartner(...);
}
```

## Strategy Classification Matrix

Composite strategies are classified by the attributes of the two partnered legs:

| Width A | Width B | isLong A | isLong B | TokenType Match | Strategy |
|---------|---------|----------|----------|-----------------|----------|
| > 0 | > 0 | 0 | 0 | Different | **Strangle** |
| > 0 | > 0 | 0/1 | 1/0 | Different | **Synthetic Stock** |
| > 0 | > 0 | 0/1 | 1/0 | Same | **Spread** |
| > 0 | 0 | - | 1 | Same | **Credit-Option Composite** |
| > 0 | 0 | - | 0 | Same | **Loan-Option Composite** |
| 0 | 0 | 0 | 1 | Different | **Delayed Swap** |

---

## Strangles

A strangle consists of two short options with different token types (one call, one put).

### Identification

```solidity
if (_tokenType != tokenTypeP) {  // Different token types
    if (_isLong == 0 && isLongP == 0) {  // Both short
        return _computeStrangle(...);
    }
}
```

### Collateral Efficiency

Strangles receive **50% capital efficiency** because only one side can be in-the-money at any given time:

```solidity
function _computeStrangle(...) internal view returns (uint256 strangleRequired) {
    // Negative utilization signals strangle treatment
    poolUtilization = -(poolUtilization == 0 ? int16(1) : poolUtilization);
    
    return _getRequiredCollateralSingleLegNoPartner(
        tokenId,
        index,
        positionSize,
        atTick,
        poolUtilization  // Negative triggers 50% discount in _sellCollateralRatio
    );
}
```

### How the Discount Works

In `_sellCollateralRatio`:
```solidity
if (utilization < 0) {
    min_sell_ratio /= 2;  // 50% of normal base ratio
    utilization = -utilization;
}
```

### Example

| Component | Standalone Requirement | Strangle Requirement |
|-----------|----------------------|---------------------|
| Short Put (20% base) | 20% of notional | 10% of notional |
| Short Call (20% base) | 20% of notional | 10% of notional |
| **Total** | 40% | 20% |

---

## Synthetic Stock

A synthetic stock combines a long option of one type with a short option of the opposite type.

### Identification

```solidity
if (_tokenType != tokenTypeP) {  // Different token types
    if (_isLong != isLongP) {  // One long, one short
        // Synthetic stock
    }
}
```

### Collateral Requirement

The requirement is the **maximum** of the two legs' individual requirements:

```solidity
return index < partnerIndex
    ? Math.max(
        _getRequiredCollateralSingleLegNoPartner(tokenId, index, positionSize, atTick, poolUtilization),
        _getRequiredCollateralSingleLegNoPartner(tokenId, partnerIndex, positionSize, atTick, poolUtilization)
    )
    : 0;  // Only compute once
```

### Rationale

A synthetic stock (long call + short put, or long put + short call) behaves like holding the underlying asset:
- If price rises: call profits, put loses
- If price falls: put profits, call loses

The positions offset each other, so only one needs full collateral.

---

## Spreads

A spread combines a long and short option of the same type (both calls or both puts) at different strikes.

### Identification

```solidity
if (_tokenType == tokenTypeP) {  // Same token type
    if (_isLong != isLongP) {  // One long, one short
        return _computeSpread(...);
    }
}
```

### Types of Spreads

| Spread Type | Long Strike | Short Strike |
|-------------|-------------|--------------|
| Bull Call | Lower | Higher |
| Bear Call | Higher | Lower |
| Bull Put | Lower | Higher |
| Bear Put | Higher | Lower |

### Collateral Calculation

The spread requirement is the **minimum** of:
1. The sum of individual leg requirements (split requirement)
2. The defined maximum loss of the spread

```solidity
function _computeSpread(...) internal view returns (uint256 spreadRequirement) {
    spreadRequirement = 1;  // Minimum floor
    
    // Option 1: Sum of individual requirements
    uint256 splitRequirement = _getRequiredCollateralSingleLegNoPartner(index) + 
                               _getRequiredCollateralSingleLegNoPartner(partnerIndex);
    
    // Option 2: Maximum loss calculation
    // ... (detailed below)
    
    spreadRequirement = Math.min(splitRequirement, spreadRequirement);
}
```

### Calendar Spread Adjustment

For spreads with different widths (calendar spreads), an additional adjustment accounts for time value differences:

```solidity
int24 deltaWidth = _tokenId.width(index) - _tokenId.width(partnerIndex);
if (deltaWidth < 0) deltaWidth = -deltaWidth;

// Add width-based adjustment
spreadRequirement += (amountsMoved * uint256(deltaWidth * tickSpacing)) / 80000;
```

### Maximum Loss Calculation

#### Case 1: Asset != TokenType

When the position's asset differs from its token type, the max loss is simply the difference in notional values:

```solidity
if (tokenId.asset(index) != tokenType) {
    spreadRequirement += |moved0 - moved0Partner|;  // or moved1 for token1
}
```

#### Case 2: Asset == TokenType

When asset equals token type, the calculation accounts for the ratio of notional to contracts:

```solidity
spreadRequirement += |notional - notionalP| × contracts / max(notional, notionalP)
```

### Example

| Component | Standalone | Spread |
|-----------|------------|--------|
| Short 100 Call | 200 USDC | - |
| Long 105 Call | 100 USDC | - |
| **Total** | 300 USDC | **50 USDC** (max loss) |

---

## Credit-Option Composites

These strategies pair an option with a credit position of the same token type.

### Strategies Included

| Option Type | Result |
|-------------|--------|
| Long option + Credit | **Prepaid Long Option** |
| Short option + Credit | **Cash-Secured Option** |

### Identification

```solidity
if (_width != widthP) {  // One option, one credit/loan
    if (_tokenType == tokenTypeP) {  // Same asset
        if (isLongP == 1) {  // Partner is credit
            return _width ? _computeCreditOptionComposite(...) : 0;
        }
    }
}
```

### Collateral Calculation

```solidity
function _computeCreditOptionComposite(
    TokenId tokenId,
    uint128 positionSize,
    uint256 index,
    int24 atTick
) internal view returns (uint256) {
    // Assume 100% utilization for conservative requirement
    uint256 _required = _getRequiredCollateralSingleLegNoPartner(
        tokenId,
        index,
        positionSize,
        atTick,
        MAX_UTILIZATION  // 10000
    );
    
    return _required;
}
```

### Key Features

1. **Uses MAX_UTILIZATION**: This means:
   - Short options require 100% collateralization (cash-secured)
   - Long options get enhanced capital efficiency (5% vs 10%)

2. **Credit automatically offsets**: The credit amount is added to balance, naturally offsetting the requirement

### Prepaid Long Option Example

A prepaid long option "pre-pays" for the option cost:

| Component | Effect |
|-----------|--------|
| Credit (100 USDC) | +100 USDC to balance |
| Long Call (5% requirement at max util) | 50 USDC requirement |
| **Net Effect** | +50 USDC excess collateral |

### Cash-Secured Option Example

| Component | Effect |
|-----------|--------|
| Credit (1000 USDC) | +1000 USDC to balance |
| Short Put (100% at max util) | 1000 USDC requirement |
| **Net Effect** | Fully cash-secured |

---

## Loan-Option Composites

These strategies pair an option with a loan position of the same token type.

### Strategies Included

| Option Type | Result |
|-------------|--------|
| Long option + Loan | **Option-Protected Loan** |
| Short option + Loan | **Upfront Short Option** |

### Identification

```solidity
if (_width != widthP) {  // One option, one credit/loan
    if (_tokenType == tokenTypeP) {  // Same asset
        if (isLongP == 0) {  // Partner is loan
            return _width ? _computeLoanOptionComposite(...) : 0;
        }
    }
}
```

### Collateral Calculation

```solidity
function _computeLoanOptionComposite(...) internal view returns (uint256) {
    uint256 _required = _getRequiredCollateralSingleLegNoPartner(index, ...);
    uint256 requiredPartner = _getRequiredCollateralSingleLegNoPartner(partnerIndex, ...);

    if (tokenId.isLong(index) == 0) {
        // Short option + Loan: sum of both
        return _required + requiredPartner;
    } else {
        // Long option + Loan: max of both
        return Math.max(_required, requiredPartner);
    }
}
```

### Upfront Short Option

The short option premium is received as a loan upfront:

| Component | Requirement |
|-----------|-------------|
| Loan (100 USDC) | 120 USDC (100% + 20% SCR) |
| Short Put | 200 USDC |
| **Total** | 320 USDC (sum) |

### Option-Protected Loan

The long option provides downside protection for the borrowed amount:

| Component | Requirement |
|-----------|-------------|
| Loan (1000 USDC) | 1200 USDC |
| Long Put (protection) | 100 USDC |
| **Total** | 1200 USDC (max, not sum) |

The put provides protection, so only the larger requirement applies.

---

## Delayed Swaps

A delayed swap pairs a credit in one token with a loan in another, effectively creating a token exchange with delayed settlement.

### Identification

```solidity
if (_width == 0 && widthP == 0) {  // Both are credits/loans
    if (_tokenType != tokenTypeP) {  // Different tokens
        if (_isLong != isLongP) {  // One credit, one loan
            return _isLong == 0 ? _computeDelayedSwap(...) : 0;
        }
    }
}
```

### Collateral Calculation

```solidity
function _computeDelayedSwap(...) internal view returns (uint256) {
    // Loan amount + standard collateral ratio
    uint256 loanAmount = ...;
    uint256 required = Math.mulDivRoundingUp(
        loanAmount,
        SELLER_COLLATERAL_RATIO + DECIMALS,
        DECIMALS
    );
    
    // Credit amount converted to loan token
    uint256 creditAmount = ...;
    uint256 convertedCredit = PanopticMath.convert0to1(...) or convert1to0(...);
    
    // Requirement is max of loan requirement or converted credit
    return required > convertedCredit ? required : convertedCredit;
}
```

### Example

Swapping ETH for USDC with delayed settlement:

| Component | Token | Amount |
|-----------|-------|--------|
| Credit | ETH | 1 ETH |
| Loan | USDC | 2000 USDC |

If ETH = 2000 USDC:
- Loan requirement: 2000 × 1.2 = 2400 USDC
- Credit value: 1 ETH = 2000 USDC
- Final requirement: max(2400, 2000) = 2400 USDC

---

## Strategy Summary

| Strategy | Capital Efficiency | Key Benefit |
|----------|-------------------|-------------|
| **Strangle** | 50% discount | Only one side can be ITM |
| **Synthetic Stock** | Max of two legs | Positions offset |
| **Spread** | Max loss capped | Defined risk |
| **Prepaid Long** | 5% at max util | Pre-paid premium |
| **Cash-Secured** | 100% | Fully collateralized |
| **Option-Protected Loan** | Max of two | Protection from option |
| **Upfront Short** | Sum of both | Upfront premium receipt |
| **Delayed Swap** | Max of converted | Token exchange |

## Important Notes

1. **Partner Validation**: Legs must have matching `asset` and `optionRatio` to be valid partners
2. **Single Computation**: When legs are partnered, requirement is computed once (for the lower index leg)
3. **Fallback**: If partnered legs don't match any composite pattern, they're computed as individual positions
4. **Option Ratios Must Match**: Partners must have equal option ratios to receive composite treatment
