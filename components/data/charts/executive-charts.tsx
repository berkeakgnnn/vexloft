"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { ExecutiveData } from "@/lib/demo-data/types";
import { ChartCard } from "../chart-card";
import { Segmented } from "../controls";
import {
  CHART_COLORS,
  GRID_COLOR,
  AXIS_COLOR,
  ChartTooltip,
  fmtEurCompact,
} from "../chart-theme";

export function ExecutiveCharts({
  data,
}: {
  data: ExecutiveData;
}): React.ReactElement {
  const [metric, setMetric] = useState("both");

  const monthly = useMemo(
    () =>
      data.months.map((m, i) => ({
        month: m,
        revenue: data.series.revenueByMonth[i],
        ebitda: data.series.ebitdaByMonth[i],
      })),
    [data],
  );
  const deptRev = data.series.departmentPerformance.map((d) => ({
    name: d.name,
    value: d.revenue,
  }));

  return (
    <div className="space-y-5">
      <Segmented
        label="Metric"
        value={metric}
        onChange={setMetric}
        options={[
          { label: "Revenue + EBITDA", value: "both" },
          { label: "Revenue", value: "revenue" },
          { label: "EBITDA", value: "ebitda" },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue vs EBITDA by Month" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthly} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="month" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                {metric !== "ebitda" && (
                  <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={34} />
                )}
                {metric !== "revenue" && (
                  <Line dataKey="ebitda" name="EBITDA" stroke={CHART_COLORS[2]} strokeWidth={2.5} dot={false} />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Region">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.series.revenueByRegion} dataKey="value" nameKey="name" innerRadius={54} outerRadius={90} paddingAngle={2} stroke="none">
                  {data.series.revenueByRegion.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip money />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Department" className="lg:col-span-3">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptRev} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Revenue" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} maxBarSize={70} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Department KPIs" subtitle="Revenue, growth and margin by unit">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="py-2.5 pr-4 font-semibold">Department</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Revenue</th>
                <th className="py-2.5 pr-4 text-right font-semibold">YoY Growth</th>
                <th className="py-2.5 text-right font-semibold">Margin</th>
              </tr>
            </thead>
            <tbody>
              {data.series.departmentPerformance.map((d) => (
                <tr key={d.name} className="border-b border-white/5 text-white/80">
                  <td className="py-2.5 pr-4 font-medium text-white">{d.name}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{fmtEurCompact(d.revenue)}</td>
                  <td className={`py-2.5 pr-4 text-right font-semibold tabular-nums ${d.growth >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {d.growth >= 0 ? "+" : ""}
                    {d.growth.toFixed(1)}%
                  </td>
                  <td className="py-2.5 text-right tabular-nums text-white/80">{d.margin.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
