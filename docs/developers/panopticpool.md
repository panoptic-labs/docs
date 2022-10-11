---
sidebar_position: 4
---

# Panoptic pool
Creates and manages undercollateralized options.
Manages positions, collateral, liquidations and forced exercises.

> Panoptic Pool, create permissionless option on top of Uniswap V3

_All liquidity deployed to/from Uniswap v3 is owned by this smart contract_

## Write Methods

### startPool

```solidity
function startPool(
    address _univ3pool,
    address _collateralReference
) external nonpayable
```

Creates a method for creating a Panoptic pool on top of an existing Uniswap v3 pair

*Must be called first before any transaction can occur. Must also deploy collateralReference first.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _univ3pool | address | Address of the target Uniswap v3 pool |
| _collateralReference | address | undefined |

### deposit

```solidity
function deposit(
    uint128 assets, 
    address token
) external nonpayable returns (uint256 shares)
```



*Will internally compute the number of shares to mint*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | uint128 | User-specified amount of token deposited |
| token | address | Address of the token deposited, must be uniswapPool&#39;s token0 or token1 |

#### Returns

| Name | Type | Description |
|---|---|---|
| shares | uint256 | The number of shares minted when assets were deposited |


### withdraw

```solidity
function withdraw(
    uint256 shares,
    address token,
    uint256[] positionIdList
) external nonpayable returns (uint128 assets)
```

Withdraw collateral assets from the Panoptic Pool

*Will internally compute the number of shares to burn*

#### Parameters

| Name | Type | Description |
|---|---|---|
| shares | uint256 | User-specified amount of shares token to be withdrawn. Will withdraw all if greater than user&#39;s balance |
| token | address | Address of the token deposited, must be uniswapPool&#39;s token0 or token1 |
| positionIdList | uint256[] | List of positions owned by the user. Written as [tokenId1, tokenId2, ...] |

#### Returns

| Name | Type | Description |
|---|---|---|
| assets | uint128 | The number of assets withdrawn |


### mintOptions

```solidity
function mintOptions(
    uint256[] positionIdList,
    uint128 positionSize,
    uint256 effectiveLiquidityLimit
) external nonpayable returns (bool)
```

Mints a specific number of contracts for a new option

*Must be a new option, will revert if a position with that tokenId already exists.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| positionIdList | uint256[] | List of positions owned by msg.sender. Written as [tokenId1, tokenId2, ..., tokenIdN] with tokenIdN as the NEW TOKEN |
| positionSize | uint128 | The number of contracts to be minted, expressed in terms of the numeraire |
| effectiveLiquidityLimit | uint256 | Maximum amount of &quot;spread&quot; defined as baseLiquidity/(baseLiquidity - legLiquidity) for a new position. Generate using effectiveLiquidityFactorHelper first or set to 0 for no limit / only short options |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns true if the mint is successful |


### mintOptionsITM

```solidity
function mintOptionsITM(
    uint256[] positionIdList,
    uint128 positionSize,
    uint256 effectiveLiquidityLimit,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external nonpayable returns (bool success)
```

Mints a specific number of contracts for a new option that is ITM

*Must be a new option, will revert if a position with that tokenId already exists or it is not ITM.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| positionIdList | uint256[] | List of positions owned by msg.sender. Written as [tokenId1, tokenId2, ..., tokenIdN] with tokenIdN as the NEW TOKEN |
| positionSize | uint128 | The number of contracts to be minted, expressed in terms of the numeraire |
| effectiveLiquidityLimit | uint256 | Maximum amount of &quot;spread&quot; defined as baseLiquidity/(baseLiquidity - legLiquidity) for a new position. Generate using effectiveLiquidityFactorHelper first or set to 0 for no limit / only short options |
| tickLimitLow | int24 | Low price slippage limit when minting ITM option |
| tickLimitHigh | int24 | High price slippage limit when minting ITM option |

#### Returns

| Name | Type | Description |
|---|---|---|
| success | bool | Returns true if the ITM mint is successful |


### burnOptions

```solidity
function burnOptions(
    uint256 tokenId
) external nonpayable returns (bool)
```

Burns the entire balance of tokenId of msg.sender

*Will exercise if necessary, and will revert if user does not have enough collateral to exercise.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | The tokenId of the position to be burnt |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns true is the burn is successful |


### burnOptionsITM

```solidity
function burnOptionsITM(
    uint256 tokenId,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external nonpayable returns (bool)
```

Burns the entire balance of tokenId of msg.sender

*Will exercise if necessary, and will revert if user does not have enough collateral to exercise.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | The tokenId of the position to be burnt |
| tickLimitLow | int24 | Price slippage limit when burning an ITM option |
| tickLimitHigh | int24 | Price slippage limit when burning an ITM option |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns true is the burn is successful |


### forceExercise

```solidity
function forceExercise(
    address _account,
    int24 tickLimitLow,
    int24 tickLimitHigh,
    uint256[] _positionIdList,
    uint256[] _touchedId,
    uint256[] _leftoverIds
) external nonpayable
```



*Will revert if: number of touchedId is larger than 1 or if user force exercises their own position*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _account | address | undefined |
| tickLimitLow | int24 | The lower tick slippagelimit |
| tickLimitHigh | int24 | The upper tick slippagelimit |
| _positionIdList | uint256[] | undefined |
| _touchedId | uint256[] | undefined |
| _leftoverIds | uint256[] | undefined |

### liquidateAccount

```solidity
function liquidateAccount(
    address _account,
    int24 tickLimitLow,
    int24 tickLimitHigh,
    uint256[] _positionIdList,
    uint256[] emptyList
) external nonpayable
```

Liquidates a distressed account. Will burn all positions and will issue a bonus to the liquidator

*Will revert if: accout is not margin called or if the user liquidates themselves*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _account | address | undefined |
| tickLimitLow | int24 | The lower tick slippagelimit |
| tickLimitHigh | int24 | The upper tick slippagelimit |
| _positionIdList | uint256[] | undefined |
| emptyList | uint256[] | Must always be provided as [] |


## View Methods

### calculateAccumulatedFeesBatch

```solidity
function calculateAccumulatedFeesBatch(
    address user,
    uint256[] positionIdList
) external view returns (int128 premium0, int128 premium1)
```

Computes the total amount of premium accumulated for a list of positions

*Could be costly because it reads information from 2 ticks for each leg of each tokenId*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | Address of the user that owns the positions |
| positionIdList | uint256[] | List of positions. Written as [tokenId1, tokenId2, ...] |

#### Returns

| Name | Type | Description |
|---|---|---|
| premium0 | int128 | Premium for token0 (negative = amount is owed) |
| premium1 | int128 | Premium for token1 (negative = amount is owed) |

### checkCollateral

```solidity
function checkCollateral(
    address token,
    address account,
    int24 atTick,
    uint256[] positionIdList
) external view returns (uint128, uint128)
```

Computes the collateral requirement of a given `account` and for a given `token`

*To be used as a helper function or called from another contract*


#### Parameters

| Name | Type | Description |
|---|---|---|
| token | address | Address of the collateral token |
| account | address | Address of the account to check collateral |
| atTick | int24 | Value of the tick at which collateral is checked (user-specified) |
| positionIdList | uint256[] | List of positions owned by the user. Written as [tokenId1, tokenId2, ...] |

#### Returns

| Name | Type | Description |
|---|---|---|
| tokenBalance  | uint128 | Balance of `token` held by the account |
| tokenRequired | uint128 | Amount of token required as collateral for that account |


### optionPositionBalance

```solidity
function optionPositionBalance(
    address user,
    uint256 tokenId)
external view returns (uint128 balance, uint128 poolUtilizations)
```

Returns the total number of contracts by user for a specified position

#### Parameters

| Name      | Type    | Description                           |
| --------- | ------- | ------------------------------------- |
| `user`    | address | Address of the account to be checked  |
| `tokenId` | uint256 | TokenId of the position to be checked |

#### Returns

| Name               | Type    | Description                                      |
| ------------------ | ------- | ------------------------------------------------ |
| `balance`          | uint128 | Number of contracts of tokenId owned by the user |
| `poolUtilizations` | uint128 | Utilizations of the collateral pools: utilization(token0) = uint64(poolUtilizations), utilization(token1) = uint64(poolUtilizations >> 64)                                       |

### optionPositionCounter

```solidity
function optionPositionCounter(
    address user
) external view returns (uint128 n)
```

Returns the total number of positions owned by a user

#### Parameters

| Name   | Type    | Description                          |
| ------ | ------- | ------------------------------------ |
| `user` | address | Address of the account to be checked |

#### Returns

| Name   | Type    | Description                       |
| ------ | ------- | --------------------------------- |
| `n`    | uint128 | Number of positions owned by user |

## Events

### AccountLiquidated

```solidity
event AccountLiquidated(
    address liquidator,
    address liquidatee,
    int256 bonusAmounts
)
```

Emitted when an account is liquidated

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| liquidator   | address | undefined   |
| liquidatee   | address | undefined   |
| bonusAmounts | int256  | undefined   |

### Deposited

```solidity
event Deposited(
    address user,
    address tokenAddress,
    uint128 assets,
    uint256 shares
)
```

Emitted when any amount is deposited as collateral

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| user         | address | undefined   |
| tokenAddress | address | undefined   |
| assets       | uint128 | undefined   |
| shares       | uint256 | undefined   |

### ForcedExercised

```solidity
event ForcedExercised(
    address exercisor,
    address user,
    uint256 tokenId,
    uint256 costAmounts
)
```

Emitted when a position is forces exercised

#### Parameters

| Name        | Type    | Description |
| ----------- | ------- | ----------- |
| exercisor   | address | undefined   |
| user        | address | undefined   |
| tokenId     | uint256 | undefined   |
| costAmounts | uint256 | undefined   |

### OptionBurnt

```solidity
event OptionBurnt(
    address recipient,
    uint128 numberOfContracts,
    uint256 tokenId,
    int256 premia,
    uint128 positionCounter
)
```

Emitted when an option is burnt

#### Parameters

| Name              | Type    | Description |
| ----------------- | ------- | ----------- |
| recipient         | address | undefined   |
| numberOfContracts | uint128 | undefined   |
| tokenId           | uint256 | undefined   |
| premia            | int256  | undefined   |
| positionCounter   | uint128 | undefined   |

### OptionMinted

```solidity
event OptionMinted(
    address recipient,
    uint128 numberOfContracts,
    uint256 tokenId,
    int256 commissionRates,
    uint128 poolUtilizations,
    uint256 positionCounter
)
```

Emitted when an option is minted

#### Parameters

| Name              | Type    | Description |
| ----------------- | ------- | ----------- |
| recipient         | address | undefined   |
| numberOfContracts | uint128 | undefined   |
| tokenId           | uint256 | undefined   |
| commissionRates   | int256  | undefined   |
| poolUtilizations  | uint128 | undefined   |
| positionCounter   | uint256 | undefined   |

### OwnershipTransferred

```solidity
event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
)
```

#### Parameters

| Name                    | Type    | Description |
| ----------------------- | ------- | ----------- |
| previousOwner `indexed` | address | undefined   |
| newOwner `indexed`      | address | undefined   |


### Withdrawn

```solidity
event Withdrawn(
    address user,
    address tokenAddress,
    uint128 assets,
    uint256 shares
)
```

Emitted when any amount of collateral is withdrawn

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| user         | address | undefined   |
| tokenAddress | address | undefined   |
| assets       | uint128 | undefined   |
| shares       | uint256 | undefined   |


## ABI

<details>
<summary>PanopticPool ABI</summary>

```json
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_sfpm",
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
        "name": "liquidator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "liquidatee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "bonusAmounts",
        "type": "int256"
      }
    ],
    "name": "AccountLiquidated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "assets",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
      }
    ],
    "name": "Deposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "exercisor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "costAmounts",
        "type": "uint256"
      }
    ],
    "name": "ForcedExercised",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "premia",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "positionCounter",
        "type": "uint128"
      }
    ],
    "name": "OptionBurnt",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "commissionRates",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "poolUtilizations",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "positionCounter",
        "type": "uint256"
      }
    ],
    "name": "OptionMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "oldTokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "newTokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "commissionRates",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "poolUtilizations",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "premia",
        "type": "int256"
      }
    ],
    "name": "OptionRolled",
    "type": "event"
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
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "assets",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DECIMALS",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burnOptions",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "int24",
        "name": "tickLimitLow",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "tickLimitHigh",
        "type": "int24"
      }
    ],
    "name": "burnOptionsITM",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      }
    ],
    "name": "calculateAccumulatedFeesBatch",
    "outputs": [
      {
        "internalType": "int128",
        "name": "premium0",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "premium1",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "int24",
        "name": "atTick",
        "type": "int24"
      },
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      }
    ],
    "name": "checkCollateral",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collateralToken0",
    "outputs": [
      {
        "internalType": "contract CollateralTracker",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collateralToken1",
    "outputs": [
      {
        "internalType": "contract CollateralTracker",
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
        "internalType": "uint128",
        "name": "assets",
        "type": "uint128"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      },
      {
        "internalType": "int24",
        "name": "tickLimitLow",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "tickLimitHigh",
        "type": "int24"
      },
      {
        "internalType": "uint256[]",
        "name": "_positionIdList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_touchedId",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_leftoverIds",
        "type": "uint256[]"
      }
    ],
    "name": "forceExercise",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      },
      {
        "internalType": "int24",
        "name": "tickLimitLow",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "tickLimitHigh",
        "type": "int24"
      },
      {
        "internalType": "uint256[]",
        "name": "_positionIdList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "emptyList",
        "type": "uint256[]"
      }
    ],
    "name": "liquidateAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "effectiveLiquidityLimit",
        "type": "uint256"
      }
    ],
    "name": "mintOptions",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "effectiveLiquidityLimit",
        "type": "uint256"
      },
      {
        "internalType": "int24",
        "name": "tickLimitLow",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "tickLimitHigh",
        "type": "int24"
      }
    ],
    "name": "mintOptionsITM",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC1155BatchReceived",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC1155Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "optionPositionBalance",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "balance",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "poolUtilizations",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      }
    ],
    "name": "optionPositionBalanceBatch",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "optionPositionCounter",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "n",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "poolData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "panopticPoolBalance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalBalance",
        "type": "uint256"
      },
      {
        "internalType": "int128",
        "name": "inAMM",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "totalCollected",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "currentPoolUtilization",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolId",
    "outputs": [
      {
        "internalType": "uint80",
        "name": "",
        "type": "uint80"
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "oldTokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newTokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "emptyList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "effectiveLiquidityLimit",
        "type": "uint256"
      },
      {
        "internalType": "int24",
        "name": "tickLimitLow",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "tickLimitHigh",
        "type": "int24"
      }
    ],
    "name": "rollOptions",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_options",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
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
        "name": "_univ3pool",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_collateralReference",
        "type": "address"
      }
    ],
    "name": "startPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tickSpacing",
    "outputs": [
      {
        "internalType": "int24",
        "name": "",
        "type": "int24"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token0",
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
    "name": "token1",
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
  },
  {
    "inputs": [],
    "name": "univ3pool",
    "outputs": [
      {
        "internalType": "contract IUniswapV3Pool",
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
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "assets",
        "type": "uint128"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

```

</details>
