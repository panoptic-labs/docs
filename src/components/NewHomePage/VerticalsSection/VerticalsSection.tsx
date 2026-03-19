import React from "react";
import { motion } from "framer-motion";
import "./VerticalsSection.css";

const features = [
  { emoji: "♾️", title: "Perpetual Options", description: "No expiry dates — hold positions as long as you want" },
  { emoji: "⚡", title: "Up to 10x Leverage", description: "Capital-efficient trading with built-in risk controls" },
  { emoji: "🪙", title: "Any Token", description: "Trade options on any asset with a Uniswap pool" },
  { emoji: "🧩", title: "Multi-leg Strategies", description: "Combine puts, calls, and spreads in a single position" },
  { emoji: "🔮", title: "Oracle-Free", description: "No oracle dependency — pricing derived from Uniswap liquidity" },
  { emoji: "🔐", title: "Self-Custody", description: "Your keys, your funds — fully non-custodial" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function VerticalsSection() {
  return (
    <div className="verticals-section">
      <motion.h2
        className="verticals-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Built for DeFi Traders
      </motion.h2>
      <motion.div
        className="feature-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((f) => (
          <motion.div key={f.title} className="feature-card" variants={item}>
            <div className="feature-emoji-glow">
              <span className="feature-emoji">{f.emoji}</span>
            </div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
