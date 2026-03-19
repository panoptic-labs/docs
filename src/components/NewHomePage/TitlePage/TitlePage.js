import "./TitlePage.css"
import "@fontsource-variable/space-grotesk"
import "@fontsource/jetbrains-mono"
import ScrollingTokens from "../ScrollingTokens/ScrollingTokens"
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { APP_LINK } from "../../../constants";
import GlowOrb from "../../animations/GlowOrb";
import CountUpStat from "../../animations/CountUpStat";

const statItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: 0.5 + i * 0.1, ease: "easeOut" },
  }),
};

const TitlePage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <div className="title-page" ref={ref}>
      {/* Parallax grid background */}
      <motion.div className="hero-grid" style={{ y: gridY }} />

      {/* Floating glow orbs with scroll scale */}
      <motion.div style={{ scale: orbScale }} className="orb-wrapper">
        <GlowOrb size={600} color="rgba(78, 20, 208, 0.15)" top="-15%" left="-10%" delay={0} />
        <GlowOrb size={450} color="rgba(40, 203, 149, 0.08)" top="30%" right="-10%" delay={2} />
      </motion.div>

      <motion.div className="hero-content-wrapper" style={{ y: contentY }}>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="hero-badge-dot" />
            Live on Ethereum, Base &amp; Unichain
          </motion.div>

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
      </motion.div>

      {/* Stats grid — individual card entrances */}
      <div className="stats-section">
        <div className="stats-grid">
          {[
            { end: 50, prefix: "$", suffix: "M+", label: "Total Value Locked" },
            { end: 500, prefix: "$", suffix: "M+", label: "Cumulative Volume" },
            { end: 500, prefix: "", suffix: "+", label: "Active Markets" },
            { end: 100, prefix: "", suffix: "K+", label: "Trades Executed" },
          ].map((stat, i) => (
            <motion.div
              className="stat-card"
              key={stat.label}
              custom={i}
              variants={statItem}
              initial="hidden"
              animate="show"
            >
              <div className="stat-number">
                <CountUpStat end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <ScrollingTokens/>
    </div>
  )
}

export default TitlePage
