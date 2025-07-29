---
sidebar_position: 5
---

# Net Asset Value (NAV)

The Net Asset Value (NAV) represents the total value of all assets held by the vault, denominated in its `underlyingToken`. 
It's the core metric used to determine the price of a vault share. 

When a manager fulfills [deposits or withdrawals](/docs/vaults/deposit-withdrawal), the NAV is calculated by the [`PanopticVaultAccountant`](/docs/vaults/vault-architecture#accountant) contract to ensure that new shares are minted and old shares are redeemed at the fair market value of the vault's portfolio.

## Asset valuation

The vault's assets are valued using a hybrid on-chain and manager-driven approach to balance accuracy with security. The valuation process accounts for all assets under the vault's control, including:

- **Panoptic Positions**: The value of all long and short option positions held across various Panoptic pools.
- **Collateral**: The value of collateral deposited in Panoptic pools, redeemable for the underlying assets.
- **Accumulated Fees**: Premiums collected from selling options.
- **Fungible Tokens**: Balances of any other ERC20 tokens and native ETH held directly by the vault.

To ensure prices are accurate and not manipulated, the vault manager provides price quotes which are cross-referenced against on-chain Time-Weighted Average Prices (TWAPs) from oracles.
If a manager-provided price deviates from the oracle's TWAP by more than the configured `maxPriceDeviation`, the NAV calculation fails, preventing transactions with stale or incorrect prices.
All asset values are ultimately converted to the vault's single `underlyingToken` to produce the final NAV.


## Computing the NAV

The NAV is computed by the `computeNAV` function of the `PanopticVaultAccountant`, which is called by the vault manager during the [`fulfillDeposits`](/docs/vaults/deposit-withdrawal#deposit-flow) or [`fulfillWithdrawals`](/docs/vaults/deposit-withdrawal#withdrawal-flow) process.

The computation follows these steps:
1.  **Manager Input**: The manager supplies the necessary data, which includes a list of every Panoptic pool the vault interacts with, a complete list of all position token IDs held in each of those pools, and the manager's current price quotes for the assets.
2.  **Input Verification**: The `PanopticVaultAccountant` performs critical safety checks:
    * It verifies that the provided list of pools matches a pre-approved configuration for the vault, reverting with `InvalidPools()` on a mismatch.
    * It ensures the list of positions is complete by comparing it against the on-chain record, reverting with `IncorrectPositionList()` if any are missing.
    * It validates the manager's prices against on-chain oracles, reverting with `StaleOraclePrice()` if they deviate too much.
3.  **Portfolio Valuation**: The accountant iterates through each pool to calculate its net worth. For each pool, it sums the value of collateral, fees, and all option positions. A key feature of the calculation is that if a single pool has a net negative value (i.e., represents a liability), its value is floored at zero (`Math.max(poolExposure0 + poolExposure1, 0)`). This means an underwater position in one pool does not detract from the total NAV derived from other, profitable pools.
4.  **Final Aggregation**: The values from all pools are summed together, along with the value of any other tokens held directly by the vault, to arrive at the final NAV in the vault's `underlyingToken`. This value is then used to price shares for deposits and withdrawals.


<!--
TODO:
## Share Valuation Examples 

### Passive Liquidity Provisioning (PLP) Vault

### Covered Call Vault

### Delta-Neutral LP (Straddle) Vault

### Reverse Convertible Bond

## Contract Interactions
-->

<details>
<summary>Manager Actions</summary>

### `computeNAV()`
A view function on the `PanopticVaultAccountant` contract that calculates the vault's total Net Asset Value (NAV) in terms of its `underlyingToken`. While not called directly, the **manager is responsible for constructing its `managerInput` payload**, which is passed into `fulfillDeposits()` and `fulfillWithdrawals()`. This function serves as the on-chain valuation engine for the vault. 

```solidity
function computeNAV(
    address vault,
    address underlyingToken,
    bytes calldata managerInput
) external view returns (uint256 nav);
````

-----

**Parameters:**

  - `vault`: The address of the `HypoVault` being valued.
  - `underlyingToken`: The ERC20 token in which the NAV should be denominated.
  - `managerInput`: A `bytes` string containing the `abi.encode`d data required for the calculation. The manager must provide:
      - **`ManagerPrices[]`**: The manager's current price quotes for each asset pool.
      - **`PoolInfo[]`**: A struct array describing every Panoptic pool the vault uses. The hash of this data must match a pre-approved configuration stored in the accountant contract.
      - **`TokenId[][]`**: A complete, two-dimensional array of every Panoptic position NFT owned by the vault, organized by pool.

**Notes:**

  - This function includes several **critical safety checks**. The manager's transaction will revert if the provided list of pools is invalid (`InvalidPools`), the list of positions is incomplete (`IncorrectPositionList`), or the manager's prices deviate too far from the on-chain oracles (`StaleOraclePrice`).
  - As a **view function**, it can be called off-chain at any time for reporting purposes without incurring gas fees.

</details>


