---
sidebar_label: "ISemiFungiblePositionManager"
title: "ISemiFungiblePositionManager (V2)"
---
# ISemiFungiblePositionManager (V2)

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/interfaces/ISemiFungiblePositionManager.sol)


## Functions
### mintTokenizedPosition

Create a new position `tokenId` containing up to 4 legs.

Both V3 and V4 implementations use `bytes poolKey` to abstract the underlying pool.


```solidity
function mintTokenizedPosition(
    bytes calldata poolKey,
    TokenId tokenId,
    uint128 positionSize,
    int24 slippageTickLimitLow,
    int24 slippageTickLimitHigh
) external returns (LeftRightUnsigned[4] memory collectedByLeg, LeftRightSigned totalMoved, int24 finalTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`bytes`|The ABI-encoded pool key (V3: address, V4: PoolKey)|
|`tokenId`|`TokenId`|The tokenId of the minted position, which encodes information for up to 4 legs|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|
|`slippageTickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`slippageTickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collectedByLeg`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of currency0 and currency1 collected as fees for each leg|
|`totalMoved`|`LeftRightSigned`|The net amount of currency0 and currency1 moved to/from the Uniswap V4 pool|
|`finalTick`|`int24`|The tick at the end of the mint/burn operation|


### burnTokenizedPosition

Burn a new position containing up to 4 legs wrapped in a ERC1155 token.

Auto-collect all accumulated fees.


```solidity
function burnTokenizedPosition(
    bytes calldata poolKey,
    TokenId tokenId,
    uint128 positionSize,
    int24 slippageTickLimitLow,
    int24 slippageTickLimitHigh
) external returns (LeftRightUnsigned[4] memory collectedByLeg, LeftRightSigned totalMoved, int24 finalTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`bytes`|The ABI-encoded pool key in which to burn `tokenId` (V3: Uniswap V3 pool address, V4: Uniswap V4 `PoolKey`)|
|`tokenId`|`TokenId`|The tokenId of the minted position, which encodes information about up to 4 legs|
|`positionSize`|`uint128`|The number of contracts minted, expressed in terms of the asset|
|`slippageTickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`slippageTickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collectedByLeg`|`LeftRightUnsigned[4]`|An array of LeftRight encoded words containing the amount of currency0 and currency1 collected as fees for each leg|
|`totalMoved`|`LeftRightSigned`|The net amount of currency0 and currency1 moved to/from the Uniswap V4 pool|
|`finalTick`|`int24`|The tick at the end of the mint/burn operation|


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
|`poolKey`|`bytes`|The ABI-encoded pool key (V3: Uniswap V3 pool address, V4: Uniswap V4 `PoolKey`)|
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
) external view returns (uint128 premium0, uint128 premium1);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`bytes`|The ABI-encoded pool key (V3: Uniswap V3 pool address, V4: Uniswap V4 `PoolKey`)|
|`owner`|`address`|The address of the account that is queried|
|`tokenType`|`uint256`|The tokenType of the position|
|`tickLower`|`int24`|The lower end of the tick range for the position|
|`tickUpper`|`int24`|The upper end of the tick range for the position|
|`atTick`|`int24`|The current tick. Set `atTick < (type(int24).max = 8388607)` to get latest premium up to the current block|
|`isLong`|`uint256`|Whether the position is long (=1) or short (=0)|
|`vegoid`|`uint256`|The vegoid of the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`premium0`|`uint128`|The amount of premium (per liquidity X64) for currency0 = `sum(feeGrowthLast0X128)` over every block where the position has been touched|
|`premium1`|`uint128`|The amount of premium (per liquidity X64) for currency1 = `sum(feeGrowthLast0X128)` over every block where the position has been touched|


### getPoolId

Returns the `poolId` for a given Uniswap pool.


```solidity
function getPoolId(bytes memory id, uint8 vegoid) external view returns (uint64 poolId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id`|`bytes`|The PoolId of the Uniswap V4 Pool|
|`vegoid`|`uint8`|The vegoid of the pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The unique pool identifier corresponding to a idV4|


### getEnforcedTickLimits

Returns the enforced tick limits for a given pool.


```solidity
function getEnforcedTickLimits(uint64 poolId) external view returns (int24 minTick, int24 maxTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`uint64`|The poolId to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`minTick`|`int24`|The minimum enforced tick|
|`maxTick`|`int24`|The maximum enforced tick|


### getCurrentTick

Returns the current tick of a given Uniswap V4 pool


```solidity
function getCurrentTick(bytes memory poolKey) external view returns (int24 currentTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`bytes`|The ABI-encoded pool key (V3: Uniswap V3 pool address, V4: Uniswap V4 `PoolKey`)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick of the Uniswap pool|


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


### safeTransferFrom

All ERC1155 transfers are disabled.


```solidity
function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
```

### safeBatchTransferFrom

All ERC1155 transfers are disabled.


```solidity
function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] calldata ids,
    uint256[] calldata amounts,
    bytes calldata data
) external;
```

## Events
### TokenizedPositionBurnt
Emitted when a position is destroyed/burned.


```solidity
event TokenizedPositionBurnt(address indexed recipient, TokenId indexed tokenId, uint128 positionSize);
```

### TokenizedPositionMinted
Emitted when a position is created/minted.


```solidity
event TokenizedPositionMinted(address indexed caller, TokenId indexed tokenId, uint128 positionSize);
```
