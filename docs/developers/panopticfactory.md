---
sidebar_position: 3
---

# Panoptic factory
Deploys an options market on top of an existing Uniswap v3 pool.

## Methods

### deployToNewPool

```solidity
function deployToNewPool(address _v3PoolAddress) external nonpayable returns (address newPoolAddress)
```

#### Parameters

| Name            | Type    | Description |
| --------------- | ------- | ----------- |
| \_v3PoolAddress | address | undefined   |

#### Returns

| Name           | Type    | Description |
| -------------- | ------- | ----------- |
| newPoolAddress | address | undefined   |

### owner

```solidity
function owner() external view returns (address)
```

_Returns the address of the current owner._

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```

_Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner._

### sfpm

```solidity
function sfpm() external view returns (contract ISemiFungiblePositionManager)
```

#### Returns

| Name | Type                                  | Description |
| ---- | ------------------------------------- | ----------- |
| \_0  | contract ISemiFungiblePositionManager | undefined   |

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```

_Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner._

#### Parameters

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| newOwner | address | undefined   |

## Events

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```

#### Parameters

| Name                    | Type    | Description |
| ----------------------- | ------- | ----------- |
| previousOwner `indexed` | address | undefined   |
| newOwner `indexed`      | address | undefined   |

### PoolDeployed

```solidity
event PoolDeployed(address poolAddress, address uniSwapPool)
```

#### Parameters

| Name        | Type    | Description |
| ----------- | ------- | ----------- |
| poolAddress | address | undefined   |
| uniSwapPool | address | undefined   |

