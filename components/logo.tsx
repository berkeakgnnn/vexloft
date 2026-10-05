interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

interface LogoMarkProps {
  // "light" = on dark backgrounds (white left stroke), "dark" = on light backgrounds
  variant?: "light" | "dark";
  size?: number;
  tip?: boolean;
}

// Vector redraw of the brand mark (public/brand/vexloft-mark.png): solid left
// stroke, indigo→violet right stroke, cyan diamond at the point.
export function LogoMark({
  variant = "dark",
  size = 32,
  tip = true,
}: LogoMarkProps): React.ReactElement {
  // Same gradient for every instance, so a shared id is safe (and works in
  // server components, unlike useId).
  const gradientId = "vexloft-mark-gradient";
  const left = variant === "light" ? "#ffffff" : "#111a2e";

  return (
    <svg
      width={size}
      height={size * (57 / 67)}
      viewBox="-1 -1 67 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="56"
          y1="1"
          x2="36"
          y2="49"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3b2fd9" />
          <stop offset="100%" stopColor="#8b3cf7" />
        </linearGradient>
      </defs>
      <path
        d="M0.8 1.25 H13.3 L32.2 30.8 V45.8 L29 49.6 Z"
        fill={left}
        stroke={left}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M48.3 1.25 H63.75 L35.4 49.6 L32.2 45.8 V30.8 Z"
        fill={`url(#${gradientId})`}
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {tip && (
        <path d="M29 49.6 L32.2 45.8 L35.4 49.6 L32.2 53.75 Z" fill="#06b6d4" />
      )}
    </svg>
  );
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} size={34} />
      <span
        className="font-extrabold text-[1.4rem] tracking-[-0.03em]"
        style={{
          color: textColor,
          fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
        }}
      >
        Vexloft
      </span>
    </div>
  );
}
