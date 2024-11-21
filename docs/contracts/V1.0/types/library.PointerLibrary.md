# PointerLibrary
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.0.x/contracts/types/Pointer.sol)

**Author:**
Axicon Labs Limited

Data type that represents a pointer to a slice of contract code at an address.


## Functions
### createPointer

Create a pointer to a slice of contract code at an address.


```solidity
function createPointer(address _location, uint48 _start, uint48 _size) internal pure returns (Pointer);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_location`|`address`|The address of the contract code|
|`_start`|`uint48`|The starting position of the slice|
|`_size`|`uint48`|The size of the slice|


### location

Get the address of the pointed contract code from a pointer.


```solidity
function location(Pointer self) internal pure returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Pointer`|The pointer to the slice of contract code|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the contract code|


### start

Get the starting position of the pointed slice from a pointer.


```solidity
function start(Pointer self) internal pure returns (uint48);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Pointer`|The pointer to the section of contract code|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The starting position of the slice|


### size

Get the size of the pointed slice from a pointer.


```solidity
function size(Pointer self) internal pure returns (uint48);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Pointer`|The pointer to the slice of contract code|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The size of the slice|


### data

Get the data of the pointed slice from a pointer as a bytearray.


```solidity
function data(Pointer self) internal view returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Pointer`|The pointer to the slice of contract code|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|The pointed slice as a bytearray|


### dataStr

Get the data of the pointed slice from a pointer as a string.


```solidity
function dataStr(Pointer self) internal view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Pointer`|The pointer to the slice of contract code|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The pointed slice as a string|


### decompressedDataStr

Returns the result of decompressing the pointed slice of data with LZ-77 interpreted as a UTF-8-encoded string.


```solidity
function decompressedDataStr(Pointer self) internal view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`Pointer`|The pointer to the slice of contract code|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The LZ-77 decompressed data as a string|


