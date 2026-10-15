"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_ID, trackEvent } from "@/lib/analytics";
import { useConsent } from "./use-consent";

// Loads GA4 only after the visitor has accepted analytics cookies. Without a
// NEXT_PUBLIC_GA_ID (local dev, previews) nothing is loaded at all.
export function GoogleAnalytics(): React.ReactElement | null {
  const consent = useConsent();

  // Contact clicks as lead signals. Outbound project links are already
  // covered by GA4 enhanced measurement.
  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (e: MouseEvent): void => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) trackEvent("contact_email_click");
      else if (href.startsWith("tel:")) trackEvent("contact_phone_click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  if (!GA_ID || consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
