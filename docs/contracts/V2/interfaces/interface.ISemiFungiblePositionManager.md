# ISemiFungiblePositionManager
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/interfaces/ISemiFungiblePositionManager.sol)


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
|`tokenId`|`TokenId`|The tokenId of the minted position|
|`positionSize`|`uint128`|The number of contracts minted|
|`slippageTickLimitLow`|`int24`|Lower price bound|
|`slippageTickLimitHigh`|`int24`|Upper price bound|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collectedByLeg`|`LeftRightUnsigned[4]`|Fees collected per leg|
|`totalMoved`|`LeftRightSigned`|Net amount moved to/from AMM|
|`finalTick`|`int24`|The tick at the end of the mint/burn operation|


### burnTokenizedPosition

Burn an existing position containing up to 4 legs.


```solidity
function burnTokenizedPosition(
    bytes calldata poolKey,
    TokenId tokenId,
    uint128 positionSize,
    int24 slippageTickLimitLow,
    int24 slippageTickLimitHigh
) external returns (LeftRightUnsigned[4] memory collectedByLeg, LeftRightSigned totalMoved, int24 finalTick);
```

### getAccountLiquidity


```solidity
function getAccountLiquidity(
    bytes calldata poolKey,
    address owner,
    uint256 tokenType,
    int24 tickLower,
    int24 tickUpper
) external view returns (LeftRightUnsigned accountLiquidities);
```

### getAccountPremium


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

### getPoolId


```solidity
function getPoolId(bytes memory id, uint8 vegoid) external view returns (uint64 poolId);
```

### getEnforcedTickLimits


```solidity
function getEnforcedTickLimits(uint64 poolId) external view returns (int24, int24);
```

### getCurrentTick


```solidity
function getCurrentTick(bytes memory poolKey) external view returns (int24 currentTick);
```

### expandEnforcedTickRange


```solidity
function expandEnforcedTickRange(uint64 poolId) external;
```

### safeTransferFrom


```solidity
function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
```

### safeBatchTransferFrom


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

