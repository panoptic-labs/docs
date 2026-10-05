import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import StructuredData from "../components/StructuredData";
import entities from "../data/entities.cjs";
import styles from "./about.module.css";

const { founder, founderProfiles, description } = entities;

export default function About() {
  return (
    <Layout
      title="About Panoptic and Founder Guillaume Lambert"
      description="Meet Guillaume Lambert, founder of Panoptic, the perpetual options protocol built on Uniswap. Explore Panoptic's origins and research."
    >
      <StructuredData data={{ "@context": "https://schema.org", ...founder }} />
      <main className={styles.page}>
        <h1>About Panoptic</h1>
        <p className={styles.intro}>{description}.</p>
        <p>
          Panoptic launched publicly on Ethereum on December 18, 2024. Its
          perpetual options have no expiry date and use Uniswap liquidity for
          oracle-free pricing. Read the{" "}
          <Link to="/blog/panoptic-launch">Ethereum launch announcement</Link>{" "}
          and{" "}
          <Link to="/docs/panoptic-protocol/overview">protocol overview</Link>.
        </p>

        <p>
          Panoptic v2 launched on Ethereum on June 23, 2026, bringing options,
          lending, borrowing, and vaults together in a unified DeFi yield
          platform. Read the{" "}
          <Link to="/blog/panoptic-v2-the-defi-yield-platform">
            Panoptic v2 launch announcement
          </Link>
          .
        </p>

        <section id="guillaume-lambert" className={styles.founder}>
          <img
            className={styles.photo}
            src="/img/Guillaume.jpg"
            alt="Guillaume Lambert, founder of Panoptic"
            width="200"
            height="200"
          />
          <div>
            <h2>{founder.name}</h2>
            <p className={styles.role}>{founder.jobTitle}</p>
            <p>{founder.description}</p>
            <ul className={styles.profiles} aria-label="Guillaume's profiles">
              {founderProfiles.map(({ label, url, icon }) => (
                <li key={label}>
                  <a href={url} aria-label={`${label} profile`} title={label}>
                    <img src={icon} alt="" width="20" height="20" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.research}>
          <h2>Research</h2>
          <p>
            In 2021–2022, Guillaume published his initial{" "}
            <a href="https://lambert-guillaume.medium.com/">
              Medium article series
            </a>{" "}
            exploring Uniswap v3 liquidity positions as options, perpetual
            options, implied volatility, and liquidity-provider risk.
          </p>
          <p>
            The protocol’s foundational paper,{" "}
            <a href="https://arxiv.org/abs/2204.14232">
              Panoptic: the perpetual, oracle-free options protocol
            </a>
            , by Guillaume Lambert and Jesper Kristensen, was first submitted in
            April 2022. It describes permissionless options built on Uniswap v3
            liquidity.
          </p>
          <h3>Articles by Guillaume</h3>
          <ul>
            <li>
              <Link to="/blog/lp-vips">
                5,000 Uniswap LPs are on the Panoptic VIP List
              </Link>
            </li>
            <li>
              <Link to="/blog/position-spoofing-post-mortem">
                Position Spoofing Post Mortem
              </Link>
            </li>
            <li>
              <Link to="/research/uniswap-violates-geometric-brownian-motion">
                Does Uniswap’s Most Traded Asset Violate Geometric Brownian
                Motion?
              </Link>
            </li>
            <li>
              <Link to="/research/stay-in-range-uniswap-v3">
                LP Profits: Staying ‘In Range’ on Uniswap v3
              </Link>
            </li>
            <li>
              <Link to="/research/reasons-bullish-financial-nfts">
                8 Reasons to Be Bullish on Financial NFTs
              </Link>
            </li>
            <li>
              <Link to="/research/demystifying-IL-LVR-JIT-MEV">
                Demystifying IL, LVR, JIT, and MEV
              </Link>
            </li>
          </ul>
          <Link to="/research">Explore all Panoptic research →</Link>
        </section>
      </main>
    </Layout>
  );
}
