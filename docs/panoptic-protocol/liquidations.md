---
sidebar_position: 10
---

# Liquidations
Accounts can be margin called and liquidated.


## Margin Calls
## Maintenance Margin Requirement (in-the-money options)
For options that have been minted out-the-money (OTM), the buying power requirement is simply given by the sell and buy collateral ration calculated above.
As the price evolves and an option becomes in-the-money, risks may increase and the amout of collateral may need to increase to mitigate those risks.

For example, selling an OTM put option initially requires 20% collateralization.
As the price changes and decreases below the strike price, the buying power requirement will increase above 20%.
The exact buying power requirement for a put at strike $\mathtt{K}$ when the current price is $\mathtt{S}$ and an initial collateral ratio of $\mathtt{C_i}$ is given by:
$$
\mathtt{Buying\ Power\ Requirement = notionalSize \cdot \left(100\% - (100\% - C_i)\cdot\frac{S}{K}\right)}
$$

In contrast, the in-the-money amount (or the amount of funds necessary to cover the option) is always lower than the buying power requirement, and it is defined as $\mathtt{ITM\ amount = notionalSize \cdot\left(100\% - \frac{S}{K} \right)}$.
So, selling a 1000 ETH-USDC put will start with a buying power requirement of 200 USDC when the price is above 1000 but will increase to 500 USDC if the price decreases to 625, whereas the ITM amount will be 400.


```solidity
                                        .
BUYING                                  .
_POWER                         <- ITM   .  OTM ->
_REQUIREMENT                            .
              ^                         .
       100% - |-__    BPR = 100% - (100% - SCR)*(price/strike)
              |   ¯¯--__                .
              |         ¯¯--__          .
              |               ¯¯--__    .            min BRP = SELL_COLLATERAL_RATIO
        SCR - |                     ¯¯--________________________________
              |                         .
              +-------------------------+--------------------------->   current price
              0                      strike

```


```solidity

BUYING                     .                                              __-- >100%
_POWER                     .                                        __--¯¯
_REQUIREMENT       <- OTM  .  ITM ->                          __--¯¯
              ^            .                            __--¯¯
       100% - |  -   -   - . -   -   -   -   -   -__--¯¯  -   -   -   -   -   - 100%
              |            .                __--¯¯  .
              |            .          __--¯¯        .
              | min BRP    .    __--¯¯       BPR = SCR + (100% - SCR)*(price/strike - 1)
 SELL_RATIO _ |_____________--¯¯                    .
              |            .                        .
              +------------+------------------------+--------------->   current price
              0         strike                 2 * strike

```

The buying power requirement of a call can exceed the notional value of the minted option.
However, users can deposit the asset as collateral in order to mitigate those risks.


The buying power requirement of a call can exceed the notional value of the minted option.
However, users can deposit the asset as collateral in order to mitigate those risks.


BPR for calls (with collateral denominated in asset):
```solidity

BUYING                     .
_POWER                     .
_REQUIREMENT       <- OTM  .  ITM ->
              ^            .
       100% - |  -   -   - . -   -   -   -   -   -   -   -   -   -___----- 100%
              |            .               ______-------¯¯¯¯¯¯¯¯¯¯
              |            .   ___----¯¯¯¯¯
              | min BRP    . --      BPR = 100% - (100% - SCR)*(strike/price)
 SELL_RATIO _ |_____________¯
              |            .
              +------------+---------------------------------------->   current price
              0         strike

```



A position will be margin called if

```
    Total value of collateral  < collateral requirement 
```

### Liquidation Bonus

```solidity

LIQUIDATION
_BONUS        ^  max bonus = 100%
       100% _ |___________
              |          .¯-_
              |          .   ¯-_                   no cost at 100% capitalization
              |          .      ¯-_             /
              |          .         ¯-_        /
              |          .            ¯-_  /
         0% - +-//-------+---------------+---------------+---------->    MIN_CAPITAL_REQUIREMENT
              |        80%            100% ¯-_         120%
              |                               ¯-_        .
              |                                  ¯-_     .
              |                                     ¯-_  .     min bonus = -100%
      -100% - |                                        ¯-_______________
              |
```


