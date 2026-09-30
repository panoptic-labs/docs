# Safe Mode

Safe mode combines automatic oracle-divergence checks with an optional guardian lock. Its thresholds come from the pool's RiskEngine; use the [parameter page](/docs/contracts/parameters) rather than assuming a single protocol-wide threshold.

## Detection

The engine adds one for each strict inequality that holds:

| Condition | Comparison | Threshold |
| --- | --- | --- |
| External shock | absolute difference between current tick and spot EMA | `MAX_TICKS_DELTA` |
| Internal disagreement | absolute difference between spot EMA and fast EMA | `MAX_TICKS_DELTA / 2`, rounded down |
| High divergence | absolute difference between median tick and slow EMA | `MAX_TICKS_DELTA / 2`, rounded down |

The [snapshot](/data/risk-engines.json) includes read-only boundary probes for high divergence: equality does not trigger it; one tick above does. Tick distances are logarithmic price ratios, not identical upward and downward percentage moves.

## Guardian lock

A guardian lock contributes three to the score. It therefore produces a score of at least three even if none of the automatic conditions holds. Unlocking removes that contribution; automatic conditions can still keep safe mode active.

## Effects

- Any positive score makes ordinary solvency evaluation use multiple ticks.
- A score greater than one enforces the covered mint/burn tick-limit ordering in `dispatch`.
- A score greater than two prevents minting new positions through `dispatch`.

Burning, settlement, exercise, and liquidation retain their own position-list, price, and solvency requirements. A guardian lock is not a promise that every withdrawal or close will succeed, nor a complete pause of all actions.

See the [PanopticPool reference](/docs/contracts/V2/contract.PanopticPool) and [guardian controls](./03-guardian.md). Automatic conditions resolve as observations converge; a guardian lock requires an explicit unlock.
