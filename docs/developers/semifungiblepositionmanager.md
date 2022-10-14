---
sidebar_position: 2
---

# SemiFungiblePositionManager
The SFPM smart contract manages LP position using the ERC1155 interface.

> Semifungible Position Manager for Panoptic. Replaces the functionalities of the Nonfungible Position manager, and more.
> Wraps up to 4-legged Uniswap V3 positions in the ERC1155 non-fungible token interface

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<ThemedImage
  alt="Commissions"
  sources={{
    light: useBaseUrl('/img/SFPM-architecture.svg'),
    dark: useBaseUrl('/img/SFPM-architecture.svg'),
  }}
/>


## Write Methods

### initializePool

```solidity
function initializePool(
    address token0,
    address token1,
    uint24 fee
) external nonpayable
```

Initialized a Uniswap v3 pool in the SemifungiblePositionManager contract

*Reverts if already initialized, should be called when a position is created for the first time*

#### Parameters

| Name | Type | Description |
|---|---|---|
| token0 | address | The contract address of token0 of the pool |
| token1 | address | The contract address of token1 of the pool |
| fee | uint24 | The fee amount of the v3 pool for the specified token pair |


### mintTokenizedPosition

```solidity
function mintTokenizedPosition(
    uint256 tokenId,
    uint128 positionSize,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external nonpayable returns (int256 totalCollected, int256 totalSwapped)
```

Creates a new position containing up to 4 legs wrapped in a ERC1155 token.

*Reverts if the user touches an existing leg.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | The tokenId of the minted position, which encodes information about up to 4 legs |
| positionSize | uint128 | The number of contracts minted, expressed in terms of the numeraire |
| tickLimitLow | int24 | The lower price slippage limit when minting an ITM position (set to zero for no swapping) |
| tickLimitHigh | int24 | The higher slippage limit when minting an ITM position (set to zero for no swapping) |

#### Returns

| Name | Type | Description |
|---|---|---|
| totalCollected | int256 | A LeftRight encoded word containing the total amount of token0 and token1 swapped if minting ITM |
| totalSwapped | int256 | A LeftRight encoded word containing the total amount of token0 and token1 collected as fees |

### burnTokenizedPosition

```solidity
function burnTokenizedPosition(
    uint256 tokenId,
    uint128 positionSize,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external nonpayable returns (int256 totalCollected, int256 totalSwapped)
```

Burns a new position containing up to 4 legs wrapped in a ERC1155 token.

*Auto-collect all accumulated fees.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | The tokenId of the minted position, which encodes information about up to 4 legs |
| positionSize | uint128 | The number of contracts minted, expressed in terms of the numeraire |
| tickLimitLow | int24 | The lower price slippage limit when minting an ITM position (set to zero for no swapping) |
| tickLimitHigh | int24 | The higher slippage limit when minting an ITM position (set to zero for no swapping) |

#### Returns

| Name | Type | Description |
|---|---|---|
| totalCollected | int256 | A LeftRight encoded word containing the total amount of token0 and token1 swapped if minting ITM |
| totalSwapped | int256 | A LeftRight encoded word containing the total amount of token0 and token1 collected as fees |


### rollTokenizedPositions

```solidity
function rollTokenizedPositions(
    uint256 oldTokenId,
    uint256 newTokenId,
    uint128 positionSize,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external payable returns (int256 totalSwappedBurn, int256 totalCollectedBurn, int256 totalSwappedMint, int256 totalCollectedMint)
```

Roll a position containing up to 4 legs wrapped in oldTokenId to newTokenId.

*Will either i) perform burnTokenizedPosition then mintTokenizedPosition, ii) create a new tokenId that only rolls the touched legs or iii) moves liquidity between pool by calling burn in the mint callback*

#### Parameters

| Name | Type | Description |
|---|---|---|
| oldTokenId | uint256 | The tokenId of the burnt position |
| newTokenId | uint256 | The tokenId of the newly minted position |
| positionSize | uint128 | The number of contracts minted, expressed in terms of the numeraire |
| tickLimitLow | int24 | The lower price slippage limit when minting an ITM position (set to zero for no swapping) |
| tickLimitHigh | int24 | The higher slippage limit when minting an ITM position (set to zero for no swapping) |

#### Returns

| Name | Type | Description |
|---|---|---|
| totalSwappedBurn | int256 | A LeftRight encoded word containing the total amount of token0 and token1 swapped if burned ITM |
| totalCollectedBurn | int256 | A LeftRight encoded word containing the total amount of token0 and token1 collected as fees when burning the position |
| totalSwappedMint | int256 | A LeftRight encoded word containing the total amount of token0 and token1 swapped if minted ITM |
| totalCollectedMint | int256 | A LeftRight encoded word containing the total amount of token0 and token1 collect as fees when minting the position |


## View Methods

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

*Computes accountFeesBase[keccak256(abi.encodePacked(univ3poolAddress, owner, tickLower, tickUpper))

]feesBase0 is computed as FullMath.mulDiv(feeGrowthInside0X128, legLiquidity, FixedPoint128.Q128)*

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

*Computes accountLiquidity[keccak256(abi.encodePacked(univ3poolAddress, owner, tickLower, tickUpper))]*

#### Parameters

| Name | Type | Description |
|---|---|---|
| univ3poolAddress | address | undefined |
| owner | address | undefined |
| tickLower | int24 | The upper end of the tick range for the position (int24) |
| tickUpper | int24 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| liquidity | uint128 | The liquidity of the position described by the input parameters |

## Events

### TokenizedPositionBurnt

```solidity
event TokenizedPositionBurnt(
    address indexed recipient,
    uint256 indexed tokenId,
    uint128 positionSize
)
```

Emitted when a position is burnt



#### Parameters

| Name | Type | Description |
|---|---|---|
| recipient `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |
| positionSize  | uint128 | undefined |


### TokenizedPositionMinted

```solidity
event TokenizedPositionMinted(
    address indexed recipient,
    uint256 indexed tokenId,
    uint128 positionSize
)
```

Emitted when a position is created



#### Parameters

| Name | Type | Description |
|---|---|---|
| recipient `indexed` | address | undefined |
| tokenId `indexed` | uint256 | undefined |
| positionSize  | uint128 | undefined |

### TokenizedPositionRolled

```solidity
event TokenizedPositionRolled(
    address indexed recipient,
    uint256 indexed oldTokenId,
    uint256 indexed newTokenId,
    uint128 positionSize
)
```

Emitted when a position is rolled (ie. burnt and re-deployed)



#### Parameters

| Name | Type | Description |
|---|---|---|
| recipient `indexed` | address | undefined |
| oldTokenId `indexed` | uint256 | undefined |
| newTokenId `indexed` | uint256 | undefined |
| positionSize  | uint128 | undefined |

## ABI

<details>
<summary>SemiFungiblePositionManager ABI</summary>

```json
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_WETH9",
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
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
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
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
      }
    ],
    "name": "TokenizedPositionBurnt",
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
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
      }
    ],
    "name": "TokenizedPositionMinted",
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
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
      }
    ],
    "name": "TokenizedPositionRolled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
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
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "TransferBatch",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
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
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "TransferSingle",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "value",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "URI",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "WETH9",
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
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
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
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      }
    ],
    "name": "balanceOfBatch",
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
        "name": "tickLimitLow",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "tickLimitHigh",
        "type": "int24"
      }
    ],
    "name": "burnTokenizedPosition",
    "outputs": [
      {
        "internalType": "int256",
        "name": "totalCollected",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "totalSwapped",
        "type": "int256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
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
        "name": "univ3poolAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "int24",
        "name": "tickLower",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "tickUpper",
        "type": "int24"
      }
    ],
    "name": "getAccountFeesBase",
    "outputs": [
      {
        "internalType": "int128",
        "name": "feesBase0",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "feesBase1",
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
        "name": "univ3poolAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "int24",
        "name": "tickLower",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "tickUpper",
        "type": "int24"
      }
    ],
    "name": "getAccountLiquidity",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "liquidity",
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
        "name": "token0",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "token1",
        "type": "address"
      },
      {
        "internalType": "uint24",
        "name": "fee",
        "type": "uint24"
      }
    ],
    "name": "initializePool",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
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
        "name": "tickLimitLow",
        "type": "int24"
      },
      {
        "internalType": "int24",
        "name": "tickLimitHigh",
        "type": "int24"
      }
    ],
    "name": "mintTokenizedPosition",
    "outputs": [
      {
        "internalType": "int256",
        "name": "totalCollected",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "totalSwapped",
        "type": "int256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "refundETH",
    "outputs": [],
    "stateMutability": "payable",
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
        "internalType": "uint128",
        "name": "positionSize",
        "type": "uint128"
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
    "name": "rollTokenizedPositions",
    "outputs": [
      {
        "internalType": "int256",
        "name": "totalSwappedBurn",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "totalCollectedBurn",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "totalSwappedMint",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "totalCollectedMint",
        "type": "int256"
      }
    ],
    "stateMutability": "payable",
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
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeBatchTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountMinimum",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "sweepToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount0Owed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1Owed",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "uniswapV3MintCallback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "amount0Delta",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "amount1Delta",
        "type": "int256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "uniswapV3SwapCallback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountMinimum",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "unwrapWETH9",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "uri",
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
    "stateMutability": "payable",
    "type": "receive"
  }
]

```

</details>
