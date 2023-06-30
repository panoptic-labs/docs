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
          <div className="abdk-icons">
            <AbdkIcon />
            <AbdkIcon />
            <AbdkIcon />
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
                Using simulations and agent-based modeling, we stress-tested and
                fine-tuned parameters to revolutionize our understanding of its
                economic dynamics. This comprehensive approach identified
                vulnerabilities and ensured stability under different market
                conditions. Our economic audit sets us apart, inspiring
                confidence among users and investors. With a solid foundation,
                our protocol thrives, attracting a growing community that values
                its resilience.
              {/* </p> */}
            </Tabs.Content>
            <Tabs.Content className="tabs-content" value="tab2">
              {/* <p className="text"> */}
                We have revolutionized security standards by conducting holistic
                audits of both our frontend and backend systems. By thoroughly
                examining every aspect of our protocol, we ensure comprehensive
                protection. This approach goes beyond just smart contract
                security, encompassing the entire system.Our diligent audits
                address vulnerabilities in both frontend and backend components,
                fortifying our protocol against potential risks. As a result, we
                have set a new benchmark for security, instilling trust and
                confidence among our users.
              {/* </p> */}
            </Tabs.Content>
            <Tabs.Content className="tabs-content" value="tab3">
              {/* <p className="text"> */}
                Our protocol's resilience has been greatly strengthened through
                an in-depth economic audit. Using simulations and agent-based
                modeling, we stress-tested and fine-tuned parameters to
                revolutionize our understanding of its economic dynamics. This
                comprehensive approach identified vulnerabilities and ensured
                stability under different market conditions. Our economic audit
                sets us apart, inspiring confidence among users and investors.
                With a solid foundation, our protocol thrives, attracting a
                growing community that values its resilience.
              {/* </p> */}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
