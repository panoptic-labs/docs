---
sidebar_position: 3
---
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
                

# Protocol design
The key ideas behind Panoptic.

## What is the relationship between Panoptic and Uniswap v3?
    
The core idea behind Perpetual Options is that Uniswap v3 liquidity provider (LP) positions can be seen as tokenized short puts.
This core result emerges from the simple observation that providing concentrated liquidity in Uniswap v3 generates a payoff that is mathematically identical to selling a put option.  

import PanopticUniswapRelationship from './PanopticUniswapRelationship';

<PanopticUniswapRelationship />

This means that Uniswap v3 LP tokens can be used as a primitive for an options contract.
While users can already sell options by providing liquidity in the UniswapV3Pool smart contracts, what Panoptic enables is the capital-efficient minting of options in a "peer-to-protocol" manner by facilitating the minting of LP tokens as long/short puts and calls.

<ThemedImage    
  alt="Uniswap v3 <> Panoptic"
  sources={{
    light: useBaseUrl('/img/panoptic-univ3.svg'),
    dark: useBaseUrl('/img/panoptic-univ3.svg'),
  }}
/>

At a core level, Panoptic has deployed a smart contract that replaces the `NonFungiblePositionManager.sol` (NFPM) smart contract from `v3-periphery`.
This "new" smart contract, called the `SemiFungiblePositionMananger.sol` (SFPM), uses the `ERC1155` interface to track positions within Uniswap v3.

The SFPM and the NFPM both interact with the `UniswapV3Pool.sol` smart contracts to deploy and track liquidity positions, with the SFPM replicating all the basic functionalities of the NFPM but with a significant decrease in gas costs.
The Panoptic interface allows existing Uniswap v3 liquidity providers to easily migrate their positions from NFPM to SFPM. 

## Permissionless, Perpetual Options
Options positions in Panoptic have no expiration.
Anyone can sell an option at any strike on any asset.
Buyers can purchase any option that has been sold beforehand.
Panoptic aims to transform the way users trade options the same way Uniswap transformed on-chain spot trading.

## Oracle-free Pricing
The key difference between the pricing of regular options in TradFi and in Panoptic is the way the premium is calculated. Instead of requiring users to pay for their options upfront, the pricing of a Panoptic option is path-dependent and will grow at each block as long as the spot price is [within range](https://panoptic.xyz/docs/terms/in_range) of the option strike price.
While this may create an extra level of uncertainty for options buyers (it is impossible to know ahead of time how much an option will cost), one of the advantages of the path-dependent pricing model is that some options may cost nothing even if it is held for several days.

## Capital Efficiency
Options sellers in Panoptic are able to write undercollateralized options.
The collateral required to sell an option can be as low as 20% of the notional value of that option and follows leverage recommendations from the CBOE and the Financial Industry Regulatory Authority (FINRA).
Undercollateralized options aim to more accurately reflect the risks associated with selling options compared to fully-collateralized options.

## Fees
Users pay fees in three scenarios.
1. When a new option is minted, the options trader pays a commission fee equal to 10 bps of the notional value of the option to the [Panoptic liquidity providers (PLPs)](https://panoptic.xyz/docs/panoptic-protocol/protocol-roles#panoptic-liquidity-providers-plps).
There is no commission fee when burning an option.

2. Users pay a trading fee whenever an option is minted or burned [in the money](https://panoptic.xyz/docs/terms/in_the_money).
This is to compensate PLPs for the increased risk of insolvency on options with high intrinsic value. This is because deep ITM positions' intrinsic value is more volatile.

3. Users pay a swap fee whenever an in-the-money option is minted, burned, or rolled. This fee is to compensate for the swap fee (and price impact) that is paid to the Uniswap v3 pool as a result of assets being swapped in the Uniswap v3 pool, and it is set to be equal to twice (2x) the Uniswap pool swap fee.

## Computed quantities 
Several computed quantities are derived from the token balance in the Panoptic and Uniswap v3 pools.

### Total Balance
The `totalAssets()` value is the amount of tokens inside the `PanopticPool` smart contract PLUS the amount that has already been moved to the Uniswap v3 pool MINUS the amount of fees that has been collected and "locked" until it needs to be paid to the options sellers.
This derived quantity is used to compute the collateral shares.

```solidity
>pp = IPanopticPool
>univ3pool = IUniswapV3Pool
>token0 = IERC20 interface of the collateral token                           | token0.balanceOf(pp) =
                                                                          _--| amount of token0 owned
                                                                         /   | by the Panoptic Pool
    _----------------pp.totalAssets()---------------_                  /
   /                                                  \                /
  |   _----pp.inAMM0()---_     _--------------token0.balanceOf(pp)---------------_
  |  /                    \   /                        |  _---pp.locked0()--_  \
  | |  amount of token0    | |  amount of `free` token | /                      \  |
  | |  moved from Panoptic | |   that can be withdrawn ||   collected token0,    | |
  | |   to UniswapV3       | |   or used to sell       ||    reserved to be      | |
  | |                      | |   undercollateralized   | \    paid to sellers   /  |
  |  \                    /   \     options            |  ¯--------------------¯  /
  |   ¯------------------¯     ¯-----------------------+-------------------------¯
   \                                                  /
    ¯------------------------------------------------¯

```

### Pool Utilization
The pool utilization is a measure of the fraction of the `totalAssets()` which belongs to the Uniswap v3 pool.
This parameter is computed whenever a position is minted to set the collateralization ratio of the position (calculations shown below).



```solidity
poolUtilization = pp.inAMM() / pp.totalAssets();
                = pp.inAMM() / (pp.inAMM() + `free` token0)
                = pp.inAMM() / (pp.inAMM() + token0.balanceOf(pp) - pp.locked())
```

Here are a few examples of the `poolUtilization` calculation.


First, the pool utilization is equal to 50%, the targeted equilibrium. 
When this happens, the seller collateralization ratio is at its minimum.
```solidity
-Example 1: poolUtilization = 50%  (targeted equilibrium)
   _------pp.totalAssets()--+----------------------_
  /                          |                       \   COMMISSION_RATE       = 10bps
 |     pp.inAMM0()           |    `free` token0       |  BUY_COLLATERAL_RATIO  = 10%
  \                          |                       /   SELL_COLLATERAL_RATIO = 20%
   ¯-------------------------+----------------------¯
```

If the pool utilization increases to 90% or more, then the protocol favors options buying (which returns funds to the Panoptic pool and decreases the pool utilization).
At the same time, the collateralization ratio required for selling an option increases to 100%, which means that all newly minted short options will not increase the pool utilization beyond 90%.
```solidity
-Example 2: poolUtilization = 90% (favors buying)
   _------pp.totalAssets()------------------+------_
  /                                          |       \   COMMISSION_RATE       = 10bps
 |                    pp.inAMM0()            | fT0    |  BUY_COLLATERAL_RATIO  = 5% <- favors buying
  \                                          |       /   SELL_COLLATERAL_RATIO = 100%
   ¯-----------------------------------------+------¯
```


If the pool utilization decreases below 10%, then the pool likely has low trading activity and the liquidity providers will receive a lower return on their investments.
To compensate for this, the collateralization ratio for selling new options is at its minimum (20% of notional).
```solidity
-Example 3: poolUtilization = 10% (favors selling)
   _-----+-----pp.totalAssets()--------------------_
  /      |                                           \   COMMISSION_RATE       = 10bps
 | inAMM0|            `free` token0                   |  BUY_COLLATERAL_RATIO  = 10%
  \      |                                           /   SELL_COLLATERAL_RATIO = 20% <- favors selling
   ¯-----+------------------------------------------¯

```




