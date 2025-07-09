import React from 'react';
import UniLogo from '@site/static/img/white-unichain-logo.png';   // webpack import

/**
 * Panoptic × Unichain competition banner
 * – self-contained React component so SVGR/SVGO can’t mangle it
 */
const PanopticUnichainBanner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 150"
    width={1200}
    height={200}
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    {/* ───────── reusable shapes ───────── */}
    <defs>
      <path
        id="ring"
        fill="#fff"
        d="M102.867 75.141c0 14.887-12.109 26.988-26.988 26.988S48.902 90.028 48.902 75.141 60.996 48.156 75.879 48.156s26.988 12.102 26.988 26.985ZM54.676 75.141c0 11.703 9.52 21.226 21.203 21.226s21.214-9.403 21.214-21.226-9.516-21.223-21.214-21.223-21.203 9.52-21.203 21.223Z"
      />
      <path
        id="wing"
        fill="#fff"
        d="M113.277 75.141c0 9.824-3.77 19.097-10.629 26.121l-4.129-4.032c5.801-5.942 8.985-13.79 8.985-22.089 0-8.301-3.195-16.16-8.985-22.09l4.129-4.031c6.859 7.023 10.629 16.296 10.629 26.121Z"
      />
    </defs>

    {/* ───────── first set ───────── */}
    <g>
      <use href="#ring" />
      <use href="#wing" />
      <use href="#wing" transform="scale(-1 1) translate(-756 0)" />
    </g>
    <image xlinkHref={UniLogo} x="185" y="22" width="70" height="106" />

    {/* ───────── second set ───────── */}
    <g transform="translate(306 0)">
      <use href="#ring" />
      <use href="#wing" />
      <use href="#wing" transform="scale(-1 1) translate(155 0)" />
    </g>
    <image xlinkHref={UniLogo} x="485" y="22" width="70" height="106" />

    {/* ───────── third set ───────── */}
    <g transform="translate(605 0)">
      <use href="#ring" />
      <use href="#wing" />
      <use href="#wing" transform="scale(-1 1) translate(148 0)" />
    </g>
    <image xlinkHref={UniLogo} x="785" y="22" width="70" height="106" />
  </svg>
);

export default PanopticUnichainBanner;
