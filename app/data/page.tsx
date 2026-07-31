import Link from "next/link";
import { ArrowRight, TrendingUp, Package, ShoppingCart, LayoutDashboard } from "lucide-react";
import { sales, inventory, procurement, executive } from "@/lib/demo-data";
import type { DashboardData } from "@/lib/demo-data/types";

const CARDS: Array<{ data: DashboardData; icon: typeof TrendingUp; blurb: string }> = [
  { data: sales, icon: TrendingUp, blurb: "Revenue, profit, regional & product performance with target tracking." },
  { data: inventory, icon: Package, blurb: "Stock levels, reorder alerts, inventory value and turnover analysis." },
  { data: procurement, icon: ShoppingCart, blurb: "Spend analysis, purchase orders and supplier performance scorecards." },
  { data: executive, icon: LayoutDashboard, blurb: "Cross-functional KPI snapshot — finance, sales and operations." },
];

export default function DataHub(): React.ReactElement {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-indigo-950/40 via-[#0a0f1e] to-[#060a14] px-6 py-12 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
            Interactive dashboard portfolio
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Excel &amp; BI dashboards that turn raw data into{" "}
            <span className="gradient-text">clear decisions</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Explore live samples built by Atakan Harman at Vexloft. Each one is
            a real, interactive dashboard — play with the filters, then open the
            exact Excel workbook behind it.
          </p>
        </div>
      </section>

      <section>
        <div className="grid gap-5 sm:grid-cols-2">
          {CARDS.map(({ data, icon: Icon, blurb }) => (
            <Link
              key={data.slug}
              href={`/data/${data.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all hover:border-indigo-400/40 hover:bg-white/[0.05]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600/90 to-violet-600/90">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <ArrowRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white" />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-300/80">
                {data.company}
              </p>
              <h2 className="mt-1 font-display text-lg font-bold text-white">
                {data.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                {blurb}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {data.kpis.slice(0, 3).map((k) => (
                  <span
                    key={k.label}
                    className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-white/70"
                  >
                    <span className="font-semibold text-white">{k.value}</span>{" "}
                    <span className="text-white/40">{k.label}</span>
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
