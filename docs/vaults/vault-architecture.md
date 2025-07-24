---
sidebar_position: 2
---

# Vault Architecture

## Overview
The protocol is a decentralized asset management system built to run strategies on top of Panoptic. Its architecture is modular, separating the core responsibilities of asset management, portfolio valuation, and administration into distinct smart contracts and roles.

Users deposit assets into a `HypoVault` and receive ERC20 shares that represent their claim on the vault's assets. A designated **Manager** actively manages the vault's portfolio by trading Panoptic options. The value of the vault's shares is determined by the **Accountant** contract, which calculates the Net Asset Value (NAV) of the portfolio. New vaults can be deployed permissionlessly using the **Vault Factory**.

---
## Roles/Smart contracts
The system's design is based on a separation of duties, where different actors and contracts are responsible for specific functions. This enhances security by limiting the scope of any single component.

### Manager
The **Manager** is the active strategist for the vault. This role, controlled by an address set in the `HypoVault` contract, is responsible for the day-to-day operations and portfolio management.

Key powers include:
* Executing arbitrary transactions from the vault to manage its Panoptic positions (`manage()`).
* Initiating the fulfillment of deposit and withdrawal requests (`fulfillDeposits()`, `fulfillWithdrawals()`).
* Providing the necessary data for the Accountant to perform NAV calculations.

### Accountant
The `PanopticVaultAccountant` contract is the specialized **valuation engine** for the vault. Its sole responsibility is to calculate the NAV of the vault's holdings.

It performs several critical security checks, such as verifying the manager's price quotes against on-chain oracles and ensuring the manager has provided a complete list of the vault's positions. This separation prevents a malicious manager from manipulating the vault's reported value.

### Curator
The **Curator** is the `owner` of the `PanopticVaultAccountant` contract. This administrative role is responsible for the initial security setup of a vault's valuation parameters.

The Curator's primary duty is to set and lock the approved list of Panoptic pools the vault can interact with (`updatePoolsHash` and `lockVault`). This acts as a safeguard, ensuring the Manager can only operate within a pre-defined, trusted set of pools when the Accountant calculates the NAV.

### Vault Factory
The `HypoVaultFactory` is a simple factory contract used to deploy new `HypoVault` instances. It standardizes the vault creation process and provides a discoverable, on-chain registry of all vaults created through its `VaultCreated` event log.

---
## Risks
While the architecture is designed to be secure, users should be aware of several key risks:

* **Manager Risk**: The Manager has significant control over the vault's assets. A malicious or compromised Manager could execute trades that are not in the best interest of the depositors, potentially leading to a loss of funds.
* **Oracle Risk**: The NAV calculation depends on external price oracles. A manipulated or faulty oracle could lead to an incorrect NAV, causing shares to be issued or redeemed at unfair prices.
* **Centralization Risk**: The `owner` of the vault (the "Curator" role for the Accountant) holds powerful administrative keys. If these keys are compromised, an attacker could change the Manager or alter the fundamental security parameters of the vault.
* **Smart Contract Risk**: As with any DeFi protocol, there is an inherent risk of bugs or vulnerabilities in the smart contracts that could be exploited.
* **Strategy Risk**: The value of the vault is dependent on the performance of the Manager's trading strategy. Options trading is complex and carries a high degree of risk, which could result in the loss of deposited capital.

