# IRiskEngine

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/interfaces/IRiskEngine.sol)

**Title:**
Panoptic Risk Engine Interface

Interface for the central risk assessment and solvency calculator for the Panoptic Protocol.


## Functions
### IRM_MAX_ELAPSED_TIME

Constant, in seconds, used to determine the max elapsed time between adaptive interest rate updates.


```solidity
function IRM_MAX_ELAPSED_TIME() external view returns (int256);
```

### CURVE_STEEPNESS

Curve steepness (scaled by WAD).


```solidity
function CURVE_STEEPNESS() external view returns (int256);
```

### MIN_RATE_AT_TARGET

Minimum rate at target per second (scaled by WAD).


```solidity
function MIN_RATE_AT_TARGET() external view returns (int256);
```

### MAX_RATE_AT_TARGET

Maximum rate at target per second (scaled by WAD).


```solidity
function MAX_RATE_AT_TARGET() external view returns (int256);
```

### TARGET_UTILIZATION

Target utilization (scaled by WAD).


```solidity
function TARGET_UTILIZATION() external view returns (int256);
```

### INITIAL_RATE_AT_TARGET

Initial rate at target per second (scaled by WAD).


```solidity
function INITIAL_RATE_AT_TARGET() external view returns (int256);
```

### ADJUSTMENT_SPEED

Adjustment speed per second (scaled by WAD).


```solidity
function ADJUSTMENT_SPEED() external view returns (int256);
```

### GUARDIAN

Address allowed to override the automatically computed safe mode.


```solidity
function GUARDIAN() external view returns (address);
```

### BUILDER_FACTORY

Address of the builder factory.


```solidity
function BUILDER_FACTORY() external view returns (address);
```

### DECIMALS

Decimals for computation (1 millitick precision).


```solidity
function DECIMALS() external view returns (uint256);
```

### EMA_PERIODS

Packed EMA periods for spot, fast, and slow EMAs.


```solidity
function EMA_PERIODS() external view returns (uint96);
```

### MAX_TICKS_DELTA

The maximum allowed cumulative delta between oracle ticks.


```solidity
function MAX_TICKS_DELTA() external view returns (int256);
```

### MAX_TWAP_DELTA_DISPATCH

The maximum allowed delta between the currentTick and the Uniswap TWAP tick during dispatch.


```solidity
function MAX_TWAP_DELTA_DISPATCH() external view returns (uint16);
```

### MAX_SPREAD

The maximum spread for long premium calculations.


```solidity
function MAX_SPREAD() external view returns (uint24);
```

### BP_DECREASE_BUFFER

Multiplier for the collateral requirement during buying power decrease.


```solidity
function BP_DECREASE_BUFFER() external view returns (uint32);
```

### MAX_CLAMP_DELTA

The maximum amount of change, in ticks, permitted between internal median updates.


```solidity
function MAX_CLAMP_DELTA() external view returns (int24);
```

### NOTIONAL_FEE

The notional fee, in basis points, collected from PLPs at option mint.


```solidity
function NOTIONAL_FEE() external view returns (uint16);
```

### PREMIUM_FEE

The premium fee, in basis points, collected from the premium paid/received.


```solidity
function PREMIUM_FEE() external view returns (uint16);
```

### PROTOCOL_SPLIT

The protocol split, in basis points, when a builder code is present.


```solidity
function PROTOCOL_SPLIT() external view returns (uint16);
```

### BUILDER_SPLIT

The builder split, in basis points, when a builder code is present.


```solidity
function BUILDER_SPLIT() external view returns (uint16);
```

### SELLER_COLLATERAL_RATIO

Required collateral ratio for selling options, scaled by 10_000_000.


```solidity
function SELLER_COLLATERAL_RATIO() external view returns (uint256);
```

### BUYER_COLLATERAL_RATIO

Required collateral ratio for buying options, scaled by 10_000_000.


```solidity
function BUYER_COLLATERAL_RATIO() external view returns (uint256);
```

### MAINT_MARGIN_RATE

Required collateral margin for loans in excess of notional, scaled by 10_000_000.


```solidity
function MAINT_MARGIN_RATE() external view returns (uint256);
```

### FORCE_EXERCISE_COST

Basal exercise-cost coefficient applied when at least one long leg is in range; fully out-of-the-money positions use `ONE_BPS` instead. Scaled by `10_000_000`.


```solidity
function FORCE_EXERCISE_COST() external view returns (uint256);
```

### TARGET_POOL_UTIL

Target pool utilization below which buying+selling is optimal, scaled by 10_000_000.


```solidity
function TARGET_POOL_UTIL() external view returns (uint256);
```

### SATURATED_POOL_UTIL

Pool utilization above which selling is 100% collateral backed, scaled by 10_000_000.


```solidity
function SATURATED_POOL_UTIL() external view returns (uint256);
```

### CROSS_BUFFER_0

Cross buffer parameter for token0.


```solidity
function CROSS_BUFFER_0() external view returns (uint256);
```

### CROSS_BUFFER_1

Cross buffer parameter for token1.


```solidity
function CROSS_BUFFER_1() external view returns (uint256);
```

### MAX_OPEN_LEGS

Maximum number of open legs allowed.


```solidity
function MAX_OPEN_LEGS() external view returns (uint256);
```

### MAX_BONUS

Max raw per-token bonus rate during liquidations (currently 20% of required)


```solidity
function MAX_BONUS() external view returns (uint256);
```

### lockPool

Forces a PanopticPool into locked safe mode.


```solidity
function lockPool(PanopticPoolV2 pool) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The PanopticPool to lock.|


### unlockPool

Removes the forced safe-mode lock on a PanopticPool.


```solidity
function unlockPool(PanopticPoolV2 pool) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The PanopticPool to unlock.|


### collect

Collects a specific amount of tokens from this contract


```solidity
function collect(address token, address recipient, uint256 amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the ERC20 token to collect|
|`recipient`|`address`|The address to send the tokens to|
|`amount`|`uint256`|The amount of tokens to collect|


### collect

Collects all available tokens of a specific type from this contract


```solidity
function collect(address token, address recipient) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the ERC20 token to collect|
|`recipient`|`address`|The address to send the tokens to|


### getRefundAmounts

Substitutes surplus tokens to a caller in exchange for any potential token shortages prior to revoking virtual shares from a payor.


```solidity
function getRefundAmounts(
    address payor,
    LeftRightSigned fees,
    int24 atTick,
    CollateralTrackerV2 ct0,
    CollateralTrackerV2 ct1
) external view returns (LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`payor`|`address`|The address of the user being exercised/settled|
|`fees`|`LeftRightSigned`|If applicable, fees to debit from caller (rightSlot = currency0 left = currency1), 0 for `settleLongPremium`|
|`atTick`|`int24`|The tick at which to convert between currency0/currency1 when redistributing the surplus tokens|
|`ct0`|`CollateralTrackerV2`|The collateral tracker for currency0|
|`ct1`|`CollateralTrackerV2`|The collateral tracker for currency1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The LeftRight-packed deltas for currency0/currency1 to move from the caller to the payor|


### exerciseCost

Get the cost of exercising an option. Used during a forced exercise.


```solidity
function exerciseCost(int24 currentTick, int24 oracleTick, TokenId tokenId, PositionBalance positionBalance)
    external
    pure
    returns (LeftRightSigned exerciseFees);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current price tick|
|`oracleTick`|`int24`|The price oracle tick|
|`tokenId`|`TokenId`|The position to be exercised|
|`positionBalance`|`PositionBalance`|The position data of the position to be exercised|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`exerciseFees`|`LeftRightSigned`|The fees for exercising the option position|


### getLiquidationBonus

Compute the pre-haircut liquidation bonuses to be paid to the liquidator and the protocol loss caused by the liquidation (pre-haircut).


```solidity
function getLiquidationBonus(
    LeftRightUnsigned tokenData0,
    LeftRightUnsigned tokenData1,
    uint160 atSqrtPriceX96,
    LeftRightSigned netPaid,
    LeftRightUnsigned shortPremium,
    LeftRightUnsigned creditAmounts
) external pure returns (LeftRightSigned, LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenData0`|`LeftRightUnsigned`|LeftRight encoded word with balance of token0 in the right slot, and required balance in left slot|
|`tokenData1`|`LeftRightUnsigned`|LeftRight encoded word with balance of token1 in the right slot, and required balance in left slot|
|`atSqrtPriceX96`|`uint160`|The oracle price used to swap tokens between the liquidator/liquidatee and determine solvency for the liquidatee|
|`netPaid`|`LeftRightSigned`|The net amount of tokens paid/received by the liquidatee to close their portfolio of positions|
|`shortPremium`|`LeftRightUnsigned`|Total owed premium (prorated by available settled tokens) across all short legs being liquidated|
|`creditAmounts`|`LeftRightUnsigned`|The net credit amounts. Used to make adjustments to the balance amount to avoid double-counting credits|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The LeftRight-packed bonus amounts to be paid to the liquidator for both tokens (may be negative)|
|`<none>`|`LeftRightSigned`|The LeftRight-packed collateral remaining after liquidation costs and bonus; negative slots represent protocol loss before premia haircut|


### haircutPremia

Haircut/clawback any premium paid by `liquidatee` on `positionIdList` over the protocol loss threshold during a liquidation.


```solidity
function haircutPremia(
    TokenId[] memory positionIdList,
    LeftRightSigned[4][] memory premiasByLeg,
    LeftRightSigned collateralRemaining,
    uint160 atSqrtPriceX96
)
    external
    pure
    returns (LeftRightSigned bonusDeltas, LeftRightUnsigned haircutTotal, LeftRightSigned[4][] memory haircutPerLeg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIdList`|`TokenId[]`|The list of position ids being liquidated|
|`premiasByLeg`|`LeftRightSigned[4][]`|The premium paid (or received) by the liquidatee for each leg of each position|
|`collateralRemaining`|`LeftRightSigned`|The remaining collateral after the liquidation (negative if protocol loss)|
|`atSqrtPriceX96`|`uint160`|The oracle price used to swap tokens between the liquidator/liquidatee and determine solvency for the liquidatee|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`bonusDeltas`|`LeftRightSigned`|The delta, if any, to apply to the existing liquidation bonus|
|`haircutTotal`|`LeftRightUnsigned`|Total premium clawed back from the liquidatee|
|`haircutPerLeg`|`LeftRightSigned[4][]`|Per-position/per-leg haircut amounts|


### getOracleTicks

Computes and returns all oracle ticks.


```solidity
function getOracleTicks(int24 currentTick, OraclePack _oraclePack)
    external
    view
    returns (int24 spotTick, int24 medianTick, int24 latestTick, OraclePack oraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick in the Uniswap pool|
|`_oraclePack`|`OraclePack`|The packed `s_oraclePack` storage slot containing the oracle's state|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`spotTick`|`int24`|The fast oracle tick, sourced from the internal 10-minute EMA|
|`medianTick`|`int24`|The slow oracle tick, calculated as the median of the 8 stored price points in the internal oracle|
|`latestTick`|`int24`|The reconstructed absolute tick of the latest observation stored in the internal oracle|
|`oraclePack`|`OraclePack`|The current value of the 8-slot internal observation queue|


### twapEMA

Calculates a slow-moving, weighted average price from the on-chain EMAs.


```solidity
function twapEMA(OraclePack oraclePack) external pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oraclePack`|`OraclePack`|The packed `s_oraclePack` storage slot containing the oracle's state|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The blended time-weighted average price, represented as an int24 tick|


### computeInternalMedian

Takes a packed structure representing a sorted 8-slot queue of ticks and returns the median of those values and an updated queue if another observation is warranted.


```solidity
function computeInternalMedian(OraclePack oraclePack, int24 currentTick)
    external
    view
    returns (int24 medianTick, OraclePack updatedOraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oraclePack`|`OraclePack`|The packed structure representing the sorted 8-slot queue of ticks|
|`currentTick`|`int24`|The current tick as return from slot0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`medianTick`|`int24`|The median of the provided 8-slot queue of ticks in `oraclePack`|
|`updatedOraclePack`|`OraclePack`|The updated 8-slot queue of ticks with the latest observation inserted if the last entry is at least `period` seconds old|


### getRiskParameters

Returns the risk parameters including safe mode status and fee recipients.


```solidity
function getRiskParameters(int24 currentTick, OraclePack oraclePack, uint256 builderCode)
    external
    view
    returns (RiskParameters);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick|
|`oraclePack`|`OraclePack`|The oracle pack|
|`builderCode`|`uint256`|The builder code to determine fee recipient|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`RiskParameters`|RiskParameters The packed risk parameters|


### getFeeRecipient

computes the fee recipient address based on builder code and salt.


```solidity
function getFeeRecipient(uint256 builderCode) external view returns (address);
```

### isSafeMode

Checks for significant oracle deviation to determine if Safe Mode should be active.


```solidity
function isSafeMode(int24 currentTick, OraclePack oraclePack) external pure returns (uint8 safeMode);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick|
|`oraclePack`|`OraclePack`|The oracle pack|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`safeMode`|`uint8`|A number representing whether the protocol is in Safe Mode|


### getSolvencyTicks

Determines which ticks to check for solvency based on market volatility.


```solidity
function getSolvencyTicks(int24 currentTick, OraclePack _oraclePack, uint8 safeMode)
    external
    view
    returns (int24[] memory atTicks, OraclePack oraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick|
|`_oraclePack`|`OraclePack`|The oracle pack|
|`safeMode`|`uint8`|A number representing whether the protocol is in Safe Mode.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`atTicks`|`int24[]`|Array of ticks to check solvency at|
|`oraclePack`|`OraclePack`|The oracle pack (potentially updated)|


### isAccountSolvent

Get the collateral status/margin details of an account/user.


```solidity
function isAccountSolvent(
    PositionBalance[] calldata positionBalanceArray,
    TokenId[] calldata positionIdList,
    int24 atTick,
    address user,
    LeftRightUnsigned shortPremia,
    LeftRightUnsigned longPremia,
    CollateralTrackerV2 ct0,
    CollateralTrackerV2 ct1,
    uint256 buffer
) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionBalanceArray`|`PositionBalance[]`|The list of all open positions held by the `optionOwner`|
|`positionIdList`|`TokenId[]`|The list of all option positions held by `user`|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`user`|`address`|The account to check collateral/margin health for|
|`shortPremia`|`LeftRightUnsigned`|The total amount of premium owed to the short legs of `user`|
|`longPremia`|`LeftRightUnsigned`|The total amount of premium owed by the long legs of `user`|
|`ct0`|`CollateralTrackerV2`|The Address of the CollateralTracker for token0|
|`ct1`|`CollateralTrackerV2`|The Address of the CollateralTracker for token1|
|`buffer`|`uint256`|The buffer to apply to the collateral requirement|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the account is solvent at the given tick|


### getMargin

Compute margin inputs for a user at a given tick.


```solidity
function getMargin(
    PositionBalance[] calldata positionBalanceArray,
    int24 atTick,
    address user,
    TokenId[] calldata positionIdList,
    LeftRightUnsigned shortPremia,
    LeftRightUnsigned longPremia,
    CollateralTrackerV2 ct0,
    CollateralTrackerV2 ct1
)
    external
    view
    returns (LeftRightUnsigned tokenData0, LeftRightUnsigned tokenData1, PositionBalance globalUtilizations);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionBalanceArray`|`PositionBalance[]`|Array of [balanceOrUtilAtMint] for all open positions of `user`|
|`atTick`|`int24`|Tick at which exposures are valued|
|`user`|`address`|Account to evaluate|
|`positionIdList`|`TokenId[]`|The list of all option positions held by `user`|
|`shortPremia`|`LeftRightUnsigned`|Total short premia owed to `user`|
|`longPremia`|`LeftRightUnsigned`|Total long premia owed by `user`|
|`ct0`|`CollateralTrackerV2`|CollateralTracker for token0|
|`ct1`|`CollateralTrackerV2`|CollateralTracker for token1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenData0`|`LeftRightUnsigned`|LeftRightUnsigned for token0 with left = maintenance requirement, right = available balance|
|`tokenData1`|`LeftRightUnsigned`|LeftRightUnsigned for token1 with left = maintenance requirement, right = available balance|
|`globalUtilizations`|`PositionBalance`|The max utilizations encountered in the position set|


### getPerPositionCollateralRequirements

Get the collateral requirement for each individual position in a list.


```solidity
function getPerPositionCollateralRequirements(
    PositionBalance[] calldata positionBalanceArray,
    TokenId[] calldata positionIdList,
    int24 atTick
) external pure returns (LeftRightUnsigned[] memory collateralRequirements);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionBalanceArray`|`PositionBalance[]`|The list of all open positions, stored as `[balance/poolUtilizationAtMint, ...]`|
|`positionIdList`|`TokenId[]`|The list of all option positions|
|`atTick`|`int24`|The tick at which to evaluate positions|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collateralRequirements`|`LeftRightUnsigned[]`|Net collateral required per position `[requirement_0, requirement_1, ...]`|


### interestRate

Calculates the interest rate based on utilization and accumulator state.


```solidity
function interestRate(uint256 utilization, MarketState interestRateAccumulator) external view returns (uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`utilization`|`uint256`|The current pool utilization|
|`interestRateAccumulator`|`MarketState`|The current state of the interest rate accumulator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|The calculated interest rate|


### updateInterestRate

Calculates the interest rate and the new rate at target.


```solidity
function updateInterestRate(uint256 utilization, MarketState interestRateAccumulator)
    external
    view
    returns (uint128, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`utilization`|`uint256`|The current pool utilization|
|`interestRateAccumulator`|`MarketState`|The current state of the interest rate accumulator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|The average rate|
|`<none>`|`uint256`|The new rate at target|


### vegoid

Returns the stored VEGOID parameter


```solidity
function vegoid() external view returns (uint8);
```

### crossBufferRatio

Get the cross buffer ratio for a given utilization.

This is computed using the global utilization of the user.


```solidity
function crossBufferRatio(int256 utilization, uint256 crossBuffer) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`utilization`|`int256`|The pool utilization of this collateral vault at the time the position is minted|
|`crossBuffer`|`uint256`|The cross buffer parameter|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The cross buffer ratio at `utilization`|


## Events
### BorrowRateUpdated
Emitted when a borrow rate is updated.


```solidity
event BorrowRateUpdated(address indexed collateralToken, uint256 avgBorrowRate, uint256 rateAtTarget);
```

### TokensCollected
Emitted when tokens are collected from the contract


```solidity
event TokensCollected(address indexed token, address indexed recipient, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token collected|
|`recipient`|`address`|The address receiving the tokens|
|`amount`|`uint256`|The amount of tokens collected|

### GuardianSafeModeUpdated
Emitted when the guardian updates the enforced safe mode.


```solidity
event GuardianSafeModeUpdated(bool lockMode);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`lockMode`|`bool`|True when safe mode is forcibly locked, false when the lock is lifted.|
