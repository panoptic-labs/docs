# TransientReentrancyGuard
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/libraries/TransientReentrancyGuard.sol)

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


```solidity
function _ensureNonReentrantView() internal view;
```

### _nonReentrantSet


```solidity
function _nonReentrantSet() internal;
```

### _nonReentrantReset


```solidity
function _nonReentrantReset() internal;
```

### reentrancyGuardEntered


```solidity
function reentrancyGuardEntered() public view returns (bool entered);
```

