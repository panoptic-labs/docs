# Multicall
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.1.x/contracts/base/Multicall.sol)

**Author:**
Axicon Labs Limited

Enables calling multiple methods in a single call to the contract.

*Helpful for performing batch operations such as an "emergency exit", or simply creating advanced positions.*


## Functions
### multicall

Performs multiple calls on the inheritor in a single transaction, and returns the data from each call.


```solidity
function multicall(bytes[] calldata data) public returns (bytes[] memory results);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes[]`|The calldata for each call|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`results`|`bytes[]`|The data returned by each call|


