# PanopticMath
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.1.x/contracts/libraries/PanopticMath.sol)

**Author:**
Axicon Labs Limited

Contains Panoptic-specific helpers and math functions.


## State Variables
### MAX_UINT256
This is equivalent to `type(uint256).max` — used in assembly blocks as a replacement.


```solidity
uint256 internal constant MAX_UINT256 = 2 ** 256 - 1;
```


### TICKSPACING_MASK
Masks 16-bit tickSpacing out of 64-bit `[16-bit tickspacing][48-bit poolPattern]` format poolId


```solidity
uint64 internal constant TICKSPACING_MASK = 0xFFFF000000000000;
```


## Functions
### getPoolId

Given a 256-bit Uniswap V4 pool ID (hash) and the corresponding `tickSpacing`, return its 64-bit ID as used in the `TokenId` of Panoptic.


```solidity
function getPoolId(PoolId idV4, int24 tickSpacing) internal pure returns (uint64);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`idV4`|`PoolId`|The 256-bit Uniswap V4 pool ID|
|`tickSpacing`|`int24`|The tick spacing of the Uniswap V4 pool identified by `idV4`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint64`|A fingerprint representing the Uniswap V4 pool|


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

Returns ERC20 symbol of `asset`.


```solidity
function safeERC20Symbol(address asset) external view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset to get the symbol of (`address(0)` = native asset)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The symbol of `asset` or "???" if not supported|


### uniswapFeeToString

Converts `fee` to a string with "bps" appended, or DYNAMIC if "fee" is equivalent to `0x800000`.

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

Update an existing account's "positions hash" with a new `tokenId`.

The positions hash contains a fingerprint of all open positions created by an account/user and a count of those positions.

*The "fingerprint" portion of the hash is given by XORing the hashed `tokenId` of each position the user has open together.*


```solidity
function updatePositionsHash(uint256 existingHash, TokenId tokenId, bool addFlag) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`existingHash`|`uint256`|The existing position hash containing all historical N positions created and the count of the positions|
|`tokenId`|`TokenId`|The new position to add to the existing hash: `existingHash = uint248(existingHash) ^ hashOf(tokenId)`|
|`addFlag`|`bool`|Whether to mint (add) the tokenId to the count of positions or burn (subtract) it from the count `(existingHash >> 248) +/- 1`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|newHash The new positionHash with the updated hash|


### getOracleTicks

Computes various oracle prices corresponding to a Uniswap pool.


```solidity
function getOracleTicks(IV3CompatibleOracle oracleContract, uint256 miniMedian)
    external
    view
    returns (int24 fastOracleTick, int24 slowOracleTick, int24 latestObservation, uint256 medianData);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oracleContract`|`IV3CompatibleOracle`|The external oracle contract to retrieve observations from|
|`miniMedian`|`uint256`|The packed structure representing the sorted 8-slot queue of internal median observations|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fastOracleTick`|`int24`|The fast oracle tick computed as the median of the past N observations in the Uniswap Pool|
|`slowOracleTick`|`int24`|The slow oracle tick as tracked by `s_miniMedian`|
|`latestObservation`|`int24`|The latest observation from the Uniswap pool (price at the end of the last block)|
|`medianData`|`uint256`|The updated value for `s_miniMedian` (returns 0 if not enough time has passed since last observation)|


### computeMedianObservedPrice

Returns the median of the last `cardinality` average prices over `period` observations from `oracleContract`.

*Used when we need a manipulation-resistant TWAP price.*

*oracle observations snapshot the closing price of the last block before the first interaction of a given block.*

*The maximum frequency of observations is 1 per block, but there is no guarantee that the pool will be observed at every block.*

*Each period has a minimum length of blocktime * period, but may be longer if the Uniswap pool is relatively inactive.*

*The final price used in the array (of length `cardinality`) is the average of all observations comprising `period` (which is itself a number of observations).*

*Thus, the minimum total time window is `cardinality` * `period` * `blocktime`.*


```solidity
function computeMedianObservedPrice(
    IV3CompatibleOracle oracleContract,
    uint256 observationIndex,
    uint256 observationCardinality,
    uint256 cardinality,
    uint256 period
) internal view returns (int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oracleContract`|`IV3CompatibleOracle`|The external oracle contract to retrieve observations from|
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

Takes a packed structure representing a sorted 8-slot queue of ticks and returns the median of those values and an updated queue if another observation is warranted.

*Also inserts the latest oracle observation into the buffer, resorts, and returns if the last entry is at least `period` seconds old.*


```solidity
function computeInternalMedian(
    uint256 observationIndex,
    uint256 observationCardinality,
    uint256 period,
    uint256 medianData,
    IV3CompatibleOracle oracleContract
) public view returns (int24 medianTick, uint256 updatedMedianData);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`observationIndex`|`uint256`|The index of the last observation in the Uniswap pool|
|`observationCardinality`|`uint256`|The number of observations in the Uniswap pool|
|`period`|`uint256`|The minimum time in seconds that must have passed since the last observation was inserted into the buffer|
|`medianData`|`uint256`|The packed structure representing the sorted 8-slot queue of ticks|
|`oracleContract`|`IV3CompatibleOracle`|The external oracle contract to retrieve observations from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`medianTick`|`int24`|The median of the provided 8-slot queue of ticks in `medianData`|
|`updatedMedianData`|`uint256`|The updated 8-slot queue of ticks with the latest observation inserted if the last entry is at least `period` seconds old (returns 0 otherwise)|


### twapFilter

Computes a TWAP price over `twapWindow` on a Uniswap V3-style observation oracle.

*Note that our definition of TWAP differs from a typical mean of prices over a time window.*

*We instead observe the average price over a series of time intervals, and define the TWAP as the median of those averages.*


```solidity
function twapFilter(IV3CompatibleOracle oracleContract, uint32 twapWindow) external view returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oracleContract`|`IV3CompatibleOracle`|The external oracle contract to retrieve observations from|
|`twapWindow`|`uint32`|The time window to compute the TWAP over|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The final calculated TWAP tick|


### getLiquidityChunk

For a given option position (`tokenId`), leg index within that position (`legIndex`), and `positionSize` get the tick range spanned and its
liquidity (share ownership) in the Uniswap V4 pool; this is a liquidity chunk.


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

Extract the tick range specified by `strike` and `width` for the given `tickSpacing`.


```solidity
function getTicks(int24 strike, int24 width, int24 tickSpacing) internal pure returns (int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`strike`|`int24`|The strike price of the option|
|`width`|`int24`|The width of the option|
|`tickSpacing`|`int24`|The tick spacing of the underlying Uniswap V4 pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The lower tick of the liquidity chunk|
|`<none>`|`int24`|The upper tick of the liquidity chunk|


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

Compute the amount of notional value underlying this option position.


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
|`longAmounts`|`LeftRightSigned`|Left-right packed word where rightSlot = currency0 and leftSlot = currency1 held against borrowed Uniswap liquidity for long legs|
|`shortAmounts`|`LeftRightSigned`|Left-right packed word where where rightSlot = currency0 and leftSlot = currency1 borrowed to create short legs|


### convert0to1

Convert an amount of currency0 into an amount of currency1 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks*


```solidity
function convert0to1(uint256 amount, uint160 sqrtPriceX96) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of currency0 to convert into currency1|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of currency0 into currency1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The converted `amount` of currency0 represented in terms of currency1|


### convert0to1RoundingUp

Convert an amount of currency0 into an amount of currency1 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks*


```solidity
function convert0to1RoundingUp(uint256 amount, uint160 sqrtPriceX96) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of currency0 to convert into currency1|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of currency0 into currency1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The converted `amount` of currency0 represented in terms of currency1|


### convert1to0

Convert an amount of currency1 into an amount of currency0 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.*


```solidity
function convert1to0(uint256 amount, uint160 sqrtPriceX96) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of currency1 to convert into currency0|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of currency1 into currency0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The converted `amount` of currency1 represented in terms of currency0|


### convert1to0RoundingUp

Convert an amount of currency1 into an amount of currency0 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.*


```solidity
function convert1to0RoundingUp(uint256 amount, uint160 sqrtPriceX96) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of currency1 to convert into currency0|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of currency1 into currency0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The converted `amount` of currency1 represented in terms of currency0|


### convert0to1

Convert an amount of currency0 into an amount of currency1 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.*


```solidity
function convert0to1(int256 amount, uint160 sqrtPriceX96) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`int256`|The amount of currency0 to convert into currency1|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of currency0 into currency1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The converted `amount` of currency0 represented in terms of currency1|


### convert1to0

Convert an amount of currency1 into an amount of currency0 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

*Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.*


```solidity
function convert1to0(int256 amount, uint160 sqrtPriceX96) internal pure returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`int256`|The amount of currency1 to convert into currency0|
|`sqrtPriceX96`|`uint160`|The square root of the price at which to convert `amount` of currency1 into currency0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The converted `amount` of currency1 represented in terms of currency0|


### getCrossBalances

Get a single collateral balance and requirement in terms of the lowest-priced token for a given set of (currency0/currency1) collateral balances and requirements.


```solidity
function getCrossBalances(LeftRightUnsigned tokenData0, LeftRightUnsigned tokenData1, uint160 sqrtPriceX96)
    internal
    pure
    returns (uint256, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenData0`|`LeftRightUnsigned`|LeftRight encoded word with balance of currency0 in the right slot, and required balance in left slot|
|`tokenData1`|`LeftRightUnsigned`|LeftRight encoded word with balance of currency1 in the right slot, and required balance in left slot|
|`sqrtPriceX96`|`uint160`|The price at which to compute the collateral value and requirements|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The combined collateral balance of `tokenData0` and `tokenData1` in terms of (currency0 if `price(currency1/currency0) < 1` and vice versa)|
|`<none>`|`uint256`|The combined required collateral threshold of `tokenData0` and `tokenData1` in terms of (currency0 if `price(currency1/currency0) < 1` and vice versa)|


### getAmountsMoved

Compute the notional value (for `tokenType = 0` and `tokenType = 1`) represented by a given leg in an option position.


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

Compute the amount of funds that are moved to or removed from the Panoptic Pool when `tokenId` is created.


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

Compute the pre-haircut liquidation bonuses to be paid to the liquidator and the protocol loss caused by the liquidation (pre-haircut).


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
|`tokenData0`|`LeftRightUnsigned`|LeftRight encoded word with balance of currency0 in the right slot, and required balance in left slot|
|`tokenData1`|`LeftRightUnsigned`|LeftRight encoded word with balance of currency1 in the right slot, and required balance in left slot|
|`atSqrtPriceX96`|`uint160`|The oracle price used to swap tokens between the liquidator/liquidatee and determine solvency for the liquidatee|
|`netPaid`|`LeftRightSigned`|The net amount of tokens paid/received by the liquidatee to close their portfolio of positions|
|`shortPremium`|`LeftRightUnsigned`|Total owed premium (prorated by available settled tokens) across all short legs being liquidated|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The LeftRight-packed bonus amounts to be paid to the liquidator for both tokens (may be negative)|
|`<none>`|`LeftRightSigned`|The LeftRight-packed protocol loss (pre-haircut) for both tokens, i.e., the delta between the user's starting balance and expended tokens|


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
|`collateral0`|`CollateralTracker`|The collateral tracker for currency0|
|`collateral1`|`CollateralTracker`|The collateral tracker for currency1|
|`atSqrtPriceX96`|`uint160`|The oracle price used to swap tokens between the liquidator/liquidatee and determine solvency for the liquidatee|
|`settledTokens`|`mapping(bytes32 chunkKey => LeftRightUnsigned settledTokens)`|The per-chunk accumulator of settled tokens in storage from which to subtract the haircut premium|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The delta, if any, to apply to the existing liquidation bonus|


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
|`exerciseFees`|`LeftRightSigned`|Pre-adjustment exercise fees to debit from exercisor (rightSlot = currency0 left = currency1)|
|`atTick`|`int24`|The tick at which to convert between currency0/currency1 when redistributing the exercise fees|
|`ct0`|`CollateralTracker`|The collateral tracker for currency0|
|`ct1`|`CollateralTracker`|The collateral tracker for currency1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The LeftRight-packed deltas for currency0/currency1 to move from the exercisor to the exercisee|


