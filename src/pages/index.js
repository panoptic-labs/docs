import "inter-ui/inter.css";
import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Header from "../components/other/Header";
import Hero from "../components/HomePage/Hero";
import WorkWith from "../components/HomePage/WorkWith";
import FAQ from "../components/HomePage/FAQ";
import RecentUpdates from "../components/HomePage/RecentUpdates";
import Partners from "../components/HomePage/Partners";
import Footer from "../components/other/Footer";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="Docs for the Panoptic Protocol"
    >
      <Header />
      <main className="bg-body">
        <Hero />
        <WorkWith />
        <FAQ />
        <RecentUpdates />
        <Partners />
      </main>
      <Footer />
    </Layout>
  );
}
