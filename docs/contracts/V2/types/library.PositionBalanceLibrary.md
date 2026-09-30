# PositionBalanceLibrary

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/types/PositionBalance.sol)

**Title:**
A Panoptic Position Balance. Tracks the Position Size, the Pool Utilizations at mint, and the current/fastOracle/slowOracle/latestObserved ticks at mint.

**Author:**
Axicon Labs Limited


## State Variables
### BITMASK_UINT39

```solidity
uint256 internal constant BITMASK_UINT39 = ((uint256(1) << 39) - 1)
```


## Functions
### storeBalanceData

Create a new `PositionBalance` given by positionSize, utilizations, and its tickData.


```solidity
function storeBalanceData(
    uint128 _positionSize,
    uint32 _utilizations,
    int24 _tickAtMint,
    uint32 _timestampAtMint,
    uint40 _blockNumberAtMint,
    bool _swapAtMint
) internal pure returns (PositionBalance);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_positionSize`|`uint128`|The amount of option minted|
|`_utilizations`|`uint32`|Packed data containing pool utilizations for token0 and token1 at mint|
|`_tickAtMint`|`int24`|the ticks at the end of the mint|
|`_timestampAtMint`|`uint32`|the timestamp at mint|
|`_blockNumberAtMint`|`uint40`|the block number at mint|
|`_swapAtMint`|`bool`|whether the position was minted with a swapAtMint flag (inverted tick limits)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PositionBalance`|The new PositionBalance with the given positionSize, utilization, and tick/block data|


### swapAtMint

Get the swapAtMint of `self`.


```solidity
function swapAtMint(PositionBalance self) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the swapAtMint from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|The swapAtMint of `self`|


### blockAtMint

Get the blockAtMint of `self`.


```solidity
function blockAtMint(PositionBalance self) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the blockAtMint from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The blockAtMint of `self`|


### timestampAtMint

Get the timestamp at mint of `self`.


```solidity
function timestampAtMint(PositionBalance self) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the timestamp from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The timestamp at mint of `self`|


### tickAtMint

Get the current tick of `self`.


```solidity
function tickAtMint(PositionBalance self) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`PositionBalance`|The PositionBalance to retrieve the current tick from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The current tick of `self`|


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
|`<none>`|`int256`|The token0 utilization in basis points|


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
|`<none>`|`int256`|The token1 utilization in basis points|


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
|`<none>`|`uint32`|The packed utilizations for token0 and token1 in basis points|


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
        bool _swapAtMint,
        uint256 _blockAtMint,
        uint256 _timestampAtMint,
        int24 _tickAtMint,
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
|`_swapAtMint`|`bool`|whether a swap happened at mint|
|`_blockAtMint`|`uint256`|`block.number` at mint|
|`_timestampAtMint`|`uint256`|`block.timestamp` at mint|
|`_tickAtMint`|`int24`|`currentTick` at mint|
|`utilization0AtMint`|`int256`|Utilization of token0 at mint|
|`utilization1AtMint`|`int256`|Utilization of token1 at mint|
|`_positionSize`|`uint128`|Size of the position|
