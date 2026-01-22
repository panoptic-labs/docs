# BuilderWallet
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/RiskEngine.sol)


## State Variables
### FACTORY

```solidity
address public immutable FACTORY
```


### builderAdmin

```solidity
address public builderAdmin
```


## Functions
### constructor


```solidity
constructor(address factory) ;
```

### init


```solidity
function init(address _builderAdmin) external;
```

### sweep


```solidity
function sweep(address token, address to) external;
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

