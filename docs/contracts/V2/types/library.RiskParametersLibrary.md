# RiskParametersLibrary
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/types/RiskParameters.sol)

**Title:**
A Panoptic Risk Parameters. Tracks the data outputted from the RiskEngine, like the safeMode, commission fees, (etc).

**Author:**
Axicon Labs Limited


## Functions
### storeRiskParameters

Create a new `RiskParameters` object.


```solidity
function storeRiskParameters(
    uint256 _safeMode,
    uint256 _notionalFee,
    uint256 _premiumFee,
    uint256 _protocolSplit,
    uint256 _builderSplit,
    uint256 _tickDeltaDispatch,
    uint256 _maxSpread,
    uint256 _bpDecreaseBuffer,
    uint256 _maxLegs,
    uint256 _feeRecipient
) internal pure returns (RiskParameters result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_safeMode`|`uint256`|The safe mode state (uint6)|
|`_notionalFee`|`uint256`|The commission fee (uint14)|
|`_premiumFee`|`uint256`|The commission fee (uint14)|
|`_protocolSplit`|`uint256`|The part of the fee that goes to the protocol w/ buildercodes (uint14)|
|`_builderSplit`|`uint256`|The part of the fee that goes to the builder w/ buildercodes (uint14)|
|`_tickDeltaDispatch`|`uint256`|The MAX_TWAP_DELTA_DISPATCH (uint16)|
|`_maxSpread`|`uint256`|The MAX_SPREAD, in bps (uint24)|
|`_bpDecreaseBuffer`|`uint256`|The BP_DECREASE_BUFFER, in millitick (uint26)|
|`_maxLegs`|`uint256`|The maximum allowed number of legs across all open positions for a user|
|`_feeRecipient`|`uint256`|The recipient of the commission fee split (uint128)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`RiskParameters`|The new RiskParameters object|


### safeMode

Get the safeMode state of `self`.


```solidity
function safeMode(RiskParameters self) internal pure returns (uint8 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the safeMode state from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint8`|The safeMode of `self`|


### notionalFee

Get the notionalFee of `self`.


```solidity
function notionalFee(RiskParameters self) internal pure returns (uint16 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the notionalFee from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint16`|The notionalFee of `self`|


### premiumFee

Get the premiumFee of `self`.


```solidity
function premiumFee(RiskParameters self) internal pure returns (uint16 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the premiumFee from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint16`|The premiumFee of `self`|


### protocolSplit

Get the protocolSplit of `self`.


```solidity
function protocolSplit(RiskParameters self) internal pure returns (uint16 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the protocolSplit from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint16`|The protocolSplit of `self`|


### builderSplit

Get the builderSplit of `self`.


```solidity
function builderSplit(RiskParameters self) internal pure returns (uint16 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the builderSplit from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint16`|The builderSplit of `self`|


### tickDeltaDispatch

Get the tickDeltaDispatch of `self`.


```solidity
function tickDeltaDispatch(RiskParameters self) internal pure returns (uint16 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the tickDeltaDispatch from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint16`|The tickDeltaDispatch of `self`|


### maxSpread

Get the maxSpread of `self`.


```solidity
function maxSpread(RiskParameters self) internal pure returns (uint24 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the maxSpread from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint24`|The maxSpread of `self`|


### bpDecreaseBuffer

Get the bpDecreaseBuffer of `self`.


```solidity
function bpDecreaseBuffer(RiskParameters self) internal pure returns (uint32 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the bpDecreaseBuffer from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint32`|The bpDecreaseBuffer of `self`|


### maxLegs

Get the maxLegs of `self`.


```solidity
function maxLegs(RiskParameters self) internal pure returns (uint8 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the maxLegs from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint8`|The maxLegs of `self`|


### feeRecipient

Get the feeRecipient of `self`.


```solidity
function feeRecipient(RiskParameters self) internal pure returns (uint128 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`RiskParameters`|The RiskParameters to retrieve the feeRecipient from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint128`|The feeRecipient of `self`|


