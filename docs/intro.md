---
sidebar_position: 1
---

# What is Panoptic?

Panoptic is a perpetual, oracle-free options protocol build on the Ethereum blockchain. 

(put video here)

---

## Introduction

The Panoptic protocol consists of smart contracts that can directly interact with any Uniswap v3 pool contract to handle the minting, trading, and market-making of perpetual put and call options.
All smart contracts are available 24/7 and users can interact with the Panoptic protocol without the need for intermediaries like banks, brokerage firms, clearinghouses, market makers, or centralized exchanges.

Panoptic is the first decentralized and composable options protocol that is able to overcome the technical limitations and challenges that make the implementation of on-chain options difficult.
We achieve this by embracing the decentralized nature of Automated Market Makers and permissionless liquidity providing.

The following is a brief overview of the _Panoptic protocol_

### What are Options?

Options are one of the most traded instrument in traditional finance.
They can be used to [hedge](./trading/basic-concepts) a portfolio, [speculate](./trading/perpetual-options) on the value of an asset, create [synthetic positions](./trading/multi-leg-strategies) in a capital-efficient manner, or as a way to create [defined-risk](./trading/risks) positions. 

Options are an agreement between two parties to buy (or sell) an asset for a fixed price at a pre-determined time.
Hence, each option has a
- **Strike**: the agreed-upon price the asset has to be bought/sold
- **Expiry**: a time in the future when the transaction has to occur
- **Premium**: the value of the option, or how much does the buyer pays for the right to buy/sell the asset

(figure here)

The price of an option --called the premium-- used to be difficult to determine. 
Following the development of Nobel-prize winning mathematical models by Black, Myron, and Scholes, an optimal price can be derived in a way that buyers _and_ sellers both agree on the option contract's price.
Interestingly, the Black-Myron-Scholes model also described how the premium of an option changes over time.


### How do Panoptic Options differ from traditional options?

Options in Panoptic, however, are a little bit different than traditional options.. 
Behind the scenes, the Panoptic protocol utilizes Liquidity Provider (LP) positions in Uniswap v3 as a core primitive for trading long and short options.
Concretely, this means that:

- Options are [perpetual and never expire](./panoptic-protocol/option-payoff)
- [Pricing](./panoptic-protocol/premium) does not involved counterparties (like market makers) and is path-dependent
- Options have a [width](./panoptic-protocol/option-payoff), which simulates a time to expiration and reduce pin risk
- Collateralization requirements [respond](./panoptic-protocol/liquidations) to market activity
- Anybody can deploy an options market on any asset in a [permissionless manner](./category/technical-specifications)

(figure here)


### What are the risks

Options trading is not for everyone.
Like any form of leveraged trading, trading options is associated with significant risks.
Any user that wishes to interact with the Panoptic protocol has to understand the risks involved.

The main risks are: 
- **Over-exposure**: losing due to [leveraged exposure](docs/panoptic-protocol/option-payoff).
- **Unfavorable pricing**: paying a [large premium](docs/panoptic-protocol/premium) for options.
- **Forced exercise**: having [far-the-money](docs/panoptic-protocol/risks) positions closed by external actors/liquidators.
- **Liquidations**: losing deposited collateral because of a [margin call](docs/panoptic-protocol/liquidations). 

### What is the relationship between Panoptic and the Uniswap v3 protocol?

Options in Panoptic trace their origin to the simple observation that providing concentrated liquidity in Uniswap v3 generates a payoff that is mathematically identical to selling a put option.

(block diagram here)

---

## Resources


### Developers
Users can access the developers docs [here](./developers/smart-contracts-overview)

### Whitepaper
Users can access the whitepaper [here](./whitepaper.pdf)

### Security 
Users can access details about the security audits [here](./category/security)

### Quick links

- Twitter [@panoptic_xyz](https://twitter.com/panoptic_xyz)
- Medium [panoptic](https://panoptic.medium.com)

