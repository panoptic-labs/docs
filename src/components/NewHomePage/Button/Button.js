import './Button.css'
import React from "react";

const Button = ({children, className}) => {

  return (
    <button className={`button ${className}`}>
      {children}
    </button>
  )
}

export default Button;