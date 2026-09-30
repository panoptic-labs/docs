# Settlement Flows

PanopticPool orchestrates position operations while each CollateralTracker accounts for its own token. The RiskEngine supplies risk policy and fee routing. See [dispatch](./14-dispatch-entrypoint.md) and [dispatchFrom](./15-dispatchfrom-entrypoint.md) for operation selection.

## Mint

Minting updates the position manager, collateral balances, borrow/credit accounting, and fees. The resulting portfolio must pass the operation's solvency and price checks. The notional commission is distinct from future interest and streaming premia.

## Burn

Burning closes the position, settles AMM token movement and realized premium, and updates the collateral trackers. Where premium is realized, the [premium commission and notional cap](./10-fee-structure.md) apply. Shares, assets, and signed token movements are different quantities.

## Premium-only settlement

Settlement can realize premium while keeping a position open. When no long or short notional is closed, the premium fee is not capped by a closing notional. Available settled premium and total accumulated premium must not be treated as identical withdrawable balances.

## Third-party operations

Liquidation, forced exercise, and third-party premium settlement also account for the caller and target account. They can involve token redistribution and, during liquidation, premium haircuts or protocol loss. Do not apply an ordinary burn calculation as a complete model of those operations.

Use the [CollateralTracker reference](/docs/contracts/V2/contract.CollateralTracker) for settlement interfaces and rounding rules, and the [engine-specific tables](/docs/contracts/parameters) for deployed coefficients.
