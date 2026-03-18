import React from "react";
import "./VerticalsSection.css";

const features = [
  { emoji: "♾️", title: "Perpetual Options", description: "No expiry dates — hold positions as long as you want" },
  { emoji: "⚡", title: "Up to 10x Leverage", description: "Capital-efficient trading with built-in risk controls" },
  { emoji: "🪙", title: "Any Token", description: "Trade options on any asset with a Uniswap pool" },
  { emoji: "🧩", title: "Multi-leg Strategies", description: "Combine puts, calls, and spreads in a single position" },
  { emoji: "🔮", title: "Oracle-Free", description: "No oracle dependency — pricing derived from Uniswap liquidity" },
  { emoji: "🔐", title: "Self-Custody", description: "Your keys, your funds — fully non-custodial" },
];

export default function VerticalsSection() {
  return (
    <div className="verticals-section container mx-auto text-center py-20 flex flex-col gap-y-6 text-white" style={{ backgroundColor: '#0f0426' }}>
      <h2 className="text-white text-4xl font-bold">Built for DeFi Traders</h2>
      <div className="feature-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <span className="feature-emoji">{f.emoji}</span>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
