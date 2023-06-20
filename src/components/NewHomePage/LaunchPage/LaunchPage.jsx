import React from "react"
import PillText from "../PillText/PillText"
import "./LaunchPage.css"

const LaunchPage = () => {

  return (
    <div className="launch-page launch-background">
      <div className="launch-text">
        <PillText text="Fall 2023"/>
        <div className="launch-title">Launching on the Ethereum Mainnet.</div>
        <div className="launch-subtitle">Followed by Chain 1, Chain 2, Chain 3, and Chain 4</div>
      </div>
    </div>
  )
}

export default LaunchPage