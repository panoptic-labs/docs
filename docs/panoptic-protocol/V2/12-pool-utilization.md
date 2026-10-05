# Pool Utilization

V2 has two distinct utilization concepts: token borrowing from a CollateralTracker and liquidity removal from an AMM chunk. Do not use one as a substitute for the other.

## Collateral-vault utilization

Use `getPoolData()` on each CollateralTracker for its accounted pool balances and utilization. The contract includes asset and credit accounting in its utilization calculation. A bare ERC-20 balance or the ratio of buyer count to seller count is not equivalent.

Vault utilization affects [borrow rates](./09-interest-rate-model.md), [collateral ratios](./05-utilization-and-ratios.md), and cross-token collateral support. Always read both tokens at a common block.

## Chunk utilization

Options buyers remove liquidity from a chunk supplied by sellers. The position manager tracks removed and remaining liquidity for streamia (streaming premium) accounting. `MAX_SPREAD` constrains their ratio; its raw scale and observed value are on the [parameter page](/docs/contracts/parameters).

A caller's per-position spread limit can be tighter than the protocol limit. Available chunk liquidity and collateral-vault liquidity are separate execution constraints.

References: [CollateralTracker](/docs/contracts/V2/contract.CollateralTracker), [v3 SFPM](/docs/contracts/V2/contract.SemiFungiblePositionManager), and [v4 SFPM](/docs/contracts/V2/contract.SemiFungiblePositionManagerV4).
