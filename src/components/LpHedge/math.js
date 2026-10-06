// Payoff math for Uniswap v3/v4 range positions, valued in USDC.
// Every option leg is sized to 1 ETH of notional: the range holds 1 ETH
// when price is below it, and `strike` USDC when price is above it.

export const SPOT = 100;

export function prices(max = 200) {
  return Array.from({length: Math.round(max / 0.5)}, (_, i) => 0.5 + i * 0.5);
}

export function range(strike, widthPct) {
  const r = 1 + widthPct / 100;
  return {lower: strike / r, upper: strike * r};
}

function liquidity({lower, upper}) {
  return 1 / (1 / Math.sqrt(lower) - 1 / Math.sqrt(upper));
}

// Token amounts held by the range position at price P.
export function holdings(P, strike, widthPct) {
  const rg = range(strike, widthPct);
  const L = liquidity(rg);
  const s = Math.sqrt(Math.min(Math.max(P, rg.lower), rg.upper));
  return {
    eth: L * (1 / s - 1 / Math.sqrt(rg.upper)),
    usdc: L * (s - Math.sqrt(rg.lower)),
  };
}

// Short put = LP position funded with `strike` USDC. Payoff excludes fees.
export function shortPut(P, strike, widthPct) {
  const {eth, usdc} = holdings(P, strike, widthPct);
  return eth * P + usdc - strike;
}

// Legs of a combined position:
//   {type: 'put' | 'call', side: 1 (short) | -1 (long), strike, width}
//   {type: 'loan', eth}  borrow `eth` ETH and sell it at SPOT
// Token holdings: a short put holds the LP tokens; a short call holds the LP
// tokens minus the 1 ETH it was funded with; long legs hold the negative.
export function legTokens(P, leg) {
  if (leg.type === 'loan') return {eth: -leg.eth, usdc: leg.eth * SPOT};
  const h = holdings(P, leg.strike, leg.width);
  const eth = leg.type === 'call' ? h.eth - 1 : h.eth;
  return {eth: leg.side * eth, usdc: leg.side * h.usdc};
}

export function tokens(P, legs) {
  return legs.reduce(
    (acc, leg) => {
      const t = legTokens(P, leg);
      return {eth: acc.eth + t.eth, usdc: acc.usdc + t.usdc};
    },
    {eth: 0, usdc: 0},
  );
}

// P&L relative to entry at SPOT, so every position is worth 0 at SPOT.
export function pnl(P, legs) {
  const now = tokens(P, legs);
  const entry = tokens(SPOT, legs);
  return now.eth * P + now.usdc - (entry.eth * SPOT + entry.usdc);
}

// Spread multiplier: 1 + vegoid * u / (1 - u) with vegoid = 1/8 and u capped
// at 90%, which spans 1x to 2.125x.
export function spreadMultiplier(utilization) {
  const u = Math.min(Math.max(utilization, 0), 0.9);
  return 1 + (u / 8) / (1 - u);
}
