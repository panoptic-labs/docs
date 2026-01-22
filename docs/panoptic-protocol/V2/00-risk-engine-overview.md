# Risk Engine Overview

The Risk Engine is the central risk assessment and solvency calculator for the Panoptic Protocol. It serves as the mathematical framework that governs position safety, collateral requirements, and liquidation parameters across the entire protocol.

## Purpose

The Risk Engine does not hold funds or manage user balances directly. Instead, it provides the computational logic for:

- **Collateral Requirement Calculations**: Determining how much collateral is needed for various option strategies including spreads, strangles, synthetic positions, and more
- **Account Solvency Verification**: Checking whether accounts maintain sufficient collateral to support their open positions
- **Oracle Price Management**: Utilizing volatility safeguards, exponential moving averages (EMAs), and median filters to provide manipulation-resistant pricing
- **Liquidation Parameters**: Computing bonuses and costs associated with liquidations and force exercises
- **Interest Rate Computation**: Calculating adaptive borrow rates based on pool utilization using a PID controller

## Core Components

The Risk Engine comprises several interconnected systems:

### [Oracle System](./01-oracle-system.md)
The protocol's internal price oracle uses a sophisticated combination of EMAs and median filters to provide stable, manipulation-resistant price feeds for all risk calculations.

### [Safe Mode](./02-safe-mode.md)
An automatic protection mechanism that activates during periods of extreme volatility, applying more conservative risk parameters to protect the protocol and its users.

### [Guardian](./03-guardian.md)
An emergency oversight role that can manually intervene in extreme circumstances to lock or unlock pools, providing an additional layer of protocol security.

### [Collateral Tracking](./04-collateral-overview.md)
The comprehensive system for tracking user balances, computing maintenance requirements, and determining account solvency.

### [Position Collateral Requirements](./05-utilization-and-ratios.md)
How pool utilization affects collateral ratios for both buyers and sellers, including the cross-buffer mechanism for cross-asset margin benefits.

### [Position Types](./06-position-types.md)
Detailed requirements for different position types including loans, credits, sold options, and purchased options.

### [Composite Strategies](./07-composite-strategies.md)
Special collateral treatment for defined-risk strategies like spreads, strangles, and synthetic positions that benefit from capital efficiency.

### [Exercise Cost](./08-exercise-cost.md)
The fee structure for force-exercising out-of-range positions, designed to compensate position holders for involuntary closure.

### [Adaptive Interest Rate Model](./09-interest-rate-model.md)
A PID controller-based system that dynamically adjusts borrow rates based on pool utilization to maintain equilibrium between buyers and sellers.

### [Fee Structure](./10-fee-structure.md)
The protocol's commission system, including notional and premium fees, and the builder wallet revenue sharing mechanism.

### [Interest Accrual](./11-interest-accrual.md)
How compound interest is tracked and settled for borrowers using the global borrow index system.

### [Pool Utilization](./12-pool-utilization.md)
The utilization metric that drives interest rates and collateral requirements, including flash deposit protection via transient storage.

### [Settlement Flows](./13-settlement-flows.md)
The settleMint and settleBurn processes that handle all balance updates during position creation and closure.

### [Dispatch Entry Point](./14-dispatch-entrypoint.md)
The primary user interface for minting, burning, and settling positions through the PanopticPool.

### [DispatchFrom Entry Point](./15-dispatchfrom-entrypoint.md)
Third-party operations including liquidations, force exercises, and premium settlements.

### [SFPM Position Creation](./16-sfpm-position-creation.md)
Low-level position mechanics including zero-width legs (loans/credits) and finalTick slippage protection.

## Key Constants

| Parameter | Value | Description |
|-----------|-------|-------------|
| `DECIMALS` | 10,000,000 | Precision for ratio calculations (1 millitick = 0.00001%) |
| `MAX_SPREAD` | 90,000 | Maximum allowed ratio of removed to net liquidity |
| `MAX_TWAP_DELTA_LIQUIDATION` | 513 ticks | Maximum price deviation (~5%) allowed during liquidation |
| `MAX_TICKS_DELTA` | 953 ticks | Maximum cumulative oracle deviation (~10%) before safe mode |
| `BP_DECREASE_BUFFER` | 13,333,333 | Buying power decrease buffer (133.33%) |

## Architecture

The Risk Engine is designed as a stateless calculation engine. All state regarding user positions and balances is maintained in the PanopticPool and CollateralTracker contracts. The Risk Engine receives this data as function parameters and returns computed values without storing any persistent state (with the exception of guardian-controlled safe mode locks).

This architecture provides several benefits:
- **Upgradeability**: Risk calculations can be updated without migrating user state
- **Composability**: External contracts can query risk parameters directly
- **Gas Efficiency**: No storage reads for most calculations
- **Auditability**: Pure functions are easier to formally verify
