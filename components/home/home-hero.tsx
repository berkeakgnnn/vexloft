"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { DevicePair } from "./device-pair";
import { showcaseProjects } from "./projects";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const CYCLE_MS = 4000;

export function HomeHero(): React.ReactElement {
  const [active, setActive] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const reduceMotion = useReducedMotion();
  const project = showcaseProjects[active];
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-out hand-off: text lifts away, devices sink and tilt toward the
  // "Seçili işler" stage that rises in underneath.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const still = reduceMotion ?? false;
  const textY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, still ? 1 : 0]);
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 240]);
  const deviceScale = useTransform(scrollYProgress, [0, 1], [1, still ? 1 : 0.8]);
  const deviceTilt = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 22]);
  const deviceOpacity = useTransform(scrollYProgress, [0.45, 0.95], [1, still ? 1 : 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Every project gets the same screen time in the hero.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % showcaseProjects.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-28 pb-16 bg-[#060a14]"
    >
      <motion.div
        aria-hidden="true"
        className="absolute right-[-10%] top-[10%] w-[900px] h-[700px] rounded-full blur-[120px] pointer-events-none"
        style={{ opacity: glowOpacity }}
        animate={{ backgroundColor: project.glow }}
        transition={{ duration: reduceMotion ? 0 : 1.2 }}
      />
      <div
        aria-hidden="true"
        className="absolute left-[-15%] bottom-[-20%] w-[700px] h-[600px] rounded-full blur-[120px] pointer-events-none bg-indigo-600/20"
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
        <motion.div
          className="lg:col-span-5"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            6 ürün şu an canlıda
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.1, ease }}
            className="font-extrabold text-white leading-[1.02] tracking-[-0.04em] mb-7"
            style={{
              fontSize: "clamp(2.8rem, 5.6vw, 5.1rem)",
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            }}
          >
            Uygulamayı yapıyoruz,
            <br />
            <span className="gradient-text">sitesini de.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.2, ease }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-xl mb-10"
          >
            Antalya merkezli yazılım stüdyosu. Mobil oyun, uygulama, web
            platformu ve QR menü — tasarımdan yayına.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.3, ease }}
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="#isler"
              className="btn-gradient inline-flex items-center justify-center min-h-[52px] px-8 rounded-full text-base font-semibold text-white"
            >
              İşlerin içinden geçin ↓
            </a>
            <Link
              href="/iletisim"
              className="inline-flex items-center min-h-[48px] text-base text-white/70 hover:text-white border-b border-white/25 hover:border-white/70 transition-colors"
            >
              Bize ulaşın
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          style={{
            y: deviceY,
            scale: deviceScale,
            rotateX: deviceTilt,
            opacity: deviceOpacity,
            transformPerspective: 1400,
            transformOrigin: "50% 100%",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={project.id}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: 60, rotate: 1.5, scale: 0.96 }
                }
                animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, x: -60, rotate: -1.5, scale: 0.96 }
                }
                transition={{ duration: 0.8, ease }}
              >
                <DevicePair project={project} priority={active === 0} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Equal-weight project switcher */}
          <div
            className="mt-8 flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Projeler"
          >
            {showcaseProjects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="group relative min-h-[44px] rounded-full px-4 text-sm font-semibold transition-colors overflow-hidden border border-white/10"
                style={{
                  color: i === active ? "#0a0f1e" : "rgba(255,255,255,0.65)",
                }}
              >
                {i === active && (
                  <motion.span
                    layoutId="hero-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: p.accent }}
                    transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
                  />
                )}
                <span className="relative">{p.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
