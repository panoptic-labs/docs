---
sidebar_position: 4
---

# Option properties
Panoptic options have: width, moneyness, type, legs, etc..

## Payoff of a LP position 
The value $\texttt{V(S)}$ of a LP position at a pool price $\texttt{S}$ is given by 

$$
\mathtt{V(S) = numberOfToken1 + S * numberOfToken0}
$$

In Uniswap v3, $\texttt{numberOfToken0}$ and \texttt{numberOfToken1}$ depends on the current price $\texttt{S}$, the range factor of the position $\texttt{r}$ and the strike $\texttt{K}$.
Here, the range factor $\texttt{r}$ and the strike $\texttt{K}$ are related to the lowerPrice $\mathtt{P_a}$ and upperPrice $\mathtt{P_b}$ of a LP position according to:

$$
\mathtt{K = \sqrt{P_a \cdot P_b}}\\ \\
\mathtt{r = \sqrt{\frac{P_b}{P_a}}}
$$

After some algebra, we arrive at a closed form expression for $\mathtt{V(S)}$:

$$
\begin{cases}
\mathtt{V(S) = \frac{\sqrt{KSr} - K - S}{r-1}}
\end{cases}
$$

## LP token as a short option

## Create long options 
Removing K numéraire of liquidity at price K creates a long put option. 
In other words, users can create a long option by borrowing/shorting a short option.

## Option's width
One key advantage of Panoptic options over regular options is the ability to create options with a fixed range, resulting in an options with a fixed Gamma. 
In other words, the Gamma of an option can be capped by widen- ing the range of an options position. 


## Moneyness

### In-the-money and out-the-money
The concept of in-the-money (ITM) and out-the-money (OTM) is simiar to traditional options.

A position is ITM if the price is above the strike price if the position is a call or, for a put, if it is below the strike price.
On the other hand, a position is OTM if the current price is below/above the strike price and the position is a call/put.

### At-the money 
A position that is at-the-money (ATM) has the current price inside the LP position's range.
This contrasts slightly with the definition of ATM for traditional options, which typically assumes being ATM only happens when the current price is exactly equal to the strike price (or within the nearest stike available).

### Far-the-money

In contrast with a position being ATM, a posution whose price is outside the LP position's range is call far-the-money (FTM).
This is also a new concept that is not seen in traditional finance. 

In Panoptic, it helps to describe a position as being FTM (as opposed to simply ITM or OTM) because a FTM position will not earn any streaming premium.
A position can be ITM and FTM as well: in that case, a long ITM position is firmly in the profitable zone but, since it will not accumulate any streaming premium, can be exercised without penalty.


## Option tokenType
A ETH-Dai put is the same as a Dai-ETH call.

## Multi-legged options
ERC1155 tokenization.
