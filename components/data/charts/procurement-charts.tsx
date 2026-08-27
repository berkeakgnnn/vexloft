"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { ProcurementData } from "@/lib/demo-data/types";
import { ChartCard } from "../chart-card";
import { SelectFilter } from "../controls";
import {
  CHART_COLORS,
  GRID_COLOR,
  AXIS_COLOR,
  STATUS_COLORS,
  ChartTooltip,
  fmtEurCompact,
} from "../chart-theme";

const ALL = "All";

const RATING_COLOR: Record<string, string> = {
  A: "#10b981",
  B: "#f59e0b",
  C: "#ef4444",
};

export function ProcurementCharts({
  data,
}: {
  data: ProcurementData;
}): React.ReactElement {
  const [category, setCategory] = useState(ALL);
  const [supplier, setSupplier] = useState(ALL);
  const [status, setStatus] = useState(ALL);

  const view = useMemo(() => {
    const match = (r: ProcurementData["rows"][number]) =>
      (category === ALL || r.category === category) &&
      (supplier === ALL || r.supplier === supplier) &&
      (status === ALL || r.status === status);
    const rows = data.rows.filter(match);

    const byCategory = data.categories
      .map((c) => ({
        name: c,
        value: rows.filter((r) => r.category === c).reduce((s, r) => s + r.value, 0),
      }))
      .filter((x) => x.value > 0);

    const bySupplier = [...data.suppliers]
      .map((s) => ({
        name: s,
        value: rows.filter((r) => r.supplier === s).reduce((a, r) => a + r.value, 0),
      }))
      .filter((x) => x.value > 0)
      .sort((a, b) => b.value - a.value);

    const statusDist = data.statuses
      .map((s) => ({
        name: s,
        value: data.rows.filter(
          (r) =>
            r.status === s &&
            (category === ALL || r.category === category) &&
            (supplier === ALL || r.supplier === supplier),
        ).length,
      }))
      .filter((x) => x.value > 0);

    const byMonth = data.series.months.map((m, i) => ({
      month: m,
      value: rows.filter((r) => r.monthIndex === i).reduce((s, r) => s + r.value, 0),
    }));

    return { byCategory, bySupplier, statusDist, byMonth };
  }, [data, category, supplier, status]);

  const opt = (v: string) => ({ label: v, value: v });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4">
        <SelectFilter label="Category" value={category} onChange={setCategory} options={[ALL, ...data.categories].map(opt)} />
        <SelectFilter label="Supplier" value={supplier} onChange={setSupplier} options={[ALL, ...data.suppliers].map(opt)} />
        <SelectFilter label="Status" value={status} onChange={setStatus} options={[ALL, ...data.statuses].map(opt)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Spend by Category" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={view.byCategory} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Spend" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={54} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="PO Status" subtitle="Order distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={view.statusDist} dataKey="value" nameKey="name" innerRadius={48} outerRadius={84} paddingAngle={2} stroke="none">
                  {view.statusDist.map((entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS[entry.name] ?? CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip suffix=" POs" />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Monthly Spend Trend" className="lg:col-span-2">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={view.byMonth} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="month" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
                <Tooltip content={<ChartTooltip money />} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Line dataKey="value" name="Spend" stroke={CHART_COLORS[1]} strokeWidth={2.5} dot={{ r: 3, fill: CHART_COLORS[1] }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Spend by Supplier" subtitle="Top suppliers">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={view.bySupplier.slice(0, 6)} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <XAxis type="number" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} tickFormatter={fmtEurCompact} />
                <YAxis type="category" dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} width={110} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Spend" fill={CHART_COLORS[2]} radius={4} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Supplier Scorecard" subtitle="On-time delivery, quality & price performance">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="py-2.5 pr-4 font-semibold">Supplier</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Spend</th>
                <th className="py-2.5 pr-4 text-right font-semibold">OTD %</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Lead (d)</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Quality %</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Overall</th>
                <th className="py-2.5 text-center font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.scorecard.map((s) => (
                <tr key={s.supplier} className="border-b border-white/5 text-white/80">
                  <td className="py-2.5 pr-4 font-medium text-white">{s.supplier}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{fmtEurCompact(s.spend)}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{s.otd.toFixed(1)}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{s.leadTime}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{s.quality.toFixed(1)}</td>
                  <td className="py-2.5 pr-4 text-right font-semibold tabular-nums text-white">{s.overall.toFixed(1)}</td>
                  <td className="py-2.5 text-center">
                    <span
                      className="inline-block h-6 w-6 rounded-full text-center text-xs font-bold leading-6"
                      style={{ color: RATING_COLOR[s.rating], backgroundColor: `${RATING_COLOR[s.rating]}22` }}
                    >
                      {s.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
