import "inter-ui/inter.css";
import React, { useEffect, useState } from "react";

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
  const [loadingScreen, setLoadingScreen] = useState(true)
  useEffect(() => {
    window.onunload = () => {
      window.scrollTo(0, 0);
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(false)
    }, 1500)
  })

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    setTimeout(() => {
      document.body.style.overflowY = "auto";
    }, 2300)
  })

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <>
      {loadingScreen && <LoadingScreen/>}
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
    </>
  );
}
