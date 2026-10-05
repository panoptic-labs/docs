---
sidebar_position: 2.1
label: "Lenders"
sidebar_label: "Lenders"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Lenders
Lenders, also called passive liquidity providers (PLPs), supply an underlying token to a Panoptic collateral market. Their deposits support borrowing by traders. Lending does not require choosing an AMM price range, but deposits remain exposed to asset-price changes, smart-contract faults, and protocol losses.

## How lending works

1. Choose a supported token and market, or a [managed lending vault](/docs/getting-started/vaults#weth-plp-vault) with its own strategy and withdrawal terms.
2. Deposit the token and receive shares representing your claim on the market or vault.
3. Monitor the share value, market utilization, available withdrawals, and the risks of the underlying asset and strategy.

Collateral-market returns depend on borrowing activity, interest rates, applicable fee routing, and losses. Accrual through share accounting does not guarantee positive returns or a fixed APY. Borrower rates are not the same as lender yields.

## Withdrawal and loss risks

Deposits lent to traders may not be immediately available for withdrawal. High utilization, account collateral requirements, and managed-vault redemption rules can limit or delay access to funds. Check the withdrawal preview and any vault-specific queue before treating the full displayed balance as available cash.

A PLP does not directly manage the same price-range inventory as an AMM LP. That distinction does not make lending risk-free: collateral assets can lose value, liquidation can fail to recover enough assets, and protocol losses can reduce what shareholders recover. Deposits are not insured by an audit or by the presence of liquidation bots.

See [protocol risks](/docs/panoptic-protocol/risks) and the [CollateralTracker reference](/docs/contracts/V2/contract.CollateralTracker) for collateral-market accounting. Managed vaults add their own strategy and operational risks.

## Get Started Today
Ready to earn? Visit our [lending platform](https://app.panoptic.xyz).

<iframe
  src="https://www.youtube.com/embed/TRZoneipkJU?si=yaMfb0EpoAV5WLew"
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
  alt="Passive-LP"
  sources={{
    light: useBaseUrl('/img/passive-lp.svg'),
    dark: useBaseUrl('/img/passive-lp.svg'),
  }}
  style={{width: '100%'}}
/>

---
### Resources
- [Passive LP risks](/docs/panoptic-protocol/risks#panoptic-liquidity-provider-risks)
- [Panoptic awarded Uniswap Foundation grant](/blog/panoptic-awarded-uniswap-foundation-grant) 
- [Bringing passive liquidity to Uniswap](/blog/passive-liquidity-pools)
- [Passive liquidity pools](/blog/passive-liquidity-pools)

