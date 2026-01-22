# BuilderFactory
[Git Source](https://github.com/panoptic-labs/panoptic-next-core-private/blob/8cb6912a84b43ed5df88c9b5bd34535204453dc5/contracts/RiskEngine.sol)


## State Variables
### OWNER

```solidity
address public immutable OWNER
```


## Functions
### constructor


```solidity
constructor(address owner) ;
```

### onlyOwner


```solidity
modifier onlyOwner() ;
```

### _onlyOwner


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

