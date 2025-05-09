import "./TitlePage.css"
import EmailSignUp from "../EmailSignup/EmailSignup";
import ScrollingTokens from "../ScrollingTokens/ScrollingTokens"
import React from "react";
import CheckIcon from '../../icons/CheckIcon'

const TitlePage = () => {

  const handleJoin = () => {
    window.open("https://signup.panoptic.xyz/");
  }

  return (
    <div className="title-page with-background">
      <div className="title-page-flex">
        <div className="title-page-info">
          <div className="title">
            <div>Effortless crypto options</div>
          </div>
          <div className="subtitles">
            <div className="subtitle-with-icon">
              <CheckIcon/>
              <span className="subtitle">Any Token</span>
            </div>
            <div className="subtitle-with-icon">
              <CheckIcon/>
              <span className="subtitle">Any Strike</span>
            </div>
            <div className="subtitle-with-icon">
            <CheckIcon/>  
              <span className="subtitle">Any Size</span>
            </div>
          </div>
          <EmailSignUp />
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
