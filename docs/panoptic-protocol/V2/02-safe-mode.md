# Safe Mode

Safe Mode is an automatic protection mechanism that activates during periods of extreme market volatility. When triggered, the protocol applies more conservative risk parameters to protect both the protocol and its users from potential losses during unstable market conditions.

## Overview

Safe Mode operates as a graduated response system rather than a simple on/off switch. The protocol continuously monitors multiple oracle metrics and assigns a numerical "safe mode level" based on how many volatility conditions are currently triggered.

## Detection Logic

The `isSafeMode` function evaluates three independent conditions and returns a cumulative score:

```solidity
function isSafeMode(
    int24 currentTick,
    OraclePack oraclePack
) public pure returns (uint8 safeMode)
```

### Condition 1: External Shock

**Trigger**: The live spot price deviates too far from the responsive Spot EMA.

```
|currentTick - spotEMA| > MAX_TICKS_DELTA (953 ticks)
```

**What it detects**: Sudden, dramatic price movements that could indicate:
- Flash crashes
- Flash loan attacks
- Single-block manipulation attempts
- Genuine market shocks (black swan events)

**Threshold**: ~10% price movement (953 ticks represents approximately a 10% price change in either direction)

### Condition 2: Internal Disagreement

**Trigger**: The Spot EMA diverges significantly from the Fast EMA.

```
|spotEMA - fastEMA| > MAX_TICKS_DELTA / 2 (476 ticks)
```

**What it detects**: High internal volatility where:
- Short-term price is moving faster than the 10-minute average can track
- Sustained directional pressure exists
- Market conditions are unusually turbulent

**Threshold**: ~5% divergence between the 3-minute and 10-minute EMAs

### Condition 3: High Divergence

**Trigger**: The median tick deviates significantly from the Slow EMA.

```
|medianTick - slowEMA| > MAX_TICKS_DELTA × 2 (1,906 ticks)
```

**What it detects**: Staleness or structural divergence where:
- The observation queue has become significantly out of sync with the smoothed average
- Oracle updates may have been delayed
- Prolonged volatility has caused persistent divergence

**Threshold**: ~20% divergence, using a higher tolerance to account for natural lag

## Safe Mode Levels

The returned `safeMode` value represents the cumulative count of triggered conditions:

| Level | Conditions Triggered | Market State |
|-------|---------------------|--------------|
| 0 | None | Normal operation |
| 1 | One condition | Elevated caution |
| 2 | Two conditions | High volatility |
| 3 | All three conditions | Extreme volatility |
| 4+ | Guardian lock active | Emergency mode |

### Guardian Lock Override

The safe mode level can be further increased by a guardian-initiated lock:

```solidity
uint8 lockMode = oraclePack.lockMode();
safeMode = (externalShock ? 1 : 0) + 
           (internalDisagreement ? 1 : 0) + 
           (highDivergence ? 1 : 0) + 
           lockMode;
```

When the guardian locks a pool, `lockMode` adds to the safe mode level, ensuring that even if automatic conditions resolve, the pool remains in a protected state until manually unlocked.

#### Lock Mode Implementation

The lock mode is stored as a 2-bit field (bits 118-119) within the OraclePack:

```solidity
// Lock pool - sets lockMode to 3
function lock(OraclePack self) returns (OraclePack) {
    return OraclePack.wrap((OraclePack.unwrap(self) & LOCK_MODE_MASK) + LOCK_MODE_ON);
}

// Unlock pool - sets lockMode to 0
function unlock(OraclePack self) returns (OraclePack) {
    return OraclePack.wrap((OraclePack.unwrap(self) & LOCK_MODE_MASK) + LOCK_MODE_OFF);
}
```

| Lock Mode Value | Effect |
|-----------------|--------|
| 0 | No guardian override |
| 1-2 | Partial override (reserved) |
| 3 | Full lock - adds 3 to safe mode level |

When `lockMode = 3`, the effective safe mode becomes at least 3 regardless of market conditions, triggering maximum protection.

## Effects of Safe Mode

When Safe Mode is active, the protocol's risk parameters become more conservative through the `getRiskParameters` function:

```solidity
function getRiskParameters(
    int24 currentTick,
    OraclePack oraclePack,
    uint256 builderCode
) external view returns (RiskParameters)
```

The safe mode level is embedded in the returned `RiskParameters` struct, which downstream contracts use to:

1. **Adjust Collateral Requirements**: Higher safe mode levels may require additional collateral
2. **Restrict Operations**: Certain actions may be limited or prohibited
3. **Use Conservative Prices**: Solvency checks use multiple price points instead of a single reference
4. **Increase Liquidation Thresholds**: More aggressive liquidation parameters protect the protocol

## Design Philosophy

### Graduated Response

Rather than a binary safe mode, the graduated approach allows:
- **Proportional responses** to different severity levels
- **Smoother transitions** as volatility increases or decreases
- **Fine-grained control** over risk parameters

### Multiple Independent Signals

Using three independent conditions provides:
- **Redundancy**: No single metric can be manipulated to avoid safe mode
- **Comprehensiveness**: Different types of volatility are detected
- **Specificity**: The combination of triggers indicates the nature of market stress

### Automatic Recovery

Safe mode naturally deactivates as:
- EMAs converge back to normal
- Price stabilizes within acceptable ranges
- The median queue updates with stable observations

This automatic recovery prevents extended periods of conservative operation after temporary volatility spikes.

## Thresholds Summary

| Condition | Metric | Threshold | Approximate % |
|-----------|--------|-----------|---------------|
| External Shock | \|current - spotEMA\| | 953 ticks | ~10% |
| Internal Disagreement | \|spotEMA - fastEMA\| | 476 ticks | ~5% |
| High Divergence | \|median - slowEMA\| | 1,906 ticks | ~20% |

## Interaction with Other Systems

### Oracle System
Safe mode detection relies entirely on oracle data. The quality and timeliness of oracle updates directly affects safe mode accuracy.

### Guardian Controls
The guardian can override automatic safe mode detection by locking pools, providing an additional layer of protection during unprecedented events.

### Collateral Calculations
All collateral requirement functions receive the current safe mode level through `RiskParameters`, allowing dynamic adjustment of margin requirements.

### Liquidations
Liquidation constraints are tightened during safe mode, with stricter price deviation limits to prevent unfair liquidations during volatility.
