import React from "react";
import Link from "@docusaurus/Link";

const Nav = () => {
  return (
    <nav className="header__nav">
      <Link to="/docs/intro" className="nav__link">
        Docs
      </Link>
      <Link to="/#faq" className="nav__link">
        FAQ
      </Link>
      <Link to="/#partners" className="nav__link">
        Partners
      </Link>
      <Link to="/#updates" className="nav__link">
        Recent Updates
      </Link>
    </nav>
  );
};

export default Nav;
