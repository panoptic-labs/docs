# Force Exercise Cost

A force exercise closes an eligible position through `dispatchFrom`. Its cost depends on the long legs, their ranges, position size, and differences between current and oracle prices.

## Engine-specific calculation

`FORCE_EXERCISE_COST` is a coefficient in `RiskEngine.exerciseCost`, scaled by the engine's `DECIMALS`. It is not a single flat percentage payable for every position. See the [deployed parameter tables](/docs/contracts/parameters) for its observed value.

The calculation considers position legs and price displacement, and returns amounts for both tokens. Settlement can also redistribute balances across collateral tokens. Preserve the return-value sign convention and token ordering from the reference instead of interpreting every nonzero amount as a fee in a chosen quote asset.

Use the [exerciseCost reference](/docs/contracts/V2/RiskEngine/contract.RiskEngine#exercisecost) and [dispatchFrom guide](./15-dispatchfrom-entrypoint.md). Simulate the full operation with the caller's and target account's complete position lists; a fee estimate alone does not prove execution will succeed.
