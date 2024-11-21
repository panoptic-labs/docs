---
sidebar_position: 2
---
# PanopticPool
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.1.x/contracts/PanopticPool.sol)

**Inherits:**
Clone, ERC1155Holder, [Multicall](/docs/contracts/V1.1/base/abstract.Multicall)

**Author:**
Axicon Labs Limited

Manages positions, collateral, liquidations and forced exercises.


## State Variables
### MIN_SWAP_TICK
Lower price bound used when no slippage check is required.


```solidity
int24 internal constant MIN_SWAP_TICK = Constants.MIN_V4POOL_TICK - 1;
```


### MAX_SWAP_TICK
Upper price bound used when no slippage check is required.


```solidity
int24 internal constant MAX_SWAP_TICK = Constants.MAX_V4POOL_TICK + 1;
```


### COMPUTE_ALL_PREMIA
Flag that signals to compute premia for both the short and long legs of a position.


```solidity
bool internal constant COMPUTE_ALL_PREMIA = true;
```


### COMPUTE_LONG_PREMIA
Flag that signals to compute premia only for the long legs of a position.


```solidity
bool internal constant COMPUTE_LONG_PREMIA = false;
```


### ONLY_AVAILABLE_PREMIUM
Flag that indicates only to include the share of (settled) premium that is available to collect when calling `_calculateAccumulatedPremia`.


```solidity
bool internal constant ONLY_AVAILABLE_PREMIUM = false;
```


### COMMIT_LONG_SETTLED
Flag that signals to commit both collected Uniswap fees and settled long premium to `s_settledTokens`.


```solidity
bool internal constant COMMIT_LONG_SETTLED = true;
```


### DONOT_COMMIT_LONG_SETTLED
Flag that signals to only commit collected Uniswap fees to `s_settledTokens`.


```solidity
bool internal constant DONOT_COMMIT_LONG_SETTLED = false;
```


### ASSERT_SOLVENCY
Flag for `_checkSolvency` to indicate that an account should be solvent at all input ticks.


```solidity
bool internal constant ASSERT_SOLVENCY = true;
```


### ASSERT_INSOLVENCY
Flag for `_checkSolvency` to indicate that an account should be insolvent at all input ticks.


```solidity
bool internal constant ASSERT_INSOLVENCY = false;
```


### ADD
Flag that signals to add a new position to the user's positions hash (as opposed to removing an existing position).


```solidity
bool internal constant ADD = true;
```


### TWAP_WINDOW
The minimum window (in seconds) used to calculate the TWAP price for solvency checks during liquidations.


```solidity
uint32 internal constant TWAP_WINDOW = 600;
```


### MAX_TWAP_DELTA_LIQUIDATION
The maximum allowed delta between the currentTick and the Uniswap TWAP tick during a liquidation (~5% down, ~5.26% up).

*Mitigates manipulation of the currentTick that causes positions to be liquidated at a less favorable price.*


```solidity
int256 internal constant MAX_TWAP_DELTA_LIQUIDATION = 513;
```


### MAX_TICKS_DELTA
The maximum allowed cumulative delta between the fast & slow oracle tick, the current & slow oracle tick, and the last-observed & slow oracle tick.

*Falls back on the more conservative (less solvent) tick during times of extreme volatility, where the price moves ~10% in <4 minutes.*


```solidity
int256 internal constant MAX_TICKS_DELTA = 953;
```


### MAX_SPREAD
The maximum allowed ratio for a single chunk, defined as `removedLiquidity / netLiquidity`.

*The long premium spread multiplier that corresponds with the MAX_SPREAD value depends on VEGOID,
which can be explored in this calculator: [https://www.desmos.com/calculator/mdeqob2m04](https://www.desmos.com/calculator/mdeqob2m04).*


```solidity
uint64 internal constant MAX_SPREAD = 9 * (2 ** 32);
```


### MAX_POSITIONS
The maximum allowed number of opened positions for a user.


```solidity
uint64 internal constant MAX_POSITIONS = 32;
```


### BP_DECREASE_BUFFER
Multiplier in basis points for the collateral requirement in the event of a buying power decrease, such as minting or force exercising another user.


```solidity
uint256 internal constant BP_DECREASE_BUFFER = 13_333;
```


### NO_BUFFER
Multiplier for the collateral requirement in the general case.


```solidity
uint256 internal constant NO_BUFFER = 10_000;
```


### SFPM
The "engine" of Panoptic - manages AMM liquidity and executes all mints/burns/exercises.


```solidity
SemiFungiblePositionManager internal immutable SFPM;
```


### POOL_MANAGER_V4
The canonical Uniswap V4 Pool Manager address.


```solidity
IPoolManager internal immutable POOL_MANAGER_V4;
```


### s_miniMedian
Stores a sorted set of 8 price observations used to compute the internal median oracle price.


```solidity
uint256 internal s_miniMedian;
```


### s_options
Nested mapping that tracks the option formation: address => tokenId => leg => premiaGrowth.

*Premia growth is taking a snapshot of the chunk premium in SFPM, which is measuring the amount of fees
collected for every chunk per unit of liquidity (net or short, depending on the isLong value of the specific leg index).*


```solidity
mapping(address account => mapping(TokenId tokenId => mapping(uint256 leg => LeftRightUnsigned premiaGrowth))) internal
    s_options;
```


### s_grossPremiumLast
Per-chunk `last` value that gives the aggregate amount of premium owed to all sellers when multiplied by the total amount of liquidity `totalLiquidity`.

*`totalGrossPremium = totalLiquidity * (grossPremium(perLiquidityX64) - lastGrossPremium(perLiquidityX64)) / 2**64`*

*Used to compute the denominator for the fraction of premium available to sellers to collect.*

*LeftRight - right slot is currency0, left slot is currency1.*


```solidity
mapping(bytes32 chunkKey => LeftRightUnsigned lastGrossPremium) internal s_grossPremiumLast;
```


### s_settledTokens
Per-chunk accumulator for tokens owed to sellers that have been settled and are now available.

*This number increases when buyers pay long premium and when tokens are collected from Uniswap.*

*It decreases when sellers close positions and collect the premium they are owed.*

*LeftRight - right slot is currency0, left slot is currency1.*


```solidity
mapping(bytes32 chunkKey => LeftRightUnsigned settledTokens) internal s_settledTokens;
```


### s_positionBalance
Tracks the position size of a tokenId for a given user, and the pool utilizations and oracle tick values at the time of last mint.


```solidity
mapping(address account => mapping(TokenId tokenId => PositionBalance positionBalance)) internal s_positionBalance;
```


### s_positionsHash
Tracks the position list hash (i.e `keccak256(XORs of abi.encodePacked(positionIdList))`).

*The order and content of this list (the preimage for the hash) is emitted in an event every time it is changed.*

*A component of this hash also tracks the total number of positions (i.e. makes sure the length of the provided positionIdList matches).*

*The purpose of this system is to reduce storage usage when a user has more than one active position.*

*Instead of having to manage an unwieldy storage array and do lots of loads, we just store a hash of the array.*

*This hash can be cheaply verified on every operation with a user provided positionIdList - which can then be used for operations
without having to every load any other data from storage.*


```solidity
mapping(address account => uint256 positionsHash) internal s_positionsHash;
```


## Functions
### collateralToken0

Get the collateral token corresponding to currency0 of the Uniswap pool.


```solidity
function collateralToken0() public pure returns (CollateralTracker);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`CollateralTracker`|Collateral token corresponding to currency0 in Uniswap|


### collateralToken1

Get the collateral token corresponding to currency1 of the Uniswap pool.


```solidity
function collateralToken1() public pure returns (CollateralTracker);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`CollateralTracker`|Collateral token corresponding to currency1 in Uniswap|


### oracleContract

Get the address of the external oracle contract used by this Panoptic Pool.


```solidity
function oracleContract() public pure returns (IV3CompatibleOracle);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IV3CompatibleOracle`|The external oracle contract used by this Panoptic Pool|


### _V4PoolId

Get the Uniswap Pool ID for the V4 pool used by this Panoptic Pool (hash of `poolKey`).


```solidity
function _V4PoolId() internal pure returns (PoolId);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PoolId`|The Uniswap V4 Pool ID for this Panoptic Pool|


### poolKey

Get the pool key for the Uniswap V4 pool used by this Panoptic Pool.


```solidity
function poolKey() public pure returns (PoolKey calldata key);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The Uniswap V4 Pool Key for this Panoptic Pool|


### constructor

Store the address of the canonical SemiFungiblePositionManager (SFPM) and Uniswap V4 pool manager contracts.


```solidity
constructor(SemiFungiblePositionManager _sfpm, IPoolManager _poolManager);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sfpm`|`SemiFungiblePositionManager`|The address of the SFPM|
|`_poolManager`|`IPoolManager`|The address of the canonical Uniswap V4 pool manager|


### initialize

Initializes the median oracle of a new `PanopticPool` instance with median oracle state and performs initial token approvals.

*Must be called first (by the factory contract) before any transaction can occur.*


```solidity
function initialize() external;
```

### assertMinCollateralValues

Reverts if the caller has a lower collateral balance than required to meet the provided `minValue0` and `minValue1`.

*Can be used for composable slippage checks with `multicall` (such as for a force exercise or liquidation).*


```solidity
function assertMinCollateralValues(uint256 minValue0, uint256 minValue1) external view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`minValue0`|`uint256`|The minimum acceptable `currency0` value of collateral|
|`minValue1`|`uint256`|The minimum acceptable `currency1` value of collateral|


### validateCollateralWithdrawable

Determines if account is eligible to withdraw or transfer collateral.

*Checks whether account is solvent with `BP_DECREASE_BUFFER` according to `_validateSolvency`.*

*Prevents insolvent and near-insolvent accounts from withdrawing collateral before they are liquidated.*

*Reverts if account is not solvent with `BP_DECREASE_BUFFER`.*


```solidity
function validateCollateralWithdrawable(address user, TokenId[] calldata positionIdList) external view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The account to check for collateral withdrawal eligibility|
|`positionIdList`|`TokenId[]`|The list of all option positions held by `user`|


### getAccumulatedFeesAndPositionsData

Returns the total amount of premium accumulated for a list of positions and a list containing the corresponding `PositionBalance` information for each position.


```solidity
function getAccumulatedFeesAndPositionsData(address user, bool includePendingPremium, TokenId[] calldata positionIdList)
    external
    view
    returns (LeftRightUnsigned, LeftRightUnsigned, uint256[2][] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|Address of the user that owns the positions|
|`includePendingPremium`|`bool`|If true, include premium that is owed to the user but has not yet settled; if false, only include premium that is available to collect|
|`positionIdList`|`TokenId[]`|List of positions. Written as `[tokenId1, tokenId2, ...]`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned`|The total amount of premium owed (which may `includePendingPremium`) to the short legs in `positionIdList` (currency0: right slot, currency1: left slot)|
|`<none>`|`LeftRightUnsigned`|The total amount of premium owed by the long legs in `positionIdList` (currency0: right slot, currency1: left slot)|
|`<none>`|`uint256[2][]`|A list of `PositionBalance` data (balance and pool utilization/oracle ticks at last mint) for each position, of the form `[[tokenId0, PositionBalance_0], [tokenId1, PositionBalance_1], ...]`|


### _calculateAccumulatedPremia

Calculate the accumulated premia owed from the option buyer to the option seller.


```solidity
function _calculateAccumulatedPremia(
    address user,
    TokenId[] calldata positionIdList,
    bool computeAllPremia,
    bool includePendingPremium,
    int24 atTick
) internal view returns (LeftRightUnsigned shortPremium, LeftRightUnsigned longPremium, uint256[2][] memory balances);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The holder of options|
|`positionIdList`|`TokenId[]`|The list of all option positions held by user|
|`computeAllPremia`|`bool`|Whether to compute accumulated premia for all legs held by the user (true), or just owed premia for long legs (false)|
|`includePendingPremium`|`bool`|If true, include premium that is owed to the user but has not yet settled; if false, only include premium that is available to collect|
|`atTick`|`int24`|The current tick of the Uniswap pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shortPremium`|`LeftRightUnsigned`|The total amount of premium owed (which may `includePendingPremium`) to the short legs in `positionIdList` (currency0: right slot, currency1: left slot)|
|`longPremium`|`LeftRightUnsigned`|The total amount of premium owed by the long legs in `positionIdList` (currency0: right slot, currency1: left slot)|
|`balances`|`uint256[2][]`|A list of balances and pool utilization for each position, of the form `[[tokenId0, balances0], [tokenId1, balances1], ...]`|


### pokeMedian

Updates the internal median with the last oracle observation if the `MEDIAN_PERIOD` has elapsed.


```solidity
function pokeMedian() external;
```

### mintOptions

Validates the current options of the user, and mints a new position.


```solidity
function mintOptions(
    TokenId[] calldata positionIdList,
    uint128 positionSize,
    uint64 effectiveLiquidityLimitX32,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIdList`|`TokenId[]`|The list of currently held positions by the user, where the newly minted position(token) will be the last element in `positionIdList`|
|`positionSize`|`uint128`|The size of the position to be minted, expressed in terms of the asset|
|`effectiveLiquidityLimitX32`|`uint64`|Maximum amount of "spread" defined as `removedLiquidity/netLiquidity` for a new position and denominated as X32 = (`ratioLimit * 2^32`)|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|


### burnOptions

Closes and burns the caller's entire balance of `tokenId`.


```solidity
function burnOptions(TokenId tokenId, TokenId[] calldata newPositionIdList, int24 tickLimitLow, int24 tickLimitHigh)
    external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The tokenId of the option position to be burnt|
|`newPositionIdList`|`TokenId[]`|The new positionIdList without the token being burnt|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|


### burnOptions

Closes and burns the caller's entire balance of each `tokenId` in `positionIdList.


```solidity
function burnOptions(
    TokenId[] calldata positionIdList,
    TokenId[] calldata newPositionIdList,
    int24 tickLimitLow,
    int24 tickLimitHigh
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIdList`|`TokenId[]`|The list of tokenIds for the option positions to be burnt|
|`newPositionIdList`|`TokenId[]`|The new positionIdList without the token(s) being burnt|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|


### _mintOptions

Validates the current options of the user, and mints a new position.


```solidity
function _mintOptions(
    TokenId[] calldata positionIdList,
    uint128 positionSize,
    uint64 effectiveLiquidityLimitX32,
    int24 tickLimitLow,
    int24 tickLimitHigh
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIdList`|`TokenId[]`|The list of currently held positions by the user, where the newly minted position(token) will be the last element in `positionIdList`|
|`positionSize`|`uint128`|The size of the position to be minted, expressed in terms of the asset|
|`effectiveLiquidityLimitX32`|`uint64`|Maximum amount of "spread" defined as `removedLiquidity/netLiquidity` for a new position and denominated as X32 = (`ratioLimit * 2^32`)|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|


### _mintInSFPMAndUpdateCollateral

Move all the required liquidity to/from the AMM and settle any required collateral deltas.


```solidity
function _mintInSFPMAndUpdateCollateral(
    TokenId tokenId,
    uint128 positionSize,
    uint64 effectiveLiquidityLimitX32,
    int24 tickLimitLow,
    int24 tickLimitHigh
) internal returns (uint32 poolUtilizations, LeftRightUnsigned commissions);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position to be minted|
|`positionSize`|`uint128`|The size of the position, expressed in terms of the asset|
|`effectiveLiquidityLimitX32`|`uint64`|Maximum amount of "spread" defined as `removedLiquidity/netLiquidity`|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`poolUtilizations`|`uint32`|Packing of the pool utilization (how much funds are in the Panoptic pool versus the AMM pool) at the time of minting, right 64bits for currency0 and left 64bits for currency1. When safeMode is active, it returns 100% pool utilization for both tokens|
|`commissions`|`LeftRightUnsigned`|The total amount of commissions (base rate + ITM spread) paid for currency0 (right) and currency1 (left)|


### _payCommissionAndWriteData

Take the commission fees for minting `tokenId` and settle any other required collateral deltas.


```solidity
function _payCommissionAndWriteData(TokenId tokenId, uint128 positionSize, LeftRightSigned totalSwapped, bool isCovered)
    internal
    returns (uint32, LeftRightUnsigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`positionSize`|`uint128`|The size of the position, expressed in terms of the asset|
|`totalSwapped`|`LeftRightSigned`|The amount of tokens moved during creation of the option position|
|`isCovered`|`bool`|Whether the option was minted as covered (no swap occured if ITM)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|Packing of the pool utilization (how much funds are in the Panoptic pool versus the AMM pool at the time of minting), right 64bits for currency0 and left 64bits for currency1, defined as `(inAMM * 10_000) / totalAssets()` where totalAssets is the total tracked assets in the AMM and PanopticPool minus fees and donations to the Panoptic pool|
|`<none>`|`LeftRightUnsigned`|The total amount of commissions (base rate + ITM spread) paid for token0 (right) and token1 (left)|


### _burnAllOptionsFrom

Close all options in `positionIdList`.


```solidity
function _burnAllOptionsFrom(
    address owner,
    int24 tickLimitLow,
    int24 tickLimitHigh,
    bool commitLongSettled,
    TokenId[] calldata positionIdList
) internal returns (LeftRightSigned netPaid, LeftRightSigned[4][] memory premiasByLeg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The owner of the option position to be closed|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price on each option close|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price on each option close|
|`commitLongSettled`|`bool`|Whether to commit the long premium that will be settled to storage (disabled during liquidations)|
|`positionIdList`|`TokenId[]`|The list of option positions to close|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`netPaid`|`LeftRightSigned`|The net amount of tokens paid after closing the positions|
|`premiasByLeg`|`LeftRightSigned[4][]`|The amount of premia paid by the user for each leg of the position|


### _burnOptions

Close a single option position.


```solidity
function _burnOptions(bool commitLongSettled, TokenId tokenId, address owner, int24 tickLimitLow, int24 tickLimitHigh)
    internal
    returns (LeftRightSigned paidAmounts, LeftRightSigned[4] memory premiaByLeg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`commitLongSettled`|`bool`|Whether to commit the long premium that will be settled to storage (disabled during liquidations)|
|`tokenId`|`TokenId`|The option position to burn|
|`owner`|`address`|The owner of the option position to be burned|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price on each option close|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price on each option close|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`paidAmounts`|`LeftRightSigned`|The net amount of tokens paid after closing the position|
|`premiaByLeg`|`LeftRightSigned[4]`|The amount of premia paid by the user for each leg of the position|


### _validateSolvency

Validates the solvency of `user`.

*Falls back to the most conservative (least solvent) oracle tick if the sum of the squares of the deltas between all oracle ticks exceeds `MAX_TICKS_DELTA^2`.*

*Effectively, this means that the users must be solvent at all oracle ticks if the at least one of the ticks is sufficiently stale.*


```solidity
function _validateSolvency(address user, TokenId[] calldata positionIdList, uint256 buffer)
    internal
    view
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The account to validate|
|`positionIdList`|`TokenId[]`|The list of positions to validate solvency for|
|`buffer`|`uint256`|The buffer to apply to the collateral requirement for `user`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|If nonzero (enough time has passed since last observation), the updated value for `s_miniMedian` with a new observation|


### _checkSolvency

Validates the solvency of `user` from tickData.


```solidity
function _checkSolvency(address user, TokenId[] calldata positionIdList, uint96 tickData, uint256 buffer)
    internal
    view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The account to validate|
|`positionIdList`|`TokenId[]`|The list of positions to validate solvency for|
|`tickData`|`uint96`|The packed tick data to check solvency at|
|`buffer`|`uint256`|The buffer to apply to the collateral requirement for `user`|


### _burnAndHandleExercise

Burns and handles the exercise of options.


```solidity
function _burnAndHandleExercise(
    bool commitLongSettled,
    int24 tickLimitLow,
    int24 tickLimitHigh,
    TokenId tokenId,
    uint128 positionSize,
    address owner
)
    internal
    returns (LeftRightSigned realizedPremia, LeftRightSigned[4] memory premiaByLeg, LeftRightSigned paidAmounts);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`commitLongSettled`|`bool`|Whether to commit the long premium that will be settled to storage (disabled during liquidations)|
|`tickLimitLow`|`int24`|The lower bound of an acceptable open interval for the ending price|
|`tickLimitHigh`|`int24`|The upper bound of an acceptable open interval for the ending price|
|`tokenId`|`TokenId`|The option position to burn|
|`positionSize`|`uint128`|The size of the option position, expressed in terms of the asset|
|`owner`|`address`|The owner of the option position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`realizedPremia`|`LeftRightSigned`|The net premia paid/received from the option position|
|`premiaByLeg`|`LeftRightSigned[4]`|The premia paid by the user for each leg of the option position|
|`paidAmounts`|`LeftRightSigned`|The net amount of tokens paid after closing the position|


### liquidate

Liquidates a distressed account. Will burn all positions and issue a bonus to the liquidator.

*Will revert if liquidated account is solvent at one of the oracle ticks or if TWAP tick is too far away from the current tick.*

*If native currency is attached, non-EOA callers *must* accept empty calls with value up to the amount attached.*


```solidity
function liquidate(TokenId[] calldata positionIdListLiquidator, address liquidatee, TokenId[] calldata positionIdList)
    external
    payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIdListLiquidator`|`TokenId[]`|List of positions owned by the liquidator|
|`liquidatee`|`address`|Address of the distressed account|
|`positionIdList`|`TokenId[]`|List of positions owned by the user. Written as `[tokenId1, tokenId2, ...]`|


### forceExercise

Force the exercise of a single position. Exercisor will have to pay a fee to the force exercisee.


```solidity
function forceExercise(
    address account,
    TokenId tokenId,
    TokenId[] calldata positionIdListExercisee,
    TokenId[] calldata positionIdListExercisor
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|Address of the distressed account|
|`tokenId`|`TokenId`|The position to be force exercised; this position must contain at least one out-of-range long leg|
|`positionIdListExercisee`|`TokenId[]`|Post-burn list of open positions in the exercisee's (`account`) account|
|`positionIdListExercisor`|`TokenId[]`|List of open positions in the exercisor's (`msg.sender`) account|


### _checkSolvencyAtTicks

Check whether an account is solvent at a given `atTick` with a collateral requirement of `buffer/10_000` multiplied by the requirement of `positionIdList`.

*Reverts if `account` is not solvent at all provided ticks and `expectedSolvent == true`, or if `account` is solvent at all ticks and `!expectedSolvent`.*


```solidity
function _checkSolvencyAtTicks(
    address account,
    TokenId[] calldata positionIdList,
    int24 currentTick,
    int24[] memory atTicks,
    uint256 buffer,
    bool expectedSolvent
) internal view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account to check solvency for|
|`positionIdList`|`TokenId[]`|The list of positions to check solvency for|
|`currentTick`|`int24`|The current tick of the Uniswap pool (needed for fee calculations)|
|`atTicks`|`int24[]`|An array of ticks to check solvency at|
|`buffer`|`uint256`|The buffer to apply to the collateral requirement|
|`expectedSolvent`|`bool`|Whether the account is expected to be solvent (true) or insolvent (false) at all provided `atTicks`|


### _isAccountSolvent

Check whether an account is solvent at a given `atTick` with a collateral requirement of `buffer/10_000` multiplied by the requirement of `positionBalanceArray`.


```solidity
function _isAccountSolvent(
    address account,
    int24 atTick,
    uint256[2][] memory positionBalanceArray,
    LeftRightUnsigned shortPremium,
    LeftRightUnsigned longPremium,
    uint256 buffer
) internal view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account to check solvency for|
|`atTick`|`int24`|The tick to check solvency at|
|`positionBalanceArray`|`uint256[2][]`|A list of balances and pool utilization for each position, of the form `[[tokenId0, balances0], [tokenId1, balances1], ...]`|
|`shortPremium`|`LeftRightUnsigned`|The total amount of premium (prorated by available settled tokens) owed to the short legs of `account`|
|`longPremium`|`LeftRightUnsigned`|The total amount of premium owed by the long legs of `account`|
|`buffer`|`uint256`|The buffer to apply to the collateral requirement|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the account is solvent at the given tick|


### isSafeMode

Checks whether the current tick has deviated by `> MAX_TICKS_DELTA` from the slow oracle median tick.


```solidity
function isSafeMode() public view returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the current tick has deviated from the median by `> MAX_TICKS_DELTA`|


### _validatePositionList

Makes sure that the positions in the incoming user's list match the existing active option positions.


```solidity
function _validatePositionList(address account, TokenId[] calldata positionIdList, uint256 offset) internal view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The owner of the incoming list of positions|
|`positionIdList`|`TokenId[]`|The existing list of active options for the owner|
|`offset`|`uint256`|The amount of positions from the end of the list to exclude from validation|


### _updatePositionsHash

Updates the hash for all positions owned by an account. This fingerprints the list of all incoming options with a single hash.

*The outcome of this function will be to update the hash of positions.
This is done as a duplicate/validation check of the incoming list O(N).*

*The positions hash is stored as the XOR of the keccak256 of each tokenId. Updating will XOR the existing hash with the new tokenId.
The same update can either add a new tokenId (when minting an option), or remove an existing one (when burning it).*


```solidity
function _updatePositionsHash(address account, TokenId tokenId, bool addFlag) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The owner of `tokenId`|
|`tokenId`|`TokenId`|The option position|
|`addFlag`|`bool`|Whether to add `tokenId` to the hash (true) or remove it (false)|


### getOracleTicks

Computes and returns all ticks used for collateral checks at mint/burn.


```solidity
function getOracleTicks()
    external
    view
    returns (int24 currentTick, int24 fastOracleTick, int24 slowOracleTick, int24 latestObservation, uint256 medianData);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick of the Uniswap V4 pool|
|`fastOracleTick`|`int24`|The fast oracle tick computed as the median of the past N observations in the oracle contract|
|`slowOracleTick`|`int24`|The slow oracle tick (either composed of oracle observations or tracked by `s_miniMedian`)|
|`latestObservation`|`int24`|The latest observation from the oracle contract|
|`medianData`|`uint256`|The updated value for `s_miniMedian` (0 if `MEDIAN_PERIOD` not elapsed) if `pokeMedian` is called at the current state|


### numberOfPositions

Get the current number of open positions for an account.


```solidity
function numberOfPositions(address user) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The account to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Number of open positions for `user`|


### positionData

Get the `tokenId` position data for `user`.


```solidity
function positionData(address user, TokenId tokenId)
    external
    view
    returns (int24, int24, int24, int24, int256, int256, uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The account that owns `tokenId`|
|`tokenId`|`TokenId`|The position to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|`currentTick` at mint|
|`<none>`|`int24`|Fast oracle tick at mint|
|`<none>`|`int24`|Slow oracle tick at mint|
|`<none>`|`int24`|Last observed tick at mint|
|`<none>`|`int256`|Utilization of currency0 at mint|
|`<none>`|`int256`|Utilization of currency1 at mint|
|`<none>`|`uint128`|Size of the position|


### getOracleTWAP

Get the oracle price used to check solvency in liquidations.


```solidity
function getOracleTWAP() internal view returns (int24 twapTick);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`twapTick`|`int24`|The current oracle price used to check solvency in liquidations|


### _checkLiquiditySpread

Ensure the effective liquidity in a given chunk is above a certain threshold.


```solidity
function _checkLiquiditySpread(TokenId tokenId, uint256 leg, uint64 effectiveLiquidityLimitX32)
    internal
    view
    returns (uint256 totalLiquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|An option position|
|`leg`|`uint256`|A leg index of `tokenId` corresponding to a tickLower-tickUpper chunk|
|`effectiveLiquidityLimitX32`|`uint64`|Maximum amount of "spread" defined as removedLiquidity/netLiquidity for a new position denominated as X32 = (`ratioLimit * 2^32`)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`totalLiquidity`|`uint256`|The total liquidity deposited in that chunk: `totalLiquidity = netLiquidity + removedLiquidity`|


### _getPremia

Compute the premia collected for a single option position `tokenId`.


```solidity
function _getPremia(TokenId tokenId, uint128 positionSize, address owner, bool computeAllPremia, int24 atTick)
    internal
    view
    returns (LeftRightSigned[4] memory premiaByLeg, uint256[2][4] memory premiumAccumulatorsByLeg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`positionSize`|`uint128`|The number of contracts (size) of the option position|
|`owner`|`address`|The holder of the tokenId option|
|`computeAllPremia`|`bool`|Whether to compute accumulated premia for all legs held by the user (true), or just owed premia for long legs (false)|
|`atTick`|`int24`|The tick at which the premia is calculated -> use (`atTick < type(int24).max`) to compute it up to current block. `atTick = type(int24).max` will only consider fees as of the last on-chain transaction|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`premiaByLeg`|`LeftRightSigned[4]`|The amount of premia owed to the user for each leg of the position|
|`premiumAccumulatorsByLeg`|`uint256[2][4]`|The amount of premia accumulated for each leg of the position|


### settleLongPremium

Settle unpaid premium for one `legIndex` on a position owned by `owner`.

*Called by sellers on buyers of their chunk to increase the available premium for withdrawal (before closing their position).*

*This feature is only available when `owner` is solvent and has the requisite tokens to settle the premium.*


```solidity
function settleLongPremium(TokenId[] calldata positionIdList, address owner, uint256 legIndex) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIdList`|`TokenId[]`|Exhaustive list of open positions for `owner` used for solvency checks where the tokenId to settle is placed at the last index|
|`owner`|`address`|The owner of the option position to make premium payments on|
|`legIndex`|`uint256`|the index of the leg in tokenId that is to be collected on (must be isLong=1)|


### _updateSettlementPostMint

Adds collected tokens to `s_settledTokens` and adjusts `s_grossPremiumLast` for any liquidity added.

*Always called after `mintTokenizedPosition`.*


```solidity
function _updateSettlementPostMint(
    TokenId tokenId,
    LeftRightUnsigned[4] memory collectedByLeg,
    uint128 positionSize,
    uint64 effectiveLiquidityLimitX32
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position that was minted|
|`collectedByLeg`|`LeftRightUnsigned[4]`|The amount of tokens collected in the corresponding chunk for each leg of the position|
|`positionSize`|`uint128`|The size of the position, expressed in terms of the asset|
|`effectiveLiquidityLimitX32`|`uint64`|Maximum amount of "spread" defined as `removedLiquidity/netLiquidity`|


### _getAvailablePremium

Query the amount of premium available for withdrawal given a certain `premiumOwed` for a chunk.

*Based on the ratio between `settledTokens` and the total premium owed to sellers in a chunk.*

*The ratio is capped at 1 (as the base ratio can be greater than one if some seller forfeits enough premium).*


```solidity
function _getAvailablePremium(
    uint256 totalLiquidity,
    LeftRightUnsigned settledTokens,
    LeftRightUnsigned grossPremiumLast,
    LeftRightUnsigned premiumOwed,
    uint256[2] memory premiumAccumulators
) internal pure returns (LeftRightUnsigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`totalLiquidity`|`uint256`|The updated total liquidity amount for the chunk|
|`settledTokens`|`LeftRightUnsigned`|LeftRight accumulator for the amount of tokens that have been settled (collected or paid)|
|`grossPremiumLast`|`LeftRightUnsigned`|The `last` values used with `premiumAccumulators` to compute the total premium owed to sellers|
|`premiumOwed`|`LeftRightUnsigned`|The amount of premium owed to sellers in the chunk|
|`premiumAccumulators`|`uint256[2]`|The current values of the premium accumulators for the chunk|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned`|The amount of currency0/currency1 premium available for withdrawal|


### _getLiquidities

Query the total amount of liquidity sold in the corresponding chunk for a position leg.

*totalLiquidity (total sold) = removedLiquidity + netLiquidity (in AMM).*


```solidity
function _getLiquidities(TokenId tokenId, uint256 leg)
    internal
    view
    returns (uint256 totalLiquidity, uint128 netLiquidity, uint128 removedLiquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`leg`|`uint256`|The leg of the option position to get `totalLiquidity` for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`totalLiquidity`|`uint256`|The total amount of liquidity sold in the corresponding chunk for a position leg|
|`netLiquidity`|`uint128`|The amount of liquidity available in the corresponding chunk for a position leg|
|`removedLiquidity`|`uint128`|The amount of liquidity removed through buying in the corresponding chunk for a position leg|


### _updateSettlementPostBurn

Updates settled tokens and grossPremiumLast for a chunk after a burn and returns premium info.


```solidity
function _updateSettlementPostBurn(
    address owner,
    TokenId tokenId,
    LeftRightUnsigned[4] memory collectedByLeg,
    uint128 positionSize,
    bool commitLongSettled
) internal returns (LeftRightSigned realizedPremia, LeftRightSigned[4] memory premiaByLeg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The owner of the option position that was burnt|
|`tokenId`|`TokenId`|The option position that was burnt|
|`collectedByLeg`|`LeftRightUnsigned[4]`|The amount of tokens collected in the corresponding chunk for each leg of the position|
|`positionSize`|`uint128`|The size of the position, expressed in terms of the asset|
|`commitLongSettled`|`bool`|Whether to commit the long premium that will be settled to storage|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`realizedPremia`|`LeftRightSigned`|The amount of premia owed to the user|
|`premiaByLeg`|`LeftRightSigned[4]`|The amount of premia owed to the user for each leg of the position|


## Events
### AccountLiquidated
Emitted when an account is liquidated.

*Need to unpack bonusAmounts to get raw numbers, which are always positive.*


```solidity
event AccountLiquidated(address indexed liquidator, address indexed liquidatee, LeftRightSigned bonusAmounts);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidator`|`address`|Address of the caller liquidating the distressed account|
|`liquidatee`|`address`|Address of the distressed/liquidatable account|
|`bonusAmounts`|`LeftRightSigned`|LeftRight encoding for the the bonus paid for token 0 (right slot) and 1 (left slot) from the Panoptic Pool to the liquidator|

### ForcedExercised
Emitted when a position is force exercised.


```solidity
event ForcedExercised(
    address indexed exercisor, address indexed user, TokenId indexed tokenId, LeftRightSigned exerciseFee
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`exercisor`|`address`|Address of the account that forces the exercise of the position|
|`user`|`address`|Address of the owner of the liquidated position|
|`tokenId`|`TokenId`|TokenId of the liquidated position|
|`exerciseFee`|`LeftRightSigned`|LeftRight encoding for the cost paid by the exercisor to force the exercise of the token; the cost for token 0 (right slot) and 1 (left slot) is represented as negative|

### PremiumSettled
Emitted when premium is settled independent of a mint/burn (e.g. during `settleLongPremium`).


```solidity
event PremiumSettled(address indexed user, TokenId indexed tokenId, uint256 legIndex, LeftRightSigned settledAmounts);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|Address of the owner of the settled position|
|`tokenId`|`TokenId`|TokenId of the settled position|
|`legIndex`|`uint256`|The leg index of `tokenId` that the premium was settled for|
|`settledAmounts`|`LeftRightSigned`|LeftRight encoding for the amount of premium settled for currency0 (right slot) and currency1 (left slot)|

### OptionBurnt
Emitted when an option is burned.


```solidity
event OptionBurnt(
    address indexed recipient, uint128 positionSize, TokenId indexed tokenId, LeftRightSigned[4] premiaByLeg
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|User that burnt the option|
|`positionSize`|`uint128`|The number of contracts burnt, expressed in terms of the asset|
|`tokenId`|`TokenId`|TokenId of the burnt option|
|`premiaByLeg`|`LeftRightSigned[4]`|LeftRight packing for the amount of premia collected for currency0 (right) and currency1 (left) for each leg of `tokenId`|

### OptionMinted
Emitted when an option is minted.


```solidity
event OptionMinted(
    address indexed recipient, TokenId indexed tokenId, PositionBalance balanceData, LeftRightUnsigned commissions
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|User that minted the option|
|`tokenId`|`TokenId`|TokenId of the created option|
|`balanceData`|`PositionBalance`|The `PositionBalance` data for `tokenId` containing the number of contracts, pool utilizations, and ticks at mint|
|`commissions`|`LeftRightUnsigned`|The total amount of commissions (base rate + ITM spread) paid for token0 (right) and token1 (left)|

