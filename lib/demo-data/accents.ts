import type { CSSProperties } from "react";

// Per-dashboard signature accent — the 2026 "category tint" pattern.
interface Accent {
  accent: string;
  accent2: string;
}

export const ACCENTS: Record<string, Accent> = {
  sales: { accent: "#6366f1", accent2: "#818cf8" },
  inventory: { accent: "#f59e0b", accent2: "#fbbf24" },
  procurement: { accent: "#8b5cf6", accent2: "#a78bfa" },
  executive: { accent: "#3b82f6", accent2: "#60a5fa" },
  financial: { accent: "#10b981", accent2: "#34d399" },
  marketing: { accent: "#ec4899", accent2: "#f472b6" },
  hr: { accent: "#14b8a6", accent2: "#2dd4bf" },
  ecommerce: { accent: "#fb7185", accent2: "#fda4af" },
};

const DEFAULT: Accent = { accent: "#7c6cff", accent2: "#a78bfa" };

export function getAccent(slug: string): Accent {
  return ACCENTS[slug] ?? DEFAULT;
}

export function accentVars(slug: string): CSSProperties {
  const a = getAccent(slug);
  const vars: Record<string, string> = {
    "--vx-accent": a.accent,
    "--vx-accent-2": a.accent2,
    "--vx-accent-soft": `${a.accent}26`,
  };
  return vars as CSSProperties;
}
