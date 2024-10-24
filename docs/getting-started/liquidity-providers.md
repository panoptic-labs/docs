---
sidebar_position: 1
label: "Liquidity Providers"
---
# Liquidity Providers (LPs)

Panoptic empowers LPs with increased yield, impermanent loss (IL) mitigation, advanced strategies, and risk management.

### Increased Yield
LPs who deposit liquidity into AMMs like Uniswap V3 and V4 are unable to earn additional yield on their LP token. This is because Uniswap V3 and V4 represent LP tokens as [NFTs](https://panoptic.xyz/research/reasons-bullish-financial-nfts), which are harder to integrate into the rest of the DeFi ecosystem.

Through Panoptic's innovative [Semi-Fungible Position Manager](https://panoptic.xyz/docs/developers/semifungiblepositionmanager), LPs are able to lend out their LP tokens for *additional* yield. LPs still earn all of the fees they would have been entitled to on Uniswap, plus an additional yield that comes from options buyers who are borrowing the LP token.

![spread-bonus.png](/img/spread-bonus.png)

### Impermanent Loss (IL) Mitigation
LPs don't need to feel trapped by IL when they understand options. IL is simply gamma risk in options trading: the accelerating risk of assets conversion away from the initial 50:50 ratio.

LPs can use Panoptic to control and decrease the amount of IL suffered. To mitigate IL, LPs can:

1. Use Panoptic to deploy liquidity onto Uniswap. Deploying through Panoptic enables your LP token to be lent out to other traders, which increases your profitability and decreases your IL.
2. Buy perpetual options to transform [naked](https://panoptic.xyz/research/naked-covered-call-defi-options) positions into [spreads](https://panoptic.xyz/docs/trading/multi-leg-strategies#spreads).
3. Keep track of and [neutralize](https://panoptic.xyz/research/options-market-making#delta-neutral-trading) your delta and gamma.
4. Trade [wide](https://panoptic.xyz/research/uniswap-lp-width) positions to limit pin risk.

### Advanced strategies
LPs are [selling perpetual put options](https://panoptic.xyz/research/loan-shark-with-put-call-parity#put-call-lp-parity), whether they know it or not. Panoptic embraces this discovery by rehypothecating CLAMM liquidity to create option payoffs for users. Instead of only *selling* put options, LPs can use Panoptic as a one-stop shop to also *buy* put options, buy call options, sell call options, trade delta-neutral straddles, and more. Stop being restricted to only trading neutral-to-bullish positions in AMMs, and start exploring the world of bearish, delta-neutral, bullish, long volatility, and short volatility trades!

### Risk Management
LPs can take advantage of Panoptic's *visual* interface, that allows them to:
1. Choose the right LP [width](https://panoptic.xyz/research/uniswap-lp-calculate-price-range) based on their desired [timescale](https://panoptic.xyz/research/zero-dte-defi-options).
2. Easily monitor their position's P&L, delta, gamma, and other Greeks.
3. Decide when to open or close an LP position based off of the risk dashboard's [implied volatility (IV)](https://panoptic.xyz/research/uniswap-options-lp-analysis#implied-volatility-vs-realized-volatility) metric
4. Rebalance their LP position through Panoptic's gas-efficient and low-cost [rolling](https://panoptic.xyz/research/panoption-trading-strategies-covered-call-rolling#actively-managing-your-positions-the-concept-of-rolling-options) mechanism.