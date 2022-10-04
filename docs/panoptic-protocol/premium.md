---
sidebar_position: 4
---

import Term from "@docusaurus-terminology/term";


# Streaming premium
Panoptic introduces a novel streaming premium model for pricing options which will bring new opportunities to users and traders.

## Liquidity Provider fees
Option positions in Panoptic have no expiration. 
This makes pricing them quite different from vanilla options whose price can easily be derived from the <Term popup="The Black-Scholes model, aka the Black-Scholes-Merton (BSM) model, is a differential equation widely used to price options contracts." reference="/docs/terms/blackscholes">Black-Scholes</Term> model given a time to expiration.

The key difference between the pricing of regular options and the streaming premium model is that, instead of requiring the users to pay for their options upfront, the pricing of an option is path-dependent and will grow at each block according to the proximity of the spot price to the option strike price.

Since the Liquidity Provider (LP) position earn trading fees in the Uniswap v3 pool, the premium to be paid for a long option is simply the amount of fees collected by that option.

Mechanically, what happens is that when an options buyer moves a sellers pre-deployed liquidity out of the Uniswap v3 pool to Panoptic, the Uniswap trading activity generates LP fees which the buyer owes the seller; this is the premium.

## Options' return
The price of an option will heavily depend on the history of the asset price, with many options that spent all their time OTM being worth exactly zero (ignoring any commission) or hovering around the strike price and being worth much more than the Black-Scholes price. 


## (Implied) Volatility
Using the amount of fees collected as a measure of the option premium results in IV that depends on the traded volume and the amount of liquidity at the position’s tick, and not on the option’s realized volatility derived from actual market price fluctuations.

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

Using the effective liquidity, the amount of fees paid is determined by $effectiveLiquidity = 9.9/(10−9.9) = 99$ ETH. This is important as opposed to using the simpler $positionSize/liquidity = 9.9/10 = 0.99$ ETH, e.g., because it ensures that the cost increases rapidly as you deplete the pool (similar to how Uniswap works for spot trading).