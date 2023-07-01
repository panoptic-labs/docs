import React from "react";
import Link from "@docusaurus/Link";
import "./Nav.css"

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
      <Link to="https://github.com/panoptic-labs" className="nav__link">
        Github
        <span className="external-link-arrow">
          <img src={"/img/new-home-page/external-link-arrow.svg"} alt="arrow"/>
        </span>
      </Link>
    </nav>
  );
};

export default Nav;
