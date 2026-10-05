---
sidebar_position: 6
sidebar_label: Core concepts
---

# Core concepts for integrators

These concepts connect the SDK's inputs and outputs to what your app displays. The [simulation tutorial](./simulate-position) uses a single short call; other strategies need their own sizing and risk treatment.

## Perpetual options and Streamia {#perpetual-options-and-streaming-premia}

A Panoptic option has no scheduled expiry. A user opens a position and later closes it, subject to available liquidity and protocol constraints. Long positions may also be force-exercised under protocol rules; no expiry does not mean indefinite, unconditional holding.

Option buyers pay and sellers receive streamia as market activity accrues, rather than fixing the entire lifetime premium upfront. An app should distinguish accrued amounts from estimates of future carrying costs. See [streamia (streaming premium)](../product/streamia) and [trading risks](../panoptic-protocol/risks).

## Markets, pools, and tokens

A PanopticPool is the contract your SDK reads and position operations target. Its underlying Uniswap pool provides concentrated liquidity. The Panoptic factory, RiskEngine, collateral trackers, and underlying AMM identifiers are different objects; their addresses cannot substitute for a PanopticPool address.

Each market has token0 and token1, each with its own decimals and collateral tracker. Read their addresses and metadata from the pool. ETH/USDC and USDC/ETH are different accounting frames, even when a UI presents both prices as dollars per ETH. Native ETH uses a zero asset address and requires different funding handling from an ERC-20 token.

Panoptic **V2** names the protocol release; Uniswap **v3/v4** names the underlying AMM. See [contract architecture](../contracts/smart-contracts-overview) and [deployments](../contracts/deployment-addresses).

## Position identity and denomination

A TokenId encodes the pool and up to four legs. Each leg specifies its asset, token type, long/short direction, ratio, strike, width, and risk partner. The TokenId identifies the structure; position size is supplied separately.

A strike is represented by a tick and width uses the market's tick spacing. The raw tick describes a token ratio, not a human-readable USD price. Conversion depends on token ordering and decimals. Use SDK helpers and verify the intended price frame before displaying a strike or constructing a leg.

The SDK's `addCall` and `addPut` helpers set token type relative to the selected asset. Do not assume the same encoded leg describes the same trader-facing exposure after reversing tokens. Likewise, protocol position-size units are not automatically an ETH amount, dollar notional, or number of conventional options contracts.

For spreads, evaluate the complete set of legs, their ratios, and risk partners together. A single-leg collateral or Greek calculation is not a substitute for a portfolio calculation. Keep Greek and PnL denominations explicit when combining results across markets. See [position types](../panoptic-protocol/V2/position-types) and [composite strategies](../panoptic-protocol/V2/composite-strategies).

## Collateral and liquidation

Collateral trackers account for deposits with shares. An asset balance, a share balance, a withdrawable balance, and a collateral requirement are different quantities. Share conversion and accrued interest can affect the amounts an app displays.

The pool's RiskEngine evaluates solvency across the account's positions and the two collateral tokens. Cross-collateral treatment depends on the engine, token ordering, utilization, and position structure. A positive balance in one token does not by itself prove the account can cover a deficit in the other.

Under-collateralized positions can be liquidated. Read [collateral accounting](../panoptic-protocol/V2/collateral-overview) and [engine parameters](../contracts/parameters) before turning balances into buying power or liquidation estimates.

## Costs to display separately

| Cost | What an app should communicate |
| --- | --- |
| Trading commission | The charge for the operation under the selected RiskEngine. Builder routing can affect its distribution and user discount. |
| Streamia | Accrued option streamia and the uncertainty of future streamia. |
| Borrowing interest | Interest associated with borrowing, where applicable; distinct from option streamia. |
| Network gas | The transaction's network cost, distinct from collateral movements. |

Simulation fields with `null` values mean unavailable information, not a zero charge. Signed token movements are not an all-in fee quote. See [fee rules](../contracts/parameters#fees-and-builder-routing) and [interest accrual](../panoptic-protocol/V2/interest-accrual).

## Closing and withdrawing

Closing a position changes its exposure and can settle accrued amounts. It does not automatically withdraw all collateral. Confirm the closing transaction, reconstruct the remaining position set, and reread collateral before evaluating a withdrawal.

Maintain separate UI states for a preview, a submitted transaction, a confirmed receipt, and a refreshed account. See [the integration workflow](./integration-workflow).
