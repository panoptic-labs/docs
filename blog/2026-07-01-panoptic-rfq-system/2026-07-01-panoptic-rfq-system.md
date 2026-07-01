---
slug: panoptic-rfq-system
title: "RFQ Without a Settlement Contract"
tags: [Smart Contracts, RFQ, Liquidity]
image: /img/banners/panoptic-rfq-system-banner.png
description: "Panoptic RFQ lets users post signed buy requests that market makers can satisfy by adding native Panoptic liquidity, without a settlement contract or custodial coordinator."
---

Request for Quote, or RFQ, has become a common execution model in DeFi, where many token RFQ systems settle through dedicated exchange or settlement contracts that transfer assets between counterparties. RFQ is a trading mechanism where a buyer specifies the exposure they want and liquidity providers respond with prices or provide liquidity to satisfy that request.

Panoptic RFQ brings institutional-grade execution to perpetual options. For traders, RFQ dramatically simplifies options execution. Instead of navigating fragmented options chains, selecting expiries, and managing rolls, users simply specify the exposure they want, set the maximum premium they're willing to pay, and post the order onchain. Unlike traditional options venues, Panoptic is built on [perpetual options](https://panoptic.xyz/docs/trading/perpetual-options), meaning there are no expiries to select, no positions to roll, and no fragmented liquidity spread across multiple maturities.

*The initial rollout focuses on the [**ETH-USDC market**](https://app.panoptic.xyz/trade), with additional markets planned over time.*

## Users Control Their Price

Before posting an order, users specify the maximum premium they're willing to pay, expressed as a multiplier on the underlying Uniswap LP fees. This multiplier acts as the user's limit price. A higher multiplier means the user is willing to pay more for the option, increasing the likelihood that liquidity providers will choose to fill the order. A lower multiplier is more restrictive and may result in fewer or no fills.

## The RFQ Flow

The user specifies their desired exposure.

![](./01.png)

The user selects the highest premium multiplier they are willing to pay.

![](./02.png)

The user posts a buy order, and the RFQ is published to the billboard with the user's requested exposure and maximum acceptable premium.

![](./03.png)

Once the order enters the billboard, market makers or any participant can fill the request by minting the matching short-side liquidity directly through Panoptic. The coordinator does not match counterparties or settle the trade. It simply hosts the user's signed buy request.

![](./04.png)

When enough matching liquidity exists onchain, the order becomes executable for the requester. The user can then buy the requested option position directly through Panoptic, and the order is removed from the billboard after execution.

## No Settlement Contract, By Design

Instead of a wrapper contract, Panoptic uses a coordinator. It doesn't custody funds, doesn't settle trades, and doesn't sit in the middle of execution. Panoptic positions are state transitions that only make sense if both sides are created together, so there's no asset to hand off through a settlement contract. The coordinator's only job is to coordinate order flow — hosting the billboard of open orders so liquidity providers can find and fill them — without ever taking custody of user funds.

![](./05.png)

Its role is intentionally narrow: host signed RFQ orders, verify that posted orders and order-management actions are authorized by the requester, and expose the billboard for market makers and users. It does not decide prices, provide liquidity, custody assets, match counterparties, or settle trades.

That means:

- Posted orders are signed by the requester
- Market makers fill requests by adding liquidity directly onchain
- Fillability is derived from Panoptic liquidity, not coordinator state
- The requester executes the final buy directly through Panoptic

At launch, Panoptic RFQ works best with wallets that give you fine-grained control over transaction signing, such as Rabby, Frame, Coinbase Wallet, or a hardware wallet. Some wallets that broadcast transactions immediately, such as MetaMask, are not supported for this flow.
