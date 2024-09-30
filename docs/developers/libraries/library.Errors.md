# Errors
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/libraries/Errors.sol)

**Author:**
Axicon Labs Limited

Contains all custom error messages used in Panoptic.


## Errors
### AccountInsolvent
PanopticPool: the account is not solvent enough to perform the desired action


```solidity
error AccountInsolvent();
```

### CastingError
Casting error

*e.g. uint128(uint256(a)) fails*


```solidity
error CastingError();
```

### CollateralTokenAlreadyInitialized
CollateralTracker: collateral token has already been initialized


```solidity
error CollateralTokenAlreadyInitialized();
```

### DepositTooLarge
CollateralTracker: the amount of shares (or assets) deposited is larger than the maximum permitted


```solidity
error DepositTooLarge();
```

### EffectiveLiquidityAboveThreshold
PanopticPool: the effective liquidity (X32) is greater than min(`MAX_SPREAD`, `USER_PROVIDED_THRESHOLD`) during a long mint or short burn

*Effective liquidity measures how much new liquidity is minted relative to how much is already in the pool*


```solidity
error EffectiveLiquidityAboveThreshold();
```

### ExceedsMaximumRedemption
CollateralTracker: attempted to withdraw/redeem more than available liquidity, owned shares, or open positions would allow for


```solidity
error ExceedsMaximumRedemption();
```

### InputListFail
PanopticPool: the provided list of option positions is incorrect or invalid


```solidity
error InputListFail();
```

### InvalidTick
Tick is not between `MIN_TICK` and `MAX_TICK`


```solidity
error InvalidTick();
```

### InvalidNotionalValue
The result of a notional value conversion is too small (=0) or too large (>2^128-1)


```solidity
error InvalidNotionalValue();
```

### InvalidTokenIdParameter
Invalid TokenId parameter detected


```solidity
error InvalidTokenIdParameter(uint256 parameterType);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`parameterType`|`uint256`|poolId=0, ratio=1, tokenType=2, risk_partner=3, strike=4, width=5, two identical strike/width/tokenType chunks=6|

### InvalidUniswapCallback
A mint or swap callback was attempted from an address that did not match the canonical Uniswap V3 pool with the claimed features


```solidity
error InvalidUniswapCallback();
```

### LeftRightInputError
Invalid input in LeftRight library


```solidity
error LeftRightInputError();
```

### NoLegsExercisable
PanopticPool: one of the legs in a position are force-exercisable (they are all either short or ITM long)


```solidity
error NoLegsExercisable();
```

### NotALongLeg
PanopticPool: the leg is not long, so the premium cannot be settled through `settleLongPremium`


```solidity
error NotALongLeg();
```

### NotEnoughLiquidity
PanopticPool: there is not enough avaiable liquidity to buy an option


```solidity
error NotEnoughLiquidity();
```

### NotMarginCalled
PanopticPool: position is still solvent and cannot be liquidated


```solidity
error NotMarginCalled();
```

### NotPanopticPool
CollateralTracker: the caller for a permissioned function is not the Panoptic Pool


```solidity
error NotPanopticPool();
```

### PoolAlreadyInitialized
Uniswap pool has already been initialized in the SFPM or created in the factory


```solidity
error PoolAlreadyInitialized();
```

### PositionAlreadyMinted
PanopticPool: Option position already minted


```solidity
error PositionAlreadyMinted();
```

### PositionCountNotZero
CollateralTracker: The user has open/active option positions, so they cannot transfer collateral shares


```solidity
error PositionCountNotZero();
```

### PositionTooLarge
SFPM: maximum token amounts for a position exceed 128 bits


```solidity
error PositionTooLarge();
```

### PriceBoundFail
The current tick in the pool falls outside a user-defined open interval slippage range


```solidity
error PriceBoundFail();
```

### StaleTWAP
An oracle price is too far away from another oracle price or the current tick
This is a safeguard against price manipulation during option mints, burns, and liquidations


```solidity
error StaleTWAP();
```

### TooManyPositionsOpen
PanopticPool: too many positions open (above limit per account)


```solidity
error TooManyPositionsOpen();
```

### TransferFailed
ERC20 or SFPM token transfer did not complete successfully


```solidity
error TransferFailed();
```

### TicksNotInitializable
The tick range given by the strike price and width is invalid
because the upper and lower ticks are not multiples of `tickSpacing`


```solidity
error TicksNotInitializable();
```

### UnderOverFlow
An operation in a library has failed due to an underflow or overflow


```solidity
error UnderOverFlow();
```

### UniswapPoolNotInitialized
The Uniswap Pool has not been created, so it cannot be used in the SFPM or factory


```solidity
error UniswapPoolNotInitialized();
```

### ZeroLiquidity
SFPM: Mints/burns of 0-liquidity chunks in Uniswap are not supported


```solidity
error ZeroLiquidity();
```

