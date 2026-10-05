---
sidebar_position: 1
label: "Pips"
---

# Pips: Season 3

Pips measure your contribution to Panoptic. In Season 3, they are earned by paying trading fees in eligible markets, weighted by boosts, and distributed in fixed-size campaigns.

**Campaign 2 is live.** Since **September 22, 2026**, it awards **100,000,000 Pips** for activity in two markets that share one allocation: **WETH/USDC 5-bps** on Ethereum (Uniswap v3) and **SPY/USDG 30-bps** on Robinhood Chain (Uniswap v4). Boosts are now active, and Uniswap LPs on the [Panoptic VIP List](#panoptic-vip-list) get a one-time bonus and a boost.

| Season | Market | Pips | Status |
| --- | --- | --- | --- |
| Season 1 | Panoptic v1 | 1,498,552,867 | Final |
| Season 2 | ETH/USDC 30-bps (v4) | 40,000,000 | Final |
| Season 3 · Campaign 1 | WETH/USDC 5-bps (v3) | 100,000,000 | Final |
| Season 3 · Campaign 2 | WETH/USDC 5-bps (v3) · SPY/USDG 30-bps (v4, Robinhood Chain) | 100,000,000 | Live |

Season 1 and Season 2 balances are frozen and carried on your account. Nothing you earned expires.

## How you earn

Season 3 awards Pips on **fees paid**. Two kinds of fees count:

- **Position and loan fees:** **3 bps of notional**, charged when you open a position or a loan.
- **Option streamia (streaming premium) fees:** a **2.5% fee** on option streamia, whether you earn the streamia or owe it, capped at **30 bps of notional**. It accrues daily while a position is open, so you don't need to close it to be credited.

**Want more Pips? Trade more.** More volume means more position fees, and more open positions mean more streamia accruing. Every dollar of fees counts. [Start trading →](https://app.panoptic.xyz)

Each UTC day's Pips issuance is proportional to the total eligible fees paid that day, at a fixed rate for the campaign. That day's Pips are then shared among all accounts **in proportion to each account's fees multiplied by its [boost](#boosts)**. Boosts change how the day's Pips are split; they don't increase how many are issued.

Open positions are snapshotted daily, and the streamia fees accrued that day count toward your fees paid even if the position stays open. Unrealized streamia earns Pips the day it accrues, not when you close. Only completed (finalized) days count, so your total updates once per day rather than tick by tick.

Depositing into an eligible vault also earns: fees paid by a vault pass through to its depositors, in proportion to how long their deposits were held that day. Eligible vaults in Campaign 2 are the **WETH PLP** and **Unicorn USDC** vaults on Ethereum and the **USDG PLP** vault on Robinhood Chain. Deposits outside these vaults do not earn campaign Pips.

There is no longer a depositor/trader split, and profit or loss is irrelevant. Only fees paid and your boost matter.

## Campaigns and how they end

Season 3 runs as a sequence of campaigns. Each campaign has a Pips allocation and ends when its markets reach an undisclosed revenue milestone. The day the milestone is crossed is paid out in full, and **the following UTC day is a grace day** that is still paid at the same campaign's rate, so activity at the end of a campaign is never wasted. Because of this, a campaign's final total can end slightly above its allocation. The next campaign opens the day after the grace day, and its markets and size are announced then.

Balances from completed campaigns are final and stay on your account. More of the campaign mechanics will be disclosed progressively as Season 3 advances.

## Pips and the token

Campaign 2's 100,000,000 Pips correspond to **0.5% of the total token supply**. Each campaign's supply allocation is set when the campaign starts and will not be revised afterward. Future campaigns may award different amounts of Pips against their own allocations, announced as each campaign launches. The mechanics of any token distribution, including timing, structure, and per-account eligibility, have not been finalized. Pips are non-transferable, and no individual account holds a claim on tokens until a token distribution is formally announced.

## Boosts

Your boost starts at **1.0×**, and each boost you qualify for adds to it. Your fees are multiplied by your boost when each day's Pips are split. Track your progress on the [Pips page](https://app.panoptic.xyz/leaderboard/pips).

| Boost | Adds up to | How to qualify |
| --- | --- | --- |
| **Uniswap LP** (status) | +0.50× | Your wallet is on the [Panoptic VIP List](#panoptic-vip-list). |
| **Vault Depositor** (status) | +0.25× | You held a funded eligible vault deposit in an earlier Season 2 or Season 3 campaign. A deposit counts once the vault has fulfilled it and issued shares; deposits made during the current campaign do not qualify. |
| **Survivor** (status) | +0.25× | Your wallet held eligible protocol liquidity at the time Panoptic V1 was retired. |
| **Daily Connect** | +0.25× (5 steps of +0.05×) | Connect your wallet in the app once per UTC day. Each qualifying day climbs one step; a missed day drops one step. |
| **Trade Streak** | +0.50× (5 steps of +0.10×) | Open or close a position or loan each UTC day that uses at least 5% of your collateral. Each qualifying day climbs one step; a missed day drops one step. |
| **Volume Tiers** | +1.00× (10 tiers of +0.10×) | Lifetime Season 3 fees paid reach $30, $100, $300, $1K, $3K, $10K, $30K, $100K, $300K, and $1M. Each tier is permanent once reached and applies from the following day. |

With every boost, the maximum is **3.75×**.

## Panoptic VIP List

The Panoptic VIP List recognizes **5,000 Uniswap LPs**: wallets that held more than $1,000 in Uniswap LP liquidity at the **September 4, 2026 snapshot**. Each listed wallet gets:

- **A one-time 25,000-Pip bonus**, credited the first time the wallet connects to the app. It is paid outside campaign allocations and is not multiplied by boosts.
- **The Uniswap LP boost (+0.50×)** on campaign Pips.

Listed wallets are ranked into tiers by their snapshot liquidity:

| Tier | Uniswap LP liquidity |
| --- | --- |
| Leviathan | $10M+ |
| Whale | $1M to under $10M |
| Dolphin | $100K to under $1M |
| Fish | $10K to under $100K |
| Shrimp | $1K to under $10K |

Check any wallet on the [VIP List page](https://app.panoptic.xyz/portfolio), with or without connecting. If a wallet isn't listed but currently holds $1,000 or more in Uniswap LP liquidity, use **Request review** on that page to ask the team to add it. Searching or spectating a wallet does not enroll it.

## Fair play

Pips reward genuine trading, and all fee-paying activity earns. In exceptional cases, such as large-scale manipulation aimed at capturing a campaign's allocation, Panoptic may withhold Pips from the accounts involved, at its sole discretion. Accounts flagged for wash trading have their boost set to **0.5×**, regardless of any other boosts.

## Eligibility

:::warning Ineligible jurisdictions

The Pips program and any future token distribution are not available to persons in jurisdictions where participation would be restricted or unlawful, including sanctioned jurisdictions. Residents of these jurisdictions may accrue Pips on the leaderboard, but such Pips carry no entitlement to any distribution.

:::

## FAQ

**What is a Pip? Is it a token?**
A Pip is an off-chain point tracking your contribution to the protocol. It is not a token and cannot be traded or transferred.

**How do I start earning?**
Open a position or a loan in an eligible market on Ethereum or Robinhood Chain, or deposit into an eligible vault. Position, loan, and option streamia fees you pay earn Pips automatically, with no registration needed.

**Why isn't my Pips number updating in real time?**
Pips are settled per UTC day. Your total includes finalized days only, so it updates once per day.

**Do I earn on streamia I receive, or only streamia I pay?**
Both directions count: the 2.5% streamia fee (capped at 30 bps of notional) earns Pips whether you earn the streamia or owe it.

**Do I have to close my position to get credited?**
No. Streamia fees accrue daily while the position stays open.

**Do losses reduce my Pips?**
No. Pips are based on fees paid, not PnL.

**Which markets are eligible? Will more be added?**
Campaign 2 covers the WETH/USDC 5-bps v3 market on Ethereum and the SPY/USDG 30-bps v4 market on Robinhood Chain. Future campaigns may use other markets; each is announced when the campaign starts.

**What is the Pips-per-dollar rate?**
Each campaign issues Pips at a fixed rate per dollar of eligible fees, set by its allocation and its revenue milestone. The milestone, and therefore the rate, is not disclosed during the campaign.

**Do my Season 1 and Season 2 Pips still count?**
Yes. Prior seasons are final and your balances carry forward alongside Season 3 earnings.

**Why did the campaign end when it did?**
Campaigns end on the revenue milestone, not a calendar date. The day the milestone is crossed and the grace day after it are paid in full, so ongoing activity is credited through the end.

**Do fees routed through a builder code earn the same?**
Yes. Your full fee counts, regardless of how it is split between the protocol and a builder.

**How does the vault pass-through work exactly?**
Each day, the Pips a vault earns from its fees are split among its depositors in proportion to how long each deposit was held during that day. Vault addresses themselves do not appear on the leaderboard.

**How do boosts work?**
Boosts multiply your fees when each day's Pips are split, so they increase your share without creating extra Pips. See [Boosts](#boosts) for the full list.

**Is my wallet on the VIP List?**
Search it on the [VIP List page](https://app.panoptic.xyz/portfolio). No connection is required.

**When is the VIP bonus credited?**
The first time a listed wallet connects to the app. Being on the list does not mean the bonus has been credited yet.

---

*Program terms, including eligible markets, fee types, boosts, and similar mechanics, may evolve between campaigns. Each campaign's Pips total and its share of token supply are set when the campaign starts. Statements about the timing and structure of any future token distribution are forward-looking.*

![](/img/research/panoptic-season-3-points.png)
