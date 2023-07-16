import React from "react";

import "./RightPart.css";
import Button from "../../NewHomePage/Button/Button";
import useResponsive from "../../../hooks/useResponsive";

const RightPart = ({ onToggle }) => {
  const { isTabletWidth } = useResponsive();

  return (
    <div className="right-part">
      {isTabletWidth ? (
        <Button disabled={false} className="right-part-mobile-button" onClick={onToggle}>
          <i className="icon__burger right-part__icon" />
        </Button>
      ) : (
        <Button disabled={true}>
          {appIsDisabled ? "App Coming Soon" : "Launch App"}
        </Button>
      )}
    </div>
  );
};

export default RightPart;
