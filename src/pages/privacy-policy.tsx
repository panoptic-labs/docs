import React, { useEffect } from "react"
import Link from "@docusaurus/Link";
import PolicyDocument from "../components/PolicyDocument";

export default function Policy() {
  return <>
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header__logo">
          <img src='/img/logo-mono.svg' alt="logo" />
        </Link>
      </div>
    </header>
    <main className="bg-body">
      <PolicyDocument name="privacy-policy" />
    </main>
  </>
}