import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MockHero } from "@/components/mock/mock-hero";
import { ProjectScroll } from "@/components/mock/project-scroll";
import { ServicesMock } from "@/components/mock/services-mock";
import { StatsMock } from "@/components/mock/stats-mock";
import { CtaMock } from "@/components/mock/cta-mock";
import { ScrollProgress } from "@/components/mock/scroll-progress";

// Redesign preview only — kept out of search results and the sitemap.
export const metadata: Metadata = {
  title: "Yeni tasarım önizleme",
  robots: { index: false, follow: false },
};

// Section hand-offs, top to bottom:
// hero → work: devices sink, rounded stage rises and opens to full bleed
// work → services: stage shrinks and dims, giant word bands slide in sideways
// services → stats: skewed gradient slab straightens into place
// stats → CTA: circle reveal floods the screen with the brand gradient
// CTA → footer: rounded CTA lifts away to uncover the pinned footer
export default function MockPage(): React.ReactElement {
  return (
    <div className="noise-bg">
      <ScrollProgress />
      <Navbar />
      <main style={{ zIndex: 3 }}>
        <MockHero />
        <ProjectScroll />
        <ServicesMock />
        <StatsMock />
        <CtaMock />
      </main>
      <div style={{ position: "sticky", bottom: 0, zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
