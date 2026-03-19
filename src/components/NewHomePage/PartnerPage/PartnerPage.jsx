import React from "react";
import { motion } from "framer-motion";
import "./PartnerPage.css";

const PartnerPage = () => {
  const investors = [
    "uniswap",
    "coinbase",
    "jane-street",
    "greenfield",
    "hashkey",
    "keyrock",
    "gumi-crypos",
    "sevenx",
  ];

  // Double the list for infinite scroll effect
  const marqueeItems = [...investors, ...investors];

  return (
    <div className="partner-page">
      <motion.div
        className="partner-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div>Backed by a trusted team of Investors &amp; Partners</div>
      </motion.div>
      <div className="partner-marquee-wrapper">
        <div className="partner-marquee">
          {marqueeItems.map((card, i) => (
            <div key={`${card}-${i}`} className="partner-pill">
              <img src={`/img/partners/${card}.svg`} alt={card} className="investor" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
