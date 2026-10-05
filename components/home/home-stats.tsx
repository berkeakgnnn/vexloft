"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

interface Stat {
  value: number | null;
  raw?: string;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Proje" },
  { value: 30, suffix: "+", label: "Müşteri" },
  { value: 3, suffix: "+", label: "Yıl deneyim" },
  { value: null, raw: "7/24", label: "Destek" },
];

function CountUp({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState<number>(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: reduceMotion ? 0 : 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setDisplay(target),
    });
    return () => controls.stop();
  }, [inView, target, reduceMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// Transition in: a skewed gradient slab that straightens as it scrolls into place.
export function HomeStats(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const still = reduceMotion ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const skew = useTransform(scrollYProgress, [0, 1], [still ? 0 : -7, 0]);
  const unskew = useTransform(skew, (v) => -v);
  const scaleX = useTransform(scrollYProgress, [0, 1], [still ? 1 : 0.86, 1]);

  return (
    <section ref={ref} className="relative bg-[#060a14] py-24 overflow-hidden">
      <motion.div
        style={{ skewY: skew, scaleX }}
        className="relative mx-auto max-w-[1600px] bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 py-20 lg:py-24"
      >
        <motion.div
          style={{ skewY: unskew }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={still ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-center"
            >
              <p
                className="text-5xl md:text-7xl font-extrabold text-white tracking-[-0.04em] leading-none mb-3"
                style={{
                  fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                }}
              >
                {s.value === null ? (
                  s.raw
                ) : (
                  <CountUp target={s.value} suffix={s.suffix ?? ""} />
                )}
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
