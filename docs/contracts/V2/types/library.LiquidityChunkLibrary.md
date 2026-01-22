# LiquidityChunkLibrary
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/types/LiquidityChunk.sol)

**Title:**
A Panoptic Liquidity Chunk. Tracks Tick Range and Liquidity Information for a "chunk." Used to track movement of chunks.

**Author:**
Axicon Labs Limited

A liquidity chunk is an amount of `liquidity` deployed between two ticks: `tickLower` and `tickUpper`
into a concentrated liquidity AMM.


## State Variables
### CLEAR_TL_MASK
AND mask to strip the `tickLower` value from a packed LiquidityChunk.


```solidity
uint256 internal constant CLEAR_TL_MASK = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
```


### CLEAR_TU_MASK
AND mask to strip the `tickUpper` value from a packed LiquidityChunk.


```solidity
uint256 internal constant CLEAR_TU_MASK = 0xFFFFFF000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
```


## Functions
### createChunk

Create a new `LiquidityChunk` given by its bounding ticks and its liquidity.


```solidity
function createChunk(int24 _tickLower, int24 _tickUpper, uint128 amount) internal pure returns (LiquidityChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tickLower`|`int24`|The lower tick of the chunk|
|`_tickUpper`|`int24`|The upper tick of the chunk|
|`amount`|`uint128`|The amount of liquidity to add to the chunk|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LiquidityChunk`|The new chunk with the given liquidity and tick range|


### addLiquidity

Add liquidity to `self`.


```solidity
function addLiquidity(LiquidityChunk self, uint128 amount) internal pure returns (LiquidityChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LiquidityChunk`|The LiquidityChunk to add liquidity to|
|`amount`|`uint128`|The amount of liquidity to add to `self`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LiquidityChunk`|`self` with added liquidity `amount`|


### addTickLower

Add the lower tick to `self`.


```solidity
function addTickLower(LiquidityChunk self, int24 _tickLower) internal pure returns (LiquidityChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LiquidityChunk`|The LiquidityChunk to add the lower tick to|
|`_tickLower`|`int24`|The lower tick to add to `self`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LiquidityChunk`|`self` with added lower tick `_tickLower`|


### addTickUpper

Add the upper tick to `self`.


```solidity
function addTickUpper(LiquidityChunk self, int24 _tickUpper) internal pure returns (LiquidityChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LiquidityChunk`|The LiquidityChunk to add the upper tick to|
|`_tickUpper`|`int24`|The upper tick to add to `self`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LiquidityChunk`|`self` with added upper tick `_tickUpper`|


### updateTickLower

Overwrites the lower tick on `self`.


```solidity
function updateTickLower(LiquidityChunk self, int24 _tickLower) internal pure returns (LiquidityChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LiquidityChunk`|The LiquidityChunk to overwrite the lower tick on|
|`_tickLower`|`int24`|The lower tick to overwrite `self` with|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LiquidityChunk`|`self` with `_tickLower` as the new lower tick|


### updateTickUpper

Overwrites the upper tick on `self`.


```solidity
function updateTickUpper(LiquidityChunk self, int24 _tickUpper) internal pure returns (LiquidityChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LiquidityChunk`|The LiquidityChunk to overwrite the upper tick on|
|`_tickUpper`|`int24`|The upper tick to overwrite `self` with|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LiquidityChunk`|`self` with `_tickUpper` as the new upper tick|


### tickLower

Get the lower tick of `self`.


```solidity
function tickLower(LiquidityChunk self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LiquidityChunk`|The LiquidityChunk to get the lower tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The lower tick of `self`|


### tickUpper

Get the upper tick of `self`.


```solidity
function tickUpper(LiquidityChunk self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LiquidityChunk`|The LiquidityChunk to get the upper tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The upper tick of `self`|


### liquidity

Get the amount of liquidity/size of `self`.


```solidity
function liquidity(LiquidityChunk self) internal pure returns (uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`LiquidityChunk`|The LiquidityChunk to get the liquidity from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|The liquidity of `self`|


