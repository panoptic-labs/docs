# BuilderFactory

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/Builder.sol)


## State Variables
### OWNER

```solidity
address public immutable OWNER
```


## Functions
### constructor

Constructs a new BuilderFactory instance

Reverts if owner is the zero address


```solidity
constructor(address owner) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that will have permission to deploy new builder wallets|


### onlyOwner

Modifier function to check if caller is the factory owner


```solidity
modifier onlyOwner() ;
```

### _onlyOwner

Internal function to check if caller is the factory owner

Reverts with "NOT_OWNER" if msg.sender is not the OWNER


```solidity
function _onlyOwner() internal view;
```

### deployBuilder

Deploys a BuilderWallet contract using CREATE2.


```solidity
function deployBuilder(uint48 builderCode, address builderAdmin) external onlyOwner returns (address wallet);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`builderCode`|`uint48`|The uint256 used as the CREATE2 salt (must match caller's referral code).|
|`builderAdmin`|`address`|The EOA/multisig allowed to sweep tokens from the wallet.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`wallet`|`address`|The deployed wallet address (deterministic).|


### predictBuilderWallet

Computes the CREATE2 address for (builderCode, builderAdmin).

Must match the formula used in the RiskEngine.


```solidity
function predictBuilderWallet(uint48 builderCode) external view returns (address);
```

## Events
### BuilderWalletDeployed
Emitted when a new builder wallet is deployed


```solidity
event BuilderWalletDeployed(uint48 indexed builderCode, address indexed wallet, address indexed builderAdmin);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`builderCode`|`uint48`|The builder code used as salt|
|`wallet`|`address`|The address of the deployed wallet|
|`builderAdmin`|`address`|The admin address for the wallet|
