# PoolDataLibrary
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/types/PoolData.sol)

**Title:**
A Panoptic Pool Data. Tracks the Uniswap Pool, the minEnforcedTick, and the maxEnforcedTick

**Author:**
Axicon Labs Limited


## Functions
### storePoolData

Create a new `PoolData` given by UniswapV3Pool, min/maxEnforcedTick.


```solidity
function storePoolData(
    uint128 _maxLiquidityPerTick,
    uint64 _poolId,
    int24 _minEnforcedTick,
    int24 _maxEnforcedTick,
    bool _initialized
) internal pure returns (PoolData);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_maxLiquidityPerTick`|`uint128`|The max liquidity per tick|
|`_poolId`|`uint64`|The poolId of the Uniswap pool|
|`_minEnforcedTick`|`int24`|The current minimum enforced tick for the pool in the SFPM|
|`_maxEnforcedTick`|`int24`|The current maximum enforced tick for the pool in the SFPM|
|`_initialized`|`bool`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PoolData`|The new PoolData with the given IUniswapV3Pool and min/maxEnforcedTick|


### maxLiquidityPerTick

Get the maxLiquidityPerTick of `self`.


```solidity
function maxLiquidityPerTick(PoolData self) internal pure returns (uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PoolData`|The PoolData to retrieve the max liquidity from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|The maxLiquidityPerTick of `self`|


### poolId

Get the poolId of `self`.


```solidity
function poolId(PoolData self) internal pure returns (uint64);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PoolData`|The PoolData to retrieve the poolId from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint64`|The poolId of `self`|


### minEnforcedTick

Get the min enforced tick of `self`.


```solidity
function minEnforcedTick(PoolData self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PoolData`|The PoolData to retrieve the min enforced tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The min enforced tick of `self`|


### maxEnforcedTick

Get the max enforced tick of `self`.


```solidity
function maxEnforcedTick(PoolData self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PoolData`|The PoolData to retrieve the max enforced tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The max enforced tick of `self`|


### initialized

Get the initialized bool of `self`.


```solidity
function initialized(PoolData self) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PoolData`|The PoolData to retrieve initialized flag from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|The initialized flag of `self`|


