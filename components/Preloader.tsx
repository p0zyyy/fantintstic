"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Animated page-load intro: a fast 0 → 100 counter over a black curtain,
 * then the curtain splits/lifts to reveal the page. Tasteful and quick
 * (~1.6s total). Skipped instantly for reduced-motion users.
 */
export default function Preloader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDone(true);
      return;
    }

    // Lock scroll while the curtain is up.
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1200; // ms for the counter to reach 100
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // Hold for a beat, then drop the curtain.
        setTimeout(() => setDone(true), 250);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-between bg-ink px-[6vw] pb-[6vh]"
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Counter */}
          <motion.span
            className="display text-[18vw] leading-none text-paper md:text-[12vw]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {count}
            <span className="text-ash">%</span>
          </motion.span>

          {/* Wordmark + tagline */}
          <motion.div
            className="hidden flex-col items-end text-right md:flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-2xl font-black tracking-crush">PEEL®</span>
            <span className="text-xs uppercase tracking-[0.3em] text-ash">
              Tint on your terms
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
