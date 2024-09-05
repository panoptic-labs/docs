---
sidebar_position: 11
---

# Liquidations

## Introduction
Panoptic enables leveraged options through undercollateralized trading. This cutting-edge approach necessitates a robust mechanism to maintain the health and stability of the protocol, with liquidators playing a pivotal role. These entities are crucial in managing the risks associated with undercollateralized positions, ensuring the system's resilience and reliability.

## Understanding Collateral in Panoptic

### Collateral Mechanics
In Panoptics, collateral is the backbone that supports leveraged options trading. It's a safeguard that provides a buffer against potential market volatility and adverse price movements. All traders must deposit collateral to cover any potential losses from their positions.

### Collateral Requirements
Two critical components of liquidations are the Buyer Collateral Requirement (BCR) and Seller Collateral Requirement (SCR). These requirements are carefully calibrated to match the risk profiles of both options buyers and sellers, ensuring that each party is adequately protected against market fluctuations. You can learn more about the collateral requirements by reading about our [pool parameters](https://panoptic.xyz/blog/gated-launch-parameters#collateral-requirements).

### Liquidation Thresholds
An account becomes liquidatable in a specific pool when its collateral falls short of the required collateral requirement thresholds. This situation typically arises when market movements are unfavorable to the position held by the account, causing the required level to exceed the collateral's value. At this juncture, the account is deemed liquidatable and is subject to being closed out.

## The Liquidation Bot

### Monitoring and Reporting
The liquidation bot is a crucial component of Panoptic. It continuously monitors all positions opened in a pool across all accounts. This surveillance occurs at regular time intervals, ensuring real-time tracking of the collateral status of each position. The bot is programmed to identify accounts that become liquidatable, flagging any account that falls below the required collateral thresholds.

### Liquidation Process
Upon identifying a liquidatable account, the bot triggers an alert. Liquidators can then engage by interacting directly with the smart contracts governing the pool. This direct interaction facilitates the liquidation of underwater accounts, thereby mitigating risk and preserving the integrity of the pool.

### Open Source
Panoptics will make the liquidation bot open source, allowing anyone to use it. This bot is written in Typescript, and by making it publicly available, Panoptic aims to encourage widespread participation. Users can run the bot by hosting it on cloud platforms like AWS, Azure, or Google Cloud. When operated on a supported blockchain, the bot not only contributes to the protection of the protocol but also offers users the opportunity to earn a liquidation bonus, thus aligning individual incentives with the overall health of the system.

### What's Next

#### Automating the Liquidation Process
The next frontier for Panoptics involves automating the liquidation process. Liquidators will be able to link their wallets to the liquidation bot, enabling automated responses to liquidation opportunities. This integration enhances the efficiency of the liquidation process, making it more responsive to market changes.

#### Predictive Capabilities
Further optimization of the liquidation bot will be underway, with a focus on predictiveness. The aim is to equip the bot with the ability to foresee accounts that are on the brink of becoming liquidatable. This predictive capability will allow liquidators to prepare in advance, ensuring they are ready to act when an account crosses the liquidation threshold.

## Technical Details

### Maintenance Margin Requirement
For options that have been minted out-the-money (OTM), the buying power requirement is simply given by the [sell and buy collateral ratio](/docs/panoptic-protocol/buying-power#buying-power-requirement-buying-options).
As the price evolves and an option becomes in-the-money, risks may increase, and the deposited amount of collateral may need to increase to mitigate those risks.

For example, selling an OTM put option initially requires 20% collateralization.
As the price decreases below the strike price, the buying power requirement will increase above 20%.
The exact buying power requirement for a short put at strike $\mathtt{K}$ when the current price is $\mathtt{S}$ and an initial collateral ratio of $\mathtt{C_i}$ is given by:
$$
\mathtt{Buying\ Power\ Requirement = notionalSize \cdot \left(100\% - (100\% - C_i)\cdot\frac{S}{K}\right)}
$$

In contrast, the in-the-money amount (or the amount of funds necessary to cover the option) is always lower than the buying power requirement, and it is defined as $\mathtt{ITM\ amount = notionalSize \cdot\left(100\% - \frac{S}{K} \right)}$.
So, selling a 1000 ETH-USDC put will start with a buying power requirement of 200 USDC when the price is above 1000 but will increase to 500 USDC if the price decreases to 625, whereas the ITM amount will be 375.


### Short Put Buying Power Requirement

The buying power requirement of a short put is limited by the notional value of the option.

```solidity
              Short put BPR = 100% - (100% - SCR)*(price/strike)
BUYING        
_POWER                       
_REQUIREMENT  ^                    .
              |           <- ITM   .  OTM ->
       100% - |--__                .         
              |    ¯¯--__          .
              |          ¯¯--__    .     
        SCR - |                ¯¯--______ 
              |                    .
              +--------------------+--->   current
              0                  strike     price

```

### Short Call Buying Power Requirement

The buying power requirement of a short call can exceed the notional value of the minted option.

```solidity
              Short call BPR = SCR + (100% - SCR)*(price/strike - 1) 
BUYING                                           
_POWER           <- OTM  .  ITM ->            _-¯
_REQUIREMENT  ^          .                 _-¯
              |          .              _-¯
       100% - | -   -   -. -   -   - _-¯  -  - 100%
              |          .        _-¯  .
              |          .     _-¯     .   
              |          .  _-¯        . 
 SELL_RATIO _ |___________-¯           .
              |          .             .
              +----------+-------------+--------> current
              0         strike       2 * strike    price

```



However, users can deposit the asset as collateral in order to mitigate those risks.
In this case, the Buying Power Requirement for short calls (with 100% of the collateral denominated in the asset) is:
```solidity

BUYING         Short call BPR (covered) = 100% - (100% - SCR)*(strike/price) 
_POWER                   .
_REQUIREMENT     <- OTM  .  ITM ->
              ^          .                        100%
       100% - |  -   -   . -   -   -   -   - _____------ 
              |          .      ___----¯¯¯¯¯¯
              |          .  _-¯¯
              | min BRP  . -     
 SELL_RATIO _ |___________¯
              |          .
              +----------+----------------------> current
              0         strike                     price

```

### Account Liquidations 

To determine whether an account is solvent, the Panoptic protocol computes and adds up the collateral requirement for each position. 
The protocol will then compare the amount of user-deposited collateral with the account's total collateral requirement.

Because users can deposit both types of tokens for a token pair to be [cross-collateralized](docs/panoptic-protocol/collateral#cross-collateralization), it is the actual value of the required collateral and of the collateral balance that are compared.
Based on this calculation, an account can be liquidated if `Total value of collateral` < `collateral requirement`


### Liquidation Bonus

The liquidation bonus for liquidating an account is determined by two factors:  
i) *Account Insolvency*: Accounts with greater insolvency offer bigger bonuses, but the bonus is capped at half of the collateral balance.
ii) *Collateral Balance*: Higher collateral balances increase the maximum potential bonus.

The formula for calculating the liquidation bonus is as follows:
`Bonus = min{Collateral Balance / 2, Collateral Requirement at TWAP - Collateral Balance at TWAP}`

The goal of the liquidation system is to incentivize *Panoptic Liquidity Providers* to be liquidators as well, since a healthy liquidation system means the pool will never incur a loss.
