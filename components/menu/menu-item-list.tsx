import type { MenuItem } from "@/lib/api";

interface MenuItemListProps {
  item: MenuItem;
}

// CHALKBOARD layout — text-only row with dotted price line
export function MenuItemList({ item }: MenuItemListProps): React.ReactElement {
  const formattedPrice = `${Number(item.price)} ₺`;

  const badgeEntries = item.badges ? Object.entries(item.badges) : [];

  return (
    <div
      className="py-4"
      style={{ borderBottom: `1px solid var(--menu-border)` }}
    >
      {/* Name — dotted line — Price */}
      <div className="flex items-baseline gap-2">
        <span
          className="text-base font-semibold shrink-0"
          style={{
            fontFamily: "var(--menu-font-heading), system-ui, sans-serif",
            color: "var(--menu-text)",
          }}
        >
          {item.nameTr}
        </span>

        {/* Dotted line fills remaining space */}
        <span
          className="flex-1 border-b border-dashed"
          style={{ borderColor: "var(--menu-border)", marginBottom: "3px" }}
        />

        <span
          className="text-sm font-bold shrink-0"
          style={{ color: "var(--menu-accent)" }}
        >
          {formattedPrice}
        </span>
      </div>

      {/* Description */}
      {item.descriptionTr && (
        <p
          className="mt-1 text-sm leading-relaxed"
          style={{
            fontFamily: "var(--menu-font-body), system-ui, sans-serif",
            color: "var(--menu-muted)",
          }}
        >
          {item.descriptionTr}
        </p>
      )}

      {/* Badges */}
      {badgeEntries.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {badgeEntries.map(([key, value]) => (
            <span
              key={key}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: "var(--menu-accent)20",
                color: "var(--menu-accent)",
                border: `1px solid var(--menu-accent)40`,
              }}
            >
              {value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
