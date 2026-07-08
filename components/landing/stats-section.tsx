"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface Stat {
  value: number | null; // null renders the raw label without a counter
  raw?: string;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "PROJE" },
  { value: 30, suffix: "+", label: "MÜŞTERİ" },
  { value: 3, suffix: "+", label: "YIL DENEYİM" },
  { value: null, raw: "7/24", label: "DESTEK" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion: jump straight to the final value (duration 0)
    const controls = animate(0, target, {
      duration: reduceMotion ? 0 : 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
      // Guarantee the final value lands even when duration is 0
      onComplete: () => setDisplay(target),
    });
    return () => controls.stop();
  }, [inView, target, reduceMotion]);

  return (
    <span ref={ref} className="counter-number">
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection(): React.ReactElement {
  return (
    <section className="py-28 lg:py-40" style={{ backgroundColor: "#060a14" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-line mb-20" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-3"
                style={{
                  fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                }}
              >
                {stat.value !== null ? (
                  <CountUp target={stat.value} suffix={stat.suffix ?? ""} />
                ) : (
                  stat.raw
                )}
              </div>
              <div className="text-sm text-gray-400 font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="gradient-line mt-20" />
      </div>
    </section>
  );
}
