import aave from '/img/coins/aave.png';
import comp from '/img/coins/comp.png';
import dai from '/img/coins/dai.png';
import usdc from '/img/coins/usdc.png';
import matic from '/img/coins/matic.png';
import shib from '/img/coins/shib.png';
import sushi from '/img/coins/sushi.png';
import uni from '/img/coins/uni.png'
import React from "react";
import "./Token.css";

const tokenImages = {
  "AAVE": aave,
  "COMP": comp,
  "DAI": dai,
  "USDC": usdc,
  "MATIC": matic,
  "SHIB": shib,
  "SUSHI": sushi,
  "UNI": uni,
};

const Token = ({ tokenName }) => {
  const imageSrc = tokenImages[tokenName];

  return (
    <div className="token-icon">
      <img src={imageSrc} alt="token"/>
      <div className="token-name">
        {tokenName}
      </div>
    </div>
  )
}

export default Token