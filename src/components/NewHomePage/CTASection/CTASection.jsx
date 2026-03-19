import React from "react";
import { motion } from "framer-motion";
import { APP_LINK } from "../../../constants";
import "./CTASection.css";

export default function CTASection() {
  return (
    <section className="cta-section">
      {/* Glow that scales up and pulses as it enters */}
      <motion.div
        className="cta-glow"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="cta-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get Started
        </motion.div>
        <motion.h2
          className="cta-title"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          The options layer<br/>DeFi was missing.
        </motion.h2>
        <motion.p
          className="cta-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join thousands of traders and LPs using Panoptic to trade, hedge, and earn — permissionlessly.
        </motion.p>
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        >
          <a href={APP_LINK} className="btn-cta-big" target="_blank" rel="noopener noreferrer">
            Launch App →
          </a>
          <a href="/docs/intro" className="btn-cta-outline">
            Documentation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
