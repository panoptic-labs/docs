import "inter-ui/inter.css";
import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Header from "../components/other/Header";
import RecentUpdates from "../components/HomePage/RecentUpdates";
import Footer from "../components/other/Footer";
import TitlePage from "../components/NewHomePage/TitlePage/TitlePage"
import DemoPage from '../components/NewHomePage/DemoPage/DemoPage';
import LaunchPage from '../components/NewHomePage/LaunchPage/LaunchPage';
import PartnerPage from '../components/NewHomePage/PartnerPage/PartnerPage';
import SecurityPage from '../components/NewHomePage/SecurityPage/SecurityPage';
import FAQPage from '../components/NewHomePage/FAQPage/FAQPage';
import LoadingScreen from '../components/NewHomePage/LoadingScreen/LoadingScreen'

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    document.body.dataset.is_landing_page = true;

    return () => {
      document.body.dataset.is_landing_page = false;
    };
  }, []);

  return (
    <Layout
      title=""
      description="Panoptic, the perpetual oracle-free options protocol"
    >
      {/* <LoadingScreen/> */}
      <Header />
      <main className="bg-body">
        <TitlePage/>
        <DemoPage/>
        <LaunchPage/>
        <PartnerPage/>
        <SecurityPage/>
        <FAQPage/>
        <RecentUpdates />
      </main>
      <Footer />
    </Layout>
  );
}
