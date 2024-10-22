---
sidebar_position: 1
---
# SemiFungiblePositionManager
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/SemiFungiblePositionManager.sol)

**Inherits:**
[ERC1155](/docs/developers/tokens/abstract.ERC1155), [Multicall](/docs/developers/base/abstract.Multicall), TransientReentrancyGuard

**Author:**
Axicon Labs Limited

Wraps Uniswap V4 positions with up to 4 legs behind an ERC1155 token.

*Replaces the NonfungiblePositionManager.sol (ERC721) from Uniswap Labs.*


## State Variables
### MINT
Flag used to indicate a regular position mint.


```solidity
bool internal constant MINT = false;
```


### BURN
Flag used to indicate that a position burn (with a burnTokenId) is occuring.


```solidity
bool internal constant BURN = true;
```


### VEGOID
Parameter used to modify the [equation](https://www.desmos.com/calculator/mdeqob2m04) of the utilization-based multiplier for long premium.


```solidity
uint128 private constant VEGOID = 2;
```


### POOL_MANAGER_V4
The canonical Uniswap V4 Pool Manager address.


```solidity
IPoolManager internal immutable POOL_MANAGER_V4;
```


### MIN_ENFORCED_TICKFILL_COST
The approximate minimum amount of tokens it should require to fill `maxLiquidityPerTick` at the minimum and maximum enforced ticks.


```solidity
uint256 internal immutable MIN_ENFORCED_TICKFILL_COST;
```


### SUPPLY_MULTIPLIER_TICKFILL
The multiplier, in basis points, to apply to the token supply and set as the minimum enforced tick fill cost if greater than `MIN_ENFORCED_TICKFILL_COST`.


```solidity
uint256 internal immutable SUPPLY_MULTIPLIER_TICKFILL;
```


### s_V4toSFPMIdData
Retrieve the SFPM PoolIdData struct associated with a given Uniswap V4 poolId.


```solidity
mapping(PoolId idV4 => PoolIdData poolIdData) internal s_V4toSFPMIdData;
```


### s_poolIdToKey
Retrieve the Uniswap V4 pool key corresponding to a given poolId.


```solidity
mapping(uint64 poolId => PoolKey key) internal s_poolIdToKey;
```


### s_accountLiquidity
Retrieve the current liquidity state in a chunk for a given user.

*`removedAndNetLiquidity` is a LeftRight. The right slot represents the liquidity currently sold (added) in the AMM owned by the user and*


```solidity
mapping(bytes32 positionKey => LeftRightUnsigned removedAndNetLiquidity) internal s_accountLiquidity;
```


### s_accountPremiumOwed
Per-liquidity accumulator for the premium owed by buyers on a given chunk, tokenType and account.


```solidity
mapping(bytes32 positionKey => LeftRightUnsigned accountPremium) private s_accountPremiumOwed;
```


### s_accountPremiumGross
Per-liquidity accumulator for the premium earned by sellers on a given chunk, tokenType and account.


```solidity
mapping(bytes32 positionKey => LeftRightUnsigned accountPremium) private s_accountPremiumGross;
```


## Functions
### constructor

Set the canonical Uniswap V4 pool manager address and tick fill parameters.


```solidity
constructor(IPoolManager poolManager, uint256 _minEnforcedTickFillCost, uint256 _supplyMultiplierTickFill);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolManager`|`IPoolManager`|The canonical Uniswap V4 pool manager address|
|`_minEnforcedTickFillCost`|`uint256`|The minimum amount of tokens it should require to fill `maxLiquidityPerTick` at the minimum and maximum enforced ticks|
|`_supplyMultiplierTickFill`|`uint256`|The multiplier, in basis points, to apply to the token supply and set as the minimum enforced tick fill cost if greater than `MIN_ENFORCED_TICKFILL_COST`|


### initializeAMMPool

Initialize a Uniswap V4 pool in the SFPM.

*Revert if already initialized.*


```solidity
function initializeAMMPool(PoolKey calldata key) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|An identifying key for a Uniswap V4 pool|


### expandEnforcedTickRange

Recomputes and decreases `minEnforcedTick` and/or increases `maxEnforcedTick` for a given `poolId` if certain conditions are met.

**

*This function will only have an effect if both conditions are met:
- The token supply for one of the tokens was greater than MIN_ENFORCED_TICKFILL_COST at the last `initializeAMMPool` or `expandEnforcedTickRangeForPool` call for `poolId`
- The token supply for one of the tokens meeting the first condition has *decreased* significantly since the last call*

*This function *cannot* decrease the absolute value of either enforced tick, i.e., it can only widen the range of possible ticks.*

*The purpose of this function is to prevent pools created while a large amount of one of the tokens was flash-minted from being stuck in a narrow tick range.*


```solidity
function expandEnforcedTickRange(PoolKey calldata key) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The key for the Uniswap V4 pool on which to expand the enforced tick range|


### _unlockAndCreatePositionInAMM

Executes the corresponding operations and state updates required to mint `tokenId` of `positionSize` in `key`


```solidity
function _unlockAndCreatePositionInAMM(
    PoolKey calldata key,
    int24 tickLimitLow,
    int24 tickLimitHigh,
    uint128 positionSize,
    TokenId tokenId,
    bool isBurn
) internal returns (LeftRightUnsigned[4] memory, LeftRightSigned);
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
|`<none>`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of token0 and token1 collected as fees for each leg|
|`<none>`|`LeftRightSigned`|The net amount of token0 and token1 moved to/from the Uniswap V4 pool|


### unlockCallback

Uniswap V4 unlock callback implementation.

*Parameters are `(PoolKey key, int24 tickLimitLow, int24 tickLimitHigh, uint128 positionSize, TokenId tokenId, bool isBurn)`.*

*Executes the corresponding operations and state updates required to mint `tokenId` of `positionSize` in `key`*

*(shorts/longs are reversed before calling this function at burn)*


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
|`<none>`|`bytes`|`(LeftRightUnsigned[4] collectedByLeg, LeftRightSigned totalMoved)` An array of LeftRight encoded words containing the amount of token0 and token1 collected as fees for each leg and the net amount of token0 and token1 moved to/from the Uniswap V4 pool|


### burnTokenizedPosition

Burn a new position containing up to 4 legs wrapped in a ERC1155 token.

*Auto-collect all accumulated fees.*


```solidity
function burnTokenizedPosition(
    PoolKey calldata key,
    TokenId tokenId,
    uint128 positionSize,
    int24 slippageTickLimitLow,
    int24 slippageTickLimitHigh
) external nonReentrant returns (LeftRightUnsigned[4] memory, LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The Uniswap V4 pool key in which to burn `tokenId`|
|`tokenId`|`TokenId`|The tokenId of the minted position, which encodes information about up to 4 legs|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|
|`slippageTickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`slippageTickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of token0 and token1 collected as fees for each leg|
|`<none>`|`LeftRightSigned`|The net amount of token0 and token1 moved to/from the Uniswap V4 pool|


### mintTokenizedPosition

Create a new position `tokenId` containing up to 4 legs.


```solidity
function mintTokenizedPosition(
    PoolKey calldata key,
    TokenId tokenId,
    uint128 positionSize,
    int24 slippageTickLimitLow,
    int24 slippageTickLimitHigh
) external nonReentrant returns (LeftRightUnsigned[4] memory, LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The Uniswap V4 pool key in which to `tokenId`|
|`tokenId`|`TokenId`|The tokenId of the minted position, which encodes information for up to 4 legs|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|
|`slippageTickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`slippageTickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of token0 and token1 collected as fees for each leg|
|`<none>`|`LeftRightSigned`|The net amount of token0 and token1 moved to/from the Uniswap V4 pool|


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

*When a position is minted or burnt in-the-money (ITM) we are *not* 100% token0 or 100% token1: we have a mix of both tokens.*

*The swapping for ITM options is needed because only one of the tokens are "borrowed" by a user to create the position.*


```solidity
function swapInAMM(PoolKey memory key, LeftRightSigned itmAmounts) internal returns (LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The Uniswap V4 pool key in which to perform the swap|
|`itmAmounts`|`LeftRightSigned`|How much to swap (i.e. how many tokens are ITM)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The token deltas swapped in the AMM|


### _createPositionInAMM

Create the position in the AMM defined by `tokenId`.

*Loops over each leg in the tokenId and calls _createLegInAMM for each, which does the mint/burn in the AMM.*


```solidity
function _createPositionInAMM(
    address account,
    PoolKey memory key,
    int24 tickLimitLow,
    int24 tickLimitHigh,
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
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|
|`positionSize`|`uint128`|The size of the option position|
|`tokenId`|`TokenId`|The option position|
|`isBurn`|`bool`|Whether a position is being minted (true) or burned (false)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collectedByLeg`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of token0 and token1 collected as fees for each leg|
|`totalMoved`|`LeftRightSigned`|The net amount of funds moved to/from Uniswap|


### _createLegInAMM

Create the position in the AMM for a specific leg in the tokenId.

*For the leg specified by the _leg input:*

*- mints any new liquidity in the AMM needed (via _mintLiquidity)*

*- burns any new liquidity in the AMM needed (via _burnLiquidity)*

*- tracks all amounts minted and burned*

*To burn a position, the opposing position is "created" through this function,
but we need to pass in a flag to indicate that so the removedLiquidity is updated.*


```solidity
function _createLegInAMM(
    address account,
    PoolKey memory key,
    TokenId tokenId,
    uint256 leg,
    LiquidityChunk liquidityChunk,
    bool isBurn
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
|`isBurn`|`bool`|Whether a position is being minted (true) or burned (false)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`moved`|`LeftRightSigned`|The net amount of funds moved to/from Uniswap|
|`collectedSingleLeg`|`LeftRightUnsigned`|LeftRight encoded words containing the amount of token0 and token1 collected as fees|


### _updateStoredPremia

Updates the premium accumulators for a chunk with the latest collected tokens.

*If the isLong flag is 0=short but the position was burnt, then this is closing a long position*

*so the amount of removed liquidity should decrease.*

*If the isLong flag is 1=long and the position is minted, then this is opening a long position*

*so the amount of removed liquidity should increase.*


```solidity
function _updateStoredPremia(
    bytes32 positionKey,
    LeftRightUnsigned currentLiquidity,
    LeftRightUnsigned collectedAmounts
) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionKey`|`bytes32`|A key representing a liquidity chunk/range in Uniswap|
|`currentLiquidity`|`LeftRightUnsigned`|The total amount of liquidity in the AMM for the specified chunk|
|`collectedAmounts`|`LeftRightUnsigned`|The amount of tokens (token0 and token1) collected from Uniswap|


### _getPremiaDeltas

Compute deltas for Owed/Gross premium given quantities of tokens collected from Uniswap.

*Returned accumulators are capped at the max value (`2^128 - 1`) for each token if they overflow.*


```solidity
function _getPremiaDeltas(LeftRightUnsigned currentLiquidity, LeftRightUnsigned collectedAmounts)
    private
    pure
    returns (LeftRightUnsigned deltaPremiumOwed, LeftRightUnsigned deltaPremiumGross);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentLiquidity`|`LeftRightUnsigned`|NetLiquidity (right) and removedLiquidity (left) at the start of the transaction|
|`collectedAmounts`|`LeftRightUnsigned`|Total amount of tokens (token0 and token1) collected from Uniswap|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`deltaPremiumOwed`|`LeftRightUnsigned`|The extra premium (per liquidity X64) to be added to the owed accumulator for token0 (right) and token1 (left)|
|`deltaPremiumGross`|`LeftRightUnsigned`|The extra premium (per liquidity X64) to be added to the gross accumulator for token0 (right) and token1 (left)|


### getAccountLiquidity

Return the liquidity associated with a given liquidity chunk/tokenType for a user on a Uniswap pool.


```solidity
function getAccountLiquidity(PoolId idV4, address owner, uint256 tokenType, int24 tickLower, int24 tickUpper)
    external
    view
    returns (LeftRightUnsigned accountLiquidities);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`idV4`|`PoolId`|The Uniswap V4 pool id to query|
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

*If an atTick parameter is provided that is different from `type(int24).max`, then it will update the premium up to the current
block at the provided atTick value. We do this because this may be called immediately after the Uniswap V4 pool has been touched,
so no need to read the feeGrowths from the Uniswap V4 pool.*


```solidity
function getAccountPremium(
    PoolId idV4,
    address owner,
    uint256 tokenType,
    int24 tickLower,
    int24 tickUpper,
    int24 atTick,
    uint256 isLong
) external view returns (uint128, uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`idV4`|`PoolId`|The Uniswap V4 pool id to query|
|`owner`|`address`|The address of the account that is queried|
|`tokenType`|`uint256`|The tokenType of the position|
|`tickLower`|`int24`|The lower end of the tick range for the position|
|`tickUpper`|`int24`|The upper end of the tick range for the position|
|`atTick`|`int24`|The current tick. Set `atTick < (type(int24).max = 8388608)` to get latest premium up to the current block|
|`isLong`|`uint256`|Whether the position is long (=1) or short (=0)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|The amount of premium (per liquidity X64) for token0 = `sum(feeGrowthLast0X128)` over every block where the position has been touched|
|`<none>`|`uint128`|The amount of premium (per liquidity X64) for token1 = `sum(feeGrowthLast0X128)` over every block where the position has been touched|


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

Returns the current enforced tick limits for a given Uniswap V4 `PoolId`.


```solidity
function getEnforcedTickLimits(PoolId idV4) external view returns (int24, int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`idV4`|`PoolId`|The Uniswap V4 pool identifier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The minimum enforced tick for chunks created in the pool corresponding to `idV4`|
|`<none>`|`int24`|The maximum enforced tick for chunks created in the pool corresponding to `idV4`|


### getPoolId

Returns the SFPM `poolId` for a given Uniswap V4 `PoolId`.


```solidity
function getPoolId(PoolId idV4) external view returns (uint64);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`idV4`|`PoolId`|The Uniswap V4 pool identifier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint64`|The unique pool identifier in the SFPM corresponding to `idV4`|


### getPoolId

Returns the SFPM `poolId` for a given Uniswap V4 `PoolKey`.


```solidity
function getPoolId(PoolKey calldata key) external view returns (uint64);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The Uniswap V4 pool key|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint64`|The unique pool identifier in the SFPM corresponding to `key`|


## Events
### PoolInitialized
Emitted when a Uniswap V4 pool is initialized in the SFPM.


```solidity
event PoolInitialized(PoolKey indexed poolKeyV4, uint64 poolId, int24 minEnforcedTick, int24 maxEnforcedTick);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKeyV4`|`PoolKey`|The Uniswap V4 pool key|
|`poolId`|`uint64`|The SFPM's pool identifier for the pool, including the 16-bit tick spacing and 48-bit pool pattern|
|`minEnforcedTick`|`int24`|The initial minimum enforced tick for the pool|
|`maxEnforcedTick`|`int24`|The initial maximum enforced tick for the pool|

### EnforcedTicksUpdated
Emitted when the enforced tick range is expanded for a given `poolId`.

*Will be emitted on any `expandEnforcedTickRange` call, even if the enforced ticks are not actually changed.*


```solidity
event EnforcedTicksUpdated(uint64 indexed poolId, int24 minEnforcedTick, int24 maxEnforcedTick);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The SFPM's pool identifier for the pool, including the 16-bit tick spacing and 48-bit pool pattern|
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

## Structs
### PoolIdData
Type for data associated with an initialized `poolId` in the SFPM.


```solidity
struct PoolIdData {
    uint128 maxLiquidityPerTick;
    uint64 poolId;
    int24 minEnforcedTick;
    int24 maxEnforcedTick;
    bool initialized;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`maxLiquidityPerTick`|`uint128`|The maximum liquidity that can reference any given tick in the Uniswap pool|
|`poolId`|`uint64`|The SFPM's pool identifier for the pool, including the 16-bit tick spacing and 48-bit pool pattern|
|`minEnforcedTick`|`int24`|The current minimum enforced tick for the pool|
|`maxEnforcedTick`|`int24`|The current maximum enforced tick for the pool|
|`initialized`|`bool`|Whether the pool has been initialized in the SFPM|

