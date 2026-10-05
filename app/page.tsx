import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HomeHero } from "@/components/home/home-hero";
import { ProjectScroll } from "@/components/home/project-scroll";
import { HomeServices } from "@/components/home/home-services";
import { HomeStats } from "@/components/home/home-stats";
import { HomeCta } from "@/components/home/home-cta";
import { ScrollProgress } from "@/components/home/scroll-progress";

// Section hand-offs, top to bottom:
// hero → work: devices sink, rounded stage rises and opens to full bleed
// work → services: stage shrinks and dims, giant word bands slide in sideways
// services → stats: skewed gradient slab straightens into place
// stats → CTA: circle reveal floods the screen with the brand gradient
// CTA → footer: rounded CTA lifts away to uncover the pinned footer
export default function Home(): React.ReactElement {
  return (
    <div className="noise-bg">
      <ScrollProgress />
      <Navbar />
      <main style={{ zIndex: 3 }}>
        <HomeHero />
        <ProjectScroll />
        <HomeServices />
        <HomeStats />
        <HomeCta />
      </main>
      <div style={{ position: "sticky", bottom: 0, zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
