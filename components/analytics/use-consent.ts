"use client";

import { useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  readConsent,
  type ConsentState,
} from "@/lib/analytics";

// "unknown" during SSR/hydration so the banner never flashes for visitors who
// already chose; null on the client means "has not chosen yet".
export type ConsentSnapshot = ConsentState | null | "unknown";

function subscribe(onChange: () => void): () => void {
  const onStorage = (e: StorageEvent): void => {
    if (e.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useConsent(): ConsentSnapshot {
  return useSyncExternalStore<ConsentSnapshot>(
    subscribe,
    readConsent,
    () => "unknown",
  );
}
