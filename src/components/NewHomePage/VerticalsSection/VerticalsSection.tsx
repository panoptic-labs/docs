import React from "react";
import { motion } from "framer-motion";
import "./VerticalsSection.css";

const features = [
  { icon: "∞", title: "Perpetual Options", description: "No expiry dates. Hold positions indefinitely and manage them on your terms. Exit when you want, not when a contract says so." },
  { icon: "⬡", title: "Any Token", description: "Create options markets on any asset with a Uniswap pool. Permissionless market creation — no gatekeepers required." },
  { icon: "⚡", title: "Up to 10× Leverage", description: "Capital-efficient trading with built-in risk controls. Maximize exposure without maximizing trust assumptions." },
  { icon: "◈", title: "Multi-leg Strategies", description: "Combine puts, calls, and spreads in a single position. Straddles, strangles, iron condors — all on-chain." },
  { icon: "⊘", title: "Oracle-Free Pricing", description: "Option pricing derived directly from Uniswap liquidity. No external oracle dependencies, no manipulation vectors." },
  { icon: "🔐", title: "Self-Custody", description: "Fully non-custodial protocol. Your keys, your funds. Always. No counterparty risk, no withdrawal queues." },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function VerticalsSection() {
  return (
    <section className="features-section">
      <div className="features-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((f) => (
            <motion.div key={f.title} className="feature-card" variants={item}>
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
