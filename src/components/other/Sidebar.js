import clsx from "clsx";
import React, { useEffect, useRef } from "react";

import "./Sidebar.css";
import useResponsive from "../../hooks/useResponsive";
import Button from "./Button";
import Link from "@docusaurus/Link";
import ToggleTheme from "./ToggleTheme";

const Sidebar = ({ isOpenedSidebar, onClose, onToggle }) => {
  const { isTabletWidth } = useResponsive();
  const ref = useRef();

  useEffect(() => {
    if (isOpenedSidebar && isTabletWidth) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isTabletWidth, isOpenedSidebar]);

  const handleClose = (event) => {
    if (ref.current.contains(event.target)) return;

    onClose();
  };

  return (
    <aside
      className={clsx("sidebar", {
        sidebar_closed: !isOpenedSidebar,
      })}
      onClick={handleClose}
    >
      <Button
        className="right-part__menu_button sidebar__button"
        onClick={onToggle}
      >
        <i
          className={clsx("right-part__icon", {
            icon__burger: !isOpenedSidebar,
            icon__close: isOpenedSidebar,
          })}
        />
      </Button>
      <nav
        ref={ref}
        className={clsx("sidebar__nav", {
          sidebar__nav_closed: !isOpenedSidebar,
        })}
      >
        <div className="sidebar__nav__links">
          <Link to="/" className="sidebar__nav__link">
            Partners
          </Link>
          <Link to="/" className="sidebar__nav__link">
            Features
          </Link>
          <Link to="/" className="sidebar__nav__link">
            FAQ
          </Link>
          <Link to="/" className="sidebar__nav__link">
            Recent Updates
          </Link>
        </div>
        <div className="sidebar__nav__bottom-part">
          <ToggleTheme />
          <div className="nav__bottom-part__buttons">
            <Button href="/" variant="outlined">
              Github
            </Button>
            <Button to="/">Launch app</Button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
