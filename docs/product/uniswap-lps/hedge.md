---
sidebar_position: 4
title: "How to Hedge a Uniswap LP Position and Earn More"
sidebar_label: Hedge a Uniswap LP
description: "An in-range Uniswap LP position has short-gamma exposure. Hedge impermanent loss with perpetual options or loans, and earn streamia on top of Uniswap LP fees."
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can you hedge impermanent loss on Uniswap?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. While price is in range, a Uniswap v3 or v4 LP position has short-gamma exposure, which can be offset with a matching perpetual option. On Panoptic you can buy a perpetual call, put, or straddle on the same pool, or borrow the volatile token through a loan to offset the position's delta. Hedging costs streamia or interest, so it reduces net yield."
          }
        },
        {
          "@type": "Question",
          "name": "Is a Uniswap LP position an option?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While price is in range, a concentrated LP position has short-gamma, option-like exposure and earns swap fees. Its smooth in-range value curve is not the expiration payoff of a vanilla short put or covered call. Out of range, it holds a single token, does not rebalance, and earns no fees until price re-enters."
          }
        },
        {
          "@type": "Question",
          "name": "How can I earn more than Uniswap LP fees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Provide the same liquidity through Panoptic by selling an option. When buyers use that liquidity, they pay streamia on top of the Uniswap fees it would have earned, multiplied by a spread that rises with utilization. Extra income depends on buyer demand and is not guaranteed."
          }
        }
      ]
    })}
  </script>
</head>

import {LpShortPut, LoanHedge, PutSpread, CalendarSpread, ShortStrangle, EarnMore} from '@site/src/components/LpHedge';

While price is inside its range, a Uniswap LP position has option-like, short-gamma exposure, rather than the expiration payoff of a vanilla short put or covered call. Swappers trade against your liquidity, so as ETH rises you end up holding less ETH, and as ETH falls you end up holding more. Compared with simply holding your starting tokens, you give up upside and take extra downside. In DeFi that shortfall is called **impermanent loss**; an options trader would call it the cost of being **short gamma**. Swap fees are what you're paid for taking that risk.

Panoptic doesn't hedge your Uniswap position directly. It gives you instruments on the same pools that you can pair with it: **perpetual options** and **loans** to offset its risk, a way to **earn more** by LPing through Panoptic, where option buyers pay streamia on top of Uniswap fees, and **vaults** that run these strategies for you.

## Your LP position has short-gamma exposure

While price is in range, a concentrated Uniswap v3 or v4 position is **short gamma**: its exposure to the volatile token falls as that token rises and grows as it falls. Its value curve is smooth within the range, unlike the kinked expiration payoff of a vanilla option:

- **ETH falls:** traders sell ETH into your position and take your USDC. You end up holding more ETH as it gets cheaper, so you lose more than if you'd just held. That's what a put seller does: buy the asset as it falls.
- **ETH rises:** traders buy ETH out of your position and pay you USDC. You end up holding less ETH as it gets more expensive, so you gain less than if you'd just held. Above your range you hold only USDC, and your upside is capped, like a put seller's.
- **Swap fees** compensate you for providing liquidity and taking this price risk; they depend on trading activity rather than a fixed option premium.

Move the price to see the payoff and the tokens the position holds, and change the width to see how a narrower range bends the curve more sharply:

<LpShortPut />

Out of range, the position holds a single token, doesn't rebalance, and earns no fees until price comes back.

You're profitable only if fees beat the losses from price movement. That's the same trade-off an option seller makes, and the reason [LP returns are concentrated in lower-volatility pools](/research/uniswap-options-lp-analysis). For the full argument, see [LP = options](/blog/uniswap-options) and [reverse gamma scalping](/research/reverse-gamma-scalping).

## What Panoptic adds on top of an LP position

Each chart below starts from the same LP position: a range centered at 100 with a ±25% width, funded in USDC and represented as a Panoptic short put. Payoffs are shown relative to entry at 100, before fees, streamia, and interest. The chart on the right shows the tokens the combined position holds.

### Hedge delta with loans

An in-range LP position is long ETH. You can offset that delta by **borrowing ETH on Panoptic and selling it**: a loan that gains when price falls, just as your LP position loses.

<LoanHedge />

A loan hedges delta (direction) but not gamma (curvature), so the net position still loses on large moves either way and needs rebalancing as price moves. You pay borrow interest instead of streamia. This is how Panoptic's own hedging bot keeps positions delta neutral, and it's the cheaper hedge when you expect price to drift rather than whipsaw. See [borrowing on Panoptic](/docs/getting-started/borrowers).

### Hedge with perpetual options: a put spread to reduce impermanent loss

Keep your LP position and **buy a put at a lower strike**. Together they form a put credit spread: below the long put's range, the two legs offset and your loss stops growing.

<PutSpread />

[Perpetual options](/docs/trading/perpetual-options) never expire, so the hedge stays on as long as your LP position does. You pay [streamia](/docs/product/streamia) only while price is inside the long put's range. For a worked example, see [Delta-neutral LP: how to hedge a Uniswap position](/blog/delta-neutral-lp-hedge-uniswap-position).

### Hedge with perpetual options: a calendar spread to define the risk

Buy a put at the **same strike** as your LP position but with a **different range width**. On Panoptic, width plays the role of time to expiry, so this is a calendar spread: long if the put is wider than your LP range, short if it's narrower. Far from the strike, both legs are fully in or out of the money and cancel, so the risk is defined on both sides.

<CalendarSpread />

### Create a delta-neutral position by selling options instead of LPing

Instead of only selling a put, also **sell a call**. At the same strike, the two form a short straddle that starts close to delta neutral; moving the call strike up turns it into a short strangle that leans long ETH. Both legs earn fees and streamia.

<ShortStrangle />

The short straddle still loses on large moves either way. Panoptic's [one-click delta-neutral LP](/docs/product/uniswap-lps/delta-neutral-lp) sets this up for you.

### Earn more by selling options instead of LPing

Selling an option on Panoptic **is** providing Uniswap liquidity: the position sits in the same Uniswap pool and earns the same swap fees. When option buyers use your liquidity, they pay you streamia on top, multiplied by a [spread](/docs/product/spread) that rises with utilization: the share of your range's liquidity that buyers have removed. Utilization depends on where buyers trade, so it varies by strike and over time.

<EarnMore />

Extra income depends on buyer demand and isn't guaranteed. Sold positions can also be harder to close when buyers are using the liquidity. See [migrating from Uniswap](/docs/product/uniswap-lps/migrate) and [providing liquidity through Panoptic](/docs/product/uniswap-lps/provide-liquidity).

### Let a vault do it

If you don't want to manage hedges yourself, Panoptic [vaults](/docs/getting-started/vaults) run these strategies for you. The USDC Unicorn Vault, for example, lends into Panoptic markets and runs systematic delta-neutral gamma scalping.

## Which hedge to use

| | Loan | Put spread | Calendar spread | Short straddle or strangle | Sell options for streamia | Vault |
|---|---|---|---|---|---|---|
| **What it does** | Removes delta | Caps the downside | Defines risk on both sides | Removes most delta, keeps earning | Earns more on the same range | Managed by strategy |
| **Cost** | Borrow interest | Streamia on the long put | Streamia on the long put | None; earns streamia | None; earns streamia | Vault terms |
| **Remaining risk** | Large moves either way | Loss down to the long strike | Moves near the strike | Large moves either way | Same as the LP | Strategy risk |
| **Best for** | Trending or slow markets | Protecting against a crash | Range-bound views | Neutral, fee-rich markets | LPs who'd LP anyway | Hands-off LPs |

## ETH/USDC

An in-range ETH/USDC position is long ETH and short ETH volatility, so the main risk is a sharp ETH drop through your range.

- **Hedge:** a perpetual put, or a straddle around your range, offsets that drop. A loan that borrows ETH and sells it offsets delta cheaply when ETH is trending.
- **Earn more:** selling options instead of LPing earns streamia on top of fees when buyers use your range. Check current buyer demand in the app.
- **Hands-off:** the USDC Unicorn Vault starts in the ETH/USDC market.

## FAQ

### Can you hedge impermanent loss on Uniswap?

Yes. While price is in range, an LP position has short-gamma exposure, which you can offset by buying a matching perpetual option, or offset its delta by borrowing and selling the volatile token. Hedging costs streamia or interest, so it reduces net yield.

### Is a Uniswap LP position an option?

While price is in range, a concentrated LP position has short-gamma, option-like exposure and earns swap fees. Its smooth in-range value curve is not the expiration payoff of a vanilla short put or covered call. Out of range, it holds a single token, doesn't rebalance, and earns no fees until price re-enters.

### How can I earn more than Uniswap LP fees?

Provide the same liquidity through Panoptic by selling an option. When buyers use that liquidity, they pay streamia on top of the Uniswap fees it would have earned. Extra income depends on buyer demand and isn't guaranteed.
