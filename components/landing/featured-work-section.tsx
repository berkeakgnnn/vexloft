"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FeaturedProject {
  name: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  cta: string;
}

const alkor: FeaturedProject = {
  name: "Alkor CMS",
  category: "Web Platformu",
  description:
    "Alkor Cephe Sistemleri için çok dilli içerik yönetim sistemi. Sayfalar, hizmetler, projeler ve medya tek panelden yönetiliyor; site canlıda müşteri kazandırıyor.",
  tags: ["Next.js", "Çok Dilli", "Admin Panel", "REST API"],
  href: "https://alkorcephesistemleri.com/tr",
  cta: "Canlı Siteyi Gör",
};

const animyst: FeaturedProject = {
  name: "AniMyst",
  category: "Mobil Oyun",
  description:
    "Anime karakter tahmin ve kart koleksiyon oyunu. Günlük meydan okumalar, paket açma animasyonları ve aylık liderlik tablosuyla iOS için geliştirildi.",
  tags: ["React Native", "Expo", "iOS", "Gacha Sistemi"],
  href: "https://animyst.vexloft.com",
  cta: "AniMyst'i Keşfet",
};

const astra: FeaturedProject = {
  name: "ASTRA",
  category: "Mobil Oyun",
  description:
    "2-5 dakikalık sinerji roguelike: 5×5 gökyüzüne semboller bırakın, takımyıldızlar kurun, Kozmik Yasalarla kombolar zincirleyin. Günlük ortak gökyüzü, seri ve liderlik tablosuyla iOS'a geliyor.",
  tags: ["React Native", "Expo", "Roguelike", "Günlük Mod"],
  href: "https://astra.vexloft.com",
  cta: "ASTRA'yı Keşfet",
};

const pacopilot: FeaturedProject = {
  name: "PA Copilot",
  category: "Mobil Uygulama",
  description:
    "Pilotlar için anons yardımcısı: uçuş bilgisini bir kez girin, kabin anonsunu İngilizce, Türkçe ve Almanca okumaya hazır alın. Teleprompter, deyim rehberi ve cihaz üstü sesli pratik — tamamen çevrimdışı.",
  tags: ["React Native", "Expo", "3 Dil", "%100 Offline"],
  href: "https://pacopilot.vexloft.com",
  cta: "PA Copilot'u Keşfet",
};

const katina: FeaturedProject = {
  name: "Katina",
  category: "Mobil Uygulama",
  description:
    "Ruh eşi okuması: adınız, doğum tarihiniz ve tercihiniz otuz kartlık destede tek bir karta düşüyor — kimin geleceği, nerede tanışacağınız ve adının baş harfi. Aynı üç bilgi her zaman aynı kartı verir ve okuma internetsiz de çalışır. Günlük okuma ve soru sorabildiğiniz bir kâhinle birlikte.",
  tags: ["React Native", "Expo", "Türkçe + İngilizce", "Çevrimdışı Çalışır"],
  href: "https://katina.vexloft.com",
  cta: "Katina'yı Keşfet",
};

function ProjectText({ project }: { project: FeaturedProject }): React.ReactElement {
  return (
    <div>
      <p className="text-sm font-medium text-indigo-300/80 mb-3">
        {project.category}
      </p>
      <h3
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
        style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
      >
        {project.name}
      </h3>
      <p className="text-lg text-gray-400 leading-relaxed mb-6 max-w-md">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-white/85 hover:text-white transition-colors duration-300"
        style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
      >
        <span className="border-b border-indigo-400/50 group-hover:border-indigo-300 transition-colors pb-0.5">
          {project.cta}
        </span>
        <ArrowUpRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}): React.ReactElement {
  // Keep `initial` identical on server and client (hydration safety);
  // reduced motion collapses the transition to an instant reveal instead.
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.8, delay, ease: smoothEase }
      }
    >
      {children}
    </motion.div>
  );
}

export function FeaturedWorkSection(): React.ReactElement {
  return (
    <section
      className="relative py-28 lg:py-40 scroll-mt-20"
      style={{ backgroundColor: "#0a0f1e" }}
      id="projeler"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal className="mb-20 lg:mb-28">
          <span className="inline-block text-xs font-semibold tracking-[6px] uppercase gradient-text mb-4">
            SEÇİLİ İŞLER
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-2xl"
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Canlıda çalışan, gerçek ürünler.
          </h2>
        </Reveal>

        {/* Alkor CMS: wide photo left, text right */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28 lg:mb-36">
          <Reveal className="relative lg:col-span-7">
            <a
              href={alkor.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Alkor Cephe Sistemleri canlı sitesi"
              className="group block relative overflow-hidden rounded-3xl border border-white/10 aspect-[16/10]"
            >
              <Image
                src="/projects/alkor-cms.jpg"
                alt="Alkor Cephe Sistemleri tarafından tamamlanan Ali Peçen Plaza cephesi"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 via-transparent to-transparent" />
            </a>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <ProjectText project={alkor} />
          </Reveal>
        </div>

        {/* AniMyst: text left, staggered app-art duo right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal delay={0.15} className="lg:col-span-5 order-2 lg:order-1">
            <ProjectText project={animyst} />
          </Reveal>
          <Reveal className="lg:col-span-7 order-1 lg:order-2">
            <a
              href={animyst.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AniMyst web sitesi"
              className="group flex items-end justify-center gap-4 sm:gap-6"
            >
              <div className="relative w-[44%] max-w-[260px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src="/projects/animyst-crystals.jpg"
                  alt="AniMyst oyunundan kristal koleksiyon sahnesi"
                  width={563}
                  height={1000}
                  sizes="(max-width: 640px) 44vw, 260px"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="relative w-[44%] max-w-[260px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-10 transition-transform duration-500 group-hover:translate-y-2">
                <Image
                  src="/projects/animyst-hero.jpg"
                  alt="AniMyst oyunundan gizemli kart sahnesi"
                  width={563}
                  height={1000}
                  sizes="(max-width: 640px) 44vw, 260px"
                  className="w-full h-auto object-cover"
                />
              </div>
            </a>
          </Reveal>
        </div>

        {/* ASTRA: staggered app-art duo left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-28 lg:mt-36">
          <Reveal className="lg:col-span-7">
            <a
              href={astra.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ASTRA web sitesi"
              className="group flex items-end justify-center gap-4 sm:gap-6"
            >
              <div className="relative w-[44%] max-w-[260px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src="/projects/astra-home.png"
                  alt="ASTRA oyunundan giriş ekranı — yeni bir gökyüzü"
                  width={563}
                  height={1000}
                  sizes="(max-width: 640px) 44vw, 260px"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="relative w-[44%] max-w-[260px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-10 transition-transform duration-500 group-hover:translate-y-2">
                <Image
                  src="/projects/astra-gameplay.png"
                  alt="ASTRA oyunundan takımyıldız hizalama sahnesi"
                  width={563}
                  height={1000}
                  sizes="(max-width: 640px) 44vw, 260px"
                  className="w-full h-auto object-cover"
                />
              </div>
            </a>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <ProjectText project={astra} />
          </Reveal>
        </div>

        {/* PA Copilot: text left, staggered app-art duo right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-28 lg:mt-36">
          <Reveal delay={0.15} className="lg:col-span-5 order-2 lg:order-1">
            <ProjectText project={pacopilot} />
          </Reveal>
          <Reveal className="lg:col-span-7 order-1 lg:order-2">
            <a
              href={pacopilot.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PA Copilot web sitesi"
              className="group flex items-end justify-center gap-4 sm:gap-6"
            >
              <div className="relative w-[44%] max-w-[260px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src="/projects/pacopilot-onetap.png"
                  alt="PA Copilot — anonsunuz tek dokunuş uzağınızda"
                  width={563}
                  height={1000}
                  sizes="(max-width: 640px) 44vw, 260px"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="relative w-[44%] max-w-[260px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-10 transition-transform duration-500 group-hover:translate-y-2">
                <Image
                  src="/projects/pacopilot-teleprompter.png"
                  alt="PA Copilot teleprompter ekranı"
                  width={563}
                  height={1000}
                  sizes="(max-width: 640px) 44vw, 260px"
                  className="w-full h-auto object-cover"
                />
              </div>
            </a>
          </Reveal>
        </div>

        {/* Katina: staggered card-art duo left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-28 lg:mt-36">
          <Reveal className="lg:col-span-7">
            <a
              href={katina.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Katina web sitesi"
              className="group flex items-end justify-center gap-4 sm:gap-6"
            >
              <div className="relative w-[44%] max-w-[260px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src="/projects/katina-turan.jpg"
                  alt="Katina destesinden Turan kartı"
                  width={900}
                  height={1350}
                  sizes="(max-width: 640px) 44vw, 260px"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="relative w-[44%] max-w-[260px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-10 transition-transform duration-500 group-hover:translate-y-2">
                <Image
                  src="/projects/katina-suveyla.jpg"
                  alt="Katina destesinden Süveyla kartı"
                  width={900}
                  height={1350}
                  sizes="(max-width: 640px) 44vw, 260px"
                  className="w-full h-auto object-cover"
                />
              </div>
            </a>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <ProjectText project={katina} />
          </Reveal>
        </div>

        {/* More work links */}
        <Reveal className="mt-28 lg:mt-36">
          <div className="gradient-line mb-10" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-gray-400">Daha fazlasına göz atın</p>
            <div className="flex flex-wrap items-center gap-8">
              <Link
                href="/qr-projelerimiz"
                className="group inline-flex items-center gap-1.5 min-h-[44px] text-base font-medium text-white/75 hover:text-white transition-colors"
              >
                QR Menü Projeleri
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/web-projelerimiz"
                className="group inline-flex items-center gap-1.5 min-h-[44px] text-base font-medium text-white/75 hover:text-white transition-colors"
              >
                Web Projeleri
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
