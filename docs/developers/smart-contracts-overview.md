---
sidebar_position: 1
---
# Smart contracts overview
Panoptic smart contracts directly interface with Uniswap v3's core contracts to create an options market.

---

## Architecture & Contracts

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<ThemedImage
  alt="Commissions"
  sources={{
    light: useBaseUrl('/img/protocol-architecture.svg'),
    dark: useBaseUrl('/img/protocol-architecture.svg'),
  }}
/>




### (dependency) [UniswapV3Pool.sol](https://docs.uniswap.org/protocol/reference/core/UniswapV3Pool)
The interface for a Uniswap V3 Pool. A Uniswap pool facilitates swapping and automated market making between any two assets that strictly conform to the ERC20 specification

Panoptic deploys contract that interact with the already-deployed UniswapV3Pool.sol contracts.

### [SemiFungiblePositionManager.sol](/docs/developers/semifungiblepositionmanager)
The SFPM smart contract manages LP position using the ERC1155 interface.

The Semifungible Position Manager contract for Panoptic replaces the functionalities of the Nonfungible Position Manager from Uniswap v3-periphery. Wraps up to 4-legged Uniswap V3 positions in the ERC1155 non-fungible token interface


### [PanopticFactory.sol](/docs/developers/panopticfactory)
Deploys an options market on top of an existing Uniswap v3 pool.


### [PanopticPool.sol](/docs/developers/panopticpool)
Creates and manages undercollateralized options. Manages positions, collateral, liquidations and forced exercises.

Panoptic Pool, create permissionless option on top of Uniswap V3


### [CollateralTracker.sol](/docs/developers/collateral-tracker)
Tracks and manages collateral using a shares model.

### (periphery) NFPMigrator.sol

---


## Protocol Interactions

(diagram here)

### Deposit / Withdraw

### Mint / Burn Position

<ThemedImage
  alt="Commissions"
  sources={{
    light: useBaseUrl('/img/contract-architecture.svg'),
    dark: useBaseUrl('/img/contract-architecture.svg'),
  }}
/>


### Delegate / Revoke

### ForceExercise / Liquidate


---

## Events



---

## Libraries

### TokenId.sol

### LeftRight.sol

