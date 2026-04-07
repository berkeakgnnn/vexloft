import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LandingContent } from "@/components/landing/landing-content";

export default function Home(): React.ReactElement {
  return (
    <div className="noise-bg">
      <Navbar />
      <LandingContent />
      <Footer />
    </div>
  );
}
