import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vexloft Data — Dashboard Portfolio by Atakan Harman",
  description:
    "Interactive Excel & BI dashboard samples by Atakan Harman (Vexloft) — sales analytics, inventory management, procurement and executive KPI reporting.",
};

export default function DataLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col bg-[#060a14] text-white">
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#060a14]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/data" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 font-display text-sm font-extrabold text-white">
              V
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-bold">
                Vexloft <span className="gradient-text">Data</span>
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

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/35 sm:flex-row sm:px-6 lg:px-8">
          <p>Vexloft Data — dashboard &amp; analytics samples by Atakan Harman.</p>
          <p>All dashboards use fictional sample data.</p>
        </div>
      </footer>
    </div>
  );
}
