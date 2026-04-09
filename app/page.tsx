import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LandingContent } from "@/components/landing/landing-content";
import { LoadingScreen } from "@/components/shared/loading-screen";

export default function Home(): React.ReactElement {
  return (
    <div className="noise-bg">
      <LoadingScreen />
      <Navbar />
      <LandingContent />
      <Footer />
    </div>
  );
}
