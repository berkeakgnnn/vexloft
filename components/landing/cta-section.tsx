"use client";

import { motion, useReducedMotion } from "framer-motion";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CtaSection(): React.ReactElement {
  const reduceMotion = useReducedMotion();

  // `initial` stays identical on server and client (hydration safety);
  // reduced motion collapses the transition to an instant reveal instead.
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.7, delay, ease: smoothEase },
  });

  return (
    <section
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ backgroundColor: "#060a14" }}
      id="iletisim"
    >
      {/* Ambient glow behind the CTA */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          {...reveal(0)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8"
          style={{
            fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Projenizi
          <br />
          hayata geçirelim.
        </motion.h2>

        <motion.p
          {...reveal(0.1)}
          className="text-lg sm:text-xl text-gray-400 mb-12 max-w-xl mx-auto"
        >
          Fikrinizi bize anlatın, birlikte çözüm üretelim.
        </motion.p>

        <motion.div {...reveal(0.2)}>
          <a
            href="mailto:vexloftstudio@gmail.com"
            className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold gradient-text hover:opacity-80 transition-opacity duration-300"
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            }}
          >
            vexloftstudio@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
