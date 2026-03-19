import React from "react";
import { motion } from "framer-motion";
import "./PartnerPage.css";

const investors = [
  "Uniswap",
  "Coinbase Ventures",
  "Jane Street",
  "Greenfield Capital",
  "HashKey Capital",
  "Keyrock",
  "Gumi Cryptos Capital",
  "SevenX Ventures",
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const PartnerPage = () => {
  return (
    <section className="investors-section">
      <div className="investors-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Backed By
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Institutional conviction.
        </motion.h2>
        <motion.div
          className="investor-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {investors.map((name) => (
            <motion.div key={name} className="investor-chip" variants={item}>
              {name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerPage;
