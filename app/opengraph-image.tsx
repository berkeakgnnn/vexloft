import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared social preview for every page that doesn't define its own.
export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background:
          "radial-gradient(circle at 85% 15%, rgba(124,58,237,0.55), transparent 55%), radial-gradient(circle at 10% 95%, rgba(6,182,212,0.35), transparent 50%), #0a0f1e",
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="76" height="65" viewBox="-1 -1 67 57" fill="none">
          <path
            d="M0.8 1.25 H13.3 L32.2 30.8 V45.8 L29 49.6 Z"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M48.3 1.25 H63.75 L35.4 49.6 L32.2 45.8 V30.8 Z"
            fill="#7c3aed"
            stroke="#7c3aed"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M29 49.6 L32.2 45.8 L35.4 49.6 L32.2 53.75 Z"
            fill="#06b6d4"
          />
        </svg>
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
          {SITE_NAME}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Mobil uygulama, web ve QR menü.
        </div>
        <div style={{ fontSize: 32, color: "#a5b4fc" }}>
          Antalya merkezli yazılım stüdyosu · vexloft.com
        </div>
      </div>
    </div>,
    size,
  );
}
