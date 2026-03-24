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
  { icon: icons.perpetual, title: "Perpetual Options", description: "No expiry dates. Hold positions indefinitely and manage them on your terms. Exit when you want, not when a contract says so." },
  { icon: icons.token, title: "Any Token", description: "Create options markets on any asset with a Uniswap pool. Permissionless market creation — no external oracle dependencies." },
  { icon: icons.leverage, title: "Up to 10× Leverage", description: "Capital-efficient trading with built-in risk controls. Maximize exposure without maximizing trust assumptions." },
  { icon: icons.margin, title: "Portfolio-Aware Margining", description: "Net positions against one another to create defined-risk strategies. Straddles, strangles, and spreads are capital-efficiently margined as a single portfolio." },
  { icon: icons.vault, title: "Perpetual Options Vaults", description: "Deposit into curator-managed vaults that run sophisticated options strategies on your behalf. Earn yield from volatility without active management." },
  { icon: icons.riskEngine, title: "Modular Risk Engines", description: "Trade memecoins, blue chips, or stable pairs — each with a risk engine tailored to its asset class. One protocol, fit for every market." },
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
          Protocol Features
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Built different.<br/>By design.
        </motion.h2>
        <motion.p
          className="section-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Every component engineered for the on-chain options experience that DeFi deserves.
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
              className="feature-card"
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
