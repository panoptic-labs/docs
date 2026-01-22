# Guardian Role

The Guardian is a privileged address with emergency oversight capabilities for the Panoptic Protocol. This role provides a critical safety mechanism that can intervene during extreme market conditions or protocol emergencies when automatic protections may be insufficient.

## Overview

The Guardian role is designed as a limited-scope emergency intervention system. Unlike a full administrative role, the Guardian cannot modify protocol parameters, upgrade contracts, or access user funds. Its sole purpose is to provide an additional layer of protection during crisis scenarios.

## Guardian Powers

### Pool Locking

The Guardian can force any PanopticPool into a locked safe mode state:

```solidity
function lockPool(PanopticPool pool) external onlyGuardian {
    emit GuardianSafeModeUpdated(true);
    pool.lockSafeMode();
}
```

**Effect**: When a pool is locked, its internal `lockMode` value is set, which adds to the automatically computed safe mode level. This ensures the pool operates under conservative risk parameters regardless of current market conditions.

**Use Cases**:
- Suspected oracle manipulation that hasn't triggered automatic detection
- Known smart contract vulnerability requiring immediate protection
- External market events (exchange hacks, stablecoin depegs) not yet reflected in prices
- Protocol upgrade preparation requiring temporary risk reduction

### Pool Unlocking

The Guardian can remove a forced safe mode lock:

```solidity
function unlockPool(PanopticPool pool) external onlyGuardian {
    emit GuardianSafeModeUpdated(true);
    pool.unlockSafeMode();
}
```

**Effect**: Removes the guardian-imposed lock, returning the pool to using only automatically computed safe mode levels.

**Requirements**: Should only be used after:
- The emergency condition has been resolved
- Market conditions have stabilized
- Any underlying issues have been addressed

### Token Collection

The Guardian can collect any tokens sent to the Risk Engine contract:

```solidity
function collect(address token, address recipient, uint256 amount) public onlyGuardian
function collect(address token, address recipient) external onlyGuardian  // Collects full balance
```

**Purpose**: The Risk Engine is not designed to hold funds. This function allows recovery of:
- Tokens accidentally sent to the contract
- Dust amounts from rounding
- Any funds that shouldn't be in the contract

**Constraints**:
- Cannot collect from user positions (those are in separate contracts)
- Reverts if amount is zero (`Errors.BelowMinimumRedemption`)
- Emits `TokensCollected` event for transparency

## Design Principles

### Minimal Authority

The Guardian's powers are intentionally narrow:

| Can Do | Cannot Do |
|--------|-----------|
| Lock pools into safe mode | Modify collateral ratios |
| Unlock pools from safe mode | Change oracle parameters |
| Collect tokens from Risk Engine | Access user funds |
| | Upgrade contracts |
| | Modify interest rates |
| | Change liquidation parameters |

### One-Way Escalation

The Guardian can only *increase* the effective safe mode level, never relax it below what automatic detection computes. This means:

- If automatic safe mode detects level 2, Guardian lock adds to it
- Guardian cannot reduce safe mode below automatic levels
- Removing the lock returns to automatic detection, not to level 0

### Transparency

All Guardian actions emit events:

```solidity
event GuardianSafeModeUpdated(bool lockMode);
event TokensCollected(address indexed token, address indexed recipient, uint256 amount);
```

These events enable:
- Real-time monitoring of Guardian activity
- Post-incident analysis
- Community oversight

## Access Control

```solidity
address public immutable GUARDIAN;

modifier onlyGuardian() {
    _onlyGuardian();
    _;
}

function _onlyGuardian() internal view {
    if (msg.sender != address(GUARDIAN)) revert Errors.NotGuardian();
}
```

The Guardian address is:
- Set at contract deployment (immutable)
- Cannot be changed after deployment
- Publicly readable via `guardian()` function

## Operational Considerations

### When to Lock

The Guardian should consider locking when:

1. **Oracle Anomalies**: Price feeds appear manipulated but haven't crossed automatic thresholds
2. **External Events**: Major market events (exchange failures, regulatory actions) that could impact the protocol
3. **Security Incidents**: Known vulnerabilities being actively exploited
4. **Unusual Activity**: Suspicious transaction patterns suggesting attacks

### When to Unlock

The Guardian should unlock when:

1. **Conditions Resolved**: The triggering emergency has ended
2. **Market Stability**: Prices have returned to expected ranges
3. **Fixes Deployed**: Any underlying issues have been addressed
4. **Community Consensus**: (If applicable) Agreement that normal operation can resume

### Response Time Considerations

The Guardian mechanism assumes:
- Rapid response capability (minutes to hours, not days)
- 24/7 monitoring of protocol conditions
- Clear escalation procedures for emergencies

## Relationship to Automatic Safe Mode

The Guardian and automatic safe mode work together:

```
Effective Safe Mode = Automatic Detection + Guardian Lock

Where:
- Automatic Detection = externalShock + internalDisagreement + highDivergence (0-3)
- Guardian Lock = 0 (unlocked) or added value (locked)
```

This layered approach ensures:
- **Normal conditions**: Fully automatic operation
- **Detected volatility**: Automatic protection activates
- **Undetected risks**: Guardian can intervene manually
- **All scenarios covered**: Multiple independent protection mechanisms

## Best Practices

### For Protocol Operators

1. **Monitor continuously**: Track all conditions that might warrant Guardian intervention
2. **Document decisions**: Maintain records of why locks are applied/removed
3. **Communicate clearly**: Inform users of any Guardian actions and their reasoning
4. **Test procedures**: Regularly verify Guardian key accessibility and response procedures

### For Users

1. **Check status**: Verify pool lock status before large operations
2. **Monitor events**: Subscribe to Guardian events for early warning
3. **Understand implications**: Know how locked mode affects your positions
4. **Plan accordingly**: Have contingencies for periods of restricted operation
