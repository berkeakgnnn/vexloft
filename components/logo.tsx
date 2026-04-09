interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* V icon — matching Gemini-generated design */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-v-grad" x1="128" y1="80" x2="384" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1"/>
            <stop offset="50%" stopColor="#7c3aed"/>
            <stop offset="100%" stopColor="#a855f7"/>
          </linearGradient>
        </defs>
        {/* Left arm */}
        <path d="M128 100 L200 100 L256 340 L220 340 Z" fill="url(#logo-v-grad)"/>
        {/* Right arm */}
        <path d="M384 100 L312 100 L256 340 L292 340 Z" fill="url(#logo-v-grad)"/>
        {/* Left wing */}
        <path d="M128 100 L88 140 L190 260 L200 100 Z" fill="url(#logo-v-grad)" opacity="0.7"/>
        {/* Right wing */}
        <path d="M384 100 L424 140 L322 260 L312 100 Z" fill="url(#logo-v-grad)" opacity="0.7"/>
        {/* Center diamond cutout */}
        <path d="M230 180 L256 240 L282 180 L256 140 Z" fill={variant === "light" ? "#060a14" : "#ffffff"} opacity="0.3"/>
      </svg>

      {/* Wordmark */}
      <span
        className="font-bold text-xl tracking-tight"
        style={{
          color: textColor,
          fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
        }}
      >
        VEXLOFT
      </span>
    </div>
  );
}
