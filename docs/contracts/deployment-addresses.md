---
sidebar_position: 1
---

# Deployment Addresses

PanopticPools and CollateralTrackers are [proxy contracts](https://info.etherscan.com/what-is-proxy-contract/), with one PanopticPool per underlying Uniswap pool, and two CollateralTrackers per PanopticPool. You can fetch the PanopticPool for a given Uniswap pool [from the PanopticFactory](https://panoptic.xyz/docs/contracts/V1.0/contract.PanopticFactory#getpanopticpool). The core logic, however, is deployed to the following stable addresses on all EVM chains:

## v1

- `PanopticFactory`: `0x000000000000010a1DEc6c46371A28A071F8bb01`
- `SemiFungiblePositionManager`: `0x0000000000000DEdEDdD16227aA3D836C5753194`
- `PanopticMath`: `0x000000000001CD07e625A9e225C37BEA50b3F441`
- `PanopticPool` (reference implementation - each PanopticPool is a proxy to this): `0x0000000000001B1A7fe31692d107cAA42fb06862`
- `CollateralTracker` (reference implementation - each CollateralTracker is a proxy to this): `0x000000000001931ac40ff8b16F08E47D2A7CD650`

## v1.1

- `PanopticFactory`: `0x0000000000000CF008e9bf9D01f8306029724c80`
- `SemiFungiblePositionManager`: `0x0000000000000aAbbcfCA8100a9ee78124E97B33`
- `PanopticMath`: `0x000000000002a1aeE756F088F0ab4a98A9866F55`
- `PanopticPool` (reference implementation - each PanopticPool is a proxy to this): `0x0000000000035D9945Bf4d24393828e920376bAe`
- `CollateralTracker` (reference implementation - each CollateralTracker is a proxy to this): `0x00000000000308eA65EdD5142b8189A17D2DEcFA`
