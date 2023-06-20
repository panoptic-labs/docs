import React from "react"

import "./PartnerPage.css"

const PartnerPage = () => {

  const investors = [
    "gumi-crypos",
    "uniswap",
    "zee-drime-capital",
    "sevenx",
    "hailstone",
    "coinbase",
    "jane-street",
    "big-brain",
    "mh",
    "divergence",
    "blizzard",
  ];

  return (
    <div className="partner-page">
      <div className="partner-text">
        <div>Backed by a trusted team</div>
        <div>of Investors & Partners...</div>
      </div>
      <div className="partner-logos">
        {investors.map((card) => (
          <img key={card} src={`/img/partners/${card}.svg`} alt={card} className="investor"/>
        ))}
      </div>
    </div>
  )
}

export default PartnerPage