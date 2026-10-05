"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin gradient bar under the navbar showing page progress.
export function ScrollProgress(): React.ReactElement {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
      style={{ scaleX }}
    />
  );
}
