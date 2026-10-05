"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const line1 = "Projenizi".split("");
const line2 = "hayata geçirelim.".split("");

// Transition in: a circle opens from the centre and floods the screen with
// the brand gradient; the headline then rises letter by letter.
// Transition out: rounded bottom corners lift away to uncover the footer.
export function HomeCta(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const still = reduceMotion ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const r = useTransform(scrollYProgress, [0.1, 0.9], [still ? 150 : 6, 150]);
  const clipPath = useMotionTemplate`circle(${r}% at 50% 55%)`;

  // Letters start clipped (y: 100%), so in-view must be measured on the
  // heading, not on each letter.
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: "100%", rotate: 8 },
    show: (i: number) => ({
      opacity: 1,
      y: "0%",
      rotate: 0,
      transition: { duration: 0.7, ease, delay: i * 0.025 },
    }),
  };

  return (
    <section ref={ref} id="iletisim" className="relative z-10 bg-[#060a14]">
      <motion.div
        style={{
          clipPath,
          background:
            "radial-gradient(ellipse at 30% 20%, #7c3aed 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, #06b6d4 0%, transparent 50%), #312e81",
        }}
        className="relative min-h-[100dvh] flex items-center overflow-hidden rounded-b-[48px]"
      >
        <motion.div
          aria-hidden="true"
          className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full border border-white/15"
          animate={still ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -left-32 -bottom-48 h-[520px] w-[520px] rounded-full border border-white/10"
          animate={still ? undefined : { rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 mb-8">
            Sıradaki ürün
          </p>
          <motion.h2
            initial={still ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="font-extrabold text-white leading-[0.98] tracking-[-0.05em] mb-12"
            style={{
              fontSize: "clamp(3rem, 9vw, 8.5rem)",
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
            }}
            aria-label="Projenizi hayata geçirelim."
          >
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]" aria-hidden="true">
              {line1.map((c, i) => (
                <motion.span
                  key={`l1-${i}`}
                  className="inline-block"
                  custom={i}
                  variants={letterVariants}
                >
                  {c}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]" aria-hidden="true">
              {line2.map((c, i) => (
                <motion.span
                  key={`l2-${i}`}
                  className="inline-block whitespace-pre"
                  custom={i + line1.length}
                  variants={letterVariants}
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </motion.h2>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/iletisim"
              className="inline-flex items-center min-h-[56px] px-8 rounded-full bg-white text-[#1e1b4b] font-bold text-lg transition-transform hover:scale-[1.03]"
            >
              Proje formunu doldurun
            </Link>
            <a
              href="mailto:vexloftstudio@gmail.com"
              className="inline-flex items-center min-h-[56px] px-8 rounded-full border border-white/40 text-white font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              vexloftstudio@gmail.com
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
