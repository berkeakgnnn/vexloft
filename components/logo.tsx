interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* V icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
        <path
          d="M8 9L16 23L24 9"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="logo-grad"
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4338ca" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wordmark */}
      <span
        className="font-display font-bold text-xl tracking-tight"
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
