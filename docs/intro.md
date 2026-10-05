---
sidebar_position: 1
sidebar_label: Introduction
sidebar_class_name: menu__list-item-collapsible
---

# What is Panoptic?

Panoptic is a permissionless protocol for perpetual options and lending. V2 supports Uniswap v3 and v4 markets; see [deployment addresses](./contracts/deployment-addresses) for documented chains.

<video src="https://user-images.githubusercontent.com/62954565/223510059-8c057bc5-3957-466d-bbdd-27e2bdea02bb.mp4#t=0.55" preload="metadata" type="video/mp4" width="100%" height="auto" controls>
</video>

---

## Introduction

The Panoptic protocol consists of smart contracts on supported blockchains that handle the minting, trading, and market-making of perpetual put and call options.
Users interact directly with smart contracts. Execution still depends on chain availability, liquidity, collateral, and protocol controls.

Perpetual options use concentrated AMM liquidity and streamia (streaming premium) rather than a scheduled expiry and a single upfront premium. V2 also uses internal AMM-derived price observations for risk and solvency checks; oracle-free pricing does not mean there are no risk oracles.

Panoptic offers **Perpetual Option Vaults (POVs)**: automated vaults that execute strategies involving market volatility.
POVs wrap Panoptic’s perpetual options into deposit-based strategies. Returns are variable and can be negative; managed vaults also have strategy and redemption risks. Active traders can interact directly through the trading interface.

The following sections will provide a brief overview of the Panoptic protocol.

- [How To Use Panoptic](./product/opening-a-position): How to use the perpetual options trading app.
- [What Is Panoptic](./panoptic-protocol/overview): Understanding the Panoptic protocol.
- [Panoptions](./trading/basic-concepts): Options trading resources.
- [Developers](./developers/overview): Start with the SDK and plan an integration.
- [Security](./security/security_audits): Security and audit reports.
- [Hedge a Uniswap LP position](./product/uniswap-lps/hedge): Interactive guide to hedging impermanent loss and earning streamia on top of LP fees.

---

## Resources
- [Linktree](https://links.panoptic.xyz/all)
- [Developers](./developers/overview)
- [Litepaper](https://intro.panoptic.xyz/)
- [Whitepaper](https://paper.panoptic.xyz/)

*Join the growing community of Panoptimists and be the first to hear our latest updates by following us on our [social media platforms](https://linktr.ee/panopticxyz).*
