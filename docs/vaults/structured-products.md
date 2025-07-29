---
sidebar_position: 2
sidebar_label: "Structured Products"
---

# What are Structured Products?
**Structured Products** are pre-packaged, on-chain investment strategies that combine a primary asset or yield source with a derivative layer—in this case, [perpetual options](/docs/trading/perpetual-options) on Panoptic. 
The goal is to create a specific risk-return profile that isn't possible with traditional assets alone.

---
## Perpetual Option Vaults (POVs) vs. DeFi Option Vaults (DOVs)
Perpetual Option Vaults (POVs) represent a significant evolution from the first generation of on-chain option strategies, commonly known as DeFi Option Vaults (DOVs).

### DOVs (2020-2023)
DOVs pioneered on-chain yield generation with options but had key limitations:
* **Inflexibility:** Most DOVs were locked into a single, rigid strategy (e.g., selling weekly out-of-the-money calls). They operated on fixed expiries, meaning capital could sit idle between cycles, and managers couldn't adapt to changing market conditions.
* **Inefficient Pricing:** They often relied on off-chain auctions or basic algorithms to price their options. This could lead to options being sold for less than their fair market value, creating "toxic flow" and reducing yields for depositors.

### POVs (2025-)
Panoptic's architecture provides far greater flexibility and efficiency:
* **Flexibility & Adaptability:** By using **perpetual options**, there are no fixed expiries. Strategies can be continuous and "rolling." The `manage()` function gives managers full discretion to adapt in real-time by moving strikes, adjusting position sizes, or even changing the strategy entirely.
* **Efficient On-Chain Pricing:** Panoptic’s novel infrastructure [prices options](/docs/product/streamia) based on the real-time trading activity and volatility within the underlying automated market maker (AMM). This leads to fairer, more efficient price discovery and ensures that the vault is compensated appropriately for the risk it takes on.

---
## Structured Product Strategies
The flexibility of the POV framework allows managers to create a wide array of strategies. Here are just a few examples:

### Yield Generation
These vaults aim to generate returns on capital that are uncorrelated with typical DeFi yields.
* **Automated Option Selling:** The classic approach. Create vaults that systematically sell options to earn premiums, such as through [covered calls](/research/naked-covered-call-defi-options#covered-calls) (for yield on a held asset) or cash-secured puts (for yield on stablecoins).
* **Passive LPing:** Lend single-sided tokens in multiple pools to earn [passive yield](/docs/getting-started/passive-lp) from Uniswap LPs and option traders.
* **Volatility Harvesting:** Systematically sell volatility when it is high and perceived to be overpriced. This is often done by selling [straddles or strangles](/research/defi-option-strangle-straddle), which profit if the market stays within a predicted range.
* **Funding Rate Arbitrage:** Capture [funding rate differentials](/research/introduction-synthetic-perps#funding-rate-for-synthetic-perps) between perpetual futures and perpetual options.
* **Hedged Yield Farming:** Deploy capital into a primary yield source (e.g., a liquidity pool or lending protocol) and use Panoptic options to [hedge](/research/hedge-with-panoptic-options) against the directional risk of the underlying assets, protecting the principal while capturing the farm yield.

### Risk Management & Hedging
These vaults focus on protecting capital or a treasury from adverse market movements.
* **Delta-Neutral LPing:** [Zero market exposure liquidity provisioning](/blog/delta-neutral-lp-hedge-uniswap-position) in Uniswap v3 and v4 to limit impermanent loss (IL) and earn twice as many LP fees.
* **Tail Risk Hedging:** Protect a portfolio against "black swan" events by systematically purchasing far out-of-the-money [put options](/docs/product/basic-options-strategies#buying-puts), providing a catastrophic insurance policy.
* **Treasury Protection:** A perfect use case for DAOs. A vault can implement a [collar](/docs/terms/collar) strategy (e.g., selling a call option to finance the purchase of a protective put option) to protect the treasury's assets from a market downturn at a low cost.



---
## Risks
While powerful, structured products come with their own unique set of risks that users must understand.

* **Strategy Risk:** This is the primary risk. The vault's performance is entirely dependent on its underlying strategy succeeding. A strategy designed for a sideways market (like a short straddle) will lose significant money in a strong trending market. There is no guarantee that the manager's strategy will be profitable.
* **Complexity Risk:** The payoffs of option strategies are non-linear and can be difficult to understand. Users may not fully grasp the specific market conditions under which their investment will perform well or poorly.
* **Liquidity Risk:** Panoptic’s options are powered by the liquidity of the underlying Uniswap v3 or v4 pool. During periods of extreme volatility or low liquidity in the underlying pool, it may be difficult or expensive for a manager to enter or exit positions, which could negatively impact the vault's performance.
