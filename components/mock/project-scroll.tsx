"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DevicePair } from "./device-pair";
import { mockProjects } from "./projects";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Sticky scroll-through showcase: each project owns one viewport of scroll,
// so all six get equal time and equal space.
export function ProjectScroll(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduceMotion = useReducedMotion();
  const count = mockProjects.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
    if (next !== active) {
      setDirection(next > active ? 1 : -1);
      setActive(next);
    }
  });

  const project = mockProjects[active];

  // Entry transition from the hero: the stage rises as a rounded, inset card
  // and opens to full bleed by the time it pins.
  const { scrollYProgress: entry } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const still = reduceMotion ?? false;
  // Exit toward services: the pinned stage shrinks back into a dimmed card
  // as the next section slides over it.
  const { scrollYProgress: exit } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });
  const insetIn = useTransform(entry, [0, 1], [still ? 0 : 7, 0]);
  const insetOut = useTransform(exit, [0, 0.6], [0, still ? 0 : 5]);
  const radiusIn = useTransform(entry, [0, 1], [still ? 0 : 56, 0]);
  const radiusOut = useTransform(exit, [0, 0.6], [0, still ? 0 : 56]);
  const inset = useTransform(() => Math.max(insetIn.get(), insetOut.get()));
  const radius = useTransform(() => Math.max(radiusIn.get(), radiusOut.get()));
  const clipPath = useMotionTemplate`inset(${insetOut}% ${inset}% ${insetOut}% ${inset}% round ${radius}px)`;
  const stageScale = useTransform(exit, [0, 0.8], [1, still ? 1 : 0.92]);
  const stageDim = useTransform(exit, [0, 0.8], [1, still ? 1 : 0.35]);
  const contentY = useTransform(entry, [0.2, 1], [still ? 0 : 120, 0]);
  const contentOpacity = useTransform(entry, [0.35, 0.9], [still ? 1 : 0, 1]);

  return (
    <section
      id="isler"
      ref={sectionRef}
      className="relative bg-[#060a14] scroll-mt-0"
      style={{ height: `${count * 100}vh` }}
    >
      <motion.div
        className="sticky top-0 h-[100dvh] overflow-hidden bg-[#0a0f1e] border-t border-white/[0.06]"
        style={{ clipPath, scale: stageScale, opacity: stageDim }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[800px] rounded-full blur-[140px] pointer-events-none"
          animate={{ backgroundColor: project.glow }}
          transition={{ duration: reduceMotion ? 0 : 1 }}
        />

        <motion.div
          className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Left: index of all projects, active one expanded */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[6px] uppercase gradient-text mb-6">
              Seçili işler · {String(active + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </p>
            <ol className="hidden lg:flex flex-col gap-1">
              {mockProjects.map((p, i) => (
                <li key={p.id}>
                  <div
                    className="flex items-baseline gap-4 py-2 transition-colors duration-500"
                    style={{
                      color:
                        i === active ? "#ffffff" : "rgba(255,255,255,0.28)",
                    }}
                  >
                    <span
                      className="text-sm font-semibold tabular-nums w-7"
                      style={{ color: i === active ? p.accent : undefined }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-extrabold tracking-[-0.03em] leading-none transition-all duration-500"
                      style={{
                        fontFamily:
                          "var(--font-plus-jakarta), system-ui, sans-serif",
                        fontSize: i === active ? "2.6rem" : "1.6rem",
                      }}
                    >
                      {p.name}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
                className="mt-6 lg:mt-8 max-w-md"
              >
                <h3
                  className="lg:hidden text-4xl font-extrabold text-white tracking-[-0.03em] mb-3"
                  style={{
                    fontFamily:
                      "var(--font-plus-jakarta), system-ui, sans-serif",
                  }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 min-h-[44px] font-semibold text-white"
                >
                  <span
                    className="border-b pb-0.5"
                    style={{ borderColor: project.accent }}
                  >
                    {project.domain}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: device stage */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.div
                key={project.id}
                custom={direction}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: direction * 120,
                        scale: 0.94,
                        rotateX: 8,
                      }
                }
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: direction * -120,
                        scale: 0.94,
                        rotateX: -8,
                      }
                }
                transition={{ duration: 0.75, ease }}
                style={{ transformPerspective: 1200 }}
              >
                <DevicePair project={project} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress: one segment per project */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2"
          aria-hidden="true"
        >
          {mockProjects.map((p, i) => (
            <span
              key={p.id}
              className="h-1 w-10 rounded-full bg-white/10 overflow-hidden"
            >
              <motion.span
                className="block h-full rounded-full"
                style={{ backgroundColor: p.accent }}
                animate={{ width: i <= active ? "100%" : "0%" }}
                transition={{ duration: reduceMotion ? 0 : 0.5 }}
              />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
