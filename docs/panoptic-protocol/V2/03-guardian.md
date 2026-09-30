# Guardian Role

Each V2 RiskEngine has an immutable `GUARDIAN` address. The engine gates pool locking, unlocking, and token collection through that address. See the [public RiskEngine reference](/docs/contracts/V2/RiskEngine/contract.RiskEngine) and [PanopticGuardian reference](/docs/contracts/V2/contract.PanopticGuardian) for the separate access-control interfaces.

## Pool controls

`lockPool` calls the pool's safe-mode lock, which contributes three to the total safe-mode score. `unlockPool` removes that three-point lock contribution. PanopticPool accepts these calls only from its configured RiskEngine; the engine's guardian authorization is checked before forwarding them.

A lock prevents new mints under the [safe-mode rules](./02-safe-mode.md). It does not replace the pool's RiskEngine or transfer users to another pool.

## Token collection

The authorized guardian can collect tokens held by the RiskEngine, including protocol-routed fee shares. This capability is distinct from withdrawing a user's collateral from a CollateralTracker.

## Modularity, not in-place upgrades

The pool's RiskEngine address is immutable. A new engine can define a different policy for a new pool, but users must migrate their positions/state to adopt it. Locking an existing pool is not a migration mechanism.
