"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Wraps the whole app in Lenis "buttery" smooth scrolling.
 *
 * - Drives Lenis on requestAnimationFrame.
 * - Fully disabled when the user prefers reduced motion (native scroll
 *   takes over, so the site remains usable and honest about motion).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      // gentle ease-out so big sections settle nicely
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Allow other components (e.g. nav links) to request a smooth scroll.
    const onAnchor = (e: Event) => {
      const target = (e as CustomEvent<string>).detail;
      const el = document.querySelector(target);
      if (el) lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    window.addEventListener("lenis:scroll-to", onAnchor as EventListener);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("lenis:scroll-to", onAnchor as EventListener);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
