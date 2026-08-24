import React, { useId, useMemo, useRef, useState } from "react";
import "./LiquidityMorph.css";

/**
 * Hero mechanism visual: a concentrated-liquidity distribution morphing into an
 * option payoff as the reader drags across it. Pure SVG + React state — no chart
 * library, no live data.
 *
 * The morph is driven by `t` (0 = liquidity, 1 = payoff). Pointer movement sets
 * `t`; a range input underneath gives the same control to keyboard and touch
 * users and carries the accessible name.
 */

const BARS = 28;
const VIEW_W = 560;
const VIEW_H = 300;
const BASELINE = 232; // y of the zero/price axis
const AMPLITUDE = 176; // px from the axis to a full-height bar
const BAR_GAP = 3;

// Concentrated liquidity: a bell of depth centered on the current price.
const liquidityAt = (i) => {
  const x = (i / (BARS - 1)) * 2 - 1; // -1..1
  return Math.exp(-(x * x) / 0.14);
};

// Long-call payoff: flat premium loss below strike, linear upside above.
const STRIKE_INDEX = Math.round(BARS * 0.5);
const payoffAt = (i) => {
  if (i <= STRIKE_INDEX) return -0.22;
  return ((i - STRIKE_INDEX) / (BARS - 1 - STRIKE_INDEX)) * 1.05 - 0.22;
};

const lerp = (a, b, t) => a + (b - a) * t;

export default function LiquidityMorph() {
  const [t, setT] = useState(0);
  const [live, setLive] = useState(false);
  const frameRef = useRef(null);
  const gradientId = useId();

  const bars = useMemo(() => {
    const slot = VIEW_W / BARS;
    const width = slot - BAR_GAP;
    return Array.from({ length: BARS }, (_, i) => {
      const liq = liquidityAt(i);
      const pay = payoffAt(i);
      // Liquidity always sits above the axis; payoff can go below it.
      const liqTop = BASELINE - liq * AMPLITUDE;
      const payTop = BASELINE - pay * AMPLITUDE;
      const top = lerp(liqTop, payTop, t);
      const y = Math.min(top, BASELINE);
      const height = Math.max(Math.abs(BASELINE - top), 1.5);
      return {
        key: i,
        x: i * slot + BAR_GAP / 2,
        y,
        width,
        height,
        negative: top > BASELINE,
      };
    });
  }, [t]);

  // Smooth payoff line drawn over the bars, fading in as the morph completes.
  const payoffLine = useMemo(
    () =>
      bars
        .map((b, i) => {
          const cx = b.x + b.width / 2;
          const cy = b.negative ? b.y + b.height : b.y;
          return `${i === 0 ? "M" : "L"}${cx.toFixed(1)},${cy.toFixed(1)}`;
        })
        .join(" "),
    [bars]
  );

  const handlePointerMove = (e) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setLive(true);
    setT(next);
  };

  return (
    <div className="liquidity-morph">
      <div className="liquidity-morph-header">
        <span className="liquidity-morph-title">
          {t < 0.5 ? "Concentrated liquidity" : "Options payoff"}
        </span>
        <span className="liquidity-morph-pill">
          {t < 0.5 ? "Uniswap LP" : "Perpetual option"}
        </span>
      </div>

      <div
        className="liquidity-morph-frame"
        ref={frameRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setLive(false)}
      >
        <svg
          className="liquidity-morph-chart"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`${gradientId}-up`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#B48EFF" stopOpacity="0.85" />
              <stop offset="1" stopColor="#590FF5" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <line x1="0" y1={BASELINE} x2={VIEW_W} y2={BASELINE} className="liquidity-morph-axis" />

          {bars.map((b) => (
            <rect
              key={b.key}
              x={b.x}
              y={b.y}
              width={b.width}
              height={b.height}
              rx="1.5"
              fill={b.negative ? "rgba(215, 47, 34, 0.45)" : `url(#${gradientId}-up)`}
            />
          ))}

          <path
            d={payoffLine}
            fill="none"
            className="liquidity-morph-line"
            style={{ opacity: t }}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <label className="liquidity-morph-control">
        <span className="liquidity-morph-control-label">
          {live ? "Keep moving" : "Drag to morph"}
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(t * 100)}
          onChange={(e) => setT(Number(e.target.value) / 100)}
          aria-label="Morph the chart from a concentrated liquidity position to an option payoff"
        />
      </label>

      <div className="liquidity-morph-footer">
        <span>Your Uniswap range</span>
        <span>becomes an option</span>
      </div>
    </div>
  );
}
