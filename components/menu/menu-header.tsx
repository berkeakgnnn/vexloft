import type { MenuTheme, MenuInfo } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

function resolveImage(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

interface MenuHeaderProps {
  name: string;
  theme: MenuTheme;
  info: MenuInfo;
}

export function MenuHeader({ name, theme, info }: MenuHeaderProps): React.ReactElement {
  const heroUrl = resolveImage(theme.heroImage);

  return (
    <header
      className="relative w-full flex items-end"
      style={{
        height: "220px",
        backgroundColor: theme.primaryColor,
      }}
    >
      {/* Hero image with dark overlay when available */}
      {heroUrl && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroUrl})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      {/* Gradient overlay to darken bottom for text legibility */}
      {!theme.heroImage && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor}20)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-6">
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-white leading-tight"
          style={{ fontFamily: `'${theme.fontHeading}', system-ui, sans-serif` }}
        >
          {name}
        </h1>

        {info.tagline && (
          <p
            className="mt-1 text-sm text-white/75"
            style={{ fontFamily: `'${theme.fontBody}', system-ui, sans-serif` }}
          >
            {info.tagline}
          </p>
        )}

        {info.established && (
          <p
            className="mt-0.5 text-xs text-white/50"
            style={{ fontFamily: `'${theme.fontBody}', system-ui, sans-serif` }}
          >
            Est. {info.established}
          </p>
        )}
      </div>
    </header>
  );
}
