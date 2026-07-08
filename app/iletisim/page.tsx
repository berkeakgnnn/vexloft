import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "İletişim — Vexloft",
  description: "Projenizi hayata geçirmek için bizimle iletişime geçin.",
};

export default function IletisimPage(): React.ReactElement {
  return (
    <div className="noise-bg">
      <Navbar />
      <main style={{ backgroundColor: "#060a14" }}>
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold tracking-[8px] uppercase gradient-text">
              İLETİŞİM
            </span>
          </div>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6"
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Projenizi
            <br />
            <span className="gradient-text">Hayata Geçirelim</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl">
            Fikrinizi bize anlatın, birlikte çözüm üretelim.
          </p>
        </section>

        <div className="gradient-line mx-4 sm:mx-6 max-w-6xl lg:mx-auto" />

        {/* Content */}
        <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Left — contact info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="text-xs font-semibold tracking-[6px] uppercase text-gray-500 mb-3">
                  E-POSTA
                </p>
                <a
                  href="mailto:vexloftstudio@gmail.com"
                  className="text-xl font-semibold gradient-text hover:opacity-80 transition-opacity"
                  style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
                >
                  vexloftstudio@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[6px] uppercase text-gray-500 mb-3">
                  WHATSAPP
                </p>
                <a
                  href="https://wa.me/905001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-300 hover:text-white transition-colors border-b border-gray-700 hover:border-gray-400 pb-0.5"
                >
                  Hızlı mesaj gönderin →
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[6px] uppercase text-gray-500 mb-4">
                  HİZMETLERİMİZ
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  {["Mobil Uygulama", "Web Platformu", "CRM", "E-Ticaret", "Dijital Altyapı"].map(
                    (s) => (
                      <li key={s} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 inline-block" />
                        {s}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
