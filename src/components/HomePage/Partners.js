import React from "react";

import "./Partners.css";

const Partners = () => {
  return (
    <section className="partners">
      <h3 className="partners__title">Partners</h3>
      <div className="partners__blocks">
        <div className="partners__invertors__block">
          <h4 className="invertors__block__title">Investors</h4>
          <div className="investors__block__cards">
            {investors.map((card) => (
              <img key={card} src={`/img/partners/${card}.svg`} alt={card} />
            ))}
          </div>
        </div>
        <div className="partners__security__block">
          <h4 className="security__block__title">Security</h4>
          <div className="security__block__cards">
            {security.map((card) => (
              <img key={card} src={`/img/security/${card}.svg`} alt={card} />
            ))}
          </div>
        </div>
      </div>
      <div className="partners__chains">
        <h4 className="partners__chains__title">Chains</h4>
        <div className="partners__chains__cards">
          {chains.map((card) => (
            <img key={card} src={`/img/chains/${card}.svg`} alt={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

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

const security = ["abdk", "simtopia", "open-zeppelin"];

const chains = ["etherum", "arbitrum", "optimism", "polygon", "base", "binance"];

export default Partners;
