---
sidebar_position: 2
---

# SemiFungiblePositionManager
The SFPM smart contract manages LP position using the ERC1155 interface.

> Semifungible Position Manager for Panoptic. Replaces the functionalities of the Nonfungible Position manager, and more.
> Wraps up to 4-legged Uniswap V3 positions in the ERC1155 non-fungible token interface


## Methods - WRITE

### initializePool

```solidity
function initializePool(address token0, address token1, uint24 fee) external nonpayable
```

Initialized a Uniswap v3 pool in the SemifungiblePositionManager contract

_Reverts if already initialized, should be called when a position is created for the first time_

#### Parameters

| Name     | Type    | Description                                                |
| -------- | ------- | ---------------------------------------------------------- |
| `token0` | address | The contract address of token0 of the pool                 |
| `token1` | address | The contract address of token1 of the pool                 |
| `fee`    | uint24  | The fee amount of the v3 pool for the specified token pair |

### mintTokenizedPosition

```solidity
function mintTokenizedPosition(
    uint256 tokenId,
    uint128 numberOfContracts,
    int48 tickLimits
)
    external
    payable
    returns (
        int256 totalAmounts,
        int256 totalSwapped
    )
```

Creates a new position containing up to 4 legs wrapped in a ERC1155 token.

_Reverts if the user touches an existing leg._

#### Parameters

| Name                | Type    | Description                                                                                       |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `tokenId`           | uint256 | The tokenId of the minted position, which encodes information about up to 4 legs                  |
| `numberOfContracts` | uint128 | The number of contracts minted, expressed in terms of token0                                      |
| `tickLimits`        | int48   | LeftRight encoded price slippage limit when minting an ITM position (set to zero for no swapping) |

#### Returns

| Name           | Type   | Description                                                                                                                      |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `totalAmounts` | int256 | A LeftRight encoded word containing the total amount of token0 and token1 moved to the Uniswap Pool (can be negative)            |
| `totalSwapped` | int256 | A LeftRight encoded word containing the total amount of token0 and token1 swapped when liquidity was deployed if tickLimits != 0 |

### burnTokenizedPosition

```solidity
function burnTokenizedPosition(
    uint256 tokenId,
    uint128 numberOfContracts,
    int48 tickLimits
)
    external
    payable
    returns (
        int256 totalAmounts,
        int256 totalCollected,
        int256 totalSwapped
    )
```

Burns a new position containing up to 4 legs wrapped in a ERC1155 token.

_Auto-collect all accumulated fees._

#### Parameters

| Name                | Type    | Description                                                                                     |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `tokenId`           | uint256 | The tokenId of the minted position, which encodes information about up to 4 legs                |
| `numberOfContracts` | uint128 | The number of contracts minted, expressed in terms of token0                                    |
| `tickLimits`        | int48   | LeftRight encoded orice slippage when swapping asset at burn step (set to zero for no swapping) |

#### Returns

| Name             | Type   | Description                                                                                                           |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| `totalAmounts`   | int256 | A LeftRight encoded word containing the total amount of token0 and token1 moved to the Uniswap Pool (can be negative) |
| `totalCollected` | int256 | A LeftRight encoded word containing the total amount of token0 and token1 collected as fees                           |
| `totalSwapped`   | int256 | A LeftRight encoded word containing the total amount of token0 and token1 swapped at collection if tickLimits != 0    |

### rollPosition

```solidity
function rollPosition(
    uint256 oldTokenId,
    uint256 newTokenId
) external payable returns (uint128 numberOfContracts)
```

Roll a position containing up to 4 legs wrapped in oldTokenId to newTokenId.

_Will either i) perform burnTokenizedPosition then mintTokenizedPosition, ii) create a new tokenId that only rolls the touched legs or iii) moves liquidity between pool by calling burn in the mint callback_

#### Parameters

| Name         | Type    | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `oldTokenId` | uint256 | The tokenId of the burnt position        |
| `newTokenId` | uint256 | The tokenId of the newly minted position |

#### Returns

| Name                | Type    | Description                                                  |
| ------------------- | ------- | ------------------------------------------------------------ |
| `numberOfContracts` | uint128 | The number of contracts minted, expressed in terms of token0 |

## Methods - READ

### getAccountFeesBase

```solidity
function getAccountFeesBase(
    address univ3poolAddress,
    address owner,
    int24 tickLower,
    int24 tickUpper
) external view returns (int128 feesBase0, int128 feesBase1)
```

Returns the feesBase associated with a given position.

_Computes accountFeesBase[keccak256(abi.encodePacked(univ3poolAddress, owner, tickLower, tickUpper))]_

_feesBase0 is computed as FullMath.mulDiv(feeGrowthInside0X128, legLiquidity, FixedPoint128.Q128)_

#### Parameters

| Name               | Type    | Description                                              |
| ------------------ | ------- | -------------------------------------------------------- |
| `univ3poolAddress` | address | The address of the Uniswap v3 Pool                       |
| `owner`            | address | The address of the account that is queried               |
| `tickLower`        | int24   | The lower end of the tick range for the position (int24) |
| `tickUpper`        | int24   | The upper end of the tick range for the position (int24) |

#### Returns

| Name        | Type   | Description                             |
| ----------- | ------ | --------------------------------------- |
| `feesBase0` | int128 | The feesBase of the position for token0 |
| `feesBase1` | int128 | The feesBase of the position for token1 |

### getAccountLiquidity

```solidity
function getAccountLiquidity(
    address univ3poolAddress,
    address owner,
    int24 tickLower,
    int24 tickUpper
) external view returns (uint128 liquidity)
```

Returns the liquidity associated with a given position.

_Computes accountLiquidity[keccak256(abi.encodePacked(univ3poolAddress, owner, tickLower, tickUpper))]_

#### Parameters

| Name               | Type    | Description                                              |
| ------------------ | ------- | -------------------------------------------------------- |
| `univ3poolAddress` | address | The address of the Uniswap v3 Pool                       |
| `owner`            | address | The address of the account that is queried               |
| `tickLower`        | int24   | The lower end of the tick range for the position (int24) |
| `tickUpper`        | int24   | The upper end of the tick range for the position (int24) |

#### Returns

| Name         | Type    | Description                                                     |
| ------------ | ------- | --------------------------------------------------------------- |
| `liquidity`  | uint128 | The liquidity of the position described by the input parameters |

## Events

### TokenizedPositionBurnt

```solidity
event TokenizedPositionBurnt(address indexed recipient, uint256 tokenId, uint128 numberOfContracts)
```

Emitted when a position is burnt

#### Parameters

| Name                | Type    | Description |
| ------------------- | ------- | ----------- |
| recipient `indexed` | address | undefined   |
| tokenId             | uint256 | undefined   |
| numberOfContracts   | uint128 | undefined   |

### TokenizedPositionMinted

```solidity
event TokenizedPositionMinted(address indexed recipient, uint256 tokenId, uint128 numberOfContracts)
```

Emitted when a position is created

#### Parameters

| Name                | Type    | Description |
| ------------------- | ------- | ----------- |
| recipient `indexed` | address | undefined   |
| tokenId             | uint256 | undefined   |
| numberOfContracts   | uint128 | undefined   |

### TokenizedPositionRolled

```solidity
event TokenizedPositionRolled(address indexed recipient, uint256 oldTokenId, uint256 newTokenId, uint128 numberOfContracts)
```

Emitted when a position is rolled (ie. burnt and re-deployed)

#### Parameters

| Name                | Type    | Description |
| ------------------- | ------- | ----------- |
| recipient `indexed` | address | undefined   |
| oldTokenId          | uint256 | undefined   |
| newTokenId          | uint256 | undefined   |
| numberOfContracts   | uint128 | undefined   |

