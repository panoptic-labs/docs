import React from "react"
import PillText from "../PillText/PillText"
import "./LaunchPage.css"

const LaunchPage = () => {

  return (
    <div className="launch-page launch-background">
      <div className="launch-text">
        <PillText>2025</PillText>
        <div className="launch-title">Live on Ethereum Mainnet</div>
        <div className="launch-subtitle">Expanding to other networks soon</div>
      </div>
    </div>
  )
}

export default LaunchPage
