import "inter-ui/inter.css";
import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Header from "../components/other/Header";
// import Hero from "../components/HomePage/Hero";
import WorkWith from "../components/HomePage/WorkWith";
import FAQ from "../components/HomePage/FAQ";
import RecentUpdates from "../components/HomePage/RecentUpdates";
import Partners from "../components/HomePage/Partners";
import Footer from "../components/other/Footer";
import TitlePage from "../components/NewHomePage/TitlePage/TitlePage"
import DemoPage from '../components/NewHomePage/DemoPage/DemoPage';
import LaunchPage from '../components/NewHomePage/LaunchPage/LaunchPage';
import PartnerPage from '../components/NewHomePage/PartnerPage/PartnerPage';
import SecurityPage from '../components/NewHomePage/SecurityPage/SecurityPage';
import FAQPage from '../components/NewHomePage/FAQPage/FAQPage';
import UpdatesPage from '../components/NewHomePage/UpdatesPage/UpdatesPage';
// import Footer from '../components/NewHomePage/Footer/Footer';

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
      <Header />
      <main className="bg-body">
        <TitlePage/>
        <DemoPage/>
        <LaunchPage/>
        <PartnerPage/>
        <SecurityPage/>
        <FAQPage/>
        {/* <UpdatesPage/> */}
        {/* <Hero /> */}
        {/* <WorkWith /> */}
        {/* <FAQ /> */}
        <RecentUpdates />
        {/* <Partners /> */}
      </main>
      <Footer />
    </Layout>
  );
}
