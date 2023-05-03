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
          <Button href="/" variant="outlined">
            Github
          </Button>
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
