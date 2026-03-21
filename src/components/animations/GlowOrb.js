import React from "react";

const GlowOrb = ({
  size = 400,
  color = "rgba(123, 63, 228, 0.15)",
  top,
  left,
  right,
  bottom,
  delay = 0,
  className = ""
}) => (
  <div
    className={`absolute pointer-events-none ${className}`}
    style={{
      width: size,
      height: size,
      top,
      left,
      right,
      bottom,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: `float ${6 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

export default GlowOrb;
