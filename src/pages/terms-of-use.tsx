import React, { useEffect } from "react"
import PolicyDocument from "../components/PolicyDocument";
import Link from "@docusaurus/Link";

export default function TermsOfUsePage() {
    return <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="header__logo">
            <img src='/img/logo-mono.svg' alt="logo" />
          </Link>
          </div>
          </header>
        <main className="bg-body">
        <PolicyDocument name="terms-of-use" />
        </main>
    </>
}