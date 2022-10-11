---
sidebar_position: 5
---

# Collateral tracker
Tracks and manages collateral using a shares model.

## View Methods

### BUY_COLLATERAL_RATIO

```solidity
function BUY_COLLATERAL_RATIO() external view returns (int128)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### COLLATERAL_MARGIN_RATIO

```solidity
function COLLATERAL_MARGIN_RATIO() external view returns (int256)
```

Ratio at which a position is margin called (100% collateralization)

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int256 | undefined   |

### COMMISSION_FEE

```solidity
function COMMISSION_FEE() external view returns (int128)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### DECIMALS

```solidity
function DECIMALS() external view returns (uint256)
```

Decimals for all computation (1 basis point precision)

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### DECIMALS_128

```solidity
function DECIMALS_128() external view returns (int128)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### DETAILS

```solidity
function DETAILS() external view returns (string)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | string | undefined   |

### EXERCISE_COST

```solidity
function EXERCISE_COST() external view returns (int128)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### MIN_LIQUIDATION_RATIO

```solidity
function MIN_LIQUIDATION_RATIO() external view returns (int256)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int256 | undefined   |

### SATURATED_POOL_UTILIZATION

```solidity
function SATURATED_POOL_UTILIZATION() external view returns (int128)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### SELL_COLLATERAL_RATIO

```solidity
function SELL_COLLATERAL_RATIO() external view returns (int128)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### TARGET_POOL_UTILIZATION

```solidity
function TARGET_POOL_UTILIZATION() external view returns (int128)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```

_See {IERC20-allowance}._

#### Parameters

| Name    | Type    | Description |
| ------- | ------- | ----------- |
| owner   | address | undefined   |
| spender | address | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### baseRequirement

```solidity
function baseRequirement(uint128 value, uint256 long, uint64 utilization) external pure returns (uint128 required)
```

_Base collateral requirement. TODO: make this a function of the pool utilization factor?_

#### Parameters

| Name        | Type    | Description |
| ----------- | ------- | ----------- |
| value       | uint128 | undefined   |
| long        | uint256 | undefined   |
| utilization | uint64  | undefined   |

#### Returns

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| required | uint128 | undefined   |

### buyCollateralRatio

```solidity
function buyCollateralRatio(int128 utilization) external pure returns (int128 buyRatio)
```

Returns the collateral ratio that is paid when a long option is minted at a specific pool utilization

_This is computed at the time the position is minted_

#### Parameters

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| utilization | int128 | undefined   |

#### Returns

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| buyRatio | int128 | undefined   |

### checkCollateral

```solidity
function checkCollateral(address user, uint128 totalAmount, uint128 movedAmount, int128 premium, uint256 offset, uint256[] positionIdList) external view returns (uint256 tokenData, uint64 utilization)
```

Ensures that the user has enough collateral

#### Parameters

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| user           | address   | undefined   |
| totalAmount    | uint128   | undefined   |
| movedAmount    | uint128   | undefined   |
| premium        | int128    | undefined   |
| offset         | uint256   | undefined   |
| positionIdList | uint256[] | undefined   |

#### Returns

| Name        | Type    | Description |
| ----------- | ------- | ----------- |
| tokenData   | uint256 | undefined   |
| utilization | uint64  | undefined   |

### checkHealth

```solidity
function checkHealth(address user, uint256[] positionIdList, uint256 offset, int128 premium) external view returns (uint256 tokenData)
```

Check collateral requirement and return a LeftRight packaged output

_tonkenData returns tokenRequired in the right slot and balanceOf(user) in the left slot_

#### Parameters

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| user           | address   | undefined   |
| positionIdList | uint256[] | undefined   |
| offset         | uint256   | undefined   |
| premium        | int128    | undefined   |

#### Returns

| Name      | Type    | Description |
| --------- | ------- | ----------- |
| tokenData | uint256 | undefined   |

### collectedFees

```solidity
function collectedFees() external view returns (int128)
```

Returns the amount of token that have been collected (does not count towards available balance)

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### commissionRate

```solidity
function commissionRate() external view returns (int128 commissionFee)
```

#### Returns

| Name          | Type   | Description |
| ------------- | ------ | ----------- |
| commissionFee | int128 | undefined   |

### computeBonus

```solidity
function computeBonus(address account, uint256[] positionIdList, uint256 otherTokenData, uint160 sqrtPriceX96, int128 premium) external view returns (int256 bonusRatio, uint256 tokenData)
```

_Called when an account is liquidated. Bonus depends on degree of distress (100% bonus at 105% collateral?)_

#### Parameters

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| account        | address   | undefined   |
| positionIdList | uint256[] | undefined   |
| otherTokenData | uint256   | undefined   |
| sqrtPriceX96   | uint160   | undefined   |
| premium        | int128    | undefined   |

#### Returns

| Name       | Type    | Description |
| ---------- | ------- | ----------- |
| bonusRatio | int256  | undefined   |
| tokenData  | uint256 | undefined   |

### convertToAssets

```solidity
function convertToAssets(uint256 shares) external view returns (uint128)
```

#### Parameters

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| shares | uint256 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint128 | undefined   |

### convertToShares

```solidity
function convertToShares(uint128 assets) external view returns (uint256)
```

#### Parameters

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| assets | uint128 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### decimals

```solidity
function decimals() external view returns (uint8)
```

Returns the underlying token&#39;s decimals

#### Returns

| Name | Type  | Description |
| ---- | ----- | ----------- |
| \_0  | uint8 | undefined   |

### delegatedAmount

```solidity
function delegatedAmount(address) external view returns (int256)
```

_Tracks the amount of shares delegated BY a user (negative balance) or TO a user (positive balance) (address user0 =&gt; uint256 shares)_

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int256 | undefined   |

### delegatedShares

```solidity
function delegatedShares(address delegator, address delegatee) external view returns (uint256)
```

Returns the amount of shares that have been delegated from delegator to delegatee.

#### Parameters

| Name      | Type    | Description |
| --------- | ------- | ----------- |
| delegator | address | undefined   |
| delegatee | address | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### delegation

```solidity
function delegation(address, address) external view returns (uint256)
```

_Tracks the amount of shares delegated from address0 to address 1 (address user0 =&gt; address user1 =&gt; uint256 shares)_

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |
| \_1  | address | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### exerciseCost

```solidity
function exerciseCost(int24 currentTick, uint256 tokenId) external view returns (int128 exerciseFee)
```

#### Parameters

| Name        | Type    | Description |
| ----------- | ------- | ----------- |
| currentTick | int24   | undefined   |
| tokenId     | uint256 | undefined   |

#### Returns

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| exerciseFee | int128 | undefined   |

### getPositionCollateralAtTick

```solidity
function getPositionCollateralAtTick(uint256 tokenId, uint128 numberOfContracts, int24 tick, uint128 poolUtilizations) external view returns (uint128)
```

_returns the token required for a specific tokenIdt_

#### Parameters

| Name              | Type    | Description |
| ----------------- | ------- | ----------- |
| tokenId           | uint256 | undefined   |
| numberOfContracts | uint128 | undefined   |
| tick              | int24   | undefined   |
| poolUtilizations  | uint128 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint128 | undefined   |

### getUserRequiredCollateral

```solidity
function getUserRequiredCollateral(address user, uint256[] positionIdList, uint256 offset) external view returns (uint128 tokenRequired)
```

_returns the token required for the entire account_

#### Parameters

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| user           | address   | undefined   |
| positionIdList | uint256[] | undefined   |
| offset         | uint256   | undefined   |

#### Returns

| Name          | Type    | Description |
| ------------- | ------- | ----------- |
| tokenRequired | uint128 | undefined   |

### inAMM

```solidity
function inAMM() external view returns (int128)
```

Returns the amount of token in the sent to the Uniswap pool (inside the AMM)

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### liquidationBonus

```solidity
function liquidationBonus(uint256 balance, uint256 sharesRequired) external view returns (int256 bonus)
```

#### Parameters

| Name           | Type    | Description |
| -------------- | ------- | ----------- |
| balance        | uint256 | undefined   |
| sharesRequired | uint256 | undefined   |

#### Returns

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| bonus | int256 | undefined   |

### maxDeposit

```solidity
function maxDeposit(address) external view returns (uint256)
```

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### maxMint

```solidity
function maxMint(address) external view returns (uint256)
```

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### maxRedeem

```solidity
function maxRedeem(address user) external view returns (uint256)
```

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| user | address | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### maxWithdraw

```solidity
function maxWithdraw(address user) external view returns (uint256)
```

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| user | address | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### name

```solidity
function name() external view returns (string)
```

Returns the name of the underlying token

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | string | undefined   |

### owner

```solidity
function owner() external view returns (address)
```

Returns the owner of this contract, which should be the Panoptic Pool this got deployed from.r

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

### panopticPool

```solidity
function panopticPool() external view returns (contract IPanopticPool)
```

#### Returns

| Name | Type                   | Description |
| ---- | ---------------------- | ----------- |
| \_0  | contract IPanopticPool | undefined   |

### poolUtilization

```solidity
function poolUtilization() external view returns (int128)
```

Returns the fraction of the pool that is locked and not available

_1bps precision. Adding a 1 in the denominator has no sizable effect (?) and prevents division by zero_

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### poolUtilization

```solidity
function poolUtilization(int128 amountRemoved) external view returns (int128)
```

Returns the fraction of the pool that is locked and not available if amountRemoved is moved to AMM

_1bps precision. Adding a 1 in the denominator has no sizable effect (?) and prevents division by zero_

#### Parameters

| Name          | Type   | Description |
| ------------- | ------ | ----------- |
| amountRemoved | int128 | undefined   |

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | int128 | undefined   |

### prefix

```solidity
function prefix() external view returns (string)
```

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | string | undefined   |

### previewDeposit

```solidity
function previewDeposit(uint128 assets) external view returns (uint256)
```

#### Parameters

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| assets | uint128 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### previewMint

```solidity
function previewMint(uint256 shares) external view returns (uint128)
```

#### Parameters

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| shares | uint256 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint128 | undefined   |

### previewRedeem

```solidity
function previewRedeem(uint256 shares) external view returns (uint256)
```

#### Parameters

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| shares | uint256 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### previewWithdraw

```solidity
function previewWithdraw(uint256 assets) external view returns (uint256)
```

#### Parameters

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| assets | uint256 | undefined   |

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### sellCollateralRatio

```solidity
function sellCollateralRatio(int128 utilization) external pure returns (int128 sellRatio)
```

Returns the collateral ratio that is paid when a short option is minted at a specific pool utilization

_This is computed at the time the position is minted_

#### Parameters

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| utilization | int128 | undefined   |

#### Returns

| Name      | Type   | Description |
| --------- | ------ | ----------- |
| sellRatio | int128 | undefined   |

### symbol

```solidity
function symbol() external view returns (string)
```

Returns the symbol of the underlying token

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| \_0  | string | undefined   |

### tickSpacing

```solidity
function tickSpacing() external view returns (int24)
```

#### Returns

| Name | Type  | Description |
| ---- | ----- | ----------- |
| \_0  | int24 | undefined   |

### totalBalance

```solidity
function totalBalance() external view returns (uint256)
```

Returns the total balance of underlying token availale in the Panoptic pool

_This is the total balance MINUS the amount of collected fees (because they are reserved for short options) PLUS the amount of tokens moved to the AMM._

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```

_See {IERC20-totalSupply}._

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### underlyingToken

```solidity
function underlyingToken() external view returns (address)
```

Address of the underlying token

_This has to be equal to token0 or token1 from the uniswapPool_

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

### uniswapPool

```solidity
function uniswapPool() external view returns (contract IUniswapV3Pool)
```

#### Returns

| Name | Type                    | Description |
| ---- | ----------------------- | ----------- |
| \_0  | contract IUniswapV3Pool | undefined   |

## Methods - onlyOwner

### burn

```solidity
function burn(address from, uint256 amount) external nonpayable
```

Burn collateral tokens from some user

#### Parameters

| Name   | Type    | Description                                           |
| ------ | ------- | ----------------------------------------------------- |
| from   | address | Address of the user that gets the collateral tokens burn |
| amount | uint256 | Amount of collateral tokens that will get burned         |

### delegate

```solidity
function delegate(address delegator, address delegatee, uint128 assets) external nonpayable returns (uint256 shares)
```

#### Parameters

| Name      | Type    | Description |
| --------- | ------- | ----------- |
| delegator | address | undefined   |
| delegatee | address | undefined   |
| assets    | uint128 | undefined   |

#### Returns

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| shares | uint256 | undefined   |

### depositToken

```solidity
function depositToken(address _user, uint128 _assets) external nonpayable returns (uint256 shares)
```

Deposit tokens into the Panoptic pool

#### Parameters

| Name     | Type    | Description                                 |
| -------- | ------- | ------------------------------------------- |
| \_user   | address | Address of the user that deposits the token |
| \_assets | uint128 | Amount of assets to be deposited            |

#### Returns

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| shares | uint256 | undefined   |

### exerciseAddData

```solidity
function exerciseAddData(address optionOwner, uint128 borrowedAssets, int128 transactedAmount, int128 collectedAmount, int128 premium) external nonpayable returns (int128 tokenToPay)
```

_To be issued when a position is burnt because it may need to be exercised_

#### Parameters

| Name             | Type    | Description |
| ---------------- | ------- | ----------- |
| optionOwner      | address | undefined   |
| borrowedAssets   | uint128 | undefined   |
| transactedAmount | int128  | undefined   |
| collectedAmount  | int128  | undefined   |
| premium          | int128  | undefined   |

#### Returns

| Name       | Type   | Description |
| ---------- | ------ | ----------- |
| tokenToPay | int128 | undefined   |

### mint

```solidity
function mint(address to, uint256 amount) external nonpayable
```

Mint new collateral tokens to some user

#### Parameters

| Name   | Type    | Description                                      |
| ------ | ------- | ------------------------------------------------ |
| to     | address | Address of the user that gets the collateral tokens |
| amount | uint256 | Amount of collateral tokens that will get minted    |

### revoke

```solidity
function revoke(address delegator, address delegatee, int256 bonus, int128 premium, uint256[] delegateePositionIdList) external nonpayable returns (uint256 adjustedShares, uint128 adjustedAssets)
```

_must always revoke all_

#### Parameters

| Name                    | Type      | Description |
| ----------------------- | --------- | ----------- |
| delegator               | address   | undefined   |
| delegatee               | address   | undefined   |
| bonus                   | int256    | undefined   |
| premium                 | int128    | undefined   |
| delegateePositionIdList | uint256[] | undefined   |

#### Returns

| Name           | Type    | Description |
| -------------- | ------- | ----------- |
| adjustedShares | uint256 | undefined   |
| adjustedAssets | uint128 | undefined   |

### startToken

```solidity
function startToken(address underlyingAddress) external nonpayable
```

Initialized a new token after a Panoptic Pool has been created

#### Parameters

| Name              | Type    | Description |
| ----------------- | ------- | ----------- |
| underlyingAddress | address | undefined   |

### swapTakeCommissionAddData

```solidity
function swapTakeCommissionAddData(address optionOwner, uint128 borrowedAssets, int128 transactedAmount) external nonpayable returns (int128 rate)
```

_To be issued when a position is burnt because it may need to be exercised_

#### Parameters

| Name             | Type    | Description |
| ---------------- | ------- | ----------- |
| optionOwner      | address | undefined   |
| borrowedAssets   | uint128 | undefined   |
| transactedAmount | int128  | undefined   |

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| rate | int128 | undefined   |

### takeCommissionAddData

```solidity
function takeCommissionAddData(address optionOwner, uint128 borrowedAssets) external nonpayable returns (int128 rate)
```

_To be issued when a position is minted_

#### Parameters

| Name           | Type    | Description |
| -------------- | ------- | ----------- |
| optionOwner    | address | undefined   |
| borrowedAssets | uint128 | undefined   |

#### Returns

| Name | Type   | Description |
| ---- | ------ | ----------- |
| rate | int128 | undefined   |

### withdrawToken

```solidity
function withdrawToken(address _user, uint256 shares, int128 _premium, uint256[] _positionIdList) external nonpayable returns (uint128 _assets)
```

Withdraws tokens from the Panoptic pool

_Takes into consideration the delegated tokens, cannot withdraw delegated balance_

#### Parameters

| Name             | Type      | Description                                                             |
| ---------------- | --------- | ----------------------------------------------------------------------- |
| \_user           | address   | Address of the user that deposits the token                             |
| shares           | uint256   | undefined                                                               |
| \_premium        | int128    | Amount of premium collected/owed by \_user                              |
| \_positionIdList | uint256[] | List of positions owned by \_user. Written as [tokenId1, tokenId2, ...] |

#### Returns

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| \_assets | uint128 | undefined   |




## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value)
```

#### Parameters

| Name              | Type    | Description |
| ----------------- | ------- | ----------- |
| owner `indexed`   | address | undefined   |
| spender `indexed` | address | undefined   |
| value             | uint256 | undefined   |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 value)
```

#### Parameters

| Name           | Type    | Description |
| -------------- | ------- | ----------- |
| from `indexed` | address | undefined   |
| to `indexed`   | address | undefined   |
| value          | uint256 | undefined   |


## ABI

<details>
<summary>CollateralTracker ABI</summary>

```json
[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "BUY_COLLATERAL_RATIO",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "COLLATERAL_MARGIN_RATIO",
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
    "name": "COMMISSION_FEE_MAX",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "COMMISSION_FEE_MIN",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "COMMISSION_START_UTILIZATION",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DECIMALS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DECIMALS_128",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DETAILS",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EXERCISE_COST",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_LIQUIDATION_RATIO",
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
    "name": "PREFIX",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SATURATED_POOL_UTILIZATION",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SELL_COLLATERAL_RATIO",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TARGET_POOL_UTILIZATION",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "x",
        "type": "int256"
      }
    ],
    "name": "abs",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int128",
        "name": "x",
        "type": "int128"
      }
    ],
    "name": "abs128",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
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
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "value",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "long",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "utilization",
        "type": "uint64"
      }
    ],
    "name": "baseRequirement",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "required",
        "type": "uint128"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int128",
        "name": "utilization",
        "type": "int128"
      }
    ],
    "name": "buyCollateralRatio",
    "outputs": [
      {
        "internalType": "int128",
        "name": "buyCollateral",
        "type": "int128"
      }
    ],
    "stateMutability": "pure",
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
        "internalType": "int24",
        "name": "currentTick",
        "type": "int24"
      },
      {
        "internalType": "uint64",
        "name": "utilization",
        "type": "uint64"
      },
      {
        "internalType": "int128",
        "name": "longAmount",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "shortAmount",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "premiumAllPositions",
        "type": "int128"
      },
      {
        "internalType": "uint256",
        "name": "offset",
        "type": "uint256"
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
        "internalType": "uint256",
        "name": "tokenData",
        "type": "uint256"
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
        "internalType": "int24",
        "name": "currentTick",
        "type": "int24"
      },
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "offset",
        "type": "uint256"
      },
      {
        "internalType": "int128",
        "name": "premiumAllPositions",
        "type": "int128"
      }
    ],
    "name": "checkHealth",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenData",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collectedFees",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "commissionRate",
    "outputs": [
      {
        "internalType": "int128",
        "name": "commissionFee",
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
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "otherTokenData",
        "type": "uint256"
      },
      {
        "internalType": "int24",
        "name": "currentTick",
        "type": "int24"
      },
      {
        "internalType": "uint160",
        "name": "sqrtPriceX96",
        "type": "uint160"
      },
      {
        "internalType": "int128",
        "name": "premium",
        "type": "int128"
      }
    ],
    "name": "computeBonus",
    "outputs": [
      {
        "internalType": "int256",
        "name": "bonusRatio",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "tokenData",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "computePoolData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentTotalBalance",
        "type": "uint256"
      },
      {
        "internalType": "int128",
        "name": "insideAMM",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "totalCollectedFees",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
      }
    ],
    "name": "convertToAssets",
    "outputs": [
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
    "inputs": [
      {
        "internalType": "uint128",
        "name": "assets",
        "type": "uint128"
      }
    ],
    "name": "convertToShares",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
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
        "name": "delegator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "delegatee",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "assets",
        "type": "uint128"
      }
    ],
    "name": "delegate",
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
        "name": "delegator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "delegatee",
        "type": "address"
      }
    ],
    "name": "delegatedShares",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "_assets",
        "type": "uint128"
      }
    ],
    "name": "depositToken",
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
        "name": "optionOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "currentTickPriceFee",
        "type": "uint256"
      },
      {
        "internalType": "int128",
        "name": "movedAssets",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "swappedAmount",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "collectedAmount",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "currentPositionPremium",
        "type": "int128"
      }
    ],
    "name": "exerciseAddData",
    "outputs": [
      {
        "internalType": "int128",
        "name": "tokenToPay",
        "type": "int128"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int24",
        "name": "currentTick",
        "type": "int24"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "exerciseCost",
    "outputs": [
      {
        "internalType": "int128",
        "name": "exerciseFee",
        "type": "int128"
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
      },
      {
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
      },
      {
        "internalType": "int24",
        "name": "tick",
        "type": "int24"
      },
      {
        "internalType": "uint128",
        "name": "poolUtilizations",
        "type": "uint128"
      }
    ],
    "name": "getPositionCollateralAtTick",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "combinedTokenRequired",
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
        "internalType": "int24",
        "name": "currentTick",
        "type": "int24"
      },
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "offset",
        "type": "uint256"
      }
    ],
    "name": "getUserRequiredCollateral",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "tokenRequired",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "inAMM",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
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
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
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
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "sharesRequired",
        "type": "uint256"
      }
    ],
    "name": "liquidationBonus",
    "outputs": [
      {
        "internalType": "int256",
        "name": "bonus",
        "type": "int256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int24",
        "name": "a",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "b",
        "type": "int24"
      }
    ],
    "name": "max24",
    "outputs": [
      {
        "internalType": "int24",
        "name": "",
        "type": "int24"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int24",
        "name": "a",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "b",
        "type": "int24"
      }
    ],
    "name": "min24",
    "outputs": [
      {
        "internalType": "int24",
        "name": "",
        "type": "int24"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
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
    "inputs": [],
    "name": "panopticPool",
    "outputs": [
      {
        "internalType": "contract IPanopticPool",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolUtilization",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
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
        "name": "delegator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "delegatee",
        "type": "address"
      },
      {
        "internalType": "int24",
        "name": "currentTick",
        "type": "int24"
      },
      {
        "internalType": "int128",
        "name": "bonus",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "premium",
        "type": "int128"
      },
      {
        "internalType": "uint256[]",
        "name": "delegateePositionIdList",
        "type": "uint256[]"
      }
    ],
    "name": "revoke",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "adjustedShares",
        "type": "uint256"
      },
      {
        "internalType": "uint128",
        "name": "adjustedAssets",
        "type": "uint128"
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
      }
    ],
    "name": "s_delegatedAmount",
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
      }
    ],
    "name": "s_delegation",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int128",
        "name": "utilization",
        "type": "int128"
      }
    ],
    "name": "sellCollateralRatio",
    "outputs": [
      {
        "internalType": "int128",
        "name": "sellCollateral",
        "type": "int128"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "underlyingAddress",
        "type": "address"
      }
    ],
    "name": "startToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "optionOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "currentTickPriceFee",
        "type": "uint256"
      },
      {
        "internalType": "int128",
        "name": "longAmount",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "shortAmount",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "collectedAmount",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "premium",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "swappedAmount",
        "type": "int128"
      },
      {
        "internalType": "uint256[]",
        "name": "positionIdList",
        "type": "uint256[]"
      }
    ],
    "name": "takeCommissionAddData",
    "outputs": [
      {
        "internalType": "int256",
        "name": "rateAndUtilization",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "tokenData",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
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
    "name": "totalBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
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
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
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
    "inputs": [],
    "name": "underlyingToken",
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
    "name": "uniswapPool",
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
    "inputs": [],
    "name": "univ3token0",
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
    "name": "univ3token1",
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
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "int24",
        "name": "_currentTick",
        "type": "int24"
      },
      {
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
      },
      {
        "internalType": "int128",
        "name": "_premium",
        "type": "int128"
      },
      {
        "internalType": "uint256[]",
        "name": "_positionIdList",
        "type": "uint256[]"
      }
    ],
    "name": "withdrawToken",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "_assets",
        "type": "uint128"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```
</details>
