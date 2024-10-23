---
sidebar_position: 4
---
# PanopticFactory
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.1.x/contracts/PanopticFactory.sol)

**Inherits:**
[FactoryNFT](/docs/developers/V1.1/base/contract.FactoryNFT), [Multicall](/docs/developers/V1.1/base/abstract.Multicall)

**Author:**
Axicon Labs Limited

Facilitates deployment of Panoptic pools.


## State Variables
### POOL_MANAGER_V4
The canonical Uniswap V4 Pool Manager address.


```solidity
IPoolManager internal immutable POOL_MANAGER_V4;
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


### CARDINALITY_INCREASE
The `observationCardinalityNext` to set on the Uniswap pool when a new PanopticPool is deployed.


```solidity
uint16 internal constant CARDINALITY_INCREASE = 51;
```


### s_getPanopticPool
Mapping from keccak256(Uniswap V4 pool id, oracle contract address) to address(PanopticPool) that stores the address of all deployed Panoptic Pools.


```solidity
mapping(bytes32 panopticPoolKey => PanopticPool panopticPool) internal s_getPanopticPool;
```


## Functions
### constructor

Set immutable variables and store metadata pointers.


```solidity
constructor(
    SemiFungiblePositionManager _SFPM,
    IPoolManager manager,
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
|`_SFPM`|`SemiFungiblePositionManager`|The canonical `SemiFungiblePositionManager` deployment|
|`manager`|`IPoolManager`|The canonical Uniswap V4 pool manager|
|`_poolReference`|`address`|The reference implementation of the `PanopticPool` to clone|
|`_collateralReference`|`address`|The reference implementation of the `CollateralTracker` to clone|
|`properties`|`bytes32[]`|An array of identifiers for different categories of metadata|
|`indices`|`uint256[][]`|A nested array of keys for K-V metadata pairs for each property in `properties`|
|`pointers`|`Pointer[][]`|Contains pointers to the metadata values stored in contract data slices for each index in `indices`|


### deployNewPool

Create a new Panoptic Pool linked to the given Uniswap pool identified uniquely by the incoming parameters.

*There is a 1:1 mapping between a Panoptic Pool and a Uniswap Pool.*

*A Uniswap pool is uniquely identified by its tokens and the fee.*

*Salt used in PanopticPool creation is `[leading 20 msg.sender chars][uint80(uint256(keccak256(abi.encode(V4PoolKey, oracleContractAddress))))][salt]`.*


```solidity
function deployNewPool(IV3CompatibleOracle oracleContract, PoolKey calldata key, uint96 salt)
    external
    returns (PanopticPool newPoolContract);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oracleContract`|`IV3CompatibleOracle`|The external oracle contract to be used by the newly deployed Panoptic Pool|
|`key`|`PoolKey`|The Uniswap V4 pool key|
|`salt`|`uint96`|User-defined component of salt used in deployment process for the PanopticPool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newPoolContract`|`PanopticPool`|The address of the newly deployed Panoptic pool|


### minePoolAddress

Find the salt which would give a Panoptic Pool the highest rarity within the search parameters.

*The rarity is defined in terms of how many leading zeros the Panoptic pool address has.*

*Note that the final salt may overflow if too many loops are given relative to the amount in `salt`.*


```solidity
function minePoolAddress(
    address deployerAddress,
    address oracleContract,
    PoolKey calldata key,
    uint96 salt,
    uint256 loops,
    uint256 minTargetRarity
) external view returns (uint96 bestSalt, uint256 highestRarity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deployerAddress`|`address`|Address of the account that deploys the new PanopticPool|
|`oracleContract`|`address`||
|`key`|`PoolKey`||
|`salt`|`uint96`|Salt value to start from, useful as a checkpoint across multiple calls|
|`loops`|`uint256`|The number of mining operations starting from `salt` in trying to find the highest rarity|
|`minTargetRarity`|`uint256`|The minimum target rarity to mine for. The internal loop stops when this is reached *or* when no more iterations|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`bestSalt`|`uint96`|The salt of the rarest pool (potentially at the specified minimum target)|
|`highestRarity`|`uint256`|The rarity of `bestSalt`|


### getPanopticPool

Return the address of the Panoptic Pool associated with the given Uniswap V4 pool key and oracle contract.


```solidity
function getPanopticPool(PoolKey calldata keyV4, IV3CompatibleOracle oracleContract)
    external
    view
    returns (PanopticPool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`keyV4`|`PoolKey`|The Uniswap V4 pool key|
|`oracleContract`|`IV3CompatibleOracle`|The external oracle contract used by the Panoptic Pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PanopticPool`|Address of the Panoptic Pool on `keyV4` using `oracleContract`|


## Events
### PoolDeployed
Emitted when a Panoptic Pool is created.


```solidity
event PoolDeployed(
    PanopticPool indexed poolAddress,
    IV3CompatibleOracle indexed oracleContract,
    PoolKey poolKey,
    CollateralTracker collateralTracker0,
    CollateralTracker collateralTracker1
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolAddress`|`PanopticPool`|Address of the deployed Panoptic pool|
|`oracleContract`|`IV3CompatibleOracle`|The external oracle contract used by the newly deployed Panoptic Pool|
|`poolKey`|`PoolKey`|The Uniswap V4 pool key associated with the Panoptic Pool|
|`collateralTracker0`|`CollateralTracker`|Address of the collateral tracker contract for currency0|
|`collateralTracker1`|`CollateralTracker`|Address of the collateral tracker contract for currency1|

