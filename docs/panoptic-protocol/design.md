---
sidebar_position: 3
---

# Protocol design
What are the key ideas behind Panoptic.

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



