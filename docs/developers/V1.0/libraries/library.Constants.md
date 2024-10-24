# Constants
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.0.x/contracts/libraries/Constants.sol)

**Author:**
Axicon Labs Limited

This library provides constants used in Panoptic.


## State Variables
### FP96
Fixed point multiplier: 2**96


```solidity
uint256 internal constant FP96 = 0x1000000000000000000000000;
```


### MIN_V3POOL_TICK
Minimum possible price tick in a Uniswap V3 pool


```solidity
int24 internal constant MIN_V3POOL_TICK = -887272;
```


### MAX_V3POOL_TICK
Maximum possible price tick in a Uniswap V3 pool


```solidity
int24 internal constant MAX_V3POOL_TICK = 887272;
```


### MIN_V3POOL_SQRT_RATIO
Minimum possible sqrtPriceX96 in a Uniswap V3 pool


```solidity
uint160 internal constant MIN_V3POOL_SQRT_RATIO = 4295128739;
```


### MAX_V3POOL_SQRT_RATIO
Maximum possible sqrtPriceX96 in a Uniswap V3 pool


```solidity
uint160 internal constant MAX_V3POOL_SQRT_RATIO = 1461446703485210103287273052203988822378723970342;
```


### SLOW_ORACLE_UNISWAP_MODE
Parameter that determines which oracle type to use for the "slow" oracle price on non-liquidation solvency checks.

*If false, an 8-slot internal median array is used to compute the "slow" oracle price.*

*This oracle is updated with the last Uniswap observation during `mintOptions` if MEDIAN_PERIOD has elapsed past the last observation.*

*If true, the "slow" oracle price is instead computed on-the-fly from 9 Uniswap observations (spaced 5 observations apart) irrespective of the frequency of `mintOptions` calls.*


```solidity
bool internal constant SLOW_ORACLE_UNISWAP_MODE = false;
```


### MEDIAN_PERIOD
The minimum amount of time, in seconds, permitted between internal TWAP updates.


```solidity
uint256 internal constant MEDIAN_PERIOD = 60;
```


### FAST_ORACLE_CARDINALITY
Amount of Uniswap observations to include in the "fast" oracle price.


```solidity
uint256 internal constant FAST_ORACLE_CARDINALITY = 3;
```


### FAST_ORACLE_PERIOD
*Amount of observation indices to skip in between each observation for the "fast" oracle price.*

*Note that the *minimum* total observation time is determined by the blocktime and may need to be adjusted by chain.*

*Uniswap observations snapshot the last block's closing price at the first interaction with the pool in a block.*

*In this case, if there is an interaction every block, the "fast" oracle can consider 3 consecutive block end prices (min=36 seconds on Ethereum).*


```solidity
uint256 internal constant FAST_ORACLE_PERIOD = 1;
```


### SLOW_ORACLE_CARDINALITY
Amount of Uniswap observations to include in the "slow" oracle price (in Uniswap mode).


```solidity
uint256 internal constant SLOW_ORACLE_CARDINALITY = 9;
```


### SLOW_ORACLE_PERIOD
Amount of observation indices to skip in between each observation for the "slow" oracle price.

*Structured such that the minimum total observation time is 9 minutes on Ethereum.*


```solidity
uint256 internal constant SLOW_ORACLE_PERIOD = 5;
```


