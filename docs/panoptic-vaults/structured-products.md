---
sidebar_position: 2
---

# Structured Products Overview

## What are Structured Products?
Structured Products are

## Structured Products vs. DeFi Option Vaults (DOVs)
Comparing the two, emphasizing how DOV were not very flexible and didn't get accurate pricing


## Vault types

By focusing on flexibility, the following types of vaults can be created using the Panoptic Vault smart contracts:

#### Yield Generation
- **Passive Liquidity Provisioning**: Deploy capital to different PanopticPool smart contracts
- **Yield Protection and Optimization**: Direct capital to any DeFi protocol and use Panoptic options for hedging
- **Decentralized Options Vaults**: Create single strategy vaults: e.g. covered calls, straddle/delta-neutral, bearish/naked-call), with a fixed-term or continuously rolling.
- **Basis Trading Vaults**: Capture funding rate arbitrage while using options to hedge directional risk

#### Risk Management 
- **Structured Products**: Generate higher yield through combining a zero-coupon bond with an options: reverse convertible bond, ...
- **Treasury Diversification**: Protect and diversify protocol treasuries: covered call selling, collar for capital protection, ...
- **Volatility Harvesting**: Systematically sell volatility during low volatility periods and buy protection during high volatility periods
- **Tail Risk Hedging**: Protect against black swan events with systematic out-of-the-money option strategies

#### Advanced Strategies
- **Dynamic Risk Parity**: Automatically rebalance portfolio risk exposure across multiple assets using options
- **Delta-Neutral Yield Farming**: Farm yield on volatile assets while maintaining market-neutral exposure through options
- **Market-making Vaults**: Entrusts funds to a market making curator to actively manage an options orderbook (e.g. Hyperliquid Liquidity Provider vaults)
- **Liquidation Vaults**: Monitor user positions in Panoptic and perform liquidations
  
## Risks
