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
  { icon: icons.perpetual, title: "Perpetual by construction", description: "Options have no expiry because there is no contract to expire. Positions stay open until you close them, so there is nothing to roll and no expiry cliff to trade around." },
  { icon: icons.token, title: "AMM-native", description: "Options are built directly from concentrated liquidity positions. There is no separate pool of options liquidity to bootstrap before a market can function." },
  { icon: icons.margin, title: "No order book", description: "Nothing needs to be matched against a counterparty. Pricing is path-dependent and derived from the AMM, so liquidity is never waiting on a market maker to quote." },
  { icon: icons.leverage, title: "Permissionless markets", description: "Any token pair with a Uniswap pool can become an options market. Nobody has to list it, and no oracle has to support it." },
  { icon: icons.riskEngine, title: "Composable", description: "Positions are onchain primitives other protocols can build on — vaults, structured products, and hedging strategies all read from the same contracts." },
  { icon: icons.vault, title: "Oracle-free", description: "Prices come from Uniswap liquidity itself rather than an external feed, removing a whole class of manipulation and downtime risk." },
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
          What makes it different
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Structurally different,<br/>not incrementally better.
        </motion.h2>
        <motion.p
          className="section-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          These are consequences of building options out of AMM liquidity, not features bolted onto a conventional options venue.
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
