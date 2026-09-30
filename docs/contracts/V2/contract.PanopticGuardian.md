# PanopticGuardian

> Source reference for public revision `e3b9d12`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).

[Git Source](https://github.com/panoptic-labs/panoptic-v2-core/blob/e3b9d125f929a5a8c7220ec6467613686939edae/contracts/PanopticGuardian.sol)

PanopticGuardian contract for Panoptic RiskEngines and their shared BuilderFactory.

Locking is immediate for the guardian admin and authorized builder admins. Unlocking is
delayed by a fixed timelock and reserved to the guardian admin. The contract also owns the
canonical BuilderFactory and exposes a separate treasurer-only token collection path.
The `GUARDIAN_ADMIN` and `TREASURER` addresses are immutable. This
prevents governance attacks but means key compromise or factory bugs require redeploying
the PanopticGuardian. Existing RiskEngine instances cannot change their immutable `GUARDIAN` pointer;
operators must replace the affected engines and migrate their pools and positions/state to the replacements.
Both `GUARDIAN_ADMIN` and `TREASURER`
should be multisig wallets with appropriate signer thresholds to mitigate this risk.


## State Variables
### GUARDIAN_ADMIN
Immutable guardian admin allowed to lock, unlock, revoke builders, and deploy wallets.


```solidity
address public immutable GUARDIAN_ADMIN
```


### TREASURER
Immutable treasurer allowed to collect tokens from RiskEngines.


```solidity
address public immutable TREASURER
```


### builderAdminRevoked
Tracks whether a builder admin's lock authority has been revoked.


```solidity
mapping(address => bool) public builderAdminRevoked
```


### unlockEta
Pending unlock execution timestamp by pool. Zero means no pending unlock.


```solidity
mapping(PanopticPoolV2 => uint256) public unlockEta
```


### UNLOCK_DELAY
Fixed delay before a requested unlock can be executed.


```solidity
uint256 public constant UNLOCK_DELAY = 1 hours
```


## Functions
### constructor

Creates a new guardian.


```solidity
constructor(address guardianAdmin, address treasurer) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`guardianAdmin`|`address`|The immutable guardian admin address.|
|`treasurer`|`address`|The immutable treasurer address.|


### onlyGuardianAdmin

Restricts a function to the guardian admin.


```solidity
modifier onlyGuardianAdmin() ;
```

### _onlyGuardianAdmin


```solidity
function _onlyGuardianAdmin() internal view;
```

### onlyTreasurer

Restricts a function to the treasurer.


```solidity
modifier onlyTreasurer() ;
```

### _onlyTreasurer


```solidity
function _onlyTreasurer() internal view;
```

### lockPool

LOCKS

Instantly locks a pool as the guardian admin.

Any pending unlock is cancelled before the RiskEngine call.


```solidity
function lockPool(PanopticPoolV2 pool) external onlyGuardianAdmin;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool to lock.|


### lockPoolAsBuilder

Allows a non-revoked builder admin to lock a pool through its RiskEngine.

Builder lock authority is intentionally scoped to the target pool's RiskEngine,
not to any single pool. Once `builderCode` resolves to a canonical builder wallet on
that RiskEngine and `msg.sender` is confirmed as its admin, the caller may lock any
pool served by that RiskEngine. This broad scope is deliberate to maximize emergency
responsiveness across markets sharing the same guardian / RiskEngine deployment.
Unlike `lockPool`, this function intentionally does NOT cancel pending unlocks.
Builder locks are subordinate to the guardian admin's unlock lifecycle: if a pending
unlock exists, it remains active and can still be executed once its ETA matures. This
ensures a builder cannot unilaterally block the guardian admin's unlock schedule. The
guardian admin retains full authority to cancel, execute, or re-request unlocks
regardless of builder-initiated locks.


```solidity
function lockPoolAsBuilder(PanopticPoolV2 pool, uint256 builderCode) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool to lock.|
|`builderCode`|`uint256`|The builder code used to resolve the caller's canonical wallet.|


### requestUnlock

Starts the unlock timelock for a pool.


```solidity
function requestUnlock(PanopticPoolV2 pool) external onlyGuardianAdmin;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool scheduled for unlock.|


### executeUnlock

Executes a matured unlock request.

Clears the pending unlock before calling out to the RiskEngine.


```solidity
function executeUnlock(PanopticPoolV2 pool) external onlyGuardianAdmin;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool to unlock.|


### cancelUnlock

Cancels a pending unlock request.


```solidity
function cancelUnlock(PanopticPoolV2 pool) external onlyGuardianAdmin;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool whose pending unlock should be cancelled.|


### setBuilderAdminRevoked

Revokes or restores a builder admin's lock authority.


```solidity
function setBuilderAdminRevoked(address admin, bool revoked) external onlyGuardianAdmin;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`admin`|`address`|The builder admin to update.|
|`revoked`|`bool`|True to revoke the admin, false to restore it.|


### deployBuilder

DEPLOY BUILDER WALLET

Deploys the canonical builder wallet for a builder code.


```solidity
function deployBuilder(uint256 builderCode, address builderAdmin, BuilderFactory builderFactory)
    external
    onlyGuardianAdmin
    returns (address wallet);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`builderCode`|`uint256`|The builder code to deploy.|
|`builderAdmin`|`address`|The admin that will control the deployed wallet.|
|`builderFactory`|`BuilderFactory`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`wallet`|`address`|The deployed wallet address.|


### collect

PROTOCOL FEE

Collects tokens from a RiskEngine to a recipient.

When `amount` is zero, the guardian snapshots the RiskEngine's token balance before
calling the full-balance collect overload, and emits that pre-collect balance as the
collected amount. The actual transfer is governed entirely by the RiskEngine, so the
emitted value may differ from the real delta for fee-on-transfer tokens or if the
RiskEngine's balance changes between the snapshot and the transfer.


```solidity
function collect(IRiskEngine riskEngine, address token, address recipient, uint256 amount) external onlyTreasurer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`riskEngine`|`IRiskEngine`|The RiskEngine to collect from.|
|`token`|`address`|The token to collect.|
|`recipient`|`address`|The recipient of the collected tokens.|
|`amount`|`uint256`|The amount to collect, or zero for the full-balance path.|


### isBuilderAdmin

READS

Returns whether an account is an authorized, non-revoked builder admin.


```solidity
function isBuilderAdmin(address account, PanopticPoolV2 pool, uint256 builderCode) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account to check.|
|`pool`|`PanopticPoolV2`|The pool whose RiskEngine is used for builder validation.|
|`builderCode`|`uint256`|The builder code used to resolve the canonical wallet.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the account is an authorized builder admin.|


### isPoolUnlockReady

Returns whether a pool's pending unlock is ready to execute.


```solidity
function isPoolUnlockReady(PanopticPoolV2 pool) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if a pending unlock exists and its ETA has passed.|


### _isAuthorizedBuilder

Returns whether a caller is an authorized builder admin for a RiskEngine.

Builder authorization is resolved through the RiskEngine's canonical fee-recipient
derivation for `builderCode`, then checked against the builder wallet's recorded admin.


```solidity
function _isAuthorizedBuilder(address caller, IRiskEngine riskEngine, uint256 builderCode)
    internal
    view
    returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`caller`|`address`|The account to check.|
|`riskEngine`|`IRiskEngine`|The RiskEngine used to resolve the canonical builder wallet.|
|`builderCode`|`uint256`|The builder code to resolve.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the caller is an authorized, non-revoked builder admin.|


### _balanceOfOrZero

Returns an ERC20 balance, or zero if the token call fails or returns malformed data.


```solidity
function _balanceOfOrZero(address token, address account) internal view returns (uint256 balance);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The token to query.|
|`account`|`address`|The account whose balance should be queried.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|The account balance, or zero if the query fails.|


### _getRiskEngine

Returns the RiskEngine address embedded in a pool's immutable clone arguments.


```solidity
function _getRiskEngine(PanopticPoolV2 pool) internal pure returns (IRiskEngine riskEngine);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool to inspect.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`riskEngine`|`IRiskEngine`|The pool's RiskEngine.|


### _clearPendingUnlock

Cancels a pending unlock if one exists.


```solidity
function _clearPendingUnlock(PanopticPoolV2 pool) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool whose pending unlock should be cleared.|


## Events
### PoolLocked
Emitted when a pool is locked.


```solidity
event PoolLocked(PanopticPoolV2 indexed pool, address indexed locker);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The locked pool.|
|`locker`|`address`|The account that initiated the lock.|

### UnlockRequested
Emitted when an unlock request is started.


```solidity
event UnlockRequested(PanopticPoolV2 indexed pool, uint256 eta);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool scheduled for unlock.|
|`eta`|`uint256`|The timestamp at which the unlock becomes executable.|

### PoolUnlocked
Emitted when a pool is unlocked.


```solidity
event PoolUnlocked(PanopticPoolV2 indexed pool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The unlocked pool.|

### UnlockCancelled
Emitted when a pending unlock is cancelled.


```solidity
event UnlockCancelled(PanopticPoolV2 indexed pool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`PanopticPoolV2`|The pool whose pending unlock was cancelled.|

### BuilderAdminRevoked
Emitted when a builder admin is revoked.


```solidity
event BuilderAdminRevoked(address indexed admin);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`admin`|`address`|The revoked builder admin.|

### BuilderAdminRestored
Emitted when a builder admin is restored.


```solidity
event BuilderAdminRestored(address indexed admin);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`admin`|`address`|The restored builder admin.|

### BuilderDeployed
Emitted when a canonical builder wallet is deployed.


```solidity
event BuilderDeployed(uint256 indexed builderCode, address indexed wallet);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`builderCode`|`uint256`|The builder code used for deployment.|
|`wallet`|`address`|The deployed wallet address.|

### TokensCollected
Emitted when tokens are collected from a RiskEngine.


```solidity
event TokensCollected(address indexed token, address indexed recipient, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The collected token.|
|`recipient`|`address`|The recipient of the collected tokens.|
|`amount`|`uint256`|The amount transferred out of the RiskEngine.|

## Errors
### NotGuardianAdmin
Reverts when the caller is not the immutable guardian admin.


```solidity
error NotGuardianAdmin();
```

### NotTreasurer
Reverts when the caller is not the immutable treasurer.


```solidity
error NotTreasurer();
```

### NotAuthorizedBuilder
Reverts when the caller is not a non-revoked builder admin for the given builder code.


```solidity
error NotAuthorizedBuilder();
```

### ZeroAddress
Reverts when a required address argument is the zero address.


```solidity
error ZeroAddress();
```

### InvalidBuilderCode
Reverts when a builder code is zero or outside the supported range.


```solidity
error InvalidBuilderCode();
```

### UnlockAlreadyPending
Reverts when an unlock request already exists for the pool.


```solidity
error UnlockAlreadyPending();
```

### PoolNotLocked
Reverts when an unlock request is done on a pool that's not locked.


```solidity
error PoolNotLocked();
```

### NotFactoryAdmin
Reverts when the Guardian is not the builder factory admin.


```solidity
error NotFactoryAdmin();
```

### NoPendingUnlock
Reverts when no unlock request exists for the pool.


```solidity
error NoPendingUnlock();
```

### UnlockNotReady
Reverts when an unlock is executed before its timelock expires.


```solidity
error UnlockNotReady(uint256 eta);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`eta`|`uint256`|The timestamp at which the unlock becomes executable.|
