# MetadataStore
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/base/MetadataStore.sol)

**Title:**
MetadataStore: Cost-effective structured data storage.

**Author:**
Axicon Labs Limited

Base contract that can store two-deep objects with large value sizes at deployment time.


## State Variables
### metadata
Stores metadata pointers for future retrieval.

Can hold 2-deep object structures.

Examples include `{"A": ["B", "C"]}` and `{"A": {"B": "C"}}`.

The first and second keys can be up-to-32-char strings (or array indices).

Values are pointers to a certain section of contract code: [address, start, length].

The maximum size of a value is theoretically unlimited, but depends on the effective contract size limit for a given chain.


```solidity
mapping(bytes32 property => mapping(uint256 index => Pointer pointer)) internal metadata
```


## Functions
### constructor

Stores provided metadata pointers for future retrieval.


```solidity
constructor(bytes32[] memory properties, uint256[][] memory indices, Pointer[][] memory pointers) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`properties`|`bytes32[]`|An array of identifiers for different categories of metadata|
|`indices`|`uint256[][]`|A nested array of keys for K-V metadata pairs for each property in `properties`|
|`pointers`|`Pointer[][]`|Contains pointers to the metadata values stored in contract data slices for each index in `indices`|


