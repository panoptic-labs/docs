# DispatchFrom Entry Point

`PanopticPool.dispatchFrom` processes third-party streamia (streaming premium) settlement, forced exercise, or liquidation. It evaluates the target's solvency and validates complete position lists. See the [public interface reference](/docs/contracts/V2/contract.PanopticPool#dispatchfrom) for the exact signature.

## Inputs

Supply the caller's current position IDs, the target address, the target's current position IDs, and the target's expected final IDs. The packed streamia flag uses the left slot for the caller and the right slot for the target. TokenId order also selects the target position for settlement or exercise; list length alone is not a sufficient input check.

## Operation selection

| Target solvency | Final position list | Operation |
| --- | --- | --- |
| Solvent at all checked ticks | Identical list | Settle streamia on the final listed position |
| Solvent at all checked ticks | One position removed | Force exercise the eligible final listed position |
| Insolvent at all checked ticks | Empty list | Liquidate the portfolio |
| Solvent at only some checked ticks | Any | Revert |

The assessment uses spot-derived, TWAP-derived, latest-observation, and current AMM ticks. A normal single-tick collateral read does not establish liquidation eligibility.

## Checks and settlement

Solvent-target operations enforce the current-to-TWAP deviation bound from the engine. Liquidation follows its own branch; do not assume a check shown for force exercise applies identically to liquidation.

An exercise requires eligible long legs. Identical-length streamia-settlement lists must also have identical contents and ordering. The target is checked after solvent-target operations, and the caller must pass its post-operation solvency check.

Liquidation closes the portfolio, computes compensation, and can apply streamia haircuts and recognize protocol loss. Forced exercise and streamia settlement can redistribute collateral between tokens. Keep amounts and packed slots in their native token frames and simulate the whole call.

See [exercise cost](./08-exercise-cost.md), [RiskEngine](/docs/contracts/V2/RiskEngine/contract.RiskEngine), and [deployed parameters](/docs/contracts/parameters). These engines are immutable per pool; none of these operations changes the pool's engine.
