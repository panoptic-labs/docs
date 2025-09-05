import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useResponsive from "../../hooks/useResponsive";
import "./Header.css";
import "./Header/RightPart.css"
import Nav from "./Header/Nav";
import Sidebar from "./Sidebar";
import { APP_LINK } from "../../constants";

const Header = ({purpleMode = false, children}) => {
  const [isOpenedSidebar, setOpenedSidebar] = useState(false);
  const { loadedWidth, isTabletWidth, is1200 } = useResponsive();

  const handleToggle = () => {
    setOpenedSidebar((state) => !state);
  };

  const handleClose = () => {
    setOpenedSidebar(false);
  };

  const logoPath = purpleMode ? `/img/logo-mono-white.svg` : `/img/logo-mono.svg`;

  const showAppComingSoonButton = loadedWidth && (!is1200 || !children) && !isTabletWidth

  return (
    <>
      <header className={clsx("header", "navbar", {"purple-background": purpleMode})}>
        <Link to="/" className="header__logo">
          <img src={logoPath} alt="logo" />
        </Link>
        {loadedWidth && !isTabletWidth && <Nav purpleMode={purpleMode}/>}
        <div className="right-part">
          {children}
          {loadedWidth && isTabletWidth && (
            <div className="mobile-button" onClick={handleToggle}>
              { purpleMode
                ? <i className="icon__burger right-part__icon" />
                : <img src={"/img/burger-purple.svg"}/>
              }
            </div>
          )}
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
