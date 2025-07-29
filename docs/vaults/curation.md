---
sidebar_position: 6
---

# Curation

Curation is the process of defining the operational and security framework for a vault. A Curator acts as both a fund administrator and a security officer, establishing the rules of engagement for the Manager and ensuring the vault operates as intended.

---
## Management controls

A Curator's primary responsibility is to define the level of trust and autonomy granted to the vault's Manager.

### Manager

This is the standard, trusted model. The Curator sets a single address as the **Manager** in the `HypoVault` contract. This gives the Manager full, discretionary power to execute any on-chain action through the `manage()` function. This model is highly flexible but requires absolute trust in the Manager's competence and integrity.

### Manager with Merkle Verification

This is an advanced, trust-minimized pattern. While not native to the base `HypoVault`, a Curator can design a system where the Manager can only execute a limited set of pre-approved actions. This is typically achieved by having the Curator commit to a Merkle root of all valid strategic actions. The Manager must then provide a Merkle proof along with each action, which is verified on-chain before execution. This enforces a "strategic whitelist," preventing the Manager from going rogue.

---
## Safeguards

While the Manager constructs the `managerInput` payload for each NAV calculation, the Curator defines the immutable rules and sanity checks that this input is validated against in the `PanopticVaultAccountant`.

### managerPrices

These are the Manager's off-chain price quotes for the assets in the portfolio. The Curator's key control here is setting the `maxPriceDeviation` within the `pools` configuration. This is a critical security parameter that causes the transaction to revert if the Manager's provided price differs too much from the on-chain oracle's TWAP, protecting against stale or manipulative pricing.

### pools

This is a core Curator responsibility. The Curator defines the exact list of `PoolInfo` structs that the vault is allowed to interact with. This configuration specifies every approved pool, token, oracle, and risk parameter. The `keccak256` hash of this list is then stored in the `PanopticVaultAccountant`, and for maximum security, the Curator should lock this configuration to make it immutable.

### tokenIds

This is the complete list of all Panoptic position NFTs the vault holds. The Manager must provide this with every NAV calculation. The Curator's role is to understand that the accountant contract automatically enforces the completeness of this list. If the Manager tries to hide a position, the transaction will revert with `IncorrectPositionList`.

---
## User fund management

The Curator should design the vault's fund management cadence, balancing user experience with strategic needs.

### Epochs

Deposits and withdrawals are not instant, but rather they are batched into **epochs**. The Manager fulfills an entire epoch at once, ensuring all participants in that batch receive a fair, uniform price based on a single NAV calculation.

### `shouldRedeposit`

This is a boolean flag in a user's pending withdrawal. When `true`, the assets from a user's withdrawal are automatically [re-queued for deposit](/docs/vaults/deposit-withdrawal#compounding-returns) into the next epoch instead of being sent to their wallet.

### `requestWithdrawalFrom()`

This manager-only function utilizes the `shouldRedeposit` flag. It allows the Manager to trigger a withdrawal on behalf of a user and force the proceeds to be redeposited. This is a powerful tool for portfolio rebalancing or realizing profits for performance fee calculation without the user's funds ever leaving the vault's ecosystem.

## Performance fee

The `performanceFeeBps` is set at the vault's creation and defines the Manager's share of the profits, ensuring incentives are aligned with the depositors.

### Withdrawal
The performance fee is calculated and taken **only on profitable withdrawals**. This "high-water mark" model ensures the Manager is only rewarded for generating real returns above a user's original cost basis.

When a user's withdrawal is executed, the contract compares the value of their withdrawn assets against their basis. If the withdrawal is profitable, the fee is taken **only on the profit** and sent to the designated `feeWallet`.

### Manager-Initiated Fee Crystallization
Managers do not need to wait for users to withdraw their funds to realize earned fees. The protocol allows for a process called "fee crystallization" using the `requestWithdrawalFrom()` workflow.

At their discretion (e.g., at the end of a reporting period), a Manager can:
1.  Call `requestWithdrawalFrom()` on a user's position.
2.  This initiates a withdrawal that is automatically flagged to be **redeposited**.
3.  When the withdrawal is processed, it triggers the standard performance fee calculation on any accrued profit.
4.  The fee is sent to the `feeWallet`, and the user's remaining capital is seamlessly rolled into a new deposit in the next epoch.

This powerful feature allows Managers to periodically "net" the vault's performance and collect their earned fees, much like a traditional hedge fund, without requiring users to manually exit and re-enter their positions.
