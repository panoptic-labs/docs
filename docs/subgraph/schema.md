---
sidebar_position: 1
---

# Panoptic Subgraph Schema

## Panoptic Subgraph

A subgraph is a derived data schema that indexes and organizes data from various decentralized protocols.

The Panoptic subgraph is a comprehensive data schema designed to provide insights into the Panoptic protocol, enabling developers and users to efficiently query and analyze data related to Panoptic pools and its associated entities. The Panoptic subgraph leverages the underlying data from Uniswap pools as its foundation, upon which the Panoptic pools are built. Users can access structured data related to Panoptic pools, accounts, transactions, and more through the subgraph. This documentation serves as a guide to understanding the structure and functionality of the Panoptic subgraph, facilitating effective utilization of its capabilities.

## Subgraph Schema

### Entities

`**Factory` (**Uniswap Factory Contract**)**

-   **`id`** (Uniswap Factory’s address),
-   **`poolCount`** (number of pools created),
-   **`owner`** (current owner of the factory)

**`PanopticFactory`**: Panoptic Factory Contract responsible for creating PanopticPools.

`**Bundle**` which is the price of Eth (The current price of Eth). Borrowed from Uniswap’s **`findEthPerToken`** function.

**`Account`**:

-   **`id`** (account address),
-   **`chunks`** (chunks created by this account),
-   **`tokenIds`** (token IDs owned by this account), and
-   **`panopticPoolAccount`** (sub accounts for PanopticPools where this account has options activity)

**`AccountBalance`**: The **`AccountBalance`** entity represents the balance of a specific **`tokenId`** held by an **`owner`** account

-   **`owner`**: represents the account that owns the balance. It refers to an **`Account`** entity.
-   **`sender`**: represents the account that initiated the transaction associated with the balance. It also refers to an **`Account`** entity.
-   **`tokenId`**: represents a specific ERC-1155 ID (TokenId).
-   **`tokenCount`**: represents the amount of the **`tokenId`** held by the **`owner`**.
-   **`panopticPoolAccount`**: represents the associated **`PanopticPoolAccount`** if the **`tokenId`** exists within a PanopticPool. It refers to a **`PanopticPoolAccount`** entity.

**`PanopticPoolAccount`**: Represents an account within a Panoptic Pool

-   **`id`**: represents the unique identifier for each **`PanopticPoolAccount`**. It is a combination of an account address and the Panoptic Pool address.
-   **`panopticPool`** establishes a many-to-one relationship between **`PanopticPoolAccount`** and **`PanopticPool`**. It indicates the Panoptic Pool to which the account is associated
-   **`account`** establishes a many-to-one relationship between **`PanopticPoolAccount`** and **`Account`**. It represents the account associated with the Panoptic Pool.
-   **`collateral0`** and **`collateral1`** These fields represent the collateral tokens (such as ERC-20 tokens) held in the Panoptic Pool. There are typically two collateral tokens (**`collateral0`** and **`collateral1`**) associated with each Panoptic Pool. The **`Collateral`** type likely contains information about the token, such as its address, name, symbol, and decimals.
-   **`collateral0Shares`** and **`collateral1Shares`** These fields indicate the balance or number of shares of the respective collateral tokens held by the account in the Panoptic Pool. The **`BigInt`** type is used to represent large integer values.
-   **`tokenIds`** represents a one-to-many relationship between **`PanopticPoolAccount`** and **`AccountBalance`**. It is derived from the **`panopticPoolAccount`** field in the **`AccountBalance`** entity. It signifies the **`AccountBalance`** entities associated with the specific **`PanopticPoolAccount`**, representing the token IDs owned by the account in the Panoptic Pool (tokenIds that are Panoptions)
-   **`liquidationPriceUp`** and **`liquidationPriceDown`** These fields denote the liquidation prices associated with the token IDs owned by the account in the Panoptic Pool. The values indicate the threshold prices at which the positions may be subject to liquidation. The **`BigInt`** type is used to represent large integer values.

**`Token`**: Represents a token in the system

-   **`decimals`**: The number of decimals for the token.
-   **`id`**: The unique identifier for the token.
-   **`name`**: The name of the token.
-   **`symbol`**: The symbol of the token.
-   **`totalSupply`**: The total supply of the token.
-   **`txCount`**: The number of transactions across all pools that include this token.
-   **`derivedETH`**: The derived price in ETH, used to provide a human-readable price.
-   **`whitelistPools`**: A list of pools in which the token is whitelisted for USD pricing.
-   **`panopticPools`**: A list of PanopticPools in which this token is used.

**`Pool`**: represents an underlying pool in the system, such as an Uniswap V3 Pool.

-   **`id`**: The unique identifier for the pool.
-   **`feeTier`**: The fee amount associated with the pool.
-   **`tickSpacing`**: The minimum space between ticks in the pool.
-   **`token0`**: The first token in the pool.
-   **`token1`**: The second token in the pool.
-   **`txCount`**: The total transaction count for the pool.
-   **`liquidity`**: The in-range liquidity of the pool.
-   **`chunks`**: The chunk data associated with the pool.
-   **`sqrtPrice`**: The current price tracker of the pool.
-   **`tick`**: The current tick of the pool.
-   **`poolHourData`**: The snapshots of pool data at an hourly granularity.
-   **`poolDayData`**: The snapshots of pool data at a daily granularity.
-   **`token0Price`**: The price of token0 per token1.
-   **`token1Price`**: The price of token1 per token0.
-   **`totalValueLockedToken0`**: The total value of token0 locked across all ticks in the pool.
-   **`totalValueLockedToken1`**: The total value of token1 locked across all ticks in the pool.
-   **`panopticPool`**: The associated PanopticPool, if created.

**`Leg`**: Represents a leg within a TokenId of an option position

-   **`id`**: The unique identifier for the leg. It is a string representation of the tuple **`(numeraire, optionRatio, isLong, tokenType, riskPartner, strike, width)`** from least significant bit (LSB) to most significant bit (MSB), cast to a string.
-   **`optionRatio`**: The number of contracts per leg.
-   **`numeraire`**: Indicates the numeraire of the leg. It is 0 for **`token0`** and 1 for **`token1`**.
-   **`tokenType`**: Represents the type of token moved when the option is deployed. It is 0 for **`token0`** and 1 for **`token1`**.
-   **`isLong`**: Indicates whether the leg is a long leg. A value of 1 means liquidity is removed, while a value of 0 means liquidity is added.
-   **`riskPartner`**: Specifies the risk partner for the leg. Normally, it represents its own index, but in a defined risk position, it can indicate a partner.
-   **`strike`**: The strike price of the leg, calculated as **`(tickUpper + tickLower) / 2`**.
-   **`width`**: The width of the leg, defined as **`(tickUpper - tickLower) / 2`**.
-   **`chunk`**: Represents the associated **`Chunk`** for the leg. A chunk is a grouping of options that share the same parameters.
-   **`legCount`**: The total count of legs with the same attributes.
-   **`tokenIds`**: The list of **`TokenId`** entities associated with this leg. It is derived from the **`legs`** field in the **`TokenId`** entity.

`**TokenID`:** The **`TokenId`** entity represents an ERC-1155 ID that identifies a position. It has the following relationships:

-   **`pool`**: The **`pool`** field represents the Pool to which the **`TokenId`** belongs. It refers to a **`Pool`** entity.
-   **`tokenCount`**: The **`tokenCount`** field represents the number of instances of the **`TokenId`** that exist.
-   **`legs`**: The **`legs`** field represents the legs associated with the **`TokenId`**. It refers to an array of **`Leg`** entities.

**`ForcedExercise`** Represents a forced exercise event where an option is exercised by an account.

A forced exercise in a PanopticPool refers to a situation where an option held by a specific account (**`exercisee`**) is forcibly exercised by another account (**`exercisor`**). The forced exercise involves the exercise of a particular token (**`tokenId`**) and incurs exercise fees in token0 (**`exerciseFee0`**) and token1 (**`exerciseFee1`**).

The forced exercise is associated with a specific transaction (**`transaction`**) and occurs at a specific order within that transaction (**`logIndex`**). The forced exercise affects the PanopticPool as a whole (**`panopticPool`**) and can impact the specific PanopticPoolAccount (**`panopticPoolAccount`**) associated with the exercise.

Fields include:

-   **`id`**: Unique identifier for the forced exercise event.
-   **`exercisee`**: The account that was exercised.
-   **`exercisor`**: The account that performed the exercise.
-   **`tokenId`**: The token ID that was exercised.
-   **`exerciseFee0`**: Exercise fee amount related to **`token0`**.
-   **`exerciseFee1`**: Exercise fee amount related to **`token1`**.
-   **`transaction`**: Pointer to the transaction containing this forced exercise.
-   **`logIndex`**: Order of the forced exercise within the transaction.
-   **`panopticPool`**: The PanopticPool within which the forced exercise occurred.
-   **`panopticPoolAccount`**: The PanopticPoolAccount affected by this forced exercise.

`**Transaction**`: ****Represents a transaction within the Panoptic ecosystem.

-   **`id`**: This field represents the transaction hash, which uniquely identifies a transaction.
-   **`blockNumber`**: It indicates the block number in which the transaction was included.
-   **`timestamp`**: This field represents the timestamp when the transaction was confirmed.
-   **`gasUsed`**: It specifies the amount of gas used during the execution of the transaction.
-   **`gasPrice`**: This field represents the gas price at which the transaction was executed.
-   `**mints`, `collects`, `burns`**, `**rolls**`: These are arrays derived from `**Transaction**` entity representing the minting, collecting, and burning of tokens. Roll is specific to SFPM and represents the rolling of tokenized positions.
-   `**optionMints**`, `**optionBurns**`, `**optionRolls**`: These are arrays derived from `**Transaction**` entity representing the minting, burning, and rolling of Panoptic options (Panoptions).
-   `**liquidations**`: Array of **`Liquidation`** entities derived from the transaction, indicating the liquidation of an account.
-   **`forcedExcercises`**: Array of **`ForcedExercise`** entities derived from the transaction, representing the forced exercise of an account.

**`PanopticPool`** Represents a PanopticPool entity, which is a pool in the DeFi system. Fields include:

-   **`id`**: The address of the pool. It uniquely identifies the PanopticPool entity within the system.
-   **`txCount`**: The total transaction count for the pool. It represents the number of transactions that have occurred within this pool.
-   **`feeTier`**: The fee amount associated with the pool. In Uniswap V3, liquidity providers (LPs) earn fees from the trades executed in the pool. The **`feeTier`** indicates the fee percentage charged for trades in this particular pool.
-   **`token0`** and **`token1`**: These fields represent the two tokens involved in the pool. They likely reference the **`Token`** entity, which holds information about each token, such as its address, symbol, and other properties.
-   **`collateral0`** and **`collateral1`**: These fields represent the collateral entities for token 0 and token 1, respectively. The collateral entities are associated with each token and contain information about the collateralization of the tokens within the PanopticPool.
-   **`underlyingPool`**: This field represents the underlying pool. It refers to the Uniswap V3 pool on which the PanopticPool is built. The underlying pool provides the core functionality for token swaps and liquidity provision.
-   **`rareNftId`**: This field represents the ID of the Factory-issued rare Non-Fungible Token (NFT) that was minted as part of deploying the Panoptic pool. The rare NFT is associated with the PanopticPool and may have unique properties or characteristics.
-   **`rarity`**: This field indicates the rarity associated with the deployed PanopticPool. It represents a measure of the uniqueness or scarcity of the PanopticPool and could be related to the rarity of the associated rare NFT.

In summary, a PanopticPool is a specific type of pool in the DeFi system built over the Uniswap V3 protocol. It allows users to trade and provide liquidity for a pair of tokens (**`token0`** and **`token1`**) while earning fees. The PanopticPool incorporates collateral entities, tracks transaction counts, and may be associated with a rare NFT with a specific rarity level.

`**PoolDayData**`: Data accumulated and condensed into day stats for each pool.

-   **`id`**: A unique identifier for each **`PoolDayData`** entity.
-   **`pool`**: A reference to the corresponding **`Pool`** entity.
-   **`date`**: The timestamp rounded to the current day by dividing it by 86,400 (the number of seconds in a day).
-   **`txCount`**: The number of transactions that occurred during the specified period.
-   **`open`**: The opening price of **`token0`** at the beginning of the day.
-   **`high`**: The highest price of **`token0`** recorded during the day.
-   **`low`**: The lowest price of **`token0`** recorded during the day.
-   **`close`**: The closing price of **`token0`** at the end of the day.

`**PoolHourData**`: Data accumulated and condensed per hour stats for each pool.

-   **`id`**: A unique identifier for each **`PoolHourData`** entity.
-   **`pool`**: A reference to the corresponding **`Pool`** entity.
-   **`open`**: The opening price of **`token0`** at the beginning of the hour.
-   **`close`**: The closing price of **`token0`** at the end of the hour.
-   **`high`**: The highest price of **`token0`** recorded during the hour.
-   **`low`**: The lowest price of **`token0`** recorded during the hour.
-   **`txCount`**: The number of transactions that occurred during the specified hour.
-   **`periodStartUnix`**: The Unix timestamp indicating the start of the hour.

`**Mint`, `Collect`, `Burn`, `Roll`:** These entities represent different types of transactions related to liquidity management, such as minting, collecting, burning, and rolling liquidity. They contain information about the transaction ID, the amount of liquidity or tokens involved, the owner and sender of the transaction, associated chunks, the pool position, token0 and token1 indices, and the log index within the transaction.

`**OptionMint`, `OptionBurn`, `OptionRoll`**: These entities represent transactions specific to options trading. They contain information such as the transaction ID, the owner and sender of the transaction, the TokenId of the option, the position size, the tick at which the option was minted or burnt, commission rates, pool utilization, premiums, and the log index within the transaction.

**`Collateral`** Represents a collateral entity associated with a PanopticPool. Fields include:

-   **`id`**: The address of the CollateralTracker for the pool.
-   **`token`**: The address of the underlying token used as collateral.
-   **`totalAssets`**: The total asset supply of the collateral.
-   **`totalShares`**: The total supply of shares (receipts to claim assets).
-   **`inAMM`**: The amount of tokens in the Automated Market Maker (AMM).
-   **`poolUtilization`**: A percentage representing the pool utilization in the Panoptic pool versus the AMM pool.
-   **`panopticPool`**: The PanopticPool being collateralized.
-   **`index`**: Indicates whether this is collateralTracker0 or collateralTracker1 in its parent PanopticPool.

**`Liquidation`** Represents a liquidation event that occurs when an account is liquidated. Fields include:

-   **`id`**: Unique identifier for the liquidation event.
-   **`liquidatee`**: The account that was liquidated.
-   **`liquidator`**: The account that performed the liquidation.
-   **`tokenIds`**: The token IDs liquidated from the account.
-   **`bonusAmount0`**: A bonus amount associated with the liquidation, related to **`token0`**.
-   **`bonusAmount1`**: A bonus amount associated with the liquidation, related to **`token1`**.
-   **`transaction`**: Pointer to the transaction containing this liquidation.
-   **`logIndex`**: Order of the liquidation within the transaction.
-   **`panopticPool`**: The PanopticPool within which the liquidation occurred.
-   **`panopticPoolAccount`**: The PanopticPoolAccount affected by this liquidation.

**`Chunk`**: Represents a unit of liquidity within a PanopticPool

-   **`id`**: The **`id`** field uniquely identifies the chunk within the system. It is a concatenated string that contains various parameters such as **`poolAddress`**, **`owner`**, **`tokenType`**, **`tickLower`**, and **`tickUpper`**. This ID helps differentiate and locate specific chunks.
-   **`owner`**: The **`owner`** field represents the creator of the chunk. It refers to the account (e.g., NFPM Account) that initiated the creation of this liquidity chunk.
-   **`sender`**: The **`sender`** field refers to the account that initiated the transaction associated with this chunk. It represents the account responsible for the liquidity chunk's creation or modification.
-   **`tickLower`** and **`tickUpper`**: These fields represent the lower and upper tick boundaries of the position within the liquidity chunk. They define the range in which the liquidity is provided.
-   **`strike`**: The **`strike`** field represents the average value between **`tickLower`** and **`tickUpper`**. It is an arithmetic average used in the context of options or other financial instruments.
-   **`width`**: The **`width`** field represents the width of the liquidity chunk. It is calculated as **`(tickUpper - tickLower) / pool.tickSpacing`** and provides an indication of the size or spread of the chunk.
-   **`tokenType`**: The **`tokenType`** field indicates whether the liquidity chunk is associated with a put or call option. A value of 0 typically represents token0, while a value of 1 represents token1.
-   **`poolAddress`**: The **`poolAddress`** field contains the address of the PanopticPool in which the liquidity chunk is located.
-   **`netLiquidity`**, **`shortLiquidity`**, **`longLiquidity`**: These fields represent the different types of liquidity within the chunk. They indicate the net liquidity, short liquidity, and long liquidity associated with the chunk.
-   **`shortCounts`** and **`longCounts`**: These fields represent the total number of short positions and long positions, respectively, within the chunk.
-   **`totalLiquidity`**: The **`totalLiquidity`** field represents the overall total liquidity within the chunk. It combines the short and long liquidity.
-   **`legs`**: The **`legs`** field is a derived field that represents the legs created on this chunk of liquidity.