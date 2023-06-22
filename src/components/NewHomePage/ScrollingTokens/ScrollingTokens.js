import Token from "../Token/Token"
import React from "react";
import "./ScrollingTokens.css"

const ScrollingTokens = () => {
  const tokenList = [
    "USDC",
    "UNI",
    "AAVE",
    "MATIC",
    "COMP",
    "SUSHI",
    "SHIB",
    "DAI",
  ]

  return (
    <div className="scrolling-tokens-container">
      <div className="scrolling-tokens">
        <div className="token-set">
          {tokenList.map((token) => (
            <div key={token} className="token-container">
              <Token tokenName={token} />
            </div>
          ))}
        </div>
        <div className="token-set">
          {tokenList.map((token) => (
            <div key={token} className="token-container">
              <Token tokenName={token} />
            </div>
          ))}
        </div>
        <div className="token-set">
          {tokenList.map((token) => (
            <div key={token} className="token-container">
              <Token tokenName={token} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScrollingTokens