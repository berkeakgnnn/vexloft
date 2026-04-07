import Image from "next/image";
import type { MenuItem } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

function resolveImage(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

interface MenuItemGridProps {
  item: MenuItem;
}

// GRID layout — compact 2-column card
export function MenuItemGrid({ item }: MenuItemGridProps): React.ReactElement {
  const formattedPrice =
    `${Number(item.price)} ₺`;

  return (
    <div
      className="rounded-lg overflow-hidden flex flex-col"
      style={{
        backgroundColor: "var(--menu-card-bg)",
        border: `1px solid var(--menu-border)`,
      }}
    >
      {resolveImage(item.image) && (
        <div className="relative w-full" style={{ height: "110px" }}>
          <Image
            src={resolveImage(item.image)!}
            alt={item.nameTr}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 300px"
          />
        </div>
      )}

      <div className="p-3 flex flex-col gap-0.5 flex-1">
        <span
          className="text-sm font-bold leading-snug"
          style={{
            fontFamily: "var(--menu-font-heading), system-ui, sans-serif",
            color: "var(--menu-text)",
          }}
        >
          {item.nameTr}
        </span>

        <span
          className="text-sm font-semibold"
          style={{ color: "var(--menu-accent)" }}
        >
          {formattedPrice}
        </span>

        {item.descriptionTr && (
          <p
            className="text-xs leading-relaxed mt-0.5"
            style={{
              fontFamily: "var(--menu-font-body), system-ui, sans-serif",
              color: "var(--menu-muted)",
              // Clamp to 2 lines on small grid cards
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.descriptionTr}
          </p>
        )}
      </div>
    </div>
  );
}
