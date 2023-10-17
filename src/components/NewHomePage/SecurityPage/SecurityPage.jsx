import AbdkIcon from "../Icons/ABDK";
import * as Tabs from "@radix-ui/react-tabs";
import "./SecurityPage.css";
import React, { useState } from "react";
import DocumentIcon from "../Icons/Document";
import AoIcon from "../Icons/Ao";
import MagnifyingIcon from "../Icons/Magnifying";
import PillText from "../PillText/PillText"

const SecurityPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const iconMap = {
    tab1: {
      white: <DocumentIcon color={"#F3F3F3"}/>,
      green: <DocumentIcon color={"#28CB95"}/>,
    },
    tab2: {
      white: <AoIcon color={"#F3F3F3"}/>,
      green: <AoIcon color={"#28CB95"}/>,
    },
    tab3: {
      white: <MagnifyingIcon color={"#F3F3F3"}/>,
      green: <MagnifyingIcon color={"#28CB95"}/>,
    },
  };
  
  const RenderIcon = () => {
    const activeIconWhite = iconMap[activeTab].white;
    const activeIconGreen = iconMap[activeTab].green;
    
    return (
      <>
        <div className="icon-container">
          {activeIconGreen}
          {activeIconWhite}
          {activeIconWhite}
        </div>
        <div className="icon-container">
          {activeIconGreen}
          {activeIconWhite}
          {activeIconWhite}
        </div>
      </>
    );
  };

  return (
    <div className="security-page">
      <div className="security-flex">
        <div className="heading-section">
          <div className="header-border">
            <div className="small-header">
              <PillText>State-of-the-Art-Security</PillText>
            </div>
          </div>
          <div className="main-header">
            <span>
              Our <span style={{ color: "#28CB95" }}>360° Audit:</span>{" "}
            </span>
            <p className="no-break">Setting new standards</p>
            <p className="no-break">standards for</p>
            <p className="no-break">platform security</p>
          </div>
        </div>
        <div className="tab-section">
          <div className="scrolling-icons-border">
            <div className="scrolling-icons">{RenderIcon()}</div>
          </div>
          <Tabs.Root
            className="tabs-root"
            defaultValue="tab1"
            value={activeTab}
            onValueChange={(event) => setActiveTab(event)}
          >
            <Tabs.List className="tabs-list" aria-label="Security">
              <Tabs.Trigger className="tabs-trigger tab1" value="tab1">
                Smart Contracts
                <div className="tab-trigger-underline"/>
              </Tabs.Trigger>
              <Tabs.Trigger className="tabs-trigger" value="tab2">
                Full-Stack Security
                <div className="tab-trigger-underline"/>
              </Tabs.Trigger>
              <Tabs.Trigger className="tabs-trigger" value="tab3">
                Economic Security
                <div className="tab-trigger-underline"/>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="tabs-content" value="tab1">
              {/* <p className="text"> */}
              Employing cutting-edge tools, frameworks, and renowned security firms, we perform stringent audits on our blockchain smart contracts. Our approach integrates modern technologies with industry-best practices to scrutinize and optimize these contracts.
              {/* </p> */}
            </Tabs.Content>
            <Tabs.Content className="tabs-content" value="tab2">
              {/* <p className="text"> */}
              Implementing revolutionary security measures, we conduct exhaustive audits on both our frontend and backend systems. Through rigorous scrutiny of our whole protocol, we deliver all-encompassing protection. Our audits target and address vulnerabilities in the entire stack, bolstering our protocol against a variety of risks. 
              {/* </p> */}
            </Tabs.Content>
            <Tabs.Content className="tabs-content" value="tab3">
              {/* <p className="text"> */}
              Harnessing advanced simulations and agent-based modeling, we optimize our protocol parameters to ensure a robust and dynamic platform. Our comprehensive approach unearths vulnerabilities, fortifying stability even in extreme market conditions.
              {/* </p> */}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;