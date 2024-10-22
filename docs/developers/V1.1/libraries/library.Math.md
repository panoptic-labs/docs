# Math
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/libraries/Math.sol)

**Author:**
Axicon Labs Limited

Contains general math helpers and functions


## State Variables
### MAX_UINT256
This is equivalent to `type(uint256).max` — used in assembly blocks as a replacement.


```solidity
uint256 internal constant MAX_UINT256 = 2 ** 256 - 1;
```


### MAX_UINT128
This is equivalent to `type(uint128).max` — used in assembly blocks as a replacement.


```solidity
uint256 internal constant MAX_UINT128 = 2 ** 128 - 1;
```


## Functions
### min24

Compute the min of the incoming int24s `a` and `b`.


```solidity
function min24(int24 a, int24 b) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`int24`|The first number|
|`b`|`int24`|The second number|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The min of `a` and `b`: min(a, b), e.g.: min(4, 1) = 1|


### max24

Compute the max of the incoming int24s `a` and `b`.


```solidity
function max24(int24 a, int24 b) internal pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`int24`|The first number|
|`b`|`int24`|The second number|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The max of `a` and `b`: max(a, b), e.g.: max(4, 1) = 4|


### min

Compute the min of the incoming `a` and `b`.


```solidity
function min(uint256 a, uint256 b) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The first number|
|`b`|`uint256`|The second number|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The min of `a` and `b`: min(a, b), e.g.: min(4, 1) = 1|


### min

Compute the min of the incoming `a` and `b`.


```solidity
function min(int256 a, int256 b) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`int256`|The first number|
|`b`|`int256`|The second number|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The min of `a` and `b`: min(a, b), e.g.: min(4, 1) = 1|


### max

Compute the max of the incoming `a` and `b`.


```solidity
function max(uint256 a, uint256 b) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The first number|
|`b`|`uint256`|The second number|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The max of `a` and `b`: max(a, b), e.g.: max(4, 1) = 4|


### max

Compute the max of the incoming `a` and `b`.


```solidity
function max(int256 a, int256 b) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`int256`|The first number|
|`b`|`int256`|The second number|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The max of `a` and `b`: max(a, b), e.g.: max(4, 1) = 4|


### abs

Compute the absolute value of an integer (int256).

*Does not support `type(int256).min` and will revert (`type(int256).max = abs(type(int256).min) - 1`).*


```solidity
function abs(int256 x) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`int256`|The incoming *signed* integer to take the absolute value of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The absolute value of `x`, e.g. abs(-4) = 4|


### absUint

Compute the absolute value of an integer (int256).

*Supports `type(int256).min` because the corresponding value can fit in a uint (unlike `type(int256).max`).*


```solidity
function absUint(int256 x) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`int256`|The incoming *signed* integer to take the absolute value of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The absolute value of `x`, e.g. abs(-4) = 4|


### mostSignificantNibble

Returns the index of the most significant nibble of the 160-bit number,
where the least significant nibble is at index 0 and the most significant nibble is at index 39.


```solidity
function mostSignificantNibble(uint160 x) internal pure returns (uint256 r);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`uint160`|The value for which to compute the most significant nibble|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`r`|`uint256`|The index of the most significant nibble (default: 0)|


### getApproxTickWithMaxAmount

Computes a tick that will require approximately `amount` of token0 to create a `tickSpacing`-wide position with `maxLiquidityPerTick` at `tickLower = tick` in Uniswap.

*This function can have a maximum of two ticks of error from one of the ticks with `amount(tickA) < amount < amount(tickA + 1 = tickB)`.*

*`tickSpacing is assumed to be within the range (0, 32768)*

*`maxLiquidityPerTick` for `s=tickSpacing` should be defined by `(2^128 - 1) / ((887272/s) - (-887272/s) + 1)`*


```solidity
function getApproxTickWithMaxAmount(uint256 amount, int24 tickSpacing, uint256 maxLiquidityPerTick)
    internal
    pure
    returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The desired amount of token0 required to fill the returned tick|
|`tickSpacing`|`int24`|The spacing between initializable ticks in the Uniswap pool|
|`maxLiquidityPerTick`|`uint256`|The maximum liquidity that can reference any given tick in the Uniswap pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|A tick that will require approximately `amount` of token0 to create a `tickSpacing`-wide position with `maxLiquidityPerTick` at `tickLower = tick`|


### getMaxLiquidityPerTick

Computes the maximum liquidity that is allowed to reference any given tick in a Uniswap V4 pool with `tickSpacing`.


```solidity
function getMaxLiquidityPerTick(int24 tickSpacing) internal pure returns (uint128 maxLiquidityPerTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickSpacing`|`int24`|The spacing between initializable ticks in the Uniswap V4 pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxLiquidityPerTick`|`uint128`|The maximum liquidity that can reference any given tick in the Uniswap V4 pool|


### getSqrtRatioAtTick

Calculates `1.0001^(tick/2)` as an X96 number.

*Will revert if `abs(tick) > 887272`.*


```solidity
function getSqrtRatioAtTick(int24 tick) internal pure returns (uint160);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int24`|Value of the tick for which `sqrt(1.0001^tick)` is calculated|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint160`|A Q64.96 number representing the sqrt price at the provided tick|


### log_Sqrt1p0001

Approximates the log base `sqrt(1.0001)` of `argX128/2^128` with `precision` bits of precision.

*Validated for `argX128` in the range `[18447437466114719744, 6276865796315986613307619852238232712866172378830163935232)`.*

*Validated for `precision` in the range `[0, 20]`.*


```solidity
function log_Sqrt1p0001(uint256 argX128, uint256 precision) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`argX128`|`uint256`|The Q128.128 fixed-point number to calculate the log of|
|`precision`|`uint256`|The bits of precision with which to compute the result, max 64 (`err <≈ 2^-precision * log₂(√1.0001)⁻¹`)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The log with base `sqrt(1.0001)` of `argX128/2^128`|


### getAmount0ForLiquidity

Calculates the amount of token0 received for a given LiquidityChunk.


```solidity
function getAmount0ForLiquidity(LiquidityChunk liquidityChunk) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidityChunk`|`LiquidityChunk`|A specification for a liquidity chunk in Uniswap containing `liquidity`, `tickLower`, and `tickUpper`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of token0 represented by `liquidityChunk` when `currentTick < tickLower`|


### getAmount1ForLiquidity

Calculates the amount of token1 received for a given LiquidityChunk.


```solidity
function getAmount1ForLiquidity(LiquidityChunk liquidityChunk) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidityChunk`|`LiquidityChunk`|A specification for a liquidity chunk in Uniswap containing `liquidity`, `tickLower`, and `tickUpper`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of token1 represented by `liquidityChunk` when `currentTick > tickUpper`|


### getAmountsForLiquidity

Calculates the amount of token0 and token1 received for a given LiquidityChunk at the provided `currentTick`.


```solidity
function getAmountsForLiquidity(int24 currentTick, LiquidityChunk liquidityChunk)
    internal
    pure
    returns (uint256 amount0, uint256 amount1);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The tick at which to evaluate `liquidityChunk`|
|`liquidityChunk`|`LiquidityChunk`|A specification for a liquidity chunk in Uniswap containing `liquidity`, `tickLower`, and `tickUpper`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amount0`|`uint256`|The amount of token0 represented by `liquidityChunk` at `currentTick`|
|`amount1`|`uint256`|The amount of token1 represented by `liquidityChunk` at `currentTick`|


### getLiquidityForAmount0

Returns a LiquidityChunk at the provided tick range with `liquidity` corresponding to `amount0`.


```solidity
function getLiquidityForAmount0(int24 tickLower, int24 tickUpper, uint256 amount0)
    internal
    pure
    returns (LiquidityChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickLower`|`int24`|The lower tick of the chunk|
|`tickUpper`|`int24`|The upper tick of the chunk|
|`amount0`|`uint256`|The amount of token0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LiquidityChunk`|A LiquidityChunk with `tickLower`, `tickUpper`, and the calculated amount of liquidity for `amount0`|


### getLiquidityForAmount1

Returns a LiquidityChunk at the provided tick range with `liquidity` corresponding to `amount1`.


```solidity
function getLiquidityForAmount1(int24 tickLower, int24 tickUpper, uint256 amount1)
    internal
    pure
    returns (LiquidityChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickLower`|`int24`|The lower tick of the chunk|
|`tickUpper`|`int24`|The upper tick of the chunk|
|`amount1`|`uint256`|The amount of token1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LiquidityChunk`|A LiquidityChunk with `tickLower`, `tickUpper`, and the calculated amount of liquidity for `amount1`|


### toUint128

Downcast uint256 to uint128. Revert on overflow or underflow.


```solidity
function toUint128(uint256 toDowncast) internal pure returns (uint128 downcastedInt);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`toDowncast`|`uint256`|The uint256 to be downcasted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`downcastedInt`|`uint128`|`toDowncast` downcasted to uint128|


### toUint128Capped

Downcast uint256 to uint128, but cap at type(uint128).max on overflow.


```solidity
function toUint128Capped(uint256 toDowncast) internal pure returns (uint128 downcastedInt);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`toDowncast`|`uint256`|The uint256 to be downcasted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`downcastedInt`|`uint128`|`toDowncast` downcasted to uint128|


### toInt128

Downcast uint128 to int128.


```solidity
function toInt128(uint128 toCast) internal pure returns (int128 downcastedInt);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`toCast`|`uint128`|The uint256 to be downcasted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`downcastedInt`|`int128`|`toDowncast` downcasted to int128|


### toInt128

Cast an int256 to an int128, revert on overflow or underflow.


```solidity
function toInt128(int256 toCast) internal pure returns (int128 downcastedInt);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`toCast`|`int256`|the int256 to be downcasted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`downcastedInt`|`int128`|`toCast` downcasted to int128|


### toInt256

Cast a uint256 to an int256, revert on overflow.


```solidity
function toInt256(uint256 toCast) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`toCast`|`uint256`|The uint256 to be downcasted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|`toCast` downcasted to int256|


### mulDiv

Calculates `floor(a×b÷denominator)` with full precision. Throws if result overflows a uint256 or `denominator == 0`.

*Credit to Remco Bloemen under MIT license https://xn--2-umb.com/21/muldiv for this and all following `mulDiv` functions*


```solidity
function mulDiv(uint256 a, uint256 b, uint256 denominator) internal pure returns (uint256 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|
|`denominator`|`uint256`|The divisor|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint256`|The 256-bit result|


### mulDivCapped

Calculates `min(floor(a×b÷denominator), 2^256-1)` with full precision.


```solidity
function mulDivCapped(uint256 a, uint256 b, uint256 denominator) internal pure returns (uint256 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|
|`denominator`|`uint256`|The divisor|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint256`|The 256-bit result|


### mulDivRoundingUp

Calculates `ceil(a×b÷denominator)` with full precision. Throws if result overflows a uint256 or `denominator == 0`.


```solidity
function mulDivRoundingUp(uint256 a, uint256 b, uint256 denominator) internal pure returns (uint256 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|
|`denominator`|`uint256`|The divisor|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint256`|The 256-bit result|


### mulDiv64

Calculates `floor(a×b÷2^64)` with full precision. Throws if result overflows a uint256.


```solidity
function mulDiv64(uint256 a, uint256 b) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The 256-bit result|


### mulDiv96

Calculates `floor(a×b÷2^96)` with full precision. Throws if result overflows a uint256.


```solidity
function mulDiv96(uint256 a, uint256 b) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The 256-bit result|


### mulDiv96RoundingUp

Calculates `ceil(a×b÷2^96)` with full precision. Throws if result overflows a uint256.


```solidity
function mulDiv96RoundingUp(uint256 a, uint256 b) internal pure returns (uint256 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint256`|The 256-bit result|


### mulDiv128

Calculates `floor(a×b÷2^128)` with full precision. Throws if result overflows a uint256.


```solidity
function mulDiv128(uint256 a, uint256 b) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The 256-bit result|


### mulDiv128RoundingUp

Calculates `ceil(a×b÷2^128)` with full precision. Throws if result overflows a uint256.


```solidity
function mulDiv128RoundingUp(uint256 a, uint256 b) internal pure returns (uint256 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint256`|The 256-bit result|


### mulDiv192

Calculates `floor(a×b÷2^192)` with full precision. Throws if result overflows a uint256.


```solidity
function mulDiv192(uint256 a, uint256 b) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The 256-bit result|


### mulDiv192RoundingUp

Calculates `ceil(a×b÷2^192)` with full precision.


```solidity
function mulDiv192RoundingUp(uint256 a, uint256 b) internal pure returns (uint256 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint256`|The 256-bit result|


### unsafeDivRoundingUp

Calculates `ceil(a÷b)`, returning 0 if `b == 0`.


```solidity
function unsafeDivRoundingUp(uint256 a, uint256 b) internal pure returns (uint256 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The numerator|
|`b`|`uint256`|The denominator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint256`|The 256-bit result|


### quickSort

QuickSort is a sorting algorithm that employs the Divide and Conquer strategy. It selects a pivot element and arranges the given array around
this pivot by correctly positioning it within the sorted array.


```solidity
function quickSort(int256[] memory arr, int256 left, int256 right) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`arr`|`int256[]`|The elements that must be sorted|
|`left`|`int256`|The starting index|
|`right`|`int256`|The ending index|


### sort

Calls `quickSort` with default starting index of 0 and ending index of the last element in the array.


```solidity
function sort(int256[] memory data) internal pure returns (int256[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`int256[]`|The elements that must be sorted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256[]`|The sorted array|


