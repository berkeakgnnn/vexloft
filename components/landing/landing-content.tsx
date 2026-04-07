"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HeroSection } from "./hero-section";
import { ServicesSection } from "./services-section";
import { ShowcaseSection } from "./showcase-section";
import { StatsSection } from "./stats-section";
import { CtaSection } from "./cta-section";

export function LandingContent() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ShowcaseSection />
      <StatsSection />
      <CtaSection />
    </main>
  );
}
