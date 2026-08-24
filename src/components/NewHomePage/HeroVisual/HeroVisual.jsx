import React from "react";
import "./HeroVisual.css";

/**
 * PLACEHOLDER hero visual — purely decorative abstract shape, no meaning
 * attached. Swap for real imagery later.
 */
export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg
        className="hero-visual-svg"
        viewBox="0 0 560 460"
        fill="none"
        focusable="false"
      >
        <defs>
          <radialGradient id="hv-core" cx="0.42" cy="0.38" r="0.68">
            <stop offset="0" stopColor="#B48EFF" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#7A40F5" stopOpacity="0.75" />
            <stop offset="1" stopColor="#25056F" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="hv-halo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#22D3EE" stopOpacity="0.35" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hv-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B48EFF" stopOpacity="0.7" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0.15" />
          </linearGradient>
          <filter id="hv-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter id="hv-faint" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* soft halo behind everything */}
        <circle cx="300" cy="225" r="205" fill="url(#hv-halo)" />

        {/* blurred backing blob */}
        <path
          filter="url(#hv-soft)"
          fill="#590FF5"
          fillOpacity="0.4"
          d="M372 92c58 33 108 84 112 149 4 66-38 146-99 176-61 31-141 12-197-24-56-37-88-91-84-150 4-58 44-121 101-152 57-32 109-32 167 1z"
        />

        {/* main blob */}
        <path
          fill="url(#hv-core)"
          d="M356 104c54 30 99 79 103 139 4 61-34 135-91 163-56 29-131 12-183-22-52-35-81-85-77-140 3-54 40-112 93-141 53-30 101-29 155 1z"
        />

        {/* orbiting contour lines */}
        <g filter="url(#hv-faint)" stroke="url(#hv-ring)" fill="none">
          <ellipse cx="292" cy="222" rx="188" ry="96" strokeWidth="1.5" transform="rotate(-18 292 222)" />
          <ellipse cx="292" cy="222" rx="150" ry="150" strokeWidth="1" opacity="0.5" />
          <ellipse cx="292" cy="222" rx="196" ry="52" strokeWidth="1" opacity="0.6" transform="rotate(14 292 222)" />
        </g>

        {/* highlight */}
        <ellipse cx="236" cy="150" rx="62" ry="44" fill="#F4EDFF" fillOpacity="0.16" filter="url(#hv-soft)" />
      </svg>
    </div>
  );
}
