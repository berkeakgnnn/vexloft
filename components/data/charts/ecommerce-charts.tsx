"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { EcommerceData } from "@/lib/demo-data/types";
import { ChartCard } from "../chart-card";
import {
  CHART_COLORS,
  GRID_COLOR,
  AXIS_COLOR,
  ChartTooltip,
  fmtEurCompact,
  fmtNum,
} from "../chart-theme";

export function EcommerceCharts({
  data,
}: {
  data: EcommerceData;
}): React.ReactElement {
  const monthly = useMemo(
    () =>
      data.months.map((m, i) => ({
        month: m,
        revenue: data.series.revenueByMonth[i],
        orders: data.series.ordersByMonth[i],
      })),
    [data],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue vs Orders by Month" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthly} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="month" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis yAxisId="l" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
                <YAxis yAxisId="r" orientation="right" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={38} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar yAxisId="l" dataKey="revenue" name="Revenue" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={34} />
                <Line yAxisId="r" dataKey="orders" name="Orders" stroke={CHART_COLORS[5]} strokeWidth={2.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Source">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.series.revenueBySource} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88} paddingAngle={2} stroke="none">
                  {data.series.revenueBySource.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip money />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top Products" subtitle="By revenue" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.series.topProducts} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <XAxis type="number" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} tickFormatter={fmtEurCompact} />
                <YAxis type="category" dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={130} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Revenue" fill={CHART_COLORS[0]} radius={4} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Conversion by Source">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.series.sourcePerformance} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={9} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={30} />
                <Tooltip content={<ChartTooltip suffix="%" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="conversion" name="Conversion" fill={CHART_COLORS[3]} radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Traffic Source Performance" subtitle="Revenue, sessions and conversion by channel">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="py-2.5 pr-4 font-semibold">Source</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Revenue</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Sessions</th>
                <th className="py-2.5 text-right font-semibold">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {data.series.sourcePerformance.map((s) => (
                <tr key={s.name} className="border-b border-white/5 text-white/80">
                  <td className="py-2.5 pr-4 font-medium text-white">{s.name}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{fmtEurCompact(s.revenue)}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{fmtNum(s.sessions)}</td>
                  <td className="py-2.5 text-right font-semibold tabular-nums text-emerald-400">{s.conversion.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
