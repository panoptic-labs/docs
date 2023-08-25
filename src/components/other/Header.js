import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useResponsive from "../../hooks/useResponsive";
import "./Header.css";
import "./Header/RightPart.css"
import Nav from "./Header/Nav";
import Sidebar from "./Sidebar";
import Button from "../NewHomePage/Button/Button";


  
const Header = ({purpleMode = false}) => {
  const [isOpenedSidebar, setOpenedSidebar] = useState(false);
  const { loadedWidth, isTabletWidth } = useResponsive();

  const handleToggle = () => {
    setOpenedSidebar((state) => !state);
  };

  const handleClose = () => {
    setOpenedSidebar(false);
  };

  const logoPath = purpleMode ? `/img/logo-dark.svg` : `/img/logo-mono.svg`;

  return (
    <>
      <header className={clsx("header", "navbar", {"purple-background": purpleMode})}>
        <div className="header-container">
          <Link to="/" className="header__logo">
            <img src={logoPath} alt="logo" />
          </Link>
          {loadedWidth && !isTabletWidth && <Nav purpleMode={purpleMode}/>}
          <div className="right-part">
            {loadedWidth && isTabletWidth && (
              <div className="mobile-button" onClick={handleToggle}>
                <i className="icon__burger right-part__icon" />
              </div>
            )}
            {loadedWidth && !isTabletWidth && (
              <button disabled={true} className="app-coming-soon-button">
                <img src={"/img/icons/loading-icon.svg"}></img>
                {"App Coming Soon"}
              </button>
            )}
          </div>
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
