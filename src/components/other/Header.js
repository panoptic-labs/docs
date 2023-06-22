import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";

import RightPart from "./Header/RightPart";
import useResponsive from "../../hooks/useResponsive";
import "./Header.css";
import Nav from "./Header/Nav";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isOpenedSidebar, setOpenedSidebar] = useState(false);
  const { isTabletWidth } = useResponsive();
  const { colorMode } = useColorMode();
  const logoPath = `/img/logo-dark.svg`;

  const handleToggle = () => {
    setOpenedSidebar((state) => !state);
  };

  const handleClose = () => {
    setOpenedSidebar(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="header__logo">
            <img src={logoPath} alt="logo" />
          </Link>
          {!isTabletWidth && <Nav />}
          <RightPart
            isOpenedSidebar={isOpenedSidebar}
            onToggle={handleToggle}
          />
        </div>
      </header>
      {isTabletWidth && (
        <Sidebar
          isOpenedSidebar={isOpenedSidebar}
          onClose={handleClose}
          onToggle={handleToggle}
        />
      )}
    </>
  );
};

export default Header;
