# Fee Structure

The Panoptic Protocol charges fees on option minting and premium realization. These fees support protocol sustainability and can be shared with ecosystem builders through a referral system.

## Fee Types

### Commission Fee (Notional Fee)

The commission fee is charged when opening new positions, calculated as a percentage of the notional value:

```solidity
uint128 commission = uint256(int256(shortAmount) + int256(longAmount)).toUint128();
uint128 commissionFee = uint128(
    Math.mulDivRoundingUp(commission, riskParameters.notionalFee(), DECIMALS)
);
```

| Parameter | Description |
|-----------|-------------|
| `notionalFee` | Fee rate in basis points (e.g., 10 = 0.1%) |
| Base | Sum of all long and short notional amounts |
| Timing | Charged at position creation (mint) |

**Example**:
- Opening a position with 1,000 USDC notional
- Notional fee: 10 bps (0.1%)
- Commission: 1,000 × 0.001 = 1 USDC

### Premium Fee

The premium fee is charged when closing positions that have accumulated premium:

```solidity
uint128 commissionFeeP = uint128(
    Math.mulDivRoundingUp(commissionP, riskParameters.premiumFee(), DECIMALS)
);
```

| Parameter | Description |
|-----------|-------------|
| `premiumFee` | Fee rate on realized premium |
| Base | Absolute value of realized premium |
| Timing | Charged at position close (burn) |
| Cap | Limited to 10× the notional fee equivalent |

**Fee Cap Logic**:
```solidity
uint128 commissionFeeN = uint128(
    Math.mulDivRoundingUp(commissionN, 10 * riskParameters.notionalFee(), DECIMALS)
);
commissionFee = Math.min(commissionFeeP, commissionFeeN).toUint128();
```

This cap ensures fees remain reasonable even for highly profitable positions.

## Fee Distribution

Fees can be distributed in two ways depending on whether a builder code is present:

### Without Builder Code

When no builder code is associated with the transaction, fees are burned (removed from circulation):

```solidity
if (riskParameters.feeRecipient() == 0) {
    _burn(optionOwner, sharesToBurn);
    emit CommissionPaid(optionOwner, address(0), commissionFee, 0);
}
```

**Effect**: Burning shares increases the value of remaining shares, benefiting all liquidity providers.

### With Builder Code

When a valid builder code is present, fees are split between the protocol and the builder:

```solidity
_transferFrom(
    optionOwner,
    address(riskEngine()),
    (sharesToBurn * riskParameters.protocolSplit()) / DECIMALS
);
_transferFrom(
    optionOwner,
    address(uint160(riskParameters.feeRecipient())),
    (sharesToBurn * riskParameters.builderSplit()) / DECIMALS
);
```

| Recipient | Split | Purpose |
|-----------|-------|---------|
| Protocol (RiskEngine) | 65% (`PROTOCOL_SPLIT = 6,500`) | Protocol treasury |
| Builder Wallet | 25% (`BUILDER_SPLIT = 2,500`) | Builder rewards |
| Burned | 10% (remainder) | LP value accrual |

---

# Builder Wallet System

The Builder Wallet system enables ecosystem developers to earn a share of protocol fees by referring users to Panoptic.

## Overview

Builders are developers, integrators, or partners who build products on top of or integrate with Panoptic. When users interact with the protocol through a builder's interface, the builder receives a portion of the fees generated.

## Architecture

### Builder Factory

The `BuilderFactory` contract deploys Builder Wallets using CREATE2 for deterministic addresses:

```solidity
contract BuilderFactory {
    address public immutable OWNER;
    
    function deployBuilder(
        uint48 builderCode,
        address builderAdmin
    ) external onlyOwner returns (address wallet) {
        bytes32 salt = bytes32(uint256(builderCode));
        bytes memory initCode = abi.encodePacked(
            type(BuilderWallet).creationCode,
            abi.encode(address(this))
        );
        wallet = Create2Lib.deploy(0, salt, initCode);
        BuilderWallet(wallet).init(builderAdmin);
    }
}
```

**Key Features**:
- Only the factory owner can deploy new wallets
- Each builder code maps to exactly one wallet address
- Wallet addresses are deterministic and can be computed before deployment

### Builder Wallet

Each builder receives a dedicated wallet contract:

```solidity
contract BuilderWallet {
    address public immutable FACTORY;
    address public builderAdmin;
    
    function sweep(address token, address to) external {
        if (msg.sender != builderAdmin) revert Errors.NotBuilder();
        uint256 bal = IERC20(token).balanceOf(address(this));
        if (bal == 0) return;
        IERC20(token).transfer(to, bal);
    }
}
```

**Features**:
- Immutable factory reference for security
- Admin-controlled token sweeping
- Supports any ERC20 token

### Wallet Address Computation

The RiskEngine computes builder wallet addresses deterministically:

```solidity
function _computeBuilderWallet(uint256 builderCode) internal view returns (address wallet) {
    if (builderCode == 0) return address(0);
    
    bytes32 salt = bytes32(builderCode);
    bytes32 h = keccak256(
        abi.encodePacked(
            bytes1(0xff),
            BUILDER_FACTORY,
            salt,
            BUILDER_INIT_CODE_HASH
        )
    );
    wallet = address(uint160(uint256(h)));
}
```

This follows the standard CREATE2 address derivation formula.

### Wallet Validation

Before distributing fees, the protocol validates the builder wallet:

```solidity
function getFeeRecipient(uint256 builderCode) external view returns (address feeRecipient) {
    feeRecipient = _computeBuilderWallet(builderCode);
    
    // Enforce whitelist by checking contract exists
    if (builderCode != 0) {
        if (feeRecipient.code.length == 0) revert Errors.InvalidBuilderCode();
    }
}
```

This ensures:
- Only deployed wallets can receive fees
- Invalid builder codes revert rather than sending to uncontrolled addresses

## Builder Integration Flow

### 1. Builder Registration

```
Builder → Factory Owner: Request builder code
Factory Owner → BuilderFactory: deployBuilder(builderCode, builderAdmin)
BuilderFactory → BuilderWallet: Deploy at deterministic address
```

### 2. User Transaction with Builder Code

```
User → Protocol: Transaction with builderCode in calldata
Protocol → RiskEngine: getRiskParameters(tick, oraclePack, builderCode)
RiskEngine: Compute feeRecipient = _computeBuilderWallet(builderCode)
RiskEngine → Protocol: Return RiskParameters with feeRecipient
```

### 3. Fee Distribution

```
CollateralTracker: Calculate commission
CollateralTracker → RiskEngine: Transfer protocol share
CollateralTracker → BuilderWallet: Transfer builder share
```

### 4. Builder Withdrawal

```
Builder Admin → BuilderWallet: sweep(token, destination)
BuilderWallet → Destination: Transfer accumulated fees
```

## Fee Recipient in RiskParameters

The builder wallet address is embedded in the `RiskParameters` struct:

```solidity
function getRiskParameters(
    int24 currentTick,
    OraclePack oraclePack,
    uint256 builderCode
) external view returns (RiskParameters) {
    uint8 safeMode = isSafeMode(currentTick, oraclePack);
    uint128 feeRecipient = uint256(uint160(_computeBuilderWallet(builderCode))).toUint128();
    
    return RiskParametersLibrary.storeRiskParameters(
        safeMode,
        NOTIONAL_FEE,
        PREMIUM_FEE,
        PROTOCOL_SPLIT,
        BUILDER_SPLIT,
        MAX_TWAP_DELTA_LIQUIDATION,
        MAX_SPREAD,
        BP_DECREASE_BUFFER,
        MAX_OPEN_LEGS,
        feeRecipient
    );
}
```

## Security Considerations

### Deterministic Addresses

Using CREATE2 ensures:
- Wallet addresses are known before deployment
- No front-running of wallet creation
- Consistent addresses across chains (with same factory)

### Admin Controls

- Only the designated `builderAdmin` can withdraw funds
- Admin is set at initialization and cannot be changed
- Factory owner controls wallet deployment

### Validation

- Builder codes must correspond to deployed wallets
- Zero builder code results in fee burning (no builder share)
- Invalid codes cause transaction revert

## Summary

| Component | Purpose |
|-----------|---------|
| **Notional Fee** | Commission on position creation |
| **Premium Fee** | Fee on realized premium (capped) |
| **Protocol Split** | 65% of fees to protocol |
| **Builder Split** | 25% of fees to builder |
| **Builder Factory** | Deploys deterministic wallets |
| **Builder Wallet** | Accumulates and allows withdrawal of builder fees |
