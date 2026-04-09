"use client";

import { useState, useEffect } from "react";

export function LoadingScreen(): React.ReactElement | null {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1200);
    const t2 = setTimeout(() => setPhase("done"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "#060a14",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(phase === "reveal"
          ? { animation: "circularReveal 0.8s ease-in-out forwards" }
          : {}),
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          transition: "opacity 0.3s ease-out",
          opacity: phase === "reveal" ? 0 : 1,
        }}
      >
        <div style={{ animation: "loadingLogoIn 0.6s ease-out forwards" }}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="loading-v-grad"
                x1="128"
                y1="80"
                x2="384"
                y2="400"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <path d="M128 100 L200 100 L256 340 L220 340 Z" fill="url(#loading-v-grad)" />
            <path d="M384 100 L312 100 L256 340 L292 340 Z" fill="url(#loading-v-grad)" />
            <path d="M128 100 L88 140 L190 260 L200 100 Z" fill="url(#loading-v-grad)" opacity="0.7" />
            <path d="M384 100 L424 140 L322 260 L312 100 Z" fill="url(#loading-v-grad)" opacity="0.7" />
            <path d="M230 180 L256 240 L282 180 L256 140 Z" fill="#060a14" opacity="0.4" />
          </svg>
        </div>
        <div
          style={{
            animation: "loadingTextIn 0.5s ease-out 0.3s forwards",
            opacity: 0,
            fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "8px",
            color: "rgba(255, 255, 255, 0.6)",
            textTransform: "uppercase",
          }}
        >
          VEXLOFT
        </div>
      </div>
    </div>
  );
}
