---
sidebar_position: 1
sidebar_label: "Protocol Parameters"
---

# Protocol Parameters (V2)

V2 pools select an immutable RiskEngine at deployment. Read the pool's `riskEngine()` address before choosing a configuration below. These are the three active engines for Ethereum (chain 1) and Robinhood (chain 4663); deprecated engines are excluded.

The tables are generated from [block-pinned RPC observations](/data/risk-engines.json). Each snapshot checks the chain, deployed runtime, all listed getters, safe-mode boundaries, and cross-buffer behavior. The runtime is also compared with the result of executing the pinned public release's creation bytecode in a read-only `eth_call`. Source-reference pages describe a pinned public source revision; deployed parameters come from the snapshot, not repository defaults.

## How to interpret the parameters

- Fee rates and fee splits use basis points: `10_000` = 100%.
- Collateral ratios, cross buffers, the buying-power-decrease buffer (`BP_DECREASE_BUFFER`), and exercise-cost coefficients use `DECIMALS = 10_000_000`. The buffer applies to minting and collateral-withdrawal checks. A value of `10_666_667` multiplies the requirement by approximately 1.066667; it is not a fee. In the pinned implementation, force-exercise solvency checks in `dispatchFrom` use `NO_BUFFER` (`10_000_000`).
- `MAX_SPREAD` uses a scale of `10_000` for removed liquidity divided by remaining liquidity. `VEGOID` is an integer controlling streamia (streaming premium) sensitivity.
- `EMA_PERIODS` packs four 24-bit periods in seconds, ordered spot, fast, slow, eons. Interest rates use WAD (`10^18`) per second; these rates are not APYs or promises of lender returns.
- `TARGET_POOL_UTIL` is the collateral utilization threshold; `TARGET_UTILIZATION` is the separately scaled interest-model target.

### Collateral and token ordering

The base seller ratio increases toward full collateralization above the collateral utilization target. The base buyer ratio is constant in these engines; final requirements still depend on position composition, price, and risk partners. `MAINT_MARGIN_RATE` is the additional maintenance margin used for loan legs. None of these base ratios is a universal maximum leverage promise.

`CROSS_BUFFER_0` and `CROSS_BUFFER_1` determine how surplus collateral can support a deficit in the other token. They are not the collateral ratios for opening positions. The effective cross buffer decreases linearly between 90% and 95% utilization and is zero above that range. The two stock engines swap these token-specific coefficients: choose the actual pool engine and token ordering rather than assuming a token symbol or quote asset.

### Fees and builder routing

Opening a position charges the notional fee on the sum of long and short amounts in each collateral token. Interest on borrowed tokens and streamia are separate costs.

For a close with realized streamia, the commission is the smaller of the streamia-based fee and ten times the notional fee on the closing notional. A streamia-only settlement with zero long and short notional uses the streamia fee without that notional cap. The contracts round asset/share conversions; the streamia-fee parameter alone does not determine the final amount charged.

With a valid nonzero builder code, the protocol and builder receive their configured shares of the calculated commission; the remainder is a user discount (currently 10%). With code zero, no builder wallet receives fees and commission share burning benefits collateral-vault shareholders. A nonzero code must resolve to a deployed builder wallet.

### Oracles, exercise, and liquidation

V2 uses internal AMM-derived price observations for risk checks. The automatic safe-mode conditions compare current vs spot EMA using `MAX_TICKS_DELTA`, and spot vs fast EMA and median vs slow EMA using half that threshold. The guardian lock adds three to the automatic score. See the [oracle guide](/docs/panoptic-protocol/V2/oracle-system) and [safe-mode guide](/docs/panoptic-protocol/V2/safe-mode) for behavior.

`FORCE_EXERCISE_COST` is a coefficient in a position- and price-dependent calculation, not a flat charge for every forced exercise. `MAX_BONUS` caps one component of liquidation compensation; final settlement also depends on collateral deficits, token balances, and potential protocol loss. Use the engine's calculation interfaces for an actual position.

<!-- BEGIN GENERATED RISK ENGINE TABLES -->

## Crypto blue chip {#crypto-blue-chip}

Address: `0x000000000000075e29cdaa9cb640a69e148ca7da`.

[Public source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/RiskEngine.sol) · [Release artifact](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/deployment-info-RiskEngine.json)

- **Ethereum (chain 1)**: block `26077088`, 2026-09-28T16:16:23.000Z; runtime hash `0x2831f41cd43d8a4d17ddba4621862181b33eee68f1d4e1b2c1254649c1071dd0`.
- **Robinhood (chain 4663)**: block `74933551`, 2026-09-28T16:15:56.000Z; runtime hash `0x2831f41cd43d8a4d17ddba4621862181b33eee68f1d4e1b2c1254649c1071dd0`.

Values match on both chains at the recorded blocks.

### Fees and liquidity

| Getter | Raw value | Interpretation |
| --- | --- | --- |
| `NOTIONAL_FEE` | `3` | 3 bps (0.03%) |
| `PREMIUM_FEE` | `250` | 250 bps (2.5%) |
| `PROTOCOL_SPLIT` | `5000` | 5000 bps (50%) |
| `BUILDER_SPLIT` | `4000` | 4000 bps (40%) |
| `VEGOID` | `8` | 8 |
| `MAX_SPREAD` | `90000` | 9× |

### Collateral and solvency

| Getter | Raw value | Interpretation |
| --- | --- | --- |
| `DECIMALS` | `10000000` | 10000000 |
| `SELLER_COLLATERAL_RATIO` | `2000000` | 20% |
| `BUYER_COLLATERAL_RATIO` | `1000000` | 10% |
| `MAINT_MARGIN_RATE` | `1000000` | 10% |
| `TARGET_POOL_UTIL` | `6666667` | 66.66667% |
| `SATURATED_POOL_UTIL` | `9000000` | 90% |
| `BP_DECREASE_BUFFER` | `10666667` | 106.66667% |
| `CROSS_BUFFER_0` | `10000000` | 100% |
| `CROSS_BUFFER_1` | `10000000` | 100% |
| `MAX_OPEN_LEGS` | `26` | 26 |
| `MAX_BONUS` | `2000000` | 20% |
| `FORCE_EXERCISE_COST` | `30000` | 0.3% |

### Oracle and interest

| Getter | Raw value | Interpretation |
| --- | --- | --- |
| `EMA_PERIODS` | `4533471891108855828971580` | 60 / 120 / 240 / 960 seconds (spot / fast / slow / eons) |
| `MAX_TICKS_DELTA` | `724` | 724 ticks |
| `MAX_TWAP_DELTA_DISPATCH` | `513` | 513 ticks |
| `MAX_CLAMP_DELTA` | `149` | 149 ticks |
| `TARGET_UTILIZATION` | `666666666666666666` | 66.6666666666666666% |
| `CURVE_STEEPNESS` | `4000000000000000000` | 4× |
| `MIN_RATE_AT_TARGET` | `31709791` | 0.000000000031709791 per second (WAD) |
| `MAX_RATE_AT_TARGET` | `63419583967` | 0.000000063419583967 per second (WAD) |
| `INITIAL_RATE_AT_TARGET` | `1268391679` | 0.000000001268391679 per second (WAD) |
| `ADJUSTMENT_SPEED` | `1585489599188` | 0.000001585489599188 per second (WAD) |
| `IRM_MAX_ELAPSED_TIME` | `16384` | 16384 seconds |

## Stocks {#stocks}

Address: `0x0000000000000fe1e261f66ce2f44def4f5ae0cb`.

[Public source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/RiskEngineXStocks.sol) · [Release artifact](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/deployment-info-RiskEngineXStocks.json)

- **Ethereum (chain 1)**: block `26077088`, 2026-09-28T16:16:23.000Z; runtime hash `0x90016233bb93187122d6758e378be70de6a3e5fdcaeb5558bccd7131833a8388`.
- **Robinhood (chain 4663)**: block `74933551`, 2026-09-28T16:15:56.000Z; runtime hash `0x90016233bb93187122d6758e378be70de6a3e5fdcaeb5558bccd7131833a8388`.

Values match on both chains at the recorded blocks.

### Fees and liquidity

| Getter | Raw value | Interpretation |
| --- | --- | --- |
| `NOTIONAL_FEE` | `3` | 3 bps (0.03%) |
| `PREMIUM_FEE` | `250` | 250 bps (2.5%) |
| `PROTOCOL_SPLIT` | `5000` | 5000 bps (50%) |
| `BUILDER_SPLIT` | `4000` | 4000 bps (40%) |
| `VEGOID` | `8` | 8 |
| `MAX_SPREAD` | `90000` | 9× |

### Collateral and solvency

| Getter | Raw value | Interpretation |
| --- | --- | --- |
| `DECIMALS` | `10000000` | 10000000 |
| `SELLER_COLLATERAL_RATIO` | `3300000` | 33% |
| `BUYER_COLLATERAL_RATIO` | `1500000` | 15% |
| `MAINT_MARGIN_RATE` | `2500000` | 25% |
| `TARGET_POOL_UTIL` | `6666667` | 66.66667% |
| `SATURATED_POOL_UTIL` | `9000000` | 90% |
| `BP_DECREASE_BUFFER` | `10666667` | 106.66667% |
| `CROSS_BUFFER_0` | `7500000` | 75% |
| `CROSS_BUFFER_1` | `9000000` | 90% |
| `MAX_OPEN_LEGS` | `26` | 26 |
| `MAX_BONUS` | `2000000` | 20% |
| `FORCE_EXERCISE_COST` | `30000` | 0.3% |

### Oracle and interest

| Getter | Raw value | Interpretation |
| --- | --- | --- |
| `EMA_PERIODS` | `9066943782217711657943160` | 120 / 240 / 480 / 1920 seconds (spot / fast / slow / eons) |
| `MAX_TICKS_DELTA` | `953` | 953 ticks |
| `MAX_TWAP_DELTA_DISPATCH` | `513` | 513 ticks |
| `MAX_CLAMP_DELTA` | `149` | 149 ticks |
| `TARGET_UTILIZATION` | `666666666666666666` | 66.6666666666666666% |
| `CURVE_STEEPNESS` | `4000000000000000000` | 4× |
| `MIN_RATE_AT_TARGET` | `31709791` | 0.000000000031709791 per second (WAD) |
| `MAX_RATE_AT_TARGET` | `63419583967` | 0.000000063419583967 per second (WAD) |
| `INITIAL_RATE_AT_TARGET` | `1268391679` | 0.000000001268391679 per second (WAD) |
| `ADJUSTMENT_SPEED` | `1585489599188` | 0.000001585489599188 per second (WAD) |
| `IRM_MAX_ELAPSED_TIME` | `16384` | 16384 seconds |

## Stocks, inverted token ordering {#stocks-inverted}

Address: `0x0000000000000f3fb82469581a74776178e76ca4`.

[Public source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/RiskEngineXStocks.sol) · [Release artifact](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/deployment-info-RiskEngineXStocks.json)

- **Ethereum (chain 1)**: block `26077088`, 2026-09-28T16:16:23.000Z; runtime hash `0xd2bf788fc4629628208b7e579d531f93074ece9afd35267f35245437d9a9d7d5`.
- **Robinhood (chain 4663)**: block `74933551`, 2026-09-28T16:15:56.000Z; runtime hash `0xd2bf788fc4629628208b7e579d531f93074ece9afd35267f35245437d9a9d7d5`.

Values match on both chains at the recorded blocks.

### Fees and liquidity

| Getter | Raw value | Interpretation |
| --- | --- | --- |
| `NOTIONAL_FEE` | `3` | 3 bps (0.03%) |
| `PREMIUM_FEE` | `250` | 250 bps (2.5%) |
| `PROTOCOL_SPLIT` | `5000` | 5000 bps (50%) |
| `BUILDER_SPLIT` | `4000` | 4000 bps (40%) |
| `VEGOID` | `8` | 8 |
| `MAX_SPREAD` | `90000` | 9× |

### Collateral and solvency

| Getter | Raw value | Interpretation |
| --- | --- | --- |
| `DECIMALS` | `10000000` | 10000000 |
| `SELLER_COLLATERAL_RATIO` | `3300000` | 33% |
| `BUYER_COLLATERAL_RATIO` | `1500000` | 15% |
| `MAINT_MARGIN_RATE` | `2500000` | 25% |
| `TARGET_POOL_UTIL` | `6666667` | 66.66667% |
| `SATURATED_POOL_UTIL` | `9000000` | 90% |
| `BP_DECREASE_BUFFER` | `10666667` | 106.66667% |
| `CROSS_BUFFER_0` | `9000000` | 90% |
| `CROSS_BUFFER_1` | `7500000` | 75% |
| `MAX_OPEN_LEGS` | `26` | 26 |
| `MAX_BONUS` | `2000000` | 20% |
| `FORCE_EXERCISE_COST` | `30000` | 0.3% |

### Oracle and interest

| Getter | Raw value | Interpretation |
| --- | --- | --- |
| `EMA_PERIODS` | `9066943782217711657943160` | 120 / 240 / 480 / 1920 seconds (spot / fast / slow / eons) |
| `MAX_TICKS_DELTA` | `953` | 953 ticks |
| `MAX_TWAP_DELTA_DISPATCH` | `513` | 513 ticks |
| `MAX_CLAMP_DELTA` | `149` | 149 ticks |
| `TARGET_UTILIZATION` | `666666666666666666` | 66.6666666666666666% |
| `CURVE_STEEPNESS` | `4000000000000000000` | 4× |
| `MIN_RATE_AT_TARGET` | `31709791` | 0.000000000031709791 per second (WAD) |
| `MAX_RATE_AT_TARGET` | `63419583967` | 0.000000063419583967 per second (WAD) |
| `INITIAL_RATE_AT_TARGET` | `1268391679` | 0.000000001268391679 per second (WAD) |
| `ADJUSTMENT_SPEED` | `1585489599188` | 0.000001585489599188 per second (WAD) |
| `IRM_MAX_ELAPSED_TIME` | `16384` | 16384 seconds |

<!-- END GENERATED RISK ENGINE TABLES -->

---

# Protocol Parameters for V1 and V1.1 (DEPRECATED)
Panoptic V1 and V1.1 have immutable parameters that factor into calculations for collateral requirements, oracle prices, streamia multipliers, and other key aspects of the protocol. The current parameters for pools created by the Panoptic V1 and V1.1 factories on Ethereum Mainnet are outlined below.

---
## Collateral Parameters
These parameters are used to calculate the collateral requirements for options traders on Panoptic. Each Panoptic instance has two collateral vaults: one for each token in the Uniswap pool. Both vaults use the same collateral parameter values, but have separate pool utilization metrics. For any given option leg, the collateral ratio used will correspond to the pool utilization in the collateral vault for the Uniswap (token0 or token1) `tokenType` parameter in that leg.

---

### SELL_COLLATERAL_RATIO
```solidity
uint256 immutable SELL_COLLATERAL_RATIO (bps) = 2_000 = 20%
```

The seller collateral ratio is the ratio of the collateral required to sell an option to the option's notional value (amount borrowed from [PLPs](/docs/panoptic-protocol/protocol-roles#lenders-passive-liquidity-providers-plps)).
The collateral ratio remains at the parameter value for options minted when the pool utilization is between `0` and `TARGET_POOL_UTIL`. For options minted `utilization=TARGET_POOL_UTIL` and `utilization=SATURATED_POOL_UTIL`, the collateral ratio increases linearly to 100%.


### BUY_COLLATERAL_RATIO
```solidity
uint256 immutable BUY_COLLATERAL_RATIO (bps) = 1_000 = 10%
```
The buyer collateral ratio is the ratio of the collateral required to buy an option to the option's notional value (amount of tokens held against borrowed liquidity chunk). The collateral ratio remains at the parameter value for options minted when the pool utilization is between `0` and `TARGET_POOL_UTIL`. For options minted between `utilization=TARGET_POOL_UTIL` and `utilization=SATURATED_POOL_UTIL`, the collateral ratio decreases linearly to `BUY_COLLATERAL_RATIO / 2`.

### TARGET_POOL_UTIL
```solidity
uint256 immutable TARGET_POOL_UTIL (bps) = 5_000 = 50%
```
The target pool utilization acts as the inflection point for `SELL_COLLATERAL_RATIO` and `BUY_COLLATERAL_RATIO`. Once the pool utilization reaches this value, collateral requirements for sellers increase (discouraging further borrowing/utilization of tokens from the pool) and collateral requirements for buyers decrease (encouraging the return of borrowed funds deployed by sellers as liquidity in Uniswap to the collateral vault).

### SATURATED_POOL_UTIL
```solidity
uint256 immutable SATURATED_POOL_UTIL (bps) = 9_000 = 90%
```
The saturated pool utilization is the point at which options sellers are required to post 100% of the option's notional value as collateral, and the point at which option buyers reach their minimum collateral requirement. Once the pool utilization reaches this point, the collateral requirements will maximally incentivize positions that decrease the pool utilization and maximally discourage positions that increase it.

### BP_DECREASE_BUFFER
```solidity
uint256 immutable BP_DECREASE_BUFFER (bps) = 13_333 = 133.33%
```
This parameter is a multiplier applied to the total collateral requirement for a user during solvency checks after they perform actions which may decrease their buying power, namely, minting options or force exercising another user.
The buffer ensures that users cannot cause their own account to go into a liquidatable state; insolvency should only occur after a significant price movement or long streamia accumulation.

## Streamia parameters
These parameters help to determine the maximum amount of liquidity that can be borrowed from option sellers, and the multiplier over Uniswap fees owed by option buyers to option sellers.  

---
### VEGOID
```solidity
uint256 immutable VEGOID = 3
```
`VEGOID` is a parameter used to modify the [streamia multiplier equation](https://www.desmos.com/calculator/mdeqob2m04): lower values of `VEGOID` result in an increased rate of increase in the streamia multiplier as the percentage of sold liquidity borrowed in a chunk increases, while higher values of `VEGOID` result in a more gradual streamia multiplier increase alongside increases in liquidity utilization.

The streamia multiplier (over fees earned by an identical Uniswap position) paid by option buyers in a given liquidity chunk (consisting of `strike`, `width`, and `tokenType`) increases along with the percentage of sold liquidity borrowed in that chunk according to the equation linked above.

### MAX_SPREAD
```solidity
uint256 immutable MAX_SPREAD (x2^32) = 9 * (2**32) = 9x
```
`MAX_SPREAD` defines the maximum value of `removedLiquidity/remainingLiquidity` (e.g. `MAX_SPREAD=9x` corresponds to a maximum
`90%` overall liquidity utilization). This serves to limit the multiplier on the streamia paid by option buyers to option sellers: according to the  [streamia multiplier equation](https://www.desmos.com/calculator/mdeqob2m04), the maximum streamia multiplier for a `MAX_SPREAD` of `9x` is `3.25x`.

## Fee parameters
These parameters define the fees corresponding to various actions on the Panoptic protocol.

---
### COMMISSION_FEE
```solidity
uint256 immutable COMMISSION_FEE (bps) = 20 = 0.2%
```
The commission fee is the base fee charged on the notional value of both purchased and sold options when they are minted. 

This fee is distributed to [PLPs](/docs/panoptic-protocol/protocol-roles#lenders-passive-liquidity-providers-plps) in the corresponding `tokenType` vault, serving as interest payments for tokens borrowed by option sellers.

The commission fee is also charged on PLP deposits and distributed to existing PLPs to discourage the capture of commission fees through just-in-time liquidity provision.

### ITM_SPREAD_MULTIPLIER (Panoptic V1)
```solidity
uint256 immutable ITM_SPREAD_MULTIPLIER (bps) = 20_000 = 200%
```
The ITM spread fee is defined by `ITM_SPREAD_MULTIPLIER * uniswapPoolFee`, and is charged on the (absolute) intrinsic value of in-the-money option legs when they are minted.
Like the `COMMISSION_FEE`, this fee also compensates PLPs for the risk of providing liquidity to the protocol. The fee is waived for options that do not perform ITM swaps (either by a user's choice to mint a covered position, or for options minted while the protocol is in safe mode).

### ITM_SPREAD_FEE (Panoptic V1.1)
```solidity
uint256 immutable ITM_SPREAD_FEE (bps) = 20 = 0.2%
```
This fee serves the same role in Panoptic V1.1 as the ITM spread fee does in Panoptic V1, but it remains constant across all pools rather than being determined by a multiple of the Uniswap pool fee.

### FORCE_EXERCISE_COST
```solidity
int256 immutable FORCE_EXERCISE_COST (bps) = -128 = 1.28%
```
The [force exercise](/docs/product/force-exercise) cost is the fee paid to the force exercisee by the force exercisor. The fee is charged on the notional value of the long legs in the position, and decreases by a factor of two for each half-leg-width the current tick is away from the strike (the leg with the largest amount of distance in half-leg-widths is used for this calculation).
This discourages force exercising positions with legs that have just become out-of-range, but allows users with far-the-money positions to be force exercised cheaply to free up their liquidity so it can be moved closer to the current price. 

## Oracle parameters
Panoptic does not use any external oracles, but instead utilizes onchain price observations from Uniswap V3-style oracles to generate manipulation-resistant price feeds.
These parameters define the configuration for each of the price feeds that Panoptic constructs from Uniswap observations.

---
### CARDINALITY_INCREASE (Ethereum Mainnet)
```solidity
uint256 immutable CARDINALITY_INCREASE = 51
```
The cardinality increase is the amount of Uniswap observation slots the Panoptic factory initializes (up to) on the oracle pool when a Panoptic instance is deployed.
This value is determined by the average blocktime of the deployed chain; if observations are made at the maximum frequency (once per block), the cardinality should be sufficient to guarantee that the *oldest* observation in the pool is at least `TWAP_WINDOW` seconds old.
Note that this guarantee only begins to hold once all the initialized observations are filled for the first time, so a Panoptic instance may not be safe to use until `CARDINALITY_INCREASE - PREVIOUS_CARDINALITY` observations are taken post-deployment.

### TWAP_WINDOW
```solidity
uint256 immutable TWAP_WINDOW (seconds) = 600 = 10 minutes
```
The TWAP window defines the minimum window of time over which to calculate the TWAP price for solvency checks during a liquidation. The oldest Uniswap observation should be at least `TWAP_WINDOW` seconds old.

### FAST_ORACLE_PERIOD (Ethereum Mainnet)
```solidity
uint256 immutable FAST_ORACLE_PERIOD = 1
```
The fast oracle period defines spacing between each observation used in the fast oracle price feed.

### FAST_ORACLE_CARDINALITY (Ethereum Mainnet)
```solidity
uint256 immutable FAST_ORACLE_CARDINALITY = 3
```
The fast oracle cardinality defines the number of observations, starting at the latest observation and separated by `FAST_ORACLE_PERIOD`, over which to compute the median fast oracle price. This is the only price used to determine solvency during all protocol actions besides liquidations, except when the sum of the squares of the deltas between the fast, slow, current, and last observed tick exceeds `MAX_TICKS_DELTA^2`.

### SLOW_ORACLE_UNISWAP_MODE
```solidity
bool immutable SLOW_ORACLE_UNISWAP_MODE = false
```
This parameter determines which oracle type to use for the "slow" oracle price on non-liquidation solvency checks.
If false, an 8-slot internal median array is used to compute the "slow" oracle price.
This oracle is updated with the last oracle observation during `mintOptions` if MEDIAN_PERIOD has elapsed past the last observation.
If true, the "slow" oracle price is instead computed on-the-fly from `SLOW_ORACLE_CARDINALITY` oracle observations (spaced `SLOW_ORACLE_PERIOD` observations apart).

### MEDIAN_PERIOD
```solidity
uint256 immutable MEDIAN_PERIOD (seconds) = 60 = 1 minute
```
The median period is the minimum amount of time permitted between internal median array updates.

### SLOW_ORACLE_PERIOD (Ethereum Mainnet)
```solidity
uint256 immutable SLOW_ORACLE_PERIOD = 5
```
This slow oracle period defines the spacing between each observation used in the slow oracle price feed. **Note:** this configuration of the slow oracle is currently disabled (`SLOW_ORACLE_UNISWAP_MODE = false`).

### SLOW_ORACLE_CARDINALITY (Ethereum Mainnet)
```solidity
uint256 immutable SLOW_ORACLE_CARDINALITY = 9
```
The slow oracle cardinality defines the number of observations, starting at the latest observation and separated by `SLOW_ORACLE_PERIOD`, over which to compute the median slow oracle price.
**Note:** this configuration of the slow oracle is currently disabled (`SLOW_ORACLE_UNISWAP_MODE = false`).

### MAX_TICKS_DELTA
```solidity
uint256 immutable MAX_TICKS_DELTA = 953
```
`MAX_TICKS_DELTA` is a threshold for the sum of the squares of the cumulative deltas between the fast, slow, current, and last observed tick.
If one or more oracle ticks are stale enough that this threshold is exceeded during a solvency check, the protocol will enforce that the user is solvent at all oracle ticks (as opposed to just the `fastOracleTick`).

### MAX_TWAP_DELTA_LIQUIDATION
```solidity
uint256 immutable MAX_TWAP_DELTA_LIQUIDATION = 513
```
`MAX_TWAP_DELTA_LIQUIDATION` defines the maximum allowed delta between the currentTick and the Uniswap TWAP tick (`TWAP_WINDOW`) during a liquidation (e.g. at `MAX_TWAP_DELTA_LIQUIDATION = 513` this corresponds to ~5% down or ~5.26% up). Preventing liquidations when this threshold is exceeded ensures that manipulation of the `currentTick` is limited, reducing the extent to which a liquidation can occur at inaccurate prices in an unfavorable direction to the liquidatee.

## Miscellaneous parameters
These parameters define various other aspects of the Panoptic protocol.

---
### MAX_OPEN_LEGS (Ethereum Mainnet)
```solidity
uint256 immutable MAX_OPEN_LEGS = 25
```
`MAX_OPEN_LEGS` defines the maximum number of legs permitted across all open positions for an account on an individual Panoptic pool at any given time. Each position, created through a `mintOptions` call, is a `tokenId` that can contain between 1 and 4 legs. All legs contribute toward the limit, regardless of how they are distributed across an account's positions. This limit ensures that an account can always be liquidated within the gas limit; the value may be raised or lowered on different chains depending on what that limit is.


### MIN_ENFORCED_TICKFILL_COST
The approximate minimum amount of tokens it should require to fill `maxLiquidityPerTick` at the minimum and maximum enforced ticks for a liquidity chunk in the SFPM.
```solidity
uint256 immutable MIN_ENFORCED_TICKFILL_COST = 2100 * 10**18 = 2100 ether
```

### NATIVE_ENFORCED_TICKFILL_COST (Ethereum Mainnet, Panoptic V1.1)
The approximate minimum amount of **native** tokens it should require to fill `maxLiquidityPerTick` at the minimum and maximum enforced ticks for a liquidity chunk in the SFPM. The value of this parameter may vary for chains with a native token other than ETH.
```solidity
uint256 immutable NATIVE_ENFORCED_TICKFILL_COST = 2100 * 10**18 = 2100 ether
```

### SUPPLY_MULTIPLIER_TICKFILL
The multiplier, in basis points, to apply to the token supply and set as the enforced tick fill cost if greater than `MIN_ENFORCED_TICKFILL_COST`. In Panoptic V1.1, this multiplier does not apply to pools paired with the native token.

```solidity
uint256 immutable SUPPLY_MULTIPLIER_TICKFILL (bps) = 10_000 = 100%
```