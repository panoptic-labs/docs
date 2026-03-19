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
    <div className="title-page with-background">
      {/* Floating glow orbs */}
      <GlowOrb size={500} color="rgba(123, 63, 228, 0.12)" top="-10%" left="-5%" delay={0} />
      <GlowOrb size={400} color="rgba(40, 203, 149, 0.08)" top="20%" right="-10%" delay={2} />
      <GlowOrb size={350} color="rgba(78, 20, 208, 0.1)" bottom="10%" left="30%" delay={4} />

      <div className="title-page-flex">
        <motion.div
          className="title-page-info"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="title">
            Perpetual Options.{" "}
            <span className="gradient-text">Any Token.</span>{" "}
            Onchain.
          </h1>
          <p className="hero-subtitle">
            Trade perpetual options on any token, powered by Uniswap v4.
          </p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <a href={APP_LINK} className="hero-button-primary" target="_blank" rel="noopener noreferrer">
              Launch App
            </a>
            <a href="/docs/intro" className="hero-button-secondary">
              Read Docs
            </a>
          </motion.div>
          <motion.div
            className="stats-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <div className="stat">
              <div className="stat-value"><CountUpStat end={50} prefix="$" suffix="M+" /></div>
              <div className="stat-label">TVL</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-value"><CountUpStat end={500} prefix="$" suffix="M+" /></div>
              <div className="stat-label">Volume</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-value"><CountUpStat end={500} suffix="+" /></div>
              <div className="stat-label">Markets</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-value"><CountUpStat end={100} suffix="K+" /></div>
              <div className="stat-label">Trades</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <ScrollingTokens/>
    </div>
  )
}

export default TitlePage
