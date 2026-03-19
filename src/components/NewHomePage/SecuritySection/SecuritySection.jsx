import React from "react";
import { motion } from "framer-motion";
import "./SecuritySection.css";

const audits = [
  { name: "Obsidian", status: "Complete" },
  { name: "Nethermind", status: "Complete" },
  { name: "Code4rena", status: "Complete" },
];

const pillars = [
  {
    title: "Non-Custodial",
    desc: "Your keys, your funds. No counterparty risk — all positions settle directly on-chain.",
  },
  {
    title: "Oracle-Free",
    desc: "Pricing derived from Uniswap liquidity. No external oracle dependencies or manipulation vectors.",
  },
  {
    title: "Battle-Tested",
    desc: "Multiple independent security audits, formal verification, and a competitive audit program.",
  },
  {
    title: "Fully Open Source",
    desc: "Every line of smart contract code is publicly verifiable on GitHub. Transparency by default.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function SecuritySection() {
  return (
    <section className="security-section">
      <div className="security-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Security
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Trust the code,<br/>not the counterparty.
        </motion.h2>
        <motion.p
          className="section-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Security isn't a feature — it's the foundation. Panoptic is designed to minimize trust assumptions at every layer.
        </motion.p>

        {/* Audit badges */}
        <motion.div
          className="audit-badges"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {audits.map((a) => (
            <motion.div key={a.name} className="audit-badge" variants={item}>
              <span className={`audit-status ${a.status === "Complete" ? "audit-complete" : "audit-progress"}`}>
                {a.status === "Complete" ? "✓" : "⋯"}
              </span>
              <div>
                <div className="audit-name">{a.name}</div>
                <div className="audit-status-text">{a.status}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <a href="/docs/security/security_audits" className="audit-details-link">
          View full audit reports →
        </a>

        {/* Security pillars */}
        <motion.div
          className="security-pillars"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {pillars.map((p) => (
            <motion.div key={p.title} className="security-pillar" variants={item}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
