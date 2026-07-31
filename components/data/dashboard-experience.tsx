"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Download,
  Check,
  Link2,
  FileText,
  Sparkles,
} from "lucide-react";
import type { DashboardData } from "@/lib/demo-data/types";
import { accentVars } from "@/lib/demo-data/accents";
import { computeInsight } from "@/lib/demo-data/insights";
import { KpiCard } from "./kpi-card";
import { ExcelPanel } from "./excel-panel";
import { SalesCharts } from "./charts/sales-charts";
import { InventoryCharts } from "./charts/inventory-charts";
import { ProcurementCharts } from "./charts/procurement-charts";
import { ExecutiveCharts } from "./charts/executive-charts";
import { FinancialCharts } from "./charts/financial-charts";
import { MarketingCharts } from "./charts/marketing-charts";
import { HrCharts } from "./charts/hr-charts";
import { EcommerceCharts } from "./charts/ecommerce-charts";

type Tab = "dashboard" | "excel" | "download";

interface Props {
  data: DashboardData;
  embedUrl: string | null;
  downloadPath: string;
}

function Charts({ data }: { data: DashboardData }): React.ReactElement | null {
  switch (data.id) {
    case "sales":
      return <SalesCharts data={data} />;
    case "inventory":
      return <InventoryCharts data={data} />;
    case "procurement":
      return <ProcurementCharts data={data} />;
    case "executive":
      return <ExecutiveCharts data={data} />;
    case "financial":
      return <FinancialCharts data={data} />;
    case "marketing":
      return <MarketingCharts data={data} />;
    case "hr":
      return <HrCharts data={data} />;
    case "ecommerce":
      return <EcommerceCharts data={data} />;
    default:
      return null;
  }
}

const INSIDE = [
  "Interactive dashboard sheet — KPI cards & native Excel charts",
  "Full data table with AutoFilter & frozen header",
  "Conditional formatting, color scales & status highlights",
  "Clean model layer — ready for Excel, Google Sheets & Power BI",
];

const TABS: Array<{ id: Tab; label: string; icon: typeof LayoutDashboard }> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "excel", label: "Live Excel", icon: FileSpreadsheet },
  { id: "download", label: "Download", icon: Download },
];

export function DashboardExperience({
  data,
  embedUrl,
  downloadPath,
}: Props): React.ReactElement {
  const [tab, setTab] = useState<Tab>("dashboard");
  const insight = computeInsight(data);

  return (
    <div className="vx-rise space-y-6" style={accentVars(data.slug)}>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="vx-chip rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
              {data.company}
            </span>
            <span className="text-[11px] text-white/40">{data.period}</span>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            {data.title}
          </h1>
          <a
            href={`https://data.vexloft.com/${data.slug}`}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
          >
            <Link2 className="vx-accent-text h-3.5 w-3.5" />
            data.vexloft.com/{data.slug}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`/demo/pdf/${data.slug}-portfolio.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="vx-btn-accent inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white"
          >
            <FileText className="h-4 w-4" />
            Portfolio PDF
          </a>
          <a
            href={downloadPath}
            download
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white/30"
          >
            <Download className="h-4 w-4" />
            .xlsx
          </a>
        </div>
      </header>

      <div className="vx-glass inline-flex gap-1 rounded-xl p-1">
        {TABS.map((t) => {
          const active = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={
                active
                  ? "vx-pill-active inline-flex min-h-[40px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                  : "inline-flex min-h-[40px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white/55 transition-colors hover:text-white"
              }
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "dashboard" && (
        <div className="space-y-6">
          {insight && (
            <div className="vx-insight flex items-center gap-2.5 px-4 py-3">
              <Sparkles className="vx-accent-text h-4 w-4 shrink-0" />
              <p className="text-sm text-white/85">
                <span className="font-semibold text-white">Smart insight — </span>
                {insight}
              </p>
            </div>
          )}
          <div className="vx-stagger grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {data.kpis.map((kpi) => (
              <KpiCard key={kpi.label} kpi={kpi} />
            ))}
          </div>
          <Charts data={data} />
          <p className="text-center text-[11px] text-white/30">
            Sample project — headline KPIs reflect the full period; charts drill
            down live. Figures use fictional data.
          </p>
        </div>
      )}

      {tab === "excel" && (
        <ExcelPanel company={data.company} embedUrl={embedUrl} downloadPath={downloadPath} />
      )}

      {tab === "download" && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="vx-card p-6">
            <FileSpreadsheet className="vx-accent-text mb-3 h-8 w-8" />
            <h3 className="font-display text-lg font-bold text-white">
              {data.slug}-dashboard.xlsx
            </h3>
            <p className="mt-1 text-sm text-white/50">
              The real, fully-built Excel workbook behind this dashboard.
            </p>
            <ul className="mt-4 space-y-2">
              {INSIDE.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="vx-accent-text mt-0.5 h-4 w-4 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
            <a
              href={downloadPath}
              download
              className="vx-btn-accent mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" />
              Download .xlsx
            </a>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-dashed border-white/12 bg-white/[0.02] p-6">
            <p className="text-sm leading-relaxed text-white/60">
              Every figure, chart and KPI you explored in the dashboard is native
              inside this file — no images, no screenshots. Open it in{" "}
              <span className="text-white/85">Microsoft Excel</span>,{" "}
              <span className="text-white/85">Google Sheets</span> or{" "}
              <span className="text-white/85">Power BI</span> and it just works.
            </p>
            <p className="mt-4 text-[11px] text-white/30">
              Sample project — figures are representative and use fictional data.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
