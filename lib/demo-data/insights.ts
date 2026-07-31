import type { DashboardData } from "./types";

// A single, honest headline insight computed from the data — the 2026 "AI insight" touch,
// but real: every number here is derived from the dashboard's own dataset.
export function computeInsight(data: DashboardData): string {
  switch (data.id) {
    case "sales": {
      const totals = new Map<string, number>();
      for (const r of data.rows)
        totals.set(r.region, (totals.get(r.region) ?? 0) + r.revenue);
      const total = [...totals.values()].reduce((s, v) => s + v, 0);
      const [region, val] = [...totals.entries()].sort((a, b) => b[1] - a[1])[0];
      const share = Math.round((val / total) * 100);
      return `${region} is your strongest region — ${share}% of total revenue.`;
    }
    case "inventory": {
      const below = data.rows.filter(
        (r) => r.status === "Reorder" || r.status === "Out of Stock",
      ).length;
      const top = [...data.series.valueByCategory].sort((a, b) => b.value - a.value)[0];
      return `${below} SKUs need reordering — ${top.name} holds the most inventory value.`;
    }
    case "procurement": {
      const overdue = data.rows.filter((r) => r.status === "Overdue").length;
      const best = data.scorecard[0];
      return `${overdue} POs are overdue — ${best.supplier} is your top-rated supplier (${best.rating}).`;
    }
    case "executive": {
      const top = [...data.series.departmentPerformance].sort(
        (a, b) => b.growth - a.growth,
      )[0];
      return `${top.name} is your fastest-growing unit at +${top.growth.toFixed(1)}% YoY.`;
    }
    default:
      return "";
  }
}
