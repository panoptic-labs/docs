import "./TitlePage.css"
import "@fontsource-variable/space-grotesk"
import "@fontsource/jetbrains-mono"
// ScrollingTokens removed — will revisit with UI screenshots
// import ScrollingTokens from "../ScrollingTokens/ScrollingTokens"
import React from "react";
import { motion } from "framer-motion";
import HeroVisual from "../HeroVisual/HeroVisual";
import { APP_LINK } from "../../../constants";

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
          <p className="hero-eyebrow">Perpetual options protocol</p>

          <h1 className="hero-title">
            Trade volatility.<br/>
            Earn more from your liquidity.
          </h1>

          <p className="hero-subtitle">
            Panoptic turns AMM liquidity into perpetual options, creating an
            options market with no order books and no expiries.
          </p>

          <div className="hero-cta">
            <a href={APP_LINK} className="btn-launch" target="_blank" rel="noopener noreferrer">
              Migrate your position →
            </a>
            <a href="/docs/intro" className="btn-outline">
              Read the Docs
            </a>
          </div>
        </div>

        <HeroVisual />
      </motion.div>

      <a href="#mechanism" className="hero-scroll-hint">
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
