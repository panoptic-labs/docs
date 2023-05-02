import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import "./Button.css";

const Button = ({ children, to, href, onClick, variant = "contained", className }) => {
  const Component = to ? Link : href ? "a" : "button";

  return (
    <Component
      to={to}
      href={href}
      onClick={onClick}
      className={clsx("button", {
        [`button-${variant}`]: !!variant,
        [className]: !!className
      })}
    >
      {children}
    </Component>
  );
};

export default Button;
