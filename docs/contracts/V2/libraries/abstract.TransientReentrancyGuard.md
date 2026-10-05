---
sidebar_label: "TransientReentrancyGuard"
title: "TransientReentrancyGuard (V2)"
---
# TransientReentrancyGuard (V2)

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/libraries/TransientReentrancyGuard.sol)

**Authors:**
Axicon Labs Limited, Modified from Solmate (https://github.com/transmissions11/solmate/blob/main/src/utils/TransientReentrancyGuard.sol), Modified from Soledge (https://github.com/Vectorized/soledge/blob/main/src/utils/ReentrancyGuard.sol)

Gas optimized reentrancy protection for smart contracts. Leverages Cancun transient storage.


## State Variables
### REENTRANCY_GUARD_SLOT

```solidity
uint256 private constant REENTRANCY_GUARD_SLOT = 0x8053dfe21e206073e7d912b6bcd2323894159cfd58d0a607082c42be308afb86
```


## Functions
### nonReentrant

Prevents reentrant calls by setting and resetting the reentrancy guard

Sets the guard before function execution and resets it after. Reverts if already entered


```solidity
modifier nonReentrant() virtual;
```

### ensureNonReentrantView

Guards view functions against read-only reentrancy.

If the reentrancy lock is currently active (meaning we are inside a state-changing function),
this modifier will revert. This ensures external callers cannot read inconsistent state.


```solidity
modifier ensureNonReentrantView() virtual;
```

### _ensureNonReentrantView

Guards view functions against read-only reentrancy

If the reentrancy lock is currently active (meaning we are inside a state-changing function),
this modifier will revert. This ensures external callers cannot read inconsistent state


```solidity
function _ensureNonReentrantView() internal view;
```

### _nonReentrantSet

Sets the reentrancy guard using transient storage

Checks if the guard is already set and reverts if so. Stores a non-zero value (address()) in the guard slot


```solidity
function _nonReentrantSet() internal;
```

### _nonReentrantReset

Resets the reentrancy guard to zero in transient storage

Must be called to clear the guard as transient storage persists until the end of the transaction, not just the call frame


```solidity
function _nonReentrantReset() internal;
```

### reentrancyGuardEntered

Returns whether the reentrancy guard is currently entered (a protected function is executing).


```solidity
function reentrancyGuardEntered() public view returns (bool entered);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`entered`|`bool`|True if the reentrancy guard is active, false otherwise|
