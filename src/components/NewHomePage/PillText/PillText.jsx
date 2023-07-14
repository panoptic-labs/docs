import React from "react"
import "./PillText.css"

const PillText = ({children, grey = false, className}) => {
 
  return (
    <div className={`pill-text ${grey ? 'grey' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default PillText