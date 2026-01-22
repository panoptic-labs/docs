---
sidebar_position: 1.1
label: "Vaults"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Vaults

Panoptic vaults span the risk-return spectrum, offering strategies for both conservative depositors and higher-risk yield seekers. Vaults may be curated by Panoptic or by external managers. Panoptic Community Vaults provide onchain yield with zero performance fees. External curators may deploy custom strategies and charge performance fees.

## Community Vaults
Panoptic’s community vaults do not charge performance fees and are designed to provide accessible, onchain yield strategies. New vaults and expanded caps will roll out every few weeks after launch.

### Lending Vaults
Two passive lending vaults — one for USDC and one for ETH — offer simple, lower-risk yield generation. Deposits are allocated into Panoptic’s underlying lending markets, beginning with the ETH/USDC market and expanding to other markets like BTC/USDC over time.

<ThemedImage
  alt="Active-LP"
  sources={{
    light: useBaseUrl('/img/lending-vault.svg'),
    dark: useBaseUrl('/img/lending-vault.svg'),
  }}
  style={{width: '100%'}}
/>

### Covered Call VTF (Vault Traded Fund)
This option selling vault functions as an ETH covered call ETF, bringing tried-and-true investment vehicles like Grayscale's BTCC and BlackRock's upcoming premium income ETF to DeFi. Users deposit stablecoins, which the vault uses to synthetically acquire ETH exposure and sell call options. Option premiums are distributed as regular income, providing periodic disbursements to all depositors.

<ThemedImage
  alt="Active-LP"
  sources={{
    light: useBaseUrl('/img/covered-call-vault.svg'),
    dark: useBaseUrl('/img/covered-call-vault.svg'),
  }}
  style={{width: '100%'}}
/>

### Gamma Scalping Vault
This option buying vault aims to buy low and sell high by systematically buying call options and dynamically hedging the delta to zero. The strategy is similar to Ethena's basis trade, but for options markets.

<ThemedImage
  alt="Active-LP"
  sources={{
    light: useBaseUrl('/img/gamma-scalping-vault.svg'),
    dark: useBaseUrl('/img/gamma-scalping-vault.svg'),
  }}
  style={{width: '100%'}}
/>

## Curated Vaults
Anyone can create a vault using Panoptic’s vault infrastructure. Curated vaults may run any strategy — including lending or options trading — and may charge performance fees to depositors.