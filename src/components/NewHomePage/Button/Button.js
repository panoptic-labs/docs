import './Button.css'
import React from "react";
import classNames from "classnames";

const Button = ({children, className, disabled = false, onClick}) => {
  const buttonClass = classNames("primary-button", className);

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;
