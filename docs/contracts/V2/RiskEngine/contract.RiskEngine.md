# RiskEngine
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/RiskEngine.sol)

**Title:**
Panoptic Risk Engine: The central risk assessment and solvency calculator for the Panoptic Protocol.

**Author:**
Axicon Labs Limited

This contract serves as the central logic hub for calculating collateral requirements, account solvency, and liquidation parameters.

This contract does not hold funds or state regarding user balances. Instead, it provides the mathematical framework to:
1. Calculate collateral requirements for complex option strategies (Spreads, Strangles, Synthetic positions).
2. Manage the internal pricing Oracle, utilizing volatility safeguards, EMAs, and median filters to prevent manipulation.
3. Compute the Adaptive Interest Rate based on pool utilization (PID controller logic).
Key responsibilities:
- Verifying if an account is solvent (`isAccountSolvent`).
- Calculating the cost to force-exercise a position (`exerciseCost`).
- Determining liquidation bonuses (`getLiquidationBonus`).
- Calculating dynamic collateral ratios based on pool utilization.


## State Variables
### DECIMALS
Decimals for computation (1 millitick (1/1000th of a basis point) precision: 1e-7 = 0.00001%).

uint type for composability with unsigned integer based mathematical operations.


```solidity
uint256 internal constant DECIMALS = 10_000_000
```


### MAX_UTILIZATION

```solidity
int16 internal constant MAX_UTILIZATION = 10_000
```


### LN2_SCALED

```solidity
uint256 internal constant LN2_SCALED = 6931472
```


### ONE_BPS

```solidity
uint256 internal constant ONE_BPS = 1000
```


### TEN_BPS

```solidity
uint256 internal constant TEN_BPS = 10000
```


### EMA_PERIODS

```solidity
uint96 constant EMA_PERIODS = uint96(120 + (240 << 24) + (600 << 48) + (1800 << 72))
```


### MAX_TICKS_DELTA
The maximum allowed cumulative delta between the fast & slow oracle tick, the current & slow oracle tick, and the last-observed & slow oracle tick.

Falls back on the more conservative (less solvent) tick during times of extreme volatility, where the price moves ~10% in <4 minutes.


```solidity
int256 internal constant MAX_TICKS_DELTA = 953
```


### MAX_TWAP_DELTA_DISPATCH
The maximum allowed delta between the currentTick and the Uniswap TWAP tick during a dispatch/dispatchFrom call (~5% down, ~5.26% up).

Mitigates manipulation of the currentTick that causes positions to be force exercised at a less favorable price.


```solidity
uint16 internal constant MAX_TWAP_DELTA_DISPATCH = 513
```


### MAX_SPREAD
The maximum allowed ratio for a single chunk, defined as `removedLiquidity / netLiquidity`.

The long premium spread multiplier that corresponds with the MAX_SPREAD value depends on VEGOID,
which can be explored in this calculator: [https://www.desmos.com/calculator/mdeqob2m04](https://www.desmos.com/calculator/mdeqob2m04).


```solidity
uint24 internal constant MAX_SPREAD = 90_000
```


### BP_DECREASE_BUFFER
Multiplier in basis points for the collateral requirement in the event of a buying power decrease, such as minting or force exercising another user.

must fit inside a uint26


```solidity
uint32 internal constant BP_DECREASE_BUFFER = 13_333_333
```


### WAD
Decimals for WAD calculations.


```solidity
int256 internal constant WAD = 1e18
```


### IRM_MAX_ELAPSED_TIME
Constant, in seconds, used to determine the max elapsed time between adaptive interest rate updates.

the time elapsed will be capped at IRM_MAX_ELAPSED_TIME


```solidity
int256 public constant IRM_MAX_ELAPSED_TIME = 4096
```


### BUILDER_SALT

```solidity
bytes32 internal constant BUILDER_SALT = keccak256("panoptic.builder")
```


### MAX_CLAMP_DELTA
The maximum amount of change, in ticks, permitted between internal median updates.


```solidity
int24 internal constant MAX_CLAMP_DELTA = 149
```


### VEGOID
Parameter used to modify the [equation](https://www.desmos.com/calculator/mdeqob2m04) of the utilization-based multiplier for long premium.


```solidity
uint8 internal constant VEGOID = 4
```


### NOTIONAL_FEE
The notional fee, in basis points, collected from PLPs at option mint.

can never exceed 10000, so this value must fit inside a uint14 due to RiskParameters packing


```solidity
uint16 constant NOTIONAL_FEE = 10
```


### PREMIUM_FEE
The premium fee, in basis points, collected from the premium paid/received.

can never exceed 10000, so this value must fit inside a uint14 due to RiskParameters packing


```solidity
uint16 constant PREMIUM_FEE = 0
```


### PROTOCOL_SPLIT
The protocol split, in basis points, when a builder code is present.

can never exceed 10000, so this value must fit inside a uint14 due to RiskParameters packing


```solidity
uint16 constant PROTOCOL_SPLIT = 6_500
```


### BUILDER_SPLIT
The builder split, in basis points, when a builder code is present

can never exceed 10000, so this value must fit inside a uint14 due to RiskParameters packing


```solidity
uint16 constant BUILDER_SPLIT = 2_500
```


### SELLER_COLLATERAL_RATIO
Required collateral ratios for selling options, fraction of 1, scaled by 10_000_000.

i.e 20% -> 0.2 * 10_000_000 = 2_000_000.


```solidity
uint256 constant SELLER_COLLATERAL_RATIO = 2_000_000
```


### BUYER_COLLATERAL_RATIO
Required collateral ratios for buying options, fraction of 1, scaled by 10_000_000.

i.e 10% -> 0.1 * 10_000_000 = 1_000_000.


```solidity
uint256 constant BUYER_COLLATERAL_RATIO = 1_000_000
```


### MAINT_MARGIN_RATE
Required collateral margin for loans in excess of notional, fraction of 1, scaled by 10_000_000.


```solidity
uint256 constant MAINT_MARGIN_RATE = 2_000_000
```


### FORCE_EXERCISE_COST
Basal cost (in bps of notional) to force exercise an out-of-range position.


```solidity
uint256 constant FORCE_EXERCISE_COST = 102_400
```


### TARGET_POOL_UTIL
Target pool utilization below which buying+selling is optimal, fraction of 1, scaled by 10_000_000.

i.e 50% -> 0.5 * 10_000_000 = 5_000_000.


```solidity
uint256 constant TARGET_POOL_UTIL = 5_000_000
```


### SATURATED_POOL_UTIL
Pool utilization above which selling is 100% collateral backed, fraction of 1, scaled by 10_000_000.

i.e 90% -> 0.9 * 10_000_000 = 9_000_000.


```solidity
uint256 constant SATURATED_POOL_UTIL = 9_000_000
```


### CROSS_BUFFER_0

```solidity
uint256 immutable CROSS_BUFFER_0
```


### CROSS_BUFFER_1

```solidity
uint256 immutable CROSS_BUFFER_1
```


### BUILDER_FACTORY

```solidity
address immutable BUILDER_FACTORY
```


### BUILDER_INIT_CODE_HASH

```solidity
bytes32 immutable BUILDER_INIT_CODE_HASH
```


### MAX_OPEN_LEGS

```solidity
uint256 constant MAX_OPEN_LEGS = 33
```


### CURVE_STEEPNESS
Curve steepness (scaled by WAD).

Curve steepness = 4.


```solidity
int256 public constant CURVE_STEEPNESS = 4 ether
```


### MIN_RATE_AT_TARGET
Minimum rate at target per second (scaled by WAD).

Minimum rate at target = 0.1% (minimum rate = 0.025%).


```solidity
int256 public constant MIN_RATE_AT_TARGET = 0.001 ether / int256(365 days)
```


### MAX_RATE_AT_TARGET
Maximum rate at target per second (scaled by WAD).

Maximum rate at target = 200% (maximum rate = 800%).


```solidity
int256 public constant MAX_RATE_AT_TARGET = 2.0 ether / int256(365 days)
```


### TARGET_UTILIZATION
Target utilization (scaled by WAD).

Target utilization = 90%.


```solidity
int256 public constant TARGET_UTILIZATION = 2 ether / int256(3)
```


### INITIAL_RATE_AT_TARGET
Initial rate at target per second (scaled by WAD).

Initial rate at target = 4% (rate between 1% and 16%).


```solidity
int256 public constant INITIAL_RATE_AT_TARGET = 0.04 ether / int256(365 days)
```


### ADJUSTMENT_SPEED
Adjustment speed per second (scaled by WAD).

The speed is per second, so the rate moves at a speed of ADJUSTMENT_SPEED * err each second (while being
continuously compounded).

Adjustment speed = 50/year.


```solidity
int256 public constant ADJUSTMENT_SPEED = 50 ether / int256(365 days)
```


### GUARDIAN
Address allowed to override the automatically computed safe mode.

Guardian can only increase the effective safe mode, never relax it.


```solidity
address internal immutable GUARDIAN
```


## Functions
### constructor

Set immutable parameters for the Collateral Tracker.


```solidity
constructor(uint256 _crossBuffer0, uint256 _crossBuffer1, address _guardian, address _builderFactory) ;
```

### onlyGuardian

Restricts a function to be callable only by the guardian address.


```solidity
modifier onlyGuardian() ;
```

### _onlyGuardian

Reverts unless the caller is the guardian.


```solidity
function _onlyGuardian() internal view;
```

### lockPool

Forces a PanopticPool into locked safe mode.

Sets the pool’s internal oracle pack into permanent safe-mode override
until explicitly unlocked by the guardian.


```solidity
function lockPool(PanopticPool pool) external onlyGuardian;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPool`|The PanopticPool to lock.|


### unlockPool

Removes the forced safe-mode lock on a PanopticPool.

Restores the pool to using only the automatically computed safe-mode level.


```solidity
function unlockPool(PanopticPool pool) external onlyGuardian;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPool`|The PanopticPool to unlock.|


### guardian

Returns the address of the guardian


```solidity
function guardian() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The guardian address that can override safe mode|


### _computeBuilderWallet


```solidity
function _computeBuilderWallet(uint256 builderCode) internal view returns (address wallet);
```

### collect

Collects a specific amount of tokens from this contract


```solidity
function collect(address token, address recipient, uint256 amount) public onlyGuardian;
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
function collect(address token, address recipient) external onlyGuardian;
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
    CollateralTracker ct0,
    CollateralTracker ct1
) external view returns (LeftRightSigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`payor`|`address`|The address of the user being exercised/settled|
|`fees`|`LeftRightSigned`|If applicable, fees to debit from caller (rightSlot = currency0 left = currency1), 0 for `settleLongPremium`|
|`atTick`|`int24`|The tick at which to convert between currency0/currency1 when redistributing the surplus tokens|
|`ct0`|`CollateralTracker`|The collateral tracker for currency0|
|`ct1`|`CollateralTracker`|The collateral tracker for currency1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The LeftRight-packed deltas for currency0/currency1 to move from the caller to the payor|


### exerciseCost

Get the cost of exercising an option. Used during a forced exercise.

This one computes the cost of calling the forceExercise function on a position:
- The forceExercisor will have to *pay* the exercisee because their position will be closed "against their will"
- The cost must be larger when the position is in-range, and should be minimal when it is out of range


```solidity
function exerciseCost(int24 currentTick, int24 oracleTick, TokenId tokenId, PositionBalance positionBalance)
    external
    view
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
    LeftRightUnsigned shortPremium
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

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightSigned`|The LeftRight-packed bonus amounts to be paid to the liquidator for both tokens (may be negative)|
|`<none>`|`LeftRightSigned`|The LeftRight-packed protocol loss (pre-haircut) for both tokens, i.e., the delta between the user's starting balance and expended tokens|


### haircutPremia

Haircut/clawback any premium paid by `liquidatee` on `positionIdList` over the protocol loss threshold during a liquidation.


```solidity
function haircutPremia(
    address liquidatee,
    TokenId[] memory positionIdList,
    LeftRightSigned[4][] memory premiasByLeg,
    LeftRightSigned collateralRemaining,
    uint160 atSqrtPriceX96
)
    external
    returns (LeftRightSigned bonusDeltas, LeftRightUnsigned haircutTotal, LeftRightSigned[4][] memory haircutPerLeg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidatee`|`address`|The address of the user being liquidated|
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
|`_oraclePack`|`OraclePack`|The packed `s_oraclePack` storage slot containing the oracle's state,|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`spotTick`|`int24`|The spot oracle tick, sourced from the shortest EMA.|
|`medianTick`|`int24`|The median tick, calculated as the median of the 8 stored price points in the internal oracle.|
|`latestTick`|`int24`|The reconstructed absolute tick of the latest observation stored in the internal oracle.|
|`oraclePack`|`OraclePack`|The current value of the 8-slot internal observation queue (`s_oraclePack`)|


### twapEMA

Calculates a slow-moving, weighted average price from the on-chain EMAs.

Extracts the fast, slow, and eons EMA tick values from the packed `oraclePack`
structure. It then computes and returns a blended average with a 60/30/10 weighting
respectively. This heavily smoothed value is designed to be highly resistant to
manipulation and serves as a robust price feed for critical system functions like solvency checks.


```solidity
function twapEMA(OraclePack oraclePack) external pure returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oraclePack`|`OraclePack`|The packed `s_oraclePack` storage slot containing the oracle's state, including the on-chain EMAs.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The blended time-weighted average price, represented as an int24 tick.|


### computeInternalMedian

Takes a packed structure representing a sorted 8-slot queue of ticks and returns the median of those values and an updated queue if another observation is warranted.

Also inserts the latest Uniswap observation into the buffer, resorts, and returns if the last entry is at least `period` seconds old.


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
|`updatedOraclePack`|`OraclePack`|The updated 8-slot queue of ticks with the latest observation inserted if the last entry is at least `period` seconds old (returns 0 otherwise)|


### getRiskParameters

Computes and returns the risk parameters for the pool


```solidity
function getRiskParameters(int24 currentTick, OraclePack oraclePack, uint256 builderCode)
    external
    view
    returns (RiskParameters);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick of the pool|
|`oraclePack`|`OraclePack`|The oracle pack containing historical price data|
|`builderCode`|`uint256`|The builder code for determining fee recipient|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`RiskParameters`|The computed risk parameters including safe mode status and fee configuration|


### getFeeRecipient

Computes the fee recipient address from a builder code


```solidity
function getFeeRecipient(uint256 builderCode) external view returns (address feeRecipient);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`builderCode`|`uint256`|The builder code to compute the fee recipient from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeRecipient`|`address`|The computed fee recipient address|


### isSafeMode

Checks for significant oracle deviation to determine if Safe Mode should be active.

Safe Mode is triggered if ANY of three conditions are met:
1. "External Shock": The live spot price deviates too far from the responsive spot EMA
2. "Internal Disagreement": The fast EMA deviates too far from the more stable slow EMA, indicating high volatility
3. "High Divergence": The EMAs show significant divergence from each other


```solidity
function isSafeMode(int24 currentTick, OraclePack oraclePack) public pure returns (uint8 safeMode);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick of the pool|
|`oraclePack`|`OraclePack`|The oracle pack containing historical price data|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`safeMode`|`uint8`|A number representing whether the protocol is in Safe Mode.|


### getSolvencyTicks

Determines which ticks to check for solvency based on market volatility


```solidity
function getSolvencyTicks(int24 currentTick, OraclePack _oraclePack, uint8 safeMode)
    external
    view
    returns (int24[] memory, OraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick of the pool|
|`_oraclePack`|`OraclePack`|The oracle pack containing historical price data|
|`safeMode`|`uint8`|A number representing whether the protocol is in Safe Mode.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24[]`|atTicks Array of ticks at which to check solvency|
|`<none>`|`OraclePack`|oraclePack The oracle pack (potentially updated)|


### isAccountSolvent

Get the collateral status/margin details of an account/user.

NOTE: It's up to the caller to confirm from the returned result that the account has enough collateral.

This can be used to check the health: how many tokens a user has compared to the margin threshold.


```solidity
function isAccountSolvent(
    PositionBalance[] calldata positionBalanceArray,
    TokenId[] calldata positionIdList,
    int24 atTick,
    address user,
    LeftRightUnsigned shortPremia,
    LeftRightUnsigned longPremia,
    CollateralTracker ct0,
    CollateralTracker ct1,
    uint256 buffer
) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionBalanceArray`|`PositionBalance[]`|The list of all open positions held by the `optionOwner`, stored as `[balance/poolUtilizationAtMint, ...]`|
|`positionIdList`|`TokenId[]`|The list of all option positions held by `user`|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`user`|`address`|The account to check collateral/margin health for|
|`shortPremia`|`LeftRightUnsigned`|The total amount of premium (prorated by available settled tokens) owed to the short legs of `user`|
|`longPremia`|`LeftRightUnsigned`|The total amount of premium owed by the long legs of `user`|
|`ct0`|`CollateralTracker`|The Address of the CollateralTracker for token0|
|`ct1`|`CollateralTracker`|The Address of the CollateralTracker for token1|
|`buffer`|`uint256`|The buffer to apply to the collateral requirement|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the account is solvent at the given tick|


### getMargin

Compute margin inputs for a user at a given tick.

Purely informational: does not make a solvency decision.
Returns per-asset maintenance requirement (left slot) and available balance including settled premia (right slot).
Units:
- Requirements are in raw token units
- Balances are in raw token units
- Ratios elsewhere in the engine use DECIMALS = 10_000_000


```solidity
function getMargin(
    PositionBalance[] calldata positionBalanceArray,
    int24 atTick,
    address user,
    TokenId[] calldata positionIdList,
    LeftRightUnsigned shortPremia,
    LeftRightUnsigned longPremia,
    CollateralTracker ct0,
    CollateralTracker ct1
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
|`shortPremia`|`LeftRightUnsigned`|Total short premia owed to `user` (right slot = token0 credit, left slot = token1 credit)|
|`longPremia`|`LeftRightUnsigned`|Total long premia owed by `user`   (right slot = token0 debit,  left slot = token1 debit)|
|`ct0`|`CollateralTracker`|CollateralTracker for token0|
|`ct1`|`CollateralTracker`|CollateralTracker for token1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenData0`|`LeftRightUnsigned`|LeftRightUnsigned for token0 with left = maintenance requirement, right = available balance|
|`tokenData1`|`LeftRightUnsigned`|LeftRightUnsigned for token1 with left = maintenance requirement, right = available balance|
|`globalUtilizations`|`PositionBalance`||


### _getMargin

Internal workhorse for margin computation.

Aggregates balances, accrued interest, and per-position requirements to produce
LeftRightUnsigned pairs for token0 and token1 where:
- left slot = total maintenance requirement in that token
- right slot = total available balance in that token including settled short premia
Caller is responsible for any cross-asset conversion, haircuts, and final solvency logic.


```solidity
function _getMargin(
    PositionBalance[] calldata positionBalanceArray,
    TokenId[] calldata positionIdList,
    int24 atTick,
    address user,
    LeftRightUnsigned shortPremia,
    LeftRightUnsigned longPremia,
    CollateralTracker ct0,
    CollateralTracker ct1
)
    internal
    view
    returns (LeftRightUnsigned tokenData0, LeftRightUnsigned tokenData1, PositionBalance globalUtilizations);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionBalanceArray`|`PositionBalance[]`|Array of [balanceOrUtilAtMint] for all open positions of `user`|
|`positionIdList`|`TokenId[]`|The list of all option positions held by `user`|
|`atTick`|`int24`|Tick at which exposures are valued|
|`user`|`address`|Account to evaluate|
|`shortPremia`|`LeftRightUnsigned`|Total short premia owed to `user` (right slot = token0 credit, left slot = token1 credit)|
|`longPremia`|`LeftRightUnsigned`|Total long premia owed by `user`   (right slot = token0 debit,  left slot = token1 debit)|
|`ct0`|`CollateralTracker`|CollateralTracker for token0|
|`ct1`|`CollateralTracker`|CollateralTracker for token1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenData0`|`LeftRightUnsigned`|LeftRightUnsigned for token0 with left = maintenance requirement, right = available balance|
|`tokenData1`|`LeftRightUnsigned`|LeftRightUnsigned for token1 with left = maintenance requirement, right = available balance|
|`globalUtilizations`|`PositionBalance`||


### _getGlobalUtilization

Gets the highest pool utilization (for token0 and token1) from an array of positions.

Iterates through all of a user's positions to find the maximum `utilization0` and maximum `utilization1`
recorded at the time of minting. These "global" max utilizations are then used for
portfolio-level margin calculations, ensuring a more conservative risk assessment.


```solidity
function _getGlobalUtilization(PositionBalance[] calldata positionBalanceArray)
    internal
    pure
    returns (PositionBalance globalUtilizations);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionBalanceArray`|`PositionBalance[]`|The array of a user's `PositionBalance` structs.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`globalUtilizations`|`PositionBalance`|A packed PositionBalance that contains only the utilization data, recoverable as .utilization0() and .utilization1()|


### _getTotalRequiredCollateral

Get the total required amount of collateral tokens of a user/account across all active positions to stay above the margin requirement.

Returns the token amounts required for the entire account with active positions in `positionIdList` (list of tokenIds).


```solidity
function _getTotalRequiredCollateral(
    PositionBalance[] calldata positionBalanceArray,
    TokenId[] calldata positionIdList,
    int24 atTick,
    LeftRightUnsigned longPremia
)
    internal
    view
    returns (LeftRightUnsigned tokensRequired, LeftRightUnsigned creditAmounts, PositionBalance globalUtilizations);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionBalanceArray`|`PositionBalance[]`|The list of all open positions held by the `optionOwner`, stored as `[balance/poolUtilizationAtMint, ...]`|
|`positionIdList`|`TokenId[]`|The list of all option positions held by `owner`|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`longPremia`|`LeftRightUnsigned`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokensRequired`|`LeftRightUnsigned`|The amount of token0 (right) and token1 (left) required to stay above the margin threshold for all active positions of user|
|`creditAmounts`|`LeftRightUnsigned`|The amount of credit token0 (right) and token1 (left) in the user's portfolio|
|`globalUtilizations`|`PositionBalance`||


### _getRequiredCollateralAtTickSinglePosition

Get the required amount of collateral tokens corresponding to a specific single position `tokenId` at a price `atTick`.


```solidity
function _getRequiredCollateralAtTickSinglePosition(
    TokenId tokenId,
    uint128 positionSize,
    int24 atTick,
    int16 poolUtilization,
    bool underlyingIsToken0
) internal view returns (uint256 tokenRequired, uint256 credits);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`positionSize`|`uint128`|The size of the option position|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`poolUtilization`|`int16`|The utilization of the collateral vault (balance of buying and selling)|
|`underlyingIsToken0`|`bool`|Cached `s_underlyingIsToken0` value for this CollateralTracker instance|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenRequired`|`uint256`|Total required tokens for all legs of the specified tokenId.|
|`credits`|`uint256`||


### _getRequiredCollateralSingleLeg

Calculate the required amount of collateral for a single leg `index` of position `tokenId`.


```solidity
function _getRequiredCollateralSingleLeg(
    TokenId tokenId,
    uint256 index,
    uint128 positionSize,
    int24 atTick,
    int16 poolUtilization
) internal view returns (uint256 required);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`index`|`uint256`|The leg index (associated with a liquidity chunk) to compute the required collateral for|
|`positionSize`|`uint128`|The size of the position|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`poolUtilization`|`int16`|The pool utilization: how much funds are in the Panoptic pool versus the AMM pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`required`|`uint256`|The required amount collateral needed for this leg `index`|


### _getRequiredCollateralSingleLegNoPartner

Calculate the required amount of collateral for leg `index` of position `tokenId` when the leg does not have a risk partner.


```solidity
function _getRequiredCollateralSingleLegNoPartner(
    TokenId tokenId,
    uint256 index,
    uint128 positionSize,
    int24 atTick,
    int16 poolUtilization
) internal view returns (uint256 required);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`index`|`uint256`|The leg index (associated with a liquidity chunk) to consider a partner for|
|`positionSize`|`uint128`|The size of the position|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`poolUtilization`|`int16`|The pool utilization: ratio of how much funds are in the Panoptic pool versus the AMM pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`required`|`uint256`|The required amount collateral needed for this leg `index`|


### _getRequiredCollateralSingleLegPartner

Calculate the required amount of collateral for leg `index` for position `tokenId` accounting for its partner leg.

If the two `isLong` fields are different (i.e., a short leg and a long leg are partnered) but the tokenTypes are the same, this is a spread.

A spread is a defined risk position which has a max loss given by difference between the long and short strikes.

If the two `isLong` fields are the same but the tokenTypes are different (one is a call, the other a put, e.g.), this is a strangle -
a strangle benefits from enhanced capital efficiency because only one side can be ITM at any given time.


```solidity
function _getRequiredCollateralSingleLegPartner(
    TokenId tokenId,
    uint256 index,
    uint128 positionSize,
    int24 atTick,
    int16 poolUtilization
) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`index`|`uint256`|The leg index (associated with a liquidity chunk) to consider a partner for|
|`positionSize`|`uint128`|The size of the position|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`poolUtilization`|`int16`|The pool utilization: how much funds are in the Panoptic pool versus the AMM pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|required The required amount of collateral needed for this leg `index`|


### _getRequiredCollateralAtUtilization

Get the base collateral requirement for a position of notional value `amount` at the current Panoptic pool `utilization` level.


```solidity
function _getRequiredCollateralAtUtilization(uint128 amount, uint256 isLong, int16 utilization)
    internal
    view
    returns (uint256 required, uint256 baseCollateralRatio);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint128`|The amount to multiply by the base collateral ratio|
|`isLong`|`uint256`|Whether the position is long (=1) or short (=0)|
|`utilization`|`int16`|The utilization of the Panoptic pool (balance between sellers and buyers)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`required`|`uint256`|The base collateral requirement corresponding to the incoming `amount`|
|`baseCollateralRatio`|`uint256`||


### _computeSpread

Calculates the total collateral requirement for a defined-risk spread position.

A spread's collateral is the minimum of its defined max loss or the sum of its legs' individual (unpartnered) requirements.

This provides capital efficiency, as deep OTM spreads may require less collateral than their max loss due to OTM decay on the long leg.


```solidity
function _computeSpread(
    TokenId tokenId,
    uint128 positionSize,
    uint256 index,
    uint256 partnerIndex,
    int24 atTick,
    int16 poolUtilization
) internal view returns (uint256 spreadRequirement);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`positionSize`|`uint128`|The size of the position|
|`index`|`uint256`|The leg index of the LONG leg in the spread position|
|`partnerIndex`|`uint256`|The index of the partnered SHORT leg in the spread position|
|`atTick`|`int24`|the tick the requirement is evaluated at|
|`poolUtilization`|`int16`|The pool utilization: how much funds are in the Panoptic pool versus the AMM pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`spreadRequirement`|`uint256`|The required amount of collateral needed for the spread|


### _computeStrangle

Calculate the required amount of collateral for a strangle leg.

The base collateral requirement is halved for short strangles.

A strangle can only have only one of its legs ITM at any given time, so this reduces the total risk and collateral requirement.


```solidity
function _computeStrangle(TokenId tokenId, uint256 index, uint128 positionSize, int24 atTick, int16 poolUtilization)
    internal
    view
    returns (uint256 strangleRequired);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`index`|`uint256`|The leg index (associated with a liquidity chunk) to consider a partner for|
|`positionSize`|`uint128`|The size of the position|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`poolUtilization`|`int16`|The pool utilization: how much funds are in the Panoptic pool versus the AMM pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`strangleRequired`|`uint256`|The required amount of collateral needed for the strangle leg|


### _computeLoanOptionComposite


```solidity
function _computeLoanOptionComposite(
    TokenId tokenId,
    uint128 positionSize,
    uint256 index,
    uint256 partnerIndex,
    int24 atTick,
    int16 poolUtilization
) internal view returns (uint256);
```

### _computeCreditOptionComposite


```solidity
function _computeCreditOptionComposite(TokenId tokenId, uint128 positionSize, uint256 index, int24 atTick)
    internal
    view
    returns (uint256);
```

### _computeDelayedSwap


```solidity
function _computeDelayedSwap(
    TokenId tokenId,
    uint128 positionSize,
    uint256 index,
    uint256 partnerIndex,
    int24 atTick
) internal view returns (uint256);
```

### _sellCollateralRatio

Get the base collateral requirement for a short leg at a given pool utilization.

This is computed at the time the position is minted.


```solidity
function _sellCollateralRatio(int256 utilization) internal view returns (uint256 sellCollateralRatio);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`utilization`|`int256`|The pool utilization of this collateral vault at the time the position is minted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sellCollateralRatio`|`uint256`|The sell collateral ratio at `utilization`|


### _buyCollateralRatio

Get the base collateral requirement for a long leg at a given pool utilization.

This is computed at the time the position is minted.


```solidity
function _buyCollateralRatio() internal view returns (uint256 buyCollateralRatio);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`buyCollateralRatio`|`uint256`|The buy collateral ratio at `utilization`|


### _crossBufferRatio

Get the cross buffer ration for a given utilization

This is computed using the global utilization of the user.


```solidity
function _crossBufferRatio(int256 utilization, uint256 crossBuffer)
    internal
    view
    returns (uint256 crossBufferRatio);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`utilization`|`int256`|The pool utilization of this collateral vault at the time the position is minted|
|`crossBuffer`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`crossBufferRatio`|`uint256`|The cross buffer ratio at `utilization`|


### interestRate

Calculates the current interest rate based on utilization


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
|`<none>`|`uint128`|The calculated interest rate per second|


### updateInterestRate

Calculates both the average interest rate and the new rate at target


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
|`<none>`|`uint128`|The average interest rate|
|`<none>`|`uint256`|The new rate at target|


### _borrowRate

Returns avgRate and endRateAtTarget.

Assumes that the inputs `marketParams` and `id` match.


```solidity
function _borrowRate(uint256 utilization, MarketState interestRateAccumulator)
    internal
    view
    returns (uint256, int256);
```

### _curve

Returns the rate for a given `_rateAtTarget` and an `err`.
The formula of the curve is the following:
r = ((1-1/C)*err + 1) * rateAtTarget if err < 0
((C-1)*err + 1) * rateAtTarget else.


```solidity
function _curve(int256 _rateAtTarget, int256 err) private pure returns (int256);
```

### _newRateAtTarget

Returns the new rate at target, for a given `startRateAtTarget` and a given `linearAdaptation`.
The formula is: max(min(startRateAtTarget * exp(linearAdaptation), maxRateAtTarget), minRateAtTarget).


```solidity
function _newRateAtTarget(int256 startRateAtTarget, int256 linearAdaptation) private pure returns (int256);
```

### vegoid

Returns the stored VEGOID parameter


```solidity
function vegoid() external view returns (uint8);
```

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

