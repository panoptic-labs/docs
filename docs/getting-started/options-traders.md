---
sidebar_position: 2.3
label: "Options Traders"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Options Traders

Panoptic lets traders buy and sell perpetual options and combine legs into strategies. Available trades depend on the underlying AMM pool, its liquidity, valid tick ranges, and the account's collateral.

## Trading on Panoptic

- **Perpetual positions**: Positions have no scheduled expiry, but streaming premia, borrow interest, liquidation, and forced exercise can affect how long they remain open.
- **Market and strike selection**: Permissionless deployment does not guarantee that every asset pair is supported by the interface. Strikes and widths follow the pool's tick grid and position-encoding constraints; sizes must satisfy liquidity and collateral checks.
- **Multi-leg strategies**: Combine calls, puts, loans, and credits where supported. Risk-partner configuration and the pool's RiskEngine determine collateral treatment, so a strategy label alone does not establish its margin requirement.
- **Risk monitoring**: Use portfolio balances, buying-power usage, price exposure, and simulations to assess a trade. A displayed maximum or a successful simulation can change before execution.

## Capital efficiency

There is no single leverage limit that applies to every trade. Required collateral depends on the engine, position type, utilization, price, and the rest of the portfolio. Read the [protocol parameters](/docs/contracts/parameters) and [collateral guide](/docs/panoptic-protocol/V2/collateral-overview), and distinguish borrow interest from streaming option premia.

Passive collateral lending and selling options are different activities with different exposures. Neither removes smart-contract, asset, or protocol-loss risk. See [trading risks](/docs/panoptic-protocol/risks) before opening a position.

## Start Trading Options on Panoptic
Ready to explore the full potential of options trading? Visit our [app](https://app.panoptic.xyz) to start trading with the flexibility, capital efficiency, and risk management you need to succeed in DeFi.

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

### Resources
- [How to open a position](/docs/product/opening-a-position)
- [Basic options strategies](/docs/product/basic-options-strategies)
- [Risks](/docs/panoptic-protocol/risks)