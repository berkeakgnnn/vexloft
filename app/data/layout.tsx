import type { Metadata } from "next";
import Link from "next/link";
import "./data-theme.css";

export const metadata: Metadata = {
  title: "Vexloft Data — Interactive Dashboard Portfolio by Atakan Harman",
  description:
    "Interactive Excel & BI dashboard samples by Atakan Harman (Vexloft) — sales, finance, marketing, HR, inventory, procurement and e-commerce analytics.",
};

export default function DataLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="vx-root relative flex min-h-screen flex-col">
      <div className="vx-aurora" aria-hidden />

      <header className="vx-glass sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/data" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c6cff] to-[#22d3ee] font-display text-sm font-extrabold text-white">
              V
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-bold text-white">
                Vexloft{" "}
                <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">
                  Data
                </span>
              </span>
              <span className="text-[10px] text-white/40">by Atakan Harman</span>
            </span>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/data" className="text-white/60 transition-colors hover:text-white">
              Dashboards
            </Link>
            <a
              href="https://vexloft.com"
              className="text-white/60 transition-colors hover:text-white"
            >
              vexloft.com
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/35 sm:flex-row sm:px-6 lg:px-8">
          <p>Vexloft Data — dashboard &amp; analytics samples by Atakan Harman.</p>
          <p>All dashboards use fictional sample data.</p>
        </div>
      </footer>
    </div>
  );
}
