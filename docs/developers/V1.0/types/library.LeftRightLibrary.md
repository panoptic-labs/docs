# LeftRightLibrary
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.0.x/contracts/types/LeftRight.sol)

**Author:**
Axicon Labs Limited

Simple data type that divides a 256-bit word into two 128-bit slots.


## State Variables
### LEFT_HALF_BIT_MASK
AND bitmask to isolate the left half of a uint256.


```solidity
uint256 internal constant LEFT_HALF_BIT_MASK = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000000000000000000000000000;
```


### LEFT_HALF_BIT_MASK_INT
AND bitmask to isolate the left half of an int256.


```solidity
int256 internal constant LEFT_HALF_BIT_MASK_INT =
    int256(uint256(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000000000000000000000000000));
```


### RIGHT_HALF_BIT_MASK
AND bitmask to isolate the right half of an int256.


```solidity
int256 internal constant RIGHT_HALF_BIT_MASK = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
```


## Functions
### rightSlot

Get the "right" slot from a bit pattern.


```solidity
function rightSlot(LeftRightUnsigned self) internal pure returns (uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LeftRightUnsigned`|The 256 bit value to extract the right half from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|The right half of `self`|


### rightSlot

Get the "right" slot from a bit pattern.


```solidity
function rightSlot(LeftRightSigned self) internal pure returns (int128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LeftRightSigned`|The 256 bit value to extract the right half from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int128`|The right half of `self`|


### toRightSlot

Add to the "right" slot in a 256-bit pattern.


```solidity
function toRightSlot(LeftRightUnsigned self, uint128 right) internal pure returns (LeftRightUnsigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LeftRightUnsigned`|The 256-bit pattern to be written to|
|`right`|`uint128`|The value to be added to the right slot|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned`|`self` with `right` added (not overwritten, but added) to the value in its right 128 bits|


### toRightSlot

Add to the "right" slot in a 256-bit pattern.


```solidity
function toRightSlot(LeftRightSigned self, int128 right) internal pure returns (LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LeftRightSigned`|The 256-bit pattern to be written to|
|`right`|`int128`|The value to be added to the right slot|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|`self` with `right` added (not overwritten, but added) to the value in its right 128 bits|


### leftSlot

Get the "left" slot from a bit pattern.


```solidity
function leftSlot(LeftRightUnsigned self) internal pure returns (uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LeftRightUnsigned`|The 256 bit value to extract the left half from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|The left half of `self`|


### leftSlot

Get the "left" slot from a bit pattern.


```solidity
function leftSlot(LeftRightSigned self) internal pure returns (int128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LeftRightSigned`|The 256 bit value to extract the left half from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int128`|The left half of `self`|


### toLeftSlot

All toLeftSlot functions add bits to the left slot without clearing it first

Add to the "left" slot in a 256-bit pattern.


```solidity
function toLeftSlot(LeftRightUnsigned self, uint128 left) internal pure returns (LeftRightUnsigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LeftRightUnsigned`|The 256-bit pattern to be written to|
|`left`|`uint128`|The value to be added to the left slot|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned`|`self` with `left` added (not overwritten, but added) to the value in its left 128 bits|


### toLeftSlot

Add to the "left" slot in a 256-bit pattern.


```solidity
function toLeftSlot(LeftRightSigned self, int128 left) internal pure returns (LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LeftRightSigned`|The 256-bit pattern to be written to|
|`left`|`int128`|The value to be added to the left slot|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|`self` with `left` added (not overwritten, but added) to the value in its left 128 bits|


### add

Add two LeftRight-encoded words; revert on overflow or underflow.


```solidity
function add(LeftRightUnsigned x, LeftRightUnsigned y) internal pure returns (LeftRightUnsigned z);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`LeftRightUnsigned`|The augend|
|`y`|`LeftRightUnsigned`|The addend|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`z`|`LeftRightUnsigned`|The sum `x + y`|


### sub

Subtract two LeftRight-encoded words; revert on overflow or underflow.


```solidity
function sub(LeftRightUnsigned x, LeftRightUnsigned y) internal pure returns (LeftRightUnsigned z);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`LeftRightUnsigned`|The minuend|
|`y`|`LeftRightUnsigned`|The subtrahend|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`z`|`LeftRightUnsigned`|The difference `x - y`|


### add

Add two LeftRight-encoded words; revert on overflow or underflow.


```solidity
function add(LeftRightUnsigned x, LeftRightSigned y) internal pure returns (LeftRightSigned z);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`LeftRightUnsigned`|The augend|
|`y`|`LeftRightSigned`|The addend|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`z`|`LeftRightSigned`|The sum `x + y`|


### add

Add two LeftRight-encoded words; revert on overflow or underflow.


```solidity
function add(LeftRightSigned x, LeftRightSigned y) internal pure returns (LeftRightSigned z);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`LeftRightSigned`|The augend|
|`y`|`LeftRightSigned`|The addend|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`z`|`LeftRightSigned`|The sum `x + y`|


### sub

Subtract two LeftRight-encoded words; revert on overflow or underflow.


```solidity
function sub(LeftRightSigned x, LeftRightSigned y) internal pure returns (LeftRightSigned z);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`LeftRightSigned`|The minuend|
|`y`|`LeftRightSigned`|The subtrahend|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`z`|`LeftRightSigned`|The difference `x - y`|


### subRect

Subtract two LeftRight-encoded words; revert on overflow or underflow.

For each slot, rectify difference `x - y` to 0 if negative.


```solidity
function subRect(LeftRightSigned x, LeftRightSigned y) internal pure returns (LeftRightUnsigned z);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`LeftRightSigned`|The minuend|
|`y`|`LeftRightSigned`|The subtrahend|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`z`|`LeftRightUnsigned`|The difference `x - y`|


### addCapped

Adds two sets of LeftRight-encoded words, freezing both right slots if either overflows, and vice versa.

*Used for linked accumulators, so if the accumulator for one side overflows for a token, both cease to accumulate.*


```solidity
function addCapped(LeftRightUnsigned x, LeftRightUnsigned dx, LeftRightUnsigned y, LeftRightUnsigned dy)
    internal
    pure
    returns (LeftRightUnsigned, LeftRightUnsigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`LeftRightUnsigned`|The first augend|
|`dx`|`LeftRightUnsigned`|The addend for `x`|
|`y`|`LeftRightUnsigned`|The second augend|
|`dy`|`LeftRightUnsigned`|The addend for `y`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned`|The sum `x + dx`|
|`<none>`|`LeftRightUnsigned`|The sum `y + dy`|


