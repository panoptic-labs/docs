---
sidebar_label: "Create2Lib"
title: "Create2Lib (V2)"
---
# Create2Lib (V2)

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/Builder.sol)


## Functions
### deploy

Deploys a contract using CREATE2 opcode for deterministic addresses

Reverts with "CREATE2 failed" if deployment returns zero address


```solidity
function deploy(uint256 value, bytes32 salt, bytes memory code) internal returns (address addr);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`value`|`uint256`|The amount of wei to send to the new contract|
|`salt`|`bytes32`|The CREATE2 salt for deterministic address generation|
|`code`|`bytes`|The initialization bytecode of the contract to deploy|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`addr`|`address`|The address of the deployed contract|
