import './Button.css'
import React from "react";

const Button = ({children, disabled = false}) => {

  return (
    <button className="primary-button" disabled={disabled}>
      {children}
    </button>
  )
}

export default Button;