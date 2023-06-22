import React from "react"
import "./PillText.css"

const PillText = ({children, grey = false}) => {
 
  return (
    <div className={`pill-text ${grey ? 'grey' : ''}`}>
      {children}
    </div>
  )
}

export default PillText