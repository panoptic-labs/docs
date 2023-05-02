import React from "react";
import Link from "@docusaurus/Link";

const Nav = () => {
  return (
    <nav className="header__nav">
      <Link to="/" className="nav__link">
        Parthners
      </Link>
      <Link to="/" className="nav__link">
        Features
      </Link>
      <Link to="/docs/faq" className="nav__link">
        FAQ
      </Link>
      <Link to="/" className="nav__link">
        Recent Updates
      </Link>
    </nav>
  );
};

export default Nav;
