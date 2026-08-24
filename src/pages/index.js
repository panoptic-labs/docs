import "@fontsource-variable/dm-sans";
import "@fontsource/fragment-mono";
import React from "react";
import { MotionConfig } from "framer-motion";

import RecentUpdates from "../components/HomePage/RecentUpdates";
import TitlePage from "../components/NewHomePage/TitlePage/TitlePage";
import MechanismSection from "../components/NewHomePage/MechanismSection/MechanismSection";
// ProofBar removed from the page — component kept for later.
// import ProofBar from "../components/NewHomePage/ProofBar/ProofBar";
// Participation sections commented out of the page — components kept for later.
// import Participation from "../components/NewHomePage/Participation/Participation";
import VerticalsSection from "../components/NewHomePage/VerticalsSection/VerticalsSection";
// HowItWorks retired — the mechanism explainer + participation sections cover it.
// import HowItWorks from "../components/NewHomePage/HowItWorks/HowItWorks";
import SecuritySection from "../components/NewHomePage/SecuritySection/SecuritySection";
import LaunchPage from "../components/NewHomePage/LaunchPage/LaunchPage";
import PartnerPage from "../components/NewHomePage/PartnerPage/PartnerPage";
import FAQPage from "../components/NewHomePage/FAQPage/FAQPage";
import CTASection from "../components/NewHomePage/CTASection/CTASection";
import FloatingLogos from "../components/animations/FloatingLogos";
import Layout from "@theme/Layout";
import FadeIn from "../components/animations/FadeIn";

// `tint` drives the alternating band colour. Section components deliberately
// set no background of their own, so the alternation stays readable here.
function Section({ id, tint = false, bordered = true, children }) {
  return (
    <section
      id={id}
      className={[
        "scroll-mt-16",
        tint ? "section-band--tint" : "",
        bordered ? "border-0 border-b border-solid border-[color:var(--color-border-subtle)]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <Layout purpleMode={false}>
      <MotionConfig reducedMotion="user">
      <main style={{ backgroundColor: "var(--color-bg-dark)", position: "relative" }}>
        <FloatingLogos />
        <TitlePage />
        <Section id="mechanism" tint>
          <FadeIn><MechanismSection /></FadeIn>
        </Section>
        {/* <Section id="proof">
          <FadeIn><ProofBar /></FadeIn>
        </Section> */}
        <Section id="updates">
          <FadeIn><RecentUpdates /></FadeIn>
        </Section>
        {/* Participation sections (LPs / traders / passive capital) commented out
        <Section id="participate">
          <Participation />
        </Section>
        */}
        <Section id="different" tint>
          <FadeIn><VerticalsSection /></FadeIn>
        </Section>
        <Section id="security">
          <FadeIn><SecuritySection /></FadeIn>
        </Section>
        <Section id="launch" tint>
          <FadeIn><LaunchPage /></FadeIn>
          <FadeIn><PartnerPage /></FadeIn>
        </Section>
        <Section id="faq">
          <FadeIn><FAQPage /></FadeIn>
        </Section>
        <Section id="cta" tint bordered={false}>
          <CTASection />
        </Section>
      </main>
      </MotionConfig>
    </Layout>
  );
}
