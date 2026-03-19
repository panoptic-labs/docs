import React from "react"
import { motion } from "framer-motion"
import "./LaunchPage.css"

const chains = [
  { name: "Ethereum", dotClass: "chain-dot-eth" },
  { name: "Base", dotClass: "chain-dot-base" },
  { name: "Unichain", dotClass: "chain-dot-uni" },
  { name: "More L2s Coming", dotClass: "chain-dot-more" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const LaunchPage = () => {
  return (
    <section className="networks-section">
      <div className="networks-container">
        <motion.div
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Live Networks
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Multi-chain. Day one.
        </motion.h2>
        <motion.p
          className="section-desc networks-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Deployed where the liquidity lives — with more chains on the way.
        </motion.p>
        <motion.div
          className="network-pills"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {chains.map((c) => (
            <motion.div key={c.name} className="network-pill" variants={item}>
              <span className={`chain-dot ${c.dotClass}`} />
              {c.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LaunchPage
