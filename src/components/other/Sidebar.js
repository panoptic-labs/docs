import clsx from "clsx";
import React, { useLayoutEffect, useRef } from "react";

import "./Sidebar.css";
import useResponsive from "../../hooks/useResponsive";
import Button from "../NewHomePage/Button/Button";
import Link from "@docusaurus/Link";
import { APP_LINK } from "../../constants";

const Sidebar = ({ isOpenedSidebar, onClose, onToggle }) => {
  const { isTabletWidth } = useResponsive();
  const ref = useRef();

  useLayoutEffect (() => {
    if (isOpenedSidebar && isTabletWidth) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
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
        className="right-part-mobile-button sidebar__button"
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
          <Link to="/docs/intro" className="sidebar__nav__link">
            Docs
          </Link>
          <Link to="/blog" className="sidebar__nav__link">
            Blog
          </Link>
          <Link to="/research" className="sidebar__nav__link">
            Deep Dive
          </Link>
          <Link to="/docs/faq/" className="sidebar__nav__link">
            FAQ
          </Link>
          <Link to="https://github.com/panoptic-labs" className="sidebar__nav__link">
            Github
          </Link>
        </div>
        <div className="sidebar__nav__bottom-part">
          <div className="nav__bottom-part__buttons">
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
