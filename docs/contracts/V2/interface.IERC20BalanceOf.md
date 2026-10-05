---
sidebar_label: "IERC20BalanceOf"
title: "IERC20BalanceOf (V2)"
---
# IERC20BalanceOf (V2)

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/PanopticGuardian.sol)

Minimal ERC20 balance query interface.


## Functions
### balanceOf

Returns an account's token balance.


```solidity
function balanceOf(address account) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account to query.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The account's token balance.|
