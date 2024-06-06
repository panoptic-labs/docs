---
sidebar_position: 2
slug: markets
title: "Markets"
tags: [Tutorial, Uniswap, Markets, Permissionless]
image: /img/research/panoptics-markets-banner.png
description: "Discover how Panoptic allows options trading on any market of ERC-20 tokens."
---

![](./markets/panoptics-markets-banner.png)

In this article, we delve into the innovative world of Panoptic and its integration with Uniswap, offering a comprehensive guide on trading options on any ERC-20 token pair. This piece aims to clarify key concepts such as markets, assets, numeraires, and the relationship between Uniswap and Panoptic, enhancing your understanding of decentralized options trading.

>### Questions We'll Answer
>
>-   What is a market in the context of Panoptic?
>-   What are an asset and a numeraire?
>-   How is Uniswap related to Panoptic?
>-   How can I trade options on any ERC-20 tokens on Panoptic?
    

  

# Panoptic's Options Trading Infrastructure

Panoptic, supported by Uniswap, presents a groundbreaking infrastructure in decentralized finance (DeFi). It allows for trading options on a vast array of assets, contrasting the limited options available on traditional digital asset options platforms.

  

## Trading Pairs

-   Market: In a trading pair, the market token (like WETH in WETH/USDbC) is the primary focus of the option trade. 
-   Priced In: The 'priced in' token (like USDC in WETH/USDC) serves as the reference currency or benchmark to express the asset's value.
-   Fee Tier: The fee tier refers to the trading fee of the associated Uniswap v3 pool
    

This structure is analogous to the base asset and quote asset in traditional trading.

  

## What is a Market in Panoptic?

![](./markets/1.png)

A market in Panoptic consists of a pair of tokens. For example, a market like WBTC/DAI sets the stage for trading options on WBTC that are priced in terms of DAI. Options are settled in terms of both tokens ([streamia](https://panoptic.xyz/blog/streamia-defi-native-options-pricing), gains, and losses are in terms of both WBTC and DAI, for example).

  

## Trading Options on Markets: Understanding the Dynamics

When considering options like calls or puts in a specific market, understanding the dynamics is vital. For instance, in a WBTC-DAI market:

-   A call option reflects a bullish stance on the market token (WBTC) against the 'priced in' token (DAI).
-   A put option indicates a bearish perspective on the market token (WBTC) relative to the 'priced in' token (DAI).  

## Challenges and Solutions in Decentralized Options Trading

Panoptic addresses several challenges in the DeFi options market:

-   Liquidity Fragmentation: Traditional DeFi options markets suffer from scattered capital and liquidity issues. Panoptic resolves this by tapping into Uniswap's liquidity pools, ensuring a more seamless trading experience.
    
-   Intermediaries and Oracles: Panoptic's oracle-free streamia model for pricing options eliminates the need for external data sources, reducing vulnerability points.

## Panoptic and Uniswap: A Symbiotic Relationship

![](./markets/2.png)

Uniswap's growth and success as a decentralized exchange protocol lay the foundation for Panoptic's options trading mechanism. By interfacing with Uniswap's core contracts, Panoptic enables trading options on any asset pair available on Uniswap.

### What is Uniswap?

Uniswap is a decentralized exchange protocol built on Ethereum and other blockchains. It allows for permissionless token swaps, and its automated market maker system ensures liquidity for the trading of thousands of ERC-20 tokens.

  

Uniswap’s Liquidity Providers (LPs) contribute equal value of two tokens to a liquidity pool, receiving pool tokens in return, which represent liquidity providers’ share of the pool, and can be redeemed at any time. Depending on the pool, there is an associate fee charged to traders that incentivizes liquidity providers to provide liquidity.

  

Since Uniswap’s growth over the last five years, it has emerged as the most adopted on-chain spot trading protocol and part of its success can be attributed to its vast and immediate support for a multitude of assets – unlike many centralized exchanges. Panoptic aims to use the same underlying technology to power options for all digital assets.

### Panoptions are built on Uniswap

By directly interfacing with Uniswap v3’s core contracts, Panoptic can port over liquidity on ANY asset pair. This mechanism allows traders to leverage the liquidity and decentralized nature of Uniswap, ensuring a transparent and efficient options trading experience without the need for intermediaries.

### Fee Tiers and Implications

![](./markets/3.png)

Panoptic's fee tiers (0.01%, 0.05%, 0.3%, or 1%) correlate with Uniswap's pool fee tiers, offering flexibility and incentive for liquidity providers. This feature opens up possibilities like trading on the BTC-ETH price directly or exploring stablecoin options, broadening the spectrum of decentralized finance.

# Conclusion

Panoptic, through its innovative approach and synergy with Uniswap, presents a transformative platform in the DeFi landscape. By understanding the nuances of assets, numeraires, and market dynamics, traders can leverage this platform to explore a vast array of options trading opportunities in a decentralized, efficient, and secure environment.

## Next Steps

To start trading on Panoptic or for further exploration, visit Panoptic's [official website](https://www.panoptic.xyz) and its [documentation](https://docs.panoptic.xyz). Here, you'll find detailed guidance on [opening positions](https://panoptic.xyz/research/opening-a-position-on-panoptic) and navigating the platform's offerings.