"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface GradientButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export function GradientButton({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
}: GradientButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500";

  const primaryClasses =
    "bg-gradient-to-r from-[#4338ca] to-[#7c3aed] text-white hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:scale-[1.03]";

  const outlineClasses =
    "border-2 border-white/60 text-white hover:border-white hover:bg-white/10 hover:scale-[1.03]";

  const variantClass = variant === "primary" ? primaryClasses : outlineClasses;
  const combinedClass = `${baseClasses} ${variantClass} ${className}`;

  const content = <span className="relative z-10">{children}</span>;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link href={href} className={combinedClass}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={combinedClass}
    >
      {content}
    </motion.button>
  );
}
