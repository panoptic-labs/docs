import React from "react"

import "./PartnerPage.css"

const PartnerPage = () => {

  const investors = [
    "gumi-crypos",
    "uniswap",
    "coinbase",
    "jane-street",
    "blizzard",
    "hailstone",
    "sevenx",
    "divergence",
    "zee-drime-capital",
    "mh",
    "big-brain",
  ];

  return (
    <div className="partner-page">
      <div className="partner-text">
        <div>Backed by a trusted team of Investors & Partners...</div>
      </div>
      <div className="partner-logos-container">
        <div className="partner-logos">
          {investors.map((card) => (
            <img key={card} src={`/img/partners/${card}.svg`} alt={card} className="investor"/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PartnerPage