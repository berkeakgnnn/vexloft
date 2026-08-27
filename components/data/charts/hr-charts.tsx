"use client";

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
import type { HrData } from "@/lib/demo-data/types";
import { ChartCard } from "../chart-card";
import {
  CHART_COLORS,
  GRID_COLOR,
  AXIS_COLOR,
  ChartTooltip,
  fmtNum,
} from "../chart-theme";

export function HrCharts({ data }: { data: HrData }): React.ReactElement {
  const months = data.months.map((m, i) => ({
    month: m,
    leavers: data.series.attritionByMonth[i],
  }));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Headcount by Department" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.series.headcountByDept} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={34} />
                <Tooltip content={<ChartTooltip suffix=" people" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Headcount" fill={CHART_COLORS[1]} radius={[4, 4, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Tenure Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.series.tenureDistribution} dataKey="value" nameKey="name" innerRadius={48} outerRadius={84} paddingAngle={2} stroke="none">
                  {data.series.tenureDistribution.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip suffix=" people" />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Attrition by Month" subtitle="Leavers" className="lg:col-span-2">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={months} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="month" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={30} />
                <Tooltip content={<ChartTooltip suffix=" leavers" />} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Line dataKey="leavers" name="Leavers" stroke={CHART_COLORS[7]} strokeWidth={2.5} dot={{ r: 3, fill: CHART_COLORS[7] }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Hiring Funnel">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.series.hiringFunnel} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <XAxis type="number" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} tickFormatter={fmtNum} />
                <YAxis type="category" dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={78} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Candidates" fill={CHART_COLORS[3]} radius={4} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Department People KPIs" subtitle="Headcount and attrition by team">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="py-2.5 pr-4 font-semibold">Department</th>
                <th className="py-2.5 pr-4 text-right font-semibold">Headcount</th>
                <th className="py-2.5 text-right font-semibold">Attrition</th>
              </tr>
            </thead>
            <tbody>
              {data.table.map((r) => (
                <tr key={r.name} className="border-b border-white/5 text-white/80">
                  <td className="py-2.5 pr-4 font-medium text-white">{r.name}</td>
                  <td className="py-2.5 pr-4 text-right tabular-nums">{r.headcount}</td>
                  <td className={`py-2.5 text-right font-semibold tabular-nums ${r.attrition > 15 ? "text-rose-400" : "text-emerald-400"}`}>
                    {r.attrition.toFixed(1)}%
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
