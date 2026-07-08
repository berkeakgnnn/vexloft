"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateOnScroll({ children, className = "", delay = 0 }: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: reveal as soon as any pixel enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: reduceMotion ? 0 : 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      // "animate-on-scroll": globals.css reduced-motion bloğu transition'ı
      // kapatır — inline stil SSR/istemcide hep aynı kalır (hydration güvenli)
      className={`animate-on-scroll ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        // Delay folded into the shorthand: mixing `transition` with
        // `transitionDelay` triggers a React conflicting-style warning
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
