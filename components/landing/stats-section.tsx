"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "PROJE" },
  { value: 30, suffix: "+", label: "MUSTERI" },
  { value: 3, suffix: "+", label: "YIL DENEYIM" },
  { value: 7, suffix: "/24", label: "DESTEK" },
];

function AnimatedCounter({
  value,
  suffix,
  isActive,
}: {
  value: number;
  suffix: string;
  isActive: boolean;
}): React.ReactElement {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection(): React.ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    // Reset on navigation
    setIsInView(false);

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <section className="py-32 lg:py-40" style={{ backgroundColor: "#060a14" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-line mb-20" />

        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-3"
                style={{
                  fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                }}
              >
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-500 font-medium uppercase tracking-widest">
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
