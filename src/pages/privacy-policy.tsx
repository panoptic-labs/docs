import React, { useEffect } from "react"
import PrivacyPolicy from "../components/PrivacyPolicy";
import Link from "@docusaurus/Link";

export default function Policy() {
    useEffect(() => {
        const htmlElement = document.querySelector("html");
        htmlElement?.setAttribute("data-theme", "dark");
    }, []);

    return <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="header__logo">
            <img src='/img/logo-mono.svg' alt="logo" />
          </Link>
          </div>
          </header>
        <main className="bg-body">
            <PrivacyPolicy />
        </main>
    </>
}