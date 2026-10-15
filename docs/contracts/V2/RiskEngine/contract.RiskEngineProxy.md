---
sidebar_label: "RiskEngine Proxy"
title: "RiskEngine Proxy and Implementation (V2)"
---

# RiskEngine Proxy and Implementation (V2)

This reference describes the proxy-based release at core revision `ec910b4`, from `feat/risk-engine-v2`. Its [proxy source](https://github.com/panoptic-labs/panoptic-v2-core/blob/ec910b4f4e8f3fae0156b1cd0604210b23d026f0/contracts/RiskEngineProxy.sol), [implementation](https://github.com/panoptic-labs/panoptic-v2-core/blob/ec910b4f4e8f3fae0156b1cd0604210b23d026f0/contracts/RiskEngine.sol), and [parameter struct](https://github.com/panoptic-labs/panoptic-v2-core/blob/ec910b4f4e8f3fae0156b1cd0604210b23d026f0/contracts/types/RiskEngineParameters.sol) are pinned to that revision. The [parameter page](/docs/contracts/parameters) distinguishes release configuration from legacy on-chain observations.

## Address and implementation

`RiskEngineProxy` is an ERC-1967 transparent upgradeable proxy. PanopticPool and both CollateralTrackers bind to the proxy address in their immutable clone arguments. Calls through that address delegate to `RiskEngineV2`; replacing the implementation changes risk logic and parameters for every pool sharing the proxy, while positions and balances stay in their existing pools and trackers.

The implementation uses constants and constructor-set immutables for its configuration. There is no initializer call or user balance storage in the engine. Configure a replacement implementation at deployment, then upgrade the proxy to use it. Parameters have no individual administrative setters.

Legacy pools bound directly to an implementation cannot gain upgradeability this way. Adopting a proxy for those pools still requires migration to a pool configured with that proxy.

## Upgrade authority and constraints

The proxy constructor takes `(implementation, initialOwner)` and creates an OpenZeppelin `ProxyAdmin` owned by `initialOwner`. That owner's upgrade authority is separate from the RiskEngine's `GUARDIAN`, which authorizes pool locking, unlocking, and token collection. The release build configs set the initial owner to a multisig; ownership can subsequently be transferred to a timelock or governance contract. Such a transfer is not automatic.

An upgrade must preserve:

- Every `IRiskEngine` selector and return encoding used by pools and trackers.
- The packed layouts of `RiskParameters`, `OraclePack`, and `MarketState`.
- `vegoid()` (8), which is encoded in SFPM pool IDs at pool creation.
- The tier's `EMA_PERIODS`, because existing oracle packs were written under those periods.

Read the ERC-1967 implementation slot at the proxy address and the implementation's verified constructor arguments at a common block. The proxy address alone does not identify a permanent configuration. A proxy runtime hash also does not establish which implementation is active.

## Parameter interface

One `RiskEngineV2` source serves both blue-chip and xStocks tiers. Its constructor takes `(_guardian, _builderFactory, _builderInitCodeHash, RiskEngineParameters p)`. The builder hash is checked against the configured factory's predicted wallet address when the factory is nonzero, allowing upgrades to retain the existing builder-wallet deployment without depending on identical compiler optimizer settings.

`RiskEngineParameters` contains deployment inputs, not a storage object with a getter. Most fields become internal immutables; fee rates, splits, dispatch limits, the action buffer, and maximum legs are pre-packed into an internal template returned through `getRiskParameters(currentTick, oraclePack, builderCode)`, together with call-specific safe mode and fee recipient fields. Decode that word using the matching [RiskParameters layout](https://github.com/panoptic-labs/panoptic-v2-core/blob/ec910b4f4e8f3fae0156b1cd0604210b23d026f0/contracts/types/RiskParameters.sol).

Public reads include `DECIMALS()`, `VEGOID()`, `vegoid()`, `CROSS_BUFFER_0()`, `CROSS_BUFFER_1()`, `GUARDIAN()`, and `BUILDER_FACTORY()`, as well as calculation methods such as `getMargin`, `isAccountSolvent`, `exerciseCost`, `crossBufferRatio`, and `getRiskParameters`. Do not apply a legacy ABI that expects public getters for every parameter. Use verified implementation constructor arguments or the pinned build configuration for internal fields.

## Reserved tiers

`RiskEngineStub` is a placeholder for reserved proxies. Every call reverts with `RiskEngineNotSet()`, so the factory's `vegoid()` check prevents creating a pool against a reserved proxy until it has a real implementation. A configured proxy address is not by itself evidence of an enabled market.
