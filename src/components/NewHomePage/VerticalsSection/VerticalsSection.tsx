import React from "react";
import { motion } from "framer-motion";
import "./VerticalsSection.css";

// Minimal inline SVG icons for a professional look
const icons = {
  perpetual: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-5.095-8-10.19-8-5.096 0-5.096 8 0 8 5.095 0 5.095-8 10.19-8z" />
    </svg>
  ),
  token: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M6 12h12" />
    </svg>
  ),
  leverage: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  multileg: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  oracle: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  custody: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

const features = [
  { icon: icons.perpetual, title: "Perpetual Options", description: "No expiry dates. Hold positions indefinitely and manage them on your terms. Exit when you want, not when a contract says so." },
  { icon: icons.token, title: "Any Token", description: "Create options markets on any asset with a Uniswap pool. Permissionless market creation — no gatekeepers required." },
  { icon: icons.leverage, title: "Up to 10× Leverage", description: "Capital-efficient trading with built-in risk controls. Maximize exposure without maximizing trust assumptions." },
  { icon: icons.multileg, title: "Multi-leg Strategies", description: "Combine puts, calls, and spreads in a single position. Straddles, strangles, iron condors — all on-chain." },
  { icon: icons.oracle, title: "Oracle-Free Pricing", description: "Option pricing derived directly from Uniswap liquidity. No external oracle dependencies, no manipulation vectors." },
  { icon: icons.custody, title: "Self-Custody", description: "Fully non-custodial protocol. Your keys, your funds. Always. No counterparty risk, no withdrawal queues." },
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
