"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { InventoryData } from "@/lib/demo-data/types";
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

export function InventoryCharts({
  data,
}: {
  data: InventoryData;
}): React.ReactElement {
  const [category, setCategory] = useState(ALL);
  const [warehouse, setWarehouse] = useState(ALL);
  const [status, setStatus] = useState(ALL);

  const view = useMemo(() => {
    const match = (r: InventoryData["rows"][number]) =>
      (category === ALL || r.category === category) &&
      (warehouse === ALL || r.warehouse === warehouse) &&
      (status === ALL || r.status === status);

    const rows = data.rows.filter(match);

    const byCategory = data.categories
      .map((c) => ({
        name: c,
        value: data.rows
          .filter(
            (r) =>
              r.category === c &&
              (warehouse === ALL || r.warehouse === warehouse) &&
              (status === ALL || r.status === status),
          )
          .reduce((s, r) => s + r.value, 0),
      }))
      .filter((x) => x.value > 0);

    const statusDist = data.statusOrder
      .map((s) => ({
        name: s,
        value: data.rows.filter(
          (r) =>
            r.status === s &&
            (category === ALL || r.category === category) &&
            (warehouse === ALL || r.warehouse === warehouse),
        ).length,
      }))
      .filter((x) => x.value > 0);

    const topSkus = [...rows]
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
      .map((r) => ({ name: `${r.part}`, value: r.value }));

    const alerts = [...rows]
      .filter((r) => r.status === "Reorder" || r.status === "Out of Stock")
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    return { byCategory, statusDist, topSkus, alerts };
  }, [data, category, warehouse, status]);

  const opt = (v: string) => ({ label: v, value: v });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4">
        <SelectFilter label="Category" value={category} onChange={setCategory} options={[ALL, ...data.categories].map(opt)} />
        <SelectFilter label="Warehouse" value={warehouse} onChange={setWarehouse} options={[ALL, ...data.warehouses].map(opt)} />
        <SelectFilter label="Status" value={status} onChange={setStatus} options={[ALL, ...data.statusOrder].map(opt)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Inventory Value by Category" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={view.byCategory} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={48} tickFormatter={fmtEurCompact} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Value" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={54} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Stock Status" subtitle="SKU distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={view.statusDist} dataKey="value" nameKey="name" innerRadius={48} outerRadius={84} paddingAngle={2} stroke="none">
                  {view.statusDist.map((entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS[entry.name] ?? CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip suffix=" SKUs" />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top SKUs by Value" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={view.topSkus} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <XAxis type="number" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={10} tickFormatter={fmtEurCompact} />
                <YAxis type="category" dataKey="name" stroke={AXIS_COLOR} tickLine={false} axisLine={false} fontSize={11} width={150} />
                <Tooltip content={<ChartTooltip money />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" name="Value" fill={CHART_COLORS[2]} radius={4} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Reorder Alerts" subtitle="Needs action">
          <div className="flex h-72 flex-col gap-2 overflow-y-auto pr-1">
            {view.alerts.length === 0 ? (
              <p className="mt-8 text-center text-sm text-white/40">
                No items below reorder point for this filter. ✅
              </p>
            ) : (
              view.alerts.map((r) => (
                <div key={r.sku} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{r.part}</p>
                    <p className="text-[11px] text-white/40">
                      {r.sku} · on hand {r.onHand}/{r.reorderPoint}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      color: STATUS_COLORS[r.status],
                      backgroundColor: `${STATUS_COLORS[r.status]}1f`,
                    }}
                  >
                    {r.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
