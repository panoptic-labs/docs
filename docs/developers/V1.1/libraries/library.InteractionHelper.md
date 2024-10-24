# InteractionHelper
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.1.x/contracts/libraries/InteractionHelper.sol)

**Author:**
Axicon Labs Limited

Used to delegate logic with multiple external calls.

*Generally employed when there is a need to save or reuse bytecode size
on a core contract.*


## Functions
### doApprovals

Function that performs approvals on behalf of the PanopticPool for CollateralTracker and SemiFungiblePositionManager.


```solidity
function doApprovals(
    SemiFungiblePositionManager sfpm,
    CollateralTracker ct0,
    CollateralTracker ct1,
    address currency0,
    address currency1
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sfpm`|`SemiFungiblePositionManager`|The SemiFungiblePositionManager being approved for both currency0 and currency1|
|`ct0`|`CollateralTracker`|The CollateralTracker (currency0) being approved for currency0|
|`ct1`|`CollateralTracker`|The CollateralTracker (currency1) being approved for currency1|
|`currency0`|`address`|The currency0 (in Uniswap) being approved for|
|`currency1`|`address`|The currency1 (in Uniswap) being approved for|


### computeName

Computes the name of a CollateralTracker based on the token composition and fee of the underlying Uniswap Pool.

*Some tokens do not have proper symbols so error handling is required - this logic takes up significant bytecode size, which is why it is in a library.*


```solidity
function computeName(address currency0, address currency1, bool isToken0, uint24 fee, string memory prefix)
    external
    view
    returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currency0`|`address`|The currency0 of the Uniswap Pool|
|`currency1`|`address`|The currency1 of the Uniswap Pool|
|`isToken0`|`bool`|Whether the collateral token computing the name is for currency0 or currency1|
|`fee`|`uint24`|The fee of the Uniswap pool in hundredths of basis points|
|`prefix`|`string`|A constant string appended to the start of the token name|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The complete name of the collateral token calling this function|


### computeSymbol

Returns collateral token symbol as `prefix` + `underlying asset symbol`.


```solidity
function computeSymbol(address token, string memory prefix) external view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the underlying asset used to compute the symbol (`address(0)` = native asset)|
|`prefix`|`string`|A constant string prepended to the symbol of the underlying asset to create the final symbol|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The symbol of the collateral token|


### computeDecimals

Returns decimals of underlying asset (0 if not present).


```solidity
function computeDecimals(address token) external view returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the underlying asset used to compute the decimals (`address(0)` = native asset)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The decimals of the token|


