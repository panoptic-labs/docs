# EfficientHash
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/libraries/EfficientHash.sol)

**Title:**
Efficient Keccak256 Library

Provides gas-efficient keccak256 hashing using inline assembly


## Functions
### efficientKeccak256

Efficiently compute keccak256 hash for position key (address, address, uint256, int24, int24)


```solidity
function efficientKeccak256(address univ3pool, address owner, uint256 tokenType, int24 tickLower, int24 tickUpper)
    internal
    pure
    returns (bytes32 hash);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`address`|The Uniswap V3 pool address (20 bytes)|
|`owner`|`address`|The owner address (20 bytes)|
|`tokenType`|`uint256`|The token type (32 bytes)|
|`tickLower`|`int24`|The lower tick (3 bytes when packed)|
|`tickUpper`|`int24`|The upper tick (3 bytes when packed)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`hash`|`bytes32`|The keccak256 hash of the packed data|


### efficientKeccak256

Efficiently compute keccak256 hash for chunk key (int24, int24, uint256)


```solidity
function efficientKeccak256(int24 strike, int24 width, uint256 tokenType) internal pure returns (bytes32 hash);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`strike`|`int24`|The strike tick (3 bytes when packed)|
|`width`|`int24`|The width (3 bytes when packed)|
|`tokenType`|`uint256`|The token type (32 bytes)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`hash`|`bytes32`|The keccak256 hash of the packed data|


### efficientKeccak256

Efficiently compute keccak256 hash for a uint256 array


```solidity
function efficientKeccak256(uint256[] memory data) internal pure returns (bytes32 hash);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`uint256[]`|The uint256 array to hash|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`hash`|`bytes32`|The keccak256 hash of the packed data|


### efficientKeccak256

Efficiently compute keccak256 hash for bytes memory


```solidity
function efficientKeccak256(bytes memory data) internal pure returns (bytes32 hash);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes`|The bytes to hash|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`hash`|`bytes32`|The keccak256 hash of the data|


