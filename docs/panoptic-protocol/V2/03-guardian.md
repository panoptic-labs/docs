# Guardian Role

Each RiskEngine implementation has a constructor-set immutable `GUARDIAN` address. A proxy upgrade can select an implementation with a different guardian. The engine gates pool locking, unlocking, and token collection through that address. See the [public RiskEngine reference](/docs/contracts/V2/RiskEngine/contract.RiskEngine) and [PanopticGuardian reference](/docs/contracts/V2/contract.PanopticGuardian) for the separate access-control interfaces.

## Pool controls

`lockPool` calls the pool's safe-mode lock, which contributes three to the total safe-mode score. `unlockPool` removes that three-point lock contribution. PanopticPool accepts these calls only from its configured RiskEngine; the engine's guardian authorization is checked before forwarding them.

A lock prevents new mints under the [safe-mode rules](./02-safe-mode.md). It does not replace the pool's RiskEngine or transfer users to another pool.

## Token collection

The authorized guardian can collect tokens held by the RiskEngine, including protocol-routed fee shares. This capability is distinct from withdrawing a user's collateral from a CollateralTracker.

## Guardian and upgrade authority

The pool's RiskEngine address is fixed, but proxy-backed pools can receive implementation upgrades through the proxy's ProxyAdmin owner. Guardian authorization only controls the engine's guardian operations; it does not itself grant upgrade authority. `GUARDIAN` is fixed within an implementation, while proxy upgrades may change the implementation and its configured guardian.

Legacy direct-engine pools require migration to adopt a proxy. Locking or unlocking a pool does not migrate it. See the [proxy reference](/docs/contracts/V2/RiskEngine/contract.RiskEngineProxy).
