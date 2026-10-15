---
sidebar_position: 1
---

# Deployment Addresses

PanopticPools and CollateralTrackers are [proxy contracts](https://info.etherscan.com/what-is-proxy-contract/), with one PanopticPool per underlying Uniswap pool, and two CollateralTrackers per PanopticPool. You can fetch the PanopticPool for a given Uniswap pool [from the PanopticFactory](https://panoptic.xyz/docs/contracts/V2/contract.PanopticFactory#getpanopticpool). The core logic is deployed at the addresses below.

## v2

The proxy-based release launched on Ethereum Mainnet and Robinhood Chain on October 12, 2026, as recorded in the [app changelog](https://app.panoptic.xyz/changelog). Addresses below are reported by [core PR #270](https://github.com/panoptic-labs/panoptic-v2-core/pull/270) and its pinned build configs. Read a pool's `riskEngine()` and resolve the proxy implementation at the block you use; the reported initial implementation can change after an upgrade. These are release records, not fresh block-pinned RPC observations.

| Tier | Proxy address used by pools | Reported implementation |
| --- | --- | --- |
| Crypto blue chip | `0x000000000000ffE5eFdB5AE76b9200263C58b4c0` | `0x000000000000F0b287c19f606bC3A471F260c502` |
| xStocks | `0x000000000000FfADa7c641E2aD6B13b51b50Cc94` | `0x000000000000F4901018445c697e1e358DAb8dAD` |
| Reserved A | `0x000000000000ff1F72EB9b4a215DDac4d9dDa3dA` | Stub `0x000000000000F4a3109180d77f4d8242863c6e8A` |
| Reserved B | `0x000000000000Ff944ed41CbFa03edc0b477cBbf4` | Stub `0x000000000000F4a3109180d77f4d8242863c6e8A` |

The release reports ProxyAdmin owner `0x8DFEAA4AEe4596b90EF581d7731E4E0b7AbA3221`. Reserved proxies revert until activated and cannot yet host pools. See [proxy controls](/docs/contracts/V2/RiskEngine/contract.RiskEngineProxy) and [tier parameters](/docs/contracts/parameters).

### Ethereum Mainnet

#### Vaults

- `HypoVault (impl)`: `0xF16714665955DBd0361D997eFc50fe391D96E8D0`
- `Factory`: `0xd5049B2647de57141dE7F65E5124707B99A452A3`
- `Accountant`: `0x65aA902AE3135658587FFC36ED51B61c927114e1`
- `RolesAuthority`: `0xb952D345c413Ddb7850173422bAe4968e0330598`
- `CollateralTrackerDecoderAndSanitizer`: `0xC87c45d2dbE5acb56013e2591427ECC84Fa251E6`
- `Panoptic Liquidity Provider (PLP) Vault`: `0xd4e2c720a760049cc4151bcf61e3a9348db9cd92`
- `Unicorn Vault`: `0x236d0558f06cd60780b232d4Ec4c92d2cb7e4D18`

#### Core contracts

- `PanopticFactoryV3`: `0x0000000000000aDC9A108591e718F2aee963a2a7`
- `PanopticFactoryV4`: `0x0000000000000c51d0f8cf4bd9adE7191372a625`
- `SemiFungiblePositionManagerV3`: `0x00000000000005E4693aDc8Ec0f12D686f728198`
- `SemiFungiblePositionManagerV4`: `0x00000000000005C3287f136Ef5AF56c68Ea6849f`
- `PanopticPool (V4 impl)` (reference implementation - each PanopticPool is a proxy to this): `0x000000000000135429F0DaCaB61639Bf6a63EbbC`
- `PanopticPool (V3 impl)` (reference implementation - each PanopticPool is a proxy to this): `0x000000000000155f9860E155A779992Cde7E7449`
- `CollateralTracker` (reference implementation - each CollateralTracker is a proxy to this): `0x0000000000001d9c38CA405A2e04420865A08A33`
- `BuilderFactory`: `0x0000000000000a3D22E158417AA639D7F71b0FF7`
- `RiskEngineProxy (crypto blue chip)`: `0x000000000000ffE5eFdB5AE76b9200263C58b4c0`
- `RiskEngineProxy (xStocks)`: `0x000000000000FfADa7c641E2aD6B13b51b50Cc94`
- `PanopticQuery`: `0x0000000000000e1aE9c66C1c3B0A547D23389C93`
- `InteractionHelper`: `0x00000000000041fe14Ce3c2392337CE501aE8328`
- `PanopticMath`: `0x000000000000334bbd65C195581cf59ECf315932`

### Robinhood Chain

#### Vaults

- `HypoVault (impl)`: `0xF16714665955DBd0361D997eFc50fe391D96E8D0`
- `Factory`: `0xd5049B2647de57141dE7F65E5124707B99A452A3`
- `Accountant`: `0x9e345d862c41010F87D8E5A279e8D320D2831D36`
- `RolesAuthority`: `0xb952D345c413Ddb7850173422bAe4968e0330598`
- `CollateralTrackerDecoderAndSanitizer`: `0xC87c45d2dbE5acb56013e2591427ECC84Fa251E6`
- `USDG PLP Vault (5% fee)`: `0x08B24123252Bd9c4DD473b6573D4cF67196FFC4B`

#### Core contracts

- `SemiFungiblePositionManagerV4`: `0x00000000000005C3287f136Ef5AF56c68Ea6849f`
- `SemiFungiblePositionManagerV3`: `0x00000000000005E4693aDc8Ec0f12D686f728198`
- `BuilderFactory`: `0x0000000000000a3D22E158417AA639D7F71b0FF7`
- `RiskEngineProxy (crypto blue chip)`: `0x000000000000ffE5eFdB5AE76b9200263C58b4c0`
- `RiskEngineProxy (xStocks)`: `0x000000000000FfADa7c641E2aD6B13b51b50Cc94`
- `PanopticPool (V4 impl)` (reference implementation - each PanopticPool is a proxy to this): `0x000000000000135429F0DaCaB61639Bf6a63EbbC`
- `PanopticPool (V3 impl)` (reference implementation - each PanopticPool is a proxy to this): `0x000000000000155f9860E155A779992Cde7E7449`
- `CollateralTracker` (reference implementation - each CollateralTracker is a proxy to this): `0x0000000000001d9c38CA405A2e04420865A08A33`
- `PanopticFactoryV4`: `0x0000000000000c51d0f8cf4bd9adE7191372a625`
- `PanopticFactoryV3`: `0x0000000000000aDC9A108591e718F2aee963a2a7`
- `PanopticMath`: `0x000000000000334bbd65C195581cf59ECf315932`
- `InteractionHelper`: `0x00000000000041fe14Ce3c2392337CE501aE8328`
- `PanopticQuery`: `0x0000000000000e1aE9c66C1c3B0A547D23389C93`

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
