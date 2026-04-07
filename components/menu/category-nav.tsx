"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuCategory, MenuTheme } from "@/lib/api";

interface CategoryNavProps {
  categories: MenuCategory[];
  theme: MenuTheme;
}

export function CategoryNav({ categories, theme }: CategoryNavProps): React.ReactElement {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "");
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll spy: observe each category section and mark active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    categories.forEach(({ id }) => {
      const el = document.getElementById(`category-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  // Scroll the active nav button into view when it changes
  useEffect(() => {
    if (!navRef.current) return;
    const active = navRef.current.querySelector<HTMLButtonElement>(
      `[data-id="${activeId}"]`,
    );
    if (active) {
      active.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
    }
  }, [activeId]);

  function scrollToCategory(id: string): void {
    const el = document.getElementById(`category-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveId(id);
  }

  return (
    <nav
      className="sticky top-0 z-30 overflow-x-auto scrollbar-hide"
      style={{ backgroundColor: "var(--menu-bg)" }}
      ref={navRef}
    >
      {/* Bottom border */}
      <div style={{ borderBottom: `1px solid var(--menu-border)` }}>
        <div className="flex gap-1 px-4 py-0">
          {categories.map((cat) => {
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                data-id={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className="flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 whitespace-nowrap"
                style={{
                  fontFamily: "var(--menu-font-body), system-ui, sans-serif",
                  color: isActive ? "var(--menu-accent)" : "var(--menu-muted)",
                  borderBottomColor: isActive ? "var(--menu-accent)" : "transparent",
                  backgroundColor: "transparent",
                }}
              >
                {cat.nameTr}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
