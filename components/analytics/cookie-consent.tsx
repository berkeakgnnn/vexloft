"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GA_ID, saveConsent } from "@/lib/analytics";
import { useConsent } from "./use-consent";

// KVKK: analytics cookies need explicit opt-in, so the banner asks first and
// GA stays off until "Kabul et". Shown once; the choice is kept in localStorage.
export function CookieConsent(): React.ReactElement | null {
  const consent = useConsent();
  const reduceMotion = useReducedMotion();

  if (!GA_ID) return null;
  const open = consent === null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Çerez tercihi"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[70] rounded-2xl border border-white/10 bg-[#0b1220]/95 p-5 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md"
        >
          <p className="text-sm leading-relaxed text-gray-300">
            Siteyi geliştirmek için ziyaret istatistiklerini Google Analytics
            ile ölçmek istiyoruz. Bunun için çerez kullanmamıza izin veriyor
            musunuz?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => saveConsent("granted")}
              className="min-h-[44px] rounded-full bg-white px-5 text-sm font-semibold text-[#0a0f1e] transition-colors hover:bg-indigo-100"
            >
              Kabul et
            </button>
            <button
              type="button"
              onClick={() => saveConsent("denied")}
              className="min-h-[44px] rounded-full border border-white/20 px-5 text-sm font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              Reddet
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
