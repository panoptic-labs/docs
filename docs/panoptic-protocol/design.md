---
sidebar_position: 3
---
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
                

# Protocol design
What are the key ideas behind Panoptic.

## What is the relationship between Panoptic and Uniswap v3?
    
The core idea behind Perpetual Options is that Uniswap v3 liquidity provider (LP) positions can be seen as tokenized short puts.
This core result emerges from the simple observation that providing concentrated liquidity in Uniswap v3 generates a payoff that is mathematically identical to selling a put option.

This means that Uniswap v3 LP tokens can be used as a primitive for an option contract.
While users can already sell options by providing liquidity in the UniswapV3Pool smart contracts, what Panoptic enables is the capital-efficient minting of options in a "peer-to-protocol" manner by facilitating the minting of LP tokens as long/short puts and calls.

<ThemedImage    
  alt="Uniswap v3 <> Panoptic"
  sources={{
    light: useBaseUrl('/img/panoptic-univ3.svg'),
    dark: useBaseUrl('/img/panoptic-univ3.svg'),
  }}
/>

At a core level, Panoptic has deployed a smart contract that replaces the `NonFungiblePositionManager.sol` smart contract from `v3-periphery`.
This "new" smart contract, called the `SemiFungiblePositionMananger.sol`, uses the `ERC1155` interface to track positions within Uniswap v3.

The SFPM and the NFPM both interact with the `UniswapV3Pool.sol` smart contracts to deploy and track liquidity positions, with the SFPM replicating all the basic functionalities of NFPM but with a 30% decrease in gas costs.
The Panoptic interface allows existing Uniswap v3 liquidity providers to easily migrate their positions from NFPM to SFPM. 

## Permissionless, perpetual Options
Option positions in Panoptic have no expiration.
Anyone can sell an option at any strike on any asset.
Buyers can purchase any option that has been sold beforehand.
Panoptic aims to transform the way users trade options the same way Uniswap V1 transformed spot trading on-chain.

## Oracle-free Pricing
The key difference between the pricing of regular options in TradFi and in Panoptic is that way premium is calculated: instead of requiring the users to pay for their options upfront, the pricing of an option is path-dependent and will grow at each block according to the proximity of the spot price to the option strike price.
While this may create an extra level of uncertainty for options buyers (it is impossible to know ahead of time how much an option will cost), one of the advantages of the path-dependent pricing model is that some options may cost nothing even if it is held for several days.

## Capital Efficiency
Options sellers in Panoptic are able to write undercollateralized options.
The collateral required to sell an option is equal to approximately 20% of the notional value of that option and follows leverage recommendations from the CBOE and the Financial Industry Regulatory Authority (FINRA)
Undercollateralized options aims to more accurately reflect the risks associated with selling options compared to fully-collateralized options.

## Fees
Users pay fees at two levels.
First, when a new option is minted, the option trader pays a commission fee equal to 60bps of the notional value of the option to the liquidity providers.
There is no commission fee when burning an option.
This commission fee decreases to 20bps when the pool utilization reaches 50% (`poolUtilization` is defined below).

Second, users pay a trading fee whenever an option is minted or burned when it is in-the-money.
This is because minting/burning an in-the-money option  results in some assets being swapped in the Uniswap v3 pool. 
Concretely, this fee exists to compensate for the swap fee that is paid to the Uniswap pool and any price slippage, and it is set to be equal to twice (2x) the pool swap fee.

## Manipulation Protections
Many flash-loan based attacks involve the borrowing of a large amount of funds (sometimes at zero cost!) with the goal of manipulating the price of an asset or token balance in a smart contract.
Importantly, flash-loan attacks require all funds to be paid back in the same block.

To prevent these types of attack, the Panoptic Protocol prevents funds from being withdrawn in the same block they were deposited.
Similarly, options cannot be minted and burned in the same block. 

## Computed quantities 
Several computed quantities are derived from the token balance in the Panoptic and Uniswap v3 pools.

### Total Balance
The `totalBalance()` value is the amount of tokens inside the `PanopticPool` smart contract PLUS the amount that has already been moved to the Uniswap v3 pool MINUS the amount of fees that has been collected and "locked" until it needs to be paid to the options sellers.
This derived quantity is used to compute the collateral shares.

```solidity
>pp = IPanopticPool
>univ3pool = IUniswapV3Pool
>token0 = IERC20 interface of the collateral token                           | token0.balanceOf(pp) =
                                                                          _--| amount of token0 owned
                                                                         /   | by the Panoptic Pool
    _----------------pp.totalBalance()---------------_                  /
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
The pool utilization is a measure of the fraction of the `totalBalance()` which belongs to the Uniswap v3 pool.
This parameter is computed whenever a position is minted to set the collateralization ratio and commission rate of the position (calculations shown below).



```solidity
poolUtilization = pp.inAMM() / pp.totalBalance();
                = pp.inAMM() / (pp.inAMM() + `free` token0)
                = pp.inAMM() / (pp.inAMM() + token0.balanceOf(pp) - pp.locked())
```

Here are a few examples of the `poolUtilization` calculation.


First, the pool utilization is equal to 50%, the targeted equilibrium. 
When this happens, the commission rate is at its minimum, and the Buy/Sell collateralization ratios are at their minimum too.
```solidity
-Example 1: poolUtilization = 50%  (targeted equilibrium)
   _------pp.totalBalance()--+----------------------_
  /                          |                       \   COMMISSION_RATE       = 20bps
 |     pp.inAMM0()           |    `free` token0       |  BUY_COLLATERAL_RATIO  = 10%
  \                          |                       /   SELL_COLLATERAL_RATIO = 20%
   ¯-------------------------+----------------------¯
```

If the pool utilization increases to 90% or more, then the protocol aims to favor options buying (which returns funds to the Panoptic pool and decreases the pool utilization).
At the same time, the collateralization ratio required for selling an option increases to 100%, which means that all newly minted short options will not increase the pool utilization beyond 90%.
```solidity
-Example 2: poolUtilization = 90% (favors buying)
   _------pp.totalBalance()------------------+------_
  /                                          |       \   COMMISSION_RATE       = 20bps
 |                    pp.inAMM0()            | fT0    |  BUY_COLLATERAL_RATIO  = 5% <- favors buying
  \                                          |       /   SELL_COLLATERAL_RATIO = 100%
   ¯-----------------------------------------+------¯
```


If the pool utilization decreases below 10%, then the pool likely has low trading activity and the liquidity providers will receive a lower return on their investments.
To compensate for this, the commission rate is increased to 60bps, and the collateralization ratio for selling new options is at its minimum (20% of notional).
```solidity
-Example 3: poolUtilization = 10% (favors selling)
   _-----+-----pp.totalBalance()--------------------_
  /      |                                           \   COMMISSION_RATE       = 60bps
 | inAMM0|            `free` token0                   |  BUY_COLLATERAL_RATIO  = 10%
  \      |                                           /   SELL_COLLATERAL_RATIO = 20% <- favors selling
   ¯-----+------------------------------------------¯

```




