import AbdkIcon from "../Icons/ABDK";
import * as Tabs from "@radix-ui/react-tabs";
import "./SecurityPage.css";
import React from "react";

const SecurityPage = () => {
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
        </div>
        <div className="tab-section">
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Security">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                Smart Contracts
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Full-Stack Security 
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Economic Security
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
              <p className="Text">
                Using simulations and agent-based modeling, we stress-tested and fine-tuned parameters to revolutionize our understanding of its economic dynamics. This comprehensive approach identified vulnerabilities and ensured stability under different market conditions. Our economic audit sets us apart, inspiring confidence among users and investors. With a solid foundation, our protocol thrives, attracting a growing community that values its resilience."
              </p>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
              <p className="Text">
                TODO: 
                Using simulations and agent-based modeling, we stress-tested and fine-tuned parameters to revolutionize our understanding of its economic dynamics. This comprehensive approach identified vulnerabilities and ensured stability under different market conditions. Our economic audit sets us apart, inspiring confidence among users and investors. With a solid foundation, our protocol thrives, attracting a growing community that values its resilience."
              </p>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab3">
              <p className="Text">
                TODO:
                Using simulations and agent-based modeling, we stress-tested and fine-tuned parameters to revolutionize our understanding of its economic dynamics. This comprehensive approach identified vulnerabilities and ensured stability under different market conditions. Our economic audit sets us apart, inspiring confidence among users and investors. With a solid foundation, our protocol thrives, attracting a growing community that values its resilience."
              </p>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
