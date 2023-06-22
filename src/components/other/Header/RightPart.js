import Link from "@docusaurus/Link";
import React from "react";

import "./RightPart.css";
import Button from "../Button";
import ToggleTheme from "../ToggleTheme";
import useResponsive from "../../../hooks/useResponsive";

const RightPart = ({ onToggle }) => {
  const { isTabletWidth, isMobileWidth } = useResponsive();
  const appIsDisabled = true; // Set the app disabled state

  return (
    <div className="right-part">
      {!isMobileWidth && (
        <>
          {/* <a href="https://github.com/panoptic-labs">
            <Button variant="outlined">Github</Button>
          </a> */}
          <Button hasIcon disabled={appIsDisabled}>
            {appIsDisabled ? "App Coming Soon" : "Launch App"}
          </Button>
        </>
      )}
      {/* {!isTabletWidth && <ToggleTheme />}
      {isTabletWidth && (
        <Button className="right-part__menu_button" onClick={onToggle}>
          <i className="icon__burger right-part__icon" />
        </Button>
      )} */}
    </div>
  );
};

export default RightPart;
