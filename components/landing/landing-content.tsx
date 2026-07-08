"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HeroSection } from "./hero-section";
import { FeaturedWorkSection } from "./featured-work-section";
import { ServicesSection } from "./services-section";
import { StatsSection } from "./stats-section";
import { CtaSection } from "./cta-section";

export function LandingContent() {
  const pathname = usePathname();

  useEffect(() => {
    // Hash navigasyonunu (or. /#projeler) ezme — router anchor'a kaydırır
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <main>
      <HeroSection />
      <FeaturedWorkSection />
      <ServicesSection />
      <StatsSection />
      <CtaSection />
    </main>
  );
}
