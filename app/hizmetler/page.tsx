import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function HizmetlerPage(): React.ReactElement {
  return (
    <div className="noise-bg">
      <Navbar />
      <main
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ backgroundColor: "#060a14" }}
      >
        <div className="text-center px-4">
          <span className="inline-block text-xs font-semibold tracking-[6px] uppercase gradient-text mb-4">
            YAKIN ZAMANDA
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4"
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            }}
          >
            Hizmetler
          </h1>
          <p className="text-lg text-gray-400">
            Bu sayfa yakinda yayinda olacak.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
