import React from "react";
import { motion } from "framer-motion";
import "./ComparisonTable.css";

const rows = [
  { feature: "Perpetual (No Expiry)", panoptic: true, cex: false, defi: false },
  { feature: "Any Token", panoptic: true, cex: false, defi: "limited" },
  { feature: "Self-Custody", panoptic: true, cex: false, defi: true },
  { feature: "Oracle-Free", panoptic: true, cex: null, defi: false },
  { feature: "Up to 10x Leverage", panoptic: true, cex: true, defi: "limited" },
];

function StatusDot({ value }) {
  if (value === true) return <span className="dot dot-green" />;
  if (value === false) return <span className="dot dot-red" />;
  if (value === null) return <span className="dot-na">N/A</span>;
  return <span className="dot-limited">~Limited</span>;
}

const rowVariant = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ComparisonTable() {
  return (
    <section className="comparison-section">
      <div className="comparison-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Comparison
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Built different.
        </motion.h2>
        <div className="comparison-table-wrapper">
          <div className="comparison-glow-bar" />
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="panoptic-col">Panoptic</th>
                <th>CEX Options</th>
                <th>Other DeFi</th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08 }}
            >
              {rows.map((r) => (
                <motion.tr key={r.feature} variants={rowVariant} className="comparison-row">
                  <td>{r.feature}</td>
                  <td className="panoptic-col"><StatusDot value={r.panoptic} /></td>
                  <td><StatusDot value={r.cex} /></td>
                  <td><StatusDot value={r.defi} /></td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
