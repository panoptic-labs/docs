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

Panoptic will initially launch with two community vaults.

![Panoptic vaults comparison](/img/vaults/panoptic-vaults-comparison.png)

### USDC Unicorn Vault
Deposited USDC is allocated into Panoptic’s underlying lending markets, beginning with the ETH/USDC market and expanding to additional markets like BTC/USDC over time. The strategy also runs systematic, delta-neutral gamma scalping designed to buy low and sell high.

![USDC Unicorn Vault animation](/img/vaults/usdc-unicorn-vault.gif)
![USDC Unicorn Vault details](/img/vaults/unicorn-vault-info.png)

### WETH PLP Vault
Deposited WETH is allocated into Panoptic’s underlying lending markets, beginning with the ETH/USDC market at launch. The vault provides liquidity to Panoptic through lending and market making strategies, and accrues platform fees.

![WETH PLP Vault animation](/img/vaults/weth-plp-vault.gif)
![WETH PLP Vault details](/img/vaults/plp-vault-info.png)

## Curated Vaults
Anyone can create a vault using Panoptic’s vault infrastructure. Curated vaults may run any strategy — including lending or options trading — and may charge performance fees to depositors.
