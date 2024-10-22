# IV3CompatibleOracle
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/198dc6b16daa5f29e4cdcc6e68a008a20c892670/contracts/interfaces/IV3CompatibleOracle.sol)

**Author:**
Axicon Labs Inc, credit to Uniswap Labs [https://github.com/Uniswap/v3-core](https://github.com/Uniswap/v3-core) under GPL-2.0 license

This interface defines the set of functions called by Panoptic on its external oracle contract.

*The interface is compatible with Uniswap V3 pools, but can also be implemented by a custom oracle contract.*


## Functions
### slot0

The 0th storage slot in the oracle stores many values, and is exposed as a single method to save gas
when accessed externally.


```solidity
function slot0()
    external
    view
    returns (
        uint160 sqrtPriceX96,
        int24 tick,
        uint16 observationIndex,
        uint16 observationCardinality,
        uint16,
        uint8,
        bool
    );
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceX96`|`uint160`|The current price of the oracle as a sqrt(token1/token0) Q64.96 value|
|`tick`|`int24`|The current tick of the oracle, i.e. according to the last tick transition that was run. This value may not always be equal to SqrtTickMath.getTickAtSqrtRatio(sqrtPriceX96) if the price is on a tick boundary|
|`observationIndex`|`uint16`|The index of the last oracle observation that was written|
|`observationCardinality`|`uint16`|The current maximum number of observations stored in the oracle|
|`<none>`|`uint16`||
|`<none>`|`uint8`||
|`<none>`|`bool`||


### observations

Returns data about a specific observation index


```solidity
function observations(uint256 index)
    external
    view
    returns (uint32 blockTimestamp, int56 tickCumulative, uint160 secondsPerLiquidityCumulativeX128, bool initialized);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`index`|`uint256`|The element of the observations array to fetch|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`blockTimestamp`|`uint32`|The timestamp of the observation|
|`tickCumulative`|`int56`|The tick multiplied by seconds elapsed for the life of the pool as of the observation timestamp|
|`secondsPerLiquidityCumulativeX128`|`uint160`|The seconds per in range liquidity for the life of the pool as of the observation timestamp|
|`initialized`|`bool`|Whether the observation has been initialized and the values are safe to use|


### observe

Returns the cumulative tick and liquidity as of each timestamp `secondsAgo` from the current block timestamp

*To get a time weighted average tick or liquidity-in-range, you must call this with two values, one representing
the beginning of the period and another for the end of the period. E.g., to get the last hour time-weighted average tick,
you must call it with secondsAgos = [3600, 0].*

*The time weighted average tick represents the geometric time weighted average price of the pool, in
log base sqrt(1.0001) of token1 / token0. The TickMath library can be used to go from a tick value to a ratio.*


```solidity
function observe(uint32[] calldata secondsAgos)
    external
    view
    returns (int56[] memory tickCumulatives, uint160[] memory secondsPerLiquidityCumulativeX128s);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`secondsAgos`|`uint32[]`|From how long ago each cumulative tick and liquidity value should be returned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tickCumulatives`|`int56[]`|Cumulative tick values as of each `secondsAgos` from the current block timestamp|
|`secondsPerLiquidityCumulativeX128s`|`uint160[]`|Cumulative seconds per liquidity-in-range value as of each `secondsAgos` from the current block timestamp|


### increaseObservationCardinalityNext

Increase the maximum number of price and liquidity observations that this oracle will store


```solidity
function increaseObservationCardinalityNext(uint16 observationCardinalityNext) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`observationCardinalityNext`|`uint16`|The desired minimum number of observations for the oracle to store|


