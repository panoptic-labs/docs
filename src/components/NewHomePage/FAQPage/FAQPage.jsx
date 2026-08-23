import React from "react"
import * as Accordion from '@radix-ui/react-accordion';
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";
import Link from "@docusaurus/Link";
import "./FAQPage.css"

const FAQPage = () => {
  return (
    <div className="faq-page">
      <div className="faq-content">
        <motion.div
          className="faq-left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">FAQ</div>
          <h2 className="faq-title">
            Frequently Asked<br/>Questions
          </h2>
          <div className="faq-button-container">
            <Link to="/docs/faq/">
              <Button>More Questions?</Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="faq-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion.Root className="accordion-root" type="single" defaultValue="item-1" collapsible>
            <Accordion.Item className="accordion-item" value="item-1">
              <AccordionTrigger>What is Panoptic?</AccordionTrigger>
              <AccordionContent>
                Panoptic is the perpetual options protocol built on Uniswap. LPs stake their Uniswap positions to earn extra yield on top of trading fees, traders buy and sell options that never expire, and depositors earn passively through curator-run vaults. Everything settles on-chain — no intermediaries, no oracles, no expiry dates.
              </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-2">
            <AccordionTrigger>I already LP on Uniswap — why stake through Panoptic?</AccordionTrigger>
              <AccordionContent>
                Staking your position through Panoptic keeps your range and market exposure exactly as they are. On top of Uniswap-equivalent fees, you earn Panoptic's liquidity spread — streaming premia paid by options traders who borrow your liquidity. You can unstake at any time, and your position stays non-custodial throughout.
              </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-3">
            <AccordionTrigger>How can I use Panoptic?</AccordionTrigger>
              <AccordionContent>
                Connect your wallet to the Panoptic App (app.panoptic.xyz). From there you can stake an existing Uniswap LP position, trade perpetual options, or deposit into a curator-run vault for passive yield.
              </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-4">
              <AccordionTrigger>What are the key benefits?</AccordionTrigger>
              <AccordionContent>
                Instead of using a clearinghouse to settle options contracts, Panoptic uses Liquidity Provider (LP) positions in Uniswap v3 and v4 as the fundamental building block for options.
                <br/>
                <br/>
                That unlocks:
                <br/>
                1) LPs earn a liquidity spread on top of Uniswap-equivalent fees by staking their positions.
                <br/>
                2) Options never expire and are perpetual.
                <br/>
                3) Anybody can deploy an options market on any asset in a permissionless manner.
                <br/>
                4) Pricing is path-dependent and does not involve counterparties like market makers or oracles.
              </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-5">
            <AccordionTrigger>Which assets can I trade?</AccordionTrigger>
              <AccordionContent>
                Panoptic works on any ERC20 token. Panoptic users can create an options market on any token pair that exists on Uniswap v3 or v4.
              </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-6">
              <AccordionTrigger>What networks can I access Panoptic on?</AccordionTrigger>
              <AccordionContent>
                Panoptic V2 is live on Ethereum mainnet. Multi-chain expansion to follow.
              </AccordionContent>
            </Accordion.Item>
          </Accordion.Root>
        </motion.div>
      </div>
    </div>
  )
};

const AccordionTrigger = ({children, className}) => (
  <Accordion.Header className="accordion-header">
    <Accordion.Trigger className={`accordion-trigger ${className || ''}`}>
      <span>{children}</span>
      <div className="faq-arrow-container">
        <img src={`/img/new-home-page/faq-arrow.svg`} alt="" className="faq-arrow"/>
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
