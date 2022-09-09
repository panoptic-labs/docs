---
sidebar_position: 1
---

# What is Panoptic?

Panoptic is a perpetual, oracle-free options protocol build on the Ethereum blockchain. 

(put video here)

## Introduction

The Panoptic protocol consists of smart contracts that can directly interact with any Uniswap v3 pool contract to handle the minting, trading, and market-making of perpetual put and call options.
All smart contracts are available 24/7 and users can interact with the Panoptic protocol without the need for intermediaries like banks, brokerage firms, clearinghouses, market makers, or centralized exchanges.

Panoptic is the first decentralized and composable options protocol that is able to overcome the technical limitations and challenges that make the implementation of on-chain options difficult.
We achieve this by embracing the decentralized nature of Automated Market Makers and permissionless liquidity providing.

The following is a brief overview of the _Panoptic protocol_

### What are Options?

Options are one of the most traded financial instrument in traditional finance.
They can be used to [hedge](./trading/basic-concepts) a portfolio, [speculate](./trading/perpetual-options) on the value of an asset, create [synthetic positions](./trading/multi-leg-strategies) in a capital-efficient manner, or as a way to create [defined-risk](./trading/risks) positions. 

Each option has a strike and an expiry, and the price of an option (called premium) following Nobel-prize winning mathematical models to ensure that the buyer _and_ the seller both agree on an option contract's optimal price.



### How do Panoptic Options differ from traditional options?

Options in Panoptic, however, are a little bit different than traditional options.. 

- Options are [perpetual and never expire](./panoptic-protocol/option-payoff)
- [Pricing](./panoptic-protocol/premium) does not involved counterparties
- Options have a [width](./panoptic-protocol/option-payoff), which simulates a time to expiration
- Collateralization requirements [respond](./panoptic-protocol/liquidations) to market activity
- Anybody can deploy an options market on any asset in a [permissionless manner](./category/technical-specifications)

  Behind the scenes, the Panoptic protocol utilizes Liquidity Provider (LP) positions in Uniswap v3 as a core primitive for trading long and short options.

### What are the risks

The selling of undercollateralized options is typically associated with significant risks.


### What is the relationship between Panoptic and the Uniswap v3 protocol?

Options in Panoptic trace their origin to the simple observation that providing concentrated liquidity in Uniswap v3 generates a payoff that is mathematically identical to selling a put option.


## Resources


### Developers
Users can access the developers docs [here](./developers/smart-contracts-overview)

### Whitepaper
Users can access the whitepaper [here](./whitepaper.pdf)

### Security 
Users can access details about the security audits [here](./category/security)

### Quick links

