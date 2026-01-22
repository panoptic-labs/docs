---
sidebar_position: 3
---
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
                

# Protocol design

## What is the relationship between Panoptic and Uniswap?
    
The core idea behind Perpetual Options is that Uniswap liquidity provider (LP) positions can be seen as tokenized short puts.
This core result emerges from the simple observation that providing concentrated liquidity in Uniswap generates a payoff that is mathematically identical to selling a put option.  

import PanopticUniswapRelationship from './PanopticUniswapRelationship';

<PanopticUniswapRelationship />

This means that Uniswap LP tokens can be used as a primitive for an options contract.
While users can already sell options by providing liquidity in the Uniswap smart contracts, what Panoptic enables is the capital-efficient minting of options in a "peer-to-protocol" manner by facilitating the minting of LP tokens as long/short puts and calls.

<ThemedImage    
  alt="Uniswap v3 <> Panoptic"
  sources={{
    light: useBaseUrl('/img/panoptic-univ3.svg'),
    dark: useBaseUrl('/img/panoptic-univ3.svg'),
  }}
/>

At a core level, Panoptic has deployed a smart contract that replaces the `NonFungiblePositionManager.sol` (NFPM) smart contract from `v3-periphery`.
This "new" smart contract, called the `SemiFungiblePositionMananger.sol` (SFPM), uses the `ERC1155` interface to track positions within Uniswap V3 or V4.

The SFPM and the NFPM both interact with the Uniswap smart contracts to deploy and track liquidity positions, with the SFPM replicating all the basic functionalities of the NFPM but with a significant decrease in gas costs.
The Panoptic interface allows existing Uniswap liquidity providers to easily migrate their positions from NFPM to SFPM. 

## Permissionless, Perpetual Options
Options positions in Panoptic have no expiration.
Anyone can sell an option at any strike on any asset.
Buyers can purchase any option that has been sold beforehand.
Panoptic aims to transform the way users trade options the same way Uniswap transformed on-chain spot trading.

## Oracle-free Pricing
The key difference between the pricing of regular options in TradFi and in Panoptic is the way the premium is calculated. Instead of requiring users to pay for their options upfront, the pricing of a Panoptic option is path-dependent and will grow at each block as long as the spot price is [within range](/docs/terms/in_range) of the option strike price.
While this may create an extra level of uncertainty for options buyers (it is impossible to know ahead of time how much an option will cost), one of the advantages of the path-dependent pricing model is that some options may cost nothing even if it is held for several days.

## Capital Efficiency
Options sellers in Panoptic are able to write undercollateralized options.
The collateral required to sell an option can be as low as 20% of the notional value of that option and follows leverage recommendations from the CBOE and the Financial Industry Regulatory Authority (FINRA).
Undercollateralized options aim to more accurately reflect the risks associated with selling options compared to fully-collateralized options.

## Fees
Users pay fees in three scenarios.
1. When a position is opened or closed, the options trader pays a [commission fee](/docs/contracts/parameters#fee-parameters) equal to 1 basis point (0.01%) of the notional value of an opened position and 10 bps (0.1%) of the accrued premium of a closed position.

2. When a user borrows funds from the Panoptic pool to open positions on leverage, the user pays [interest](/docs/panoptic-protocol/V2/interest-accrual) on the borrowed amount. The interest rate is a floating rate which depends on the pool's current utilization vs target utilization.

3. When a user buys an option, the user accumulates [streaming premia (streamia)](/docs/product/streamia) on the position.