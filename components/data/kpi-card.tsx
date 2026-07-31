import type { Kpi } from "@/lib/demo-data/types";

export function KpiCard({ kpi }: { kpi: Kpi }): React.ReactElement {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-white/20">
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: kpi.accent }}
      />
      <p className="text-[11px] font-medium uppercase tracking-wide text-white/45">
        {kpi.label}
      </p>
      <p className="mt-2 font-display text-2xl font-extrabold tabular-nums text-white">
        {kpi.value}
      </p>
      <div className="mt-1.5 flex items-center gap-1.5 text-xs">
        <span
          className={
            kpi.deltaUp
              ? "font-semibold text-emerald-400"
              : "font-semibold text-rose-400"
          }
        >
          {kpi.deltaUp ? "▲" : "▼"} {kpi.delta}
        </span>
        <span className="text-white/35">{kpi.sub}</span>
      </div>
    </div>
  );
}
