# FactoryNFT
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/base/FactoryNFT.sol)

**Inherits:**
[MetadataStore](/contracts/base/contract.MetadataStore.md), ERC721

Constructs dynamic SVG art and metadata for Panoptic Factory NFTs from a set of building blocks.

*Pointers to metadata are provided at deployment time.*


## Functions
### constructor

Initialize metadata pointers and token name/symbol.


```solidity
constructor(bytes32[] memory properties, uint256[][] memory indices, Pointer[][] memory pointers)
    MetadataStore(properties, indices, pointers)
    ERC721("Panoptic Factory Deployer NFTs", "PANOPTIC-NFT");
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`properties`|`bytes32[]`|An array of identifiers for different categories of metadata|
|`indices`|`uint256[][]`|A nested array of keys for K-V metadata pairs for each property in `properties`|
|`pointers`|`Pointer[][]`|Contains pointers to the metadata values stored in contract data slices for each index in `indices`|


### tokenURI

Returns the metadata URI for a given `tokenId`.

*The metadata is dynamically generated from the characteristics of the `PanopticPool` encoded in `tokenId`.*

*The first 160 bits of `tokenId` are the address of a Panoptic Pool.*


```solidity
function tokenURI(uint256 tokenId) public view override returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|The token ID (encoded pool address) to get the metadata URI for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The metadata URI for the token ID|


### constructMetadata

Returns the metadata URI for a given set of characteristics.


```solidity
function constructMetadata(address panopticPool, string memory symbol0, string memory symbol1, uint256 fee)
    public
    view
    returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`panopticPool`|`address`|The displayed address used to determine the rarity (leading zeros) and lastCharVal (last 4 bits)|
|`symbol0`|`string`|The symbol of `token0` in the Uniswap pool|
|`symbol1`|`string`|The symbol of `token1` in the Uniswap pool|
|`fee`|`uint256`|The fee of the Uniswap pool (in hundredths of basis points)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The metadata URI for the given characteristics|


### generateSVGArt

Generate the artwork component of the SVG for a given rarity and last character value.


```solidity
function generateSVGArt(uint256 lastCharVal, uint256 rarity) internal view returns (string memory svgOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lastCharVal`|`uint256`|The last character of the pool address|
|`rarity`|`uint256`|The rarity of the NFT|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svgOut`|`string`|The SVG artwork for the NFT|


### generateSVGInfo

Fill in the pool/rarity specific text fields on the SVG artwork.


```solidity
function generateSVGInfo(
    string memory svgIn,
    address panopticPool,
    uint256 rarity,
    string memory symbol0,
    string memory symbol1
) internal view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`svgIn`|`string`|The SVG artwork to complete|
|`panopticPool`|`address`|The address of the Panoptic Pool|
|`rarity`|`uint256`|The rarity of the NFT|
|`symbol0`|`string`|The symbol of `token0` in the Uniswap pool|
|`symbol1`|`string`|The symbol of `token1` in the Uniswap pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The final SVG artwork with the pool/rarity specific text fields filled in|


### getChainName

Get the name of the current chain.


```solidity
function getChainName() internal view returns (string memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The name of the current chain, or the chain ID if not recognized|


### write

Get a group of paths representing `chars` written in a certain font at a default size.


```solidity
function write(string memory chars) internal view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chars`|`string`|The characters to write|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The group of paths representing the characters written in the font|


### write

Get a group of paths representing `chars` written in a certain font, scaled to a maximum width.


```solidity
function write(string memory chars, uint256 maxWidth) internal view returns (string memory fontGroup);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chars`|`string`|The characters to write|
|`maxWidth`|`uint256`|The maximum width (in SVG units) of the group of paths|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fontGroup`|`string`|The group of paths representing the characters written in the font|


### maxSymbolWidth

Get the maximum SVG unit width for the token symbols at the bottom left/right corners for a given rarity.

*This is to ensure the text fits within its section on the frame. There are 6 frames, and each rarity is assigned one of the six.*


```solidity
function maxSymbolWidth(uint256 rarity) internal pure returns (uint256 width);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`rarity`|`uint256`|The rarity of the NFT|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`width`|`uint256`|The maximum SVG unit width for the token symbols|


### maxRarityLabelWidth

Get the maximum SVG unit width for the rarity name at the top for a given rarity (frame).

*This is to ensure the text fits within its section on the frame. There are 6 frames, and each rarity is assigned one of the six.*


```solidity
function maxRarityLabelWidth(uint256 rarity) internal pure returns (uint256 width);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`rarity`|`uint256`|The rarity of the NFT|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`width`|`uint256`|The maximum SVG unit width for the rarity name|


### maxStrategyLabelWidth

Get the maximum SVG unit width for the strategy name label in the center for a given rarity (frame).

*This is to ensure the text fits within its section on the frame. There are 6 frames, and each rarity is assigned one of the six.*


```solidity
function maxStrategyLabelWidth(uint256 rarity) internal pure returns (uint256 width);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`rarity`|`uint256`|The rarity of the NFT|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`width`|`uint256`|The maximum SVG unit width for the strategy name label|


