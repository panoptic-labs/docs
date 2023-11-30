import React from "react"
import PillText from "../PillText/PillText"
import "./LaunchPage.css"

const LaunchPage = () => {

  return (
    <div className="launch-page launch-background">
      <div className="launch-text">
        <PillText>Early 2024</PillText>
        <div className="launch-title">Launching on the Ethereum Mainnet</div>
        <div className="launch-subtitle">Followed by other networks</div>
      </div>
    </div>
  )
}

export default LaunchPage
