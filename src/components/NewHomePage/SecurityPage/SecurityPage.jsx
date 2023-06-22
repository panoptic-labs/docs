import AbdkIcon from "../Icons/ABDK"
import "./SecurityPage.css"
import React from "react"


const SecurityPage = () => {

  return (
    <div className="security-page">
      <div className="heading">
        <div className="headerBorder">
          <h3 className="smallHeader">State-of-the-Art-Security</h3>
        </div>
        <div className="mainHeader">
          <p>Our 360 Audit:</p>
          <p>setting new </p>
          <p>standards for </p>
          <p>platform security</p>
        </div>
      </div>
      <div className="abdkIcons">
        <AbdkIcon/>
        <AbdkIcon/>
        <AbdkIcon/>
      </div>
    </div>
  )
}

export default SecurityPage