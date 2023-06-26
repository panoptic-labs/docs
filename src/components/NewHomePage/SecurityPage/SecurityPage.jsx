import AbdkIcon from "../Icons/ABDK";
import * as Tabs from "@radix-ui/react-tabs";
import "./SecurityPage.css";
import React, { useState } from "react";
import DocumentIcon from "../Icons/Document";
import AoIcon from "../Icons/Ao";
import MagnifyingIcon from "../Icons/Magnifying";
import ArrowIcon from "../Icons/Arrow";

const SecurityPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const RenderIcon = () => {
    if (activeTab === "tab1") {
      return (
        <>
          <div className="icon-container">
            <DocumentIcon color={"#28CB95"} />
            <DocumentIcon color={"#F3F3F3"} />
            <DocumentIcon color={"#F3F3F3"} />
            <DocumentIcon color={"#28CB95"} />
          </div>
          <div className="icon-container">
            <DocumentIcon color={"#F3F3F3"} />
            <DocumentIcon color={"#F3F3F3"} />
            <DocumentIcon color={"#28CB95"} />
            <DocumentIcon color={"#F3F3F3"} />
          </div>
        </>
      );
    }
    if (activeTab === "tab2") {
      return (
        <>
          <div className="icon-container">
            <AoIcon color={"#28CB95"} />
            <AoIcon color={"#F3F3F3"} />
            <AoIcon color={"#F3F3F3"} />
            <AoIcon color={"#28CB95"} />
          </div>
          <div className="icon-container">
            <AoIcon color={"#F3F3F3"} />
            <AoIcon color={"#F3F3F3"} />
            <AoIcon color={"#28CB95"} />
            <AoIcon color={"#F3F3F3"} />
          </div>
        </>
      );
    }
    if (activeTab === "tab3") {
      return (
        <>
          <div className="icon-container">
            <MagnifyingIcon color={"#28CB95"} />
            <MagnifyingIcon color={"#F3F3F3"}/>
            <MagnifyingIcon color={"#F3F3F3"}/>
            <MagnifyingIcon color={"#28CB95"} />
          </div>
          <div className="icon-container">
            <MagnifyingIcon color={"#F3F3F3"}/>
            <MagnifyingIcon color={"#F3F3F3"}/>
            <MagnifyingIcon color={"#28CB95"} />
            <MagnifyingIcon color={"#F3F3F3"}/>
          </div>
        </>
      );
    }
  };

  return (
    <div className="security-page">
      <div className="security-flex">
        <div className="heading-section">
          <div className="headerBorder">
            <h3 className="smallHeader">State-of-the-Art-Security</h3>
          </div>
          <div className="mainHeader">
            <span>
              Our <span style={{ color: "#28CB95" }}>360 Audit:</span>{" "}
            </span>
            <p className="no-break">setting new </p>
            <p className="no-break">standards for </p>
            <p className="no-break">platform security</p>
          </div>
          <div className="abdkIcons">
            <AbdkIcon />
            <AbdkIcon />
            <AbdkIcon />
          </div>
          <div className="arrow">
            <ArrowIcon />
          </div>
        </div>
        <div className="tab-section">
          <div className="scrollingIconsBorder">
            <div className="scrollingIcons">{RenderIcon()}</div>
          </div>
          <Tabs.Root
            className="TabsRoot"
            defaultValue="tab1"
            value={activeTab}
            onValueChange={(event) => setActiveTab(event)}
          >
            <Tabs.List className="TabsList" aria-label="Security">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                Smart Contracts
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Full-Stack Security
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab3">
                Economic Security
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
              <p className="Text">
                Using simulations and agent-based modeling, we stress-tested and
                fine-tuned parameters to revolutionize our understanding of its
                economic dynamics. This comprehensive approach identified
                vulnerabilities and ensured stability under different market
                conditions. Our economic audit sets us apart, inspiring
                confidence among users and investors. With a solid foundation,
                our protocol thrives, attracting a growing community that values
                its resilience.
              </p>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
              <p className="Text">
                We have revolutionized security standards by conducting holistic
                audits of both our frontend and backend systems. By thoroughly
                examining every aspect of our protocol, we ensure comprehensive
                protection. This approach goes beyond just smart contract
                security, encompassing the entire system.Our diligent audits
                address vulnerabilities in both frontend and backend components,
                fortifying our protocol against potential risks. As a result, we
                have set a new benchmark for security, instilling trust and
                confidence among our users.
              </p>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab3">
              <p className="Text">
                Our protocol's resilience has been greatly strengthened through
                an in-depth economic audit. Using simulations and agent-based
                modeling, we stress-tested and fine-tuned parameters to
                revolutionize our understanding of its economic dynamics. This
                comprehensive approach identified vulnerabilities and ensured
                stability under different market conditions. Our economic audit
                sets us apart, inspiring confidence among users and investors.
                With a solid foundation, our protocol thrives, attracting a
                growing community that values its resilience.
              </p>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
