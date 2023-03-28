---
sidebar_position: 12
---

# Options Trading Risks

## The Risks of Trading (Pan)Options
While options trading can be profitable, it is not suitable for all investors. Options trading requires a thorough understanding of the risks and strategies involved, as well as a potential for significant losses. As with any investment, it is important to do your own research, consult with a financial advisor, and never invest more than you can afford to lose.

The content provided is for informational and educational purposes only and is not intended as, nor should it be construed as, financial, investment, or trading advice, or a recommendation to buy, sell, or hold any options. Options trading carries significant risks, including the potential for substantial losses, and may not be suitable for all investors. Before engaging in options trading, you should consult with a qualified financial advisor or other professional to evaluate your specific financial situation and objectives.


## Introduction
Options trading has become increasingly popular among investors due to its flexibility and potential for high returns. However, options trading also comes with its fair share of risks. However, it is crucial to understand and manage the risks associated with options trading.
 This guide will delve into the risks associated with (Pan)options trading and offer tips on mitigating these risks.

For the sake of completeness, some of the terms associated here apply to TradFi options (T), some apply to perpetuals with a funding rate such as squeeth or perps (F), and some apply to Panoptions (P). We will write a (T), (F), or (P) at the end of each risk's description to emphasize the type of options the risk applies to.  

### Complexity and the Learning Curve
Options trading is inherently more complex than trading stocks. With options, investors must consider the direction of the underlying asset's price movement and factors like implied volatility, time decay, and strike price selection. The learning curve for trading options can be steep, and it takes time and dedication to master the intricacies of the options market.

*Applies to*: (T, P)

*How to Mitigate*: Start with a solid foundation in options trading and consider paper trading to practice and refine your strategies before risking real capital.



## Protocol Risks
### Smart Contract Risk
In the case of Panoptions and other decentralized finance (DeFi) platforms, smart contract risk is a potential risk that should be considered. Smart contracts are self-executing digital contracts that run on blockchain networks. While smart contracts are generally considered to be secure and tamper-proof, they are still vulnerable to programming errors or malicious attacks, which can result in significant losses for users.

*Applies to*: (F,P)

*How to Mitigate*: It is important to use trusted and audited platforms and to monitor positions closely. The Panoptic protocol is audited to the highest security standards by leading blockchain security firms. This ensures that our smart contracts are secure and reliable to the best possible standard.

### Margin Call and Liquidation Risk
Margin calls occur when a trader's margin account falls below the minimum maintenance margin (buying power requirement) required by the broker (protocol). This can happen when losses in the position exceed the amount of collateral in the account. Margin calls can result in forced liquidations or the need to deposit additional funds into the account. Positions in Panoptic can quickly become liquidatable from large price swings in the underlying AMM pool price.

*Applies to*: (T,F,P)

*How to Mitigate*: To avoid margin calls, it is important to maintain sufficient collateral in the account and monitor positions closely. Avoiding excessive leverage can also help mitigate the risk of margin calls.

### Option Buyer Risks
Option buyers face the risk of losing the premium paid for the option if the trade does not go as planned. The risk is limited to the amount of the premium owed plus the in-the-money amount, but option buyers must also contend with other risks such as those associated with delta, gamma, time decay, and liquidity.

*Applies to*: (T,P)

*How to Mitigate*: To mitigate the risk of accumulating premium, closely monitor and close or exercise positions. For Panoptions, premia continues to accumulate as long as the underlying AMM price is "in range" of the Panoption position (as determined by the strike price, k, and range factor, r).

### Option Seller Risks:
Option sellers face the risk of losing more than the premium received if the position moves against them. Option sellers also face the risk of being assigned an exercise notice and having to fulfill the obligations of the contract at an unfavorable price.

*Applies to*: (T,P)

*How to Mitigate*: To mitigate the risk of being assigned an exercise notice, it is important to monitor short options positions closely and be prepared to adjust or close the position if needed. Selling options with defined risk strategies such as spreads or iron condors can also help mitigate risk.

### Panoptic Liquidity Provider Risks:
Panoptic liquidity providers (PLPs) face the risk of losing (potentially all) funds due to protocol insolvency. Although the Panoptic protocol will be secured by a network of keepers and liquidation bots, an extreme price swing or unexpected market events may cause the liquidation network to fail, resulting in PLPs losing funds due to protocol insolvency.  

PLPs also face the risk of being unable to exit a position due to insufficient liquidity in the Panoptic pool which occurs during high pool utilization.

*Applies to*: (P)

*How to Mitigate*: To mitigate the risk of losing funds as a Panoptic liquidity provider, it is important to set appropriate sizes and deposit no more than you are willing to lose.  

Choosing to deposit liquidity into pools where the underlying AMM is more liquid and price is harder to manipulate can mitigate loss of funds from protocol insolvency caused by sudden price movements. Choosing to deposit liquidity into Panoptic pools which are more liquid can mitigate the risk of being unable to withdraw deposits due to high pool utilization. Monitoring market conditions and staying informed about news and events that could impact the underlying asset's price can also help mitigate risk.

### Out-of-range Risk
Panoptions are created by **rearranging** liquidity in a Uniswap V3 pool. In particular, this means that Panoptions are subject to a price *range*, where the position collects fees if the underlying asset's price is in range. For very tight ranges or very volatile or drift-driven assets, the risk of having the price leave the range (causing the option seller to no longer accumulate premia) is more significant.

*Applies to*: (P)

*How to Mitigate*: To mitigate out-of-range risk, closely monitor and close your position to protect your capital. Stay informed about news and events that could impact the underlying asset's price.

### In-range Risk
Panoptions are created by **rearranging** liquidity in a Uniswap V3 pool. In particular, this means that Panoptions are subject to a price *range*, where the position collects fees if the underlying asset's price is in range. For very wide ranges, the price is likely to stay in range longer (causing the option buyer to accrue additional premia for longer periods of time). For very tight ranges, as long as the price stays in range, the amount of premia owed is amplified (causing the option buyer to accrue large amounts of premia).

*Applies to*: (P)

*How to Mitigate*: To mitigate in-range risk, closely monitor and exercise or close your position to protect your capital. Stay informed about news and events that could impact the underlying asset's price.

### Leverage Risk
Options provide a high degree of leverage, amplifying gains and losses. A small move in the underlying asset's price can lead to significant changes in the value of an options contract. While this leverage can lead to substantial profits, it can also result in significant losses, especially when trading on margin.

*Applies to*: (T,F,P)

*Tip:* Establish strict risk management rules and avoid using excessive leverage. Set appropriate position sizes and closely monitor your position to protect your trading capital.  

A good rule of thumb for choosing an appropriate position size is to never use more than 50% of your maximum allowed leverage/buying power.

### Liquidity Risk
Not all options are highly liquid, which can lead to higher “spreads” and difficulties in buying options at favorable prices. Illiquid options may also be more susceptible to manipulation and sudden price swings.

*Applies to*: (T,F,P)

*How to Mitigate*: To ensure sufficient liquidity, focus on trading options with high open interest and trading volume. Liquid options have lower “spreads”, making entering long positions at desired prices easier.

### Forced Exercise Risk
For Panoptions, there is a risk that a long option position may be forced to close due to an external party exercising the option. Anyone can force a long option position to be closed by paying a fee proportional to the moneyness of the long option, and the long option holder receives the fee.

*Applies to*: (P)

*How to Mitigate*: To mitigate forced exercise risk, it is important to monitor positions closely and be prepared to adjust or preemptively close the position when it is out of range if needed.

### Early Assignment Risk
For American-style options, the option holder can exercise the contract any time before expiration. Option sellers can be assigned and required to fulfill their obligations at an inopportune time, potentially resulting in unexpected losses.

*Applies to*: (T)

*How to Mitigate*: Monitor your short options positions closely and be prepared for early assignments. If early assignment seems likely, consider closing your position or rolling it to a later expiration date.

### Gap Risk
Options are exposed to gap risk due to the possibility of sharp overnight or weekend price movements in the underlying asset. These price gaps can result in significant losses for options traders, especially when holding positions overnight or over the weekend.

*Applies to*: (T)

*How to Mitigate*: To mitigate gap risk, use stop-limit orders or other risk management techniques to protect your capital. Stay informed about news and events that could impact the underlying asset's price.

### Funding Rate Risk

Perpetual options have a unique feature called the funding rate, which is periodically exchanged between long and short-position holders. Depending on market conditions, traders may either receive or pay funding fees, which can impact the profitability of their positions.

*Applies to*: (F)

*How to Mitigate*: Monitor the funding rate and market sentiment closely. Consider adjusting your trading strategy to account for potential funding rate fluctuations.





## The Greeks
### Systematic risk
Systematic risk is inherent to the entire market or market segment. Systematic risk, also known as un-diversifiable, volatility, or market risk, affects the overall market, not just a particular asset or industry. While not always easy to identify and avoid, one could create a portfolio that is *beta-neutral* with respect to a given market indicator (e.g., S & P500). This is particularly important in crypto, where many coins follow (daily) similar trends to Bitcoin.

*Applies to*: (T, F, P)

*How to Mitigate*: Create beta-neutral positions.

### Unsystematic risk
Unsystematic risk is a risk that affects the assets of a specific class. While systematic risk can be thought of as the probability of a loss that is associated with the entire market or a segment thereof, unsystematic risk refers to the likelihood of a loss within a specific industry or security. For example, this can be understood as a risk that only affects stocks in the tech sector (AAPL, MSFT,...) or utility tokens in Web3 (FIL, HNT). Unsystematic risk can be mitigated through diversification.

*Applies to*: (T, F, P)

*How to Mitigate*: Diversify your portfolio.

### Delta risk
Delta measures the degree to which an option is exposed to shifts in the underlying asset price (i.e., a stock) or commodity (i.e., a futures contract). Values range from 1.0 to –1.0 (or 100 to –100, depending on the convention employed). Thus, a significant price movement implies a large delta. While large price movements are favorable if you are in the correct position of the trade (e.g., you benefit from a large price increase if you bought a call option), options trading is often a zero-sum game, meaning that someone had to be the counterparty of that trade, putting themselves in a losing position. Delta risk can be managed by entering delta-neutral positions.

*Applies to*: (T, F, P)

*How to Mitigate*:  Try to utilize delta-neutral strategies.

### Gamma risk
 Gamma is an options risk metric that describes the rate of change in an option's delta per one-point move in the underlying asset's price. Delta is how much an option's premium (price) will change given a one-point move in the underlying asset's price. Therefore, Gamma measures how an option's price rate will vary with fluctuations in the underlying price. The higher the Gamma, the more volatile the option's price is.

*Applies to*: (T,F,P). Notice that Panotions have **limited Gamma exposure**, with a maximum of $$\frac{2}{K  \pi \ln(r)},$$ with $K$ the strike price and  $r=\sqrt{\mathsf{PriceUpper/PriceLower}}$ the range factor (c.f. [the white paper](https://arxiv.org/pdf/2204.14232.pdf)). A similar thing occurs in Perps with the so-called power perpetuals (such as squeeth), which can be shown to have constant Gamma. This contrasts TradFi, where this Gamma can diverge to infinity.

*How to Mitigate*: Trade Panoptions 😉

### Time Decay
Traditional options have a finite lifespan, and their value erodes as the expiration date approaches. This is known as time decay or "theta." Time decay accelerates as the option nears expiration, leading to rapid losses for option buyers if the underlying asset's price doesn't move in the anticipated direction.  

Panoptions and (funding-rate-based) perpetuals have an infinite lifespan, so they do not share the same concept of time decay as in traditional options. However, it is worth mentioning that Panoptions have an “effective” time-to-expiration, depending on the range (width) of the Panoption.

*Applies to*: (T)

*How to Mitigate*: To mitigate time decay risk, consider selling options, implementing time decay-neutral strategies, or trading options with longer expiration dates.
