// Google Analytics (GA4) helpers. The tag only loads after the visitor accepts
// analytics cookies (KVKK), so every call here is a no-op until then.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const CONSENT_STORAGE_KEY = "vexloft-analytics-consent";
export const CONSENT_EVENT = "vexloft-consent-change";

export type ConsentState = "granted" | "denied";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "consent",
      ...args: unknown[]
    ) => void;
    dataLayer?: unknown[];
  }
}

export function readConsent(): ConsentState | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
  } catch {
    // Storage blocked (private mode): the choice still applies for this visit.
  }
  window.dispatchEvent(
    new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }),
  );
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  window.gtag?.("event", name, params);
}
