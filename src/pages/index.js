import "inter-ui/inter.css";
import React, { useEffect, useState } from "react";

import RecentUpdates from "../components/HomePage/RecentUpdates";
import TitlePage from "../components/NewHomePage/TitlePage/TitlePage"

import LaunchPage from '../components/NewHomePage/LaunchPage/LaunchPage';
import PartnerPage from '../components/NewHomePage/PartnerPage/PartnerPage';

import FAQPage from '../components/NewHomePage/FAQPage/FAQPage';
import LoadingScreen from '../components/NewHomePage/LoadingScreen/LoadingScreen'
import Layout from '@theme/Layout';
import VerticalsSection from '../components/NewHomePage/VerticalsSection/VerticalsSection';

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
          <VerticalsSection/>

          <LaunchPage/>
          <PartnerPage/>

          <FAQPage/>
          <RecentUpdates />
        </main>
      </Layout>
    </>
  );
}
