import React from "react"
import { motion } from "framer-motion"
import PillText from "../PillText/PillText"
import "./LaunchPage.css"

const chains = [
  { name: "Ethereum", icon: "/img/chains/ethereum.svg" },
  { name: "Base", icon: "/img/chains/base.svg" },
  { name: "Unichain", icon: "/img/chains/unichain.svg" },
];

const LaunchPage = () => {
  return (
    <div className="launch-page">
      {/* Gradient divider */}
      <div className="launch-divider" />

      <motion.div
        className="launch-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <PillText>2025</PillText>
        <div className="launch-title">Live on Ethereum, Base, and Unichain</div>
        <div className="launch-subtitle">Expanding to other networks soon</div>
        <div className="launch-chains">
          {chains.map((chain) => (
            <div key={chain.name} className="launch-chain-card">
              <img src={chain.icon} alt={chain.name} className="launch-chain-icon" onError={(e) => { e.target.style.display = 'none' }} />
              <span className="launch-chain-name">{chain.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default LaunchPage
