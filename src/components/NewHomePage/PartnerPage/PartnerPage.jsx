import React from "react";
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

  return (
    <div className="partner-page">
      <div className="partner-text">
        <div>Backed by a trusted team of Investors &amp; Partners</div>
      </div>
      <div className="partner-logos-container">
        <div className="partner-logos">
          {investors.map((card) => (
            <img key={card} src={`/img/partners/${card}.svg`} alt={card} className={`investor ${card}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
