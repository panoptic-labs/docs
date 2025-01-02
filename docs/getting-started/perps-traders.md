---
sidebar_position: 4
label: "Perps Traders"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Perps Traders

If you're a trader looking to enhance your perpetual trading experience with capped downside, leverage, and no liquidation risk, Panoptic is the platform for you.

With Panoptic, you can trade perps and perpetual options on any asset available on Uniswap. This works by [combining perpetual options to create synthetic perps](/research/introduction-synthetic-perps#synthetic-perps-on-panoptic), letting you go long or short on any token.

## Why Trade Perps on Panoptic?
- **Trade Any Token**: Panoptic allows you to trade perps on [any](/docs/product/markets) ERC-20 token or native asset, thanks to its permissionless and oracle-free design. Panoptic supports the immediate listing of perps on any ERC-20 token or native asset without having to wait for oracle support.
- **New Markets**: Trade perps on alternative pairs such as perps on BTC-ETH price, stablecoin-to-stablecoin prices, or memecoins.
- **Leverage**: Gain exposure with up to 3.33x leveraged perps.
- **Non-custodial and permissionless**: Panoptic is a completely non-custodial, decentralized exchange. 
All funds are held and managed automatically on the blockchain through public, audited smart contracts.
Depositing, trading, pricing, settlement, listing, and liquidating are all on chain and permissionless.

## Why Trade Perpetual Options on Panoptic?
- **Capped Downside**: Perpetual options provide a major advantage over perps for traders to limit their downside risk. For example, buying a perpetual call option on ETH gives you unlimited upside should the price of ETH rise, while capping your downside should the price of ETH fall. Contrast this with ETH perps which have unlimited downside should the price of ETH fall.
- **Reduced Liquidation Risk**: Perpetual options are protected against liquidations from single-wick price movements. Should price move in one direction, positions are protected through capped losses.
- **Higher Leverage**: Buy perpetual options with up to 10x leverage, making for bigger potential gains (and losses).

## Start Trading Perps with Panoptic
Ready to get started? Visit our [app](https://app.panoptic.xyz) to begin trading perps and perpetual options on any token with Panoptic.

<iframe
  src="https://www.youtube.com/embed/B-crAZNbgWg?si=4wOoKVPcX7-DXOJc"
  title="YouTube video player"
  style={{
    width: '100%',
    height: 'auto',
    aspectRatio: '16/9',
    border: 'none',
  }}
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

<ThemedImage
  alt="Trading-Interface"
  sources={{
    light: useBaseUrl('/img/trading-interface.svg'),
    dark: useBaseUrl('/img/trading-interface.svg'),
  }}
  style={{width: '100%'}}
/>

---

### Advanced Resources
- [Synthetic perps](/docs/trading/multi-leg-strategies#synthetic-positions)
- [Synthetic perp capital efficiency](/docs/trading/capital-efficiency#synthetic-long-asset)
- [Synthetic perp funding rates](/research/introduction-synthetic-perps)
- [Risks](/docs/panoptic-protocol/risks)