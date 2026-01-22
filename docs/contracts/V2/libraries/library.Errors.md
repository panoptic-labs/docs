# Errors
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/libraries/Errors.sol)

**Title:**
Custom Errors library.

**Author:**
Axicon Labs Limited

Contains all custom error messages used in Panoptic.


## Errors
### AccountInsolvent
PanopticPool: The account is not solvent enough to perform the desired action


```solidity
error AccountInsolvent(uint256 solvent, uint256 numberOfTicks);
```

### CastingError
Casting error

e.g. uint128(uint256(a)) fails


```solidity
error CastingError();
```

### BelowMinimumRedemption
CollateralTracker: Attempted to withdraw/redeem less than a single asset


```solidity
error BelowMinimumRedemption();
```

### ChunkHasZeroLiquidity
SFPM: Mints/burns of zero-liquidity chunks in Uniswap are not supported


```solidity
error ChunkHasZeroLiquidity();
```

### AlreadyInitialized
Smart contract has already been initialized


```solidity
error AlreadyInitialized();
```

### DepositTooLarge
CollateralTracker: The amount of shares (or assets) deposited is larger than the maximum permitted


```solidity
error DepositTooLarge();
```

### DuplicateTokenId
PanopticPool: The list of provided TokenIds has a duplicate entry


```solidity
error DuplicateTokenId();
```

### EffectiveLiquidityAboveThreshold
PanopticPool: The effective liquidity (X32) is greater than min(`MAX_SPREAD`, `USER_PROVIDED_THRESHOLD`) during a long mint or short burn

Effective liquidity measures how much new liquidity is minted relative to how much is already in the pool


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

### LiquidityTooHigh
Liquidity in a chunk is above 2**128


```solidity
error LiquidityTooHigh();
```

### InsufficientCreditLiquidity
CollateralTracker: There is not enough available liquidity to fulfill a credit in the PanopticPool


```solidity
error InsufficientCreditLiquidity();
```

### InvalidBuilderCode
RiskEngine: invalid builder code


```solidity
error InvalidBuilderCode();
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

### LengthMismatch
RiskEngine: There is a mismatch between the length of the positionIdList and positionBalanceArray


```solidity
error LengthMismatch();
```

### NetLiquidityZero
PanopticPool: The Net Liquidity is zero due to small positions and cannot be used to compute the liquiditySpread


```solidity
error NetLiquidityZero();
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

### NotBuilder
builderWallet: can only be called by the Builder


```solidity
error NotBuilder();
```

### NotEnoughLiquidityInChunk
PanopticPool: There is not enough available liquidity in the chunk for one of the long legs to be created (or for one of the short legs to be closed)


```solidity
error NotEnoughLiquidityInChunk();
```

### NotEnoughTokens
CollateralTracker: The user does not own enough assets to open/close a position


```solidity
error NotEnoughTokens(address tokenAddress, uint256 assetsRequested, uint256 assetBalance);
```

### NotGuardian
RiskEngine: can only be called by the guardian


```solidity
error NotGuardian();
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

### PoolNotInitialized
The Uniswap Pool has not been created, so it cannot be used in the SFPM or have a PanopticPool created for it by the factory


```solidity
error PoolNotInitialized();
```

### PositionCountNotZero
CollateralTracker: The user has open/active option positions, so they cannot transfer collateral shares


```solidity
error PositionCountNotZero();
```

### PositionNotOwned
PanopticPool: A position with the given token ID is not owned by the user and has positionSize=0


```solidity
error PositionNotOwned();
```

### PositionTooLarge
SFPM: The maximum token deltas (excluding swaps) for a position exceed (2^127 - 5) at some valid price


```solidity
error PositionTooLarge();
```

### PriceBoundFail
The current tick in the pool (post-ITM-swap) has fallen outside a user-defined open interval slippage range


```solidity
error PriceBoundFail(int24 currentTick);
```

### PriceImpactTooLarge
The Price impact of that trade is too large


```solidity
error PriceImpactTooLarge();
```

### StaleOracle
An oracle price is too far away from another oracle price or the current tick

This is a safeguard against price manipulation during option mints, burns, liquidations, force exercises, and premium settlements


```solidity
error StaleOracle();
```

### TooManyLegsOpen
PanopticPool: The position being minted would increase the total amount of legs open for the account above the maximum


```solidity
error TooManyLegsOpen();
```

### TransferFailed
ERC20 or SFPM (ERC1155) token transfer did not complete successfully


```solidity
error TransferFailed(address token, address from, uint256 amount, uint256 balance);
```

### InvalidTickBound
The tick range given by the strike price and width is invalid
because the upper and lower ticks are not initializable multiples of `tickSpacing`
or one of the ticks exceeds the `MIN_TICK` or `MAX_TICK` bounds


```solidity
error InvalidTickBound();
```

### UnauthorizedUniswapCallback
An unlock callback was attempted from an address other than the canonical Uniswap V4 pool manager


```solidity
error UnauthorizedUniswapCallback();
```

### UnderOverFlow
An operation in a library has failed due to an underflow or overflow


```solidity
error UnderOverFlow();
```

### Reentrancy
The function has triggered a reentrancy check


```solidity
error Reentrancy();
```

### WrongPoolId
PanopticPool: The supplied poolId does not match the poolId for that Uniswap Pool


```solidity
error WrongPoolId();
```

### WrongUniswapPool
SFPM: The poolId's don't match


```solidity
error WrongUniswapPool();
```

### ZeroAddress
PanopticFactory: the zero address was supplied as a parameter


```solidity
error ZeroAddress();
```

### ZeroCollateralRequirement
CollateralTracker: Mints/burns of a position returns no collateral requirement


```solidity
error ZeroCollateralRequirement();
```

### TokenIdHasZeroLegs
PanopticMath: The supplied tokenId has no valid legs


```solidity
error TokenIdHasZeroLegs();
```

