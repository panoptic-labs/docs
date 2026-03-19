import React from "react";
import { motion } from "framer-motion";
import "./HowItWorks.css";

const steps = [
  {
    num: "01",
    title: "LPs Deposit Capital",
    desc: "Liquidity providers deposit tokens into Panoptic pools and passively earn yield as their capital is lent to options traders.",
  },
  {
    num: "02",
    title: "Traders Open Positions",
    desc: "Options traders borrow liquidity to sell options or use their own capital to buy puts and calls — with up to 10× leverage.",
  },
  {
    num: "03",
    title: "Settle Permissionlessly",
    desc: "Everything settles on-chain. No intermediaries, no waiting periods. Manage, adjust, and close positions any time.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Three roles. One protocol.
        </motion.h2>
        <motion.p
          className="section-desc how-it-works-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Whether you trade, provide liquidity, or build — Panoptic has a place for you.
        </motion.p>
        <motion.div
          className="steps-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((s) => (
            <motion.div key={s.num} className="step" variants={item}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
