---
sidebar_position: 3
---
# CollateralTracker
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/CollateralTracker.sol)

**Inherits:**
[ERC20Minimal](/docs/developers/tokens/abstract.ERC20Minimal), [Multicall](/docs/developers/base/abstract.Multicall)

**Author:**
Axicon Labs Limited

Tracks collateral of users which is key to ensure the correct level of collateralization is achieved.
This is represented as an ERC20 share token. A Panoptic pool has 2 tokens, each issued by its own instance of a CollateralTracker.
All math within this contract pertains to a single token.

This contract uses the ERC4626 standard allowing the minting and burning of "shares" (represented using ERC20 inheritance) in exchange for underlying "assets".
Panoptic uses a collateral tracking system that is similar to TradFi margin accounts. While users can borrow and
effectively control funds several times larger than the collateral they deposited, they cannot withdraw those funds
from the Panoptic-Uniswap ecosystem. All funds are always owned by the Panoptic protocol, but users will:

1) collect any fees generated by selling an option.

2) get any gain in capital that results from buying an option that becomes in-the-money.


## State Variables
### TICKER_PREFIX
Prefix for the token symbol (i.e. poUSDC).


```solidity
string internal constant TICKER_PREFIX = "po";
```


### NAME_PREFIX
Prefix for the token name (i.e POPT-V1 USDC LP on ETH/USDC 30bps).


```solidity
string internal constant NAME_PREFIX = "POPT-V1";
```


### DECIMALS
Decimals for computation (1 bps (basis point) precision: 0.01%).

*uint type for composability with unsigned integer based mathematical operations.*


```solidity
uint256 internal constant DECIMALS = 10_000;
```


### DECIMALS_128
Decimals for computation (1 bps (basis point) precision: 0.01%).

*int type for composability with signed integer based mathematical operations.*


```solidity
int128 internal constant DECIMALS_128 = 10_000;
```


### s_underlyingToken
The address of underlying token0 or token1 from the Uniswap Pool.

*Whether this is token0 or token1 depends on which collateral token is being tracked in this CollateralTracker instance.*


```solidity
address internal s_underlyingToken;
```


### s_initialized
Boolean which tracks whether this CollateralTracker has been initialized.

*As each instance is deployed via proxy clone, initial parameters must only be initalized once via startToken().*


```solidity
bool internal s_initialized;
```


### s_univ3token0
Stores address of token0 from the underlying Uniswap V3 pool.


```solidity
address internal s_univ3token0;
```


### s_univ3token1
Stores address of token1 from the underlying Uniswap V3 pool.


```solidity
address internal s_univ3token1;
```


### s_underlyingIsToken0
Store whether the current collateral token is token0 of the AMM (true) or token1 (false).


```solidity
bool internal s_underlyingIsToken0;
```


### s_panopticPool
The Collateral Tracker keeps a reference to the Panoptic Pool using it.


```solidity
PanopticPool internal s_panopticPool;
```


### s_poolAssets
Cached amount of assets accounted to be held by the Panoptic Pool — ignores donations, pending fee payouts, and other untracked balance changes.


```solidity
uint128 internal s_poolAssets;
```


### s_inAMM
Amount of assets moved from the Panoptic Pool to the AMM.


```solidity
uint128 internal s_inAMM;
```


### s_ITMSpreadFee
Additional risk premium charged on intrinsic value of ITM positions,
defined in hundredths of basis points.

*The result of the calculation is stored instead of the multiple to save gas during usage.
When the fee is set, the multiple is calculated and stored.*


```solidity
uint128 internal s_ITMSpreadFee;
```


### s_poolFee
The fee of the Uniswap pool in hundredths of basis points.


```solidity
uint24 internal s_poolFee;
```


### COMMISSION_FEE
The commission fee, in basis points, collected from PLPs at option mint.

*In Panoptic, options never expire, commissions are only paid when a new position is minted.*

*We believe that this will eliminate the impact of the commission fee on the user's decision-making process when closing a position.*


```solidity
uint256 immutable COMMISSION_FEE;
```


### SELLER_COLLATERAL_RATIO
Required collateral ratios for buying, represented as percentage * 10_000.

*i.e 20% -> 0.2 * 10_000 = 2_000.*


```solidity
uint256 immutable SELLER_COLLATERAL_RATIO;
```


### BUYER_COLLATERAL_RATIO
Required collateral ratios for selling, represented as percentage * 10_000.

*i.e 10% -> 0.1 * 10_000 = 1_000.*


```solidity
uint256 immutable BUYER_COLLATERAL_RATIO;
```


### FORCE_EXERCISE_COST
Basal cost (in bps of notional) to force exercise a position that is barely far-the-money (out-of-range).


```solidity
int256 immutable FORCE_EXERCISE_COST;
```


### TARGET_POOL_UTIL
Target pool utilization below which buying+selling is optimal, represented as percentage * 10_000.

*i.e 50% -> 0.5 * 10_000 = 5_000.*


```solidity
uint256 immutable TARGET_POOL_UTIL;
```


### SATURATED_POOL_UTIL
Pool utilization above which selling is 100% collateral backed, represented as percentage * 10_000.

*i.e 90% -> 0.9 * 10_000 = 9_000.*


```solidity
uint256 immutable SATURATED_POOL_UTIL;
```


### ITM_SPREAD_MULTIPLIER
Multiplier, in basis points, to the pool fee that is charged on the intrinsic value of ITM positions.

*e.g. ITM_SPREAD_MULTIPLIER = 20_000, s_ITMSpreadFee = 2 * s_poolFee.*


```solidity
uint256 immutable ITM_SPREAD_MULTIPLIER;
```


## Functions
### onlyPanopticPool

Ensure that the associated Panoptic pool is the caller. Revert if not.


```solidity
modifier onlyPanopticPool();
```

### constructor

Set immutable parameters for the Collateral Tracker.


```solidity
constructor(
    uint256 _commissionFee,
    uint256 _sellerCollateralRatio,
    uint256 _buyerCollateralRatio,
    int256 _forceExerciseCost,
    uint256 _targetPoolUtilization,
    uint256 _saturatedPoolUtilization,
    uint256 _ITMSpreadMultiplier
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_commissionFee`|`uint256`|The commission fee, in basis points, collected from PLPs at option mint|
|`_sellerCollateralRatio`|`uint256`|Required collateral ratios for buying, represented as percentage * 10_000|
|`_buyerCollateralRatio`|`uint256`|Required collateral ratios for selling, represented as percentage * 10_000|
|`_forceExerciseCost`|`int256`|Basal cost (in bps of notional) to force exercise a position that is barely far-the-money (out-of-range)|
|`_targetPoolUtilization`|`uint256`|Target pool utilization below which buying+selling is optimal, represented as percentage * 10_000|
|`_saturatedPoolUtilization`|`uint256`|Pool utilization above which selling is 100% collateral backed, represented as percentage * 10_000|
|`_ITMSpreadMultiplier`|`uint256`|Multiplier, in basis points, to the pool fee that is charged on the intrinsic value of ITM positions|


### startToken

Initialize a new collateral tracker for a specific token corresponding to the Panoptic Pool being created by the factory that called it.

*The factory calls this function to start a new collateral tracking system for the incoming token at `underlyingToken`.*

*The factory will do this for each of the two tokens being tracked. Thus, the collateral tracking system does not track *both* tokens at once.*


```solidity
function startToken(bool underlyingIsToken0, address token0, address token1, uint24 fee, PanopticPool panopticPool)
    external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`underlyingIsToken0`|`bool`|Whether this collateral tracker is for token0 (true) or token1 (false)|
|`token0`|`address`|Token 0 of the Uniswap pool|
|`token1`|`address`|Token 1 of the Uniswap pool|
|`fee`|`uint24`|The fee of the Uniswap pool|
|`panopticPool`|`PanopticPool`|The address of the Panoptic Pool being created and linked to this Collateral Tracker|


### getPoolData

Get information about the utilization of this collateral vault.


```solidity
function getPoolData() external view returns (uint256 poolAssets, uint256 insideAMM, uint256 currentPoolUtilization);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`poolAssets`|`uint256`|Cached amount of assets accounted to be held by the Panoptic Pool — ignores donations, pending fee payouts, and other untracked balance changes|
|`insideAMM`|`uint256`|The underlying token amount held in the AMM|
|`currentPoolUtilization`|`uint256`|The pool utilization defined as`s_inAMM * 10_000 / totalAssets()`, where totalAssets is the total tracked assets in the AMM and PanopticPool minus fees and donations to the Panoptic pool|


### name

Returns name of token composed of underlying token symbol and pool data.


```solidity
function name() external view returns (string memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The name of the token|


### symbol

Returns symbol as prefixed symbol of underlying token.


```solidity
function symbol() external view returns (string memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The symbol of the token|


### decimals

Returns decimals of underlying token (0 if not present).


```solidity
function decimals() external view returns (uint8);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The decimals of the token|


### transfer

*See [IERC20-transfer](/docs/developers/tokens/abstract.ERC20Minimal#transfer).
Requirements:
- the caller must have a balance of at least `amount`.
- the msg.sender must not have any position on the panoptic pool*


```solidity
function transfer(address recipient, uint256 amount) public override(ERC20Minimal) returns (bool);
```

### transferFrom

*See [IERC20-transferFrom](/docs/developers/tokens/abstract.ERC20Minimal#transferfrom).
Requirements:
- the `from` must have a balance of at least `amount`.
- the caller must have allowance for `from` of at least `amount` tokens.
- `from` must not have any open positions on the panoptic pool.*


```solidity
function transferFrom(address from, address to, uint256 amount) public override(ERC20Minimal) returns (bool);
```

### asset

Get the token contract address of the underlying asset being managed.


```solidity
function asset() external view returns (address assetTokenAddress);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assetTokenAddress`|`address`|The address of the underlying asset|


### totalAssets

Get the total amount of assets managed by the CollateralTracker vault.

*This returns the total tracked assets in the AMM and PanopticPool,*

*- EXCLUDING the amount of collected fees (because they are reserved for short options)*

*- EXCLUDING any donations that have been made to the pool*


```solidity
function totalAssets() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total amount of assets managed by the CollateralTracker vault|


### convertToShares

Returns the amount of shares that can be minted for the given amount of assets.


```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to be deposited|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that can be minted|


### convertToAssets

Returns the amount of assets that can be redeemed for the given amount of shares.


```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to be redeemed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that can be redeemed|


### maxDeposit

Returns the maximum deposit amount.


```solidity
function maxDeposit(address) external pure returns (uint256 maxAssets);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxAssets`|`uint256`|The maximum amount of assets that can be deposited|


### previewDeposit

Returns shares received for depositing given amount of assets.


```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to be deposited|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that can be minted|


### deposit

Deposit underlying tokens (assets) to the Panoptic pool from the LP and mint corresponding amount of shares.

*There is a maximum asset deposit limit of `2^104 - 1`.*

*An "MEV tax" is levied, which is equal to a single payment of the commissionRate BEFORE adding the funds.*

*Shares are minted and sent to the LP (`receiver`).*


```solidity
function deposit(uint256 assets, address receiver) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|Amount of assets deposited|
|`receiver`|`address`|User to receive the shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of Panoptic pool shares that were minted to the recipient|


### maxMint

Returns the maximum shares received for a deposit.


```solidity
function maxMint(address) external view returns (uint256 maxShares);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxShares`|`uint256`|The maximum amount of shares that can be minted|


### previewMint

Returns the amount of assets that would be deposited to mint a given amount of shares.


```solidity
function previewMint(uint256 shares) public view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to be minted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets required to mint `shares`|


### mint

Deposit required amount of assets to receive specified amount of shares.

*There is a maximum asset deposit limit of `2^104 - 1`.
An "MEV tax" is levied, which is equal to a single payment of the commissionRate BEFORE adding the funds.*

*Shares are minted and sent to the LP (`receiver`).*


```solidity
function mint(uint256 shares, address receiver) external returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|Amount of shares to be minted|
|`receiver`|`address`|User to receive the shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets deposited to mint the desired amount of shares|


### maxWithdraw

Returns The maximum amount of assets that can be withdrawn for a given user.
If the user has any open positions, the max withdrawable balance is zero.

*Calculated from the balance of the user; limited by the assets the pool has available.*


```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address being withdrawn for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxAssets`|`uint256`|The maximum amount of assets that can be withdrawn|


### previewWithdraw

Returns the amount of shares that would be burned to withdraw a given amount of assets.


```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to be withdrawn.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be burned.|


### withdraw

Redeem the amount of shares required to withdraw the specified amount of assets.

*We can only use this standard 4626 withdraw function if the user has no open positions.*

*Shares are burned and assets are sent to the LP (`receiver`).*


```solidity
function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|Amount of assets to be withdrawn|
|`receiver`|`address`|User to receive the assets|
|`owner`|`address`|User to burn the shares from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares burned to withdraw the desired amount of assets|


### withdraw

Redeem the amount of shares required to withdraw the specified amount of assets.

*Reverts if the account is not solvent with the given `positionIdList`.*

*Shares are burned and assets are sent to the LP (`receiver`).*


```solidity
function withdraw(uint256 assets, address receiver, address owner, TokenId[] calldata positionIdList)
    external
    returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|Amount of assets to be withdrawn|
|`receiver`|`address`|User to receive the assets|
|`owner`|`address`|User to burn the shares from|
|`positionIdList`|`TokenId[]`|The list of all option positions held by `owner`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares burned to withdraw the desired amount of assets|


### maxRedeem

Returns the maximum amount of shares that can be redeemed for a given user.
If the user has any open positions, the max redeemable balance is zero.


```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The redeeming address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`maxShares`|`uint256`|The maximum amount of shares that can be redeemed by `owner`|


### previewRedeem

Returns the amount of assets resulting from a given amount of shares being redeemed.


```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to be redeemed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets resulting from the redemption|


### redeem

Redeem exact shares for underlying assets.

*We can only use this standard 4626 redeem function if the user has no open positions.*


```solidity
function redeem(uint256 shares, address receiver, address owner) external returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|Amount of shares to be redeemed|
|`receiver`|`address`|User to receive the assets|
|`owner`|`address`|User to burn the shares from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets resulting from the redemption|


### exerciseCost

Get the cost of exercising an option. Used during a forced exercise.

This one computes the cost of calling the forceExercise function on a position:
- The forceExercisor will have to *pay* the exercisee because their position will be closed "against their will"
- The cost must be larger when the position is close to being in-range, and should be minimal when it is far from being in range. eg. Exercising a (1000, 1050)
position will cost more if the price is 999 than if it is 100
- The cost is an exponentially decaying function of the distance between the position's strike and the current price
- The cost decreases by a factor of 2 for every "position's width"
- Note that the cost is the largest among all active legs, not the sum

Example exercise costs:
- 10% if the position is liquidated when the price is between 950 and 1000, or if it is between 1050 and 1100
- 5% if the price is between 900 and 950 or (1100, 1150)
- 2.5% if between (850, 900) or (1150, 1200)


```solidity
function exerciseCost(
    int24 currentTick,
    int24 oracleTick,
    TokenId positionId,
    uint128 positionSize,
    LeftRightSigned longAmounts
) external view returns (LeftRightSigned exerciseFees);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentTick`|`int24`|The current price tick|
|`oracleTick`|`int24`|The price oracle tick|
|`positionId`|`TokenId`|The position to be exercised|
|`positionSize`|`uint128`|The size of the position to be exercised|
|`longAmounts`|`LeftRightSigned`|The amount of longs in the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`exerciseFees`|`LeftRightSigned`|The fees for exercising the option position|


### _poolUtilization

Get the pool utilization defined by the ratio of assets in the AMM to total assets.


```solidity
function _poolUtilization() internal view returns (uint256 poolUtilization);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`poolUtilization`|`uint256`|The pool utilization in basis points|


### _sellCollateralRatio

Get the base collateral requirement for a short leg at a given pool utilization.

*This is computed at the time the position is minted.*


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

if utilization is less than zero, this is the calculation for a strangle, which gets 2x the capital efficiency at low pool utilization
at 0% utilization, strangle legs do not compound efficiency

Get the base collateral requirement for a long leg at a given pool utilization.

*This is computed at the time the position is minted.*


```solidity
function _buyCollateralRatio(uint16 utilization) internal view returns (uint256 buyCollateralRatio);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`utilization`|`uint16`|The pool utilization of this collateral vault at the time the position is minted|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`buyCollateralRatio`|`uint256`|The buy collateral ratio at `utilization`|


### delegate

this is incentivized buying, which returns funds to the panoptic pool

Increase the share balance of a user by `2^248 - 1` without updating the total supply.

*This is controlled by the Panoptic Pool - not individual users.*


```solidity
function delegate(address delegatee) external onlyPanopticPool;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegatee`|`address`|The account to increase the balance of|


### revoke

Decrease the share balance of a user by `2^248 - 1` without updating the total supply.

*Assumes that `delegatee` has `>=(2^248 - 1)` tokens, will revert otherwise.*

*This is controlled by the Panoptic Pool - not individual users.*


```solidity
function revoke(address delegatee) external onlyPanopticPool;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegatee`|`address`|The account to decrease the balance of|


### settleLiquidation

Settles liquidation bonus and returns remaining virtual shares to the protocol.

*This function is where protocol loss is realized, if it exists.*


```solidity
function settleLiquidation(address liquidator, address liquidatee, int256 bonus) external onlyPanopticPool;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidator`|`address`|The account performing the liquidation of `liquidatee`|
|`liquidatee`|`address`|The liquidated account to settle|
|`bonus`|`int256`|The liquidation bonus, in assets, to be paid to `liquidator`. May be negative|


### refund

Refunds delegated tokens to `refunder` from `refundee`, similar to `revoke`.

*Assumes that the refunder has enough money to pay for the refund.*

*Can handle negative refund amounts that go from refundee to refunder in the case of high exercise fees.*


```solidity
function refund(address refunder, address refundee, int256 assets) external onlyPanopticPool;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`refunder`|`address`|The account refunding tokens to `refundee`|
|`refundee`|`address`|The account being refunded to|
|`assets`|`int256`|The amount of assets to refund. Positive means a transfer from refunder to refundee, vice versa for negative|


### takeCommissionAddData

Take commission on option creation/opening (commissions will not be taken on closing).


```solidity
function takeCommissionAddData(
    address optionOwner,
    int128 longAmount,
    int128 shortAmount,
    int128 swappedAmount,
    bool isCovered
) external onlyPanopticPool returns (uint32, uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`optionOwner`|`address`|The user minting the option|
|`longAmount`|`int128`|The amount of longs|
|`shortAmount`|`int128`|The amount of shorts|
|`swappedAmount`|`int128`|The amount of tokens moved during creation of the option position|
|`isCovered`|`bool`|Whether the option was minted as covered (no swap occured if ITM)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The final utilization of the collateral vault|
|`<none>`|`uint128`|The total amount of commission (base rate + ITM spread) paid|


### exercise

Exercise an option and pay to the seller what is owed from the buyer.

*Called when a position is burnt because it may need to be exercised.*


```solidity
function exercise(
    address optionOwner,
    int128 longAmount,
    int128 shortAmount,
    int128 swappedAmount,
    int128 realizedPremium
) external onlyPanopticPool returns (int128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`optionOwner`|`address`|The owner of the option being burned and potentially exercised|
|`longAmount`|`int128`|The notional value of the long legs of the position (if any)|
|`shortAmount`|`int128`|The notional value of the short legs of the position (if any)|
|`swappedAmount`|`int128`|The amount of tokens moved during the option close|
|`realizedPremium`|`int128`|Premium to settle on the current positions|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int128`|The amount of tokens paid when closing that position|


### _getExchangedAmount

Get the amount exchanged to mint an option.


```solidity
function _getExchangedAmount(int128 longAmount, int128 shortAmount, int128 swappedAmount, bool isCovered)
    internal
    view
    returns (int256, uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`longAmount`|`int128`|The amount of long options held|
|`shortAmount`|`int128`|The amount of short options held|
|`swappedAmount`|`int128`|The amount of tokens moved during creation of the option position|
|`isCovered`|`bool`|Whether the option was minted as covered (no swap occured if ITM)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|exchangedAmount The amount of funds to be exchanged for minting an option (includes commission, swapFee, and intrinsic value)|
|`<none>`|`uint128`|commission The total commission (base rate + ITM spread) paid for minting the option|


### getAccountMarginDetails

Get the collateral status/margin details of an account/user.

*NOTE: It's up to the caller to confirm from the returned result that the account has enough collateral.*

*This can be used to check the health: how many tokens a user has compared to the margin threshold.*


```solidity
function getAccountMarginDetails(
    address user,
    int24 atTick,
    uint256[2][] memory positionBalanceArray,
    uint128 shortPremium,
    uint128 longPremium
) public view returns (LeftRightUnsigned);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The account to check collateral/margin health for|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`positionBalanceArray`|`uint256[2][]`|The list of all historical positions held by the `optionOwner`, stored as `[[tokenId, balance/poolUtilizationAtMint], ...]`|
|`shortPremium`|`uint128`|The total amount of premium (prorated by available settled tokens) owed to the short legs of `user`|
|`longPremium`|`uint128`|The total amount of premium owed by the long legs of `user`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`LeftRightUnsigned`|Information collected for the tokens about the health of the account The collateral balance of the user is in the right slot and the threshold for margin call is in the left slot.|


### _getTotalRequiredCollateral

Get the total required amount of collateral tokens of a user/account across all active positions to stay above the margin requirement.

*Returns the token amounts required for the entire account with active positions in `positionIdList` (list of tokenIds).*


```solidity
function _getTotalRequiredCollateral(int24 atTick, uint256[2][] memory positionBalanceArray)
    internal
    view
    returns (uint256 tokenRequired);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`atTick`|`int24`|The tick at which to evaluate the account's positions|
|`positionBalanceArray`|`uint256[2][]`|The list of all historical positions held by the `optionOwner`, stored as `[[tokenId, balance/poolUtilizationAtMint], ...]`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenRequired`|`uint256`|The amount of tokens required to stay above the margin threshold for all active positions of user|


### _getRequiredCollateralAtTickSinglePosition

Get the required amount of collateral tokens corresponding to a specific single position `tokenId` at a price `atTick`.
The required collateral of an account depends on the price (`atTick`) in the AMM pool: if in the position's favor less collateral needed, etc.


```solidity
function _getRequiredCollateralAtTickSinglePosition(
    TokenId tokenId,
    uint128 positionSize,
    int24 atTick,
    int16 poolUtilization,
    bool underlyingIsToken0
) internal view returns (uint256 tokenRequired);
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
|`index`|`uint256`|The leg index (associated with a liquidity chunk) to consider a partner for|
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

ITM and out-of-range

Calculate the required amount of collateral for leg `index` for position `tokenId` accounting for its partner leg.

*If the two token long-types are different (one is a long, the other a short, e.g.) but the tokenTypes are the same, this is a spread.*

*A spread is a defined risk position which has a max loss given by difference between the long and short strikes.*

*If the two token long-types are the same but the tokenTypes are different (one is a call, the other a put, e.g.), this is a strangle -
a strangle benefits from enhanced capital efficiency because only one side can be ITM at any given time.*

*if the position is a spread, then the collateral requirement consists of two components:*

*1) The difference in notional value at both strikes: `abs(strikeLong - strikeShort)` or `abs(strikeShort - strikeLong)`*

*2) A spread term which is relevant for legs that have different widths (calendar spreads)*


```solidity
function _getRequiredCollateralSingleLegPartner(
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
|`poolUtilization`|`int16`|The pool utilization: how much funds are in the Panoptic pool versus the AMM pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`required`|`uint256`|The required amount collateral needed for this leg `index`, accounting for what the leg's risk partner is|


### _getRequiredCollateralAtUtilization

Get the base collateral requirement for a position of notional value `amount` at the current Panoptic pool `utilization` level.


```solidity
function _getRequiredCollateralAtUtilization(uint128 amount, uint256 isLong, int16 utilization)
    internal
    view
    returns (uint256 required);
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


### _computeSpread

Calculate the required amount of collateral for the spread portion of the spread position.

*(long leg requirement + 100% collateralized risk)*

*May be higher than the requirement of non risk-partnered legs if the spread is very wide (risky).*


```solidity
function _computeSpread(
    TokenId tokenId,
    uint128 positionSize,
    uint256 index,
    uint256 partnerIndex,
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
|`poolUtilization`|`int16`|The pool utilization: how much funds are in the Panoptic pool versus the AMM pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`spreadRequirement`|`uint256`|The required amount of collateral needed for the spread portion|


### _computeStrangle

Calculate the required amount of collateral for a strangle leg.

*Strangle legs are evaluated at 2x capital efficiency at low pool utilizations.*

*A strangle can only have only one of its leg tested at the same time, so this reduces the total risk and collateral requirement.*


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


## Events
### Deposit
Emitted when assets are deposited into the Collateral Tracker.


```solidity
event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address of the caller (and depositor)|
|`owner`|`address`|The address of the recipient of the newly minted shares|
|`assets`|`uint256`|The amount of assets deposited by `sender` in exchange for `shares`|
|`shares`|`uint256`|The amount of shares minted to `owner`|

### Withdraw
Emitted when assets are withdrawn from the Collateral Tracker.


```solidity
event Withdraw(address indexed sender, address indexed receiver, address indexed owner, uint256 assets, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address of the caller|
|`receiver`|`address`|The address of the recipient of the withdrawn assets|
|`owner`|`address`|The address of the owner of the shares being burned|
|`assets`|`uint256`|The amount of assets withdrawn to `receiver`|
|`shares`|`uint256`|The amount of shares burned by `owner` in exchange for `assets`|
