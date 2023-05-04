import Link from "@docusaurus/Link";
import React from "react";

import "./RightPart.css";
import Button from "../Button";
import ToggleTheme from "../ToggleTheme";
import useResponsive from "../../../hooks/useResponsive";

const RightPart = ({ onToggle }) => {
  const { isTabletWidth, isMobileWidth } = useResponsive();

  return (
    <div className="right-part">
      {!isMobileWidth && (
        <>
          <Link to="https://github.com/panoptic-labs">
            <Button href="/" variant="outlined">
              Github
            </Button>
          </Link>
          <Button to="/">Launch app</Button>
        </>
      )}
      {!isTabletWidth && <ToggleTheme />}
      {isTabletWidth && (
        <Button className="right-part__menu_button" onClick={onToggle}>
          <i className="icon__burger right-part__icon" />
        </Button>
      )}
    </div>
  );
};

export default RightPart;
