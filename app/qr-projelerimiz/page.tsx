import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getActiveBusinesses } from "@/lib/api";
import type { PublicMenu } from "@/lib/api";

// Map template names to Turkish display labels
function templateLabel(template: string): string {
  const map: Record<string, string> = {
    CAFE: "Kafe",
    RESTAURANT: "Restoran",
    PUB: "Pub",
    BAR: "Bar",
    BISTRO: "Bistro",
  };
  return map[template.toUpperCase()] ?? template;
}

function BusinessCard({ business }: { business: PublicMenu }): React.ReactElement {
  const { theme, info } = business;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col">
      {/* Accent strip — tiny gradient using the business theme colors */}
      <div
        className="h-1 w-full flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.accentColor})`,
        }}
      />

      {/* Card body */}
      <div
        className="p-6 flex flex-col gap-4 flex-1"
        style={{ backgroundColor: "#0d1224" }}
      >
        {/* Template badge */}
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center text-[10px] font-semibold tracking-[4px] uppercase px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: `${theme.accentColor}18`,
              color: theme.accentColor,
              border: `1px solid ${theme.accentColor}30`,
            }}
          >
            {templateLabel(business.template)}
          </span>
        </div>

        {/* Business name */}
        <h2
          className="text-2xl font-extrabold text-white leading-tight group-hover:text-white/90 transition-colors"
          style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
        >
          {business.name}
        </h2>

        {/* Location */}
        {info.locationTr && (
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="flex-shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {info.locationTr}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <Link
          href={`/qr-projelerimiz/${business.slug}`}
          className="inline-flex items-center justify-between w-full text-sm font-semibold text-white/80 hover:text-white transition-colors group/link"
        >
          <span>Menuyu Goruntule</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="translate-x-0 group-hover/link:translate-x-1 transition-transform duration-200"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// Empty state when no businesses are returned
function EmptyState(): React.ReactElement {
  return (
    <div className="text-center py-24">
      <p className="text-gray-500 text-lg">Henuz aktif proje bulunmuyor.</p>
    </div>
  );
}

export default async function QrProjelerimizPage(): Promise<React.ReactElement> {
  const businesses = await getActiveBusinesses();

  return (
    <div className="noise-bg">
      <Navbar />

      <main
        className="min-h-screen pt-32 pb-24"
        style={{ backgroundColor: "#060a14" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16">
            <span className="inline-block text-xs font-semibold tracking-[6px] uppercase gradient-text mb-4">
              CANLI PROJELER
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
            >
              QR Projelerimiz
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-xl">
              Vexloft tarafindan hayata gecirilen dijital menu projeleri. Gercek
              verilerle calisan canli ornekler.
            </p>
          </div>

          <div className="gradient-line mb-16" />

          {/* Business cards grid */}
          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}

          {/* Bottom CTA */}
          <div className="mt-24 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Kendi isletmeniz icin QR menu sistemi ister misiniz?
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-0.5"
            >
              Bize Ulasin
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
