# Fee Structure

V2 charges position commissions separately from streaming option premia and borrow interest. The pool's RiskEngine supplies the fee configuration; use the [engine-specific parameter tables](/docs/contracts/parameters) for verified values.

## Notional commission

On mint, CollateralTracker calculates a notional commission on the sum of long and short amounts in that collateral token. It converts the commission to shares with contract-defined rounding.

## Premium commission

When closing a position with realized premium, the commission is capped at the smaller of:

- the configured premium rate applied to the absolute realized premium;
- ten times the configured notional rate applied to the closing long-plus-short notional.

A premium-only settlement has no closing notional and uses the premium-based commission without that cap. A premium-fee constant is therefore not a complete quote for the final transaction cost.

## Builder codes

A valid nonzero builder code resolves to a deployed BuilderWallet. The protocol and builder receive the configured fractions of the commission in collateral shares; the remaining fraction is a user discount. Without a builder code, the commission is collected through share burning, benefiting collateral-vault shareholders.

Fee routing does not change ownership of the pool's RiskEngine. See [CollateralTracker](/docs/contracts/V2/contract.CollateralTracker), [BuilderFactory](/docs/contracts/V2/RiskEngine/contract.BuilderFactory), and [BuilderWallet](/docs/contracts/V2/RiskEngine/contract.BuilderWallet) for interfaces.
