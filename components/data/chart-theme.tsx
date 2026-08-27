"use client";

import type { ReactElement } from "react";

// Refreshed 2026 palette — vivid but harmonious across all dashboards.
export const CHART_COLORS = [
  "#7c6cff", // iris
  "#22d3ee", // cyan
  "#a78bfa", // violet
  "#34d399", // emerald
  "#fbbf24", // amber
  "#f472b6", // pink
  "#60a5fa", // blue
  "#fb7185", // rose
];

export const AXIS_COLOR = "#6b7590";
export const GRID_COLOR = "rgba(148,163,184,0.10)";

export const STATUS_COLORS: Record<string, string> = {
  "In Stock": "#10b981",
  Low: "#f59e0b",
  Reorder: "#f97316",
  "Out of Stock": "#ef4444",
  Received: "#10b981",
  Open: "#f59e0b",
  Overdue: "#ef4444",
};

export function fmtEurCompact(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `€${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `€${Math.round(n / 1_000)}K`;
  return `€${Math.round(n).toLocaleString("en-US")}`;
}

export function fmtNum(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

interface TooltipItem {
  name?: string | number;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string | number;
  money?: boolean;
  suffix?: string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  money = false,
  suffix = "",
}: ChartTooltipProps): ReactElement | null {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0e1422]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-sm">
      {label !== undefined && (
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-white/50">
          {label}
        </p>
      )}
      {payload.map((item, i) => {
        const raw = typeof item.value === "number" ? item.value : Number(item.value);
        const shown = money
          ? fmtEurCompact(raw)
          : `${fmtNum(raw)}${suffix}`;
        return (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color ?? "#818cf8" }}
            />
            <span className="text-white/70">{item.name}</span>
            <span className="ml-auto font-semibold tabular-nums text-white">
              {shown}
            </span>
          </div>
        );
      })}
    </div>
  );
}
