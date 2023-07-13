import React from "react";

export const JadeLizard = ({
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
        d="M22 45 L 35 27 L 91 27 L 100 40 L 125 40 L 125 45"
        fill="#45E1AF"
        fillOpacity=".5"
      />

      <path d="M22 45 L -10 90 L 0 45" fill="#F55550" fillOpacity=".5" />

      <path
        d="M22 45 L 35 27 L 91 27 L 100 40 L 125 40"
        stroke="#169269"
        strokeOpacity=".9"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M22 45 L -10 90"
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
        cx="35"
        cy="27"
        r="3.357"
        fill="#169269"
        stroke="#0C0C0C"
        strokeWidth="1.25"
      />

      <circle
        cx="91"
        cy="27"
        r="3.357"
        fill="#169269"
        stroke="#0C0C0C"
        strokeWidth="1.25"
      />
      <circle
        cx="100"
        cy="40"
        r="3.357"
        fill="#169269"
        stroke="#0C0C0C"
        strokeWidth="1.25"
      />
    </svg>
  );
};
