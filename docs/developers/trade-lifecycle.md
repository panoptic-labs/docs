---
sidebar_position: 4
sidebar_label: Complete a trade lifecycle
---

# Complete your first trade lifecycle

Run a full SDK workflow on a local Ethereum fork: fund collateral, simulate and open a short call, recover its position ID in a fresh process, close it, and withdraw the available collateral.

This is a runnable sandbox example using published **SDK 1.0.25**. It extends [Simulate your first position](./simulate-position) with local transactions and confirmed receipts. You do not need a wallet, private key, or real funds.

## The sandbox boundary

The scripts write only to `http://127.0.0.1:8547`. Before enabling account impersonation or sending transactions they require chain ID **31337**, an Anvil node, and a fork of Ethereum block **26107609**. The upstream Ethereum RPC supplies historical state; transactions are sent to the local fork.

Funding creates test balances with Anvil and deposits them through SDK wrappers. The fixed demonstration address is impersonated locally; **never send real funds to it**. These guards prevent accidental use against ordinary live RPCs; the example assumes you control the local node.

The fixture uses the same ETH/USDC V2 pool as the earlier tutorials, a small single short call, and `builderCode: 0n`. It does not activate a builder wallet or verify builder revenue. Production builder onboarding remains outside this example.

## 1. Prepare a standalone project

Prerequisites:

- Node.js 20.19 through 22.x and pnpm.
- Anvil installed and available on your PATH (`anvil --version`).
- A full Ethereum RPC endpoint that serves historical state at block `26107609`. A pruned or rate-limited endpoint may not support this fork.
- A checkout containing these docs. No monorepo build is required.

From the repository root, copy the example outside the workspace and install its pinned dependencies:

```sh
example_dir=$(mktemp -d)
cp apps/docs/static/examples/trade-lifecycle/* "$example_dir/"
cd "$example_dir"
pnpm install
pnpm test
pwd
```

Keep the printed directory for the second terminal. SDK 1.0.25 requires the React peers listed in the example package even though these scripts use plain Node functions.

The same source files are available individually: [package.json](/examples/trade-lifecycle/package.json), [sandbox.mjs](/examples/trade-lifecycle/sandbox.mjs), [lifecycle.mjs](/examples/trade-lifecycle/lifecycle.mjs), [safety.mjs](/examples/trade-lifecycle/safety.mjs), and [safety.test.mjs](/examples/trade-lifecycle/safety.test.mjs). Save all five in one directory if you are working without a checkout.

## 2. Start the fork

Set `ETHEREUM_RPC_URL` in your shell to the full archive endpoint, then run:

```sh
pnpm sandbox
```

Leave this process running. It starts Anvil bound to loopback with the pinned fork block and sandbox chain ID. Startup output deliberately omits the provider URL; keep credentials out of source control and shared logs.

In a second terminal, change to the example directory and run:

```sh
pnpm status
```

Initially, the example account has no positions or collateral. If the node is not ready, wait briefly and retry. Stop any unrelated service on port 8547 before starting a new fork.

## 3. Fund collateral locally

```sh
pnpm fund
```

This phase gives the local account test ETH for gas, creates a USDC test balance, approves the USDC collateral tracker for the intended deposit, and deposits **1 ETH and 1,000 USDC**. Native ETH funding sends transaction value; USDC uses ERC-20 approval.

The USDC balance storage slot is specific to this pinned fixture and is checked before depositing. This is test setup, not a production funding recipe. Funding refuses a fork that has already advanced beyond the starting block; restart Anvil for a clean attempt after a partial or completed run.

Each transaction prints its hash only after a successful receipt. The final account read shows approximately 1 ETH and 1,000 USDC deposited. Asset/share conversion rounding can make the recorded amounts slightly smaller.

## 4. Simulate and open

```sh
pnpm open
```

The script reads current collateral and pool state, confirms there are no existing positions, derives a strike from the pool tick, and constructs the short call. It uses the same illustrative protocol size and bounds as the [simulation tutorial](./simulate-position#what-the-example-constructs).

After the preview passes, `openPositionAndWait` submits the same position intent through the local impersonated wallet client. The script checks receipt success and rereads the account. Expect one position ID:

```text
Simulation passed
Confirmed: 0x… at block 26107613
positions: ["3788032144950279548378438694797"]
```

Exact hashes and asset balances can differ with local timestamps. A simulation passing is not transaction confirmation: the receipt and refreshed account are separate checks.

## 5. Recover the position in a new process

```sh
pnpm status
```

Every command starts a fresh Node process. This phase recovers position IDs from the fork's transaction history using `getOpenPositionIds`, rereads positions with `getPositions`, and compares recovered leg counts with the account. It does not rely on an in-memory TokenId left over from opening.

The event scan starts immediately after the fork block because this fixture account had no open legs before local funding. A production account needs its actual history boundary and complete reconstruction; do not copy this starting block for arbitrary accounts. Missing recovery results stop the workflow rather than becoming an empty position list.

Restarting a script preserves the running fork's state. Restarting Anvil resets that state and starts the tutorial over.

## 6. Close, then withdraw

```sh
pnpm close
pnpm withdraw
pnpm status
```

Closing recovers the actual position ID and size, simulates the close, submits it, and verifies the receipt. The next read should show an empty position list.

Withdrawal refuses accounts with remaining positions. It refreshes available collateral for each token, simulates that withdrawal, and submits it separately. On the verified fixture, the final account read returned:

```json
{
  "positions": [],
  "collateral": {
    "ETH": "0",
    "USDC": "0"
  }
}
```

These are balances inside the collateral trackers; withdrawn assets are in the local account. The phase withdraws available assets, not the original deposit amounts. Fees, interest, and rounding can change what is available. A partial failure is recoverable: inspect `pnpm status`, resolve the error, and rerun withdrawal for any remaining available balance.

## Failure and recovery

| Failure | Next step |
| --- | --- |
| Anvil will not start | Check installation, the archive endpoint, and whether port 8547 is already occupied. |
| Wrong chain, node, or fork block | Stop and restart using `pnpm sandbox`. Do not remove the guards. |
| Funding refuses a used fixture | Stop Anvil and start a fresh fork. Do not repeatedly fund partially initialized state. |
| Opening rejects collateral | Run funding on a fresh fork first. An unfunded account is not expected to pass. |
| Opening finds an existing position | Run status, then close it. Opening twice is outside this example. |
| Closing finds no position | Check status; opening may not have completed or the position may already be closed. |
| Position recovery is incomplete | Check the local node and scan history. Never substitute an empty list. |
| A receipt or refresh fails | Read status before retrying. A request error does not prove the transaction never executed. |

For more detail, see [Troubleshooting](./troubleshooting).

## What this verifies

The example exercises funding, open and close previews, local transaction submission, successful receipts, reconstruction across processes, and withdrawal for one ETH-token0/USDC-token1 short call. The package's unit checks also exercise refusal of a live chain, a non-Anvil node, and the wrong fork block. No Solidity tests are involved.

A live integration additionally needs a real wallet authorization flow, strategy-aware sizing, complete account history, pending/replaced transaction recovery, reorg handling, and freshness checks. Neither other token orderings nor multi-leg strategies are certified by this fixture. Use [the integration workflow](./integration-workflow) and [capabilities](./capabilities) to scope that work.
