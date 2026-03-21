import React, { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const { loadedWidth, isTabletWidth, is1200 } = useResponsive();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setOpenedSidebar((state) => !state);
  };

  const handleClose = () => {
    setOpenedSidebar(false);
  };

  const logoPath = `/img/logo-new-white.svg`;

  const showAppComingSoonButton = loadedWidth && (!is1200 || !children) && !isTabletWidth

  return (
    <>
      <header className={clsx("header", "navbar", {"purple-background": purpleMode, "scrolled": scrolled})}>
        <Link to="/" className="header__logo">
          <img src={logoPath} alt="logo" />
        </Link>
        {loadedWidth && !isTabletWidth && <Nav purpleMode={true}/>}
        <div className="right-part">
          {children}
          {loadedWidth && isTabletWidth && (
            <div className="mobile-button" onClick={handleToggle}>
              <i className="icon__burger right-part__icon" />
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
