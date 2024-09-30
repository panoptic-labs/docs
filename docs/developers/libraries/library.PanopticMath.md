# PanopticMath
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/libraries/PanopticMath.sol)

**Author:**
Axicon Labs Limited


## State Variables
### MAX_UINT256
This is equivalent to type(uint256).max — used in assembly blocks as a replacement.


```solidity
uint256 internal constant MAX_UINT256 = 2 ** 256 - 1;
```


### TICKSPACING_MASK
Masks 16-bit tickSpacing out of 64-bit [16-bit tickspacing][48-bit poolPattern] format poolId


```solidity
uint64 internal constant TICKSPACING_MASK = 0xFFFF000000000000;
```


## Functions
### getPoolId

Given an address to a Uniswap v3 pool, return its 64-bit ID as used in the `TokenId` of Panoptic.


```solidity
function getPoolId(address univ3pool) internal view returns (uint64);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`address`|The address of the Uniswap v3 pool to get the ID of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint64`|A uint64 representing a fingerprint of the uniswap v3 pool address|


### incrementPoolPattern

Increments the pool pattern (first 48 bits) of a poolId by 1.


```solidity
function incrementPoolPattern(uint64 poolId) internal pure returns (uint64);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The 64-bit pool ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint64`|The provided `poolId` with its pool pattern slot incremented by 1|


### numberOfLeadingHexZeros

Get the number of leading hex characters in an address.


```solidity
function numberOfLeadingHexZeros(address addr) external pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`addr`|`address`|The address to get the number of leading zero hex characters for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of leading zero hex characters in the address|


### safeERC20Symbol

Returns ERC20 symbol of `token`.


```solidity
function safeERC20Symbol(address token) external view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token to get the symbol of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The symbol of `token` or "???" if not supported|


### uniswapFeeToString

Converts `fee` to a string with "bps" appended.

*The lowest supported value of `fee` is 1 (`="0.01bps"`).*


```solidity
function uniswapFeeToString(uint24 fee) internal pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fee`|`uint24`|The fee to convert to a string (in hundredths of basis points)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|Stringified version of `fee` with "bps" appended|


### updatePositionsHash

Update an existing account's "positions hash" with a new single position `tokenId`.

The positions hash contains a single fingerprint of all positions created by an account/user as well as a tally of the positions.

*The combined hash is the XOR of all individual position hashes.*


```solidity
function updatePositionsHash(uint256 existingHash, TokenId tokenId, bool addFlag) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`existingHash`|`uint256`|The existing position hash containing all historical N positions created and the count of the positions|
|`tokenId`|`TokenId`|The new position to add to the existing hash: existingHash = uint248(existingHash) ^ hashOf(tokenId)|
|`addFlag`|`bool`|Whether to mint (add) the tokenId to the count of positions or burn (subtract) it from the count (existingHash >> 248) +/- 1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|newHash The new positionHash with the updated hash|


### getOracleTicks

Gets several ticks from Uniswap regarding the underlying pair.


```solidity
function getOracleTicks(IUniswapV3Pool univ3pool, uint256 miniMedian)
    external
    view
    returns (int24 currentTick, int24 fastOracleTick, int24 slowOracleTick, int24 latestObservation, uint256 medianData);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap pool to get the observations from|
|`miniMedian`|`uint256`|The packed structure representing the sorted 8-slot queue of ticks|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick in the Uniswap pool (as returned in slot0)|
|`fastOracleTick`|`int24`|The fast oracle tick computed as the median of the past N observations in the Uniswap Pool|
|`slowOracleTick`|`int24`|The slow oracle tick as tracked by `s_miniMedian`|
|`latestObservation`|`int24`|The latest observation from the Uniswap pool (price at the end of the last block)|
|`medianData`|`uint256`|the updated value for `s_miniMedian` (returns 0 if not enough time has passed since last observation)|


### computeMedianObservedPrice

Returns the median of the last `cardinality` average prices over `period` observations from `univ3pool`.

*Used when we need a manipulation-resistant TWAP price.*

*Uniswap observations snapshot the closing price of the last block before the first interaction of a given block.*

*The maximum frequency of observations is 1 per block, but there is no guarantee that the pool will be observed at every block.*

*Each period has a minimum length of blocktime * period, but may be longer if the Uniswap pool is relatively inactive.*

*The final price used in the array (of length `cardinality`) is the average of all observations comprising `period` (which is itself a number of observations).*

*Thus, the minimum total time window is `cardinality` * `period` * `blocktime`.*


```solidity
function computeMedianObservedPrice(
    IUniswapV3Pool univ3pool,
    uint256 observationIndex,
    uint256 observationCardinality,
    uint256 cardinality,
    uint256 period
) internal view returns (int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap pool to get the median observation from|
|`observationIndex`|`uint256`|The index of the last observation in the pool|
|`observationCardinality`|`uint256`|The number of observations in the pool|
|`cardinality`|`uint256`|The number of `periods` to in the median price array, should be odd|
|`period`|`uint256`|The number of observations to average to compute one entry in the median price array|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The median of `cardinality` observations spaced by `period` in the Uniswap pool|
|`<none>`|`int24`|The latest observation in the Uniswap pool|


### computeInternalMedian

Takes a packed structure representing a sorted 8-slot queue of ticks and returns the median of those values.

*Also inserts the latest Uniswap observation into the buffer, resorts, and returns if the last entry is at least `period` seconds old.*


```solidity
function computeInternalMedian(
    uint256 observationIndex,
    uint256 observationCardinality,
    uint256 period,
    uint256 medianData,
    IUniswapV3Pool univ3pool
) public view returns (int24 medianTick, uint256 updatedMedianData);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`observationIndex`|`uint256`|The index of the last observation in the Uniswap pool|
|`observationCardinality`|`uint256`|The number of observations in the Uniswap pool|
|`period`|`uint256`|The minimum time in seconds that must have passed since the last observation was inserted into the buffer|
|`medianData`|`uint256`|The packed structure representing the sorted 8-slot queue of ticks|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap pool to retrieve observations from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`medianTick`|`int24`|The median of the provided 8-slot queue of ticks in `medianData`|
|`updatedMedianData`|`uint256`|The updated 8-slot queue of ticks with the latest observation inserted if the last entry is at least `period` seconds old (returns 0 otherwise)|


### twapFilter

Computes the twap of a Uniswap V3 pool using data from its oracle.

*Note that our definition of TWAP differs from a typical mean of prices over a time window.*

*We instead observe the average price over a series of time intervals, and define the TWAP as the median of those averages.*


```solidity
function twapFilter(IUniswapV3Pool univ3pool, uint32 twapWindow) external view returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap pool from which to compute the TWAP|
|`twapWindow`|`uint32`|The time window to compute the TWAP over|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The final calculated TWAP tick|


### getLiquidityChunk

For a given option position (`tokenId`), leg index within that position (`legIndex`), and `positionSize` get the tick range spanned and its
liquidity (share ownership) in the Univ3 pool; this is a liquidity chunk.


```solidity
function getLiquidityChunk(TokenId tokenId, uint256 legIndex, uint128 positionSize)
    internal
    pure
    returns (LiquidityChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position id|
|`legIndex`|`uint256`|The leg index of the option position, can be {0,1,2,3}|
|`positionSize`|`uint128`|The number of contracts held by this leg|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LiquidityChunk`|A LiquidityChunk with `tickLower`, `tickUpper`, and `liquidity`|


### getTicks

Extract the tick range specified by `strike` and `width` for the given `tickSpacing`, if valid.


```solidity
function getTicks(int24 strike, int24 width, int24 tickSpacing)
    internal
    pure
    returns (int24 tickLower, int24 tickUpper);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`strike`|`int24`|The strike price of the option|
|`width`|`int24`|The width of the option|
|`tickSpacing`|`int24`|The tick spacing of the underlying Uniswap v3 pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tickLower`|`int24`|The lower tick of the liquidity chunk|
|`tickUpper`|`int24`|The upper tick of the liquidity chunk|


### getRangesFromStrike

Returns the distances of the upper and lower ticks from the strike for a position with the given width and tickSpacing.

*Given `r = (width * tickSpacing) / 2`, `tickLower = strike - floor(r)` and `tickUpper = strike + ceil(r)`.*


```solidity
function getRangesFromStrike(int24 width, int24 tickSpacing) internal pure returns (int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`width`|`int24`|The width of the leg|
|`tickSpacing`|`int24`|The tick spacing of the underlying pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The lower tick of the range|
|`<none>`|`int24`|The upper tick of the range|


### computeExercisedAmounts

Compute the amount of funds that are underlying this option position. This is useful when exercising a position.


```solidity
function computeExercisedAmounts(TokenId tokenId, uint128 positionSize)
    internal
    pure
    returns (LeftRightSigned longAmounts, LeftRightSigned shortAmounts);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position id|
|`positionSize`|`uint128`|The number of contracts of this option|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`longAmounts`|`LeftRightSigned`|Left-right packed word where rightSlot = token0 and leftSlot = token1 held against borrowed Uniswap liquidity for long legs|
|`shortAmounts`|`LeftRightSigned`|Left-right packed word where where rightSlot = token0 and leftSlot = token1 borrowed to create short legs|


### convert0to1

Convert an amount of token0 into an amount of token1 given the sqrtPriceX96 in a Uniswap pool defined as sqrt(1/0)*2^96.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks*


```solidity
function convert0to1(uint256 amount, uint160 sqrtPriceX96) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of token0 to convert into token1|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of token0 into token1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The converted `amount` of token0 represented in terms of token1|


### convert0to1RoundingUp

Convert an amount of token0 into an amount of token1 given the sqrtPriceX96 in a Uniswap pool defined as sqrt(1/0)*2^96.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks*


```solidity
function convert0to1RoundingUp(uint256 amount, uint160 sqrtPriceX96) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of token0 to convert into token1|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of token0 into token1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The converted `amount` of token0 represented in terms of token1|


### convert1to0

Convert an amount of token1 into an amount of token0 given the sqrtPriceX96 in a Uniswap pool defined as sqrt(1/0)*2^96.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.*


```solidity
function convert1to0(uint256 amount, uint160 sqrtPriceX96) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of token1 to convert into token0|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of token1 into token0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The converted `amount` of token1 represented in terms of token0|


### convert1to0RoundingUp

Convert an amount of token1 into an amount of token0 given the sqrtPriceX96 in a Uniswap pool defined as sqrt(1/0)*2^96.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.*


```solidity
function convert1to0RoundingUp(uint256 amount, uint160 sqrtPriceX96) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of token1 to convert into token0|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of token1 into token0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The converted `amount` of token1 represented in terms of token0|


### convert0to1

Convert an amount of token0 into an amount of token1 given the sqrtPriceX96 in a Uniswap pool defined as sqrt(1/0)*2^96.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.*


```solidity
function convert0to1(int256 amount, uint160 sqrtPriceX96) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`int256`|The amount of token0 to convert into token1|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of token0 into token1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The converted `amount` of token0 represented in terms of token1|


### convert1to0

Convert an amount of token1 into an amount of token0 given the sqrtPriceX96 in a Uniswap pool defined as sqrt(1/0)*2^96.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.*


```solidity
function convert1to0(int256 amount, uint160 sqrtPriceX96) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`int256`|The amount of token1 to convert into token0|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of token1 into token0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The converted `amount` of token1 represented in terms of token0|


### getCrossBalances

Get a single collateral balance and requirement in terms of the lowest-priced token for a given set of (token0/token1) collateral balances and requirements.


```solidity
function getCrossBalances(LeftRightUnsigned tokenData0, LeftRightUnsigned tokenData1, uint160 sqrtPriceX96)
    internal
    pure
    returns (uint256, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenData0`|`LeftRightUnsigned`|LeftRight encoded word with balance of token0 in the right slot, and required balance in left slot|
|`tokenData1`|`LeftRightUnsigned`|LeftRight encoded word with balance of token1 in the right slot, and required balance in left slot|
|`sqrtPriceX96`|`uint160`|The price at which to compute the collateral value and requirements|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The combined collateral balance of `tokenData0` and `tokenData1` in terms of (token0 if price(token1/token0) < 1 and vice versa)|
|`<none>`|`uint256`|The combined required collateral threshold of `tokenData0` and `tokenData1` in terms of (token0 if price(token1/token0) < 1 and vice versa)|


### getAmountsMoved

Compute the amount of token0 and token1 moved. Given an option position `tokenId`, leg index `legIndex`, and how many contracts are in the leg `positionSize`.


```solidity
function getAmountsMoved(TokenId tokenId, uint128 positionSize, uint256 legIndex)
    internal
    pure
    returns (LeftRightUnsigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position identifier|
|`positionSize`|`uint128`|The number of option contracts held in this position (each contract can control multiple tokens)|
|`legIndex`|`uint256`|The leg index of the option contract, can be {0,1,2,3}|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned`|A LeftRight encoded variable containing the amount0 and the amount1 value controlled by this option position's leg|


### _calculateIOAmounts

Compute the amount of funds that are moved to and removed from the Panoptic Pool.


```solidity
function _calculateIOAmounts(TokenId tokenId, uint128 positionSize, uint256 legIndex)
    internal
    pure
    returns (LeftRightSigned longs, LeftRightSigned shorts);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position identifier|
|`positionSize`|`uint128`|The number of positions minted|
|`legIndex`|`uint256`|The leg index minted in this position, can be {0,1,2,3}|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`longs`|`LeftRightSigned`|A LeftRight-packed word containing the total amount of long positions|
|`shorts`|`LeftRightSigned`|A LeftRight-packed word containing the amount of short positions|


### getLiquidationBonus

Compute the pre-haircut liquidation bonuses to be paid to the liquidator and the protocol loss caused by the liquidation.


```solidity
function getLiquidationBonus(
    LeftRightUnsigned tokenData0,
    LeftRightUnsigned tokenData1,
    uint160 atSqrtPriceX96,
    LeftRightSigned netPaid,
    LeftRightUnsigned shortPremium
) external pure returns (LeftRightSigned, LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenData0`|`LeftRightUnsigned`|LeftRight encoded word with balance of token0 in the right slot, and required balance in left slot|
|`tokenData1`|`LeftRightUnsigned`|LeftRight encoded word with balance of token1 in the right slot, and required balance in left slot|
|`atSqrtPriceX96`|`uint160`|The oracle price used to swap tokens between the liquidator/liquidatee and determine solvency for the liquidatee|
|`netPaid`|`LeftRightSigned`|The net amount of tokens paid/received by the liquidatee to close their portfolio of positions|
|`shortPremium`|`LeftRightUnsigned`|Total owed premium (prorated by available settled tokens) across all short legs being liquidated|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The LeftRight-packed bonus amounts to be paid to the liquidator for both tokens (may be negative)|
|`<none>`|`LeftRightSigned`|The LeftRight-packed protocol loss for both tokens, i.e., the delta between the user's starting balance and expended tokens|


### haircutPremia

Haircut/clawback any premium paid by `liquidatee` on `positionIdList` over the protocol loss threshold during a liquidation.

*Note that the storage mapping provided as the `settledTokens` parameter WILL be modified on the caller by this function.*


```solidity
function haircutPremia(
    address liquidatee,
    TokenId[] memory positionIdList,
    LeftRightSigned[4][] memory premiasByLeg,
    LeftRightSigned collateralRemaining,
    CollateralTracker collateral0,
    CollateralTracker collateral1,
    uint160 atSqrtPriceX96,
    mapping(bytes32 chunkKey => LeftRightUnsigned settledTokens) storage settledTokens
) external returns (LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidatee`|`address`|The address of the user being liquidated|
|`positionIdList`|`TokenId[]`|The list of position ids being liquidated|
|`premiasByLeg`|`LeftRightSigned[4][]`|The premium paid (or received) by the liquidatee for each leg of each position|
|`collateralRemaining`|`LeftRightSigned`|The remaining collateral after the liquidation (negative if protocol loss)|
|`collateral0`|`CollateralTracker`|The collateral tracker for token0|
|`collateral1`|`CollateralTracker`|The collateral tracker for token1|
|`atSqrtPriceX96`|`uint160`|The oracle price used to swap tokens between the liquidator/liquidatee and determine solvency for the liquidatee|
|`settledTokens`|`mapping(bytes32 chunkKey => LeftRightUnsigned settledTokens)`|The per-chunk accumulator of settled tokens in storage from which to subtract the haircut premium|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The delta in bonus0 and bonus1 for the liquidator post-haircut|


### getExerciseDeltas

Redistribute the final exercise fee deltas between tokens if necessary according to the available collateral from the exercised user.


```solidity
function getExerciseDeltas(
    address exercisee,
    LeftRightSigned exerciseFees,
    int24 atTick,
    CollateralTracker ct0,
    CollateralTracker ct1
) external view returns (LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`exercisee`|`address`|The address of the user being exercised|
|`exerciseFees`|`LeftRightSigned`|Exercise fees to debit from exercisor at tick(atTick) rightSlot = token0 left = token1|
|`atTick`|`int24`|Tick to convert values at. This can be the current tick or some TWAP/median tick|
|`ct0`|`CollateralTracker`|The collateral tracker for token0|
|`ct1`|`CollateralTracker`|The collateral tracker for token1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The LeftRight-packed deltas for token0/token1 to move from the exercisor to the exercisee|


