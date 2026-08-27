"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Three visual kinds, so a screenshot and a photograph can share one showcase
 *  without either being forced into the other's frame. Text never sits on top
 *  of the image — it always has its own column or panel. */
export type ProjectVisual =
  | { kind: "browser"; image: string; url: string }
  | { kind: "phones"; images: [string, string, string] }
  | { kind: "photo"; image: string };

export interface WebProject {
  id: string;
  name: string;
  description: string;
  badge: string;
  /** "Yayında" reads as a live link; "Geliştiriliyor" gets the cyan pulse */
  status: "live" | "building";
  tags: string[];
  href?: string;
  /** Replaces the link label when there is nothing to link to yet */
  ctaNote?: string;
  visual: ProjectVisual;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const monoLabel =
  "font-mono text-[11.5px] tracking-[0.14em] uppercase px-3 py-[7px] rounded-lg";

function Badge({ children }: { children: ReactNode }) {
  return (
    <span
      className={`${monoLabel} text-indigo-200 border`}
      style={{
        background:
          "linear-gradient(90deg, rgba(67,56,202,.35), rgba(124,58,237,.28))",
        borderColor: "rgba(129,140,248,.35)",
      }}
    >
      {children}
    </span>
  );
}

function StatusChip({ status }: { status: WebProject["status"] }) {
  if (status === "live") {
    return (
      <span className={`${monoLabel} text-slate-400 border border-white/10`}>
        Yayında
      </span>
    );
  }
  return (
    <span
      className={`${monoLabel} inline-flex items-center gap-[7px] text-cyan-300 border`}
      style={{ background: "rgba(6,182,212,.1)", borderColor: "rgba(6,182,212,.4)" }}
    >
      <span className="block h-1.5 w-1.5 rounded-full bg-cyan-300 vex-pulse" />
      Geliştiriliyor
    </span>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs text-slate-400 bg-white/[0.035] border border-white/[0.06] px-[11px] py-1.5 rounded-md">
      {children}
    </span>
  );
}

/** Browser chrome around a wide web screenshot. The shot is taller than its
 *  window, so hover slides it up — it reads as the page actually scrolling. */
function BrowserFrame({ image, url, alt }: { image: string; url: string; alt: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.12] bg-[#111827] shadow-[0_50px_80px_-50px_rgba(0,0,0,.95)]">
      <div className="flex items-center gap-3.5 px-4 py-3 bg-[#151c2e] border-b border-white/[0.07]">
        <div className="flex gap-[7px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-2.5 w-2.5 rounded-full bg-slate-700" />
          ))}
        </div>
        <div className="flex-1 h-[22px] rounded-md bg-white/5 flex items-center px-2.5 font-mono text-[11px] text-slate-500 truncate">
          {url}
        </div>
      </div>
      {/* The shot keeps its full width — cropping it sideways would cut the
          layout in half — and overflows downward, which is what hover reveals. */}
      <div className="h-[220px] md:h-[380px] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          width={1440}
          height={1100}
          sizes="(max-width: 768px) 100vw, 760px"
          className="w-full h-auto transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-[70px]"
        />
      </div>
    </div>
  );
}

/** Three phones, the middle one raised and wider. They lift together on hover. */
function PhoneTrio({ images, alt }: { images: [string, string, string]; alt: string }) {
  return (
    <div className="flex gap-3 sm:gap-4 justify-center items-end pt-2">
      {images.map((src, i) => {
        const isMid = i === 1;
        return (
          <div
            key={src}
            className={`overflow-hidden border-[5px] transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ${
              isMid
                ? "w-[118px] sm:w-[140px] rounded-[26px] border-[#232c44] bg-[#232c44] -translate-y-[26px] group-hover:-translate-y-[42px] shadow-[0_40px_60px_-32px_rgba(0,0,0,.95)]"
                : "w-[104px] sm:w-[124px] rounded-[22px] border-[#1c2438] bg-[#1c2438] group-hover:-translate-y-[14px] shadow-[0_30px_50px_-30px_rgba(0,0,0,.9)]"
            }`}
          >
            <div className={`relative ${isMid ? "h-[250px]" : "h-[210px]"}`}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes="140px"
                className="object-cover object-top"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Photographs need no frame — they run to the card edge and scale on hover. */
function PhotoBleed({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="h-[200px] md:h-[330px] overflow-hidden">
      <div className="relative h-full transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
        <Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
      </div>
    </div>
  );
}

function Cta({ project }: { project: WebProject }) {
  if (!project.href) {
    return (
      <div className="flex items-center gap-2.5 font-semibold text-[14.5px] text-cyan-300">
        {project.ctaNote ?? "Yakında"}
        <span className="font-normal text-[13.5px] text-slate-600">· link henüz yok</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2.5 font-bold text-[15px] text-indigo-300 transition-all duration-300 group-hover:gap-[18px] group-hover:text-cyan-300">
      Projeyi gör <span className="text-[17px]">→</span>
    </div>
  );
}

function Meta({ project, titleClass }: { project: WebProject; titleClass: string }) {
  return (
    <>
      <div className="flex flex-wrap gap-2 items-center">
        <Badge>{project.badge}</Badge>
        <StatusChip status={project.status} />
      </div>
      <h2
        className={titleClass}
        style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
      >
        {project.name}
      </h2>
      <p className="text-[16.5px] md:text-[17.5px] leading-[1.7] text-slate-400 text-pretty">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <Cta project={project} />
    </>
  );
}

/** Wraps the card in a link only when there is somewhere to go. */
function Shell({
  project,
  className,
  style,
  index,
  children,
}: {
  project: WebProject;
  className: string;
  style?: React.CSSProperties;
  index: number;
  children: ReactNode;
}) {
  const inner = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: EASE }}
      className={`group ${className}`}
      style={style}
    >
      {children}
    </motion.article>
  );

  if (!project.href) return inner;
  const external = /^https?:\/\//.test(project.href);
  return (
    <Link
      href={project.href}
      className="block"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </Link>
  );
}

const CARD_BASE =
  "rounded-[28px] border border-white/[0.07] overflow-hidden transition-all duration-[400ms] hover:-translate-y-1";

export function WebProjectCard({
  project,
  index,
  layout = "stacked",
}: {
  project: WebProject;
  index: number;
  /** split = text and visual side by side; reversed = visual first */
  layout?: "split" | "reversed" | "stacked";
}) {
  const alt = `${project.name} ekran görüntüsü`;

  const visual =
    project.visual.kind === "browser" ? (
      <BrowserFrame image={project.visual.image} url={project.visual.url} alt={alt} />
    ) : project.visual.kind === "phones" ? (
      <PhoneTrio images={project.visual.images} alt={alt} />
    ) : (
      <PhotoBleed image={project.visual.image} alt={alt} />
    );

  // Featured rows: text in one column, visual in the other — never overlapping
  if (layout === "split" || layout === "reversed") {
    const reversed = layout === "reversed";
    return (
      <Shell
        project={project}
        index={index}
        className={`${CARD_BASE} grid gap-10 lg:gap-[72px] items-center p-8 md:p-16 hover:border-indigo-500/45 hover:shadow-[0_40px_90px_-50px_rgba(67,56,202,.9)] ${
          reversed ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.86fr_1.14fr]"
        }`}
        style={{
          background: reversed
            ? "linear-gradient(200deg, #0b1020 0%, #080d1a 100%)"
            : "linear-gradient(160deg, #0b1020 0%, #080d1a 60%, #0a0f1e 100%)",
        }}
      >
        <div className={`flex flex-col gap-5 ${reversed ? "lg:order-2" : ""}`}>
          <Meta
            project={project}
            titleClass="m-0 font-extrabold text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] text-white"
          />
        </div>
        <div className={reversed ? "lg:order-1" : ""}>{visual}</div>
      </Shell>
    );
  }

  // Stacked: photo card (visual on top) or phone card (text then phones)
  if (project.visual.kind === "photo") {
    return (
      <Shell
        project={project}
        index={index}
        className={`${CARD_BASE} flex flex-col bg-[#0a0f1e] hover:border-violet-500/45 hover:shadow-[0_40px_90px_-50px_rgba(124,58,237,.8)]`}
      >
        {visual}
        <div className="flex flex-col gap-4 p-6 md:p-12 md:pt-10">
          <Meta
            project={project}
            titleClass="m-0 font-extrabold text-[26px] md:text-[36px] leading-[1.08] tracking-[-0.03em] text-white"
          />
        </div>
      </Shell>
    );
  }

  return (
    <Shell
      project={project}
      index={index}
      className={`${CARD_BASE} flex flex-col gap-7 p-6 pb-0 md:p-12 md:pb-0 hover:-translate-y-1 hover:shadow-[0_40px_90px_-55px_rgba(6,182,212,.7)]`}
      style={{
        background: "linear-gradient(170deg, #0a1220 0%, #080d1a 100%)",
        borderColor: "rgba(6,182,212,.22)",
      }}
    >
      <div className="flex flex-col gap-4">
        <Meta
          project={project}
          titleClass="m-0 font-extrabold text-[26px] md:text-[36px] leading-[1.08] tracking-[-0.03em] text-white"
        />
      </div>
      {visual}
    </Shell>
  );
}
