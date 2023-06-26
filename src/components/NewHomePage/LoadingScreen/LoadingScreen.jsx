import React from "react"
import "./LoadingScreen.css"

const LaunchPage = () => {

  return (
    <div className="loading-screen">
      <div>
        <img src={`/img/logo-dark.svg`} alt="logo" className="loading-logo"/>
      </div>
      <div className="curtain curtain-left"/>
      <div className="curtain curtain-right"/>
    </div>
  )
}

export default LaunchPage