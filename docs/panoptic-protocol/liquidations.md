---
sidebar_position: 10
---

# Liquidations
Accounts can be margin called and liquidated.

## Maintenance Margin Requirement
For options that have been minted out-the-money (OTM), the buying power requirement is simply given by the sell and buy collateral ratio calculated above.
As the price evolves and an option becomes in-the-money, risks may increase and the amount of collateral may need to increase to mitigate those risks.

For example, selling an OTM put option initially requires 20% collateralization.
As the price changes and decreases below the strike price, the buying power requirement will increase above 20%.
The exact buying power requirement for a put at strike $\mathtt{K}$ when the current price is $\mathtt{S}$ and an initial collateral ratio of $\mathtt{C_i}$ is given by:
$$
\mathtt{Buying\ Power\ Requirement = notionalSize \cdot \left(100\% - (100\% - C_i)\cdot\frac{S}{K}\right)}
$$

In contrast, the in-the-money amount (or the amount of funds necessary to cover the option) is always lower than the buying power requirement, and it is defined as $\mathtt{ITM\ amount = notionalSize \cdot\left(100\% - \frac{S}{K} \right)}$.
So, selling a 1000 ETH-USDC put will start with a buying power requirement of 200 USDC when the price is above 1000 but will increase to 500 USDC if the price decreases to 625, whereas the ITM amount will be 400.


### Short Put Buying Power Requirement

The buying power requirement of a put is limited by the notional value of the option.

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

The buying power requirement of a call can exceed the notional value of the minted option.

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
In this case, the Buying Power Requirement for calls (with 100% of the collateral denominated in asset):
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

## Account Liquidations 

To determine whether an account is solvent, the Panoptic protocol computes and adds together the collateral requirement for each position. 
The protocol will then compare the amount of collateral deposited to the accounts's collateral requirement.

Because users can deposit both tokens in a pair and be cross-collateralized, it is the actual value of the required collateral and of the collateral balance that is compared.
Based on that calculation, an account can be liquidated if `Total value of collateral` < `collateral requirement`


### Liquidation Bonus

The liquidation bonus for liquidating an account is determined by two factors: i) the distance between the strike and ii) the current price and the in-the-money amount 

It is worth revisiting the figure shown in the [Margin](/docs/panoptic-protocol/margin) page, where the size of the bonus and the amount of loss incurred by the protocol is highlighted.

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';


<ThemedImage
  alt="Commissions"
  sources={{
    light: useBaseUrl('/img/MarginRequirements.svg'),
    dark: useBaseUrl('/img/MarginRequirements.svg'),
  }}
/>

A few key points from the liquidation process:

1. The liquidatee's collateral is used to exercise the in-the-money options *and* pay the liquidator
2. The bonus to the liquidator will be equal to zero if the price falls below `strike` - `CollateralRequirement`
3. It will stay zero as the price decreases further.
4. The liquidator will be compensated by the protocol loss and will be rewarded by not losing anything (as opposed to the rest of the liquidity providers which will share that loss amongst themselves

The goal of the liquidation system is to incentivize *Liquidity Providers* to be liquidators as well, since a healthy liquidation system means the pool will never incur a loss.
