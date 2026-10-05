---
editorial_update: "2026-10-04"
slug: passive-liquidity-pools
title: "Passive Liquidity Pools"
tags: [Passive, Liquidity, Uniswap]
image: /img/banners/passive-liquidity-pools.png
description: "Panoptic's passive liquidity pools let LPs earn yield from Uniswap V3 without active management, combining V2's simplicity with V3's efficiency."
---
![](./01.png)

With the release of Uniswap V3, many liquidity providers (LPs) moved their positions from V2 to V3. The concentrated liquidity model of V3 offers increased yield potential, making it more attractive. However, some LPs prefer to stay on V2 because V3 positions require more active management.

Panoptic aims to offer the best of both worlds with its passive liquidity pools. Naturally, LPs might ask how exactly Panoptic achieves this.

### Questions We’ll Answer

-   What are the advantages of Uniswap V3?
    
-   Why do some LPs prefer Uniswap V2 over V3?
    
-   How can LPs get the best of both?
    
-   What are Panoptic’s passive liquidity pools?
    

## Advantages of Uniswap V3

Uniswap V3 offers significant advantages over V2. The most significant change in V3 allowed LPs to concentrate their capital within specific price ranges. This improved capital efficiency has led to Uniswap V3 becoming the most [popular](https://defillama.com/protocol/uniswap-v3#information) decentralized exchange (DEX).

![](./03.png)

LPs can earn significantly more fees with the same amount of capital compared to V2 due to liquidity being concentrated within their chosen price range. LPs in Uniswap V3 have more control over their risk-reward profile and can customize their positions to match their market views and risk tolerance.

## Why Some LPs Prefer Uniswap V2 over V3

While Uniswap V3 introduces powerful features for LPs, V2 retains a [strong appeal](https://defillama.com/protocol/uniswap-v2#information) due to its simplicity. Unlike V3, V2 pools only allow for full-range liquidity which covers the entire price range. This minimizes the need for active management or monitoring of LP positions since LPs don't have to worry about their liquidity going out-of-range.

![](./04.png)

Uniswap V2, being full-range by default, makes it easier for LPs to participate and for token launchers to bootstrap new pools. V2 pools are an attractive option for LPs who prefer a set-and-forget approach to providing liquidity.

## Passive Liquidity is the Solution

A perfect liquidity platform would minimize the need for active management and monitoring of positions (such as in Uniswap V2) while efficiently providing liquidity for traders (such as in Uniswap V3).

Panoptic’s passive liquidity pools are the ideal solution for LPs. Let's explore how they combine the best of both Uniswap V2 and V3.

## Exploring Passive Liquidity Pools

In the original V1 model described here, passive liquidity supported traders deploying liquidity into Uniswap. Current V2 lending also supports borrowing; consult the [lender guide](/docs/getting-started/passive-lp) for current behavior.

![](./02.png)

The historical V1 commission model generated passive yield in two ways:

1.  Active LPs can shift liquidity from the passive pool into specific Uniswap pool price ranges, paying a fixed fee to passive LPs.
    
2.  Traders who want to buy options can take the other side by borrowing LP tokens from active LPs in Uniswap. The LP tokens are burned and the underlying assets are returned to Panoptic’s passive liquidity pool. These traders also pay a fixed fee to passive LPs for doing so.

This continuous cycle of liquidity moving to and from Uniswap generates income for passive LPs. The fee paid to passive LPs is proportional to the amount of liquidity moved, so that larger positions and more frequent movement increases the yield earned by passive LPs.  

Passive liquidity pools are a great option for LPs seeking to earn passively and efficiently in the Uniswap Ecosystem.

## Advantages of Passive Liquidity Pools

Passive liquidity pools offer four clear advantages:

1. Active LP Fees: By supporting active LPs with capital to deploy into specific price ranges on Uniswap V3, the passive pool earns fees from active LPs.
    
2. Option Buyer Fees: Option buyers who borrow LP tokens provide another income stream for the passive pool.
    
3. Streamlined Liquidity Provisioning: Passive pools simplify the complex process of managing concentrated liquidity positions on Uniswap V3.
    
4. Passive  Income  Focus: LPs are provided with passive yield opportunities, making it attractive for investors who want to earn without the hassles of active management.

## Active LPing versus lending

An active Uniswap V3 LP selects a token pair, fee tier and price range, deposits the required tokens, and then monitors the position as price changes. Fees are earned when liquidity is used in range. See Uniswap’s [concentrated-liquidity explanation](https://docs.uniswap.org/concepts/protocol/concentrated-liquidity).

A passive lender instead chooses a supported token and market and deposits the token for shares. They do not select an AMM price range or manage its changing token inventory themselves. This makes single-sided participation possible; it does not remove the market-price risk of the deposited token.

![Passive lender liquidity supports active traders](../2023-10-30-better-liquidity-provisioning/PLP-visual-graphic.jpg)

![Active Uniswap LP management compared with passive Panoptic lending](../2024-10-08-bringing-passive-liquidity-to-uniswap/02.png)

## Where Does the Yield Come From?

The 2024 lending explanation describes active LPs borrowing capital to deploy in Uniswap and paying interest, with option activity contributing to the wider pool economics. Share accounting can retain earned returns in the pool, so subsequent returns accrue on the updated share value without a separate manual reinvestment.

Two useful inputs are the lender’s share of deposited tokens and demand for the market’s liquidity. Neither determines a guaranteed APY: utilization, interest rates, applicable fee routing and losses also affect returns. Historical V1 commission examples and current V2 interest-based lending should not be treated as identical fee schedules.

![Passive lender capital flows through Panoptic to active Uniswap liquidity](../2024-10-08-bringing-passive-liquidity-to-uniswap/03.png)

## What Are the Risks?

Passive lending avoids directly managing the two-token inventory of an AMM LP, but it is not risk-free. Extreme price moves, failed or delayed liquidations, smart-contract faults and resulting pool debt can reduce the value of deposits. The deposit’s token price can also change.

High utilization can limit withdrawals. Pool liquidity and asset stability matter when assessing exposure; auto-compounding does not guarantee positive returns or immediate access to all deposited funds. Review the [current lending and withdrawal guidance](/docs/getting-started/passive-lp) before depositing.
