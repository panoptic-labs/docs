import React from "react";

import "./RightPart.css";
import Button from "../Button";
import ToggleTheme from "../ToggleTheme";

const RightPart = () => {
  return (
    <div className="right-part">
      <Button href="/" variant="outlined">
        Github
      </Button>
      <Button to="/">Launch app</Button>
      <ToggleTheme />
    </div>
  );
};

export default RightPart;
