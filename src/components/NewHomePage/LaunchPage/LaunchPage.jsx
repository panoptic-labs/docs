import React from "react"
import { motion } from "framer-motion"
import "./LaunchPage.css"

const chains = [
  { name: "Ethereum", dotClass: "chain-dot-eth", live: true },
  { name: "More L2s Coming Soon", dotClass: "chain-dot-more", live: false },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, type: "spring", stiffness: 200, damping: 20 } },
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
          Network
        </motion.div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Launching on Ethereum.
        </motion.h2>
        <motion.p
          className="section-desc networks-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Panoptic V2 launches on Ethereum mainnet first — where the deepest liquidity lives. Multi-chain expansion to follow.
        </motion.p>
        <motion.div
          className="network-pills"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {chains.map((c) => (
            <motion.div key={c.name} className={`network-pill ${!c.live ? 'network-pill-dim' : ''}`} variants={item}>
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
