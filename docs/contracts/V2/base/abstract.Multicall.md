---
sidebar_label: "Multicall"
title: "Multicall (V2)"
---
# Multicall (V2)

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/base/Multicall.sol)

**Title:**
Multicall

**Author:**
Axicon Labs Limited

Enables calling multiple methods in a single call to the contract.

Helpful for performing batch operations such as an "emergency exit", or simply creating advanced positions.


## Functions
### multicall

Performs multiple calls on the inheritor in a single transaction, and returns the data from each call.


```solidity
function multicall(bytes[] calldata data) public payable returns (bytes[] memory results);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes[]`|The calldata for each call|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`results`|`bytes[]`|The data returned by each call|
