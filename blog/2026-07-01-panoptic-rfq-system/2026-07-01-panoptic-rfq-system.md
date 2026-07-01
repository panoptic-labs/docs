---
slug: panoptic-rfq-system
title: "RFQ Without a Settlement Contract"
tags: [Smart Contracts, RFQ, Liquidity]
image: /img/banners/panoptic-rfq-system-banner.png
description: "Panoptic RFQ uses a non-custodial coordinator instead of a settlement contract, enabling native onchain options execution and permissionless liquidity provision."
---

Request for Quote, or RFQ, has become a common execution model in DeFi, with protocols like CoW, 1inch Fusion, 0x, and Hashflow relying on settlement contracts to transfer assets between counterparties. RFQ is a trading mechanism where a buyer specifies the exposure they want and liquidity providers respond with prices or provide liquidity to satisfy that request.

Panoptic RFQ brings institutional-grade execution to perpetual options. For traders, RFQ dramatically simplifies options execution. Instead of navigating fragmented options chains, selecting expiries, and managing rolls, users simply specify the exposure they want, set the maximum premium they're willing to pay, and execute directly onchain. Unlike traditional options venues, Panoptic is built on [perpetual options](https://panoptic.xyz/docs/trading/perpetual-options), meaning there are no expiries to select, no positions to roll, and no fragmented liquidity spread across multiple maturities.

*The initial rollout begins with the [**ETH-USDC market**](https://app.panoptic.xyz/trade), with additional markets planned over time.*

## Users Control Their Price

Before requesting quotes, users specify the maximum premium they're willing to pay, expressed as a multiplier on the underlying Uniswap LP fees. This multiplier acts as the user's limit price. A higher multiplier means the user is willing to pay more for the option, increasing the likelihood that liquidity providers will choose to fill the order. A lower multiplier is more restrictive and may result in fewer or no quotes.

## The RFQ Flow

The user specifies their desired exposure.

![](./01.png)

The user selects the highest premium multiplier they are willing to pay.

![](./02.png)

The user submits a buy order, and the RFQ is posted with the user's requested exposure and maximum acceptable premium.

![](./03.png)

The order is matched and, once sufficient liquidity has been provided, becomes executable.

![](./04.png)

Once the order enters the queue, market makers or any participant can choose to provide liquidity within the user's maximum price limit. When sufficient liquidity is available, the user reviews the quote and chooses whether to execute the trade. Once executed, the position settles on Panoptic as an onchain options position, without wrapper contracts or custodial settlement.

## No Settlement Contract, By Design

Instead of a wrapper contract, Panoptic uses a coordinator. It doesn't custody funds, doesn't settle trades, and doesn't sit in the middle of execution. Its only job is to coordinate order flow, verify submitted transactions, and facilitate execution without ever taking custody of user funds.

## Designed to Trust Nothing

The coordinator is intentionally minimal. It validates submitted transactions and coordinates order flow, but it never takes custody of assets or acts as a counterparty. Execution occurs directly through Panoptic's native protocol interactions, preserving the system's non-custodial design.

At launch, Panoptic RFQ is not supported by wallets that require signed transactions to be broadcast immediately, such as MetaMask. To use RFQ, users should connect with a wallet that supports this flow, such as Rabby, Frame, Coinbase Wallet, or a hardware wallet.

## The Coordinator is Deliberately Boring

The coordinator's job is intentionally narrow: validate transactions, verify order parameters, and forward valid execution requests. It doesn't decide prices, provide liquidity, or take custody of user assets.

That means:

- Every solver quote is EIP-712 signed and bound to a specific request hash
- Every transaction is decoded and checked before submission
- Transactions must match the correct chain, pool, function, and parameters
- Invalid or mismatched transactions are rejected before they ever reach the chain

Even the way data is handled reflects this philosophy. Signed transactions are kept only in memory and are wiped as soon as the RFQ session completes. There's no persistent storage and no hidden state that the system relies on. The coordinator doesn't try to be trusted. Instead, it tries to make trust unnecessary.

## Why This System Looks Different

![](./05.png)

Most RFQ systems converge on the same architecture because tokens are easy to move, and settlement contracts can transfer assets between parties. Panoptic positions don't work that way. They're state transitions that only make sense if both sides are created together. Trying to force that into a wrapper-based model would introduce unnecessary complexity and weaken guarantees.

So instead, the system leans into the constraint: no settlement contract. It's slightly less convenient in the ways you'd expect.

But the important guarantees hold:

- Orders execute only within the user's selected premium threshold
- The coordinator never takes custody of assets
- Option positions are created natively through Panoptic

And in practice, those are the properties that matter. Rather than forcing Panoptic into a traditional RFQ architecture, the system adapts to the protocol's unique design, enabling permissionless liquidity provision and native onchain options execution without custodial settlement.

*Join the growing community of Panoptimists and be the first to hear our latest updates by following us on our [social media platforms](https://links.panoptic.xyz/all). To learn more about Panoptic and all things DeFi options, check out our [docs](/docs/intro) and head to our [website](https://panoptic.xyz/).*
