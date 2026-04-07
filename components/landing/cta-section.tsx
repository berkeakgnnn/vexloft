"use client";

import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

export function CtaSection(): React.ReactElement {
  return (
    <section
      className="py-32 lg:py-48"
      style={{ backgroundColor: "#060a14" }}
      id="iletisim"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8"
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Projenizi
            <br />
            Hayata Gecirelim
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-xl mx-auto">
            Fikrinizi bize anlatin, birlikte cozum uretelim.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300} className="space-y-6">
          <a
            href="mailto:iletisim@vexloft.com"
            className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold gradient-text hover:opacity-80 transition-opacity duration-300"
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            }}
          >
            iletisim@vexloft.com
          </a>

          <div>
            <a
              href="https://wa.me/905001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-lg text-gray-500 hover:text-gray-300 transition-colors duration-300 border-b border-gray-700 hover:border-gray-400 pb-0.5"
            >
              WhatsApp ile yazin
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
