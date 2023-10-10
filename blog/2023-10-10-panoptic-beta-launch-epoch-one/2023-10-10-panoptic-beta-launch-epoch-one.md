---
slug: panoptic-beta-launch-epoch-one
title: "The Start of Panoptic’s Beta Launch: Epoch 1"
tags: [Gated Launch, Epoch 1]
image: /img/banners/epoch-1-banner.png
description: "Panoptic announces the launch of its beta DeFi options platform and trading competition."
---


![](./epoch-1-banner.png)

  

Panoptic’s goal is to revolutionize derivatives trading by creating a DeFi-native options platform that’s easy and intuitive for all traders. The vision for this goal becomes a reality when we start Epoch 1 — the first round of our beta launch’s trading competition.

  

History is about to be made by the people involved in this event as they become part of a select group of individuals to test, trade, and contribute to the development of perpetual options in DeFi. Epoch 1 begins this Friday, October 13.

## About Our Beta Launch

Panoptic’s [beta launch](https://panoptic.xyz/blog/gated-launch-sign-up) is structured as multiple rounds of trading competitions called epochs. In these epochs, participants use real, albeit capped, assets to buy and sell DeFi-native options.

  

In each epoch, the lowest-ranking performers run the risk of being excluded from future competitions, and top performers receive prizes. Throughout the beta launch, we’re offering exclusive NFTs and up to $100,000 in monetary prizes.



## Epoch 1 Overview
In Epoch 1, participants will help us test the basic functionalities of our protocol: depositing liquidity and trading options. As we progress into future epochs, the pool of participants and testing goals will be expanded.  
  
For the first epoch, we’ve set the parameters to be more conservative to preserve the safety and security of our protocol.


### Participation
    Number of community participants in Epoch 1: 32

To see if you’ve made the list, visit our wallet checker [here](https://access.panoptic.xyz).

If you were not selected for this epoch, you may still be chosen for the future rounds of our trading competitions. Sign up for the waitlist [here](https://signup.panoptic.xyz).


### Timeline
    Start Date: October 13, 16:00 UTC
    End Date: October 20, 16:00 UTC

  

### Prizes  
For Epoch 1, all participants will receive a Pioneer POAP custom-designed by the Panoptic team. The top five traders will receive an additional exclusive POAP.  
  
The ranking metrics are based on absolute profit and loss (PnL) calculated in terms of the account’s USDbC value at the end of the epoch.

Remember: traders at the bottom of the competition are at risk of being excluded from future epochs.

  

### Technical Details
    Chain: Base
    Pool: WETH-USDbC, 0.05%
    Deposit Amount: 5 USDbC and ~0.003 WETH (the exact amount of WETH depends on the price of ETH on the day of the competition)

Please note that you must deposit this exact amount to participate. When the trading competition begins, head over to our [beta platform](https://beta.panoptic.xyz) to see the exact amount of required WETH.

  

### Feedback
Feedback is an essential part of our beta launch. If you encounter any bugs or have ideas on how to improve our platform, submit them [here](https://feedback.panoptic.xyz).

  

## How to Participate in Epoch 1
If you’ve been selected to participate in Epoch 1, and confirmed it with our [wallet checker](https://access.panoptic.xyz), here are the steps you need to take to join the competition:

1.  Navigate to the beta version of the [Panoptic app](http://beta.panoptic.xyz)
    
2.  Connect your wallet to [Base mainnet](https://base.org/). If you’re unfamiliar with how to do this, follow the instructions [here](https://docs.base.org/using-base/).
    
3.  Deposit required funds on Panoptic’s WETH-USDbC pool by following the onboarding instructions on the [Panoptic app](http://beta.panoptic.xyz). You will need ETH, WETH and USDbC.

    **Obtaining ETH on Base**: Send ETH directly from a Coinbase account to your wallet on Base mainnet or by [bridging](https://coinmarketcap.com/academy/article/how-to-bridge-to-base-mainnet) ETH from Ethereum mainnet.

    **Obtaining WETH on Base**: Wrap your ETH on Base. You will need to first connect your wallet to [Uniswap](https://app.uniswap.org/swap/) before proceeding to [wrap](https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0x4200000000000000000000000000000000000006&chain=base) your ETH on Base.

    **Obtaining USDbC on Base**: Send USDC directly from a Coinbase account to your wallet on Base mainnet and then [swap](https://app.uniswap.org/swap?outputCurrency=0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca&chain=base) USDC for USDbC.

4.  Buy and sell between October 13 (16:00 UTC) and October 20 (16:00 UTC).
    
Winners will have their prizes distributed at the end of the competition period.  
  
Learn how to deposit liquidity, trade an option, and more through our YouTube videos: 
  
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=oeSJONnOeGPukUXO&amp;list=PLB5qwiSwzT_rgH-HvQtDaWTe48xPaF6se" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

  

## Additional Information
In preparation for the trading competition, traders can familiarize themselves with the protocol and associated fees by reading through our [documentation](https://panoptic.xyz/docs/intro).

As part of our multi-epoch beta launch, we will be testing various combinations of these pool parameter values to assess their safety, robustness, and fairness for a variety of tokens and market conditions.

We outline the pool parameter values for Epoch 1 below. For further explanation of how these parameters affect users in Panoptic, please see our pool parameters [guide](https://panoptic.xyz/blog/gated-launch-parameters).

  

### Fees

|              Fees             |                             Value                             |                                                                                                                                                                                                                                     Example                                                                                                                                                                                                                                    |
|:-----------------------------:|:-------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Commission fee                | 10 bps (0.10%)                                                | Buying/selling a 1 ETH put will incur a 0.001 ETH commission fee                                                                                                                                                                                                                                                                                                                                                                                                               |
| Forced exercise cost          | As high as 5.12%                                              | [Forcing](https://panoptic.xyz/docs/panoptic-protocol/forced-exercise) an option buyer to close an at-the-money 1 ETH put will incur a 0.0512 ETH fee on the force exercisor. Deeper in-the-money and out-of-the-money options will incur lower fees.                                                                                                                                                                                                                                                                                         |
| In-the-money (ITM) spread fee | 20 bps (0.20%)                                                | Buying/selling an ITM 1 ETH put at a 2000 strike price with current ETH price being 1900 USDbC (intrinsic value of put option = 100 USDbC) incurs a 0.20 USDbC fee. Buying/selling an at-the-money or out-of-the-money option will not incur any ITM spread fee.                                                                                                                                                                                                               |
| Vegoid                        | 1x - 3.25x spread (1.25x spread at 50% liquidity utilization) | Buyers pay sellers anywhere from [1x to 3.25x](https://www.desmos.com/calculator/lo2qsg77im) the amount of Uniswap LP fees, depending on the available liquidity of the option.  Examples: 1) If a sold option is not purchased, it will earn the Uniswap LP fees (1x spread). 2) If half of the sold options are purchased, buyers pay sellers an additional 25% of Uniswap LP fees (1.25x spread). 3) If 90% of the sold option has been purchased, buyers pay sellers an additional 225% of Uniswap LP fees (3.25x spread). |
  

### Collateral Requirements

  
|      Pool Parameter     |       Value       |                                                             Example                                                            |
|:-----------------------:|:-----------------:|:------------------------------------------------------------------------------------------------------------------------------:|
| Sell Collateral Ratio   | 25% (4x leverage) | Maintaining a 1 ETH short put position would require at least 0.25 ETH in collateral.                                          |
| Buy Collateral Ratio    | 25% (4x leverage) | Maintaining a 1 ETH long put position would require at least 0.25 ETH in collateral.                                           |
| Mint Buffer Requirement | 1.33x             | Suppose the buy collateral ratio is 25%. Buying a 1 ETH put would require at least 0.34 ETH in collateral (0.34 ≈ 1.33 x 25%). |

  

### Pool Utilization (PU)

|       Pool Parameter       | Value |                                                                                Example                                                                               |
|:--------------------------:|:-----:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Target Pool Utilization    | 50%   | Half of all the Panoptic pool liquidity has been used to sell options. The protocol uses collateral requirement incentives to target this amount.                    |
| Saturated Pool Utilization | 75%   | Three-quarters of all the Panoptic pool liquidity has been used to sell options. The protocol uses collateral requirement incentives to avoid exceeding this amount. |  
  

## Disclaimer

  

During Panoptic’s beta launch, the protocol is still in an experimental state, and trading activities involve inherent risks. Engaging in the competition may lead to a loss of funds due to the inherent nature of trading assets and the experimental nature of the protocol. Participants are encouraged to exercise caution and conduct their due diligence before making any financial decisions.

  

_Join the growing community of Panoptimists and be the first to hear our latest updates by following us on our [social media platforms](https://links.panoptic.xyz/all). To learn more about Panoptic and all things DeFi options, check out our [docs](https://panoptic.xyz/docs/intro) and head to our [website](https://panoptic.xyz/)._