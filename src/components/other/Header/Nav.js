import React from "react";
import Link from "@docusaurus/Link";

const Nav = () => {
  return (
    <nav className="header__nav">
      <Link to="/docs/intro" className="nav__link">
        Docs
      </Link>
      <Link to="/blog" className="nav__link">
        Blog
      </Link>
      <Link to="/research" className="nav__link">
        Research
      </Link>
      <Link to="/docs/faq/" className="nav__link">
        FAQ
      </Link>
    </nav>
  );
};

export default Nav;
