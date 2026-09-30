# InteractionHelper

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/libraries/InteractionHelper.sol)

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
    CollateralTrackerV2 ct0,
    CollateralTrackerV2 ct1,
    address poolManager
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sfpm`|`ISemiFungiblePositionManager`|The SemiFungiblePositionManager being approved for both token0 and token1|
|`ct0`|`CollateralTrackerV2`|The CollateralTracker (token0) being approved for token0|
|`ct1`|`CollateralTrackerV2`|The CollateralTracker (token1) being approved for token1|
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

Settles haircut premia and burns collateral shares during liquidation when protocol loss occurs.

Updates settled token accumulators for haircut long legs and burns collateral shares equal to the total haircut amount via settleBurn().


```solidity
function settleAmounts(
    address liquidatee,
    TokenId[] memory positionIdList,
    LeftRightUnsigned haircutTotal,
    LeftRightSigned[4][] memory haircutPerLeg,
    LeftRightSigned[4][] memory premiasByLeg,
    CollateralTrackerV2 ct0,
    CollateralTrackerV2 ct1,
    mapping(bytes32 chunkKey => LeftRightUnsigned settledTokens) storage settledTokens
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidatee`|`address`|The address of the user being liquidated whose premia is being haircut|
|`positionIdList`|`TokenId[]`|The list of all positions held by the liquidatee being closed|
|`haircutTotal`|`LeftRightUnsigned`|The total premium clawed back from the liquidatee across all positions (rightSlot: token0, leftSlot: token1)|
|`haircutPerLeg`|`LeftRightSigned[4][]`|The haircut amount for each leg of each position in the positionIdList|
|`premiasByLeg`|`LeftRightSigned[4][]`|The original premium owed to (positive) or paid by (negative) the liquidatee for each leg before haircut|
|`ct0`|`CollateralTrackerV2`|The CollateralTracker for token0, used to burn shares corresponding to token0 haircut|
|`ct1`|`CollateralTrackerV2`|The CollateralTracker for token1, used to burn shares corresponding to token1 haircut|
|`settledTokens`|`mapping(bytes32 chunkKey => LeftRightUnsigned settledTokens)`|Storage mapping tracking accumulated premia for each liquidity chunk (indexed by chunk key)|
