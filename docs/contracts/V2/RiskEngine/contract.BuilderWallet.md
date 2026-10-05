---
sidebar_label: "BuilderWallet"
title: "BuilderWallet (V2)"
---
# BuilderWallet (V2)

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/Builder.sol)


## State Variables
### BUILDER_FACTORY

```solidity
address public immutable BUILDER_FACTORY
```


### builderAdmin

```solidity
address public builderAdmin
```


## Functions
### constructor

Constructs a new BuilderWallet instance


```solidity
constructor(address builderFactory) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`builderFactory`|`address`|The address of the BuilderFactory contract that deployed this wallet|


### init

Initializes the builder wallet with a builder admin address

Can only be called once. Reverts if already initialized or if _builderAdmin is the zero address


```solidity
function init(address _builderAdmin) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_builderAdmin`|`address`|The address that will be set as the builder admin with permission to sweep tokens|


### sweep

Transfers all tokens of a given type from this wallet to a specified address

Only callable by the builder admin. Emits TokensSwept event even if balance is zero


```solidity
function sweep(address token, address to) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token to sweep from the wallet|
|`to`|`address`|The destination address to receive the swept tokens|


### execute

Executes an arbitrary call from this wallet

Only callable by the builder admin


```solidity
function execute(address target, uint256 value, bytes calldata data) external returns (bytes memory result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`target`|`address`|The address to call|
|`value`|`uint256`|The amount of ETH to send with the call|
|`data`|`bytes`|The calldata to send to the target|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`bytes`|The return data from the call|


### isValidSignature

Validates a signature according to ERC-1271

Handles both EOA and smart contract admins via SignatureChecker


```solidity
function isValidSignature(bytes32 hash, bytes calldata signature) external view returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hash`|`bytes32`|The hash of the data being signed|
|`signature`|`bytes`|The signature bytes|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|magicValue 0x1626ba7e if valid, 0xffffffff if invalid|


### receive

Allows the wallet to receive ETH


```solidity
receive() external payable;
```

## Events
### BuilderWalletInitialized
Emitted when the builder wallet is initialized


```solidity
event BuilderWalletInitialized(address indexed builderAdmin);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`builderAdmin`|`address`|The address of the builder admin|

### TokensSwept
Emitted when tokens are swept from the wallet


```solidity
event TokensSwept(address indexed token, address indexed to, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token swept|
|`to`|`address`|The address that received the tokens|
|`amount`|`uint256`|The amount of tokens swept|

### Executed
Emitted when a call is executed from the wallet


```solidity
event Executed(address indexed target, uint256 value, bytes data);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`target`|`address`|The address of the contract called|
|`value`|`uint256`|The amount of ETH sent with the call|
|`data`|`bytes`|The calldata sent to the target|
