---
sidebar_position: 1
sidebar_label: Introduction
sidebar_class_name: menu__list-item-collapsible
---

# What is Panoptic?

Panoptic is a perpetual, oracle-free options protocol build on the Ethereum blockchain. 

(put video here)

---

## Introduction

The Panoptic protocol consists of smart contracts on the Ethereum blockchain that handles the minting, trading, and market-making of perpetual put and call options.
All smart contracts are available 24/7 and users can interact with the Panoptic protocol without the need for intermediaries like banks, brokerage firms, clearinghouses, market makers, or centralized exchanges.

Panoptic is the first decentralized and composable options protocol that is able to overcome the technical limitations and challenges that make the implementation of on-chain options difficult.
We achieve this by embracing the decentralized nature of Automated Market Makers and permissionless liquidity providing in [Uniswap v3](https://uniswap.org/).

The following sections will provide a brief overview of the _Panoptic protocol_.


### Who is Panoptic for?

Investors that first learn about options may be overwhelmed at first. 
While the math behind options may seem daunting for most users, anyone without a math background may still earn sustainable returns as long as users follow a cores set of [basic rules](/docs/trading/basic-concepts).

#### Retail Users
Retail investors may trade options the same way they trade stock or tokens: they may buy call options to profit when the underlying increases in price, or they can buy put options to profit when the underlying goes down in price. 
In Decentralized Finance, the retail user can also 

#### "Pro-tail" Users

#### Institutions

#### DAOs and protocol treasuries

### What are the risks?

Options trading is not for everyone.
Like any form of leveraged trading, trading options is associated with significant risks.
Any user that wishes to interact with the Panoptic protocol has to understand the risks involved.

The main risks are: 
- **Over-exposure**: losing due to [leveraged exposure](./panoptic-protocol/collateral).
- **Unfavorable pricing**: paying a [large premium](./panoptic-protocol/premium) for options.
- **Forced exercise**: having [far-the-money](./panoptic-protocol/risks) positions closed by external actors/liquidators.
- **Liquidations**: losing deposited collateral because of a [margin call](./panoptic-protocol/liquidations). 

### What is the relationship between Panoptic and the Uniswap v3 protocol?

The idea behind Perpetual Options is the simple observation that providing concentrated liquidity in Uniswap v3 generates a payoff that is mathematically identical to selling a put option.
In a sense, the liquidity provider (LP) positions are tokenized short puts.
What Panoptic enables is the minting of options in a "peer-to-protocol" manner but facilitating the transfer of these tokenized LP positions to create long/short puts and calls.

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

