---
slug: zero-dte-defi-options
title: "Panoptic: Unleashing the Power of 0DTE Options"
image: /img/research/zero-dte-defi-options.png
description: "One of the most intriguing aspects of Panoptic is its ability to facilitate 0DTE (zero days to expiry) strategies, which we'll explore in this blog post."
tags: [Options Traders, Strategies, 0DTE]
authors: C
---

🔥 The world of decentralized finance (DeFi) options is evolving rapidly, and Panoptic is at the forefront of this revolution. By leveraging Uniswap V3 liquidity provider (LP) capabilities, Panoptic can create perpetual options positions. This is nothing short of pure magic! One of the most intriguing aspects of Panoptic is its ability to facilitate 0DTE (zero days to expiry) strategies, which we'll explore in this blog post.

<!--truncate-->

---

# So, what are 0DTEs? 

A 0DTE is an option contract that expires on the same day it is purchased.

Typically, traders buy/sell open contract(s) in the morning & hope to repurchase/resell them for a lower price before the end of the day🔥

# Why trade 0DTE options? 

As expiration approaches, the premia of an option rapidly decreases. This is known as "Theta decay".

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">1/13 📈 Want to understand the potential risk/reward of options trading?<br/><br/>Look no further than the Greeks!<br/><br/>We&#39;ll break down Delta, Gamma, Theta, Vega, &amp; Rho and explain how they can help you make more informed decisions when trading Panoptions 😉 <a href="https://t.co/8sMgAOVIRW">pic.twitter.com/8sMgAOVIRW</a></p>&mdash; Panoptic (@Panoptic_xyz) <a href="https://twitter.com/Panoptic_xyz/status/1635765241157160960?ref_src=twsrc%5Etfw">March 14, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Selling & buying 0DTE options offer unique trading opportunities:
- For buyers: 0DTEs can be profitable if market moves in the preferred direction. They're cheap & obtain intrinsic value fast.
- For sellers: users sell them "high" & try to repurchase "low" later in the day.


# Main strategies for 0DTE trading: 

- 1️⃣ Directional: If you have strong conviction about a stock's movement, you can buy calls (🐂) or puts (🐻) → For buyers
- 2️⃣ Non-directional: straddles or strangles, safer regardless of direction → For buyers & sellers

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">1/25 DeFi Options Trading Is Powerful!<br/><br/>There can be unlimited upside…😈<br/>But also unlimited downside 😣<br/><br/>Every trader should know how to create these 18 options strategies in <a href="https://twitter.com/Panoptic_xyz?ref_src=twsrc%5Etfw">@Panoptic_xyz</a> for any crypto asset, any strike, any size:<br/><br/>❤️ &amp; rt 👇 <a href="https://t.co/BAlyxdn0lz">pic.twitter.com/BAlyxdn0lz</a></p>&mdash; Panoptic (@Panoptic_xyz) <a href="https://twitter.com/Panoptic_xyz/status/1628530117118169088?ref_src=twsrc%5Etfw">February 22, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Since 0DTEs expire on the same day, they're cheaper & offer potential for large profits. However, let's be clear about this: 

- 📢⚠️ They're high-risk, high-reward
- 👆 They're not for everyone, there's no magic money-making strategy

# 0DTEs and Panoptic:

So how do I buy a 0DTE on Panoptic? I thought Panoptions don't expire?

You're right, but although Panoptions don't expire, you can adjust the "width" (r) of your Panoption to correspond with Time To Expiration (TTE). This can be shown from the formula below:
  
$T_r=\frac{2\pi}{\sigma^2}\left(\frac{\sqrt{r}-1}{\sqrt{r}-1}\right)^2, \text{ where } r=\sqrt{\mathsf{PriceUpper/PriceLower}}, \text{which implies } r_T=\left(\frac{1+\sigma\sqrt{\frac{T_r}{2\pi}}}{1-\sigma\sqrt{\frac{T_r}{2\pi}}}\right)^2, \text{ with } \sigma \text{ the volatility of the asset}$

Note: $T_r$ above is given in years.

![img1](./img1.png)

From here, we can observe that:
- Wider range → longer TTE
- More volatility → shorter TTE

So how can we open a 0DTE position on Panoptic? It's simple:

1. Estimate σ from historical data
2. Invert the formula above for r 
3. Open a Panoption position with TTE < 1
4. 🚀🌕

Let do an example. Let's suppose we have an underlying asset with 100% implied volatility (i.e. σ = 1). Then:
- 0.01 DTEs, r = 1.01
- 0.1 DTEs, r = 1.03
- 1 DTEs, r = 1.09
- 7 DTEs, r = 1.25
- 30 DTEs, r = 1.58
- 180 DTEs, r = 3.16
- 365 DTEs, r = 5.42

What if we wanted to trade options at 7 DTEs? 30 DTEs? X DTEs?...Simple! Just repeat the steps above with the desired TTE.

While we cannot guarantee that profits will always follow (🚀🌕), the potential for large gains is present.

Remember that 0DTEs are not without risk. Tight ranges on Panoptic mean that a position can quickly accumulate premium owed by the options buyer.

Remember to trade responsibly and consider the risks involved with 0DTE (or any kind of) options.