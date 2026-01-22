# Position Types and Collateral Requirements

This page details the collateral requirements for each basic position type in the Panoptic Protocol. Understanding these foundational requirements is essential before exploring the more complex composite strategies covered in the next section.

## Position Classification

Positions in Panoptic are classified by two key attributes:

| Attribute | Values | Meaning |
|-----------|--------|---------|
| `width` | 0 or > 0 | Width = 0 indicates a loan/credit; Width > 0 indicates an option |
| `isLong` | 0 or 1 | 0 = selling (short), 1 = buying (long) |

This creates four basic position types:

| Width | isLong | Type |
|-------|--------|------|
| 0 | 0 | Loan |
| 0 | 1 | Credit |
| > 0 | 0 | Sold Option (Short) |
| > 0 | 1 | Purchased Option (Long) |

## Loans (width = 0, isLong = 0)

A **Loan** represents borrowed capital from the protocol. When a user takes a loan, they're receiving tokens that they must eventually return, plus any accumulated interest.

### Collateral Requirement

```solidity
if (tokenId.width(index) == 0) {
    if (isLong == 0) {
        // Loan: 100% + sellCollateralRatio(utilization = 0)
        required = Math.mulDivRoundingUp(
            amountMoved,
            SELLER_COLLATERAL_RATIO + DECIMALS,
            DECIMALS
        );
    }
}
```

### Calculation

```
Loan Requirement = amountBorrowed × (1 + SELLER_COLLATERAL_RATIO)
```

**Example** (with 20% seller ratio):
- Borrow 1,000 USDC
- Requirement = 1,000 × (1 + 0.20) = 1,200 USDC worth of collateral

### Rationale

The loan requirement consists of:
1. **100% of borrowed amount**: To ensure the loan can be repaid
2. **Additional collateral ratio**: Buffer for interest accumulation and price movements

Note that loans use `utilization = 0` for the seller collateral ratio, meaning they always use the base rate regardless of current pool utilization.

## Credits (width = 0, isLong = 1)

A **Credit** represents capital deposited by the user that generates yield. Credits act as a form of lending to the protocol.

### Collateral Requirement

```solidity
if (tokenId.width(index) == 0 && tokenId.isLong(index) == 1) {
    // Credit: requirement is 0
    required = 0;
    
    // But the credit value is added to balance
    LeftRightUnsigned amountsMoved = PanopticMath.getAmountsMoved(...);
    credits = tokenId.tokenType(index) == 0 
        ? amountsMoved.rightSlot() 
        : amountsMoved.leftSlot();
}
```

### How Credits Work

Credits require zero collateral because the user has already deposited the capital. Instead, the credit value is **added to the user's available balance**:

```solidity
// In _getMargin
balance0 += creditAmounts.rightSlot();
balance1 += creditAmounts.leftSlot();
```

### Use Cases

Credits are typically used in combination with other positions (see [Composite Strategies](./07-composite-strategies.md)):
- **Prepaid long options**: Credit + long option
- **Cash-secured options**: Credit + short option
- **Delayed swaps**: Credit in one token + loan in another

> **Implementation Note**: For details on how zero-width legs (loans and credits) are processed at the SFPM level without Uniswap liquidity interaction, see [SFPM Position Creation](./16-sfpm-position-creation.md#zero-width-legs-loans-and-credits).

## Sold Options (width > 0, isLong = 0)

Sold (short) options represent liquidity provided to the Uniswap pool. The seller earns premium but takes on risk if the price moves against their position.

### Base Collateral Calculation

```solidity
(baseRequired, baseCollateralRatio) = _getRequiredCollateralAtUtilization(
    amountMoved,
    isLong, // 0 for sold options
    poolUtilization
);
required += baseRequired;
```

The base requirement uses `_sellCollateralRatio(utilization)` which varies from `SELLER_COLLATERAL_RATIO` (e.g., 20%) at low utilization to 100% at saturated utilization.

### In-Range Adjustments

When a sold option is in-the-money (ITM) or at-the-money (ATM), additional collateral is required based on how deep ITM the position is.

#### Price Ratio Calculation

```solidity
uint160 ratio = tokenType == 1  // Put option
    ? Math.getSqrtRatioAtTick(2 * (atTick - strike))  // price/strike
    : Math.getSqrtRatioAtTick(2 * (strike - atTick)); // strike/price
```

For puts: As price falls below strike, the ratio increases
For calls: As price rises above strike, the ratio increases

#### Collateral Components

Following Reg-T inspired guidelines, the requirement is the maximum of three values:

**R0 - Minimum Floor**:
```solidity
uint256 r0 = required / 2;
```
A floor of 50% of the base requirement.

**R1 - OTM Adjustment**:
```solidity
uint256 p0 = amountMoved + Math.mulDiv96RoundingUp(required, ratio);
uint256 p1 = Math.mulDiv96RoundingUp(amountMoved, ratio);
r1 = p0 > p1 ? p0 - p1 : 0;
```
Reduces requirement as the option moves out-of-the-money.

**R2 - In-Range Interpolation**:
```solidity
if ((atTick < tickUpper) && (atTick >= tickLower)) {
    uint160 scaleFactor = Math.getSqrtRatioAtTick((tickUpper - tickLower));
    r2 = Math.mulDivRoundingUp(
        amountMoved * (DECIMALS - baseCollateralRatio),
        (scaleFactor - ratio),
        DECIMALS * (scaleFactor + Constants.FP96)
    ) + r0;
}
```
When current price is within the position's range, interpolates between upper and lower tick requirements.

#### Final Requirement

```solidity
required = Math.max(Math.max(r2, r1), r0);
```

## Purchased Options (width > 0, isLong = 1)

Purchased (long) options represent removed liquidity from the Uniswap pool. The buyer pays premium upfront and has limited downside but potential upside.

### Base Collateral Calculation

```solidity
(baseRequired, baseCollateralRatio) = _getRequiredCollateralAtUtilization(
    amountMoved,
    isLong, // 1 for purchased options
    poolUtilization
);
required += baseRequired;
```

The base requirement uses `_buyCollateralRatio(utilization)` which varies from `BUYER_COLLATERAL_RATIO` (e.g., 10%) at low utilization down to `BUYER_COLLATERAL_RATIO / 2` (e.g., 5%) at saturated utilization.

### Exponential Decay for OTM Options

Long options that move out-of-the-money receive a significant collateral discount through an exponential decay function:

```solidity
// Distance from current price to strike
uint256 distanceFromStrike = Math.max(
    positionWidth / 2,
    atTick > strike ? uint256(uint24(atTick - strike)) : uint256(uint24(strike - atTick))
);

// Calculate exponential decay factor
uint256 scaledRatio = (distanceFromStrike * DECIMALS) / positionWidth;
uint256 shifts = scaledRatio / LN2_SCALED;
uint256 remainder = scaledRatio % LN2_SCALED;
uint256 expFractional = Math.sTaylorCompounded(remainder, DECIMALS);
uint256 expValue = (expFractional << shifts);

// Apply decay
required = Math.min(
    required,
    (DECIMALS * _required * positionWidth) / (distanceFromStrike * expValue) + TEN_BPS
);
```

### Decay Behavior

The exponential decay ensures:
- **ATM options**: Full collateral requirement
- **1 width OTM**: ~50% of base requirement
- **2 widths OTM**: ~25% of base requirement
- **Deep OTM**: Approaches minimum (10 bps floor)

This reflects the decreasing probability that far OTM options will ever become valuable.

### Why Long Options Need Collateral

Unlike traditional options where buyers have no further obligation after paying premium, Panoptic long options:
1. Are collateralized by removed Uniswap liquidity
2. Accumulate spread (premium) over time
3. May need to settle owed premium to short counterparts

The collateral requirement ensures these obligations can be met.

## Collateral Calculation Flow

```
┌─────────────────────┐
│   Position Data     │
│  (tokenId, size)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Check width == 0?  │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌─────────┐
│  Loan/  │  │ Option  │
│ Credit  │  │         │
└────┬────┘  └────┬────┘
     │            │
     ▼            ▼
┌─────────┐  ┌─────────────┐
│ isLong? │  │ Base Ratio  │
└────┬────┘  │ @ utilization│
     │       └──────┬──────┘
 ┌───┴───┐         │
 ▼       ▼         ▼
Loan   Credit  ┌─────────┐
100%+   0%     │ isLong? │
SCR    (add to └────┬────┘
       balance)  ┌──┴──┐
                 ▼     ▼
              Short   Long
              ITM     OTM
              Adjust  Decay
```

## Summary Table

| Position Type | Base Requirement | Adjustments |
|---------------|------------------|-------------|
| **Loan** | 100% + sellRatio(0) | None |
| **Credit** | 0% (adds to balance) | None |
| **Sold Option** | sellRatio(utilization) | ITM/ATM increases |
| **Long Option** | buyRatio(utilization) | OTM decay |

## Important Notes

1. **Utilization Matters**: Collateral ratios change with pool utilization. Higher utilization means higher requirements for sellers and lower requirements for buyers.

2. **Price Sensitivity**: Sold options become more expensive to collateralize as they move in-the-money. Long options become cheaper as they move out-of-the-money.

3. **Minimum Floor**: Even far OTM positions maintain a minimum collateral requirement (at least 1 unit plus any floors).

4. **Risk Partners**: Positions with risk partners may have significantly different requirements. See [Composite Strategies](./07-composite-strategies.md) for details.
