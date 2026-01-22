---
sidebar_position: 2
---
# PanopticPool
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/PanopticPool.sol)

**Inherits:**
Clone, [Multicall](/contracts/V2/base/abstract.Multicall.md), [TransientReentrancyGuard](/contracts/V2/libraries/abstract.TransientReentrancyGuard.md)

**Title:**
The Panoptic Pool: Create permissionless options on a CLAMM.

**Author:**
Axicon Labs Limited

Manages positions, collateral, liquidations and forced exercises.


## State Variables
### MIN_SWAP_TICK
Lower price bound used when no slippage check is required.


```solidity
int24 internal constant MIN_SWAP_TICK = Constants.MIN_POOL_TICK - 1
```


### MAX_SWAP_TICK
Upper price bound used when no slippage check is required.


```solidity
int24 internal constant MAX_SWAP_TICK = Constants.MAX_POOL_TICK + 1
```


### COMPUTE_PREMIA_AS_COLLATERAL
Flag that signals to compute premia for both the short and long legs of a position.


```solidity
bool internal constant COMPUTE_PREMIA_AS_COLLATERAL = true
```


### ONLY_AVAILABLE_PREMIUM
Flag that indicates only to include the share of (settled) premium that is available to collect when calling `_calculateAccumulatedPremia`.


```solidity
bool internal constant ONLY_AVAILABLE_PREMIUM = false
```


### COMMIT_LONG_SETTLED
Flag that signals to commit both collected Uniswap fees and settled long premium to `s_settledTokens`.


```solidity
bool internal constant COMMIT_LONG_SETTLED = true
```


### DONOT_COMMIT_LONG_SETTLED
Flag that signals to only commit collected Uniswap fees to `s_settledTokens`.


```solidity
bool internal constant DONOT_COMMIT_LONG_SETTLED = false
```


### ASSERT_SOLVENCY
Flag for `_checkSolvency` to indicate that an account should be solvent at all input ticks.


```solidity
bool internal constant ASSERT_SOLVENCY = true
```


### ASSERT_INSOLVENCY
Flag for `_checkSolvency` to indicate that an account should be insolvent at all input ticks.


```solidity
bool internal constant ASSERT_INSOLVENCY = false
```


### ADD
Flag that signals to add a new position to the user's positions hash (as opposed to removing an existing position).


```solidity
bool internal constant ADD = true
```


### MAX_OPEN_LEGS
The maximum allowed number of legs across all open positions for a user.


```solidity
uint64 internal constant MAX_OPEN_LEGS = 25
```


### NO_BUFFER
Multiplier for the collateral requirement in the general case.


```solidity
uint24 internal constant NO_BUFFER = 10_000_000
```


### DECIMALS
Decimals for computation (1 bps (1 basis point) precision: 0.01%).

uint type for composability with unsigned integer based mathematical operations.


```solidity
uint256 internal constant DECIMALS = 10_000
```


### PRICE_TRANSIENT_SLOT
Transient storage slot for the tick price


```solidity
bytes32 internal constant PRICE_TRANSIENT_SLOT = keccak256("panoptic.price.snapshot")
```


### SFPM
The "engine" of Panoptic - manages AMM liquidity and executes all mints/burns/exercises.


```solidity
ISemiFungiblePositionManager internal immutable SFPM
```


### s_oraclePack
Stores a sorted set of 8 price observations used to compute the internal median oracle price.


```solidity
OraclePack internal s_oraclePack
```


### s_options
Nested mapping that tracks the option formation: address => tokenId => leg => premiaGrowth.

Premia growth is taking a snapshot of the chunk premium in SFPM, which is measuring the amount of fees
collected for every chunk per unit of liquidity (net or short, depending on the isLong value of the specific leg index).


```solidity
mapping(address => mapping(TokenId => LeftRightUnsigned[4])) internal s_options
```


### s_grossPremiumLast
Per-chunk `last` value that gives the aggregate amount of premium owed to all sellers when multiplied by the total amount of liquidity `totalLiquidity`.

`totalGrossPremium = totalLiquidity * (grossPremium(perLiquidityX64) - lastGrossPremium(perLiquidityX64)) / 2**64`

Used to compute the denominator for the fraction of premium available to sellers to collect.

LeftRight - right slot is token0, left slot is token1.


```solidity
mapping(bytes32 chunkKey => LeftRightUnsigned lastGrossPremium) internal s_grossPremiumLast
```


### s_settledTokens
Per-chunk accumulator for tokens owed to sellers that have been settled and are now available.

This number increases when buyers pay long premium and when tokens are collected from Uniswap.

It decreases when sellers close positions and collect the premium they are owed.

LeftRight - right slot is token0, left slot is token1.


```solidity
mapping(bytes32 chunkKey => LeftRightUnsigned settledTokens) internal s_settledTokens
```


### s_positionBalance
Tracks the position size of a tokenId for a given user, and the pool utilizations and oracle tick values at the time of last mint.


```solidity
mapping(address account => mapping(TokenId tokenId => PositionBalance positionBalance)) internal s_positionBalance
```


### s_positionsHash
Tracks the position list hash (i.e `keccak256(XORs of abi.encodePacked(positionIdList))`).

A component of this hash also tracks the total number of legs across all positions (i.e. makes sure the length of the provided positionIdList matches).

The purpose of this system is to reduce storage usage when a user has more than one active position.

Instead of having to manage an unwieldy storage array and do lots of loads, we just store a hash of the array.

This hash can be cheaply verified on every operation with a user provided positionIdList - which can then be used for operations
without having to every load any other data from storage.


```solidity
mapping(address account => uint256 positionsHash) internal s_positionsHash
```


## Functions
### collateralToken0

Get the collateral token corresponding to token0 of the Uniswap pool.


```solidity
function collateralToken0() public pure returns (CollateralTracker);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`CollateralTracker`|Collateral token corresponding to token0 in Uniswap|


### collateralToken1

Get the collateral token corresponding to token1 of the Uniswap pool.


```solidity
function collateralToken1() public pure returns (CollateralTracker);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`CollateralTracker`|Collateral token corresponding to token1 in Uniswap|


### riskEngine

Get the address of the risk engine contract used by this Panoptic Pool.


```solidity
function riskEngine() public pure returns (IRiskEngine);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IRiskEngine`|The risk engine contract used by this Panoptic Pool|


### poolManager

Retrieve the PoolManager associated with that CollateralTracker.

stored as zero if not a Uniswap v4 pool


```solidity
function poolManager() public pure returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The PoolManager instance associated with that CollateralTracker's uniswap V4 pool|


### poolId

Get the Uniswap Pool ID for the Uniswap pool used by this Panoptic.


```solidity
function poolId() public pure returns (uint64);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint64`|The Pool ID for this Panoptic Pool|


### poolKey

Get the pool key for the Uniswap pool used by this Panoptic Pool.

For Uniswap v3, this is the address of the UniswapV3Pool

For Uniswap v4, this is Pool Key

For any other AMMs, this is assumed to be an address


```solidity
function poolKey() public pure returns (bytes calldata key);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`key`|`bytes`|The Pool Key for this Panoptic Pool.|


### onlyRiskEngine

Reverts if the associated Risk Engine is not the caller.


```solidity
modifier onlyRiskEngine() ;
```

### _onlyRiskEngine


```solidity
function _onlyRiskEngine() internal view;
```

### lockSafeMode

Force safe mode lock: effective safe mode must be treated as level 3.


```solidity
function lockSafeMode() external onlyRiskEngine;
```

### unlockSafeMode

Remove forced safe mode lock.


```solidity
function unlockSafeMode() external onlyRiskEngine;
```

### constructor

Store the address of the canonical SemiFungiblePositionManager (SFPM) contract.


```solidity
constructor(ISemiFungiblePositionManager _sfpm) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sfpm`|`ISemiFungiblePositionManager`|The address of the SFPM|


### initialize

Initializes the median oracle of a new `PanopticPool` instance with median oracle state and performs initial token approvals.

Must be called first (by the factory contract) before any transaction can occur.


```solidity
function initialize() external;
```

### onERC1155Received

Returns magic value when called by the `SemiFungiblePositionManager` contract to indicate that this contract supports ERC1155.


```solidity
function onERC1155Received(address, address, uint256, uint256, bytes memory) external pure returns (bytes4);
```

### assertMinCollateralValues

Reverts if the caller has a lower collateral balance than required to meet the provided `minValue0` and `minValue1`.

Can be used for composable slippage checks with `multicall` (such as for a force exercise or liquidation).


```solidity
function assertMinCollateralValues(uint256 minValue0, uint256 minValue1) external view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`minValue0`|`uint256`|The minimum acceptable `token0` value of collateral|
|`minValue1`|`uint256`|The minimum acceptable `token1` value of collateral|


### validateCollateralWithdrawable

Determines if account is eligible to withdraw or transfer collateral.

Checks whether account is solvent with `BP_DECREASE_BUFFER` according to `_validateSolvency`.

Prevents insolvent and near-insolvent accounts from withdrawing collateral before they are liquidated.

Reverts if account is not solvent with `BP_DECREASE_BUFFER`.


```solidity
function validateCollateralWithdrawable(address user, TokenId[] calldata positionIdList, bool usePremiaAsCollateral)
    external
    view
    ensureNonReentrantView;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The account to check for collateral withdrawal eligibility|
|`positionIdList`|`TokenId[]`|The list of all option positions held by `user`|
|`usePremiaAsCollateral`|`bool`|Whether to compute accumulated premia for all legs held by the user for collateral (true), or just owed premia for long legs (false)|


### getAccumulatedFeesAndPositionsData

Returns the total amount of premium accumulated for a list of positions and a list containing the corresponding `PositionBalance` information for each position.


```solidity
function getAccumulatedFeesAndPositionsData(
    address user,
    bool includePendingPremium,
    TokenId[] calldata positionIdList
) external view returns (LeftRightUnsigned, LeftRightUnsigned, PositionBalance[] memory);
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
|`<none>`|`LeftRightUnsigned`|The total amount of premium owed (which may `includePendingPremium`) to the short legs in `positionIdList` (token0: right slot, token1: left slot)|
|`<none>`|`LeftRightUnsigned`|The total amount of premium owed by the long legs in `positionIdList` (token0: right slot, token1: left slot)|
|`<none>`|`PositionBalance[]`|A list of `PositionBalance` data (balance and pool utilization/oracle ticks at last mint) for each position, of the form `[PositionBalance_0, PositionBalance_1, ...]`|


### _calculateAccumulatedPremia

Calculate the accumulated premia owed from the option buyer to the option seller.


```solidity
function _calculateAccumulatedPremia(
    address user,
    TokenId[] calldata positionIdList,
    bool usePremiaAsCollateral,
    bool includePendingPremium,
    int24 atTick
)
    internal
    view
    returns (LeftRightUnsigned shortPremium, LeftRightUnsigned longPremium, PositionBalance[] memory balances);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The holder of options|
|`positionIdList`|`TokenId[]`|The list of all option positions held by user|
|`usePremiaAsCollateral`|`bool`|Whether to compute accumulated premia for all legs held by the user for collateral (true), or just owed premia for long legs (false)|
|`includePendingPremium`|`bool`|If true, include premium that is owed to the user but has not yet settled; if false, only include premium that is available to collect|
|`atTick`|`int24`|The current tick of the Uniswap pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shortPremium`|`LeftRightUnsigned`|The total amount of premium owed (which may `includePendingPremium`) to the short legs in `positionIdList` (token0: right slot, token1: left slot)|
|`longPremium`|`LeftRightUnsigned`|The total amount of premium owed by the long legs in `positionIdList` (token0: right slot, token1: left slot)|
|`balances`|`PositionBalance[]`|A list of balances and pool utilization for each position, of the form `[[tokenId0, balances0], [tokenId1, balances1], ...]`|


### pokeOracle

Updates the internal oracle.


```solidity
function pokeOracle() external nonReentrant;
```

### dispatch

Mints or burns each `tokenId` in `positionIdList.


```solidity
function dispatch(
    TokenId[] calldata positionIdList,
    TokenId[] calldata finalPositionIdList,
    uint128[] calldata positionSizes,
    int24[3][] calldata tickAndSpreadLimits,
    bool usePremiaAsCollateral,
    uint256 builderCode
) external nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIdList`|`TokenId[]`|The list of tokenIds for the option positions to be minted or burnt|
|`finalPositionIdList`|`TokenId[]`|The final positionIdList after all the tokens have been minted/burnt|
|`positionSizes`|`uint128[]`|The list of positionSize for the position to be minted (0 for burns)|
|`tickAndSpreadLimits`|`int24[3][]`|A Nx3 array containing: the lower [0] and upper [1] bounds of an acceptable open interval for the ending price, and the maximum amount of "spread" defined as `removedLiquidity/netLiquidity` for a new position and denominated as X10_000 = (`ratioLimit * 10_000`)|
|`usePremiaAsCollateral`|`bool`|Whether to compute accumulated premia for all legs held by the user for collateral (true), or just owed premia for long legs (false)|
|`builderCode`|`uint256`|The builder code for fee distribution|


### _mintOptions

Validates the current options of the user, and mints a new position.


```solidity
function _mintOptions(
    TokenId tokenId,
    uint128 positionSize,
    uint24 effectiveLiquidityLimit,
    address owner,
    int24[2] memory tickLimits,
    RiskParameters riskParameters
) internal returns (LeftRightSigned paidAmounts, int24 finalTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The tokenId of the newly minted position|
|`positionSize`|`uint128`|The size of the position to be minted, expressed in terms of the asset|
|`effectiveLiquidityLimit`|`uint24`|Maximum amount of "spread" defined as `removedLiquidity/netLiquidity` for a new position and denominated as X32 = (`ratioLimit * 2^32`)|
|`owner`|`address`|The owner of the option position to be minted|
|`tickLimits`|`int24[2]`|The lower and upper bound of an acceptable open interval for the ending price|
|`riskParameters`|`RiskParameters`|The RiskEngine's core parameters|


### _payCommissionAndWriteData

Take the commission fees for minting `tokenId` and settle any other required collateral deltas.


```solidity
function _payCommissionAndWriteData(
    TokenId tokenId,
    uint128 positionSize,
    address owner,
    LeftRightSigned netAmmDelta,
    RiskParameters riskParameters
) internal returns (uint32 utilizations, LeftRightSigned paidAmounts);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position|
|`positionSize`|`uint128`|The size of the position, expressed in terms of the asset|
|`owner`|`address`|The owner of the option position to be minted|
|`netAmmDelta`|`LeftRightSigned`|The amount of tokens moved during creation of the option position|
|`riskParameters`|`RiskParameters`|The RiskEngine's core parameters|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`utilizations`|`uint32`|Packing of the pool utilization (how much funds are in the Panoptic pool versus the AMM pool at the time of minting), right 64bits for token0 and left 64bits for token1, defined as `(inAMM * 10_000) / totalAssets()` where totalAssets is the total tracked assets in the AMM and PanopticPool minus fees and donations to the Panoptic pool|
|`paidAmounts`|`LeftRightSigned`|The amount of tokens paid when creating that option for token0 (right) and token1 (left)|


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
|`premiasByLeg`|`LeftRightSigned[4][]`|The amount of premia settled by the user for each leg of the position|


### _burnOptions

Close a single option position.


```solidity
function _burnOptions(
    TokenId tokenId,
    uint128 positionSize,
    int24[2] memory tickLimits,
    address owner,
    bool commitLongSettled,
    RiskParameters riskParameters
) internal returns (LeftRightSigned paidAmounts, LeftRightSigned[4] memory premiaByLeg, int24 finalTick);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|The option position to burn|
|`positionSize`|`uint128`|The size of the position to burn|
|`tickLimits`|`int24[2]`|The lower and upper bound of an acceptable open interval for the ending price on each option close|
|`owner`|`address`|The owner of the option position to be burned|
|`commitLongSettled`|`bool`|Whether to commit the long premium that will be settled to storage (disabled during liquidations)|
|`riskParameters`|`RiskParameters`|The RiskEngine's core risk parameters|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`paidAmounts`|`LeftRightSigned`|The net amount of tokens paid after closing the position|
|`premiaByLeg`|`LeftRightSigned[4]`|The amount of premia settled by the user for each leg of the position|
|`finalTick`|`int24`|The final tick after burning the options|


### _validateSolvency

Validates the solvency of `user`.

Falls back to the most conservative (least solvent) oracle tick if the sum of the squares of the deltas between all oracle ticks exceeds `MAX_TICKS_DELTA^2`, defined in the RiskEngine.

Effectively, this means that the users must be solvent at all oracle ticks if the at least one of the ticks is sufficiently stale.


```solidity
function _validateSolvency(
    address user,
    TokenId[] calldata positionIdList,
    uint32 buffer,
    bool usePremiaAsCollateral,
    uint8 safeMode
) internal view returns (OraclePack);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The account to validate|
|`positionIdList`|`TokenId[]`|The list of positions to validate solvency for|
|`buffer`|`uint32`|The buffer to apply to the collateral requirement for `user`|
|`usePremiaAsCollateral`|`bool`|Whether to compute accumulated premia for all legs held by the user for collateral (true), or just owed premia for long legs (false)|
|`safeMode`|`uint8`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`OraclePack`|If nonzero (enough time has passed since last observation), the updated value for `s_oraclePack` with a new observation|


### _settleOptions


```solidity
function _settleOptions(
    address owner,
    TokenId tokenId,
    uint128 positionSize,
    RiskParameters riskParameters,
    int24 currentTick
) internal;
```

### _updateSettlementPostMint

Adds collected tokens to `s_settledTokens` and adjusts `s_grossPremiumLast` for any liquidity added.

Always called after `mintTokenizedPosition`.


```solidity
function _updateSettlementPostMint(
    RiskParameters riskParameters,
    TokenId tokenId,
    LeftRightUnsigned[4] memory collectedByLeg,
    uint128 positionSize,
    uint24 effectiveLiquidityLimit,
    address owner
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`riskParameters`|`RiskParameters`||
|`tokenId`|`TokenId`|The option position that was minted|
|`collectedByLeg`|`LeftRightUnsigned[4]`|The amount of tokens collected in the corresponding chunk for each leg of the position|
|`positionSize`|`uint128`|The size of the position, expressed in terms of the asset|
|`effectiveLiquidityLimit`|`uint24`|Maximum amount of "spread" defined as `removedLiquidity/netLiquidity`|
|`owner`|`address`|The owner of the option position to be minted|


### _updateSettlementPostBurn

Updates settled tokens and grossPremiumLast for a chunk after a burn and returns premium info.


```solidity
function _updateSettlementPostBurn(
    address owner,
    TokenId tokenId,
    LeftRightUnsigned[4] memory collectedByLeg,
    uint128 positionSize,
    RiskParameters riskParameters,
    LeftRightSigned commitLongSettledAndKeepOpen
) internal returns (LeftRightSigned realizedPremia, LeftRightSigned[4] memory premiaByLeg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The owner of the option position that was burnt|
|`tokenId`|`TokenId`|The option position that was burnt|
|`collectedByLeg`|`LeftRightUnsigned[4]`|The amount of tokens collected in the corresponding chunk for each leg of the position|
|`positionSize`|`uint128`|The size of the position, expressed in terms of the asset|
|`riskParameters`|`RiskParameters`||
|`commitLongSettledAndKeepOpen`|`LeftRightSigned`|Whether to commit the long premium that will be settled to storage (rightSlot != 0) and whether the position is being burned (leftSlot == 0)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`realizedPremia`|`LeftRightSigned`|The amount of premia settled by the user|
|`premiaByLeg`|`LeftRightSigned[4]`|The amount of premia settled by the user for each leg of the position|


### dispatchFrom

Dispatches liquidations, forced exercises, or long premium settlements based on account solvency

This function determines the appropriate action based on solvency checks at multiple price points:
- If insolvent at all ticks: Execute liquidation (burns all positions)
- If solvent at all ticks: Execute force exercise or settle long premium based on list lengths
- Otherwise: Revert as account is not fully margin called

The function uses position list lengths to determine the specific operation:
- Same length lists between positionIdListTo and positionIdListToFinal: Settle long premium
- Final list one shorter: Force exercise
- Final list empty: Liquidation


```solidity
function dispatchFrom(
    TokenId[] calldata positionIdListFrom,
    address account,
    TokenId[] calldata positionIdListTo,
    TokenId[] calldata positionIdListToFinal,
    LeftRightUnsigned usePremiaAsCollateral
) external payable nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIdListFrom`|`TokenId[]`|List of positions held by the caller (msg.sender)|
|`account`|`address`|The account being acted upon (liquidated, exercised, or settled)|
|`positionIdListTo`|`TokenId[]`|Current positions of the target account|
|`positionIdListToFinal`|`TokenId[]`|Expected positions after the operation completes|
|`usePremiaAsCollateral`|`LeftRightUnsigned`|Packed value indicating whether to use premia as collateral: - leftSlot: For the caller (msg.sender) - rightSlot: For the target account|


### _liquidate

Liquidates a distressed account. Will burn all positions and issue a bonus to the liquidator.

Will revert if liquidated account is solvent at one of the oracle ticks or if TWAP tick is too far away from the current tick.


```solidity
function _liquidate(address liquidatee, TokenId[] calldata positionIdList, int24 twapTick, int24 currentTick)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidatee`|`address`|Address of the distressed account|
|`positionIdList`|`TokenId[]`|List of positions owned by the user. Written as `[tokenId1, tokenId2, ...]`|
|`twapTick`|`int24`||
|`currentTick`|`int24`||


### _forceExercise

Force the exercise of a single position. Exercisor will have to pay a fee to the force exercisee.


```solidity
function _forceExercise(address account, TokenId tokenId, int24 twapTick, int24 currentTick) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|Address of the distressed account|
|`tokenId`|`TokenId`|The position to be force exercised; this position must contain at least one out-of-range long leg|
|`twapTick`|`int24`||
|`currentTick`|`int24`||


### _settlePremium

Settle unpaid premium for one `legIndex` on a position owned by `owner`.

Called by sellers on buyers of their chunk to increase the available premium for withdrawal (before closing their position).

This feature is only available when `owner` is solvent and has the requisite tokens to settle the premium.


```solidity
function _settlePremium(address owner, TokenId tokenId, int24 twapTick, int24 currentTick) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The owner of the option position to make premium payments on|
|`tokenId`|`TokenId`|The position to be force exercised; this position must contain at least one out-of-range long leg|
|`twapTick`|`int24`||
|`currentTick`|`int24`||


### _checkSolvencyAtTicks

Check whether an account is solvent at a given `atTick` with a collateral requirement of `buffer/10_000` multiplied by the requirement of `positionIdList`.

Reverts if `account` is not solvent at all provided ticks and `expectedSolvent == true`, or if `account` is solvent at all ticks and `!expectedSolvent`.


```solidity
function _checkSolvencyAtTicks(
    address account,
    uint8 safeMode,
    TokenId[] calldata positionIdList,
    int24 currentTick,
    int24[] memory atTicks,
    bool usePremiaAsCollateral,
    uint256 buffer
) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account to check solvency for|
|`safeMode`|`uint8`|The current safe mode status|
|`positionIdList`|`TokenId[]`|The list of positions to check solvency for|
|`currentTick`|`int24`|The current tick of the Uniswap pool (needed for fee calculations)|
|`atTicks`|`int24[]`|An array of ticks to check solvency at|
|`usePremiaAsCollateral`|`bool`|Whether to compute accumulated premia for all legs held by the user for collateral (true), or just owed premia for long legs (false)|
|`buffer`|`uint256`|The buffer to apply to the collateral requirement|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|boolean flag that determines if account is solvent|


### _isAccountSolvent

Check whether an account is solvent at a given `atTick` with a collateral requirement of `buffer/10_000` multiplied by the requirement of `positionBalanceArray`.


```solidity
function _isAccountSolvent(
    address account,
    int24 atTick,
    TokenId[] calldata positionIdList,
    PositionBalance[] memory positionBalanceArray,
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
|`positionIdList`|`TokenId[]`|The list of all option positions held by the user|
|`positionBalanceArray`|`PositionBalance[]`|A list of balances and pool utilization for each position, of the form `[[tokenId0, balances0], [tokenId1, balances1], ...]`|
|`shortPremium`|`LeftRightUnsigned`|The total amount of premium (prorated by available settled tokens) owed to the short legs of `account`|
|`longPremium`|`LeftRightUnsigned`|The total amount of premium owed by the long legs of `account`|
|`buffer`|`uint256`|The buffer to apply to the collateral requirement|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the account is solvent at the given tick|


### getRiskParameters

Get risk parameters from the risk engine.

Also checks whether the current tick has deviated too much from the previously stored ticks. Computed in the RiskEngine


```solidity
function getRiskParameters(uint256 builderCode)
    public
    view
    returns (RiskParameters riskParameters, int24 currentTick);
```

### isSafeMode

Checks whether the current tick has deviated too much from the previously stored ticks. Computed in the RiskEngine


```solidity
function isSafeMode() external view returns (uint8);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|Whether the current tick has deviated too much to warrant putting the protocol in safe mode|


### _validatePositionList

Makes sure that the positions in the incoming user's list match the existing active option positions.


```solidity
function _validatePositionList(address account, TokenId[] calldata positionIdList) internal view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The owner of the incoming list of positions|
|`positionIdList`|`TokenId[]`|The existing list of active options for the owner|


### _updatePositionsHash

Updates the hash for all positions owned by an account. This fingerprints the list of all incoming options with a single hash.

The outcome of this function will be to update the hash of positions.
This is done as a duplicate/validation check of the incoming list O(N).

The positions hash is stored as the XOR of the keccak256 of each tokenId. Updating will XOR the existing hash with the new tokenId.
The same update can either add a new tokenId (when minting an option), or remove an existing one (when burning it).


```solidity
function _updatePositionsHash(address account, TokenId tokenId, bool addFlag, uint8 maxLegs) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The owner of `tokenId`|
|`tokenId`|`TokenId`|The option position|
|`addFlag`|`bool`|Whether to add `tokenId` to the hash (true) or remove it (false)|
|`maxLegs`|`uint8`||


### getOracleTicks

Computes and returns all oracle ticks.


```solidity
function getOracleTicks()
    external
    view
    returns (int24 currentTick, int24 spotTick, int24 medianTick, int24 latestTick, OraclePack oraclePack);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current tick in the Uniswap pool|
|`spotTick`|`int24`|The fast oracle tick, sourced from the internal 10-minute EMA.|
|`medianTick`|`int24`|The slow oracle tick, calculated as the median of the 8 stored price points in the internal oracle.|
|`latestTick`|`int24`|The reconstructed absolute tick of the latest observation stored in the internal oracle.|
|`oraclePack`|`OraclePack`|The current value of the 8-slot internal observation queue (`s_oraclePack`)|


### numberOfLegs

Get the current number of legs across all open positions for an account.


```solidity
function numberOfLegs(address user) external view ensureNonReentrantView returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The account to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Number of legs across the open positions of `user`|


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
|`<none>`|`int256`|Utilization of token0 at mint|
|`<none>`|`int256`|Utilization of token1 at mint|
|`<none>`|`uint128`|Size of the position|


### getTWAP

Get the oracle price used to check solvency in liquidations.


```solidity
function getTWAP() public view returns (int24 twapTick);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`twapTick`|`int24`|The current oracle price used to check solvency in liquidations|


### getCurrentTick

Get the current tick of the underlying pool.


```solidity
function getCurrentTick() public view returns (int24 currentTick);
```

### _checkLiquiditySpread

Ensure the effective liquidity in a given chunk is above a certain threshold.


```solidity
function _checkLiquiditySpread(TokenId tokenId, uint256 leg, uint256 effectiveLiquidityLimit)
    internal
    view
    returns (uint256 totalLiquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`TokenId`|An option position|
|`leg`|`uint256`|A leg index of `tokenId` corresponding to a tickLower-tickUpper chunk|
|`effectiveLiquidityLimit`|`uint256`|Maximum amount of "spread" defined as removedLiquidity/netLiquidity for a new position denominated as X10_000 = (`ratioLimit * 10_000`)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`totalLiquidity`|`uint256`|The total liquidity deposited in that chunk: `totalLiquidity = netLiquidity + removedLiquidity`|


### _getPremia

Compute the premia collected for a single option position `tokenId`.


```solidity
function _getPremia(TokenId tokenId, uint128 positionSize, address owner, bool usePremiaAsCollateral, int24 atTick)
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
|`usePremiaAsCollateral`|`bool`|Whether to compute accumulated premia for all legs held by the user for collateral (true), or just owed premia for long legs (false)|
|`atTick`|`int24`|The tick at which the premia is calculated -> use (`atTick < type(int24).max`) to compute it up to current block. `atTick = type(int24).max` will only consider fees as of the last on-chain transaction|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`premiaByLeg`|`LeftRightSigned[4]`|The amount of premia owed to the user for each leg of the position|
|`premiumAccumulatorsByLeg`|`uint256[2][4]`|The amount of premia accumulated for each leg of the position|


### _getAvailablePremium

Query the amount of premium available for withdrawal given a certain `premiumOwed` for a chunk.

Based on the ratio between `settledTokens` and the total premium owed to sellers in a chunk.

The ratio is capped at 1 (as the base ratio can be greater than one if some seller forfeits enough premium).


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
|`<none>`|`LeftRightUnsigned`|The amount of token0/token1 premium available for withdrawal|


### _getLiquidities

Query the total amount of liquidity sold in the corresponding chunk for a position leg.

totalLiquidity (total sold) = removedLiquidity + netLiquidity (in AMM).


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


## Events
### AccountLiquidated
Emitted when an account is liquidated.


```solidity
event AccountLiquidated(address indexed liquidator, address indexed liquidatee, LeftRightSigned bonusAmounts);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidator`|`address`|Address of the caller liquidating the distressed account|
|`liquidatee`|`address`|Address of the distressed/liquidatable account|
|`bonusAmounts`|`LeftRightSigned`|LeftRight encoding for the the bonus paid for token 0 (right slot) and 1 (left slot) to the liquidator|

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
Emitted when premium is settled independent of a mint/burn (e.g. during `settlePremium`).


```solidity
event PremiumSettled(
    address indexed user, TokenId indexed tokenId, uint256 legIndex, LeftRightSigned settledAmounts
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|Address of the owner of the settled position|
|`tokenId`|`TokenId`|TokenId of the settled position|
|`legIndex`|`uint256`|The leg index of `tokenId` that the premium was settled for|
|`settledAmounts`|`LeftRightSigned`|LeftRight encoding for the amount of premium settled for token0 (right slot) and token1 (left slot)|

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
|`premiaByLeg`|`LeftRightSigned[4]`|LeftRight packing for the amount of premia settled for token0 (right) and token1 (left) for each leg of `tokenId`|

### OptionMinted
Emitted when an option is minted.


```solidity
event OptionMinted(address indexed recipient, TokenId indexed tokenId, PositionBalance balanceData);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|User that minted the option|
|`tokenId`|`TokenId`|TokenId of the created option|
|`balanceData`|`PositionBalance`|The `PositionBalance` data for `tokenId` containing the number of contracts, pool utilizations, and ticks at mint|

