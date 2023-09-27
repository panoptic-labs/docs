---
slug: defi-put-options-uniswap-backtest
title: 'Maximizing Profits: Buying Put Options on 16 Uniswap Pools'
image: /img/research/defi-put-options-uniswap-backtest.png
description: "What if users could SHORT LP tokens and effectively BUY options...?"
tags: [LPs, Options Traders, Uniswap, Put, Backtest]
authors: B
---
![img-1](./img-1.png)

Imagine a market that only lets you sell assets, never buy...Could you be profitable?

That market isn't imaginary. That market is...Uniswap Liquidity Providing!

LPing = selling options, but what if users could SHORT LP tokens and effectively BUY options...?

<!--truncate-->

----------

### LP = Short Put
LP positions on Uni V3 mimic the payoff of selling put options. Uniswap users can only deposit liquidity and sell put options, which means they can only take a bullish position.
    
<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">Let&#39;s try to clear some misconceptions about providing liquidity in Uniswap v3:<br/><br/>🟣Uni v3 LPs aren&#39;t making markets, they&#39;re selling cash-secured puts.</p>&mdash; Guillaume Lambert | lambert.eth | 🦇🔊 (@guil_lambert) <a href="https://twitter.com/guil_lambert/status/1619496117816918016?ref_src=twsrc%5Etfw">January 29, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

-   Token goes up, LP value goes up (but capped) 🚀
    
-   Token goes down, LP value goes down 😭

![img-2](./img-2.png)

While selling options can be profitable, our backtests show that it wasn't always the case 👇

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">3/11 Bad pools 😔 (but can you spot the good pool 🐶?)<br/><br/>• ETH-USDC (5bps): -18%<br/>• ETH-DAI (30bps): -14%<br/>• ETH-USDC (30bps): -12%<br/>• ETH-USDT (30bps): -11%<br/>• ETH-USDC (100bps): -9%<br/>• ETH-USDC (1bp): -6%<br/>• ETH-USDT (5bps): -3%<br/>• ETH-DAI (5bps): +7%<br/><br/>(Returns in stablecoin) <a href="https://t.co/l1RWO8cLx6">pic.twitter.com/l1RWO8cLx6</a></p>&mdash; Panoptic (@Panoptic_xyz) <a href="https://twitter.com/Panoptic_xyz/status/1623366152381665280?ref_src=twsrc%5Etfw">February 8, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Is there a way to "short" an LP position and effectively *buy* a put option...?

We'll answer this... But first, let's simulate an options buying strategy!

----------
### Backtest Strategy
For this study:

-   🗓️ Jun 2021 - Jan 2023 (20 months) where applicable
    
-   ⚖️ Daily rebalancing
    
-   📏 Narrow (r = 1.05) range ↔️ 0DTE
    

Daily strategy:

1.  Buy ATM put option by shorting LP position
    
2.  Exercise/close put option at end of day
    
3.  Pay LP swap fees as premia
    
### ETH Puts
Returns on buying ETH put options:

-   🌕 ETH-USDC (5bps): 112%
    
-   🚀 ETH-USDC (30bps): 85%
    
-   🧑‍🚀 ETH-USDC (100bps): 57%

(Returns in USDC)
    
![img-3](./img-3.png)

👉Put option returns are exactly opposite of LP returns👈

### L1/Utility Token Puts
Buying "L1/Utility token" put options:

-   🤩 BTT (+67%)
    
-   😍 GNO (+40%)
    
-   😊 $WBTC (+12%)
    
-   😦 MATIC (-47%)
    
-   😢 LINK (-86%)
    
-   😭 ENS (-101%)
    
![img-4](./img-4.png)

(Returns in ETH, see legend 👇 for pool details)

### DeFi Token Puts
Buying "DeFi token" put options:

-   😎 1INCH (+74%)
    
-   🙂 AAVE (+10%)
    
-   🙂 UNI (+10%)
    
-   😕 MKR (-1%)

(Returns in ETH)

![img-5](./img-5.png)

👉DeFi puts did pretty good!👈

### NFT/Meme Token Puts
Buying "NFT/Meme token" put options:

-   😶 LOOKS (-9%)
    
-   😬 APE (-42%)
    
-   😳 HEX (-52%)
    
(Returns in ETH)

![img-6](./img-6.png)

👉Don't "put" ⤵️ down the meme tokens👈


### Summary
Key Insights:

-   🐻 Bearish price action = high payoff
    
-   💰 Payoff > premia → profit!
    
![img-7](./img-7.png)

In TradFi, options buying is more profitable when Implied Volatility (IV) < Realized Volatility (RV). Do we see the same result here?

Instead of IV let's use the premia:

-   Easier to calculate 🧮
    
-   ⬆️ IV ⇔ ⬆️ Premia
    
![img-8](./img-8.png)

Graph above:

-   🐶 Outperforming puts (green dots): lie above the line, low premia given volatility ("IV < RV")
    
-   😈 Underperforming puts (pink dots): lie below the line, too expensive ("IV > RV")
    

Is there a way to "short" an LP position and, hence, *buy* a put option?

Enter Panoptic! Panoptic allows you to buy *and* sell DeFi options for any crypto asset, any strike, any size.

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">1/25 DeFi Options Trading Is Powerful!<br/><br/>There can be unlimited upside…😈<br/>But also unlimited downside 😣<br/><br/>Every trader should know how to create these 18 options strategies in <a href="https://twitter.com/Panoptic_xyz?ref_src=twsrc%5Etfw">@Panoptic_xyz</a> for any crypto asset, any strike, any size:<br/><br/>❤️ &amp; rt 👇 <a href="https://t.co/BAlyxdn0lz">pic.twitter.com/BAlyxdn0lz</a></p>&mdash; Panoptic (@Panoptic_xyz) <a href="https://twitter.com/Panoptic_xyz/status/1628530117118169088?ref_src=twsrc%5Etfw">February 22, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Caveats:

-   ⛽ Ignores gas/spread/swap fees/commission
    
-   💲 Assumes put option premia = LP collected fees
    
-   ❓ This is a "what if" scenario — you can't buy put options on Uniswap (yet)
    

Question:

-   ⚖️ Are LP returns in disequilibrium?
    

(Future #ResearchBites 😉)

----------

Disclaimer:

-   📢 None of this should be taken as financial advice.
    
-   ⚠️ Past performance is no guarantee of future results!