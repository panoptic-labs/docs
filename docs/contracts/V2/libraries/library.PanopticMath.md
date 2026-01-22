# PanopticMath
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/libraries/PanopticMath.sol)

**Title:**
Compute general math quantities relevant to Panoptic and AMM pool management.

**Author:**
Axicon Labs Limited

Contains Panoptic-specific helpers and math functions.


## State Variables
### MAX_UINT256
This is equivalent to `type(uint256).max` — used in assembly blocks as a replacement.


```solidity
uint256 internal constant MAX_UINT256 = 2 ** 256 - 1
```


### TICKSPACING_VEGOID_MASK
Masks 16-bit tickSpacing and 8 bits of vegoid out of 64-bit `[16-bit tickspacing][8-bit vegoid][40-bit poolPattern]` format poolId.


```solidity
uint64 internal constant TICKSPACING_VEGOID_MASK = 0xFFFFFF0000000000
```


### PRIME_MODULUS_248

```solidity
uint256 internal constant PRIME_MODULUS_248 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff13
```


### PRIME_MODULUS_124_0

```solidity
uint256 internal constant PRIME_MODULUS_124_0 = 0xfffffffffffffffffffffffffffffc5
```


### PRIME_MODULUS_124_1

```solidity
uint256 internal constant PRIME_MODULUS_124_1 = 0xffffffffffffffffffffffffffffd99
```


### LANE_MASK_124

```solidity
uint256 internal constant LANE_MASK_124 = 0xfffffffffffffffffffffffffffffff
```


### UPPER_120BITS_MASK

```solidity
uint256 internal constant UPPER_120BITS_MASK = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000000000000000000000000000
```


### BITMASK_UINT88

```solidity
uint256 internal constant BITMASK_UINT88 = 0xFFFFFFFFFFFFFFFFFFFFFF
```


### BITMASK_UINT22

```solidity
uint256 internal constant BITMASK_UINT22 = 0x3FFFFF
```


## Functions
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

The lowest supported value of `fee` is 1 (`="0.01bps"`).


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

The positions hash contains a fingerprint of all open positions created by an account/user and a count of the legs across those positions.

The "fingerprint" portion of the hash is given by XORing the hashed `tokenId` of each position the user has open together.


```solidity
function updatePositionsHash(uint256 existingHash, TokenId tokenId, bool addFlag) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`existingHash`|`uint256`|The existing position hash representing a list of positions and the count of the legs across those positions|
|`tokenId`|`TokenId`|The new position to modify the existing hash with: `existingHash = uint248(existingHash) ^ uint248(hashOf(tokenId))`|
|`addFlag`|`bool`|Whether to mint (add) the tokenId to the count of positions or burn (subtract) it from the count `(existingHash >> 248) +/- tokenId.countLegs()`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|newHash The updated position hash with the new tokenId XORed in and the leg count incremented/decremented|


### homomorphicHash

Computes a homomorphic hash by adding or subtracting an item from an existing hash

Uses XOR-based homomorphic hashing (XHASH). The hash of the item is XORed with the
existing hash. Since XOR is its own inverse (A ⊕ B ⊕ B = A), both addition and
subtraction operations use the same XOR operation. This ensures the operation is
reversible and order-independent for the same set of items.
OR
Uses additive homomorphic hashing (AdHash) over a 248-bit prime field. The hash of the item
is either added to or subtracted from the existing hash using modular arithmetic.
Subtraction is implemented as addition of the modular inverse: hash + (PRIME - itemHash) mod PRIME.
This ensures the operation is reversible and order-independent for the same set of items.
OR
Uses LtHash (Lattice-based Hash) with k=2 lanes for improved collision resistance.
The 248-bit hash space is divided into two 124-bit lanes, each operating under
modular arithmetic with a 124-bit prime. The item hash is split into two 124-bit
chunks and each chunk is added/subtracted from its corresponding lane independently.
Subtraction is implemented as addition of the modular inverse: lane + (PRIME - chunk) mod PRIME.
This parallel lane approach provides better security properties than single-lane hashing
while maintaining homomorphic properties (order-independence and reversibility).


```solidity
function homomorphicHash(uint256 hash, uint256 item, bool addFlag) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hash`|`uint256`|The existing hash value (only lower 248 bits are used)|
|`item`|`uint256`|The item to be hashed and added/subtracted (typically a TokenId cast to uint256)|
|`addFlag`|`bool`|True to add the item to the hash, false to subtract it|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The updated homomorphic hash as a uint256 (but only lower 248 bits contain the hash)|


### hasNoDuplicateTokenIds

Checks if an array of TokenIds contains any duplicate values

Uses assembly for gas optimization. Performs O(n²) comparison by checking each element
against all subsequent elements. Returns false immediately upon finding the first duplicate.
Arrays with 0 or 1 elements are considered to have no duplicates.


```solidity
function hasNoDuplicateTokenIds(TokenId[] calldata arr) external pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`arr`|`TokenId[]`|The array of TokenIds to check for duplicates|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the array contains no duplicate TokenIds, false if duplicates are found|


### computeMedianObservedPrice

Returns the median of the last `cardinality` average prices over `period` observations from `univ3pool`.

Used when we need a manipulation-resistant TWAP price.

Uniswap observations snapshot the closing price of the last block before the first interaction of a given block.

The maximum frequency of observations is 1 per block, but there is no guarantee that the pool will be observed at every block.

Each period has a minimum length of `blocktime * period`, but may be longer if the Uniswap pool is relatively inactive.

The final price used in the array (of length `cardinality`) is the average of `cardinality` observations spaced by `period` (which is itself a number of observations).

Thus, the minimum total time window is `cardinality * period * blocktime`.


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


### twapFilter

Computes the TWAP of a Uniswap V3 pool using data from its oracle.

Note that our definition of TWAP differs from a typical mean of prices over a time window.

We instead observe the average price over a series of time intervals, and define the TWAP as the median of those averages.


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
liquidity (share ownership) in the Uniswap V3 pool; this is a liquidity chunk.


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
|`tickSpacing`|`int24`|The tick spacing of the underlying Uniswap V3 pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The lower tick of the liquidity chunk|
|`<none>`|`int24`|The upper tick of the liquidity chunk|


### getRangesFromStrike

Returns the distances of the upper and lower ticks from the strike for a position with the given width and tickSpacing.

Given `r = (width * tickSpacing) / 2`, `tickLower = strike - floor(r)` and `tickUpper = strike + ceil(r)`.


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
|`<none>`|`int24`|The distance of the lower tick from the strike|
|`<none>`|`int24`|The distance of the upper tick from the strike|


### getChunkKey

Computes the chunk key for a given leg of a position.

The chunk key uniquely identifies a liquidity chunk by its strike, width, and token type.


```solidity
function getChunkKey(TokenId tokenId, uint256 leg) internal pure returns (bytes32 chunkKey);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`leg`|`uint256`|The leg index within the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`chunkKey`|`bytes32`|The keccak256 hash identifying this chunk|


### computeExercisedAmounts

Compute the amount of notional value underlying an option position.


```solidity
function computeExercisedAmounts(TokenId tokenId, uint128 positionSize, bool opening)
    internal
    pure
    returns (LeftRightSigned longAmounts, LeftRightSigned shortAmounts);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position id|
|`positionSize`|`uint128`|The number of contracts of the option|
|`opening`|`bool`|Whether you need the token0s and token1s moved while opening the position, or while closing|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`longAmounts`|`LeftRightSigned`|Left-right packed word where rightSlot = token0 and leftSlot = token1 held against borrowed Uniswap liquidity for long legs|
|`shortAmounts`|`LeftRightSigned`|Left-right packed word where where rightSlot = token0 and leftSlot = token1 borrowed to create short legs|


### convert0to1

Convert an amount of token0 into an amount of token1 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

Uses reduced precision after tick 443636 in order to accommodate the full range of ticks


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

Convert an amount of token0 into an amount of token1 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

Uses reduced precision after tick 443636 in order to accommodate the full range of ticks


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

Convert an amount of token1 into an amount of token0 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.


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

Convert an amount of token1 into an amount of token0 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.


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

Convert an amount of token0 into an amount of token1 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.


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


### convert0to1RoundingUp

Convert an amount of token0 into an amount of token1 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.


```solidity
function convert0to1RoundingUp(int256 amount, uint160 sqrtPriceX96) internal pure returns (int256);
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

Convert an amount of token1 into an amount of token0 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.


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


### convert1to0RoundingUp

Convert an amount of token1 into an amount of token0 given the sqrtPriceX96 in a Uniswap pool defined as `sqrt(1/0)*2^96`.

Uses reduced precision after tick 443636 in order to accommodate the full range of ticks.


```solidity
function convert1to0RoundingUp(int256 amount, uint160 sqrtPriceX96) internal pure returns (int256);
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
|`<none>`|`uint256`|The combined collateral balance of `tokenData0` and `tokenData1` in terms of (token0 if `price(token1/token0) < 1` and vice versa)|
|`<none>`|`uint256`|The combined required collateral threshold of `tokenData0` and `tokenData1` in terms of (token0 if `price(token1/token0) < 1` and vice versa)|


### getAmountsMoved

Compute the notional value (for `tokenType = 0` and `tokenType = 1`) represented by a given leg in an option position.


```solidity
function getAmountsMoved(TokenId tokenId, uint128 positionSize, uint256 legIndex, bool opening)
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
|`opening`|`bool`|Whether this position is being opened or closed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned`|A LeftRight encoded variable containing the amount0 and the amount1 value controlled by this option position's leg|


### calculateIOAmounts

Compute the amount of funds that are moved to or removed from the Panoptic Pool when `tokenId` is created.


```solidity
function calculateIOAmounts(TokenId tokenId, uint128 positionSize, uint256 legIndex, bool opening)
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
|`opening`|`bool`|Whether this position is being opened or closed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`longs`|`LeftRightSigned`|A LeftRight-packed word containing the total amount of long positions|
|`shorts`|`LeftRightSigned`|A LeftRight-packed word containing the amount of short positions|


