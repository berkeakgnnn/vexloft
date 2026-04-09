import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getActiveBusinesses } from "@/lib/api";
import type { PublicMenu } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Resolve hero images — prepend API_URL for /uploads/ paths
function resolveImage(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

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

// Map template names to a type description shown under the business name
function templateDescription(template: string): string {
  const map: Record<string, string> = {
    CAFE: "Kafe & Kahve",
    RESTAURANT: "Restoran",
    PUB: "Pub & Bar",
    BAR: "Bar",
    BISTRO: "Bistro",
  };
  return map[template.toUpperCase()] ?? template;
}

interface BusinessCardProps {
  business: PublicMenu;
  index: number;
}

function BusinessCard({ business, index }: BusinessCardProps): React.ReactElement {
  const { theme } = business;
  const heroImage = resolveImage(theme.heroImage);

  // Zero-padded index label: "01", "02", ...
  const numberLabel = String(index + 1).padStart(2, "0");

  // Fallback gradient when no image is available
  const fallbackGradient = `linear-gradient(135deg, ${theme.primaryColor}33, ${theme.accentColor}22, #060a14)`;

  return (
    <Link href={`/qr-projelerimiz/${business.slug}`} className="block group">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        {heroImage ? (
          <>
            <Image
              src={heroImage}
              alt={business.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Darkening overlay on hover */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          </>
        ) : (
          // Fallback when no hero image — use theme gradient
          <div
            className="absolute inset-0"
            style={{ background: fallbackGradient }}
          />
        )}

        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Number label — top-left */}
        <div className="absolute top-4 left-4 text-[10px] font-semibold tracking-[3px] text-white/40">
          {numberLabel}
        </div>

        {/* Template badge — top-right */}
        <div
          className="absolute top-4 right-4 inline-flex items-center text-[10px] font-semibold tracking-[3px] uppercase px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: `${theme.accentColor}25`,
            color: theme.accentColor,
            border: `1px solid ${theme.accentColor}40`,
            // Slight blur background for readability over images
            backdropFilter: "blur(8px)",
          }}
        >
          {templateLabel(business.template)}
        </div>

        {/* Bottom content area */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            {/* Business name */}
            <h2
              className="text-xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
            >
              {business.name}
            </h2>
            {/* Type description */}
            <p className="text-xs text-white/60">
              {templateDescription(business.template)}
            </p>
          </div>

          {/* INCELE arrow — visible on hover */}
          <div className="text-[10px] font-semibold tracking-[2px] text-white/0 group-hover:text-white/90 group-hover:tracking-[3px] transition-all duration-300 flex-shrink-0 ml-4">
            INCELE &rarr;
          </div>
        </div>
      </div>
    </Link>
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
              {businesses.map((business, index) => (
                <BusinessCard key={business.id} business={business} index={index} />
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
