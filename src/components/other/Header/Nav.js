import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import "./Nav.css"

const Nav = ({purpleMode = false}) => {

  const iconPath = purpleMode ? 
    "/img/new-home-page/external-link-arrow-white.svg" : 
    "/img/new-home-page/external-link-arrow.svg"

  return (
    <nav className="header__nav">
      <Link to="/docs/intro" className={clsx("nav__link", {"white-text": purpleMode})}>
        Docs
      </Link>
      <Link to="/blog" className={clsx("nav__link", {"white-text": purpleMode})}>
        Blog
      </Link>
      <Link to="/research" className={clsx("nav__link", {"white-text": purpleMode})}>
        Deep Dive
      </Link>
      <Link to="/docs/faq/" className={clsx("nav__link", {"white-text": purpleMode})}>
        FAQ
      </Link>
      <Link to="https://github.com/panoptic-labs" className={clsx("nav__link", {"white-text": purpleMode})}>
        Github
        <span className="external-link-arrow">
          <img src={iconPath} alt="arrow"/>
        </span>
      </Link>
    </nav>
  );
};

export default Nav;
