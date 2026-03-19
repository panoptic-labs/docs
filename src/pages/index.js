import "inter-ui/inter.css";
import "@fontsource-variable/space-grotesk";
import "@fontsource/jetbrains-mono";
import React from "react";

import RecentUpdates from "../components/HomePage/RecentUpdates";
import TitlePage from "../components/NewHomePage/TitlePage/TitlePage";
import VerticalsSection from "../components/NewHomePage/VerticalsSection/VerticalsSection";
import HowItWorks from "../components/NewHomePage/HowItWorks/HowItWorks";
import SecuritySection from "../components/NewHomePage/SecuritySection/SecuritySection";
import LaunchPage from "../components/NewHomePage/LaunchPage/LaunchPage";
import PartnerPage from "../components/NewHomePage/PartnerPage/PartnerPage";
import FAQPage from "../components/NewHomePage/FAQPage/FAQPage";
import CTASection from "../components/NewHomePage/CTASection/CTASection";
import Layout from "@theme/Layout";
import FadeIn from "../components/animations/FadeIn";

export default function Home() {
  return (
    <Layout purpleMode={false}>
      <main style={{ backgroundColor: "#0A0118" }}>
        <TitlePage />
        <FadeIn><VerticalsSection /></FadeIn>
        <FadeIn><RecentUpdates /></FadeIn>
        <FadeIn><HowItWorks /></FadeIn>
        <FadeIn><SecuritySection /></FadeIn>
        <FadeIn><LaunchPage /></FadeIn>
        <FadeIn><PartnerPage /></FadeIn>
        <FadeIn><FAQPage /></FadeIn>
        <CTASection />
      </main>
    </Layout>
  );
}
