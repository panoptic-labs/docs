import React from "react";

export const LongCall = ({
  width = 124,
  height = 90,
  className = "",
}) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 124 90"
      width={width}
      height={height}
      className={className}
    >

      <path
        d="M110 1 L 125 1 L 125 45 L 91 45"
        fill="#45E1AF"
        fillOpacity=".5"
      />
      <path
        d="M0 45 L 0 70 L 80 70 L 91 45"
        fill="#F55550"
        fillOpacity=".5"
      />
    
      <path
        d="M91 45 L 110 0"
        stroke="#169269"
        strokeOpacity=".9"
        strokeWidth="2.5"
        strokeLinecap="round"        
      />      
  
      <path
        d="M0 70 L 45 70 L 80 70 L 91 45"
        stroke="#C4403C"
        strokeOpacity=".9"
        strokeWidth="2.5"
        strokeLinecap="round"        
      />    

      <path
        d="M0 45 L 125 45"
        stroke="#696969"
        strokeOpacity=".4"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeDasharray="0.13 5.14"        
      />

      <circle
        cx="80"
        cy="70"
        r="3.357"
        fill="#C4403C"
        stroke="#0C0C0C"
        strokeWidth="1.25"
      />      
    </svg>    
  );
};
