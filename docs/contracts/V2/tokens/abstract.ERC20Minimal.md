# ERC20Minimal
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/tokens/ERC20Minimal.sol)

**Title:**
Minimal efficient ERC20 implementation without metadata

**Authors:**
Axicon Labs Limited, Modified from Solmate (https://github.com/transmissions11/solmate/blob/v7/src/tokens/ERC20.sol)

The metadata must be set in the inheriting contract.

Do not manually set balances without updating _internalSupply, as the sum of all user balances must not exceed it.


## State Variables
### _internalSupply
The internal supply of tokens.

This cannot exceed the max uint256 value.


```solidity
uint256 internal _internalSupply
```


### balanceOf
Token balances for each user.


```solidity
mapping(address account => uint256 balance) public balanceOf
```


### allowance
Stored allowances for each user.

Indexed by owner, then by spender.


```solidity
mapping(address owner => mapping(address spender => uint256 allowance)) public allowance
```


## Functions
### approve

Approves a user to spend tokens on the caller's behalf.


```solidity
function approve(address spender, uint256 amount) public returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|The user to approve|
|`amount`|`uint256`|The amount of tokens to approve|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the approval succeeded|


### transfer

Transfers tokens from the caller to another user.


```solidity
function transfer(address to, uint256 amount) public virtual returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The user to transfer tokens to|
|`amount`|`uint256`|The amount of tokens to transfer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the transfer succeeded|


### transferFrom

Transfers tokens from one user to another.

Supports token approvals.


```solidity
function transferFrom(address from, address to, uint256 amount) public virtual returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The user to transfer tokens from|
|`to`|`address`|The user to transfer tokens to|
|`amount`|`uint256`|The amount of tokens to transfer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the transfer succeeded|


### _transferFrom

Internal utility to transfer tokens from one user to another.


```solidity
function _transferFrom(address from, address to, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The user to transfer tokens from|
|`to`|`address`|The user to transfer tokens to|
|`amount`|`uint256`|The amount of tokens to transfer|


### _mint

Internal utility to mint tokens to a user's account.


```solidity
function _mint(address to, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The user to mint tokens to|
|`amount`|`uint256`|The amount of tokens to mint|


### _burn

Internal utility to burn tokens from a user's account.


```solidity
function _burn(address from, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The user to burn tokens from|
|`amount`|`uint256`|The amount of tokens to burn|


## Events
### Transfer
Emitted when tokens are transferred.


```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The sender of the tokens|
|`to`|`address`|The recipient of the tokens|
|`amount`|`uint256`|The amount of tokens transferred|

### Approval
Emitted when a user approves another user to spend tokens on their behalf.


```solidity
event Approval(address indexed owner, address indexed spender, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The user who approved the spender|
|`spender`|`address`|The user who was approved to spend tokens|
|`amount`|`uint256`|The amount of tokens approved to spend|

