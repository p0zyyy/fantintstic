"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { MaskedText } from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Big closing CTA — enormous type that fills the viewport, a single magnetic
 * button, and a faint parallax word ("Fantintstic") drifting behind for depth.
 */
export default function ClosingCTA() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-paper px-[5vw] py-[14vh] text-ink"
    >
      {/* Ghost word drifting behind. The brand name is long, so it's sized
          to bleed past the viewport edges — an intentional oversized motif. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap text-[19vw] font-black leading-none tracking-crush text-mist"
        style={prefersReducedMotion ? undefined : { x: ghostX }}
      >
        Fantintstic
      </motion.span>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-steel">
          Ready when you are
        </p>

        <h2 className="display text-[16vw] leading-[0.82] tracking-crush md:text-[12vw]">
          <MaskedText text="Stick on." as="span" />
          <br />
          <MaskedText text="Peel off." as="span" className="text-steel" />
        </h2>

        <p className="mt-10 max-w-md text-lg text-graphite">
          Get the tint that answers to you, not the other way around. Free
          shipping, 30-day peel-it-and-see guarantee.
        </p>

        <div className="mt-12">
          <MagneticButton
            href="#hero"
            cursorLabel="Buy"
            strength={0.6}
            ariaLabel="Get your detachable tint"
            className="rounded-full bg-ink px-14 py-6 text-lg font-bold uppercase tracking-wider text-paper"
          >
            Get Yours →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
