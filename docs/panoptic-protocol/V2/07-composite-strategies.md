# Composite Strategies

Risk partners let the RiskEngine recognize supported combinations within a TokenId. Each leg identifies its partner through `riskPartner`; self-partnered legs are evaluated independently. TokenId validation and the engine's classification rules determine whether two legs receive composite treatment.

## Classification matters

The engine distinguishes option spreads, short strangles, loan/option combinations, and credit/option combinations using leg attributes. Width, direction, token type, ratios, and asset frame matter. A name such as spread or covered call in a UI is not sufficient to select a formula.

The [RiskEngine reference](/docs/contracts/V2/RiskEngine/contract.RiskEngine) documents `_getRequiredCollateralSingleLegPartner` and its strategy-specific calculations. The [stock engine reference](/docs/contracts/V2/RiskEngine/contract.RiskEngineXStocks) and [deployed parameters](/docs/contracts/parameters) identify the applicable policy.

## Evaluate the complete portfolio

Calculate requirements in token units before valuation. Mixed-asset frames can require conversion even when two legs appear to share a strike or notional. Evaluate both token0/token1 orderings, both surplus directions, and the account's other positions and premium balances.

Risk partnering does not remove account-level solvency checks, interest, mint buffers, or safe-mode restrictions. Supply the full position list to simulation and compare the resulting account state, not just the sum of individual leg estimates.
