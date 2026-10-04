---
sidebar_position: 8
sidebar_label: Troubleshooting
---

# Troubleshooting the developer tutorials

Start with [Read your first market](./v2-integration). Once it returns the expected pool metadata, run [Simulate your first position](./simulate-position) with the same installed dependencies and RPC configuration.

## Installation and connection

| Symptom | Check and recovery |
| --- | --- |
| Missing React, Wagmi, or React Query module | SDK 1.0.25 needs the peers in the quickstart's install command even for these Node reads. Install the complete pinned set. |
| Module syntax or import error | Use Node 20.19 through 22.x, a `.mjs` file, and the project where dependencies were installed. Compare the installed SDK version with the tutorial. |
| Timeout, HTTP 429, or connection failure | Check RPC connectivity and provider backoff guidance. Set `ETHEREUM_RPC_URL` to a working Ethereum endpoint if the default public service is throttled. |
| Wrong-chain error | Both the configured client and RPC must use Ethereum mainnet, chain ID 1. Changing only a pool address does not switch chains. |
| Contract read fails | Confirm that the address is the documented V2 PanopticPool on the selected chain. An underlying Uniswap pool, factory, or RiskEngine address cannot replace it. |
| Historical state unavailable | The node must serve the simulation's block. Use a provider with suitable state history, or start a new run against current state. |
| Invalid account address | `PANOPTIC_ACCOUNT` must contain a valid EVM address. No private key or account login is needed for these reads. |

## Simulation results

The script can stop during input/state checks, return `status: rejected`, or throw because a request failed. These outcomes require different responses.

| Outcome | Meaning and next step |
| --- | --- |
| First-position account check fails | The account has existing legs in this pool. This tutorial does not reconstruct them. Stop and implement complete position discovery; do not bypass the check or pass an empty list. |
| `NotEnoughTokens` or another collateral rejection | The proposed operation cannot obtain the required token assets. This is expected for the unfunded demonstration address. Check deposited collateral, token ordering, and sizing for an already funded account. Never fund the demonstration address. |
| Price-bound or liquidity/spread rejection | Current pool conditions do not satisfy the proposed parameters. Refresh state and review the strategy and bounds; widening limits changes execution risk. |
| Position-list rejection | The supplied set does not match account state. Reconstruct and validate the complete set at the intended block rather than dropping positions from the request. |
| Builder-code rejection | A nonzero code must resolve to a deployed builder wallet for the selected configuration. The tutorial uses zero. Confirm activation before adding a partner code. |
| `SimulationFailed` | No specific contract error name was extracted. Investigate locally using the installed SDK's error/cause information; it can be an RPC or decoding issue. Do not infer that collateral is the only possible cause. |
| Successful result with `null` commissions | Separate commissions are unavailable in this simulation output, not free. See [costs](./core-concepts#costs-to-display-separately). |
| Successful result with a negative `required` amount | The token's collateral assets increase in the simulation. Keep the sign and denomination; do not present it as a negative minimum deposit. |
| Preview differs on a later run | Block, price, liquidity, utilization, or account state changed. Rerun dependent reads and simulation together. A previous success does not guarantee submission will succeed. |

## Collect useful debugging information

Record the SDK and Node versions, chain ID, pool address, block number, operation, and decoded error name. Include the intended leg structure and token denomination when investigating a simulation.

RPC exceptions may contain credential-bearing URLs, headers, or extensive calldata. Inspect detailed causes locally and remove credentials before sharing logs. Never include wallet secrets. For scope and verification limits, see [Capabilities and support](./capabilities).
