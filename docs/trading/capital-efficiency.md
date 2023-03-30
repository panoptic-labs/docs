---
sidebar_position: 3
---

# Capital effiency
In options trading, capital efficiency refers to the ability of an options strategy to control a maximum amount of funds with minimal capital investment. It is a measure of how effectively an options trader uses their available capital to achieve their desired trading objectives.

For example, a capital-efficient options strategy may involve using options to gain exposure to a crypto asset while requiring less capital than buying the crypto asset outright. This can be achieved through strategies such as call options or options spreads.

Options trading can be a powerful tool for investors looking to maximize their capital efficiency. By leveraging the unique features of options, traders can better manage risk, generate additional income, and potentially enhance returns. In this section we'll explore the basics of options trading and delve into strategies that can help you optimize your capital's potential.
For a primer on terminology see [here](/docs/terms/glossary.md).


### Leverage

Options provide leverage, allowing traders to control a large amount of the underlying asset with a small amount of capital. By purchasing options instead of the underlying asset, traders can gain exposure to price movements without committing a significant amount of capital.


### Examples of Capital Efficient Options Strategies

#### Long Calls
Buying a call option is a capital efficient strategy for obtaining upside exposure to an asset. Rather than having to purchase the underlying asset at full price, one only needs to pay the price of the call option (which is usually significantly less).

![Call Option Graphic](https://user-images.githubusercontent.com/62954565/228379525-d8fb6c35-e7bb-498d-87d5-3f1e4261f410.png)

For example, let's say that ETH is trading at $1,000. Buying ETH outright would require $1,000 (1x leverage). But under normal circumstances in Panoptic, buying a 1 ETH call option would only require $100 of collateral (10x leverage). So for 10x less capital, one is able to get equivalent upside exposure to the underlying asset.

#### Short Straddles and Strangles
Selling straddles and strangles are extremely capital efficient. That’s because they’re made up of one short put and one short call, and only one of those legs can be “tested” at any given time. For example, if the put is ITM, then the call is OTM, and vice versa.

(Add figures)

Because of this, the collateral requirements for selling a straddle or strangle is relaxed. The collateral requirement for a short straddle or strangle is just the collateral requirement of one of its legs (either the short put or short call, whichever is larger).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Cool fact about capital efficiency which will be implemented in <a href="https://twitter.com/Panoptic_xyz?ref_src=twsrc%5Etfw">@Panoptic_xyz</a><br/><br/>Collateral for selling options on <a href="https://twitter.com/search?q=%24SPY&amp;src=ctag&amp;ref_src=twsrc%5Etfw">$SPY</a>: <br/>-25∆ put=$5800 <br/>-25∆ call=$5900<br/><br/>-Strangle=25∆ put + call =$5960<br/><br/>Why not 2x larger? Only one side can be ITM at a time, so no extra risk for adding 2nd leg!</p>&mdash; Guillaume Lambert | gee-yohm.eth | 🦇🔊 (@guil_lambert) <a href="https://twitter.com/guil_lambert/status/1593370796650545153?ref_src=twsrc%5Etfw">November 17, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

For example, let's say that ETH is trading at $1,000. Under normal circumstances in Panoptic, selling a 1 ETH naked put option would require $200 of collateral (5x leverage). Similarly, selling a 1 ETH naked call option would require 0.2 ETH of collateral (5x leverage). However, selling BOTH a 1 ETH put option AND a 1 ETH call option together would only require $200 of collateral (10x leverage).

#### Synthetic Long Asset
Exposure to assets can be mimicked through options strategies that are more capital efficient. A "synthetic long asset" is created by selling an ATM put option and buying an ATM call option, which creates a similar payoff to that of owning the underlying asset, but with less capital required.

(Add figure)

For example, let's say that ETH is trading at $1,000. Buying ETH outright would require $1,000 (1x leverage). To create a synthetic long ETH position, one could sell an ATM put and buy an ATM call. Under normal circumstances in Panoptic, selling 1 ATM ETH put option would require $200 of collateral and buying 1 ATM ETH call option would require $100 of collateral, for a total required collateral of $300 (3.33x leverage).

So for 3.33x less capital, one is able to get similar exposure (upside and downside) to the underlying asset.