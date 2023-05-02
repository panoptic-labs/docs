import React, { lazy, Suspense } from "react";

import "./RightPart.css";
import Button from "../Button";
import useResponsive from "../../../hooks/useResponsive";

const ToggleTheme = lazy(() => import("../ToggleTheme"));

const RightPart = () => {
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
      {!isTabletWidth && (
        <Suspense fallback={null}>
          <ToggleTheme />
        </Suspense>
      )}
      {isTabletWidth && (
        <Button className="right-part__menu_button">
          <i className="icon__burger right-part__icon" />
        </Button>
      )}
    </div>
  );
};

export default RightPart;
