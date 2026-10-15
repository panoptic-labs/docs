# Force Exercise Cost

A force exercise closes an eligible position through `dispatchFrom`. Its cost depends on the long legs, their ranges, position size, and differences between current and oracle prices.

## Engine-specific calculation

The proxy release uses `FORCE_EXERCISE_COST = 5_000_000` with `DECIMALS = 10_000_000`: 50% of each eligible long leg's estimated remaining extrinsic value at the oracle tick. This replaces the earlier exercise-cost calculation. See the [release parameters](/docs/contracts/parameters).

For an in-range leg, the extrinsic-value component is capped at 50% of notional and the minimum is the larger of the notional commission and half the tick spacing in basis points. Out-of-range legs use the notional commission floor. The cap applies to the extrinsic-value component; the tick-spacing floor and current/oracle value adjustments can affect the final payment. Short legs and zero-width loans or credits do not contribute to this long-leg calculation.

The calculation considers position legs and price displacement, and returns amounts for both tokens. Settlement can also redistribute balances across collateral tokens. Preserve the return-value sign convention and token ordering from the reference instead of interpreting every nonzero amount as a fee in a chosen quote asset.

Use the [release exerciseCost source](https://github.com/panoptic-labs/panoptic-v2-core/blob/ec910b4f4e8f3fae0156b1cd0604210b23d026f0/contracts/RiskEngine.sol) and [dispatchFrom guide](./15-dispatchfrom-entrypoint.md). Simulate the full operation with the caller's and target account's complete position lists; a fee estimate alone does not prove execution will succeed.
