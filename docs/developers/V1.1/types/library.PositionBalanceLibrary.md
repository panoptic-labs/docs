# PositionBalanceLibrary
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.1.x/contracts/types/PositionBalance.sol)

**Author:**
Axicon Labs Limited


## Functions
### storeBalanceData

Create a new `PositionBalance` given by positionSize, utilizations, and its tickData.


```solidity
function storeBalanceData(uint128 _positionSize, uint32 _utilizations, uint96 _tickData)
    internal
    pure
    returns (PositionBalance);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_positionSize`|`uint128`|The amount of option minted|
|`_utilizations`|`uint32`|Packing of two uint16 utilizations into a 32 bit word|
|`_tickData`|`uint96`|Packing of 4 int25s into a single uint96|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PositionBalance`|The new PositionBalance with the given positionSize, utilization, and tickData|


### packTickData

Concatenate all oracle ticks into a single uint96.


```solidity
function packTickData(int24 _currentTick, int24 _fastOracleTick, int24 _slowOracleTick, int24 _lastObservedTick)
    internal
    pure
    returns (uint96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_currentTick`|`int24`|The current tick|
|`_fastOracleTick`|`int24`|The fast Oracle tick|
|`_slowOracleTick`|`int24`|The slow Oracle tick|
|`_lastObservedTick`|`int24`|The last observed tick|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint96`|A 96bit word concatenating all 4 input ticks|


### lastObservedTick

Get the last observed tick of `self`.


```solidity
function lastObservedTick(PositionBalance self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the last observed tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The last observed tick of `self`|


### slowOracleTick

Get the slow oracle tick of `self`.


```solidity
function slowOracleTick(PositionBalance self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the slow oracle tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The slow oracle tick of `self`|


### fastOracleTick

Get the fast oracle tick of `self`.


```solidity
function fastOracleTick(PositionBalance self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the fast oracle tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The fast oracle tick of `self`|


### currentTick

Get the current tick of `self`.


```solidity
function currentTick(PositionBalance self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the current tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The current tick of `self`|


### tickData

Get the tickData of `self`.


```solidity
function tickData(PositionBalance self) internal pure returns (uint96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the tickData from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint96`|The packed tickData (currentTick, fastOracleTick, slowOracleTick, lastObservedTick)|


### unpackTickData

Unpack the current, last observed, and fast/slow oracle ticks from a 96-bit tickData encoding.


```solidity
function unpackTickData(uint96 _tickData) internal pure returns (int24, int24, int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tickData`|`uint96`|The packed tickData to unpack ticks from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The current tick contained in `_tickData`|
|`<none>`|`int24`|The fast oracle tick contained in `_tickData`|
|`<none>`|`int24`|The slow oracle tick contained in `_tickData`|
|`<none>`|`int24`|The last observed tick contained in `_tickData`|


### utilization0

Get token0 utilization of `self`.


```solidity
function utilization0(PositionBalance self) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the token0 utilization from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The token0 utilization, stored in bips|


### utilization1

Get token1 utilization of `self`.


```solidity
function utilization1(PositionBalance self) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the token1 utilization from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The token1 utilization, stored in bips|


### utilizations

Get both token0 and token1 utilizations of `self`.


```solidity
function utilizations(PositionBalance self) internal pure returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the utilizations from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The token utilizations, stored in bips|


### positionSize

Get the positionSize of `self`.


```solidity
function positionSize(PositionBalance self) internal pure returns (uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the positionSize from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|The positionSize of `self`|


### unpackAll

Unpack all data from `self`.


```solidity
function unpackAll(PositionBalance self)
    external
    pure
    returns (
        int24 currentTickAtMint,
        int24 fastOracleTickAtMint,
        int24 slowOracleTickAtMint,
        int24 lastObservedTickAtMint,
        int256 utilization0AtMint,
        int256 utilization1AtMint,
        uint128 _positionSize
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to get all data from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`currentTickAtMint`|`int24`|`currentTick` at mint|
|`fastOracleTickAtMint`|`int24`|Fast oracle tick at mint|
|`slowOracleTickAtMint`|`int24`|Slow oracle tick at mint|
|`lastObservedTickAtMint`|`int24`|Last observed tick at mint|
|`utilization0AtMint`|`int256`|Utilization of token0 at mint|
|`utilization1AtMint`|`int256`|Utilization of token1 at mint|
|`_positionSize`|`uint128`|Size of the position|


