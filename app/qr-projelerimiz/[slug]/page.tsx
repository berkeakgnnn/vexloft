import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicMenu } from "@/lib/api";
import { MenuHeader } from "@/components/menu/menu-header";
import { CategoryNav } from "@/components/menu/category-nav";
import { CategorySection } from "@/components/menu/category-section";
import { MenuFooter } from "@/components/menu/menu-footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getPublicMenu(slug);
  if (!menu) return { title: "Menu Bulunamadi" };
  return {
    title: `${menu.name} | Vexloft QR Menu`,
    description: menu.info.tagline ?? `${menu.name} dijital menusu`,
  };
}

export default async function MenuPage({ params }: PageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const menu = await getPublicMenu(slug);

  if (!menu) notFound();

  // Map global theme layoutType to category layout
  function globalLayoutToCategory(layoutType: string): string {
    switch (layoutType) {
      case "FULLCARD": return "DEFAULT";
      case "LIST": return "CHALKBOARD";
      case "GRID": return "GRID";
      case "HYBRID": return "DEFAULT"; // hybrid keeps per-category layout
      default: return "DEFAULT";
    }
  }

  const { theme, info, categories, name } = menu;
  const sortedCategories = [...categories].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  // Build Google Fonts URL for the heading font
  const fontParam = theme.fontHeading.replace(/ /g, "+");
  const bodyFontParam = theme.fontBody.replace(/ /g, "+");
  const fontsUrl = `https://fonts.googleapis.com/css2?family=${fontParam}:wght@400;600;700;800&family=${bodyFontParam}:wght@400;500&display=swap`;

  return (
    <>
      {/* Inject Google Fonts via @import + CSS custom properties */}
      <style>{`
        @import url('${fontsUrl}');
        .menu-page {
          --menu-bg: ${theme.bgColor};
          --menu-text: ${theme.textColor};
          --menu-accent: ${theme.accentColor};
          --menu-card-bg: ${theme.cardBgColor};
          --menu-muted: ${theme.mutedTextColor};
          --menu-border: ${theme.borderColor};
          --menu-primary: ${theme.primaryColor};
          --menu-font-heading: '${theme.fontHeading}';
          --menu-font-body: '${theme.fontBody}';
        }
      `}</style>

      {/* Desktop'ta koyu arka plan, ortada mobil menü */}
      <div className="min-h-screen bg-neutral-900 flex justify-center">
      <div
        className="menu-page min-h-screen w-full max-w-md shadow-2xl"
        style={{
          backgroundColor: theme.bgColor,
          color: theme.textColor,
          fontFamily: `'${theme.fontBody}', system-ui, sans-serif`,
        }}
      >
        {/* 1. Hero header */}
        <MenuHeader name={name} theme={theme} info={info} />

        {/* 2. Language toggle — visual only, TR active */}
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{ backgroundColor: theme.cardBgColor, borderBottom: `1px solid ${theme.borderColor}` }}
        >
          <button
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: theme.accentColor, color: "#fff" }}
          >
            TR
          </button>
          <button
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ color: theme.mutedTextColor }}
          >
            EN
          </button>
        </div>

        {/* 3. Category navigation — sticky, horizontal */}
        {sortedCategories.length > 0 && (
          <CategoryNav categories={sortedCategories} theme={theme} />
        )}

        {/* 4. Category sections — apply global layoutType if category is DEFAULT */}
        <main className="pb-6">
          {sortedCategories.map((cat) => {
            const effectiveLayout = cat.layout === "DEFAULT" ? globalLayoutToCategory(theme.layoutType) : cat.layout;
            return (
              <CategorySection key={cat.id} category={{ ...cat, layout: effectiveLayout }} />
            );
          })}
        </main>

        {/* 5. Footer */}
        <MenuFooter name={name} info={info} />
      </div>
      </div>
    </>
  );
}
