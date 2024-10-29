---
sidebar_position: 1
---

# Pool criteria

Panoptic Pools can be deployed permissionlessly by anyone, but pools listed on our interface must meet a certain set of criteria. Pools that do not meet criteria outlined on this page may have warnings displayed on the interface, deposits or trading may be disabled, or the pool may be delisted entirely.

## Tokens

---
Pools with one or more tokens not on the [Uniswap Labs Default List](https://tokenlists.org/token-list?url=https://tokens.uniswap.org) or the [Uniswap Labs Extended List](https://tokenlists.org/token-list?url=https://tokens.uniswap.org) are not officially supported and will display warnings to PLPs and traders.

On the gRHO platform, warnings will be displayed according to the above requirements, with the additional restriction that pools with tokens on the [Uniswap Unsupported List](https://unsupportedtokens.uniswap.org/) (which includes scam tokens as well as tokens that violate regulatory requirements for US-based users) will be delisted from the interface entirely.

Pools containing tokens with less than `6` decimals are supported; however, the interface will warn users that the pool may be subject to rounding errors.

We may whitelist tokens on a case-by-case basis. If you would like your token to be whitelisted on the Panoptic interface, please contact the team on Discord for more information. Whitelisted tokens will also be published on this page on a rolling basis.

## Liquidity

---
For Panoptic V1, instances deployed on Uniswap pools with less than `0.2 ETH` in TVL will display warnings to PLPs and traders. 
For a token to count as TVL (unless it is `WETH` or native `ETH`), it must be paired with `WETH`, native `ETH`, `USDC`, `USDT`, or `DAI` in at least one pool containing at least `10 ETH` in value of the other token.

Panoptic V1 instances with underutilized TVL exceeding the underlying pool are discouraged. 
Warnings will be displayed on deposits and trades once a Panoptic pool attains `25%` of the underlying pool's TVL.
For this purpose, liquidity added to Uniswap through Panoptic will count towards Uniswap's TVL, but not towards Panoptic's TVL. 

While Panoptic V1.1 instances on lower-liquidity Uniswap V4 pools may require more capital to trade, there are no specific liquidity requirements at this time. The liquidity requirements outlined above instead apply to the Uniswap V3 pool linked to a Panoptic V1.1 instance and used as an oracle.

## Oracles

---
For Panoptic V1 pools on mainnet, the underlying Uniswap V3 pool is required to have at least `51` Uniswap observations before it becomes tradable on the interface. An observation is taken on every block that contains at least one swap or in-range liquidity modification. Many existing Uniswap pools already have sufficient observation cardinality, but it may take some time for newer Uniswap pools to accumulate the required quantity of observations. This value is defined on the [parameters](/docs/developers/parameters) page, and may vary by chain depending on the blocktime. 

Each Panoptic V1.1 pool is linked to a Uniswap V3-compatible oracle contract. Currently, only Uniswap V3 pairs that share the same tokens, reach the minimum quantity of observations, and meet the criteria specified in the *Liquidity* section above are supported. 

In the future, Uniswap V4 hooks or other alternative oracle implementations that expose the [IV3CompatibleOracle](/docs/developers/V1.1/interfaces/interface.IV3CompatibleOracle) interface may also be supported. If you are building something like this, please reach out to the team on Discord.

