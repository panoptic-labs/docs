import "./TitlePage.css"
import CheckMark from "/img/new-home-page/CheckMark.png"
import Button from "../Button/Button"
import Arrow from "/img/new-home-page/Arrow.png"
import ScrollingTokens from "../ScrollingTokens/ScrollingTokens"
import React from "react";

const TitlePage = () => {

  const handleJoin = () => {
    window.open("https://signup.panoptic.xyz/");
  }

  return (
    <div className="title-page with-background">
      <div className="title-page-flex">
        <div className="title-page-info">
          <div className="title">
            <div>Effortless options</div>
            <div>trading on any</div>
            <div>crypto asset</div>
          </div>
          <div className="subtitles">
            <div>
              <img src={CheckMark} alt="Checkmark" className="checkmark"/>
              <span className="subtitle">Any Token</span>
            </div>
            <div>
              <img src={CheckMark} alt="Checkmark" className="checkmark"/>
              <span className="subtitle">Any Strike</span>
            </div>
            <div>
              <img src={CheckMark} alt="Checkmark" className="checkmark"/>
              <span className="subtitle">Any Size</span>
            </div>
          </div>
          <Button className="join-button" onClick={handleJoin}>
            <span className="join-button-text">Sign up for our beta launch</span>
            <img src={Arrow} alt="arrow" />
          </Button>
        </div>
        <div className="screenshot-container">
          <img src="/img/new-home-page/title-page-image.svg" alt="App Screenshot" className="app-screenshot"/>
        </div>
      </div>
      <ScrollingTokens/>
    </div>
  )
}

export default TitlePage
