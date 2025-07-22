import React from "react";

const Logo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 352 89"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(0 15)">
        <path
          d="M49.2 38.2C40.6 38 31.5 39.5 24 43.3c-2.8 1.4-1.2 5.6 1.8 5.4 12-1 25.8-1.2 37.1 2.9 14.6 5.3 22.3 20 22.3 35.1"
          stroke="#b87a7f"
          strokeWidth="2.5"
        />
        <text fontFamily="cursive" fontSize="22" fill="#b87a7f">
          <tspan x="19" y="32">
            Hope
          </tspan>
        </text>
        <path d="M54.5 32.5h3l1.5-4h2l2 8-2.5 2-1.5-3.5h-3.5" fill="#b87a7f" />
        <rect fill="#2daae2" x="0" y="0" width="10" height="59" rx="2" />
        <rect fill="#2daae2" x="14" y="9" width="10" height="50" rx="2" />
        <path
          d="M89.7 5.4c0-3-2.2-5.4-5-5.4-9.3 0-10.4 20-10.4 34.4s.9 30.6 10.4 30.6c2.8 0 5-2.4 5-5.4V5.4z"
          fill="#0e4257"
        />
        <path
          d="M103.1 8.9c0-3.3-2.5-6-5.6-6-10.4 0-11.6 17-11.6 31s1.3 28.1 11.6 28.1c3.1 0 5.6-2.7 5.6-6V8.9z"
          fill="#2daae2"
        />
        <rect fill="#0e4257" x="110" y="22" width="8" height="24" rx="2" />
        <rect
          fill="#0e4257"
          x="122"
          y="38"
          width="8"
          height="24"
          rx="2"
          transform="rotate(90 126 50)"
        />
      </g>
      <g
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="36"
        fontWeight="bold"
        transform="translate(150 0)"
      >
        <text fill="#2daae2">
          <tspan x="0" y="29">
            H
          </tspan>
          <tspan x="51" y="29">
            PE
          </tspan>
        </text>
        <path
          d="M38.5 29.5a13.5 13.5 0 0 1 0-27h-1a13.5 13.5 0 0 0 0 27h1z"
          fill="#b87a7f"
        />
        <path
          d="M38.5 29.5a13.5 13.5 0 0 0 0-27h1a13.5 13.5 0 0 1 0 27h-1z"
          fill="#2daae2"
        />

        <text fill="#b87a7f">
          <tspan x="0" y="59">
            BEHIND
          </tspan>
        </text>

        <text fill="#2daae2">
          <tspan x="0" y="89">
            BARS.
          </tspan>
        </text>
      </g>
    </g>
  </svg>
);

export default Logo;
