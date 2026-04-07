import Image from "next/image";
import type { MenuItem } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

function resolveImage(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

interface MenuItemCardProps {
  item: MenuItem;
}

// DEFAULT layout — full-width card with optional top image
export function MenuItemCard({ item }: MenuItemCardProps): React.ReactElement {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "var(--menu-card-bg)",
        border: `1px solid var(--menu-border)`,
      }}
    >
      {resolveImage(item.image) && (
        <div className="relative w-full" style={{ height: "180px" }}>
          <Image
            src={resolveImage(item.image)!}
            alt={item.nameTr}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-base font-bold leading-snug"
            style={{
              fontFamily: "var(--menu-font-heading), system-ui, sans-serif",
              color: "var(--menu-text)",
            }}
          >
            {item.nameTr}
          </h3>
          <span
            className="flex-shrink-0 text-sm font-semibold"
            style={{ color: "var(--menu-accent)" }}
          >
            {`${Number(item.price)} ₺`}
          </span>
        </div>

        {item.descriptionTr && (
          <p
            className="mt-1.5 text-sm leading-relaxed"
            style={{
              fontFamily: "var(--menu-font-body), system-ui, sans-serif",
              color: "var(--menu-muted)",
            }}
          >
            {item.descriptionTr}
          </p>
        )}
      </div>
    </div>
  );
}
