import React from "react"
import PillText from "../PillText/PillText"
import "./DemoPage.css"

const DemoPage = () => {

  return (
    <div className="demo-page">
      <div className="demo-flex">
        <div className="demo-text">
          <PillText text="Streamlined Trading"/>
          <div className="demo-title">
            <div>Panoptic App</div>
            <div>puts you in the</div>
            <div>Control Center</div>
          </div>
          <div className="demo-subtitle">
            <div>
              enabling both 
              <span className="text-green"> out-of-the-</span>
            </div>
            <div>
              <span className="text-green">box ease</span>
              {` AND `}
              <span className="text-purple">power-user</span>
            </div>
            <div className="text-purple">performance.</div>
          </div>
          <div className="demo-details">
            <div>Swap assets and options fully liquidly powered by our</div>
            <div>
              {`integration, the `}
              <PillText text="Uniswap v3"/>
            </div>
            <div>largest decentralized exchange on Ethereum</div>
          </div>
          <div className="hovering-arrow-container">
            <img src={`/img/new-home-page/hovering-arrow.svg`} alt="hovering-arrow" className="hovering-arrow"/>
          </div>
        </div>
        <div className="demo-interactive">
          <div>TODO:</div>
        </div>
      </div>
      <div className="demo-video">
        <div className="video-text">Just watch the Demo</div>
        <div className="play-button">
          PLAY
        </div>
        <img src={`/img/new-home-page/video-thumbnail.png`} alt="video-thumbnail" className="video-thumbnail"/>
      </div>

    </div>
  )
}

export default DemoPage