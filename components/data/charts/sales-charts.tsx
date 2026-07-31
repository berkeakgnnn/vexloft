"use client";

import { useMemo, useState } from "react";
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
import type { SalesData } from "@/lib/demo-data/types";
import { ChartCard } from "../chart-card";
import { Segmented } from "../controls";
import {
  CHART_COLORS,
  GRID_COLOR,
  AXIS_COLOR,
  ChartTooltip,
  fmtEurCompact,
} from "../chart-theme";

const ALL = "All";

export function SalesCharts({ data }: { data: SalesData }): React.ReactElement {
  const [region, setRegion] = useState(ALL);
  const [category, setCategory] = useState(ALL);

  const view = useMemo(() => {
    const rows = data.rows.filter(
      (r) =>
        (region === ALL || r.region === region) &&
        (category === ALL || r.category === category),
    );
    const monthly = data.months.map((m, i) => {
      const mr = rows.filter((r) => r.monthIndex === i);
      return {
        month: m,
        revenue: mr.reduce((s, r) => s + r.revenue, 0),
        profit: mr.reduce((s, r) => s + r.profit, 0),
      };
    });
    const catRows = data.rows.filter((r) => region === ALL || r.region === region);
    const byCategory = data.categories.map((c) => ({
      name: c,
      value: catRows
        .filter((r) => r.category === c)
        .reduce((s, r) => s + r.revenue, 0),
    }));
    const regRows = data.rows.filter(
      (r) => category === ALL || r.category === category,
    );
    const byRegion = data.regions.map((g) => ({
      name: g,
      value: regRows
        .filter((r) => r.region === g)
        .reduce((s, r) => s + r.revenue, 0),
    }));
    return { monthly, byCategory, byRegion };
  }, [data, region, category]);

  const regionOpts = [ALL, ...data.regions].map((v) => ({ label: v, value: v }));
  const categoryOpts = [ALL, ...data.categories].map((v) => ({
    label: v,
    value: v,
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-x-6 gap-y-4">
        <Segmented label="Region" options={regionOpts} value={region} onChange={setRegion} />
        <Segmented label="Category" options={categoryOpts} value={category} onChange={setCategory} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          title="Revenue & Profit by Month"
          subtitle={`${region} · ${category}`}
          className="lg:col-span-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={view.monthly} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="month" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={34} />
                <Line dataKey="profit" name="Profit" stroke={CHART_COLORS[2]} strokeWidth={2.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Category" subtitle={region === ALL ? "All regions" : region}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={view.byCategory} dataKey="value" nameKey="name" innerRadius={54} outerRadius={90} paddingAngle={2} stroke="none">
                  {view.byCategory.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip money />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Region">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={view.byRegion} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <XAxis type="number" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} tickFormatter={fmtEurCompact} />
                <YAxis type="category" dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={72} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Revenue" fill={CHART_COLORS[1]} radius={4} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top Products" subtitle="Full year revenue" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.series.topProducts} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <XAxis type="number" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} tickFormatter={fmtEurCompact} />
                <YAxis type="category" dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={160} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Revenue" fill={CHART_COLORS[0]} radius={4} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
