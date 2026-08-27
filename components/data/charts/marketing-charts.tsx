"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { MarketingData } from "@/lib/demo-data/types";
import { ChartCard } from "../chart-card";
import {
  CHART_COLORS,
  GRID_COLOR,
  AXIS_COLOR,
  ChartTooltip,
  fmtEurCompact,
  fmtNum,
} from "../chart-theme";

export function MarketingCharts({
  data,
}: {
  data: MarketingData;
}): React.ReactElement {
  const months = data.months.map((m, i) => ({
    month: m,
    leads: data.series.leadsByMonth[i],
  }));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="ROAS by Channel" subtitle="Return on ad spend">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.series.roasByChannel} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={30} />
                <Tooltip content={<ChartTooltip suffix="x" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="ROAS" fill={CHART_COLORS[3]} radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Conversion Funnel">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.series.funnel} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <XAxis type="number" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} tickFormatter={fmtNum} />
                <YAxis type="category" dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={78} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Count" fill={CHART_COLORS[5]} radius={4} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Leads by Month">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={months} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="month" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={34} />
                <Tooltip content={<ChartTooltip suffix=" leads" />} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Line dataKey="leads" name="Leads" stroke={CHART_COLORS[1]} strokeWidth={2.5} dot={{ r: 3, fill: CHART_COLORS[1] }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Spend vs Revenue by Channel" className="lg:col-span-3">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.series.channelPerformance} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="spend" name="Spend" fill={CHART_COLORS[2]} radius={[3, 3, 0, 0]} maxBarSize={34} />
                <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} maxBarSize={34} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Channel Performance" subtitle="Spend, ROAS, leads and cost per acquisition">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="py-2.5 pr-4 font-semibold">Channel</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Spend</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Revenue</th>
                <th className="py-2.5 pr-4 text-right font-semibold">ROAS</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Leads</th>
                <th className="py-2.5 text-right font-semibold">CAC</th>
              </tr>
            </thead>
            <tbody>
              {data.series.channelPerformance.map((c) => (
                <tr key={c.name} className="border-b border-white/5 text-white/80">
                  <td className="py-2.5 pr-4 font-medium text-white">{c.name}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{fmtEurCompact(c.spend)}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{fmtEurCompact(c.revenue)}</td>
                  <td className="py-2.5 pr-4 text-right font-semibold tabular-nums text-emerald-400">{c.roas.toFixed(1)}x</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{fmtNum(c.leads)}</td>
                  <td className="py-2.5 text-right tabular-nums">{fmtEurCompact(c.cac)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
