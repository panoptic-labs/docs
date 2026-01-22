# OraclePackLibrary
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/types/OraclePack.sol)

**Title:**
A Panoptic OraclePack. Tracks a set of 8 price observations, 4 EMAs, and a timestamp to compute the internal oracle price(s)

**Author:**
Axicon Labs Limited


## State Variables
### BITMASK_UINT22

```solidity
uint256 internal constant BITMASK_UINT22 = 0x3FFFFF
```


### BITMASK_UINT88

```solidity
uint256 internal constant BITMASK_UINT88 = 0xFFFFFFFFFFFFFFFFFFFFFF
```


### UPPER_138BITS_MASK

```solidity
uint256 internal constant UPPER_138BITS_MASK = ~(uint256(1 << 138) - 1)
```


### LOCK_MODE_MASK

```solidity
uint256 internal constant LOCK_MODE_MASK = ~(uint256(3) << 118)
```


### LOCK_MODE_ON

```solidity
uint256 internal constant LOCK_MODE_ON = uint256(3) << 118
```


### LOCK_MODE_OFF

```solidity
uint256 internal constant LOCK_MODE_OFF = 0
```


## Functions
### storeOraclePack

Create a new `OraclePack` given the relevant parameters.


```solidity
function storeOraclePack(
    uint256 _currentEpoch,
    uint256 _newOrderMap,
    uint256 _updatedEMAs,
    int24 _referenceTick,
    uint96 _currentResiduals,
    int24 _latestResidual,
    uint256 _lockMode
) internal pure returns (OraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_currentEpoch`|`uint256`|The current epoch timestamp|
|`_newOrderMap`|`uint256`|The new order map for the observations|
|`_updatedEMAs`|`uint256`|The updated EMA values|
|`_referenceTick`|`int24`|The reference tick|
|`_currentResiduals`|`uint96`|The current residual ticks|
|`_latestResidual`|`int24`|The latest residual tick|
|`_lockMode`|`uint256`|The lock mode state|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`OraclePack`|The new OraclePack|


### packEMAs

Concatenate all oracle ticks into a single uint96.


```solidity
function packEMAs(int24 _spotEMA, int24 _fastEMA, int24 _slowEMA, int24 _eonsEMA) internal pure returns (uint96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_spotEMA`|`int24`|The spot EMA tick|
|`_fastEMA`|`int24`|The fast EMA tick|
|`_slowEMA`|`int24`|The slow EMA tick|
|`_eonsEMA`|`int24`|The eons EMA tick|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint96`|A 96bit word concatenating all 4 input ticks|


### lock

Lock the oracle pack.


```solidity
function lock(OraclePack self) internal pure returns (OraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to lock|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`OraclePack`|The locked OraclePack|


### unlock

Unlock the oracle pack.


```solidity
function unlock(OraclePack self) internal pure returns (OraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to unlock|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`OraclePack`|The unlocked OraclePack|


### EMAs

Get the EMAs of `self`.


```solidity
function EMAs(OraclePack self) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the EMAs from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The EMAs of `self`|


### lastTick

Get the lastTick of `self`.


```solidity
function lastTick(OraclePack self) internal pure returns (int24 _lastTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the lastTick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_lastTick`|`int24`|The lastTick of `self`|


### spotEMA

Get the spotEMA of `self`.


```solidity
function spotEMA(OraclePack self) internal pure returns (int24 _spotEMA);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the spotEMA from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_spotEMA`|`int24`|The spotEMA of `self`|


### fastEMA

Get the fastEMA of `self`.


```solidity
function fastEMA(OraclePack self) internal pure returns (int24 _fastEMA);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the fastEMA from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_fastEMA`|`int24`|The fastEMA of `self`|


### slowEMA

Get the slowEMA of `self`.


```solidity
function slowEMA(OraclePack self) internal pure returns (int24 _slowEMA);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the slowEMA from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_slowEMA`|`int24`|The slowEMA of `self`|


### eonsEMA

Get the eonsEMA of `self`.


```solidity
function eonsEMA(OraclePack self) internal pure returns (int24 _eonsEMA);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the eonsEMA from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_eonsEMA`|`int24`|The eonsEMA of `self`|


### getEMAs

Get the all the EMA ticks of `self`.


```solidity
function getEMAs(OraclePack self)
    internal
    pure
    returns (int24 _spotEMA, int24 _fastEMA, int24 _slowEMA, int24 _eonsEMA, int24 _medianTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the EMAs from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_spotEMA`|`int24`|The spotEMA of `self`|
|`_fastEMA`|`int24`|The fastEMA of `self`|
|`_slowEMA`|`int24`|The slowEMA of `self`|
|`_eonsEMA`|`int24`|The eonsEMA of `self`|
|`_medianTick`|`int24`|The median tick of `self`|


### orderMap

Get the order map of `self`.


```solidity
function orderMap(OraclePack self) internal pure returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the order map from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The order map of `self`|


### referenceTick

Get the reference tick of `self`.


```solidity
function referenceTick(OraclePack self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the reference tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The last reference tick of `self`|


### residualTickOrdered

Get the residual tick of `self` at position i.


```solidity
function residualTickOrdered(OraclePack self, uint8 i) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the residual tick from|
|`i`|`uint8`|The position index|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The residual tick of `self` at position i|


### residualTick

Get the residual tick of `self` at position i.


```solidity
function residualTick(OraclePack self, uint8 i) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the residual tick from|
|`i`|`uint8`|The position index|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The residual tick of `self` at position i|


### currentResiduals

Get the current residuals of `self`.


```solidity
function currentResiduals(OraclePack self) internal pure returns (uint96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the current residuals from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint96`|The current residuals of `self`|


### lockMode

Get the lock mode  of `self`.


```solidity
function lockMode(OraclePack self) internal pure returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the lock mode from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The lock mode of `self`|


### timestamp

Get the timestamp of `self`.

Returns a timestamp in seconds


```solidity
function timestamp(OraclePack self) internal pure returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the timestamp from.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The timestamp of `self`|


### epoch

Get the epoch of `self`.

Returns a timestamp in 64s based epochs


```solidity
function epoch(OraclePack self) internal pure returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The OraclePack to retrieve the epoch from.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The epoch of `self`|


### int12toInt24

Converts a 12-bit signed integer to a 24-bit signed integer with proper sign extension

Handles two's complement sign extension for 12-bit values stored in larger integer types

The function checks bit 11 (the sign bit for 12-bit integers) and extends the sign

if the number is negative by setting bits 12-15 to 1


```solidity
function int12toInt24(uint256 x) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`uint256`|The input value containing a 12-bit signed integer in its lower 12 bits|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The sign-extended 24-bit signed integer (as int24)|


### int22toInt24

Converts a 22-bit signed integer to a 24-bit signed integer with proper sign extension

Handles two's complement sign extension for 22-bit values stored in larger integer types

The function checks bit 21 (the sign bit for 22-bit integers) and extends the sign

if the number is negative by setting bits 22-31 to 1


```solidity
function int22toInt24(uint256 x) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`uint256`|The input value containing a 22-bit signed integer in its lower 22 bits|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The sign-extended 24-bit signed integer (as int24)|


### updateEMAs

Updates exponential moving averages (EMAs) at multiple timescales with a new tick observation

Implements a cascading time delta cap to prevent excessive convergence after periods of inactivity

EMAs converge at most 75% toward the new tick value using linear approximation: exp(-x) ≈ 1-x

The function modifies timeDelta in cascade: longer periods cap it first, affecting shorter periods


```solidity
function updateEMAs(OraclePack oraclePack, int256 timeDelta, int24 newTick, uint96 EMAperiods)
    internal
    pure
    returns (uint256 updatedEMAs);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oraclePack`|`OraclePack`|The packed median data containing current EMA values|
|`timeDelta`|`int256`|Time elapsed since last update in seconds (at least 64s since observations have to be in different epochs)|
|`newTick`|`int24`|The new tick observation to update EMAs toward|
|`EMAperiods`|`uint96`|The packed EMA period values for spot, fast, slow, and eons EMAs|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`updatedEMAs`|`uint256`|The packed 88-bit value containing all four updated EMAs|


### getMedianTick

Calculates the median tick from a packed median data structure

Retrieves the 3rd and 4th ranked values from the sorted 8-slot queue and returns their average

The median is calculated as: referenceTick + (rank3_residual + rank4_residual) / 2


```solidity
function getMedianTick(OraclePack oraclePack) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oraclePack`|`OraclePack`|The packed structure containing: - Order map indicating the rank of each slot - Reference tick for absolute positioning - 8 tick observations stored as 12-bit signed residuals relative to reference tick|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|medianTick The median tick value, representing the middle value of the sorted observations|


### insertObservation

Inserts a new tick observation into the median data structure and updates EMAs

Updates the sorted queue by finding the correct insertion point for the new tick residual

The function maintains an 8-slot sorted queue using a 24-bit order map where each 3-bit segment

represents the rank of the corresponding slot. Slot 7 is reserved for the new observation.


```solidity
function insertObservation(
    OraclePack oraclePack,
    int24 newTick,
    uint256 currentEpoch,
    int256 timeDelta,
    uint96 EMAperiods
) internal pure returns (OraclePack newOraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oraclePack`|`OraclePack`|The current packed median data structure containing: - Bits 255-232: Current epoch timestamp - Bits 231-208: 24-bit order map (8 slots × 3 bits each) - Bits 207-128: Reserved for EMA data (88 bits): 10mins, 1hour, 8hour and 1day - Bits 127-96:  Reference tick (24 bits) - Bits 95-12:   Previous observations as 12-bit residuals (84 bits) - Bits 11-0:    Most recent observation residual (12 bits)|
|`newTick`|`int24`|The new tick observation to insert (as a residual relative to reference tick)|
|`currentEpoch`|`uint256`|The current epoch timestamp ((block.timestamp >> 6) & 0xFFFFFF)|
|`timeDelta`|`int256`|Time difference in seconds between current and last epoch (currentEpoch - recordedEpoch) * 64|
|`EMAperiods`|`uint96`|The packed EMA period values for spot, fast, slow, and eons EMAs|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newOraclePack`|`OraclePack`|The updated oraclePack with the new observation inserted|


### clampTick

Clamps a new tick observation to prevent large price movements that could manipulate the median

Limits the new tick to be within `clampDelta` of the most recent tick observation

This prevents flash loan attacks or other price manipulation attempts from skewing the median calculation


```solidity
function clampTick(int24 newTick, OraclePack _oraclePack, int24 clampDelta) internal pure returns (int24 clamped);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newTick`|`int24`|The new tick observation from Uniswap TWAP that needs to be clamped|
|`_oraclePack`|`OraclePack`|The current OraclePack containing the reference tick and most recent observation|
|`clampDelta`|`int24`|The maximum allowed tick deviation from the last observation|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`clamped`|`int24`|The clamped tick value, guaranteed to be within `clampDelta` of the last observation|


### computeInternalMedian

Takes a packed structure representing a sorted 8-slot queue of ticks and returns the median of those values and an updated queue if another observation is warranted.

Also inserts the latest Uniswap observation into the buffer, resorts, and returns if the last entry is at least `period` seconds old.


```solidity
function computeInternalMedian(OraclePack oraclePack, int24 currentTick, uint96 EMAperiods, int24 clampDelta)
    internal
    view
    returns (int24 _medianTick, OraclePack _updatedOraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oraclePack`|`OraclePack`|The packed structure representing the sorted 8-slot queue of ticks|
|`currentTick`|`int24`|The current tick as return from slot0|
|`EMAperiods`|`uint96`||
|`clampDelta`|`int24`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_medianTick`|`int24`|The median of the provided 8-slot queue of ticks in `oraclePack`|
|`_updatedOraclePack`|`OraclePack`|The updated 8-slot queue of ticks with the latest observation inserted if the last entry is at least `period` seconds old (returns 0 otherwise)|


### getOracleTicks

Computes various oracle prices corresponding to a Uniswap pool.


```solidity
function getOracleTicks(OraclePack self, int24 _currentTick, uint96 _EMAperiods, int24 clampDelta)
    internal
    view
    returns (int24 spotEMATick, int24 medianTick, int24 latestTick, OraclePack oraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`OraclePack`|The packed structure representing the sorted 8-slot queue of internal median observations|
|`_currentTick`|`int24`|The current tick in the Uniswap pool|
|`_EMAperiods`|`uint96`|A packed uint96 containing the EMA period data|
|`clampDelta`|`int24`|The max change in tick between updates|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`spotEMATick`|`int24`|The spot tick, computed from the shortest timescale EMA|
|`medianTick`|`int24`|The median oracle tick computed from the last 8 observations|
|`latestTick`|`int24`|The latest observed tick in Panoptic before the current transaction|
|`oraclePack`|`OraclePack`|The updated value for `s_oraclePack` (0 if not enough time has passed since last observation)|


### rebaseOraclePack

Rebases the median data structure when tick residuals exceed the 12-bit signed integer range

When residuals become too large (>2047 or <-2048), this function shifts the reference tick

to the current median and adjusts all stored residuals relative to the new reference

This maintains precision while keeping residuals within the 12-bit storage constraint


```solidity
function rebaseOraclePack(OraclePack oraclePack)
    internal
    pure
    returns (int24 _newReferenceTick, OraclePack rebasedOraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oraclePack`|`OraclePack`|The current oraclePack with residuals that have exceeded the threshold|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_newReferenceTick`|`int24`|The new reference tick (set to the current median)|
|`rebasedOraclePack`|`OraclePack`|The updated median data structure with: - New reference tick set to the current median - All residuals recalculated relative to the new reference - All other data (order map, EMAs, epoch) preserved|


