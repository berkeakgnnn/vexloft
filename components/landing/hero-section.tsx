"use client";

import { motion, type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

export function HeroSection(): React.ReactElement {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#060a14" }}
    >
      {/* Animated gradient orb */}
      <div
        className="blob-float-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
      <div
        className="blob-float-medium absolute top-[20%] right-[10%] rounded-full pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      {/* Content — animate immediately on mount, not viewport-dependent */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow label */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block text-xs font-semibold tracking-[8px] uppercase gradient-text">
            VEXLOFT
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="font-extrabold leading-[0.95] text-white mb-8"
          style={{
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Yazılım ile
          <br />
          Geleceği
          <br />
          <span className="gradient-text">Şekillendiriyoruz</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Mobil Uygulama, Web Platformu, CRM, E-Ticaret ve Dijital Altyapı
          çözümleri.
        </motion.p>

        {/* CTA — simple underlined text link */}
        <motion.div variants={itemVariants}>
          <a
            href="#projelerimiz"
            className="inline-block text-lg text-white/80 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white/70 pb-1"
          >
            Projelerimizi Keşfedin
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — thin animated line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-white/20 overflow-hidden">
          <div className="w-full h-full bg-white/60 scroll-indicator-line" />
        </div>
      </motion.div>
    </section>
  );
}
