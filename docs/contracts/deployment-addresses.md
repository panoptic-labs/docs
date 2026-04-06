---
sidebar_position: 1
---

# Deployment Addresses

PanopticPools and CollateralTrackers are [proxy contracts](https://info.etherscan.com/what-is-proxy-contract/), with one PanopticPool per underlying Uniswap pool, and two CollateralTrackers per PanopticPool. You can fetch the PanopticPool for a given Uniswap pool [from the PanopticFactory](https://panoptic.xyz/docs/contracts/V2/contract.PanopticFactory#getpanopticpool). The core logic, however, is deployed to the following stable addresses on all EVM chains:

## v2

- `PanopticFactoryV3`: `0x000000000000039Dc5De710B8F7A6a33df0399c8`
- `PanopticFactoryV4`: `0x000000000000048a877bF34C0cF3F25510667a1e`
- `SemiFungiblePositionManagerV3`: `0x000000000000031d296bBA22f188472157eEb01f`
- `SemiFungiblePositionManagerV4`: `0x000000000000047534b9E1D528ED997169865a64`
- `PanopticPool (V4 impl)` (reference implementation - each PanopticPool is a proxy to this): `0x00000000000010bb6695dAAC60D0515c0A01a948`
- `PanopticPool (V3 impl)` (reference implementation - each PanopticPool is a proxy to this): `0x000000000000111475C0dD47f534Bd1aFF12BC3f`
- `CollateralTracker` (reference implementation - each CollateralTracker is a proxy to this): `0x0000000000002038055dB8f2B2Fd356598935C51`
- `BuilderFactory`: `0x00000000000008D41F2cd5bF144F61cEB3661F98`
- `RiskEngine`: `0x0000000000000e673aECBDB5f5fE5DFAf4a8e9Ac`
- `PanopticQuery`: `0x0000000000000e1aE9c66C1c3B0A547D23389C93`
- `InteractionHelper`: `0x00000000000040ae7CD505F4E0e3F34195D8c08C`
- `PanopticMath`: `0x000000000000301F5BC0171C75967b8e78a92b10`
- `PanopticGuardian`: `0x0000000000000C99fD9F3234eDf924E436331569`

## v1.1

- `PanopticFactory`: `0x0000000000000CF008e9bf9D01f8306029724c80`
- `SemiFungiblePositionManager`: `0x0000000000000aAbbcfCA8100a9ee78124E97B33`
- `PanopticMath`: `0x000000000002a1aeE756F088F0ab4a98A9866F55`
- `PanopticPool` (reference implementation - each PanopticPool is a proxy to this): `0x0000000000035D9945Bf4d24393828e920376bAe`
- `CollateralTracker` (reference implementation - each CollateralTracker is a proxy to this): `0x00000000000308eA65EdD5142b8189A17D2DEcFA`

## v1

- `PanopticFactory`: `0x000000000000010a1DEc6c46371A28A071F8bb01`
- `SemiFungiblePositionManager`: `0x0000000000000DEdEDdD16227aA3D836C5753194`
- `PanopticMath`: `0x000000000001CD07e625A9e225C37BEA50b3F441`
- `PanopticPool` (reference implementation - each PanopticPool is a proxy to this): `0x0000000000001B1A7fe31692d107cAA42fb06862`
- `CollateralTracker` (reference implementation - each CollateralTracker is a proxy to this): `0x000000000001931ac40ff8b16F08E47D2A7CD650`
