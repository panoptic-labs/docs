---
sidebar_position: 0
---
# Smart contracts overview
Panoptic smart contracts directly interface with Uniswap V3's core contracts to create an options market.

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

Panoptic deploys contracts that interact with the already-deployed UniswapV3Pool.sol contracts.

# Contents
- [CollateralTracker](/docs/developers/contract.CollateralTracker.md)
  - Tracks and manages collateral using a shares model.
- [PanopticFactory](/docs/developers/contract.PanopticFactory.md)
  - Deploys an options market on top of an existing Uniswap V3 pool. 
- [PanopticPool](/docs/developers/contract.PanopticPool.md)
  - Creates and manages undercollateralized options. Manages positions, collateral, liquidations and forced exercises.
- [SemiFungiblePositionManager](/docs/developers/contract.SemiFungiblePositionManager.md)
  - The Semi-fungible Position Manager contract for Panoptic replaces the functionalities of the Nonfungible Position Manager from Uniswap v3-periphery. Wraps up to 4-legged Uniswap V3 positions in the ERC1155 semi-fungible token interface.
- [base](/docs/developers/base)
  - Inherited metadata and multicall contracts
- [libraries](/docs/developers/libraries)
- [tokens](/docs/developers/tokens)
  - Token implementations and interfaces used in the contracts
- [types](/docs/developers/types)
  - Custom data types used in the contracts


