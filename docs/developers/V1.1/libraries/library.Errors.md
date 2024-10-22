# Errors
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core-private/blob/43b745d55cc99a535a2ac086cddc74a3b26c5fba/contracts/libraries/Errors.sol)

**Author:**
Axicon Labs Limited

Contains all custom error messages used in Panoptic.


## Errors
### AccountInsolvent
PanopticPool: The account is not solvent enough to perform the desired action


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
CollateralTracker: Collateral token has already been initialized


```solidity
error CollateralTokenAlreadyInitialized();
```

### DepositTooLarge
CollateralTracker: The amount of shares (or assets) deposited is larger than the maximum permitted


```solidity
error DepositTooLarge();
```

### EffectiveLiquidityAboveThreshold
PanopticPool: The effective liquidity (X32) is greater than min(`MAX_SPREAD`, `USER_PROVIDED_THRESHOLD`) during a long mint or short burn

*Effective liquidity measures how much new liquidity is minted relative to how much is already in the pool*


```solidity
error EffectiveLiquidityAboveThreshold();
```

### ExceedsMaximumRedemption
CollateralTracker: Attempted to withdraw/redeem more than available liquidity, owned shares, or open positions would allow for


```solidity
error ExceedsMaximumRedemption();
```

### InputListFail
PanopticPool: The provided list of option positions is incorrect or invalid


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
The TokenId provided by the user is malformed or invalid


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

### NoLegsExercisable
PanopticPool: None of the legs in a position are force-exercisable (they are all either short or ATM long)


```solidity
error NoLegsExercisable();
```

### NotALongLeg
PanopticPool: The leg is not long, so premium cannot be settled through `settleLongPremium`


```solidity
error NotALongLeg();
```

### NotEnoughLiquidity
PanopticPool: There is not enough available liquidity in the chunk for one of the long legs to be created (or for one of the short legs to be closed)


```solidity
error NotEnoughLiquidity();
```

### NotMarginCalled
PanopticPool: Position is still solvent and cannot be liquidated


```solidity
error NotMarginCalled();
```

### NotPanopticPool
CollateralTracker: The caller for a permissioned function is not the Panoptic Pool


```solidity
error NotPanopticPool();
```

### PoolAlreadyInitialized
Uniswap pool has already been initialized in the SFPM or created in the factory


```solidity
error PoolAlreadyInitialized();
```

### PositionAlreadyMinted
PanopticPool: A position with the given token ID has already been minted by the caller and is still open


```solidity
error PositionAlreadyMinted();
```

### PositionCountNotZero
CollateralTracker: The user has open/active option positions, so they cannot transfer collateral shares


```solidity
error PositionCountNotZero();
```

### PositionTooLarge
SFPM: The maximum token deltas (excluding swaps) for a position exceed (2^127 - 5) at some valid price


```solidity
error PositionTooLarge();
```

### PriceBoundFail
The current tick in the pool (post-ITM-swap) has fallen outside a user-defined open interval slippage range


```solidity
error PriceBoundFail();
```

### StaleTWAP
An oracle price is too far away from another oracle price or the current tick

*This is a safeguard against price manipulation during option mints, burns, and liquidations*


```solidity
error StaleTWAP();
```

### TooManyPositionsOpen
PanopticPool: An account has reached the maximum number of open positions and cannnot mint another


```solidity
error TooManyPositionsOpen();
```

### TransferFailed
ERC20 or SFPM (ERC1155) token transfer did not complete successfully


```solidity
error TransferFailed();
```

### InvalidTickBound
The tick range given by the strike price and width is invalid
because the upper and lower ticks are not initializable multiples of `tickSpacing`
or one of the ticks exceeds the `MIN_TICK` or `MAX_TICK` bounds


```solidity
error InvalidTickBound();
```

### UnderOverFlow
An operation in a library has failed due to an underflow or overflow


```solidity
error UnderOverFlow();
```

### UniswapPoolNotInitialized
The Uniswap Pool has not been created, so it cannot be used in the SFPM or have a PanopticPool created for it by the factory


```solidity
error UniswapPoolNotInitialized();
```

### ZeroLiquidity
SFPM: Mints/burns of zero-liquidity chunks in Uniswap are not supported


```solidity
error ZeroLiquidity();
```

