import "./TitlePage.css"
import AppScreenshot from '/img/new-home-page/AppScreenshot.png'
import LaptopMockup from '/img/new-home-page/LaptopMockup.svg'
import CheckMark from "/img/new-home-page/CheckMark.png"
import Button from "../Button/Button"
import Arrow from "/img/new-home-page/Arrow.png"
import ScrollingTokens from "../ScrollingTokens/ScrollingTokens"
import React from "react";

const TitlePage = () => {

  const handleJoin = () => {
    window.open("https://jcpus0zj96h.typeform.com/to/oD5JRttA");
  }

  return (
    <div className="title-page with-background">
      <div className="title-page-flex">
        <div className="title-page-info">
          <div className="title">
            <div>Effortless option</div>
            <div>trading on any</div>
            <div>crypto asset</div>
          </div>
          <div className="subtitles">
            <div>
              <img src={CheckMark} alt="Checkmark" className="checkmark"/>
              <span className="subtitle">Oracle-free</span>
            </div>
            <div>
              <img src={CheckMark} alt="Checkmark" className="checkmark"/>
              <span className="subtitle">Permissionless</span>
            </div>
            <div>
              <img src={CheckMark} alt="Checkmark" className="checkmark"/>
              <span className="subtitle">No Liquidity Fragmentation</span>
            </div>
          </div>
          <Button className="join-button" onClick={handleJoin}>
            <span className="join-button-text">Join the Gated Launch</span>
            <img src={Arrow} alt="arrow" />
          </Button>
        </div>
        <div className="screenshot-container">
          <img src="/img/new-home-page/LaptopMockup.svg" alt="App Screenshot" className="app-screenshot"/>
        </div>
      </div>
      <ScrollingTokens/>
    </div>
  )
}

export default TitlePage
