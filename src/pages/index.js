import "@fontsource-variable/dm-sans";
import "@fontsource/fragment-mono";
import React from "react";
import { MotionConfig } from "framer-motion";

import RecentUpdates from "../components/HomePage/RecentUpdates";
import TitlePage from "../components/NewHomePage/TitlePage/TitlePage";
import MechanismSection from "../components/NewHomePage/MechanismSection/MechanismSection";
import ProofBar from "../components/NewHomePage/ProofBar/ProofBar";
import Participation from "../components/NewHomePage/Participation/Participation";
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

function Section({ id, bordered = true, children }) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 ${bordered ? "border-0 border-b border-solid border-[color:var(--color-border-subtle)]" : ""}`}
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
        <Section id="mechanism">
          <FadeIn><MechanismSection /></FadeIn>
        </Section>
        <Section id="proof">
          <FadeIn><ProofBar /></FadeIn>
        </Section>
        <Section id="participate">
          <Participation />
        </Section>
        <Section id="different">
          <FadeIn><VerticalsSection /></FadeIn>
        </Section>
        <Section id="security">
          <FadeIn><SecuritySection /></FadeIn>
        </Section>
        <Section id="launch">
          <FadeIn><LaunchPage /></FadeIn>
          <FadeIn><PartnerPage /></FadeIn>
        </Section>
        <Section id="updates">
          <FadeIn><RecentUpdates /></FadeIn>
        </Section>
        <Section id="faq">
          <FadeIn><FAQPage /></FadeIn>
        </Section>
        <Section id="cta" bordered={false}>
          <CTASection />
        </Section>
      </main>
      </MotionConfig>
    </Layout>
  );
}
