---
sidebar_position: 4
---

# Option properties
Panoptic options have: width, moneyness, type, legs, etc..

## Payoff of a LP position 
Payoff equation, range, etc

## Create long options 
Removing K numéraire of liquidity at price K creates a long put option. 
In other words, users can create a long option by borrowing/shorting a short option.

## Option's width
One key advantage of Panoptic options over regular op- tions is the ability to create options with a fixed range, resulting in an options with a fixed Gamma. 
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
