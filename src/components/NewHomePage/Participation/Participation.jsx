import React from "react";
import ParticipationSection from "./ParticipationSection";
import { APP_LINK } from "../../../constants";

// Evidence: same pool, same range — Uniswap fees vs. Panoptic fees over time.
// This is the 20%+ claim drawn rather than asserted.
const FeeComparison = () => (
  <div className="evidence-panel">
    <div className="evidence-header">
      <span className="evidence-title">Same pool · Same range</span>
      <span className="evidence-pill">20%+ more fees</span>
    </div>
    <p className="sr-only">
      Chart comparing cumulative fees earned on the same Uniswap position over
      time: the Panoptic curve accrues more than 20% above the vanilla Uniswap
      curve.
    </p>
    <svg
      className="evidence-chart"
      viewBox="0 0 560 300"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="fee-delta" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12AD50" stopOpacity="0.26" />
          <stop offset="1" stopColor="#12AD50" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1="0" y1="262" x2="560" y2="262" className="evidence-axis" />
      {/* the extra fees, shaded between the two curves */}
      <path
        d="M0,262 C170,206 360,130 560,58 L560,166 C380,190 180,226 0,262 Z"
        fill="url(#fee-delta)"
      />
      {/* vanilla Uniswap */}
      <path
        d="M0,262 C180,226 380,190 560,166"
        fill="none"
        className="evidence-line-muted"
        strokeWidth="2"
      />
      {/* Panoptic */}
      <path
        d="M0,262 C170,206 360,130 560,58"
        fill="none"
        className="evidence-line-brand"
        strokeWidth="2.5"
      />
    </svg>
    <div className="evidence-footer">
      <span>Uniswap fees</span>
      <span>Panoptic fees</span>
      <span>Time →</span>
    </div>
  </div>
);

// Evidence: the payoff a trader actually buys — flat below strike, no expiry.
const PayoffCurve = () => (
  <div className="evidence-panel">
    <div className="evidence-header">
      <span className="evidence-title">ETH · Long call</span>
      <span className="evidence-pill">No expiry</span>
    </div>
    <p className="sr-only">
      Payoff diagram for a perpetual long call: losses capped below the strike
      price, uncapped upside above it, with no expiry date.
    </p>
    <svg
      className="evidence-chart"
      viewBox="0 0 560 300"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="payoff-profit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12AD50" stopOpacity="0.28" />
          <stop offset="1" stopColor="#12AD50" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="payoff-loss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D72F22" stopOpacity="0.03" />
          <stop offset="1" stopColor="#D72F22" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <line x1="0" y1="190" x2="560" y2="190" className="evidence-axis" />
      <path d="M0,190 L0,226 L300,226 L336,190 Z" fill="url(#payoff-loss)" />
      <path d="M336,190 L560,40 L560,190 Z" fill="url(#payoff-profit)" />
      <path
        d="M0,226 L300,226 L560,40"
        fill="none"
        className="evidence-line-brand"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line x1="300" y1="24" x2="300" y2="280" className="evidence-axis" />
    </svg>
    <div className="evidence-footer">
      <span>Strike</span>
      <span>Breakeven</span>
      <span>Price →</span>
    </div>
  </div>
);

// Evidence: what a depositor's capital actually does, step by step.
const VaultFlow = () => (
  <div className="evidence-panel">
    <div className="evidence-header">
      <span className="evidence-title">Curator-run vault</span>
      <span className="evidence-pill">Passive</span>
    </div>
    <div className="evidence-flow">
      <div className="evidence-flow-step">
        <span className="evidence-flow-num">01</span>
        <span className="evidence-flow-text">
          You deposit a single asset and receive vault shares.
        </span>
      </div>
      <div className="evidence-flow-step">
        <span className="evidence-flow-num">02</span>
        <span className="evidence-flow-text">
          A named curator runs a volatility strategy onchain within preset risk limits.
        </span>
      </div>
      <div className="evidence-flow-step">
        <span className="evidence-flow-num">03</span>
        <span className="evidence-flow-text">
          Premia accrue to the vault; the curator earns a performance fee only on gains.
        </span>
      </div>
    </div>
    <div className="evidence-footer">
      <span>Non-custodial</span>
      <span>Withdraw anytime</span>
    </div>
  </div>
);

export default function Participation() {
  return (
    <>
      <ParticipationSection
        id="liquidity-providers"
        eyebrow="For liquidity providers"
        title="Earn 20%+ more fees on the liquidity you already have."
        description="Migrate an existing Uniswap v3 or v4 position and keep the range you already chose. Your liquidity keeps earning trading fees, and now also earns premia from traders who use it to open options."
        points={[
          "Same pool, same range, same market exposure",
          "Trading fees plus streaming premia, not one or the other",
          "Migrate and withdraw permissionlessly — always non-custodial",
        ]}
        ctaLabel="Migrate your position"
        ctaHref={APP_LINK}
      >
        <FeeComparison />
      </ParticipationSection>

      <ParticipationSection
        id="traders"
        eyebrow="For traders"
        title="Buy and sell options that never expire."
        description="Take a view on volatility without rolling positions or hunting for a counterparty. Pricing comes from the AMM itself, so any pair with Uniswap liquidity is a market you can trade."
        points={[
          "No expiry dates — hold a position as long as your thesis lasts",
          "Streaming premia instead of a large upfront debit",
          "Up to 10× leverage with portfolio-aware margining",
        ]}
        ctaLabel="Start trading"
        ctaHref={`${APP_LINK}trade`}
        reversed
      >
        <PayoffCurve />
      </ParticipationSection>

      <ParticipationSection
        id="vaults"
        eyebrow="For passive capital"
        title="Deposit once. A curator runs the strategy."
        description="Vaults turn volatility strategies into a single deposit. Curators publish their approach and risk limits onchain, and earn only when the vault performs."
        points={[
          "Automated onchain strategies — no position management",
          "Named curators with transparent, verifiable track records",
          "Withdraw on your own schedule",
        ]}
        ctaLabel="Browse vaults"
        ctaHref={`${APP_LINK}vaults`}
      >
        <VaultFlow />
      </ParticipationSection>
    </>
  );
}
