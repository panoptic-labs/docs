# CallbackLib
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/libraries/CallbackLib.sol)

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
Defining characteristics of a Uni V3 pool


```solidity
struct PoolFeatures {
    address token0;
    address token1;
    uint24 fee;
}
```

### CallbackData
Data sent by pool in mint/swap callbacks used to validate the pool and send back requisite tokens


```solidity
struct CallbackData {
    PoolFeatures poolFeatures;
    address payer;
}
```

