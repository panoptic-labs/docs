import './Button.css'
import React from "react";

const Button = ({children, className, disabled = false, onClick}) => {
  return (
    <button className={`primary-button ${className}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;