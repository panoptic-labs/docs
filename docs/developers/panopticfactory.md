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


## ABI

<details>
<summary>PanopticFactory ABI</summary>

```json
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_SFPM",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "poolAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "uniSwapPool",
        "type": "address"
      }
    ],
    "name": "PoolDeployed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_v3PoolAddress",
        "type": "address"
      }
    ],
    "name": "deployToNewPool",
    "outputs": [
      {
        "internalType": "address",
        "name": "newPoolAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sfpm",
    "outputs": [
      {
        "internalType": "contract ISemiFungiblePositionManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

</details>
