import React from "react";
import { motion } from "framer-motion";
import "./MechanismSection.css";

export default function MechanismSection() {
  return (
    <section className="mechanism-section">
      <div className="mechanism-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How it works
        </motion.div>
        <motion.h2
          className="section-title mechanism-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Your AMM liquidity is the option.
        </motion.h2>
        <motion.p
          className="section-desc mechanism-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A concentrated liquidity position already behaves like an option: it gains
          and loses as price moves through its range. Panoptic makes that explicit.
          Traders borrow a range to open a position, and pay the provider a fee that
          streams for as long as they hold it.
          <br/><br/>
          Because the AMM does the pricing, there is nothing else to build around it —
          no separate pool of options liquidity, no order book to match against, and
          no expiry date forcing anyone out of a position.
        </motion.p>
      </div>
    </section>
  );
}
