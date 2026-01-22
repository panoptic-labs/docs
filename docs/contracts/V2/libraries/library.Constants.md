# Constants
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/libraries/Constants.sol)

**Title:**
Library of Constants used in Panoptic.

**Author:**
Axicon Labs Limited

This library provides constants used in Panoptic.


## State Variables
### FP96
Fixed point multiplier: 2**96


```solidity
uint256 internal constant FP96 = 0x1000000000000000000000000
```


### MIN_POOL_TICK
Minimum possible price tick in a Uniswap V3 pool


```solidity
int24 internal constant MIN_POOL_TICK = -887272
```


### MAX_POOL_TICK
Maximum possible price tick in a Uniswap V3 pool


```solidity
int24 internal constant MAX_POOL_TICK = 887272
```


### MIN_POOL_SQRT_RATIO
Minimum possible sqrtPriceX96 in a Uniswap V3 pool


```solidity
uint160 internal constant MIN_POOL_SQRT_RATIO = 4295128739
```


### MAX_POOL_SQRT_RATIO
Maximum possible sqrtPriceX96 in a Uniswap V3 pool


```solidity
uint160 internal constant MAX_POOL_SQRT_RATIO = 1461446703485210103287273052203988822378723970342
```


### MAX_RESIDUAL_THRESHOLD
The maximum amount of change, in ticks, permitted before TICK_OFFSET is updated.


```solidity
int24 internal constant MAX_RESIDUAL_THRESHOLD = 1024
```


