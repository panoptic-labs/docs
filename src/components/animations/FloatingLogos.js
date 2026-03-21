import React from "react";
import "./FloatingLogos.css";

/**
 * Fixed-position floating Panoptic logo marks that drift behind all content.
 * Uses pure CSS animations for performance (no JS scroll listeners).
 */

const logoPath = "M171.93 142.437L159.277 129.784C191.627 97.4351 191.605 45.0039 159.277 12.6546L171.93 0.00170898C211.237 39.3305 211.259 103.109 171.93 142.437ZM42.1236 129.785C9.77424 97.4352 9.77424 44.9826 42.1236 12.6332L29.4921 0.00178792C-9.83662 39.3305 -9.85802 103.109 29.4707 142.437H29.4921L42.145 129.785H42.1236ZM29.4957 71.2088C29.4957 31.88 61.3954 0.00170898 100.724 0.00170898C140.053 0.00170898 171.931 31.88 171.931 71.2088C171.931 110.538 140.053 142.437 100.724 142.437C61.3954 142.437 29.4957 110.538 29.4957 71.2088ZM46.9228 70.7592C46.9228 100.454 71.0082 124.539 100.724 124.539C130.44 124.539 154.526 100.475 154.526 70.7592C154.526 41.0432 130.44 16.9578 100.724 16.9578C71.0082 16.9578 46.9228 41.0646 46.9228 70.7592Z";

const LogoMark = ({ id }) => (
  <svg viewBox="0 0 202 143" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d={logoPath} fill={`url(#${id})`} />
    <defs>
      <linearGradient id={id} x1="0.39" y1="141.87" x2="201.64" y2="0.57" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C0EF1" />
        <stop offset="1" stopColor="#B25CF6" />
      </linearGradient>
    </defs>
  </svg>
);

export default function FloatingLogos() {
  return (
    <div className="floating-logos" aria-hidden="true">
      <div className="floating-logo floating-logo-1"><LogoMark id="fl-grad-1" /></div>
      <div className="floating-logo floating-logo-2"><LogoMark id="fl-grad-2" /></div>
      <div className="floating-logo floating-logo-3"><LogoMark id="fl-grad-3" /></div>
    </div>
  );
}
