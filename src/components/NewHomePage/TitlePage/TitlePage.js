import "./TitlePage.css"
import "@fontsource-variable/space-grotesk"
import "@fontsource/jetbrains-mono"
import ScrollingTokens from "../ScrollingTokens/ScrollingTokens"
import React from "react";
import { motion } from "framer-motion";
import { APP_LINK } from "../../../constants";
import GlowOrb from "../../animations/GlowOrb";
import CountUpStat from "../../animations/CountUpStat";

const TitlePage = () => {
  return (
    <div className="title-page">
      {/* Grid background */}
      <div className="hero-grid" />

      {/* Floating glow orbs */}
      <GlowOrb size={600} color="rgba(78, 20, 208, 0.15)" top="-15%" left="-10%" delay={0} />
      <GlowOrb size={450} color="rgba(40, 203, 149, 0.08)" top="30%" right="-10%" delay={2} />

      <div className="hero-content-wrapper">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Live on Ethereum, Base &amp; Unichain
          </div>

          <h1 className="hero-title">
            Perpetual Options,<br/>
            <span className="gradient-text-hero">DeFi-Native</span>
          </h1>

          <p className="hero-subtitle">
            Trade permissionless put and call options on any ERC-20 token. No expiries. No oracles. No intermediaries. Powered by Uniswap liquidity.
          </p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href={APP_LINK} className="btn-launch" target="_blank" rel="noopener noreferrer">
              Start Trading →
            </a>
            <a href="/docs/intro" className="btn-outline">
              Read the Docs
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats grid */}
      <motion.div
        className="stats-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number"><CountUpStat end={50} prefix="$" suffix="M+" /></div>
            <div className="stat-label">Total Value Locked</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><CountUpStat end={500} prefix="$" suffix="M+" /></div>
            <div className="stat-label">Cumulative Volume</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><CountUpStat end={500} suffix="+" /></div>
            <div className="stat-label">Active Markets</div>
          </div>
          <div className="stat-card">
            <div className="stat-number"><CountUpStat end={100} suffix="K+" /></div>
            <div className="stat-label">Trades Executed</div>
          </div>
        </div>
      </motion.div>

      <ScrollingTokens/>
    </div>
  )
}

export default TitlePage
