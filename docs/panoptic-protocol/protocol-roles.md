---
sidebar_position: 2
---

# Protocol roles
Ecosystem participants include liquidity providers, options sellers, options buyers, and liquidators.

## Liquidity Providers
Provide fungible liquidity to the options market. 
This liquidity will be lended out to the options traders to allow them to access trading on leverage. 
Funds can be deposited in the Panoptic pools at any ratio.

## Option Sellers
Sell options by borrowing liquidity for a fixed commission fee and relocating it to a Uni v3 pool. 
Sellers have to deposit collateral and can sell options with notional values close to five times larger than their collateral balance.

## Option Buyers
Buy options by moving liquidity out of the Uni v3 pool back to the Panoptic smart contract for a fixed commission fess. 
Buyers also have to deposit collateral (10% of the notional value of the option) to cover the potential premium to be paid to the sellers.

## Liquidators
Ensures the health of the protocol by liquidating accounts whose collateral balance falls below the margin requirements.
Liquidators will receive a bonus proportional to the amount of funds necessary to cover the distressed positions. 
