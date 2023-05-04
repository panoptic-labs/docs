import React, { useState } from "react";

import "./FAQ.css";
import Button from "../other/Button";
import useResponsive from "../../hooks/useResponsive";
import GridPosts from "./FAQ/GridPosts";
import AccordionPosts from "./FAQ/AccordionPosts";

const FAQ = () => {
  const { isTabletWidth } = useResponsive();
  const stopIndex = 3;
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="faq" id={'faq'}>
      <div className="faq__container">
        <h2 className="faq__title">F.A.Q.</h2>
        {isTabletWidth ? (
          <AccordionPosts faq={faq} showMore={showMore} stopIndex={stopIndex} />
        ) : (
          <GridPosts faq={faq} showMore={showMore} stopIndex={stopIndex} />
        )}
        {!showMore && (
          <Button
            className="faq__load-more"
            variant="outlined"
            onClick={setShowMore.bind(null, true)}
          >
            More
          </Button>
        )}
      </div>
    </section>
  );
};

const faq = [
  {
    id: 1,
    title: "What is Panoptic?",
    description:
      "The Panoptic protocol enables the minting, trading, and market-making of perpetual put and call options. All smart contracts are available 24/7 and users can interact with the Panoptic protocol without the need for intermediaries like banks, brokerage firms, clearinghouses, market makers, or centralized exchanges.",
  },
  {
    id: 2,
    title: "How can I use Panoptic?",
    description:
      "You can access Panoptic by connected your wallet to the Panoptic App, which will be deployed on app.panoptic.xyz",
  },
  {
    id: 3,
    title: "What are the key benefits of Panoptic?",
    description:
      "Options positions in Panoptic have no expiration. Anyone can sell options at any strike on any asset. Options sellers in Panoptic are able to write undercollateralized options. ",
    content:
      "Options in Panoptic differ slightly from conventional options. Instead of using a clearinghouse to settle options contracts, the Panoptic protocol uses Liquidity Provider (LP) positions in Uniswap v3 as a fundamental building block for trading long and short options. Panoptic allows users to access new and improved features when options trading: 1) Panoptic options never expire and are perpetual, 2) anybody can deploy an options market on any asset in a permissionless manner, 3) Panoptic enables anyone to lend their capital to options traders as a liquidity provider, 4) Pricing is path-dependent and does not involve counterparties (such as market makers).",
  },
  {
    id: 4,
    title: "Which assets can be traded on Panoptic?",
    description:
      "Panoptic users can create an options market on any token pair that exists on Uniswap V3.",
  },
  {
    id: 5,
    title: "Where will Panoptic launch?",
    description:
      "Panoptic will launch on Ethereum mainnet and all EVM-compatible layer 2's where the Uniswap v3 smart contracts have been deployed.",
  },
  {
    id: 6,
    title: "What does it cost to trade on Panoptic?",
    description:
      "In addition to paying gas fees, all options traders pay a fixed commission fee when opening a position. This commission fee will be between 10bps and 60bps, depending on protocol utilization.",
  },
];

export default FAQ;
