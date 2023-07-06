import AbdkIcon from "../Icons/ABDK";
import * as Tabs from "@radix-ui/react-tabs";
import "./SecurityPage.css";
import React, { useState } from "react";
import DocumentIcon from "../Icons/Document";
import AoIcon from "../Icons/Ao";
import MagnifyingIcon from "../Icons/Magnifying";
import ArrowIcon from "../Icons/Arrow";
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
            <p className="no-break">setting new </p>
            <p className="no-break">standards for </p>
            <p className="no-break">platform security</p>
          </div>
          <div className="arrow-container">
            <div className="arrow hovering-arrow">
              <ArrowIcon />
            </div>
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
              Employing cutting-edge tools, frameworks, and renowned security firms, we perform stringent audits on our blockchain smart contracts. Our approach integrates modern technologies with industry-best practices to scrutinize and optimize these contracts. The use of such avant-garde resources facilitates thorough audit processes, strengthening the integrity of our blockchain. Consequently, our resilient smart contracts are backed by rigorous audits, raising the bar for blockchain security and instilling unparalleled confidence among our users.
              {/* </p> */}
            </Tabs.Content>
            <Tabs.Content className="tabs-content" value="tab2">
              {/* <p className="text"> */}
              Implementing revolutionary security measures, we conduct exhaustive audits on our frontend and backend systems. Through rigorous scrutiny of our entire protocol, we deliver all-encompassing protection. Our method extends beyond mere smart contract security, covering the full system scope. Our diligent audits target and address vulnerabilities in frontend and backend elements, bolstering our protocol against possible risks. Consequently, we’ve established a new gold standard for security, fostering unshakeable trust among our users.
              {/* </p> */}
            </Tabs.Content>
            <Tabs.Content className="tabs-content" value="tab3">
              {/* <p className="text"> */}
              Harnessing advanced simulations and agent-based modeling, we've meticulously optimized parameters to redefine economic dynamics. Our comprehensive approach unearths vulnerabilities, fortifying stability in varied market conditions. Our distinctive economic audit cultivates trust among users and investors. Built on a robust foundation, our protocol flourishes, attracting a community that values resilience.
              {/* </p> */}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
