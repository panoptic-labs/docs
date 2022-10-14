---
sidebar_position: 2
---
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
                

# Protocol design
What are the key ideas behind Panoptic.

## What is the relationship between Panoptic and Uniswap v3?
    
The core idea behind Perpetual Options is that Uniswap v3 liquidity provider (LP) positions can be seen as tokenized short puts.
This core results emerges from the simple observation that providing concentrated liquidity in Uniswap v3 generates a payoff that is mathematically identical to selling a put option.
This means that Uniswap v3 LP tokens can be users as a primitive for an option contract.
What Panoptic enables is the minting of options in a "peer-to-protocol" manner by facilitating the minting of LP tokens as long/short puts and calls.

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


## Computed quantities 
Several computed quantities are derived from the token balance in the Panoptic and Uniswap v3 pools.

### Total Balance
The totalBalance() value is the amount of tokens that 1) can be sold and moved to the Uniswap v3 pool or 2) have already moved to the Uniswap v3 pool.
This balance is computed using the total token balance inside the Panoptic pool, obtained by calling `IERC20(token0).balanceOf(panopticPool)`, the amount of tokens moved into the Uniswap v3 pool and the amount of token collected.

This derived quantity is used to compute the collateral shares.

```solidity
>pp = IPanopticPool
>univ3pool = IUniswapV3Pool
>token0 = ERC20 interface of collateral token                                | tolen0.balanceOf(pp) =
                                                                          _--| amount of token0 owned
                                                                         /   | by the Panoptic Pool
    _----------------pp.totalBalance()---------------_                  /
   /                                                  \                /
  |   _----pp.inAMM0()---_     _--------------token0.balanceOf(pp)---------------_
  |  /                    \   /                        |  _---pp.collected0()--_  \
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
This parameter is compute whenever a position is minted to set the collateralization ratio and commission rate of the position (calculations shown below).



```solidity
poolUtilization = pp.inAMM0() / pp.totalBalance();
                = pp.inAMM0() / (pp.inAMM0() + `free` token0)
                = pp.inAMM0() / (pp.inAMM0)) + token0.balanceOf(pp) - pp.collected())



-Example 1: poolUtilization = 50%  (targeted equilibrium)
   _------pp.totalBalance()--+-------------------------_
  /                          |                          \   COMMISSION_RATE       = 20bps
 |     pp.inAMM0()           |     `free` token0         |  BUY_COLLATERAL_RATIO  = 10%
  \                          |                          /   SELL_COLLATERAL_RATIO = 20%
   ¯-------------------------+-------------------------¯



-Example 2: poolUtilization = 90% (favors buying)
   _------pp.totalBalance()---------------------+------_
  /                                             |       \   COMMISSION_RATE       = 20bps
 |                    pp.inAMM0()               | fT0    |  BUY_COLLATERAL_RATIO  = 5%
  \                                             |       /   SELL_COLLATERAL_RATIO = 100%
   ¯--------------------------------------------+------¯



-Example 3: poolUtilization = 10% (favors selling)
   _-----+-----pp.totalBalance()-----------------------_
  /      |                                              \   COMMISSION_RATE       = 60bps
 | inAMM0|            `free` token0                      |  BUY_COLLATERAL_RATIO  = 10%
  \      |                                              /   SELL_COLLATERAL_RATIO = 20%
   ¯-----+---------------------------------------------¯

```


## Manipulation Protections
Many flash-loan based attacks involve the borrowing of a large amount of fund (sometimes at zero cost!) with the goal of manipulate the price of an asset or token balance in a smart contract.
Impartantly, flash-loan attacks require all funds to be paid back in the same block.

The Panoptic Protocol aims to prevent pool manipulation attacks by prevent funds to be withdrawn in the same block they were deposited.
Similarly, delegating funds to an account locks both the `delegator` and `delegatee` accounts for that particular block.



