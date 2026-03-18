import "./TitlePage.css"
import ScrollingTokens from "../ScrollingTokens/ScrollingTokens"
import React from "react";
import { APP_LINK } from "../../../constants";

const TitlePage = () => {
  return (
    <div className="title-page with-background">
      <div className="title-page-flex">
        <div className="title-page-info">
          <div className="title">
            <div>Perpetual Options. Any Token. Onchain.</div>
          </div>
          <div className="hero-buttons">
            <a href={APP_LINK} className="hero-button-primary" target="_blank" rel="noopener noreferrer">
              Launch App
            </a>
            <a href="/docs/intro" className="hero-button-secondary">
              Read Docs
            </a>
          </div>
          <div className="stats-bar">
            <div className="stat">
              <div className="stat-value">$50M+</div>
              <div className="stat-label">TVL</div>
            </div>
            <div className="stat">
              <div className="stat-value">$500M+</div>
              <div className="stat-label">Volume</div>
            </div>
            <div className="stat">
              <div className="stat-value">500+</div>
              <div className="stat-label">Markets</div>
            </div>
            <div className="stat">
              <div className="stat-value">100K+</div>
              <div className="stat-label">Trades</div>
            </div>
          </div>
        </div>
      </div>
      <ScrollingTokens/>
    </div>
  )
}

export default TitlePage
