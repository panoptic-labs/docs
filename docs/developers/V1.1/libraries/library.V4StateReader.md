# V4StateReader
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.1.x/contracts/libraries/V4StateReader.sol)

**Author:**
Axicon Labs Limited, credit to Uniswap Labs under MIT License

A library to retrieve state information from Uniswap V4 pools via `extsload`.


## Functions
### getSqrtPriceX96

Retrieves the current `sqrtPriceX96` from a Uniswap V4 pool.


```solidity
function getSqrtPriceX96(IPoolManager manager, PoolId poolId) internal view returns (uint160 sqrtPriceX96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The Uniswap V4 pool manager contract|
|`poolId`|`PoolId`|The pool ID of the Uniswap V4 pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceX96`|`uint160`|The current `sqrtPriceX96` of the Uniswap V4 pool|


### getTick

Retrieves the current tick from a Uniswap V4 pool.


```solidity
function getTick(IPoolManager manager, PoolId poolId) internal view returns (int24 tick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The Uniswap V4 pool manager contract|
|`poolId`|`PoolId`|The pool ID of the Uniswap V4 pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int24`|The current tick of the Uniswap V4 pool|


### getFeeGrowthInside

Calculates the fee growth that has occurred (per unit of liquidity) in the AMM/Uniswap for an
option position's tick range.


```solidity
function getFeeGrowthInside(IPoolManager manager, PoolId idV4, int24 currentTick, int24 tickLower, int24 tickUpper)
    internal
    view
    returns (uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The Uniswap V4 pool manager contract|
|`idV4`|`PoolId`|The pool ID of the Uniswap V4 pool|
|`currentTick`|`int24`|The current price tick in the AMM|
|`tickLower`|`int24`|The lower tick of the option position leg (a liquidity chunk)|
|`tickUpper`|`int24`|The upper tick of the option position leg (a liquidity chunk)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeGrowthInside0X128`|`uint256`|The fee growth in the AMM for token0|
|`feeGrowthInside1X128`|`uint256`|The fee growth in the AMM for token1|


### getFeeGrowthInsideLast

Diagrams shown for token0, and applies for token1 the same
L = lowerTick, U = upperTick
liquidity         lowerOut0 (all fees collected in this price tick range for token0)
▲            ◄──────────────^v───► (to MAX_TICK)
│
│                      upperOut0
│                     ◄─────^v───►
│           ┌────────┐
│           │ chunk  │
│           │        │
└─────▲─────┴────────┴────────► price tick
│     L        U
│
current
tick
liquidity
▲           upperOut0
│◄─^v─────────────────────►
│
│     lowerOut0  ┌────────┐
│◄─^v───────────►│ chunk  │
│                │        │
└────────────────┴────────┴─▲─────► price tick
L        U │
│
current
tick

Retrieves the last stored `feeGrowthInsideLast` values for a unique Uniswap V4 position.

*Corresponds to pools[poolId].positions[positionId] in `manager`.*


```solidity
function getFeeGrowthInsideLast(IPoolManager manager, PoolId poolId, bytes32 positionId)
    internal
    view
    returns (uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The Uniswap V4 pool manager contract|
|`poolId`|`PoolId`|The ID of the Uniswap V4 pool|
|`positionId`|`bytes32`|The ID of the position, which is a hash of the owner, tickLower, tickUpper, and salt.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeGrowthInside0LastX128`|`uint256`|The fee growth inside the position for token0|
|`feeGrowthInside1LastX128`|`uint256`|The fee growth inside the position for token1|


