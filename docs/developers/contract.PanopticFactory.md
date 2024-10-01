---
sidebar_position: 4
---
# PanopticFactory
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/PanopticFactory.sol)

**Inherits:**
[FactoryNFT](/docs/developers/base/contract.FactoryNFT), [Multicall](/docs/developers/base/abstract.Multicall)

**Author:**
Axicon Labs Limited

Facilitates deployment of Panoptic pools.


## State Variables
### UNIV3_FACTORY
The Uniswap V3 factory contract to use.


```solidity
IUniswapV3Factory internal immutable UNIV3_FACTORY;
```


### SFPM
The Semi Fungible Position Manager (SFPM) which tracks option positions across Panoptic Pools.


```solidity
SemiFungiblePositionManager internal immutable SFPM;
```


### POOL_REFERENCE
Reference implementation of the `PanopticPool` to clone.


```solidity
address internal immutable POOL_REFERENCE;
```


### COLLATERAL_REFERENCE
Reference implementation of the `CollateralTracker` to clone.


```solidity
address internal immutable COLLATERAL_REFERENCE;
```


### WETH
Address of the Wrapped Ether (or other numeraire token) contract.


```solidity
address internal immutable WETH;
```


### FULL_RANGE_LIQUIDITY_AMOUNT_WETH
An amount of `WETH` deployed when initializing the SFPM against a new AMM pool.

*If we know one of the tokens is WETH, we deploy 0.1 ETH worth in tokens.*


```solidity
uint256 internal constant FULL_RANGE_LIQUIDITY_AMOUNT_WETH = 0.1 ether;
```


### FULL_RANGE_LIQUIDITY_AMOUNT_TOKEN
An amount of another token that's deployed when initializing the SFPM against a new AMM pool.

*Deploy 1e6 worth of tokens if not WETH.*


```solidity
uint256 internal constant FULL_RANGE_LIQUIDITY_AMOUNT_TOKEN = 1e6;
```


### CARDINALITY_INCREASE
The `observationCardinalityNext` to set on the Uniswap pool when a new PanopticPool is deployed.


```solidity
uint16 internal constant CARDINALITY_INCREASE = 51;
```


### s_getPanopticPool
Mapping from address(UniswapV3Pool) to address(PanopticPool) that stores the address of all deployed Panoptic Pools.


```solidity
mapping(IUniswapV3Pool univ3pool => PanopticPool panopticPool) internal s_getPanopticPool;
```


## Functions
### constructor

Set immutable variables and store metadata pointers.


```solidity
constructor(
    address _WETH9,
    SemiFungiblePositionManager _SFPM,
    IUniswapV3Factory _univ3Factory,
    address _poolReference,
    address _collateralReference,
    bytes32[] memory properties,
    uint256[][] memory indices,
    Pointer[][] memory pointers
) FactoryNFT(properties, indices, pointers);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_WETH9`|`address`|Address of the Wrapped Ether (or other numeraire token) contract|
|`_SFPM`|`SemiFungiblePositionManager`|The canonical `SemiFungiblePositionManager` deployment|
|`_univ3Factory`|`IUniswapV3Factory`|The canonical Uniswap V3 Factory deployment|
|`_poolReference`|`address`|The reference implementation of the `PanopticPool` to clone|
|`_collateralReference`|`address`|The reference implementation of the `CollateralTracker` to clone|
|`properties`|`bytes32[]`|An array of identifiers for different categories of metadata|
|`indices`|`uint256[][]`|A nested array of keys for K-V metadata pairs for each property in `properties`|
|`pointers`|`Pointer[][]`|Contains pointers to the metadata values stored in contract data slices for each index in `indices`|


### uniswapV3MintCallback

Called after minting liquidity to a position.

*Pays the pool tokens owed for the minted liquidity from the payer (always the caller).*


```solidity
function uniswapV3MintCallback(uint256 amount0Owed, uint256 amount1Owed, bytes calldata data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount0Owed`|`uint256`|The amount of token0 due to the pool for the minted liquidity|
|`amount1Owed`|`uint256`|The amount of token1 due to the pool for the minted liquidity|
|`data`|`bytes`|Contains the payer address and the pool features required to validate the callback|


### deployNewPool

Create a new Panoptic Pool linked to the given Uniswap pool identified uniquely by the incoming parameters.

*There is a 1:1 mapping between a Panoptic Pool and a Uniswap Pool.*

*A Uniswap pool is uniquely identified by its tokens and the fee.*

*Salt used in PanopticPool CREATE2 is [leading 20 msg.sender chars][leading 20 pool address chars][salt].*


```solidity
function deployNewPool(address token0, address token1, uint24 fee, uint96 salt, uint256 amount0Max, uint256 amount1Max)
    external
    returns (PanopticPool newPoolContract);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token0`|`address`|Address of token0 for the underlying Uniswap v3 pool|
|`token1`|`address`|Address of token1 for the underlying Uniswap v3 pool|
|`fee`|`uint24`|The fee tier of the underlying Uniswap v3 pool, denominated in hundredths of bips|
|`salt`|`uint96`|User-defined component of salt used in CREATE2 for the PanopticPool (must be a uint96 number)|
|`amount0Max`|`uint256`|The maximum amount of token0 to spend on the full-range deployment, which serves as a slippage check|
|`amount1Max`|`uint256`|The maximum amount of token1 to spend on the full-range deployment, which serves as a slippage check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newPoolContract`|`PanopticPool`|The address of the newly deployed Panoptic pool|


### minePoolAddress

Find the salt which would give a Panoptic Pool the highest rarity within the search parameters.

*The rarity is defined in terms of how many leading zeros the Panoptic pool address has.*

*Note that the final salt may overflow if too many loops are given relative to the amount in `salt`.*


```solidity
function minePoolAddress(address deployerAddress, address v3Pool, uint96 salt, uint256 loops, uint256 minTargetRarity)
    external
    view
    returns (uint96 bestSalt, uint256 highestRarity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployerAddress`|`address`|Address of the account that deploys the new PanopticPool|
|`v3Pool`|`address`|Address of the underlying UniswapV3Pool|
|`salt`|`uint96`|Salt value ([96-bit nonce]) to start from, useful as a checkpoint across multiple calls|
|`loops`|`uint256`|The number of mining operations starting from 'salt' in trying to find the highest rarity|
|`minTargetRarity`|`uint256`|The minimum target rarity to mine for. The internal loop stops when this is reached *or* when no more iterations|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`bestSalt`|`uint96`|The salt of the rarest pool (potentially at the specified minimum target)|
|`highestRarity`|`uint256`|The rarity of `bestSalt`|


### _mintFullRange

Seeds Uniswap V3 pool with a full-tick-range liquidity deployment using funds from caller.


```solidity
function _mintFullRange(IUniswapV3Pool v3Pool, address token0, address token1, uint24 fee)
    internal
    returns (uint256, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`v3Pool`|`IUniswapV3Pool`|The address of the Uniswap V3 pool to deploy liquidity in|
|`token0`|`address`|The address of the first token in the Uniswap V3 pool|
|`token1`|`address`|The address of the second token in the Uniswap V3 pool|
|`fee`|`uint24`|The fee level of the of the underlying Uniswap v3 pool, denominated in hundredths of bips|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of token0 deployed at full range|
|`<none>`|`uint256`|The amount of token1 deployed at full range|


### getPanopticPool

Return the address of the Panoptic Pool associated with 'univ3pool'.


```solidity
function getPanopticPool(IUniswapV3Pool univ3pool) external view returns (PanopticPool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`univ3pool`|`IUniswapV3Pool`|The Uniswap V3 pool address to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PanopticPool`|Address of the Panoptic Pool associated with 'univ3pool'|


## Events
### PoolDeployed
Emitted when a Panoptic Pool is created.


```solidity
event PoolDeployed(
    PanopticPool indexed poolAddress,
    IUniswapV3Pool indexed uniswapPool,
    CollateralTracker collateralTracker0,
    CollateralTracker collateralTracker1,
    uint256 amount0,
    uint256 amount1
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolAddress`|`PanopticPool`|Address of the deployed Panoptic pool|
|`uniswapPool`|`IUniswapV3Pool`|Address of the underlying Uniswap V3 pool|
|`collateralTracker0`|`CollateralTracker`|Address of the collateral tracker contract for token0|
|`collateralTracker1`|`CollateralTracker`|Address of the collateral tracker contract for token1|
|`amount0`|`uint256`|The amount of token0 deployed at full range|
|`amount1`|`uint256`|The amount of token1 deployed at full range|

