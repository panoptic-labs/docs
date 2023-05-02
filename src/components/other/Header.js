import React, { Suspense, lazy } from "react";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";

import RightPart from "./Header/RightPart";
import useResponsive from "../../hooks/useResponsive";
import "./Header.css";

const Nav = lazy(() => import("./Header/Nav"));

const Header = () => {
  const { isTabletWidth } = useResponsive();
  const { colorMode } = useColorMode();
  const logoPath = `/img/logo-${colorMode}.svg`;

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logoPath} alt="logo" />
      </Link>
      {!isTabletWidth && (
        <Suspense fallback={null}>
          <Nav />
        </Suspense>
      )}
      <RightPart />
    </header>
  );
};

export default Header;
