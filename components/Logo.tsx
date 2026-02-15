export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Modern hexagonal badge background */}
        <path
          d="M24 2L42 12V36L24 46L6 36V12L24 2Z"
          fill="#0B1F3B"
          fillOpacity="0.95"
        />

        {/* Inner hexagon accent */}
        <path
          d="M24 6L38 14V34L24 42L10 34V14L24 6Z"
          stroke="#0F766E"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          fill="none"
        />

        {/* GPS location pin with modern styling */}
        <g transform="translate(24, 24)">
          {/* Pin outer circle */}
          <circle
            cx="0"
            cy="-6"
            r="7"
            fill="#0F766E"
            fillOpacity="0.2"
          />

          {/* Pin main body */}
          <path
            d="M0 -12C-3.31 -12 -6 -9.31 -6 -6C-6 -1.5 0 5 0 5C0 5 6 -1.5 6 -6C6 -9.31 3.31 -12 0 -12Z"
            fill="#0F766E"
          />

          {/* Pin inner dot */}
          <circle
            cx="0"
            cy="-6"
            r="2.5"
            fill="white"
            fillOpacity="0.9"
          />

          {/* Verification checkmark */}
          <path
            d="M-2 -6.5L-0.5 -5L2 -8"
            stroke="#0B1F3B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Subtle grid pattern for survey/mapping theme */}
        <g opacity="0.08">
          <line x1="16" y1="18" x2="16" y2="30" stroke="#0F766E" strokeWidth="0.5" />
          <line x1="20" y1="18" x2="20" y2="30" stroke="#0F766E" strokeWidth="0.5" />
          <line x1="28" y1="18" x2="28" y2="30" stroke="#0F766E" strokeWidth="0.5" />
          <line x1="32" y1="18" x2="32" y2="30" stroke="#0F766E" strokeWidth="0.5" />
          <line x1="14" y1="20" x2="34" y2="20" stroke="#0F766E" strokeWidth="0.5" />
          <line x1="14" y1="24" x2="34" y2="24" stroke="#0F766E" strokeWidth="0.5" />
          <line x1="14" y1="28" x2="34" y2="28" stroke="#0F766E" strokeWidth="0.5" />
        </g>
      </svg>

      {/* Wordmark with modern typography */}
      <div className="flex flex-col leading-none">
        <span
          className="text-xl font-bold tracking-wide"
          style={{
            color: "#0B1F3B",
            letterSpacing: "0.08em",
            fontWeight: 700
          }}
        >
          VerifyKe
        </span>
        <span
          className="text-[9px] font-medium tracking-widest mt-0.5"
          style={{
            color: "#0F766E",
            letterSpacing: "0.2em",
            textTransform: "uppercase"
          }}
        >
          Property Intel
        </span>
      </div>
    </div>
  );
}
