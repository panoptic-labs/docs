import React, { useEffect } from "react"

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
        <div>Backed by a trusted team of Investors & Partners</div>
      </div>
      <div className="partner-logos-container">
        <div className="partner-logos">
          {investors.map((card) => (
            <img key={card} src={`/img/partners/${card}.svg`} alt={card} className={`investor ${card}`} />
          ))}
        </div>
      </div>
      <AlchemyBadge />
    </div>
  )
}

export default PartnerPage

const onClickBadge = () => window.logBadgeClick?.()
const BADGE_ID = 'c8708fea2d00c442'

function AlchemyBadge() {
  useEffect(() => {
    // avoids adding twice
    if (window.logBadgeClick) return

    window.BADGE_ID = BADGE_ID

    const script = document.createElement('script');
    script.src = "https://static.alchemyapi.io/scripts/badge/alchemy-badge.js";
    script.async = true;
    script.id = BADGE_ID

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [])

  return <img onClick={onClickBadge} id="badge-button" style={{ width: '240px', height: '40px', cursor: 'pointer' }} src="https://static.alchemyapi.io/images/marketing/alchemy-wagbi-badge-dark.png" alt="Alchemy Supercharged" />

}