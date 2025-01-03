# SafeTransferLib
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.1.x/contracts/libraries/SafeTransferLib.sol)

**Authors:**
Axicon Labs Limited, Modified from Solmate (https://github.com/Rari-Capital/solmate/blob/main/src/utils/SafeTransferLib.sol)

Safe ERC20 transfer library that gracefully handles missing return values.

*Caution! This library won't check that a token has code, responsibility is delegated to the caller.*


## Functions
### safeTransferETH

Safely transfers ETH to a specified address.


```solidity
function safeTransferETH(address to, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address to transfer ETH to|
|`amount`|`uint256`|The amount of ETH to transfer|


### safeTransferFrom

Safely transfers ERC20 tokens from one address to another.


```solidity
function safeTransferFrom(address token, address from, address to, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the ERC20 token|
|`from`|`address`|The address to transfer tokens from|
|`to`|`address`|The address to transfer tokens to|
|`amount`|`uint256`|The amount of tokens to transfer|


### safeTransfer

Safely transfers ERC20 tokens to a specified address.


```solidity
function safeTransfer(address token, address to, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the ERC20 token|
|`to`|`address`|The address to transfer tokens to|
|`amount`|`uint256`|The amount of tokens to transfer|


