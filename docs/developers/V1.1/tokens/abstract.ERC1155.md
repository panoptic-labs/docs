# ERC1155
[Git Source](https://github.com/panoptic-labs/panoptic-v1-core/blob/v1.1.x/contracts/tokens/ERC1155Minimal.sol)

**Authors:**
Axicon Labs Limited, Modified from Solmate (https://github.com/transmissions11/solmate/blob/v7/src/tokens/ERC1155.sol)

*Not compliant to the letter, does not include any metadata functionality.*


## State Variables
### balanceOf
Token balances for each user.

*Indexed by user, then by token id.*


```solidity
mapping(address account => mapping(uint256 tokenId => uint256 balance)) public balanceOf;
```


### isApprovedForAll
Approved addresses for each user.

*Indexed by user, then by operator.*

*Operator is approved to transfer all tokens on behalf of user.*


```solidity
mapping(address owner => mapping(address operator => bool approvedForAll)) public isApprovedForAll;
```


## Functions
### setApprovalForAll

Approve or revoke approval for `operator` to transfer all tokens on behalf of the caller.


```solidity
function setApprovalForAll(address operator, bool approved) public;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator`|`address`|The address to approve or revoke approval for|
|`approved`|`bool`|True to approve, false to revoke approval|


### safeTransferFrom

Transfer a single token from one user to another.

*Supports approved token transfers.*


```solidity
function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) public virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The user to transfer tokens from|
|`to`|`address`|The user to transfer tokens to|
|`id`|`uint256`|The ERC1155 token id to transfer|
|`amount`|`uint256`|The amount of tokens to transfer|
|`data`|`bytes`|Optional data to include in the `onERC1155Received` hook|


### safeBatchTransferFrom

Transfer multiple tokens from one user to another.

*Supports approved token transfers.*

*`ids` and `amounts` must be of equal length.*


```solidity
function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] calldata ids,
    uint256[] calldata amounts,
    bytes calldata data
) public virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The user to transfer tokens from|
|`to`|`address`|The user to transfer tokens to|
|`ids`|`uint256[]`|The ERC1155 token ids to transfer|
|`amounts`|`uint256[]`|The amounts of tokens to transfer|
|`data`|`bytes`|Optional data to include in the `onERC1155Received` hook|


### balanceOfBatch

Query balances for multiple users and tokens at once.

*`owners` and `ids` should be of equal length.*


```solidity
function balanceOfBatch(address[] calldata owners, uint256[] calldata ids)
    public
    view
    returns (uint256[] memory balances);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owners`|`address[]`|The list of users to query balances for|
|`ids`|`uint256[]`|The list of ERC1155 token ids to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balances`|`uint256[]`|The balances for each owner-id pair in the same order as the input arrays|


### supportsInterface

Signal support for ERC165 and ERC1155.


```solidity
function supportsInterface(bytes4 interfaceId) public pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`interfaceId`|`bytes4`|The interface to check for support|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the interface is supported|


### _mint

Internal utility to mint tokens to a user's account.


```solidity
function _mint(address to, uint256 id, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The user to mint tokens to|
|`id`|`uint256`|The ERC1155 token id to mint|
|`amount`|`uint256`|The amount of tokens to mint|


### _burn

Internal utility to burn tokens from a user's account.


```solidity
function _burn(address from, uint256 id, uint256 amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The user to burn tokens from|
|`id`|`uint256`|The ERC1155 token id to mint|
|`amount`|`uint256`|The amount of tokens to burn|


## Events
### TransferSingle
Emitted when only a single token is transferred.


```solidity
event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator`|`address`|The user who initiated the transfer|
|`from`|`address`|The user who sent the tokens|
|`to`|`address`|The user who received the tokens|
|`id`|`uint256`|The ERC1155 token id|
|`amount`|`uint256`|The amount of tokens transferred|

### TransferBatch
Emitted when multiple tokens are transferred from one user to another.


```solidity
event TransferBatch(
    address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] amounts
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator`|`address`|The user who initiated the transfer|
|`from`|`address`|The user who sent the tokens|
|`to`|`address`|The user who received the tokens|
|`ids`|`uint256[]`|The ERC1155 token ids|
|`amounts`|`uint256[]`|The amounts of tokens transferred|

### ApprovalForAll
Emitted when the approval status of an operator to transfer all tokens on behalf of a user is modified.


```solidity
event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The user who approved or disapproved `operator` to transfer their tokens|
|`operator`|`address`|The user who was approved or disapproved to transfer all tokens on behalf of `owner`|
|`approved`|`bool`|Whether `operator` is approved or disapproved to transfer all tokens on behalf of `owner`|

## Errors
### NotAuthorized
Emitted when a user attempts to transfer tokens they do not own nor are approved to transfer.


```solidity
error NotAuthorized();
```

### UnsafeRecipient
Emitted when an attempt is made to initiate a transfer to a contract recipient that fails to signal support for ERC1155.


```solidity
error UnsafeRecipient();
```

