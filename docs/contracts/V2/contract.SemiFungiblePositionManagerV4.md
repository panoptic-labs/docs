---
sidebar_position: 1.2
---
# SemiFungiblePositionManagerV4
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/SemiFungiblePositionManagerV4.sol)

**Inherits:**
[ERC1155](/contracts/tokens/ERC1155Minimal.sol/abstract.ERC1155.md), [Multicall](/contracts/base/Multicall.sol/abstract.Multicall.md), [TransientReentrancyGuard](/contracts/libraries/TransientReentrancyGuard.sol/abstract.TransientReentrancyGuard.md)

**Title:**
Semi-Fungible Position Manager (ERC1155) - a gas-efficient Uniswap V4 position manager.

**Author:**
Axicon Labs Limited

Wraps Uniswap V4 positions with up to 4 legs behind an ERC1155 token.


## State Variables
### MINT
Flag used to indicate a regular position mint.


```solidity
bool internal constant MINT = false
```


### BURN
Flag used to indicate that a position burn (with a burnTokenId) is occurring.


```solidity
bool internal constant BURN = true
```


### POOL_MANAGER_V4
The canonical Uniswap V4 Pool Manager address.


```solidity
IPoolManager internal immutable POOL_MANAGER_V4
```


### MIN_ENFORCED_TICKFILL_COST
The approximate minimum amount of tokens it should require to fill `maxLiquidityPerTick` at the minimum and maximum enforced ticks.


```solidity
uint256 internal immutable MIN_ENFORCED_TICKFILL_COST
```


### NATIVE_ENFORCED_TICKFILL_COST
The approximate minimum amount of tokens it should require to fill `maxLiquidityPerTick` at the minimum and maximum enforced ticks for native-token pools.


```solidity
uint256 internal immutable NATIVE_ENFORCED_TICKFILL_COST
```


### SUPPLY_MULTIPLIER_TICKFILL
The multiplier, in basis points, to apply to the token supply and set as the minimum enforced tick fill cost if greater than `MIN_ENFORCED_TICKFILL_COST`.


```solidity
uint256 internal immutable SUPPLY_MULTIPLIER_TICKFILL
```


### s_V4toSFPMIdData
Retrieve the SFPM PoolIdData struct associated with a given Uniswap V4 poolId.


```solidity
mapping(PoolId idV4 => mapping(uint256 vegoid => PoolData poolData)) internal s_V4toSFPMIdData
```


### s_poolIdToKey
Retrieve the Uniswap V4 pool key corresponding to a given poolId.


```solidity
mapping(uint64 poolId => PoolKey key) internal s_poolIdToKey
```


### s_accountLiquidity
Retrieve the current liquidity state in a chunk for a given user.

`removedAndNetLiquidity` is a LeftRight. The right slot represents the liquidity currently sold (added) in the AMM owned by the user and


```solidity
mapping(bytes32 positionKey => LeftRightUnsigned removedAndNetLiquidity) internal s_accountLiquidity
```


### s_accountPremiumOwed
Per-liquidity accumulator for the premium owed by buyers on a given chunk, tokenType and account.


```solidity
mapping(bytes32 positionKey => LeftRightUnsigned accountPremium) private s_accountPremiumOwed
```


### s_accountPremiumGross
Per-liquidity accumulator for the premium earned by sellers on a given chunk, tokenType and account.


```solidity
mapping(bytes32 positionKey => LeftRightUnsigned accountPremium) private s_accountPremiumGross
```


## Functions
### constructor

Set the canonical Uniswap V4 pool manager address and tick fill parameters.


```solidity
constructor(
    IPoolManager poolManager,
    uint256 _minEnforcedTickFillCost,
    uint256 _nativeEnforcedTickFillCost,
    uint256 _supplyMultiplierTickFill
) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolManager`|`IPoolManager`|The canonical Uniswap V4 pool manager address|
|`_minEnforcedTickFillCost`|`uint256`|The minimum amount of tokens it should require to fill `maxLiquidityPerTick` at the minimum and maximum enforced ticks|
|`_nativeEnforcedTickFillCost`|`uint256`|The minimum amount of tokens it should require to fill `maxLiquidityPerTick` at the minimum and maximum enforced ticks for native-token pools|
|`_supplyMultiplierTickFill`|`uint256`|The multiplier, in basis points, to apply to the token supply and set as the minimum enforced tick fill cost if greater than `MIN_ENFORCED_TICKFILL_COST`|


### initializeAMMPool

Initialize a Uniswap V4 pool in the SFPM.

Revert if already initialized.


```solidity
function initializeAMMPool(PoolKey calldata key, uint8 vegoid) external returns (uint64 poolId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|An identifying key for a Uniswap V4 pool|
|`vegoid`|`uint8`||


### _getPoolId

Given a 256-bit Uniswap V4 pool ID (hash) and the corresponding `tickSpacing`, return its 64-bit ID as used in the `TokenId` of Panoptic.


```solidity
function _getPoolId(PoolId idV4, int24 tickSpacing, uint256 vegoid) internal pure returns (uint64);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`idV4`|`PoolId`|The 256-bit Uniswap V4 pool ID|
|`tickSpacing`|`int24`|The tick spacing of the Uniswap V4 pool identified by `idV4`|
|`vegoid`|`uint256`|The vegoid of the SFPM, must be 8 bits|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint64`|A fingerprint representing the Uniswap V4 pool|


### expandEnforcedTickRange

Recomputes and decreases `minEnforcedTick` and/or increases `maxEnforcedTick` for a given V4 pool `key` if certain conditions are met.

This function will only have an effect if both conditions are met:
- The token supply for one of the (non-native) tokens was greater than MIN_ENFORCED_TICKFILL_COST at the last `initializeAMMPool` or `expandEnforcedTickRangeForPool` call for `poolId`
- The token supply for one of the tokens meeting the first condition has *decreased* significantly since the last call

This function *cannot* decrease the absolute value of either enforced tick, i.e., it can only widen the range of possible ticks.

The purpose of this function is to prevent pools created while a large amount of one of the tokens was flash-minted from being stuck in a narrow tick range.


```solidity
function expandEnforcedTickRange(uint64 poolId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The poolId on which to expand the enforced tick range|


### _unlockAndCreatePositionInAMM

Executes the corresponding operations and state updates required to mint `tokenId` of `positionSize` in `key`


```solidity
function _unlockAndCreatePositionInAMM(
    PoolKey memory key,
    int24 tickLimitLow,
    int24 tickLimitHigh,
    uint128 positionSize,
    TokenId tokenId,
    bool isBurn
) internal returns (LeftRightUnsigned[4] memory, LeftRightSigned, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The Uniswap V4 pool key in which to mint `tokenId`|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|
|`tokenId`|`TokenId`|The tokenId of the minted position, which encodes information about up to 4 legs|
|`isBurn`|`bool`|Flag indicating if the position is being burnt|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of currency0 and currency1 collected as fees for each leg|
|`<none>`|`LeftRightSigned`|The net amount of currency0 and currency1 moved to/from the Uniswap V4 pool|
|`<none>`|`int24`||


### unlockCallback

Uniswap V4 unlock callback implementation.

Parameters are `(address account, PoolKey key, int24 tickLimitLow, int24 tickLimitHigh, uint128 positionSize, TokenId tokenId, bool isBurn)`.

Executes the corresponding operations and state updates required to mint `tokenId` of `positionSize` in `key`

(shorts/longs are reversed before calling this function at burn)


```solidity
function unlockCallback(bytes calldata data) external returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes`|The encoded data containing the input parameters|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|`(LeftRightUnsigned[4] collectedByLeg, LeftRightSigned totalMoved)` An array of LeftRight encoded words containing the amount of currency0 and currency1 collected as fees for each leg and the net amount of currency0 and currency1 moved to/from the Uniswap V4 pool|


### burnTokenizedPosition

Burn a new position containing up to 4 legs wrapped in a ERC1155 token.

Auto-collect all accumulated fees.


```solidity
function burnTokenizedPosition(
    bytes calldata poolKey,
    TokenId tokenId,
    uint128 positionSize,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external nonReentrant returns (LeftRightUnsigned[4] memory, LeftRightSigned, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`bytes`|The Uniswap V4 pool key in which to burn `tokenId`|
|`tokenId`|`TokenId`|The tokenId of the minted position, which encodes information about up to 4 legs|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of currency0 and currency1 collected as fees for each leg|
|`<none>`|`LeftRightSigned`|The net amount of currency0 and currency1 moved to/from the Uniswap V4 pool|
|`<none>`|`int24`||


### mintTokenizedPosition

Create a new position `tokenId` containing up to 4 legs.


```solidity
function mintTokenizedPosition(
    bytes calldata poolKey,
    TokenId tokenId,
    uint128 positionSize,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external nonReentrant returns (LeftRightUnsigned[4] memory, LeftRightSigned, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`bytes`|The Uniswap V4 pool key in which to mint `tokenId`|
|`tokenId`|`TokenId`|The tokenId of the minted position, which encodes information for up to 4 legs|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of currency0 and currency1 collected as fees for each leg|
|`<none>`|`LeftRightSigned`|The net amount of currency0 and currency1 moved to/from the Uniswap V4 pool|
|`<none>`|`int24`||


### safeTransferFrom

All ERC1155 transfers are disabled.


```solidity
function safeTransferFrom(address, address, uint256, uint256, bytes calldata) public pure override;
```

### safeBatchTransferFrom

All ERC1155 transfers are disabled.


```solidity
function safeBatchTransferFrom(address, address, uint256[] calldata, uint256[] calldata, bytes calldata)
    public
    pure
    override;
```

### swapInAMM

Called to perform an ITM swap in the Uniswap pool to resolve any non-tokenType token deltas.

When a position is minted or burnt in-the-money (ITM) we are *not* 100% currency0 or 100% currency1: we have a mix of both tokens.

The swapping for ITM options is needed because only one of the tokens are "borrowed" by a user to create the position.


```solidity
function swapInAMM(PoolKey memory key, LeftRightSigned itmAmounts, uint256 asset)
    internal
    returns (LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The Uniswap V4 pool key in which to perform the swap|
|`itmAmounts`|`LeftRightSigned`|How much to swap (i.e. how many tokens are ITM)|
|`asset`|`uint256`|The asset of the first leg of the tokenId (determines which token to swap into)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The token deltas swapped in the AMM|


### _createPositionInAMM

Create the position in the AMM defined by `tokenId`.

Loops over each leg in the tokenId and calls _createLegInAMM for each, which does the mint/burn in the AMM.


```solidity
function _createPositionInAMM(
    address account,
    PoolKey memory key,
    bool invertedLimits,
    uint128 positionSize,
    TokenId tokenId,
    bool isBurn
) internal returns (LeftRightUnsigned[4] memory collectedByLeg, LeftRightSigned totalMoved);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The address of the user creating the position|
|`key`|`PoolKey`|The Uniswap V4 pool key in which to create the position|
|`invertedLimits`|`bool`|Whether the inputted lower limit > upper limit|
|`positionSize`|`uint128`|The size of the option position|
|`tokenId`|`TokenId`|The option position|
|`isBurn`|`bool`|Whether a position is being minted (false) or burned (true)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collectedByLeg`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of currency0 and currency1 collected as fees for each leg|
|`totalMoved`|`LeftRightSigned`|The net amount of funds moved to/from Uniswap|


### _createLegInAMM

Create the position in the AMM for a specific leg in the tokenId.

For the leg specified by the _leg input:

- mints any new liquidity in the AMM needed (via _mintLiquidity)

- burns any new liquidity in the AMM needed (via _burnLiquidity)

- tracks all amounts minted and burned

To burn a position, the opposing position is "created" through this function,
but we need to pass in a flag to indicate that so the removedLiquidity is updated.


```solidity
function _createLegInAMM(
    address account,
    PoolKey memory key,
    TokenId tokenId,
    uint256 leg,
    LiquidityChunk liquidityChunk,
    bool isBurn,
    uint256 vegoid
) internal returns (LeftRightSigned moved, LeftRightUnsigned collectedSingleLeg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The address of the user creating the position|
|`key`|`PoolKey`|The Uniswap V4 pool key in which to create the position|
|`tokenId`|`TokenId`|The option position|
|`leg`|`uint256`|The leg index that needs to be modified|
|`liquidityChunk`|`LiquidityChunk`|The liquidity chunk in Uniswap represented by the leg|
|`isBurn`|`bool`|Whether a position is being burned (true) or minted (false)|
|`vegoid`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`moved`|`LeftRightSigned`|The net amount of funds moved to/from Uniswap|
|`collectedSingleLeg`|`LeftRightUnsigned`|LeftRight encoded words containing the amount of currency0 and currency1 collected as fees|


### _updateStoredPremia

Updates the premium accumulators for a chunk with the latest collected tokens.


```solidity
function _updateStoredPremia(
    bytes32 positionKey,
    LeftRightUnsigned currentLiquidity,
    LeftRightUnsigned collectedAmounts,
    uint256 vegoid
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionKey`|`bytes32`|A key representing a liquidity chunk/range in Uniswap|
|`currentLiquidity`|`LeftRightUnsigned`|The total amount of liquidity in the AMM for the specified chunk|
|`collectedAmounts`|`LeftRightUnsigned`|The amount of tokens (currency0 and currency1) collected from Uniswap|
|`vegoid`|`uint256`||


### _getPremiaDeltas

Compute deltas for Owed/Gross premium given quantities of tokens collected from Uniswap.

Returned accumulators are capped at the max value (`2^128 - 1`) for each token if they overflow.


```solidity
function _getPremiaDeltas(LeftRightUnsigned currentLiquidity, LeftRightUnsigned collectedAmounts, uint256 vegoid)
    private
    pure
    returns (LeftRightUnsigned deltaPremiumOwed, LeftRightUnsigned deltaPremiumGross);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentLiquidity`|`LeftRightUnsigned`|NetLiquidity (right) and removedLiquidity (left) at the start of the transaction|
|`collectedAmounts`|`LeftRightUnsigned`|Total amount of tokens (currency0 and currency1) collected from Uniswap|
|`vegoid`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`deltaPremiumOwed`|`LeftRightUnsigned`|The extra premium (per liquidity X64) to be added to the owed accumulator for currency0 (right) and currency1 (left)|
|`deltaPremiumGross`|`LeftRightUnsigned`|The extra premium (per liquidity X64) to be added to the gross accumulator for currency0 (right) and currency1 (left)|


### getAccountLiquidity

Return the liquidity associated with a given liquidity chunk/tokenType for a user on a Uniswap pool.


```solidity
function getAccountLiquidity(
    bytes calldata poolKey,
    address owner,
    uint256 tokenType,
    int24 tickLower,
    int24 tickUpper
) external view returns (LeftRightUnsigned accountLiquidities);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`bytes`|the poolKey of the UniswapV4 pool|
|`owner`|`address`|The address of the account that is queried|
|`tokenType`|`uint256`|The tokenType of the position|
|`tickLower`|`int24`|The lower end of the tick range for the position|
|`tickUpper`|`int24`|The upper end of the tick range for the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`accountLiquidities`|`LeftRightUnsigned`|The amount of liquidity that held in and removed from Uniswap for that chunk (netLiquidity:removedLiquidity -> rightSlot:leftSlot)|


### getAccountPremium

Return the premium associated with a given position, where premium is an accumulator of feeGrowth for the touched position.

If an atTick parameter is provided that is different from `type(int24).max`, then it will update the premium up to the current
block at the provided atTick value. We do this because this may be called immediately after the Uniswap V4 pool has been touched,
so no need to read the feeGrowths from the Uniswap V4 pool.


```solidity
function getAccountPremium(
    bytes calldata poolKey,
    address owner,
    uint256 tokenType,
    int24 tickLower,
    int24 tickUpper,
    int24 atTick,
    uint256 isLong,
    uint256 vegoid
) external view returns (uint128, uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`bytes`|the poolKey of the UniswapV4 pool|
|`owner`|`address`|The address of the account that is queried|
|`tokenType`|`uint256`|The tokenType of the position|
|`tickLower`|`int24`|The lower end of the tick range for the position|
|`tickUpper`|`int24`|The upper end of the tick range for the position|
|`atTick`|`int24`|The current tick. Set `atTick < (type(int24).max = 8388608)` to get latest premium up to the current block|
|`isLong`|`uint256`|Whether the position is long (=1) or short (=0)|
|`vegoid`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|The amount of premium (per liquidity X64) for currency0 = `sum(feeGrowthLast0X128)` over every block where the position has been touched|
|`<none>`|`uint128`|The amount of premium (per liquidity X64) for currency1 = `sum(feeGrowthLast0X128)` over every block where the position has been touched|


### getUniswapV4PoolKeyFromId

Returns the Uniswap V4 poolkey  for a given `poolId`.


```solidity
function getUniswapV4PoolKeyFromId(uint64 poolId) external view returns (PoolKey memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The unique pool identifier for a Uni V4 pool in the SFPM|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PoolKey`|The Uniswap V4 pool key corresponding to `poolId`|


### getEnforcedTickLimits

Returns the current enforced tick limits for a given idV4 `poolId`.


```solidity
function getEnforcedTickLimits(uint64 poolId) external view returns (int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The unique pool identifier for a Uniswap V4 pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The minimum enforced tick for chunks created in the pool corresponding to `poolId`|
|`<none>`|`int24`|The maximum enforced tick for chunks created in the pool corresponding to `poolId`|


### getPoolId

Returns the `poolId` for a given Uniswap pool.


```solidity
function getPoolId(bytes memory id, uint8 vegoid) external view returns (uint64);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id`|`bytes`|The PoolId of the Uniswap V4 Pool|
|`vegoid`|`uint8`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint64`|poolId The unique pool identifier corresponding to a idV4|


### getCurrentTick

Returns the current tick of a given Uniswap V4 pool


```solidity
function getCurrentTick(bytes memory poolKey) public view returns (int24 currentTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`bytes`|the poolKey of the UniswapV4 pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick of the Uniswap pool|


## Events
### PoolInitialized
Emitted when a Uniswap V4 pool is initialized in the SFPM.


```solidity
event PoolInitialized(PoolId indexed idV4, uint64 poolId, int24 minEnforcedTick, int24 maxEnforcedTick);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`idV4`|`PoolId`|The Uniswap V4 pool identifier (hash of `poolKey`)|
|`poolId`|`uint64`|The SFPM's pool identifier for the pool, including the 16-bit tick spacing and 48-bit pool pattern|
|`minEnforcedTick`|`int24`|The initial minimum enforced tick for the pool|
|`maxEnforcedTick`|`int24`|The initial maximum enforced tick for the pool|

### EnforcedTicksUpdated
Emitted when the enforced tick range is expanded for a given Uniswap `idV4`.

Will be emitted on any `expandEnforcedTickRange` call, even if the enforced ticks are not actually changed.


```solidity
event EnforcedTicksUpdated(PoolId indexed idV4, int24 minEnforcedTick, int24 maxEnforcedTick);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`idV4`|`PoolId`|The Uniswap V4 pool identifier (hash of `poolKey`)|
|`minEnforcedTick`|`int24`|The new minimum enforced tick for the pool|
|`maxEnforcedTick`|`int24`|The new maximum enforced tick for the pool|

### TokenizedPositionBurnt
Emitted when a position is destroyed/burned.


```solidity
event TokenizedPositionBurnt(address indexed recipient, TokenId indexed tokenId, uint128 positionSize);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The address of the user who burned the position|
|`tokenId`|`TokenId`|The tokenId of the burned position|
|`positionSize`|`uint128`|The number of contracts burnt, expressed in terms of the asset|

### TokenizedPositionMinted
Emitted when a position is created/minted.


```solidity
event TokenizedPositionMinted(address indexed caller, TokenId indexed tokenId, uint128 positionSize);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`caller`|`address`|The address of the user who minted the position|
|`tokenId`|`TokenId`|The tokenId of the minted position|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|

### LiquidityChunkUpdated
Emitted when liquidity is modified in a chunk during position mint/burn.

This event provides detailed information about liquidity changes per chunk, simplifying indexing.


```solidity
event LiquidityChunkUpdated(
    PoolId indexed poolId,
    address indexed owner,
    uint256 indexed tokenType,
    int24 tickLower,
    int24 tickUpper,
    int128 liquidityDelta
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The Uniswap V4 pool ID|
|`owner`|`address`|The owner of the position|
|`tokenType`|`uint256`|The type of token for this leg (token0 or token1)|
|`tickLower`|`int24`|The lower tick of the liquidity chunk|
|`tickUpper`|`int24`|The upper tick of the liquidity chunk|
|`liquidityDelta`|`int128`|The signed change in liquidity (positive for additions, negative for removals)|

