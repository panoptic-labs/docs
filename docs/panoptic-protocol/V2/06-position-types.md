# Position Types and Collateral Requirements

A TokenId encodes up to four legs. Each leg's `width`, `isLong`, `tokenType`, asset frame, ratio, and risk partner affect its interpretation and collateral requirement.

| Width | isLong | Position type |
| --- | --- | --- |
| Zero | 0 | Loan |
| Zero | 1 | Credit |
| Positive | 0 | Sold option |
| Positive | 1 | Purchased option |

## Loans and credits

A standalone loan leg requires its amount plus additional margin from the utilization-sensitive seller curve parameterized by `MAINT_MARGIN_RATE`. The [crypto and stock engines](/docs/contracts/parameters) have different loan-margin baselines. Interest and portfolio-level action buffers are separate from that leg requirement.

A standalone credit leg has zero direct leg requirement. Its accounting and any partnered treatment still matter to portfolio solvency; it is not an unconditional withdrawal entitlement.

## Options

A sold option starts from the seller collateral curve, with further price-dependent treatment. A purchased option uses the engine's buyer base ratio and the long-leg calculation. Amounts are evaluated in the leg's `tokenType`, with conversions determined by its encoded asset frame and the evaluation tick.

Use [risk-partner rules](./07-composite-strategies.md) for multi-leg positions. Do not sum human-facing dollar notionals or assume a familiar strategy name determines the contract's netting treatment.

References: [TokenIdLibrary](/docs/contracts/V2/types/library.TokenIdLibrary), [RiskEngine](/docs/contracts/V2/RiskEngine/contract.RiskEngine), and [stock RiskEngine](/docs/contracts/V2/RiskEngine/contract.RiskEngineXStocks).
