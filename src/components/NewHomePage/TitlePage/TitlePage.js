import "./TitlePage.css"
import "@fontsource-variable/space-grotesk"
import "@fontsource/jetbrains-mono"
// ScrollingTokens removed — will revisit with UI screenshots
// import ScrollingTokens from "../ScrollingTokens/ScrollingTokens"
import React from "react";
import { motion } from "framer-motion";
import { APP_LINK } from "../../../constants";

// Static payoff-curve visual (long-call profile). Pure SVG so the hero has no
// chart-library cost; aria-hidden with a sr-only description alongside.
const HeroPayoffVisual = () => (
  <div className="hero-demo-panel">
    <div className="hero-demo-header">
      <span className="hero-demo-title">ETH · Long Call</span>
      <span className="hero-demo-pill">No expiry</span>
    </div>
    <p className="sr-only">
      Illustration of a perpetual long call payoff: losses capped below the
      strike price, unlimited upside above it.
    </p>
    <svg
      className="hero-demo-chart"
      viewBox="0 0 560 320"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="hero-payoff-profit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12AD50" stopOpacity="0.28" />
          <stop offset="1" stopColor="#12AD50" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="hero-payoff-loss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D72F22" stopOpacity="0.03" />
          <stop offset="1" stopColor="#D72F22" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      {/* zero P/L line */}
      <line x1="0" y1="200" x2="560" y2="200" className="hero-demo-zero" />
      {/* loss region: flat premium below strike */}
      <path d="M0,200 L0,236 L300,236 L336,200 Z" fill="url(#hero-payoff-loss)" />
      {/* profit region: linear upside above breakeven */}
      <path d="M336,200 L560,40 L560,200 Z" fill="url(#hero-payoff-profit)" />
      {/* payoff line */}
      <path
        d="M0,236 L300,236 L560,40"
        fill="none"
        className="hero-demo-line"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* strike marker */}
      <line x1="300" y1="24" x2="300" y2="296" className="hero-demo-strike" />
    </svg>
    <div className="hero-demo-footer">
      <span>Strike</span>
      <span>Breakeven</span>
      <span>Price →</span>
    </div>
  </div>
);

const TitlePage = () => {
  return (
    <div className="title-page">
      {/* Static layered backgrounds (parallax removed — app hero has none) */}
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hero-copy">
          <p className="hero-eyebrow">Launching on Ethereum</p>

          <h1 className="hero-title">
            Perpetual Options,<br/>
            DeFi&apos;s Volatility Layer
          </h1>

          <p className="hero-subtitle">
            Deposit into curator-run vaults that harvest yield from perpetual options.
            No expiries, capital-efficient, fully onchain.
            <br/>Powered by Uniswap liquidity.
          </p>

          <div className="hero-cta">
            <a href={APP_LINK} className="btn-launch" target="_blank" rel="noopener noreferrer">
              Launch App →
            </a>
            <a href="/docs/intro" className="btn-outline">
              Read the Docs
            </a>
          </div>
        </div>

        <HeroPayoffVisual />
      </motion.div>

      <a href="#updates" className="hero-scroll-hint">
        Scroll to explore
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* Stats commented out — uncomment when we have traction
      <div className="stats-section">
        <div className="stats-grid">
          {[
            { end: 50, prefix: "$", suffix: "M+", label: "Total Value Locked" },
            { end: 500, prefix: "$", suffix: "M+", label: "Cumulative Volume" },
            { end: 500, prefix: "", suffix: "+", label: "Active Markets" },
            { end: 100, prefix: "", suffix: "K+", label: "Trades Executed" },
          ].map((stat, i) => (
            <motion.div className="stat-card" key={stat.label} custom={i} variants={statItem} initial="hidden" animate="show">
              <div className="stat-number"><CountUpStat end={stat.end} prefix={stat.prefix} suffix={stat.suffix} /></div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      */}

      {/* ScrollingTokens removed — will revisit with UI screenshots */}
    </div>
  )
}

export default TitlePage
