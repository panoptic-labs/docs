# Pool Utilization

Pool utilization is a fundamental metric that measures the ratio of borrowed assets to total assets in a CollateralTracker vault. This metric drives interest rates, collateral requirements, and is protected against manipulation through transient storage.

## Definition

Pool utilization represents how much of the pool's capital is currently deployed (borrowed by option sellers):

```
Utilization = (Assets in AMM + Unrealized Interest) / Total Assets
```

Where:
- **Assets in AMM**: Capital deployed to Uniswap for option positions (`s_assetsInAMM`)
- **Unrealized Interest**: Accrued but not yet collected interest
- **Total Assets**: `s_depositedAssets + s_assetsInAMM + unrealizedInterest`

## Utilization Scales

The protocol uses two scales for utilization:

### Basis Points (DECIMALS = 10,000)

Used for collateral ratio calculations:

```solidity
function _poolUtilizationView() internal view returns (uint256 poolUtilization) {
    return Math.mulDivRoundingUp(
        s_assetsInAMM + s_marketState.unrealizedInterest(),
        DECIMALS,  // 10,000
        totalAssets()
    );
}
```

**Example**: 50% utilization = 5,000

### WAD Scale (1e18)

Used for interest rate calculations:

```solidity
function _poolUtilizationWadView() internal view returns (uint256 poolUtilization) {
    return Math.mulDivRoundingUp(
        s_assetsInAMM + s_marketState.unrealizedInterest(),
        WAD,  // 1e18
        totalAssets()
    );
}
```

**Example**: 50% utilization = 0.5e18

## Flash Deposit Protection

A critical security mechanism prevents flash deposits from artificially lowering utilization within a single transaction.

### The Attack Vector

Without protection, an attacker could:
1. Flash loan a large amount of tokens
2. Deposit tokens (lowering utilization)
3. Open a position at artificially low collateral requirements
4. Withdraw tokens
5. Repay flash loan

### Transient Storage Solution

The protocol uses EIP-1153 transient storage to track the maximum utilization seen during a transaction:

```solidity
bytes32 internal constant UTILIZATION_TRANSIENT_SLOT =
    keccak256("panoptic.utilization.snapshot");

function _poolUtilization() internal returns (uint256 poolUtilization) {
    uint256 storedUtilization;
    bytes32 slot = UTILIZATION_TRANSIENT_SLOT;
    
    // Load stored utilization from transient storage
    assembly {
        storedUtilization := tload(slot)
    }
    
    // Calculate current utilization
    poolUtilization = _poolUtilizationView();
    
    // Return the HIGHER of stored vs current
    if (storedUtilization > poolUtilization) {
        return storedUtilization;
    } else {
        // Store current as new maximum
        assembly {
            tstore(slot, poolUtilization)
        }
        return poolUtilization;
    }
}
```

### How It Works

```
Transaction Start:
├─ Transient slot = 0
│
├─ Step 1: User deposits (utilization drops to 40%)
│  └─ Stored: 40%
│
├─ Step 2: User opens position (utilization = 60%)
│  └─ Stored: 60% (higher)
│
├─ Step 3: User tries flash deposit attack
│  ├─ Deposit: utilization calculation = 30%
│  ├─ But stored = 60%
│  └─ Returns: 60% (prevents manipulation)
│
Transaction End:
└─ Transient storage cleared automatically
```

### WAD Version

The same protection applies to WAD-scale utilization:

```solidity
function _poolUtilizationWad() internal returns (uint256) {
    uint256 storedUtilization;
    bytes32 slot = UTILIZATION_TRANSIENT_SLOT;
    
    assembly {
        storedUtilization := tload(slot)
    }
    
    // Convert stored value from DECIMALS to WAD
    storedUtilization = (storedUtilization * WAD) / DECIMALS;
    
    uint256 poolUtilization = _poolUtilizationWadView();
    
    if (storedUtilization > poolUtilization) {
        return storedUtilization;
    } else {
        // Store as DECIMALS for consistency
        assembly {
            tstore(slot, div(mul(poolUtilization, DECIMALS), WAD))
        }
        return poolUtilization;
    }
}
```

**Note**: The transient slot always stores the value in DECIMALS scale, with conversion happening at read/write time for the WAD version.

## Utilization Effects

### On Interest Rates

Higher utilization leads to higher interest rates (see [Interest Rate Model](./09-interest-rate-model.md)):

| Utilization | Effect on Rate |
|-------------|----------------|
| < Target (66.67%) | Below target rate |
| = Target (66.67%) | At target rate |
| > Target (66.67%) | Above target rate |
| Near 100% | Up to 4× target rate |

### On Collateral Requirements

Utilization affects both buyer and seller collateral ratios:

**Sellers** (via `_sellCollateralRatio`):
- Low utilization: Base ratio (e.g., 20%)
- High utilization: Up to 100%

**Buyers** (via `_buyCollateralRatio`):
- Low utilization: Base ratio (e.g., 10%)
- High utilization: Half base ratio (e.g., 5%)

See [Utilization and Ratios](./05-utilization-and-ratios.md) for complete details.

### On Cross-Margining

The cross-buffer ratio decreases with utilization:
- Low utilization: Full cross-margin benefit
- High utilization: No cross-margin benefit

## Pool Data Query

All utilization-related metrics can be queried via `getPoolData()`:

```solidity
function getPoolData() external view returns (
    uint256 depositedAssets,
    uint256 insideAMM,
    uint256 creditedShares,
    uint256 currentPoolUtilization
) {
    depositedAssets = s_depositedAssets;
    insideAMM = s_assetsInAMM;
    creditedShares = s_creditedShares;
    currentPoolUtilization = _poolUtilizationView();
}
```

## Asset Tracking

The CollateralTracker maintains three key asset-related state variables:

### `s_depositedAssets`

Cached amount of assets deposited by liquidity providers:

```solidity
uint128 internal s_depositedAssets;
```

Updated on:
- Deposits: `s_depositedAssets += assets`
- Withdrawals: `s_depositedAssets -= assets`
- Position changes: `s_depositedAssets = int256(s_depositedAssets) - ammDeltaAmount + realizedPremium`

### `s_assetsInAMM`

Amount currently deployed in Uniswap positions:

```solidity
uint128 internal s_assetsInAMM;
```

Updated on:
- Position creation: `s_assetsInAMM += shortAmount`
- Position closing: `s_assetsInAMM -= shortAmount`

### `s_creditedShares`

Shares representing long position collateral:

```solidity
uint256 internal s_creditedShares;
```

Updated on:
- Long position creation: `s_creditedShares += creditDelta`
- Long position closing: `s_creditedShares -= creditDelta`

## Total Supply Calculation

The total supply includes both user shares and credited shares:

```solidity
function totalSupply() public view returns (uint256) {
    return _internalSupply + s_creditedShares;
}
```

This affects share pricing and conversion calculations.

## Utilization Bounds

### Minimum (0%)

Occurs when no assets are deployed:
- `s_assetsInAMM = 0`
- `unrealizedInterest = 0`
- All capital is idle in the pool

### Maximum (Approaching 100%)

Occurs when nearly all assets are deployed:
- `s_assetsInAMM ≈ totalAssets`
- High interest rates discourage further borrowing
- Collateral requirements approach 100% for sellers

## View vs. State-Modifying Functions

| Function | Returns | Side Effects |
|----------|---------|--------------|
| `_poolUtilizationView()` | Current utilization (DECIMALS) | None |
| `_poolUtilizationWadView()` | Current utilization (WAD) | None |
| `_poolUtilization()` | Max(stored, current) (DECIMALS) | Updates transient storage |
| `_poolUtilizationWad()` | Max(stored, current) (WAD) | Updates transient storage |

**Usage**:
- View functions: For external queries and read-only calculations
- State-modifying functions: For operations that affect positions

## Summary

| Aspect | Description |
|--------|-------------|
| **Definition** | (AMM assets + interest) / total assets |
| **Scales** | DECIMALS (10,000) or WAD (1e18) |
| **Protection** | Transient storage prevents flash manipulation |
| **Effects** | Drives interest rates, collateral ratios, cross-margin |
| **Storage** | Maximum utilization persists within transaction |

The utilization system ensures:
1. Fair pricing based on actual demand
2. Protection against flash loan attacks
3. Consistent behavior within transactions
4. Proper incentives for liquidity balance
