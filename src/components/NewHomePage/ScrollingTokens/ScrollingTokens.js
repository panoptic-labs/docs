import Token from "../Token/Token"
import React from "react";
import useInViewAnimation from "../../../hooks/useInViewAnimation";
import "./ScrollingTokens.css"

const ScrollingTokens = () => {
  const { ref, inView } = useInViewAnimation();
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
    <div className="scrolling-tokens-container" ref={ref}>
      <div className={`scrolling-tokens ${inView ? '' : 'paused'}`}>
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