# InteractionHelper
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/libraries/InteractionHelper.sol)

**Title:**
InteractionHelper - contains helper functions for external interactions such as approvals.

**Author:**
Axicon Labs Limited

Used to delegate logic with multiple external calls.

Generally employed when there is a need to save or reuse bytecode size
on a core contract.


## Functions
### doApprovals

Function that performs approvals on behalf of the PanopticPool for CollateralTracker and SemiFungiblePositionManager.


```solidity
function doApprovals(
    ISemiFungiblePositionManager sfpm,
    CollateralTracker ct0,
    CollateralTracker ct1,
    address token0,
    address token1,
    address poolManager
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sfpm`|`ISemiFungiblePositionManager`|The SemiFungiblePositionManager being approved for both token0 and token1|
|`ct0`|`CollateralTracker`|The CollateralTracker (token0) being approved for token0|
|`ct1`|`CollateralTracker`|The CollateralTracker (token1) being approved for token1|
|`token0`|`address`|The token0 (in Uniswap) being approved for|
|`token1`|`address`|The token1 (in Uniswap) being approved for|
|`poolManager`|`address`|The Uniswap V4 pool manager address (zero address if using V3)|


### computeName

Computes the name of a CollateralTracker based on the token composition and fee of the underlying Uniswap Pool.

Some tokens do not have proper symbols so error handling is required - this logic takes up significant bytecode size, which is why it is in a library.


```solidity
function computeName(address token0, address token1, bool isToken0, uint24 fee, string memory prefix)
    external
    view
    returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token0`|`address`|The token0 of the Uniswap Pool|
|`token1`|`address`|The token1 of the Uniswap Pool|
|`isToken0`|`bool`|Whether the collateral token computing the name is for token0 or token1|
|`fee`|`uint24`|The fee of the Uniswap pool in hundredths of basis points|
|`prefix`|`string`|A constant string appended to the start of the token name|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The complete name of the collateral token calling this function|


### computeSymbol

Returns collateral token symbol as `prefix` + `underlying token symbol`.


```solidity
function computeSymbol(address token, string memory prefix) external view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the underlying token used to compute the symbol|
|`prefix`|`string`|A constant string prepended to the symbol of the underlying token to create the final symbol|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The symbol of the collateral token|


### computeDecimals

Returns decimals of underlying token (0 if not present).


```solidity
function computeDecimals(address token) external view returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the underlying token used to compute the decimals|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The decimals of the token|


### settleAmounts


```solidity
function settleAmounts(
    address liquidatee,
    TokenId[] memory positionIdList,
    LeftRightUnsigned haircutTotal,
    LeftRightSigned[4][] memory haircutPerLeg,
    LeftRightSigned[4][] memory premiasByLeg,
    CollateralTracker ct0,
    CollateralTracker ct1,
    mapping(bytes32 chunkKey => LeftRightUnsigned settledTokens) storage settledTokens
) external;
```

