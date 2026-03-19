import "./TitlePage.css"
import "@fontsource-variable/space-grotesk"
import "@fontsource/jetbrains-mono"
import ScrollingTokens from "../ScrollingTokens/ScrollingTokens"
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { APP_LINK } from "../../../constants";
import GlowOrb from "../../animations/GlowOrb";

const TitlePage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="title-page" ref={ref}>
      {/* Parallax grid background */}
      <motion.div className="hero-grid" style={{ y: gridY }} />

      {/* Large gradient logo mark as hero visual */}
      <motion.div
        className="hero-logo-mark"
        style={{ rotate: logoRotate, scale: logoScale }}
      >
        <svg viewBox="0 0 202 143" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M171.93 142.437L159.277 129.784C191.627 97.4351 191.605 45.0039 159.277 12.6546L171.93 0.00170898C211.237 39.3305 211.259 103.109 171.93 142.437ZM42.1236 129.785C9.77424 97.4352 9.77424 44.9826 42.1236 12.6332L29.4921 0.00178792C-9.83662 39.3305 -9.85802 103.109 29.4707 142.437H29.4921L42.145 129.785H42.1236ZM29.4957 71.2088C29.4957 31.88 61.3954 0.00170898 100.724 0.00170898C140.053 0.00170898 171.931 31.88 171.931 71.2088C171.931 110.538 140.053 142.437 100.724 142.437C61.3954 142.437 29.4957 110.538 29.4957 71.2088ZM46.9228 70.7592C46.9228 100.454 71.0082 124.539 100.724 124.539C130.44 124.539 154.526 100.475 154.526 70.7592C154.526 41.0432 130.44 16.9578 100.724 16.9578C71.0082 16.9578 46.9228 41.0646 46.9228 70.7592Z" fill="url(#hero-logo-gradient)"/>
          <defs>
            <linearGradient id="hero-logo-gradient" x1="0.39" y1="141.87" x2="201.64" y2="0.57" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4C0EF1"/>
              <stop offset="1" stopColor="#B25CF6"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

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
            Launching on Ethereum
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

      <ScrollingTokens/>
    </div>
  )
}

export default TitlePage
