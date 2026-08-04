"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Kart üstündeki proje adı. Alttaki scrim olmadan isim bazı görsellerde
// (acik zeminli ASTRA ekrani) okunmuyordu.
function ProjectTag({ label }: { label: string }): React.ReactElement {
  return (
    <div className="absolute inset-x-0 bottom-0 pt-10 pb-2.5 px-3 bg-gradient-to-t from-black/75 to-transparent pointer-events-none">
      <span
        className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85"
        style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export function HeroSection(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Reduced motion: giriş animasyonları anında tamamlanır
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.8, ease: smoothEase },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 1, ease: smoothEase },
    },
  };

  // Scroll-linked parallax: her proje kartı farklı hızda kayıyor, derinlik hissi veriyor
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yKatina = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 70]);
  const yAnimyst = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);
  const yAstra = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 110]);
  const yPacopilot = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -35]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16"
      style={{ backgroundColor: "#060a14" }}
    >
      {/* Ambient gradient glow */}
      <div
        className="blob-float-slow absolute -top-40 left-[10%] rounded-full pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(124,58,237,0.07) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
      <div
        className="blob-float-medium absolute bottom-[5%] right-[5%] rounded-full pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          {/* Left: message */}
          <motion.div
            className="lg:col-span-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="font-extrabold leading-[1.02] text-white mb-7"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 4.25rem)",
                fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              Yazılım ile geleceği
              <br />
              <span className="gradient-text">şekillendiriyoruz.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-400 max-w-lg leading-relaxed mb-10"
            >
              Antalya merkezli yazılım stüdyosu. Mobil uygulama, web platformu
              ve QR menü çözümleri tasarlıyor, geliştiriyor ve yayına alıyoruz.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="#projeler"
                className="btn-gradient inline-flex items-center justify-center min-h-[48px] px-8 rounded-full text-base font-semibold text-white"
                style={{
                  fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                }}
              >
                Projelerimizi İnceleyin
              </a>
              <Link
                href="/iletisim"
                className="inline-flex items-center min-h-[48px] text-base text-white/70 hover:text-white transition-colors duration-300 border-b border-white/25 hover:border-white/70"
              >
                Bize Ulaşın
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: layered real-project composition */}
          <motion.div
            className="lg:col-span-6 relative h-[420px] sm:h-[500px] lg:h-[620px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-hidden={false}
          >
            {/* Glow behind the cards */}
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[70%] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 65%)",
                filter: "blur(50px)",
              }}
              aria-hidden="true"
            />

            {/* AniMyst — arkada sol üst */}
            <motion.div
              variants={cardVariants}
              style={{ y: yAnimyst }}
              className="absolute left-0 top-[2%] w-[46%] sm:w-[42%] max-w-[250px] -rotate-6 rounded-3xl overflow-hidden border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
            >
              <Image
                src="/projects/animyst-hero.jpg"
                alt="AniMyst mobil oyunundan bir sahne"
                width={562}
                height={1000}
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 36vw, 250px"
                className="w-full h-auto object-cover"
              />
              <ProjectTag label="AniMyst" />
            </motion.div>

            {/* ASTRA — arkada sağ üst */}
            <motion.div
              variants={cardVariants}
              style={{ y: yAstra }}
              className="absolute right-0 top-0 w-[42%] sm:w-[38%] max-w-[225px] rotate-6 rounded-3xl overflow-hidden border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
            >
              <Image
                src="/projects/astra-home.png"
                alt="ASTRA sinerji roguelike oyununun ana ekranı"
                width={443}
                height={960}
                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 32vw, 225px"
                className="w-full h-auto object-cover"
              />
              <ProjectTag label="ASTRA" />
            </motion.div>

            {/* PA Copilot — arkada sağ alt, mobilde gizli (kalabalık yapıyor) */}
            <motion.div
              variants={cardVariants}
              style={{ y: yPacopilot }}
              className="hidden sm:block absolute right-[2%] bottom-0 w-[34%] max-w-[200px] rotate-3 rounded-3xl overflow-hidden border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
            >
              <Image
                src="/projects/pacopilot-onetap.png"
                alt="PA Copilot uygulamasının anons hazırlama ekranı"
                width={443}
                height={960}
                sizes="(max-width: 1024px) 30vw, 200px"
                className="w-full h-auto object-cover"
              />
              <ProjectTag label="PA Copilot" />
            </motion.div>

            {/* Katina — en önde, ortada */}
            <motion.div
              variants={cardVariants}
              style={{ y: yKatina }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[6%] w-[52%] sm:w-[46%] max-w-[280px] -rotate-1 rounded-3xl overflow-hidden border border-white/15 shadow-[0_28px_70px_rgba(0,0,0,0.6)]"
            >
              <Image
                src="/projects/katina-turan.jpg"
                alt="Katina destesinden Turan kartı"
                width={900}
                height={1350}
                priority
                sizes="(max-width: 640px) 52vw, (max-width: 1024px) 40vw, 280px"
                className="w-full h-auto object-cover"
              />
              <ProjectTag label="Katina" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
