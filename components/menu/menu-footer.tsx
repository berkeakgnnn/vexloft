import Link from "next/link";
import type { MenuInfo } from "@/lib/api";

interface MenuFooterProps {
  name: string;
  info: MenuInfo;
}

export function MenuFooter({ name, info }: MenuFooterProps): React.ReactElement {
  return (
    <footer
      className="mt-10 pt-8 pb-10 px-6"
      style={{ borderTop: `1px solid var(--menu-border)` }}
    >
      <div className="max-w-lg mx-auto text-center flex flex-col gap-2">
        <p
          className="text-base font-bold"
          style={{
            fontFamily: "var(--menu-font-heading), system-ui, sans-serif",
            color: "var(--menu-text)",
          }}
        >
          {name}
        </p>

        {info.locationTr && (
          <p
            className="text-sm"
            style={{ color: "var(--menu-muted)" }}
          >
            {info.locationTr}
          </p>
        )}

        {info.hoursTr && (
          <p
            className="text-sm"
            style={{ color: "var(--menu-muted)" }}
          >
            {info.hoursTr}
          </p>
        )}

        <div className="mt-4 pt-4" style={{ borderTop: `1px solid var(--menu-border)` }}>
          <Link
            href="https://vexloft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--menu-muted)" }}
          >
            Powered by{" "}
            <span style={{ color: "var(--menu-accent)" }} className="font-semibold">
              Vexloft Studio
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
