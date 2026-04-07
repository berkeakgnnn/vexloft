import type { MenuCategory } from "@/lib/api";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { MenuItemList } from "@/components/menu/menu-item-list";
import { MenuItemGrid } from "@/components/menu/menu-item-grid";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

function resolveImage(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

interface CategorySectionProps {
  category: MenuCategory;
}

export function CategorySection({ category }: CategorySectionProps): React.ReactElement {
  const sortedItems = [...category.items].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <section id={`category-${category.id}`} className="pt-8 pb-2">
      {/* Category banner with dark overlay + centered name */}
      {category.banner ? (
        <div
          className="relative w-full flex items-center justify-center mb-5"
          style={{ height: "160px" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${resolveImage(category.banner)})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <h2
            className="relative z-10 text-2xl font-bold text-white tracking-wide"
            style={{ fontFamily: "var(--menu-font-heading), system-ui, sans-serif" }}
          >
            {category.nameTr}
          </h2>
        </div>
      ) : (
        <div className="px-4 mb-4">
          <h2
            className="text-xs font-semibold tracking-widest uppercase"
            style={{
              fontFamily: "var(--menu-font-body), system-ui, sans-serif",
              color: "var(--menu-accent)",
            }}
          >
            {category.nameTr}
          </h2>
          <div
            className="mt-1 h-px"
            style={{ backgroundColor: "var(--menu-border)" }}
          />
        </div>
      )}

      {/* Items */}
      <div className="px-4">
        {category.layout === "CHALKBOARD" ? (
          // Text-only list layout
          <div>
            {sortedItems.map((item, i) => (
              <MenuItemList key={i} item={item} />
            ))}
          </div>
        ) : category.layout === "GRID" ? (
          // 2-column grid layout
          <div className="grid grid-cols-2 gap-3">
            {sortedItems.map((item, i) => (
              <MenuItemGrid key={i} item={item} />
            ))}
          </div>
        ) : (
          // DEFAULT — full-width card layout
          <div className="flex flex-col gap-3">
            {sortedItems.map((item, i) => (
              <MenuItemCard key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
