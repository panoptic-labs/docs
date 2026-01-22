# Oracle System

The Panoptic Protocol employs a sophisticated internal oracle system designed to provide stable, manipulation-resistant price data for all risk calculations. Rather than relying on a single price point, the oracle combines multiple exponential moving averages (EMAs) and a median filter to create robust price feeds.

## Overview

The oracle system serves several critical functions:

1. **Solvency Calculations**: Determining at which price(s) to evaluate account health
2. **Safe Mode Detection**: Identifying periods of extreme volatility
3. **Force Exercise Pricing**: Providing fair prices for involuntary position closures
4. **Liquidation Protection**: Preventing manipulation-based liquidations

## EMA Architecture

The oracle maintains four distinct EMAs, each with a different time horizon:

| EMA Type | Period | Purpose |
|----------|--------|---------|
| **Spot EMA** | 3 minutes (180s) | Tracks rapid price movements |
| **Fast EMA** | 10 minutes (600s) | Primary solvency reference |
| **Slow EMA** | 1 hour (3,600s) | Volatility baseline |
| **Eons EMA** | 6 hours (21,600s) | Long-term trend anchor |

These EMAs are packed efficiently into a single storage slot (`OraclePack`) using bit manipulation, where the periods are encoded as:

```
EMA_PERIODS = 180 + (600 << 24) + (3600 << 48) + (21600 << 72)
```

### EMA Update Formula

EMAs are updated using a linear approximation of exponential decay:

```solidity
newEMA = oldEMA + (timeDelta × (newTick - oldEMA)) / period
```

This approximates `exp(-x) ≈ 1-x` for computational efficiency.

### Convergence Cap (75% Rule)

To prevent excessive convergence after periods of inactivity, the timeDelta is capped at 75% of each EMA's period:

```solidity
// Applied in cascade from longest to shortest period
if (timeDelta > (3 * EMA_PERIOD_EONS) / 4) timeDelta = (3 * EMA_PERIOD_EONS) / 4;
// ... then slowEMA, fastEMA, spotEMA
```

This cascading cap ensures that:
- EMAs never converge more than 75% toward the new tick in a single update
- Longer-period EMAs cap the timeDelta first, affecting shorter periods
- Extended oracle staleness doesn't cause sudden price jumps when updates resume

## Core Oracle Functions

### `getOracleTicks`

This function computes and returns all oracle tick values from the current Uniswap pool state:

```solidity
function getOracleTicks(
    int24 currentTick,
    OraclePack _oraclePack
) external view returns (
    int24 spotTick,      // Fast oracle tick (10-minute EMA)
    int24 medianTick,    // Slow oracle tick (median of 8 observations)
    int24 latestTick,    // Most recent observation
    OraclePack oraclePack // Updated oracle state
)
```

**Return Values:**
- **spotTick**: The 10-minute EMA, used as the primary price reference for normal solvency checks
- **medianTick**: The median of 8 stored price observations, providing outlier resistance
- **latestTick**: The most recent tick observation stored in the internal oracle
- **oraclePack**: The potentially updated oracle state (if a new observation was warranted)

### `twapEMA`

Calculates a heavily smoothed, weighted average price that is highly resistant to manipulation:

```solidity
function twapEMA(OraclePack oraclePack) external pure returns (int24)
```

The blended TWAP is computed with the following weightings:
- **60%** from Fast EMA (10 minutes)
- **30%** from Slow EMA (1 hour)
- **10%** from Eons EMA (6 hours)

```
twapEMA = (6 × fastEMA + 3 × slowEMA + 1 × eonsEMA) / 10
```

This weighted combination provides a price feed that:
- Responds to genuine price movements (via the fast EMA component)
- Resists short-term manipulation (via slow and eons components)
- Provides stability during volatile periods

### `computeInternalMedian`

Updates the internal observation buffer and returns the current median:

```solidity
function computeInternalMedian(
    OraclePack oraclePack,
    int24 currentTick
) external view returns (
    int24 medianTick,
    OraclePack updatedOraclePack
)
```

The function:
1. Computes the median from the current queue (average of rank 3 and rank 4 values)
2. Checks if a new epoch has begun (64-second boundary crossed)
3. If new epoch: clamps the new tick, inserts into sorted queue, updates all EMAs
4. Returns the median tick and updated oracle pack (or empty pack if no update)

**Epoch Check:**
```solidity
currentEpoch = (block.timestamp >> 6) & 0xFFFFFF;
differentEpoch = currentEpoch != recordedEpoch;
timeDelta = int256(currentEpoch - recordedEpoch) * 64;  // Convert to seconds
```

**Insert Operation:**
When inserting, the function:
- Clamps the new tick to prevent manipulation
- Rebases the reference tick if residuals exceed threshold
- Finds the correct sorted position using the order map
- Shifts rankings to accommodate the new observation
- Updates all four EMAs with the clamped tick

## Solvency Tick Selection

The `getSolvencyTicks` function determines which price points to use when evaluating account solvency:

```solidity
function getSolvencyTicks(
    int24 currentTick,
    OraclePack _oraclePack
) external view returns (int24[] memory, OraclePack)
```

### Normal Operation
Under normal market conditions (low deviation between oracle values), solvency is checked against a single tick:
- The **spotTick** (10-minute EMA)

### High Deviation Mode
When oracle values diverge significantly, the function returns four ticks for more comprehensive solvency checking:
1. spotTick
2. medianTick
3. latestTick
4. currentTick

**Deviation Threshold:**
The switch to multi-tick checking occurs when the Euclidean norm of deviations exceeds `MAX_TICKS_DELTA` (953 ticks, ~10%):

```
(spotTick - medianTick)² + (latestTick - medianTick)² + (currentTick - medianTick)² > MAX_TICKS_DELTA²
```

This approach:
- Maintains efficiency during normal operation (single solvency check)
- Provides conservative protection during volatile periods (must pass all four checks)
- Uses Euclidean distance which is more sensitive than checking each deviation individually

## Observation Queue

The oracle maintains an 8-slot observation queue for computing the median tick. This queue is:

- **Sorted**: Observations are kept in sorted order for efficient median computation
- **Time-gated**: New observations are only inserted when sufficient time has passed (epoch change)
- **Packed**: All 8 observations fit within the `OraclePack` storage structure

### OraclePack Bit Layout

The entire oracle state is packed into a single 256-bit word:

```
Bits 255-232 (24 bits): epoch        - 64-second epoch timestamp
Bits 231-208 (24 bits): orderMap     - Sorted order of 8 observations (8 × 3-bit indices)
Bits 207-186 (22 bits): spotEMA      - 3-minute EMA tick
Bits 185-164 (22 bits): fastEMA      - 10-minute EMA tick
Bits 163-142 (22 bits): slowEMA      - 1-hour EMA tick
Bits 141-120 (22 bits): eonsEMA      - 6-hour EMA tick
Bits 119-118 (2 bits):  lockMode     - Guardian override (0-3)
Bits 117-96  (22 bits): referenceTick - Base tick for residual calculation
Bits 95-0    (96 bits): residuals    - 8 × 12-bit signed residuals
```

### Epoch-Based Timekeeping

The oracle uses 64-second epochs instead of raw timestamps:

```solidity
currentEpoch = (block.timestamp >> 6) & 0xFFFFFF  // 64-second intervals
```

This provides:
- **Gas efficiency**: Smaller storage values
- **Y2K38 avoidance**: 24-bit epochs support ~34 million years
- **Rate limiting**: Natural 64-second minimum between observations

### Residual Storage

Observations are stored as 12-bit signed residuals relative to a reference tick:

```
actualTick = referenceTick + residual
```

This compression allows 8 observations to fit in 96 bits (12 bits × 8).

### Order Map

The 24-bit order map maintains sorted order without physically reordering data:

```
orderMap bits:  [rank7][rank6][rank5][rank4][rank3][rank2][rank1][rank0]
                   3b     3b     3b     3b     3b     3b     3b     3b
```

Each 3-bit segment points to a slot index (0-7). Position indicates rank (0 = smallest, 7 = largest).

### Median Calculation

The median is computed from the 4th and 5th ranked values (indices 3 and 4):

```solidity
medianTick = referenceTick + (rank3_residual + rank4_residual) / 2
```

This provides a true median for even-numbered sets.

### Tick Clamping

New observations are clamped to prevent single-block manipulation:

```solidity
// Clamp newTick to be within MAX_MEDIAN_DELTA of the last observation
int24 lastTick = referenceTick + residual[0];

if (newTick > lastTick + MAX_MEDIAN_DELTA) {
    clamped = lastTick + MAX_MEDIAN_DELTA;
} else if (newTick < lastTick - MAX_MEDIAN_DELTA) {
    clamped = lastTick - MAX_MEDIAN_DELTA;
} else {
    clamped = newTick;
}
```

This limits how much any single observation can move the median, requiring sustained price movement over multiple epochs to shift the median significantly.

### Reference Tick Rebasing

When residuals exceed the 12-bit signed integer range (±2047), the oracle rebases:

```solidity
if (lastResidual > MAX_RESIDUAL_THRESHOLD || lastResidual < -MAX_RESIDUAL_THRESHOLD) {
    // Move reference tick to current median
    newReferenceTick = getMedianTick(oraclePack);
    
    // Recalculate all residuals relative to new reference
    for (uint8 i = 0; i < 8; i++) {
        newResidual[i] = oldResidual[i] - (newReferenceTick - oldReferenceTick);
    }
}
```

This maintains precision during large price movements while keeping residuals within storage constraints.

The median filter provides robustness against:
- Flash loan attacks
- Single-block price manipulation
- Temporary liquidity imbalances

## Price Manipulation Resistance

The oracle system incorporates multiple layers of manipulation resistance:

### Layer 1: EMA Smoothing
All price feeds use exponential moving averages, which inherently dampen sudden price movements. The longer the EMA period, the more manipulation-resistant the price feed. The 75% convergence cap ensures that even after extended inactivity, a single observation cannot dramatically shift any EMA.

### Layer 2: Tick Clamping
New observations are clamped to be within `MAX_MEDIAN_DELTA` of the previous observation:

```solidity
// Prevents any single observation from jumping more than MAX_MEDIAN_DELTA ticks
clampedTick = clamp(newTick, lastTick - MAX_MEDIAN_DELTA, lastTick + MAX_MEDIAN_DELTA)
```

This means an attacker must sustain manipulation over multiple 64-second epochs to significantly affect the median.

### Layer 3: Multi-Period Validation
By comparing EMAs of different periods, the system can detect when short-term prices diverge abnormally from longer-term trends. This triggers safe mode, which requires solvency at multiple price points.

### Layer 4: Median Filtering
The 8-observation median eliminates the impact of extreme outliers. With tick clamping, an attacker would need to:
- Manipulate prices for at least 4 consecutive epochs (256+ seconds)
- Sustain each manipulation within the delta cap
- Avoid triggering safe mode's multi-tick solvency checks

### Layer 5: Conservative Fallback
During high deviation periods, the system automatically switches to checking solvency at multiple price points (spot, median, latest, current), ensuring accounts are solvent across a range of prices.

## Integration with Safe Mode

The oracle system directly feeds into Safe Mode detection. When oracle values diverge beyond configured thresholds, the protocol automatically applies more conservative risk parameters. See [Safe Mode](./02-safe-mode.md) for details on how oracle deviations trigger protective measures.

## Liquidation Price Constraints

During liquidations, an additional constraint applies:

```solidity
MAX_TWAP_DELTA_LIQUIDATION = 513 ticks (~5%)
```

This limits how far the current tick can deviate from the TWAP during liquidation, preventing attackers from:
- Temporarily moving the price to trigger liquidations
- Executing liquidations at manipulated prices that harm the liquidatee
