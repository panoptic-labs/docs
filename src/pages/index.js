import "inter-ui/inter.css";
import React, { useEffect, useState } from "react";

import RecentUpdates from "../components/HomePage/RecentUpdates";
import TitlePage from "../components/NewHomePage/TitlePage/TitlePage"
import DemoPage from '../components/NewHomePage/DemoPage/DemoPage';
import LaunchPage from '../components/NewHomePage/LaunchPage/LaunchPage';
import PartnerPage from '../components/NewHomePage/PartnerPage/PartnerPage';
import SecurityPage from '../components/NewHomePage/SecurityPage/SecurityPage';
import FAQPage from '../components/NewHomePage/FAQPage/FAQPage';
import LoadingScreen from '../components/NewHomePage/LoadingScreen/LoadingScreen'
import Layout from '@theme/Layout';

export default function Home() {
  const [loadingScreen, setLoadingScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(false)
    }, 1900)
  })

  return (
    <>
      {loadingScreen && <LoadingScreen/>}
      <Layout purpleMode={false}>
        <main className="bg-body">
          <TitlePage/>
          <DemoPage/>
          <LaunchPage/>
          <PartnerPage/>
          <SecurityPage/>
          <FAQPage/>
          <RecentUpdates />
        </main>
      </Layout>
    </>
  );
}
