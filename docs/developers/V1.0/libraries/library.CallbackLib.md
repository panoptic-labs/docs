# CallbackLib
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.0.x/contracts/libraries/CallbackLib.sol)

**Author:**
Axicon Labs Limited

This library provides functions to verify that a callback came from a canonical Uniswap V3 pool with a claimed set of features.


## Functions
### validateCallback

Verifies that a callback came from the canonical Uniswap pool with a claimed set of features.


```solidity
function validateCallback(address sender, IUniswapV3Factory factory, PoolFeatures memory features) internal view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address initiating the callback and claiming to be a Uniswap pool|
|`factory`|`IUniswapV3Factory`|The address of the canonical Uniswap V3 factory|
|`features`|`PoolFeatures`|The features `sender` claims to contain (tokens and fee)|


## Structs
### PoolFeatures
Type defining characteristics of a Uniswap V3 pool.


```solidity
struct PoolFeatures {
    address token0;
    address token1;
    uint24 fee;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`token0`|`address`|The address of `token0` for the Uniswap pool|
|`token1`|`address`|The address of `token1` for the Uniswap pool|
|`fee`|`uint24`|The fee tier of the Uniswap pool (in hundredths of a basis points)|

### CallbackData
Type for data sent by pool in mint/swap callbacks used to validate the pool and send back requisite tokens.


```solidity
struct CallbackData {
    PoolFeatures poolFeatures;
    address payer;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`poolFeatures`|`PoolFeatures`|The features of the pool that sent the callback (used to validate that the pool is canonical)|
|`payer`|`address`|The address from which the requested tokens should be transferred|

