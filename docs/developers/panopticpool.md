---
sidebar_position: 4
---

# Panoptic pool
Creates and manages undercollateralized options.
Manages positions, collateral, liquidations and forced exercises.

> Panoptic Pool, create permissionless option on top of Uniswap V3

_All liquidity deployed to/from Uniswap v3 is owned by this smart contract_

## Methods - WRITE

### startPool

```solidity
function startPool(
    address _univ3pool,
    address _receiptReference
) external nonpayable
```

Creates a method for creating a Panoptic pool on top of an existing Uniswap v3 pair

_Must be called first before any transaction can occur. Must also deploy receiptReference first._

#### Parameters

| Name                 | Type    | Description                           |
| -------------------- | ------- | ------------------------------------- |
| `_univ3pool`        | address | Address of the target Uniswap v3 pool |
| `_receiptReference` | address | undefined                             |


### deposit

```solidity
function deposit(
    uint128 assets,
    address token
) external nonpayable returns (uint256 shares)
```

Deposits assets as collateral in the Panoptic Pool

_Will internally compute the number of shares to mint_

#### Parameters

| Name     | Type    | Description                                                                |
| -------- | ------- | -------------------------------------------------------------------------- |
| `assets` | uint128 | User-specified amount of token deposited                                   |
| `token`  | address | Address of the token deposited, must be uniswapPool&#39;s token0 or token1 |

#### Returns

| Name     | Type    | Description                                            |
| -------- | ------- | ------------------------------------------------------ |
| `shares` | uint256 | The number of shares minted when assets were deposited |

### withdraw

```solidity
function withdraw(
    uint256 shares,
    address token,
    uint256[] positionIdList
) external nonpayable returns (uint128 assets)
```

Withdraw collateral assets from the Panoptic Pool

_Will internally compute the number of shares to burn_

#### Parameters

| Name             | Type      | Description                                                                                                 |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `shares`         | uint256   | User-specified amount of shares token to be withdrawn. Will withdraw all if greater than user&#39;s balance |
| `token`          | address   | Address of the token deposited, must be uniswapPool&#39;s token0 or token1                                  |
| `positionIdList` | uint256[] | List of positions owned by the user. Written as [tokenId1, tokenId2, ...]                                   |

#### Returns

| Name     | Type    | Description                    |
| -------- | ------- | ------------------------------ |
| `assets` | uint128 | The number of assets withdrawn |

### mintOptions

```solidity
function mintOptions(
    uint256[] positionIdList,
    uint128 numberOfContracts,
    uint256 effectiveLiquidityLimit
) external nonpayable returns (bool)
```

Mints a specific number of contracts for a new option

_Must be a new option, will revert if a position with that tokenId already exists._

#### Parameters

| Name                      | Type      | Description                                                                                                                                                                                                        |
| ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `positionIdList`          | uint256[] | List of positions owned by msg.sender. Written as [tokenId1, tokenId2, ..., tokenIdN] with tokenIdN as the NEW TOKEN                                                                                               |
| `numberOfContracts`       | uint128   | The number of contracts to be minted, expressed in terms of token0                                                                                                                                                 |
| `effectiveLiquidityLimit` | uint256   | Maximum amount of &quot;spread&quot; defined as baseLiquidity/(baseLiquidity - legLiquidity) for a new position. Generate using effectiveLiquidityFactorHelper first or set to 0 for no limit / only short options |

#### Returns

| Name | Type | Description                            |
| ---- | ---- | -------------------------------------- |
| \_0  | bool | Returns true if the mint is successful |

### mintOptionsITM

```solidity
function mintOptionsITM(
    uint256[] positionIdList,
    uint128 numberOfContracts,
    uint256 effectiveLiquidityLimit,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external nonpayable returns (bool success)
```

Mints a specific number of contracts for a new option that is ITM

_Must be a new option, will revert if a position with that tokenId already exists or it is not ITM._

#### Parameters

| Name                      | Type      | Description                                                                                                                                                                                                        |
| ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `positionIdList`          | uint256[] | List of positions owned by msg.sender. Written as [tokenId1, tokenId2, ..., tokenIdN] with tokenIdN as the NEW TOKEN                                                                                               |
| `numberOfContracts`       | uint128   | The number of contracts to be minted, expressed in terms of token0                                                                                                                                                 |
| `effectiveLiquidityLimit` | uint256   | Maximum amount of &quot;spread&quot; defined as baseLiquidity/(baseLiquidity - legLiquidity) for a new position. Generate using effectiveLiquidityFactorHelper first or set to 0 for no limit / only short options |
| `tickLimitLow`            | int24     | Low price slippage limit when minting ITM option, as a int24 tick                                                                                                                                                  |
| `tickLimitHigh`           | int24     | High price slippage limit when minting ITM option, as a int24 tick                                                                                                                                                 |

#### Returns

| Name    | Type | Description                                |
| ------- | ---- | ------------------------------------------ |
| success | bool | Returns true if the ITM mint is successful |

### burnOptions

```solidity
function burnOptions(uint256 tokenId) external nonpayable returns (bool)
```

Burns the entire balance of tokenId of msg.sender. Will exercise if necessary using msg.sender's deposited collateral.

_Will exercise if necessary, and will revert if user does not have enough collateral to exercise._

#### Parameters

| Name      | Type    | Description                             |
| --------- | ------- | --------------------------------------- |
| `tokenId` | uint256 | The tokenId of the position to be burnt |

#### Returns

| Name | Type | Description                            |
| ---- | ---- | -------------------------------------- |
| \_0  | bool | Returns true is the burn is successful |

### burnOptionsITM

```solidity
function burnOptionsITM(
    uint256 tokenId,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external nonpayable returns (bool)
```

Burns the entire balance of tokenId of msg.sender if the position is in-the-money. Will exercise if necessary using msg.sender's deposited collateral.

_Will exercise if necessary, and will revert if user does not have enough collateral to exercise._

#### Parameters

| Name            | Type    | Description                                     |
| --------------- | ------- | ----------------------------------------------- |
| `tokenId`       | uint256 | The tokenId of the position to be burnt         |
| `tickLimitLow`  | int24   | Price slippate limit when burning an ITM option |
| `tickLimitHigh` | int24   | Price slippate limit when burning an ITM option |

#### Returns

| Name | Type | Description                            |
| ---- | ---- | -------------------------------------- |
| \_0  | bool | Returns true is the burn is successful |

### delegate

```solidity
function delegate(
    address token,
    address delegatee,
    uint128 assets
) external nonpayable returns (uint256 shares)
```

Delegate assets to another user. Delegated assets cannot be withdrawn by the delegatee

_Will internally compute the number of shares to mint_

#### Parameters

| Name        | Type    | Description                                                                                                                      |
| ----------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `token`     | address | Address of the token deposited, must be uniswapPool&#39;s token0 or token1                                                       |
| `delegatee` | address | Address of the user who will receive delegated funds                                                                             |
| `assets`    | uint128 | User-specified amount of token to be delegated. These assets will be taken from the existing collateral balance of the delegator |

#### Returns

| Name     | Type    | Description                    |
| -------- | ------- | ------------------------------ |
| `shares` | uint256 | The number of shares delegated |

### revoke

```solidity
function revoke(
    address token,
    address delegatee,
    uint256[] delegateePositionIdList
) external nonpayable returns (uint256 shares, uint128 adjustedAssets)
```

Revokes delegated assets from a user. Checks that the revoked user is still solvent

_Will internally compute the number of shares to burn and will revert if account is margin called or underwater_

#### Parameters

| Name                      | Type      | Description                                                                |
| ------------------------- | --------- | -------------------------------------------------------------------------- |
| `token`                   | address   | Address of the token deposited, must be uniswapPool&#39;s token0 or token1 |
| `delegatee`               | address   | Address of the user who will receive delegated funds                       |
| `delegateePositionIdList` | uint256[] | List of positions owned by the user. Written as [tokenId1, tokenId2, ...]  |

#### Returns

| Name             | Type    | Description                                              |
| ---------------- | ------- | -------------------------------------------------------- |
| `shares`         | uint256 | The number of shares delegated                           |
| `adjustedAssets` | uint128 | Assets removed, which may include impact of liquidations |


### forceExercise

```solidity
function forceExercise(
    address _account,
    int48 tickLimits,
    uint256[] _positionIdList,
    uint256[] _touchedId,
    uint256[] _leftoverIds
) external nonpayable returns (bool success)
```

Force the exercise of a single position. Exercisor will have to pay a small fee do force exercise

_Will revert if: number of touchedId is larger than 1 or if user force exercises their own position_

#### Parameters

| Name               | Type      | Description |
| ------------------ | --------- | ----------- |
| `_account`        | address   |  Address of the distressed account   |
| `tickLimits`       | int48     | LeftRight encoded tick limits for slippage. lower = int24(tickLimits >> 24), higher = int24(tickLimits)                      |
| `_positionIdList` | uint256[] | List of positions owned by the user. Written as [tokenId1, tokenId2, ...]   |
| `_touchedId`      | uint256[] | List of position to be force exercised. Can only contain one tokenId, written as [tokenId]   |
| `_leftoverIds`    | uint256[] | List of positions remaining after exercise. Must not contain tokenId, written as [tokenId1, tokenId2, ...]   |

#### Returns

| Name    | Type | Description                |
| ------- | ---- | -------------------------- |
| success | bool | Returns true if successful |

### liquidateAccount

```solidity
function liquidateAccount(
    address _account,
    int48 tickLimits,
    uint256[] _positionIdList,
    uint256[] emptyList
) external nonpayable returns (bool)
```

Liquidates a distressed account. Will burn all positions and will issue a bonus to the liquidator

_Will revert if: accout is not margin called or if the user liquidates themselves_

#### Parameters

| Name               | Type      | Description                   |
| ------------------ | --------- | ----------------------------- |
| `_account`         | address   | Address of the distressed account                     |
| `tickLimits`       | int48     | LeftRight encoded tick limits for slippage. lower = int24(tickLimits >> 24), higher = int24(tickLimits)                      |
| `_positionIdList`  | uint256[] |  List of positions owned by the user. Written as [tokenId1, tokenId2, ...]                     |
| `emptyList`        | uint256[] | Must always be provided as [] |

#### Returns

| Name | Type | Description                |
| ---- | ---- | -------------------------- |
| \_0  | bool | Returns true if successful |

## Methods - READ

### calculateAccumulatedFeesBatch

```solidity
function calculateAccumulatedFeesBatch(
    address user,
    uint256[] positionIdList
) external view returns (int128 premium0, int128 premium1)
```

Computes the total amount of premium accumulated for a list of positions

_Could be costly because it reads information from 2 ticks for each leg of each tokenId_

#### Parameters

| Name             | Type      | Description                                             |
| ---------------- | --------- | ------------------------------------------------------- |
| `user`           | address   | Address of the user that owns the positions             |
| `positionIdList` | uint256[] | List of positions. Written as [tokenId1, tokenId2, ...] |

#### Returns

| Name       | Type   | Description                                    |
| ---------- | ------ | ---------------------------------------------- |
| `premium0` | int128 | Premium for token0 (negative = amount is owed) |
| `premium1` | int128 | Premium for token1 (negative = amount is owed) |

### effectiveLiquidityFactorHelper

```solidity
function effectiveLiquidityFactorHelper(
    uint256 tokenId,
    uint128 numberOfContracts
) external view returns (uint256 maxFactor)
```

Helper function that computes the total max amount of liquidity factor for that position. Inputs as `effectiveLiquidityLimit` in mintOptions() and mintOptionsITM()
#### Parameters

| Name                | Type    | Description                                                        |
| ------------------- | ------- | ------------------------------------------------------------------ |
| `tokenId`           | uint256 | TokenId of the position to be checked                              |
| `numberOfContracts` | uint128 | The number of contracts to be minted, expressed in terms of token0 |

#### Returns

| Name        | Type    | Description                                                                 |
| ----------- | ------- | --------------------------------------------------------------------------- |
| `maxFactor` | uint256 | Maximum allowable effectiveLiquidityFactor for minting the tokenId position |


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
function optionPositionCounter(address user) external view returns (uint128 n)
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
event AccountLiquidated(address liquidator, address liquidatee, int256 bonusAmounts)
```

Emitted when an account is liquidated

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| liquidator   | address | undefined   |
| liquidatee   | address | undefined   |
| bonusAmounts | int256  | undefined   |

### Delegated

```solidity
event Delegated(address delegator, address delegatee, address tokenAddress, uint128 assets, uint256 shares)
```

Emitted when any amount is delegated to a user

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| delegator    | address | undefined   |
| delegatee    | address | undefined   |
| tokenAddress | address | undefined   |
| assets       | uint128 | undefined   |
| shares       | uint256 | undefined   |

### Deposited

```solidity
event Deposited(address user, address tokenAddress, uint128 assets, uint256 shares)
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
event ForcedExercised(address exercisor, address user, uint256 tokenId, uint256 costAmounts)
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
event OptionBurnt(address recipient, uint128 numberOfContracts, uint256 tokenId, int256 premia, uint128 positionCounter)
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
event OptionMinted(address recipient, uint128 numberOfContracts, uint256 tokenId, int256 commissionRates, uint128 poolUtilizations, uint256 positionCounter)
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
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```

#### Parameters

| Name                    | Type    | Description |
| ----------------------- | ------- | ----------- |
| previousOwner `indexed` | address | undefined   |
| newOwner `indexed`      | address | undefined   |

### Revoked

```solidity
event Revoked(address delegator, address delegatee, address tokenAddress, uint128 assets, uint256 shares)
```

Emitted when any amount is revoked

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| delegator    | address | undefined   |
| delegatee    | address | undefined   |
| tokenAddress | address | undefined   |
| assets       | uint128 | undefined   |
| shares       | uint256 | undefined   |

### Withdrawn

```solidity
event Withdrawn(address user, address tokenAddress, uint128 assets, uint256 shares)
```

Emitted when any amount of collateral is withdrawn

#### Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| user         | address | undefined   |
| tokenAddress | address | undefined   |
| assets       | uint128 | undefined   |
| shares       | uint256 | undefined   |

