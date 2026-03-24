import "@fontsource-variable/dm-sans";
import "@fontsource/fragment-mono";
import React from "react";
import { MotionConfig } from "framer-motion";

import RecentUpdates from "../components/HomePage/RecentUpdates";
import TitlePage from "../components/NewHomePage/TitlePage/TitlePage";
import VerticalsSection from "../components/NewHomePage/VerticalsSection/VerticalsSection";
import HowItWorks from "../components/NewHomePage/HowItWorks/HowItWorks";
import SecuritySection from "../components/NewHomePage/SecuritySection/SecuritySection";
import LaunchPage from "../components/NewHomePage/LaunchPage/LaunchPage";
import PartnerPage from "../components/NewHomePage/PartnerPage/PartnerPage";
import FAQPage from "../components/NewHomePage/FAQPage/FAQPage";
import CTASection from "../components/NewHomePage/CTASection/CTASection";
import FloatingLogos from "../components/animations/FloatingLogos";
import Layout from "@theme/Layout";
import FadeIn from "../components/animations/FadeIn";

function GradientDivider() {
  return (
    <div style={{
      width: '80%',
      maxWidth: 900,
      height: 1,
      margin: '0 auto',
      background: 'linear-gradient(90deg, transparent 0%, rgba(123,63,228,0.5) 50%, transparent 100%)',
    }} />
  );
}

export default function Home() {
  return (
    <Layout purpleMode={false}>
      <MotionConfig reducedMotion="user">
      <main style={{ backgroundColor: "var(--color-bg-dark)", position: "relative" }}>
        <FloatingLogos />
        <TitlePage />
        <FadeIn><RecentUpdates /></FadeIn>
        <GradientDivider />
        <FadeIn><VerticalsSection /></FadeIn>
        <GradientDivider />
        <FadeIn><HowItWorks /></FadeIn>
        <FadeIn><SecuritySection /></FadeIn>
        <GradientDivider />
        <FadeIn><LaunchPage /></FadeIn>
        <FadeIn><PartnerPage /></FadeIn>
        <GradientDivider />
        <FadeIn><FAQPage /></FadeIn>
        <CTASection />
      </main>
      </MotionConfig>
    </Layout>
  );
}
