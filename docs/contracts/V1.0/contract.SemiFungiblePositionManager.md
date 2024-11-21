---
sidebar_position: 1
---
# SemiFungiblePositionManager
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.0.x/contracts/SemiFungiblePositionManager.sol)

**Inherits:**
[ERC1155](/docs/contracts/V1.0/tokens/abstract.ERC1155), [Multicall](/docs/contracts/V1.0/base/abstract.Multicall), TransientReentrancyGuard

**Author:**
Axicon Labs Limited

Wraps Uniswap V3 positions with up to 4 legs behind an ERC1155 token.

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


### FACTORY
Canonical Uniswap V3 Factory address.

*Used to verify callbacks and initialize pools.*


```solidity
IUniswapV3Factory internal immutable FACTORY;
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


### s_AddrToPoolIdData
Retrieve the corresponding poolId for a given Uniswap V3 pool address.

*pool address => pool id + 2 ** 255 (initialization bit for `poolId == 0`, set if the pool exists)*


```solidity
mapping(address univ3pool => uint256 poolIdData) internal s_AddrToPoolIdData;
```


### s_poolIdToPoolData
Retrieve the PoolData struct corresponding to a given poolId.


```solidity
mapping(uint64 poolId => PoolData poolData) internal s_poolIdToPoolData;
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


### s_accountFeesBase
Per-liquidity accumulator for the fees collected on an account for a given chunk.

*Base fees are stored as `int128((feeGrowthInsideLastX128 * liquidity) / 2**128)`, which allows us to store the accumulated fees as int128 instead of uint256.*

*Right slot: int128 token0 base fees, Left slot: int128 token1 base fees.*

*feesBase represents the baseline fees collected by the position last time it was updated - this is recalculated every time the position is collected from with the new value.*


```solidity
mapping(bytes32 positionKey => LeftRightSigned baseFees0And1) internal s_accountFeesBase;
```


## Functions
### constructor

Set the canonical Uniswap V3 Factory address.


```solidity
constructor(IUniswapV3Factory _factory, uint256 _minEnforcedTickFillCost, uint256 _supplyMultiplierTickFill);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_factory`|`IUniswapV3Factory`|The canonical Uniswap V3 Factory address|
|`_minEnforcedTickFillCost`|`uint256`|The minimum amount of tokens it should require to fill `maxLiquidityPerTick` at the minimum and maximum enforced ticks|
|`_supplyMultiplierTickFill`|`uint256`|The multiplier, in basis points, to apply to the token supply and set as the minimum enforced tick fill cost if greater than `MIN_ENFORCED_TICKFILL_COST`|


### initializeAMMPool

Initialize a Uniswap V3 pool in the SFPM.

*Revert if already initialized.*


```solidity
function initializeAMMPool(address token0, address token1, uint24 fee) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token0`|`address`|The contract address of token0 of the pool|
|`token1`|`address`|The contract address of token1 of the pool|
|`fee`|`uint24`|The fee level of the of the underlying Uniswap V3 pool, denominated in hundredths of bips|


### expandEnforcedTickRange

Recomputes and decreases `minEnforcedTick` and/or increases `maxEnforcedTick` for a given `poolId` if certain conditions are met.

*This function will only have an effect if both conditions are met:
- The token supply for one of the tokens was greater than MIN_ENFORCED_TICKFILL_COST at the last `initializeAMMPool` or `expandEnforcedTickRangeForPool` call for `poolId`
- The token supply for one of the tokens meeting the first condition has *decreased* significantly since the last call*

*This function *cannot* decrease the absolute value of either enforced tick, i.e., it can only widen the range of possible ticks.*

*The purpose of this function is to prevent pools created while a large amount of one of the tokens was flash-minted from being stuck in a narrow tick range.*


```solidity
function expandEnforcedTickRange(uint64 poolId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The poolId on which to expand the enforced tick range|


### uniswapV3MintCallback

Called after minting liquidity to a position.

*Pays the pool tokens owed for the minted liquidity from the payer (always the caller).*


```solidity
function uniswapV3MintCallback(uint256 amount0Owed, uint256 amount1Owed, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount0Owed`|`uint256`|The amount of token0 due to the pool for the minted liquidity|
|`amount1Owed`|`uint256`|The amount of token1 due to the pool for the minted liquidity|
|`data`|`bytes`|Contains the payer address and the pool features required to validate the callback|


### uniswapV3SwapCallback

Called by the pool after executing a swap during an ITM option mint/burn.

*Pays the pool tokens owed for the swap from the payer (always the caller).*


```solidity
function uniswapV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount0Delta`|`int256`|The amount of token0 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token0 to the pool|
|`amount1Delta`|`int256`|The amount of token1 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token1 to the pool|
|`data`|`bytes`|Contains the payer address and the pool features required to validate the callback|


### burnTokenizedPosition

Burn a new position containing up to 4 legs wrapped in a ERC1155 token.

*Auto-collect all accumulated fees.*


```solidity
function burnTokenizedPosition(
    TokenId tokenId,
    uint128 positionSize,
    int24 slippageTickLimitLow,
    int24 slippageTickLimitHigh
) external nonReentrant returns (LeftRightUnsigned[4] memory, LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The tokenId of the minted position, which encodes information about up to 4 legs|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|
|`slippageTickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`slippageTickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of token0 and token1 collected as fees for each leg|
|`<none>`|`LeftRightSigned`|The net amount of token0 and token1 moved to/from the Uniswap V3 pool|


### mintTokenizedPosition

Create a new position `tokenId` containing up to 4 legs.


```solidity
function mintTokenizedPosition(
    TokenId tokenId,
    uint128 positionSize,
    int24 slippageTickLimitLow,
    int24 slippageTickLimitHigh
) external nonReentrant returns (LeftRightUnsigned[4] memory, LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The tokenId of the minted position, which encodes information for up to 4 legs|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|
|`slippageTickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`slippageTickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of token0 and token1 collected as fees for each leg|
|`<none>`|`LeftRightSigned`|The net amount of token0 and token1 moved to/from the Uniswap V3 pool|


### safeTransferFrom

Transfer a single token from one user to another.

*Supports token approvals.*


```solidity
function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data)
    public
    override
    nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The user to transfer tokens from|
|`to`|`address`|The user to transfer tokens to|
|`id`|`uint256`|The ERC1155 token id to transfer|
|`amount`|`uint256`|The amount of tokens to transfer|
|`data`|`bytes`|Optional data to include in the receive hook|


### safeBatchTransferFrom

Transfer multiple tokens from one user to another.

*Supports token approvals.*

*`ids` and `amounts` must be of equal length.*


```solidity
function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] calldata ids,
    uint256[] calldata amounts,
    bytes calldata data
) public override nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The user to transfer tokens from|
|`to`|`address`|The user to transfer tokens to|
|`ids`|`uint256[]`|The ERC1155 token ids to transfer|
|`amounts`|`uint256[]`|The amounts of tokens to transfer|
|`data`|`bytes`|Optional data to include in the receive hook|


### registerTokenTransfer

Update user position data following a token transfer.

*All liquidity for `from` in the chunk for each leg of `id` must be transferred.*

*`from` must not have long liquidity in any of the chunks being transferred.*

*`to` must not have (long or short) liquidity in any of the chunks being transferred.*


```solidity
function registerTokenTransfer(address from, address to, TokenId id, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The address of the sender|
|`to`|`address`|The address of the recipient|
|`id`|`TokenId`|The tokenId being transferred|
|`amount`|`uint256`|The amount of the token being transferred|


### swapInAMM

Called to perform an ITM swap in the Uniswap pool to resolve any non-tokenType token deltas.

*When a position is minted or burnt in-the-money (ITM) we are *not* 100% token0 or 100% token1: we have a mix of both tokens.*

*The swapping for ITM options is needed because only one of the tokens are "borrowed" by a user to create the position.*


```solidity
function swapInAMM(IUniswapV3Pool univ3pool, LeftRightSigned itmAmounts)
    internal
    returns (LeftRightSigned totalSwapped);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap pool in which to swap.|
|`itmAmounts`|`LeftRightSigned`|How much to swap (i.e. how many tokens are ITM)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`totalSwapped`|`LeftRightSigned`|The token deltas swapped in the AMM|


### _createPositionInAMM

Create the position in the AMM defined by `tokenId`.

*Loops over each leg in the tokenId and calls _createLegInAMM for each, which does the mint/burn in the AMM.*


```solidity
function _createPositionInAMM(
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
    IUniswapV3Pool univ3pool,
    TokenId tokenId,
    uint256 leg,
    LiquidityChunk liquidityChunk,
    bool isBurn
) internal returns (LeftRightSigned moved, LeftRightUnsigned collectedSingleLeg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap pool|
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


### _getFeesBase

Compute an up-to-date feeGrowth value without a poke.

*Stored fees base is rounded up and the current fees base is rounded down to minimize the amount of fees collected (Δfeesbase) in favor of the protocol.*


```solidity
function _getFeesBase(IUniswapV3Pool univ3pool, uint128 liquidity, LiquidityChunk liquidityChunk, bool roundUp)
    private
    view
    returns (LeftRightSigned feesBase);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap pool|
|`liquidity`|`uint128`|The total amount of liquidity in the AMM for the specific position|
|`liquidityChunk`|`LiquidityChunk`|The liquidity chunk in Uniswap to compute the feesBase for|
|`roundUp`|`bool`|If true, round up the feesBase, otherwise round down|


### _mintLiquidity

Mint a chunk of liquidity (`liquidityChunk`) in the Uniswap V3 pool; return the amount moved.


```solidity
function _mintLiquidity(LiquidityChunk liquidityChunk, IUniswapV3Pool univ3pool)
    internal
    returns (LeftRightSigned movedAmounts);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidityChunk`|`LiquidityChunk`|The liquidity chunk in Uniswap to mint|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap V3 pool to mint liquidity in/to|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`movedAmounts`|`LeftRightSigned`|How many tokens were moved from `msg.sender` to Uniswap|


### _burnLiquidity

Burn a chunk of liquidity (`liquidityChunk`) in the Uniswap V3 pool and send to msg.sender; return the amount moved.


```solidity
function _burnLiquidity(LiquidityChunk liquidityChunk, IUniswapV3Pool univ3pool)
    internal
    returns (LeftRightSigned movedAmounts);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidityChunk`|`LiquidityChunk`|The liquidity chunk in Uniswap to burn|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap V3 pool to burn liquidity in/from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`movedAmounts`|`LeftRightSigned`|How many tokens were moved from Uniswap to `msg.sender`|


### _collectAndWritePositionData

Helper to collect amounts between msg.sender and Uniswap and also to update the Uniswap fees collected to date from the AMM.


```solidity
function _collectAndWritePositionData(
    LiquidityChunk liquidityChunk,
    IUniswapV3Pool univ3pool,
    LeftRightUnsigned currentLiquidity,
    bytes32 positionKey,
    LeftRightSigned movedInLeg,
    uint256 isLong
) internal returns (LeftRightUnsigned collectedChunk);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidityChunk`|`LiquidityChunk`|The liquidity chunk in Uniswap to collect from|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap pool where the position is deployed|
|`currentLiquidity`|`LeftRightUnsigned`|The existing liquidity msg.sender owns in the AMM for this chunk before the SFPM was called|
|`positionKey`|`bytes32`|The unique key to identify the liquidity chunk/tokenType pairing in this Uniswap pool|
|`movedInLeg`|`LeftRightSigned`|How much liquidity has been moved between msg.sender and Uniswap before this function call|
|`isLong`|`uint256`|Whether the leg in question is long (=1) or short (=0)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collectedChunk`|`LeftRightUnsigned`|The amount of tokens collected from Uniswap|


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
function getAccountLiquidity(address univ3pool, address owner, uint256 tokenType, int24 tickLower, int24 tickUpper)
    external
    view
    returns (LeftRightUnsigned accountLiquidities);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`address`|The address of the Uniswap V3 Pool|
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
block at the provided atTick value. We do this because this may be called immediately after the Uniswap V3 pool has been touched,
so no need to read the feeGrowths from the Uniswap V3 pool.*


```solidity
function getAccountPremium(
    address univ3pool,
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
|`univ3pool`|`address`|The address of the Uniswap V3 Pool|
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


### getAccountFeesBase

Return the feesBase associated with a given liquidity chunk.


```solidity
function getAccountFeesBase(address univ3pool, address owner, uint256 tokenType, int24 tickLower, int24 tickUpper)
    external
    view
    returns (int128 feesBase0, int128 feesBase1);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`address`|The address of the Uniswap V3 Pool|
|`owner`|`address`|The address of the account that is queried|
|`tokenType`|`uint256`|The tokenType of the position (the token it started as)|
|`tickLower`|`int24`|The lower end of the tick range for the position|
|`tickUpper`|`int24`|The upper end of the tick range for the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feesBase0`|`int128`|The feesBase of the position for token0|
|`feesBase1`|`int128`|The feesBase of the position for token1|


### getUniswapV3PoolFromId

Returns the Uniswap pool for a given `poolId`.


```solidity
function getUniswapV3PoolFromId(uint64 poolId) external view returns (IUniswapV3Pool uniswapV3Pool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The unique pool identifier for a Uniswap V3 pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`uniswapV3Pool`|`IUniswapV3Pool`|The Uniswap pool corresponding to `poolId`|


### getPoolId

Returns the `poolId` for a given Uniswap pool.


```solidity
function getPoolId(address univ3pool) external view returns (uint64 poolId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`address`|The address of the Uniswap Pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The unique pool identifier corresponding to `univ3pool`|


## Events
### PoolInitialized
Emitted when a UniswapV3Pool is initialized in the SFPM.


```solidity
event PoolInitialized(address indexed uniswapPool, uint64 poolId, int24 minEnforcedTick, int24 maxEnforcedTick);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`uniswapPool`|`address`|Address of the underlying Uniswap V3 pool|
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
### PoolData
Type for data associated with a given Uniswap `pool`.


```solidity
struct PoolData {
    IUniswapV3Pool pool;
    int24 minEnforcedTick;
    int24 maxEnforcedTick;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`IUniswapV3Pool`|A canonical Uniswap V3 pool initialized in the SFPM|
|`minEnforcedTick`|`int24`|The current minimum enforced tick for the pool in the SFPM|
|`maxEnforcedTick`|`int24`|The current maximum enforced tick for the pool in the SFPM|

