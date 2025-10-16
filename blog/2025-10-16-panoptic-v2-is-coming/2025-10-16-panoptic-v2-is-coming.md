---
slug: panoptic-v2-is-coming
title: "The Evolution of Panoptic: From V1 to V2"
tags: [V2, Vaults]
image: /img/banners/panoptic-v2-is-coming-banner.png
description: "Panoptic V2 makes options powerful."
---

![](./01.png)

When Panoptic launched its first version, it was a proof of concept in the uncharted territory of perpetual options built on Uniswap V3 liquidity. Over the past year, we’ve learned through user behavior, stress testing, audits, and risk analysis. Some parts held up well, others showed structural friction.

Rather than layering incremental patches onto V1, we’re shifting gears to Panoptic V2, a more secure, easier-to-use, and scalable protocol built from the ground up for real-world use. Here’s how V2 builds on what V1 taught us, and where it takes Panoptic next.

### Looking Back: What Panoptic V1 Was

Panoptic V1 turned Uniswap V3 and V4 LP positions into perpetual options.

#### The V1 Blueprint

-   **Oracle-free premium streaming:** Instead of pricing options upfront with Black–Scholes or volatility oracles, V1 used a path-dependent fee model where option holders paid a streaming premium over time as prices moved
-   **Liquidity as collateral:** Liquidity providers (LPs) could deposit capital, and traders could borrow that liquidity and reposition it to simulate long option exposure
-   **Utilization and risk caps:** Parameters limited how aggressively borrowed liquidity could be used
-   **Permissionless deployment:** Any Uniswap V3 and V4 pool could host an options market
    

#### What Worked
-   **Innovation and composability:** V1 proved the concept that “LP equals Options”.
-   **Oracle independence:** Avoiding external volatility oracles reduced manipulation risk.
-   **Open design:** Anyone could deploy markets or provide liquidity.
-   **Proof of potential:** It showed perpetual options could exist in DeFi.  
      
    

### What We Learned

While V1 broke new ground, it also revealed challenges that shaped our redesign.
-   **Security:** A [vulnerability](/blog/position-spoofing-post-mortem) discovered through our bug bounty program highlighted the need for deeper audits and stronger safeguards.
-   **Complex UX:** Users had to manually manage ranges, rebalances, and collateral, creating a steep learning curve.  
-   **Onboarding friction:** The deposit fee and commission structure discouraged new users.   
-   **Limited Position Flexibility:** Exiting positions was often challenging due to restrictions around force exercises and limited options for reducing position size, making active position management troublesome.
-   **Inefficient Capital Allocation:** Uniform collateral requirements across all pools prevented users from accessing higher leverage on stable pairs, limiting overall capital efficiency.
    

To grow safely and sustainably, we needed a next-generation architecture. That’s what V2 delivers.

## Panoptic V2: What’s Changing and Why It Matters

V2 isn’t just V1 with fixes. It’s a full evolution that’s more secure, modular, and user-friendly while staying true to Panoptic’s mission of building a DeFi-native options layer.

### Stronger Foundations
-   **Comprehensive audits and 12+ protocol improvements:** V2 undergoes extensive testing on over a dozen new features  
-   **Vaults:** Perpetual Option Vault (POV) automation replaces manual range and rebalance management, enabling passive exposure to DeFi options yield
-   **Deposit fee removed → interest-rate lending model:** Passive liquidity providers now earn interest continuously on their deposits instead of an upfront fee, and users no longer pay fees to deposit
-   **Reducing position size:** Enables smoother position adjustments and more efficient trade management, making it easier to partially close or completely rebalance positions
-   **Force exercise:** Seamless ways to close positions due to cheaper force exercise fees and expanding force exercises to in-range positions
-   **Upgraded risk engines:** Users can increase exposure on stable pairs through higher leverage
    

### Vaults and Strategies

-   **Vault abstraction and manager delegation:** Instead of creating and managing positions manually, users can deposit into vaults curated by strategists    
-   **Rule-based vaults and structured products:** Choose from prebuilt strategies such as delta-neutral LPing, passive LPing, covered calls, and more—each has its own risk and return profile   
-   **Transparent fees and incentives:** Strategy creators can earn performance fees, aligning incentives with depositors
    

### A Better User Experience

-   **Simplified flow:** Select vault → Deposit → Monitor
-   **Clear visuals:** Real-time P&L curves, utilization, and strategy metrics
    
## V1 vs. V2

| Feature / Area          | Panoptic V1                                                                 | Panoptic V2                                                                                                             |
|-------------------------|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **Security**            | Comprehensive audits                                                        | Comprehensive audits with 12+ protocol improvements and vaults                                                         |
| **Fees**               | Deposit fee and commission model                                           | No deposit fee → interest-rate lending model where depositors continuously earn yield                                  |
| **Position Management** | Locked up positions, difficult to reduce size or exit                      | Close any position with a streamlined process to force exercise and reduce size                                         |
| **Risk Engine & Leverage** | Fixed utilization and conservative leverage limits                      | Modular risk engines allow higher, controlled leverage and greater capital efficiency on stable pairs                  |
| **Vaults & Automation** | None                                                                        | Vault-based automation for passive deposits and optimized yield generation                                             |
| **Referrals**           | None                                                                        | Built into V2 smart contracts to let you earn more by sharing Panoptic with your friends                               |
| **Interface & UX**      | Complex, manual workflows                                                  | Simplified select vault → deposit → monitor flow with real-time P&L, risk visuals, and intuitive vault navigation     |
  

## Roadmap

-   **October:** Core development, testing, and security audits for Panoptic V2
- **November:** Additional security audits and vault contracts, infrastructure, and interface
-   **Mid-December:** Mainnet relaunch aligned with V1’s one-year anniversary.

Panoptic V1 proved perpetual options were possible. Panoptic V2 makes them powerful. With a new fee model built to reward users and automated vaults that turn complex strategies into yield opportunities, Panoptic transforms options from a trading tool into a revenue engine. It’s the evolution of LPing and the beginning of on-chain options as a source of sustainable profit.

*Join the growing community of Panoptimists and be the first to hear our latest updates by following us on our [social media platforms](https://links.panoptic.xyz/all). To learn more about Panoptic and all things DeFi options, check out our [docs](https://panoptic.xyz/docs/intro) and head to our [website](https://panoptic.xyz/).*
