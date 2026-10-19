---
authors: G
slug: risk-engine-v2
title: "RiskEngine v2 Is Live"
tags: [Launch, Smart Contracts, Open Source, Options, Liquidity]
image: /img/banners/risk-engine-v2.png
description: "Cheaper longs, fairer force exercises, a floor for lenders, and a RiskEngine that upgrades in place. Here's what changed on Ethereum Mainnet and Robinhood Chain, and what to do with your positions."
---

![](./01.png)
_**Cheaper longs. Fairer exercises. A floor for lenders.**_

---

RiskEngine v2 went live on Ethereum Mainnet and Robinhood Chain on October 12, 2026, with new pools on both chains.

The RiskEngine is the contract that decides how much collateral every Panoptic position needs, what a force exercise costs, and how lending rates move. It sits between the options clearing layer and the collateral vaults. Changing it changes the economics of every trade, so we want to be explicit about what moved, why, and what it means for your positions.

## Trade with less collateral

**Long options now require 1% of notional as base collateral, down from 10%.**

A long option's own remaining value already backs most of what the holder owes. When you buy a 1 ETH call, the collateral you post sits next to the value of the option itself, and both count toward your buying power. The old 10% figure was double-counting that value.

This applies to both risk tiers. On the crypto blue-chip tier (ETH/USDC), base buyer collateral drops from 10% to 1%. On the xStocks tier (SPY/USDG), it drops from 15% to 1%.

**Force exercise fees now track the option's remaining value, not a flat 30 bps.**

Anyone can force exercise a position with a long leg. Previously the exercisor paid the holder 30 basis points of notional whenever a long leg was in range, and 1 basis point otherwise, regardless of what the option was actually worth. That overpaid holders of near-worthless options and underpaid holders of options with real extrinsic value left.

The exercisor now pays the holder 50% of the long leg's estimated remaining extrinsic value, evaluated at the oracle price. The fee peaks when the price sits at the strike and falls as the price nears the edge of the range. Two floors protect the holder: in range, the fee never drops below the pool's swap fee (for example 30 bps on a 30 bps pool), and out of range it stays at 3 bps, which covers the commission the holder paid to open. The fee is capped at 50% of notional for very wide legs. The full formula is in the [force exercise docs](/docs/panoptic-protocol/V2/exercise-cost).

## Earn with a floor

**The lending rate can no longer decay below 2% at target utilization.** It was 0.1%.

Panoptic uses an adaptive interest rate model: when borrowing demand is low for a sustained period, the rate at target utilization ratchets down. Under the old floor, a quiet few weeks could push the rate paid to passive liquidity providers close to zero. The new floor of 2% annualized bounds that decay.

To be precise, this is a floor on the target rate, not a guaranteed yield. The rate you actually earn still depends on how much of the vault is borrowed. Details are in the [interest rate model docs](/docs/panoptic-protocol/V2/interest-rate-model).

## Built sturdier

**Cross-collateral buffers on the ETH/USDC tier move from 100% to 90%.** Panoptic lets you back a position with either token in the pair. Collateral held in the other token now counts at 90% of its value instead of 100%, so a put backed entirely by ETH needs about 11% more collateral than before, and likewise a call backed entirely by USDC. Positions backed by the matching token are unaffected. The xStocks tier uses 75% buffers on both sides, replacing the previous asymmetric 75%/90% split.

**Loan margin now ramps with utilization.** On the ETH/USDC tier, the maintenance margin on borrowed principal rises from 10% at low utilization to 25% when the vault is saturated. The xStocks tier uses a flat 25%. Loans cost a bit more margin when a vault is heavily used, which is exactly when the protocol most needs the cushion.

**Collateral accounting is tighter.** Requirements are aggregated with wider arithmetic so that very large accounts read as insolvent instead of reverting, and individual loan sizes are hard-capped. Each position is priced at the utilization recorded when it was minted, rather than the account-wide maximum. The formula for in-range short options now interpolates so that a wide short always covers its closing cost. New test suites cover in-range shorts, exercise cost, margin overflow, the safe-mode floor, and per-position utilization, with fuzzed inputs across the full price range.

## Upgradable going forward

Until now, every RiskEngine change meant deploying new pools, putting the old ones in close-only mode, and asking everyone to migrate. That is the last time we will ask you to do that for a risk-engine update.

The RiskEngine now sits behind an ERC-1967 transparent proxy with a fixed address. Pools and collateral vaults bind to that address at creation. Future risk-engine updates swap the implementation behind the proxy, and every pool served by it picks up the new logic in place. No migration, no close-only mode.

The upgrade key is held by a multisig today, with a governance contract and timelock to follow. The scope of that key is narrow by construction. Pools and collateral vaults stay immutable: an upgrade can change risk parameters and margin logic, but the upgrade key cannot touch user funds or move collateral. The [proxy reference](/docs/contracts/V2/RiskEngine/contract.RiskEngineProxy) lists the invariants every upgrade must preserve.

Deployed proxies:

| Tier | Proxy address |
| --- | --- |
| Crypto blue chip | `0x000000000000ffE5eFdB5AE76b9200263C58b4c0` |
| xStocks | `0x000000000000FfADa7c641E2aD6B13b51b50Cc94` |

Two further proxies are reserved for future tiers and currently point to a reverting stub.

## Move to the new pools

The new pools are live in the [Panoptic app](https://app.panoptic.xyz/) on Ethereum Mainnet and Robinhood Chain.

The old pools are in close-only mode. You can keep positions open there and keep earning streamia, but no new positions can be minted. When convenient:

1. Close your positions in the old pools.
2. Withdraw your collateral.
3. Redeposit into the new pools.

Pools running the retiring RiskEngine are marked as deprecated in the app, and guards prevent new positions from being opened into them by mistake. Having trouble closing a position? Reach out on [Discord](https://discord.gg/8sX5Af2KXG) or via the Help button in the app.

## Don't trust, verify

Every change in this release is public, with its tests, in [panoptic-v2-core PR #270](https://github.com/panoptic-labs/panoptic-v2-core/pull/270). The full parameter set for both tiers is documented on the [protocol parameters page](/docs/contracts/parameters).

Trading and borrowing involve risk of loss, including smart-contract risk, liquidation risk, and market volatility. Options and leveraged positions may not be suitable for all users.

*Join our growing community and be the first to hear our latest updates by following us on our [social media platforms](https://links.panoptic.xyz/all). To learn more about Panoptic and all things DeFi options, check out our [docs](/docs/intro) and head to our [website](https://panoptic.xyz/).*
