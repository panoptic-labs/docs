---
sidebar_position: 4
---

# Option properties
Panoptic options have: width, moneyness, type, legs, etc.

## LP token as a short option


import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

### Creating a put option
Removing K numéraire of liquidity at price K creates a long put option payoff. 
Adding K numéraire of liquidity at price K creates a short put option payoff. 

<ThemedImage
  alt="Put"
  sources={{
    light: useBaseUrl('/img/Put.svg'),
    dark: useBaseUrl('/img/Put.svg'),
  }}
/>

Let's look at what happens for a long put:

1. Buyer removes K Dai from the Uniswap pool in a range around K, that liquidity is moved to the Panoptic Pool smart contract
2. The Buyer has to reimburse K Dai if the price remains above K. Burning that position results in no net gain/loss
3. The Buyer has to reimburse 1 ETH if the price is below K. 
4. Price is below K! The buyer sends 1 ETH at strike K, and they keep K Dai.
5. The buyer has effectively "Sold 1 ETH for K Dai, regardless of the price of ETH"

### Creating a call option
Removing 1 asset of liquidity at price K creates a long call option payoff. 
Adding 1 asset of liquidity at price K creates a short call option payoff. 

<ThemedImage
  alt="Call"
  sources={{
    light: useBaseUrl('/img/Call.svg'),
    dark: useBaseUrl('/img/Call.svg'),
  }}
/>

We can go through a similar exercise and see what happens for a long call:

1. Buyer removes 1 ETH from the Uniswap pool in a range around K, that liquidity is moved to the Panoptic Pool smart contract
2. The Buyer has to reimburse 1 ETH if the price remains below K. Burning that position results in no net gain/loss
3. The Buyer has to reimburse K Dai if the price is above K.
4. Price is above K! The buyer sends K Dai at strike K, and they keep 1 ETH.
5. The buyer has effectively "Purchased 1 ETH for K Dai, regardless of the price of ETH"

<!---
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
-->
