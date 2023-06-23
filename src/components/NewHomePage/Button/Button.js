import './Button.css'
import React from "react";

const Button = ({children, className, disabled = false}) => {
  return (
    <button className={`primary-button ${className}`} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button;