---
sidebar_position: 2
---

# Panoptic Options
The core primitive of the Panoptic is a Uniswap v3 LP position.

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

- Options are [perpetual and never expire](./panoptic-protocol/options#liquidity-providing-as-selling-options)
- [Pricing](./panoptic-protocol/premium) does not involved counterparties (like market makers) and is path-dependent
- Options have a [width](./panoptic-protocol/options#liquidity-providing-as-selling-options), which simulates a time to expiration and reduce pin risk
- Collateralization requirements [respond](./panoptic-protocol/liquidations) to market activity
- Anybody can deploy an options market on any asset in a [permissionless manner](./category/technical-specifications)

(figure here)


## Liquidity providing as selling options

## Payoff of a LP position 

## Create long options
