---
sidebar_position: 1
---

# What is Panoptic?

Panoptic is a perpetual, oracle-free options protocol build on the Ethereum blockchain. 


The following is a brief overview of the _Panoptic protocol_

## Introduction


The Panoptic protocol consists of smart contracts that can directly interact with any Uniswap v3 pool contract to handle the minting, trading, and market-making of perpetual put and call options in a permission-less, trustless, and capital-efficient manner.
By embracing the Defi-Native nature of LP positions, Panoptic is the first decentralized and composable options protocol that is able to overcome the technical limitations and challenges that make the implementation of on-chain options difficult.


### What are Perpetual Options?
The Panoptic protocol utilizes Liquidity Provider (LP) positions in Uniswap v3 as a core primitive for trading long and short options.

### How do Panoptic Options differ from traditional options?

- Options are [perpetual and never expire](./panoptic-protocol/option-payoff)
- [Pricing](./panoptic-protocol/premium) does not involved counterparties
- Options have a [width](./panoptic-protocol/option-payoff), which simulates a time to expiration
- Collateralization requirements [respond](./panoptic-protocol/liquidations) to market activity
- Anybody can deploy an options market on any asset in a [permissionless manner](./category/technical-specifications)

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

