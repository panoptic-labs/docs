import React from "react"
import * as Accordion from '@radix-ui/react-accordion';
import Button from "../Button/Button";
import Link from "@docusaurus/Link";
import "./FAQPage.css"

const FAQPage = () => {
  return (
    <div className="faq-page">
      <div className="faq-content">
        <div className="faq-title">
          Frequently Asked Questions
        </div>
        <div className="faq-accordion">
          <Accordion.Root className="accordion-root" type="single" defaultValue="item-1" collapsible>
            <Accordion.Item className="accordion-item" value="item-1">
              <AccordionTrigger className="first-trigger">What is Panoptic?</AccordionTrigger>
              <AccordionContent>
                The Panoptic protocol enables the minting, trading, and market-making of perpetual put and call options. All smart contracts are available 24/7 and users can interact with the Panoptic protocol without the need for intermediaries like banks, brokerage firms, clearinghouses, market makers, or centralized exchanges.
              </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-2">
            <AccordionTrigger>How can I use Panoptic?</AccordionTrigger>
              <AccordionContent>
                You can access Panoptic by connecting your wallet to the Panoptic App (app.panoptic.xyz).
              </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-3">
              <AccordionTrigger>What are the key benefits?</AccordionTrigger>
              <AccordionContent>
                Options in Panoptic differ slightly from conventional options. Instead of using a clearinghouse to settle options contracts, the Panoptic protocol uses Liquidity Provider (LP) positions in Uniswap v3 as a fundamental building block for trading long and short options. 
                <br/>
                <br/>
                Panoptic allows users to access new and improved features when trading options:
                <br/>
                1) Panoptic options never expire and are perpetual.
                <br/>
                2) Anybody can deploy an options market on any asset in a permissionless manner.
                <br/>
                3) Panoptic enables anyone to lend their capital to options traders as a liquidity provider.
                <br/>
                4) Pricing is path-dependent and does not involve counterparties (such as market makers).
              </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-4">
            <AccordionTrigger>Which assets can I trade?</AccordionTrigger>
              <AccordionContent>
                Panoptic works on any ERC20 token. Panoptic users can create an options market on any token pair that exists on Uniswap V3.
              </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-5">
              <AccordionTrigger>What networks can I access Panoptic on?</AccordionTrigger>
              <AccordionContent>
                Panoptic is live on Ethereum mainnet and Unichain, and will launch on EVM-compatible layer 2's where Uniswap v3 and v4 smart contracts have been deployed.
              </AccordionContent>
            </Accordion.Item>
          </Accordion.Root>
        </div>
        <div className="faq-button-container">
          <Link to="/docs/faq/">
            <Button>More Questions?</Button>
          </Link>
        </div>
      </div>

    </div>
  )
};

const AccordionTrigger = ({children, className}) => (
  <Accordion.Header className="accordion-header">
    <Accordion.Trigger className={`accordion-trigger ${className}`}>
      <span>{children}</span>
      <div className="faq-arrow-container">
        <img src={`/img/new-home-page/faq-arrow.svg`} alt="faq-arrow" className="faq-arrow"/>
      </div>
    </Accordion.Trigger>
  </Accordion.Header>
);

const AccordionContent = ({children}) => (
  <Accordion.Content className="accordion-content">
    <div className="accordion-content-text">
      {children}
    </div>
  </Accordion.Content>
);

export default FAQPage
