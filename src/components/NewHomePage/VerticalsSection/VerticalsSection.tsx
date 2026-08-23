import React from "react";
import { motion } from "framer-motion";
import "./VerticalsSection.css";

// Minimal inline SVG icons for a professional look
const icons = {
  perpetual: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-5.095-8-10.19-8-5.096 0-5.096 8 0 8 5.095 0 5.095-8 10.19-8z" />
    </svg>
  ),
  token: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M6 12h12" />
    </svg>
  ),
  leverage: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  margin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  vault: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
      <path d="M2 10h4M18 10h4" />
    </svg>
  ),
  riskEngine: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 7v6.5c0 5.25 4.25 10.15 10 11.5 5.75-1.35 10-6.25 10-11.5V7l-10-5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const features = [
  { icon: icons.perpetual, title: "Trade Perpetual Options", description: "Buy and sell options with no expiry dates and up to 10× leverage. Hold positions indefinitely and exit when you want, not when a contract says so." },
  { icon: icons.vault, title: "Vaults", description: "Deposit into automated onchain strategies for passive yield, curated by expert vault managers. No active management required." },
  { icon: icons.token, title: "Lend", description: "Supply capital to options traders and LPs and earn lending yield. Permissionless markets on any asset with a Uniswap pool." },
  { icon: icons.riskEngine, title: "Curate", description: "Design, deploy, and manage vault strategies on behalf of depositors — earning performance fees while building reputation on-chain." },
  { icon: icons.margin, title: "Portfolio-Aware Margining", description: "Net positions against one another to create defined-risk strategies, capital-efficiently margined as a single portfolio." },
  { icon: icons.leverage, title: "Oracle-Free by Design", description: "Pricing derives from Uniswap liquidity itself. No external oracle dependencies or manipulation vectors." },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant = (index: number) => ({
  hidden: {
    opacity: 0,
    x: index % 3 === 0 ? -30 : index % 3 === 2 ? 30 : 0,
    y: index % 3 === 1 ? 30 : 0,
    scale: 0.96,
  },
  show: {
    opacity: 1, x: 0, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function VerticalsSection() {
  return (
    <section className="features-section">
      <div className="features-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Beyond staking
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          One protocol.<br/>Four ways in.
        </motion.h2>
        <motion.p
          className="section-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Staking your LP is the front door. Behind it: trade, earn, lend, or curate — all on the same perpetual options engine.
        </motion.p>
        <motion.div
          className="features-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={i === 0 ? "feature-card feature-card--wide" : "feature-card"}
              variants={cardVariant(i)}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
