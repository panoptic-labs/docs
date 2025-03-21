---
sidebar_position: 0
---

# Smart Contracts Overview
Panoptic is a protocol that facilitates the trading of [Panoptions](/docs/terms/panoption), which are perpetual options instruments with fixed gamma between two prices that operate on a [streaming premium model](/docs/product/streamia). Under the hood, this consists of two components:
1. A lending market for Uniswap liquidity chunks that allows option sellers (lenders) to earn a [multiplier](/docs/product/spread) on Uniswap fees paid by borrowers (option buyers) that utilize their liquidity.
2. An [undercollateralized](/docs/product/leverage), [commissions-based](/docs/panoptic-protocol/commission) token [lending protocol](/blog/bringing-passive-liquidity-to-uniswap) that gives option sellers flexibility in managing their positions — allowing them to modify their payoffs and LP on Uniswap with more capital efficiency.

---
## Protocol Parameters
The Panoptic protocol is governed by a set of immutable parameters used to calculate collateral requirements, streamia, fees, price feeds, and more. These parameters are shared across all Panoptic instances and set once on each chain. To read more about the parameters and their current values, visit the [parameters](/docs/contracts/parameters) page.

## Pool Criteria
Panoptic Pools can be deployed permissionlessly by anyone, but pools listed on our interface must meet a certain set of criteria before they can be traded. To read more about the listing criteria and learn how to ensure a pool appears on our interface, visit the [pool criteria](/docs/contracts/pool-criteria) page.

## Architecture & Contracts (Panoptic V1.1)
Panoptic V1.1 is an upgrade to Panoptic V1 that introduces the ability to create options markets on Uniswap V4 pools. The upgrade adds support for native ETH and native token pools on other chains, as well as pools with hooks (expansions to Uniswap V4) with the permissions `beforeInitialize`, `afterInitialize`, `beforeDonate`, `afterDonate`, `beforeSwap`, `afterSwap`, `beforeSwapReturnDelta`, and `afterSwapReturnDelta`. Panoptic V1.1 still uses V3-style oracles (which can consist of a Uniswap V3 pool or a Uniswap V4 hook that exposes the same interface).
  
### Directory
- [CollateralTracker](/docs/contracts/V1.1/contract.CollateralTracker)
  - Tracks and manages collateral using a shares model.
- [PanopticFactory](/docs/contracts/V1.1/contract.PanopticFactory)
  - Deploys an options market on top of an existing Uniswap V4 pool. 
- [PanopticPool](/docs/contracts/V1.1/contract.PanopticPool)
  - Creates and manages undercollateralized options. Manages positions, collateral, liquidations and forced exercises.
- [SemiFungiblePositionManager](/docs/contracts/V1.1/contract.SemiFungiblePositionManager)
  - The Semi-fungible Position Manager contract for Panoptic acts as a position manager for Uniswap V4 LPs. Wraps up to 4-legged Uniswap V4 positions in the ERC1155 semi-fungible token interface.
- [base](/docs/contracts/V1.1/base/abstract.Multicall)
  - Inherited metadata and multicall contracts
- [interfaces](/docs/contracts/V1.1/interfaces/interface.IV3CompatibleOracle)
  - Custom interfaces used in the contracts
- [libraries](/docs/contracts/V1.1/libraries/library.Constants)
- [tokens](/docs/contracts/V1.1/tokens/interfaces/interface.IERC20Partial)
  - Token implementations and interfaces used in the contracts
- [types](/docs/contracts/V1.1/types/library.LeftRightLibrary)
  - Custom data types used in the contracts

## Architecture & Contracts (Panoptic V1)

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

##
<ThemedImage
  alt="Commissions"
  sources={{
    light: useBaseUrl('/img/protocol-architecture.svg'),
    dark: useBaseUrl('/img/protocol-architecture.svg'),
  }}
/>

Panoptic V1.0 is the original version of the Panoptic Protocol. It facilitates options markets over Uniswap V3 pools.

### Directory
- [CollateralTracker](/docs/contracts/V1.0/contract.CollateralTracker)
  - Tracks and manages collateral using a shares model.
- [PanopticFactory](/docs/contracts/V1.0/contract.PanopticFactory)
  - Deploys an options market on top of an existing Uniswap V3 pool. 
- [PanopticPool](/docs/contracts/V1.0/contract.PanopticPool)
  - Creates and manages undercollateralized options. Manages positions, collateral, liquidations and forced exercises.
- [SemiFungiblePositionManager](/docs/contracts/V1.0/contract.SemiFungiblePositionManager)
  - The Semi-fungible Position Manager contract for Panoptic replaces the functionalities of the Nonfungible Position Manager from Uniswap v3-periphery. Wraps up to 4-legged Uniswap V3 positions in the ERC1155 semi-fungible token interface.
- [base](/docs/contracts/V1.0/base/abstract.Multicall)
  - Inherited metadata and multicall contracts
- [libraries](/docs/contracts/V1.0/libraries/library.CallbackLib)
- [tokens](/docs/contracts/V1.0/tokens/interfaces/interface.IERC20Partial)
  - Token implementations and interfaces used in the contracts
- [types](/docs/contracts/V1.0/types/library.LeftRightLibrary)
  - Custom data types used in the contracts
