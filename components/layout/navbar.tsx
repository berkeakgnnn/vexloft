"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkimizda" },
  { href: "/iletisim", label: "Iletisim" },
];

export function Navbar(): React.ReactElement {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? "rgba(6, 10, 20, 0.8)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" aria-label="Vexloft Ana Sayfa">
              <Logo variant="light" />
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <Link
                href="/iletisim"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 border-b border-white/30 hover:border-white pb-0.5"
              >
                Bize Ulasin
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Menuyu ac"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#060a14]"
          >
            <div className="flex justify-between items-center px-4 sm:px-6 h-16">
              <Logo variant="light" />
              <button
                className="p-2 text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Menuyu kapat"
              >
                <X size={24} />
              </button>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-10 h-[calc(100vh-64px)]"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-bold text-white/90 hover:text-white transition-colors"
                    style={{
                      fontFamily:
                        "var(--font-plus-jakarta), system-ui, sans-serif",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
