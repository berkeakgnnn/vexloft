"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  LayoutDashboard,
  QrCode,
  Server,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  tint: string;
}

const services: Service[] = [
  {
    title: "Mobil Uygulama",
    description:
      "iOS ve Android için React Native / Expo. Mağaza yayını ve bakım dahil.",
    icon: Smartphone,
    tint: "#818cf8",
  },
  {
    title: "Web Tasarım & Geliştirme",
    description: "Kurumsal site, landing page, admin panel ve dashboard.",
    icon: Code2,
    tint: "#22d3ee",
  },
  {
    title: "E-Ticaret",
    description: "Online mağaza, ödeme ve kargo entegrasyonu, stok yönetimi.",
    icon: ShoppingBag,
    tint: "#f472b6",
  },
  {
    title: "QR Menü",
    description:
      "Kafe, restoran ve barlar için temalı, çok dilli dijital menü.",
    icon: QrCode,
    tint: "#facc15",
  },
  {
    title: "CRM & Paneller",
    description: "Müşteri yönetimi, CMS ve işinize özel dashboard.",
    icon: LayoutDashboard,
    tint: "#a78bfa",
  },
  {
    title: "API & Altyapı",
    description: "Backend servisleri, veritabanı tasarımı, bulut altyapı.",
    icon: Server,
    tint: "#34d399",
  },
];

const words = ["Mobil", "Web", "E-ticaret", "QR Menü", "CRM", "API"];

// Card with a cursor-following spotlight.
function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}): React.ReactElement {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, ${service.tint}26, transparent 70%)`;
  const Icon = service.icon;

  const variants: Variants = {
    hidden: { opacity: 0, y: 80, rotateX: -35 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.9, ease, delay: (index % 3) * 0.12 },
    },
  };

  return (
    <motion.div
      variants={variants}
      style={{ transformPerspective: 1000, transformOrigin: "50% 0%" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        mx.set(-200);
        my.set(-200);
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 min-h-[260px] flex flex-col justify-between transition-colors duration-300 hover:border-white/25"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlight }}
      />
      <div className="relative flex items-center justify-between">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
          style={{ backgroundColor: `${service.tint}1a`, color: service.tint }}
        >
          <Icon size={26} strokeWidth={1.8} />
        </span>
        <span className="text-sm font-semibold tabular-nums text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="relative">
        <h3
          className="text-2xl font-extrabold text-white mb-2 tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
          }}
        >
          {service.title}
        </h3>
        <p className="text-base text-gray-400 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

// Transition in: a giant word band slides sideways with scroll, then cards
// flip up from below in a staggered 3D cascade.
export function HomeServices(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const still = reduceMotion ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bandX = useTransform(
    scrollYProgress,
    [0, 1],
    still ? ["0%", "0%"] : ["10%", "-55%"],
  );
  const bandX2 = useTransform(
    scrollYProgress,
    [0, 1],
    still ? ["0%", "0%"] : ["-50%", "5%"],
  );

  return (
    <section
      ref={ref}
      id="hizmetler"
      className="relative overflow-hidden bg-[#060a14] pt-10 pb-28 lg:pb-36"
    >
      <div aria-hidden="true" className="select-none pointer-events-none">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap font-extrabold tracking-[-0.05em] text-transparent"
          style={{
            x: bandX,
            fontSize: "clamp(4rem, 13vw, 12rem)",
            fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.14)",
          }}
        >
          {[...words, ...words].map((w, i) => (
            <span key={`a${i}`}>{w} ✦</span>
          ))}
        </motion.div>
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap font-extrabold tracking-[-0.05em] -mt-4"
          style={{
            x: bandX2,
            fontSize: "clamp(4rem, 13vw, 12rem)",
            fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
          }}
        >
          {[...words, ...words].map((w, i) => (
            // Gradient per word: on the row itself the background only spans the
            // viewport-wide box, so text past it rendered transparent (cut off).
            <span key={`b${i}`} className="gradient-text pr-[0.06em]">
              {w} ✦
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.h2
            initial={still ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-[-0.04em] leading-[1.02] max-w-2xl"
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            }}
          >
            Fikirden mağazaya,
            <br />
            tek ekip.
          </motion.h2>
          <Link
            href="/hizmetler"
            className="group inline-flex items-center gap-2 min-h-[44px] font-semibold text-white/80 hover:text-white"
          >
            Tüm hizmetler
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={still ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
