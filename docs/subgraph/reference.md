---
sidebar_position: 1
---

# Subgraph reference
Fields recorded by the Panoptic subgraph. 

## SWAP subgraph

### Event emitted by `UniswapV3Pool.sol`

```solidity
/// @notice Emitted by the pool for any swaps between token0 and token1
/// @param sender The address that initiated the swap call, and that received the callback
/// @param recipient The address that received the output of the swap
/// @param amount0 The delta of the token0 balance of the pool
/// @param amount1 The delta of the token1 balance of the pool
/// @param sqrtPriceX96 The sqrt(price) of the pool after the swap, as a Q64.96
/// @param liquidity The liquidity of the pool after the swap
/// @param tick The log base 1.0001 of price of the pool after the swap
event Swap(
    address indexed sender,
    address indexed recipient,
    int256 amount0,
    int256 amount1,
    uint160 sqrtPriceX96,
    uint128 liquidity,
    int24 tick
);

```

### Schema

* swaps
  * sender
    * (account object)
  * recipient
    * (account object)
  * amount0
  * amount1
  * sqrtPriceX96
  * liquidity
  * tick
  * id
  * logIndex
  * timestamp
  * transaction
    * (transaction object)
  * token0
    * (asset object)
  * token1
    * (asset object)
  * pool
    * (pool object)
  
* accounts
  * address
  * firstTransactionTimestamp
  * transactions
    * (transaction objects)
  * assets
    * (asset objects)

* asset
  * decimals
  * id
  * name
  * symbol
  * totalSupply
  * txCount
  * transactions
    * (transaction objects)
  * pools
    * (pool objects)

* pool
  * feeTier
  * token0
    * (asset object)
  * token1
    * (asset object)
  * transactions
    * (transaction objects)
  * liquidity
  * realizedVols
    * (volatility object)
  * sqrtPrice
  * tick
  * timeData
    * (timeData objects)
  
* transactions
  * swaps
    * (swap object)
  * id
  * timestamp
  * blockNumber

* volatility
  * window
  * txCount
  * avgVolume
  * avgLiquidity
  * realizedVolatility
  * impliedVolatility

* timeData
  * window
  * open
  * close
  * high
  * low
  * txCount
  * periodStartUnix
  * meanTick
  * varianceTick
  * skewTick
  * kurtosisTick
  * volatility
    * (volatility object)
  * swaps
    * (swap objects)

## LP subgraph

### Event emitted by `UniswapV3Pool.sol`
```solidity
    /// @notice Emitted when liquidity is minted for a given position
    /// @param sender The address that minted the liquidity
    /// @param owner The owner of the position and recipient of any minted liquidity
    /// @param tickLower The lower tick of the position
    /// @param tickUpper The upper tick of the position
    /// @param amount The amount of liquidity minted to the position range
    /// @param amount0 How much token0 was required for the minted liquidity
    /// @param amount1 How much token1 was required for the minted liquidity
    event Mint(
        address sender,
        address indexed owner,
        int24 indexed tickLower,
        int24 indexed tickUpper,
        uint128 amount,
        uint256 amount0,
        uint256 amount1
    );

    /// @notice Emitted when fees are collected by the owner of a position
    /// @dev Collect events may be emitted with zero amount0 and amount1 when the caller chooses not to collect fees
    /// @param owner The owner of the position for which fees are collected
    /// @param tickLower The lower tick of the position
    /// @param tickUpper The upper tick of the position
    /// @param amount0 The amount of token0 fees collected
    /// @param amount1 The amount of token1 fees collected
    event Collect(
        address indexed owner,
        address recipient,
        int24 indexed tickLower,
        int24 indexed tickUpper,
        uint128 amount0,
        uint128 amount1
    );

    /// @notice Emitted when a position's liquidity is removed
    /// @dev Does not withdraw any fees earned by the liquidity position, which must be withdrawn via #collect
    /// @param owner The owner of the position for which liquidity is removed
    /// @param tickLower The lower tick of the position
    /// @param tickUpper The upper tick of the position
    /// @param amount The amount of liquidity to remove
    /// @param amount0 The amount of token0 withdrawn
    /// @param amount1 The amount of token1 withdrawn
    event Burn(
        address indexed owner,
        int24 indexed tickLower,
        int24 indexed tickUpper,
        uint128 amount,
        uint256 amount0,
        uint256 amount1
    );
```

### Event emitted by `SemiFungiblePositionManager.sol`


```solidity
    /// @notice Emitted when a position is destroyed/burned
    /// @dev Recipient is used to track whether it was burned directly by the user or through an option contract
    /// @param recipient The address of the user who burned the position
    /// @param tokenId The tokenId of the burned position
    /// @param positionSize The number of contracts burnt, expressed in terms of the numeraire
    event TokenizedPositionBurnt(
        address indexed recipient,
        uint256 indexed tokenId,
        uint128 positionSize
    );

    /// @notice Emitted when a position is created/minted
    /// @dev Recipient is used to track whether it was minted directly by the user or through an option contract
    /// @param caller the caller who created the position. In 99% of cases `caller` == `recipient`.
    /// @param tokenId The tokenId of the minted position
    /// @param positionSize The number of contracts minted, expressed in terms of the numeraire
    event TokenizedPositionMinted(
        address indexed caller,
        uint256 indexed tokenId,
        uint128 positionSize
    );

    /// @notice Emitted when a position is rolled (i.e. burned and re-deployed/re-minted)
    /// @dev Recipient is used to track whether it was minted directly by the user or through an option contract
    /// @param recipient The address of the user which minted the position
    /// @param oldTokenId The tokenId of the burnt position
    /// @param newTokenId The tokenId of the newly minted position
    /// @param positionSize The number of contracts rolled, expressed in terms of the numeraire
    event TokenizedPositionRolled(
        address indexed recipient,
        uint256 indexed oldTokenId,
        uint256 indexed newTokenId,
        uint128 positionSize
    );
```

### Schema

* mints
  * amount
  * amount0
  * amount1
  * chunks
    * (chunk object)
  * origin
    * (account object)
  * owner
    * (account object)
  * sender
    * (account object)
  * transaction
    * (transaction object)
  * token0
    * (asset object)
  * token1
    * (asset object)
  * pool
    * (pool object)

* collects
  * amount0
  * amount1
  * chunks
    * (chunk object)
  * origin
    * (account object)
  * owner
    * (account object)
  * sender
    * (account object)
  * transaction
    * (transaction object)
  * token0
    * (asset object)
  * token1
    * (asset object)
  * pool
    * (pool object)
  
* burns
  * amount
  * amount0
  * amount1
  * chunks
    * (chunk object)
  * origin
    * (account object)
  * owner
    * (account object)
  * sender
    * (account object)
  * transaction
    * (transaction object)
  * token0
    * (asset object)
  * token1
    * (asset object)
  * pool
    * (pool object)

* rolls
  * amountOld
  * amount0Old
  * amount1Old
  * amountNew
  * amount0New
  * amount1New
  * chunksOld
    * (chunk object)
  * chunksNew
    * (chunk object)
  * origin
    * (account object)
  * owner
    * (account object)
  * sender
    * (account object)
  * transaction
    * (transaction object)
  * token0
    * (asset object)
  * token1
    * (asset object)
  * pool
    * (pool object)


* accounts
  * address
  * firstTransactionTimestamp
  * transactions
    * (transaction objects)
  * assets
    * (asset objects)

* transactions
  * burns
    * (burn object)
  * mints
    * (mint object)
  * collects
    * (collect object)
  * rolls
    * (roll object)
  * tokenIds
    * (tokenId objects)
  * id
  * logIndex
  * timestamp
  * blockNumber

* asset
  * decimals
  * id
  * name
  * symbol
  * totalSupply
  * transactions
    * (transaction objects)
  * pools
    * (pool objects)


* pool
  * feetier
  * token0
    * (asset object)
  * token1
    * (asset object)
  * transactions
    * (transaction objects)
  * liquidity
  * timedata
    * (timedata objects)
  * chunks
    * (chunk object)
  * ticks
    * (tick objects)
  
* chunks
  * users
    * (account objects)
  * ticklower
  * tickupper
  * netliquidity
  * shortliquidity
  * longliquidity
  * shortcounts
  * longcounts
  * legs
    * (leg objects)

* legs
  * pool
    * (pool object)
  * legnumber
  * optionratio
  * numeraire
  * tokentype
  * islong
  * riskpartner
  * strike
  * width
  * chunks
    * (chunk objects)
  * tokenids
    * (tokenid objects)

* tokenids
  * pool
    * (pool object)
  * owners
    * (account object)
  * legs
    * (leg objects)
  * transactions
    * (transaction object)


## PANOPTIC subgraph


### Events emitted by `PanopticFactory.sol`

```solidity  
    /// @notice Emitted when a Panoptic Pool is created.
    /// @param poolAddress Address of the deployed Panoptic pool
    /// @param uniswapPool Address of the underlying Uniswap v3 pool
    /// @param rareNftId the id of the Factory-issued rare NFT minted as part of deploying the Panoptic pool (NOT the option position in the SFPM)
    /// @param rarity the rarity of the deployed Panoptic Pool (associated with a rare NFT).
    /// @param amount0 of token0 deployed at full range
    /// @param amount1 of token1 deployed at full range
    event PoolDeployed(
        PanopticPool indexed poolAddress,
        IUniswapV3Pool indexed uniswapPool,
        uint256 rareNftId,
        uint256 indexed rarity,
        uint256 amount0,
        uint256 amount1
    );
```   

### Event emitted by `PanopticPool.sol`

```solidity
    /// @notice Emitted when an account is liquidated.
    /// @dev Need to unpack bonusAmounts to get raw numbers, always positive.
    /// @param liquidator Address of that liquidates the distressed account
    /// @param liquidatee Address of the distresses/liquidated account
    /// @param bonusAmounts LeftRight encoding for the the bonus paid in each token in the Panoptic Pool to the liquidator.
    event AccountLiquidated(
        address indexed liquidator,
        address indexed liquidatee,
        int256 bonusAmounts
    );

    /// @notice Emitted when a position is force exercised.
    /// @dev Need to unpack exerciseFee to get raw numbers, represented as negative (fee debited).
    /// @param exercisor Address of the account that forces the exercise of the position
    /// @param user Address of the owner of the liquidated position
    /// @param tokenId TokenId of the liquidated position
    /// @param exerciseFee LeftRight encoding for the cost paid by the exercisor to force the exercise for each token
    event ForcedExercised(
        address indexed exercisor,
        address indexed user,
        uint256 indexed tokenId,
        int256 exerciseFee
    );

    /// @notice Emitted when an option is burned.
    /// @dev Is not emitted when a position is liquidated or force exercised
    /// @param recipient User that burnt the option
    /// @param positionSize The number of contracts burnt, expressed in terms of the numeraire
    /// @param tokenId TokenId of the burnt option
    /// @param tickAtBurn Tick at which the option was burned
    /// @param premia LeftRight packing for the amount of premia collected for token0 and token1
    event OptionBurnt(
        address indexed recipient,
        uint128 positionSize,
        uint256 indexed tokenId,
        int24 tickAtBurn,
        int256 premia
    );

    /// @notice Emitted when an option is minted.
    /// @dev Cannot add liquidity to an existing position
    /// @param recipient User that minted the option
    /// @param positionSize The number of contracts minted, expressed in terms of the numeraire
    /// @param tokenId TokenId of the created option
    /// @param tickAtMint Tick at which the option was minted
    /// @param commissionRates LeftRight packing of (commission rate)*10000 paid for token0 and token1
    /// @param poolUtilizations Packing of the pool utilization (how much funds are in the Panoptic pool versus the AMM pool) at the time of minting,
    /// right 64bits for token0 and left 64bits for token1, defined as (inAMM / totalBalance) * 10_000.
    event OptionMinted(
        address indexed recipient,
        uint128 positionSize,
        uint256 indexed tokenId,
        int24 tickAtMint,
        int256 commissionRates,
        uint128 poolUtilizations
    );

    /// @notice Emitted when an option is rolled.
    /// @param recipient User that burnt the option
    /// @param positionSize The number of contracts burnt, expressed in terms of the numeraire
    /// @param oldTokenId TokenId of the burnt option
    /// @param newTokenId TokenId of the minted option
    /// @param commissionRates LeftRight packing of (commission rate)*10000 paid for token0 and token1
    /// @param poolUtilizations Packing of the pool utilization (how much funds are in the Panoptic pool versus the AMM pool) at the time of minting,
    /// right 64bits for token0 and left 64bits for token1, defined as (inAMM / totalBalance) * 10_000.
    /// @param premia LeftRight packing for the amount of premia collected for token0 and token1
    event OptionRolled(
        address indexed recipient,
        uint128 positionSize,
        uint256 indexed oldTokenId,
        uint256 indexed newTokenId,
        int256 commissionRates,
        uint128 poolUtilizations,
        int256 premia
    );
```    

### Schema

* optionMints
  * account
    * (account object)
  * tokenId
    * (tokenId object)
  * positionSize
  * tick
  * commissionRate0
  * commissionRate1
  * poolUtilization0
  * poolUtilization1
  * transaction
    * (transaction object)

* optionBurns
  * account
    * (account object)
  * tokenId
    * (tokenId objet)
  * positionSize
  * tick
  * premium0
  * premium1
  * transaction
    * (transaction object)
  
* optionRolls
  * account
    * (account object)
  * tokenIdOld
    * (tokenId objet)
  * tokenIdNew
    * (tokenId objet)
  * positionSize
  * tick
  * commissionRate0
  * commissionRate1
  * poolUtilization0
  * poolUtilization1
  * premium0
  * premium1
  * transaction
    * (transaction object)
  
* liquidations
  * account
    * (account object)
  * liquidator
    * (account object)
  * bonusAmount0
  * bonusAmount1
  * burns
    * (optionBurn object)
  * transactions
    * (transaction objects)

* forceExercises
  * account
    * (account object)
  * exercisor
    * (account object)
  * exerciseFee0
  * exerciseFee1
  * burns
    * (optionBurn object)
  * transactions
    * (transaction object)


* accounts
  * address
  * firstTransactionTimestamp
  * transactions
    * (transaction objects)
  * assets
    * (asset objects)
  * balanceData
    * (timeData)
  * requiredData
    * (timeData)
  * accumulatedPremium0
  * accumulatedPremium1


* transactions
  * optionBburns
    * (optionBurn object)
  * optionMints
    * (optionMint object)
  * optionRolls
    * (optionRoll object)
  * liquidations
    * (liquidation object)
  * forceExercises
    * (forceExercise object)
  * tokenIds
    * (tokenId objects)
  * id
  * logIndex
  * timestamp
  * blockNumber

* collateral
  * underlying
  * id
  * name
  * symbol
  * totalSupply
  * totalAssets
  * panopticPoolBalance
  * lockedAssets
  * inAMMAssets
  * poolUtilization
  * pools
    * (pool objects)


* asset
  * decimals
  * id
  * name
  * symbol
  * totalSupply
  * transactions
    * (transaction objects)
  * pools
    * (pool objects)

* pool
  * feetier
  * token0
    * (asset object)
  * token1
    * (asset object)
  * collateralToken0
    * (collateral object)
  * collateralToken1
    * (collateral object)
  * transactions
    * (transaction objects)
  * timedata
    * (timedata objects)
  * chunks
    * (chunk object)
  * ticks
    * (tick objects)
  
* chunks
  * users
    * (account objects)
  * ticklower
  * tickupper
  * netliquidity
  * shortliquidity
  * longliquidity
  * shortcounts
  * longcounts
  * legs
    * (leg objects)

* legs
  * pool
    * (pool object)
  * legnumber
  * optionratio
  * numeraire
  * tokentype
  * islong
  * riskpartner
  * strike
  * width
  * chunks
    * (chunk objects)
  * tokenids
    * (tokenid objects)

* tokenIds
  * pool
    * (pool object)
  * owners
    * (account object)
  * legs
    * (leg objects)
  * transactions
    * (transaction object)

* timeData
  * window
  * periodStartUnix
  * ??? 
  * transactions
    * (swap objects)

   
