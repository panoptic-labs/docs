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
          Options, without a separate options order book.
        </motion.h2>
        <motion.p
          className="section-desc mechanism-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Panoptic uses concentrated AMM liquidity as the foundation for an onchain
          options market. There is no dedicated options liquidity to bootstrap, no
          order book to match against, and no expiry dates to roll — the same
          Uniswap range that earns you trading fees becomes the option a trader buys.
        </motion.p>
      </div>
    </section>
  );
}
