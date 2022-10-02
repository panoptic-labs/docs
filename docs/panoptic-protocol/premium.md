---
sidebar_position: 4
---

import Term from "@docusaurus-terminology/term";


# Streaming premium
Options are priced using the novel streaming premium model.

## LP fees
Option positions in Panoptic have no expiration. 
This makes pricing them quite different from vanilla options whose price can easily be derived from the <Term popup="The Black-Scholes model, aka the Black-Scholes-Merton (BSM) model, is a differential equation widely used to price options contracts." reference="/docs/terms/blackscholes">Black-Scholes</Term> model given a time to expiration.

The key difference between the pricing of regular options and the streaming premium model is that, instead of requiring the users to pay for their options upfront, the pricing of an option is path-dependent and will grow at each block according to the proximity of the spot price to the option strike price.
Since the LP position earn trading fees in the Uniswap v3 pool, the premium to be paid for a long option is simply the amount of fees collected by that option.



## Options' return
The price of an option will heavily depend on the history of the asset price, with many options that spent all their time OTM being worth exactly zero or hovering around the strike price and being worth much more than the Black-Scholes price. 


## (Implied) Volatility
Using the amount of fees collected as a measure of the option pre- mium results in IV that depends on the traded volume and the amount of liquidity at the position’s tick, and not on the option’s realized volatility derived from ac- tual market price fluctuations.
Specifically, 

$$
\texttt{Implied Volatility} \equiv \sigma_p = 2 \cdot \texttt{feeRate} \sqrt{\frac{\texttt{Volume}}{\texttt{tickLiquidity}}}
$$


### Liquidity spread

The cost of an option can be derived using an $\texttt{effectiveLiquidity}$, which means that the premium will be given by

$$
\texttt{effectiveLiquidity} = \frac{\texttt{positionLiquidity}}{\texttt{baseLiquidity - positionLiquidity}}
$$

For example, if 10 ETH worth of liquidity was sold at a given tick and a call option worth 9.9 ETH was purchased, only 0.1 ETH of liquidity remains in the Uniswap pool. 
Using the effective liquidity, the amount of fees paid will depend on effectiveLiquidity = 9.9/(10−9.9) = 99 ETH instead of positionSize/liquidity = 9.9/10 = 0.99 ETH.
