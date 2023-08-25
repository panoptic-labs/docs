import './Button.css'
import React from "react";
import classNames from "classnames";

const Button = ({children, className, onClick}) => {
  const buttonClass = classNames("primary-button", className);

  return (
    <button className={buttonClass} disabled={true} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;
