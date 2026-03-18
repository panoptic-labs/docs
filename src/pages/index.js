import "inter-ui/inter.css";
import React from "react";

import RecentUpdates from "../components/HomePage/RecentUpdates";
import TitlePage from "../components/NewHomePage/TitlePage/TitlePage"

import LaunchPage from '../components/NewHomePage/LaunchPage/LaunchPage';
import PartnerPage from '../components/NewHomePage/PartnerPage/PartnerPage';

import FAQPage from '../components/NewHomePage/FAQPage/FAQPage';
import Layout from '@theme/Layout';
import VerticalsSection from '../components/NewHomePage/VerticalsSection/VerticalsSection';
import ComparisonTable from '../components/NewHomePage/ComparisonTable/ComparisonTable';
import useScrollReveal from '../hooks/useScrollReveal';

function RevealSection({ children }) {
  const ref = useScrollReveal();
  return <div ref={ref}>{children}</div>;
}

export default function Home() {
  return (
    <Layout purpleMode={false}>
      <main style={{backgroundColor: '#0f0426'}}>
        <TitlePage/>
        <RevealSection><VerticalsSection/></RevealSection>
        <RevealSection><ComparisonTable/></RevealSection>
        <RevealSection><LaunchPage/></RevealSection>
        <RevealSection><PartnerPage/></RevealSection>
        <RevealSection><FAQPage/></RevealSection>
        <RecentUpdates />
      </main>
    </Layout>
  );
}
