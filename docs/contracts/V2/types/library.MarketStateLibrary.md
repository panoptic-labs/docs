# MarketStateLibrary
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/types/MarketState.sol)

**Title:**
A Panoptic Market State. Tracks the data of a given CollateralTracker market.

**Author:**
Axicon Labs Limited


## State Variables
### BORROW_INDEX_MASK

```solidity
uint256 internal constant BORROW_INDEX_MASK = (1 << 80) - 1
```


### EPOCH_MASK

```solidity
uint256 internal constant EPOCH_MASK = ((1 << 32) - 1) << 80
```


### TARGET_RATE_MASK

```solidity
uint256 internal constant TARGET_RATE_MASK = ((1 << 38) - 1) << 112
```


### UNREALIZED_INTEREST_MASK

```solidity
uint256 internal constant UNREALIZED_INTEREST_MASK =
    0xFFFFFFFFFFFFFFFFFFFFFFFFFFC0000000000000000000000000000000000000
```


## Functions
### storeMarketState

Create a new `MarketState` object.


```solidity
function storeMarketState(
    uint256 _borrowIndex,
    uint256 _marketEpoch,
    uint256 _rateAtTarget,
    uint256 _unrealizedInterest
) internal pure returns (MarketState result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_borrowIndex`|`uint256`|The global index (uint80)|
|`_marketEpoch`|`uint256`|The market's epoch (uint32)|
|`_rateAtTarget`|`uint256`|The rateAtTarget (uint38)|
|`_unrealizedInterest`|`uint256`|The unrealized interest (uint106)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`MarketState`|The new MarketState object|


### updateBorrowIndex

Update the Global Borrow Index (Lowest 80 bits)


```solidity
function updateBorrowIndex(MarketState self, uint80 newIndex) internal pure returns (MarketState result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`MarketState`|The MarketState to update|
|`newIndex`|`uint80`|The new borrow index value|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`MarketState`|The updated MarketState with the new borrow index|


### updateMarketEpoch

Update the Market Epoch (Bits 80-111)


```solidity
function updateMarketEpoch(MarketState self, uint32 newEpoch) internal pure returns (MarketState result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`MarketState`|The MarketState to update|
|`newEpoch`|`uint32`|The new market epoch value|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`MarketState`|The updated MarketState with the new market epoch|


### updateRateAtTarget

Update the Rate At Target (Bits 112-149)


```solidity
function updateRateAtTarget(MarketState self, uint40 newRate) internal pure returns (MarketState result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`MarketState`|The MarketState to update|
|`newRate`|`uint40`|The new rate at target value|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`MarketState`|The updated MarketState with the new rate at target|


### updateUnrealizedInterest

Update the Unrealized Interest (Bits 150-255)


```solidity
function updateUnrealizedInterest(MarketState self, uint128 newInterest)
    internal
    pure
    returns (MarketState result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`MarketState`|The MarketState to update|
|`newInterest`|`uint128`|The new unrealized interest value|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`MarketState`|The updated MarketState with the new unrealized interest|


### borrowIndex

Get the borrowIndex of `self`.


```solidity
function borrowIndex(MarketState self) internal pure returns (uint80 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`MarketState`|The MarketState to retrieve the borrowIndex state from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint80`|The borrowIndex of `self`|


### marketEpoch

Get the marketEpoch of `self`.


```solidity
function marketEpoch(MarketState self) internal pure returns (uint32 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`MarketState`|The MarketState to retrieve the marketEpoch from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint32`|The marketEpoch of `self`|


### rateAtTarget

Get the rateAtTarget of `self`.


```solidity
function rateAtTarget(MarketState self) internal pure returns (uint40 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`MarketState`|The MarketState to retrieve the rateAtTarget from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint40`|The rateAtTarget of `self`|


### unrealizedInterest

Get the unrealizedInterest of `self`.


```solidity
function unrealizedInterest(MarketState self) internal pure returns (uint128 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`MarketState`|The MarketState to retrieve the unrealizedInterest from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint128`|The unrealizedInterest of `self`|


