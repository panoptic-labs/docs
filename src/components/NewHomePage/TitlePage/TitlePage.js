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
      <span className="hero-demo-title">Your LP position</span>
      <span className="hero-demo-pill">Earning +20%</span>
    </div>
    <p className="sr-only">
      Illustration of LP earnings: Panoptic&apos;s liquidity spread accruing on
      top of Uniswap-equivalent fees over time.
    </p>
    <svg
      className="hero-demo-chart"
      viewBox="0 0 560 320"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="hero-fees-spread" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12AD50" stopOpacity="0.28" />
          <stop offset="1" stopColor="#12AD50" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="hero-fees-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B48EFF" stopOpacity="0.16" />
          <stop offset="1" stopColor="#B48EFF" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* baseline */}
      <line x1="0" y1="280" x2="560" y2="280" className="hero-demo-zero" />
      {/* Uniswap-equivalent fees (base accrual) */}
      <path d="M0,280 C180,244 380,216 560,196 L560,280 Z" fill="url(#hero-fees-base)" />
      <path
        d="M0,280 C180,244 380,216 560,196"
        fill="none"
        className="hero-demo-line-base"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Panoptic spread on top of Uniswap fees */}
      <path
        d="M0,280 C170,220 360,140 560,64 L560,196 C380,216 180,244 0,280 Z"
        fill="url(#hero-fees-spread)"
      />
      <path
        d="M0,280 C170,220 360,140 560,64"
        fill="none"
        className="hero-demo-line"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
    <div className="hero-demo-footer">
      <span>Uniswap fees</span>
      <span>+ Panoptic spread</span>
      <span>Time →</span>
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
          <p className="hero-eyebrow">Live on Ethereum</p>

          <h1 className="hero-title">
            Stake your LP positions.<br/>
            Earn up to 20% more fees.
          </h1>

          <p className="hero-subtitle">
            Migrate your Uniswap v3 or v4 position to Panoptic. Keep the same range,
            earn Uniswap-equivalent fees plus Panoptic&apos;s liquidity spread, and
            borrow against your liquidity.
          </p>

          <div className="hero-cta">
            <a href={APP_LINK} className="btn-launch" target="_blank" rel="noopener noreferrer">
              Stake your LP →
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
