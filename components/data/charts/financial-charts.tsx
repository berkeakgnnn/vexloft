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
  Legend,
} from "recharts";
import type { FinancialData } from "@/lib/demo-data/types";
import { ChartCard } from "../chart-card";
import {
  CHART_COLORS,
  GRID_COLOR,
  AXIS_COLOR,
  ChartTooltip,
  fmtEurCompact,
} from "../chart-theme";

export function FinancialCharts({
  data,
}: {
  data: FinancialData;
}): React.ReactElement {
  const monthly = useMemo(
    () =>
      data.months.map((m, i) => ({
        month: m,
        revenue: data.series.revenueByMonth[i],
        ebitda: data.series.ebitdaByMonth[i],
        cashIn: data.series.cashInByMonth[i],
        cashOut: -data.series.cashOutByMonth[i],
        net: data.series.cashNetByMonth[i],
      })),
    [data],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <ChartCard title="Revenue vs EBITDA by Month" className="lg:col-span-2">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthly} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke={GRID_COLOR} />
              <XAxis dataKey="month" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
              <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
              <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={34} />
              <Line dataKey="ebitda" name="EBITDA" stroke={CHART_COLORS[3]} strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Expense Breakdown">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.series.expenseBreakdown} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88} paddingAngle={2} stroke="none">
                {data.series.expenseBreakdown.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip money />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Cash Flow — In vs Out" subtitle="Net line overlaid" className="lg:col-span-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthly} stackOffset="sign" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke={GRID_COLOR} />
              <XAxis dataKey="month" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
              <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
              <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="cashIn" name="Cash In" fill={CHART_COLORS[3]} radius={[3, 3, 0, 0]} maxBarSize={22} />
              <Bar dataKey="cashOut" name="Cash Out" fill={CHART_COLORS[7]} radius={[0, 0, 3, 3]} maxBarSize={22} />
              <Line dataKey="net" name="Net" stroke={CHART_COLORS[1]} strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Budget vs Actual">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.series.budgetVsActual} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke={GRID_COLOR} />
              <XAxis dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} />
              <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={44} tickFormatter={fmtEurCompact} />
              <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="budget" name="Budget" fill={CHART_COLORS[2]} radius={[3, 3, 0, 0]} maxBarSize={18} />
              <Bar dataKey="actual" name="Actual" fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
