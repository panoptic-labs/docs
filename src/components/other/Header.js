import React from "react";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";

import "./Header.css";
import RightPart from "./Header/RightPart";

const Header = () => {
  const { colorMode } = useColorMode();
  const logoPath = `/img/logo-${colorMode}.svg`;

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logoPath} alt="logo" />
      </Link>
      <nav className="header__nav">
        <Link to='/' className='nav__link'>
          Parthners
        </Link>
        <Link to='/' className='nav__link'>
          Features
        </Link>
        <Link to='/docs/faq' className='nav__link'>
          FAQ
        </Link>
        <Link to='/' className='nav__link'>
          Recent Updates
        </Link>
      </nav>
      <RightPart />
    </header>
  );
};

export default Header;
