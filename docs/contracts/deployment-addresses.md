---
sidebar_position: 1
---

# Deployment Addresses

PanopticPools and CollateralTrackers are [proxy contracts](https://info.etherscan.com/what-is-proxy-contract/), with one PanopticPool per underlying Uniswap pool, and two CollateralTrackers per PanopticPool. You can fetch the PanopticPool for a given Uniswap pool [from the PanopticFactory](https://panoptic.xyz/docs/contracts/V2/contract.PanopticFactory#getpanopticpool). The core logic, however, is deployed to the following stable addresses on all EVM chains:

## Vaults
- `HypoVault (impl)`: `0xF16714665955DBd0361D997eFc50fe391D96E8D0`
- `Factory`: `0xd5049B2647de57141dE7F65E5124707B99A452A3`
- `Accountant`: `0x65aA902AE3135658587FFC36ED51B61c927114e1`
- `RolesAuthority`: `0xb952D345c413Ddb7850173422bAe4968e0330598`
- `CollateralTrackerDecoderAndSanitizer`: `0xC87c45d2dbE5acb56013e2591427ECC84Fa251E6`
- `Panoptic Liquidity Provider (PLP) Vault`: `0xd4e2c720a760049cc4151bcf61e3a9348db9cd92`
- `Unicorn Vault`: `0x236d0558f06cd60780b232d4Ec4c92d2cb7e4D18`

## v2

- `PanopticFactoryV3`: `0x0000000000000aDC9A108591e718F2aee963a2a7`
- `PanopticFactoryV4`: `0x0000000000000c51d0f8cf4bd9adE7191372a625`
- `SemiFungiblePositionManagerV3`: `0x00000000000005E4693aDc8Ec0f12D686f728198`
- `SemiFungiblePositionManagerV4`: `0x00000000000005C3287f136Ef5AF56c68Ea6849f`
- `PanopticPool (V4 impl)` (reference implementation - each PanopticPool is a proxy to this): `0x000000000000135429F0DaCaB61639Bf6a63EbbC`
- `PanopticPool (V3 impl)` (reference implementation - each PanopticPool is a proxy to this): `0x000000000000155f9860E155A779992Cde7E7449`
- `CollateralTracker` (reference implementation - each CollateralTracker is a proxy to this): `0x0000000000001d9c38CA405A2e04420865A08A33`
- `BuilderFactory`: `0x0000000000000a3D22E158417AA639D7F71b0FF7`
- `RiskEngine`: `0x000000000000075E29Cdaa9cb640A69e148ca7da`
- `PanopticQuery`: `0x0000000000000e1aE9c66C1c3B0A547D23389C93`
- `InteractionHelper`: `0x00000000000041fe14Ce3c2392337CE501aE8328`
- `PanopticMath`: `0x000000000000334bbd65C195581cf59ECf315932`
- `PanopticGuardian`: `0x0000000000000D329aCC1514f4Ba05584a8369ed`

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
