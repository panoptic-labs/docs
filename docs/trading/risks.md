---
sidebar_position: 5
---


# The Risks of Trading (Pan)Options


## Introduction
Options trading has become increasingly popular among investors due to its flexibility and potential for high returns. However, options trading also comes with its fair share of risks. However, it is crucial to understand and manage the risks associated with options trading.
 This short guide will delve into the risks associated with (pan)options trading and offer tips on mitigating these risks.

For the sake of completeness, some of the terms associated here apply TradFi (T), some apply to perpetuals with a funding rate (F), and some apply to Panoptions (P). We will write a (T), (F), (P) at the end of the description to emphasize the type of option such a risk applies to.  



## Systematic risk
Systematic risk is inherent to the entire market or market segment. Systematic risk, also known as un-diversifiable, volatility, or market risk, affects the overall market, not just a particular asset or industry. While not always easy to identify and avoid, one could create a portfolio that is *beta-neutral* with respect to a given market indicator (e.g., S & P500). This is particularly important in crypto, where many coins follow (daily) similar trends to Bitcoin. 

*Applies to* (T, F, P)

 *Tip:* This risk can be mitigated by creating beta-neutral positions. 


 ## Unsystematic risk
Unsystematic risk is a risk that affects the assets of a specific class. While systematic risk can be thought of as the probability of a loss that is associated with the entire market or a segment thereof, unsystematic risk refers to the likelihood of a loss within a specific industry or security. For example, this can be understood as a risk that only affects stocks in the tech sector (AAPL, MSFT,...) or utility tokens in Web3 (FIL, HNT). Unsystematic risk can be mitigated through diversification. 

*Applies to* (T, F, P)

 *Tip:* You should try to have a diverse portfolio


 ## Delta risk
Delta measures the degree to which an option is exposed to shifts in the underlying asset price (i.e., a stock) or commodity (i.e., a futures contract). Values range from 1.0 to –1.0 (or 100 to –100, depending on the convention employed). Thus, a significant price movement implies a large delta. While large price movements are favorable if you are in the correct position of the trade (i.e., you benefit from a large price increase if you bought a call option), options trading is usually a 0-sum game, meaning that someone had to be the counterparty of that trade, putting themselves in a losing position. Delta risk can be managed by entering delta-neutral positions. 


*Applies to* (T, F, P)

 *Tip:*  Try to enter delta-neutral positions. ==This is easy to do in Panoptic! ;) [to check]==



## Gamma risk
 Gamma is an options risk metric that describes the rate of change in an option's delta per one-point move in the underlying asset's price. Delta is how much an option's premium (price) will change given a one-point move in the underlying asset's price. Therefore, Gamma measures how an option's price rate will vary with fluctuations in the underlying price. The higher the Gamma, the more volatile the option's price is.

*Applies to:* (T,F*,P*). Notice that Panotions have **limited Gamma exposure**, with a maximum of $$\frac{2}{K  \pi \ln(r)},$$ with $K$ the strike price and  $r=\sqrt{\mathsf{PriceUpper/PriceLower}}$ the range factor (c.f. [the white paper](https://arxiv.org/pdf/2204.14232.pdf)). A similar thing occurs in Perps with the so-called power perpetuals (such as squeeth), which can be shown to have constant Gamma. This contrasts TradFi, where this Gamma can diverge to infinity. 

*Tip:* Trade Panoptions ;) ==to check==


## Complexity and the Learning Curve
Options trading is inherently more complex than trading stocks. With options, investors must consider the direction of the underlying asset's price movement and factors like implied volatility, time decay, and strike price selection. The learning curve for trading options can be steep, and it takes time and dedication to master the intricacies of the options market.

*Applies to* (T, F, P)

 *Tip:* Start with a solid foundation in options trading and consider paper trading to practice and refine your strategies before risking real capital.

## Leverage Risk
Options provide a high degree of leverage, amplifying gains and losses. A small move in the underlying asset's price can lead to significant changes in the value of an options contract. While this leverage can lead to substantial profits, it can also result in significant losses, especially when trading on margin.

*Applies to:* (T, F, P) ==to check==

*Tip:* Establish strict risk management rules and avoid using excessive leverage. Set appropriate position sizes and stop-loss orders to protect your trading capital.

## Time Decay
Options have a finite lifespan, and their value erodes as the expiration date approaches. This is known as time decay or "theta." Time decay accelerates as the option nears expiration, leading to rapid losses for option buyers if the underlying asset's price doesn't move in the anticipated direction. Notice that Panoptions and (funding-rate-based) perpetuals do not have a theta, as their values do not depend on time. However, it is worth mentioning that there is an equivalent to time-to-expiration in Panoptions, based on the range of the option. 

*Applies to:* (T) ==to check==

*Tip*: To mitigate time decay risk, consider selling options, implementing time decay-neutral strategies, or trading options with longer expiration dates.

## Liquidity Risk
Not all options contracts are highly liquid, which can lead to wider bid-ask spreads and difficulties in entering or exiting positions at favorable prices. Illiquid options may also be more susceptible to manipulation and sudden price swings.

*Applies to:* (T,F,P*) ==to check==

Tip: To ensure sufficient liquidity, focus on trading options with high open interest and trading volume. Liquid options typically have tighter bid-ask spreads, making entering and exiting trades at desired prices easier.

## Early Assignment Risk
For American-style options, the option holder can exercise the contract any time before expiration. Option sellers can be assigned and required to fulfill their obligations at an inopportune time, potentially resulting in unexpected losses.

*Applies to:* (T,F,P) ==to check==

*Tip*: Monitor your short options positions closely and be prepared for early assignments. If early assignment seems likely, consider closing your position or rolling it to a later expiration date.


## Liquidation Risk
 For Panoptions and other perpetuals, there is a risk of having a position liquidated due to large swings in price. Liquidation occurs when a position's margin is ≤ maintenance margin (+ potentially some fees). In this case, the position gets exercised immediately by a smart contract. While this risk is mitigated by providing some reasonably-large margins (i.e., large enough to cover many adversarial scenarios but not so large that they are an impediment to opening a position), this risk remains. 

*Applies to* (F, P) 

*Tip*: Monitor your short options positions closely and be prepared to deploy more margin if needed. 


## Out-of-range Risk
Remember that Panoptions are created by **rearranging** liquidity in a UNiswap V3 pool. In particular, this means that Panoptions are subject to a price *range*, where the position collects fees if the underlying asset's price is in range. For very tight ranges or very volatile or drift-driven assets, the risk of having the price leave the range (and hence having the contract collect 0 fees) is more significant. 

*Applies to:* (P) 

*Tip*: To mitigate gap risk, use stop-limit orders or other risk management techniques to protect your capital. Stay informed about news and events that could impact the underlying asset's price.



## Gap Risk
Options are exposed to gap risk due to the possibility of sharp overnight or weekend price movements in the underlying asset. These price gaps can result in significant losses for options traders, especially when holding positions overnight or over the weekend.

*Applies to:* (T) 

*Tip*: To mitigate gap risk, use stop-limit orders or other risk management techniques to protect your capital. Stay informed about news and events that could impact the underlying asset's price.



## Funding Rate Risk

Perpetual options have a unique feature called the funding rate, which is periodically exchanged between long and short-position holders. Depending on market conditions, traders may either receive or pay funding fees, which can impact the profitability of their positions.

Tip: Monitor the funding rate and market sentiment closely. Consider adjusting your trading strategy to account for potential funding rate fluctuations.



