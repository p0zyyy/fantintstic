"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { MaskedText } from "./Reveal";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/hooks";

/**
 * Big closing CTA — enormous type that fills the viewport, a single magnetic
 * button, and a faint parallax word ("Fantintstic") drifting behind for depth.
 */
export default function ClosingCTA() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  // Below 500px the ghost word turns vertical, so its parallax drift runs along
  // the Y axis (down the section) instead of the X axis.
  const isNarrow = useMediaQuery("(max-width: 499px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Same magnitude either way; the axis is chosen at render time below.
  const ghostDrift = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-paper px-[5vw] py-[14vh] text-ink"
    >
      {/* Ghost word drifting behind. The brand name is long, so it's sized
          to bleed past the viewport edges — an intentional oversized motif.
          Below 500px the word flips to vertical writing and is sized in vh so
          it grows to span the section's height, drifting top-to-bottom. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap text-[clamp(4rem,17vw,15rem)] font-black leading-none tracking-crush text-mist max-[499px]:[writing-mode:vertical-rl] max-[499px]:text-[15.2vh]"
        style={
          prefersReducedMotion
            ? undefined
            : isNarrow
              ? { y: ghostDrift }
              : { x: ghostDrift }
        }
      >
        Fantintstic
      </motion.span>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-steel">
          Ready when you are
        </p>

        <h2 className="display text-display leading-[0.82] tracking-crush">
          <MaskedText text="Stick on." as="span" />
          <br />
          <MaskedText text="Peel off." as="span" className="text-steel" />
        </h2>

        <p className="mt-10 max-w-md text-lg text-graphite">
          Free professional installation within 48 hours. A 30-day money-back
          guarantee, plus a 6-month warranty. If it&apos;s not for you, we take
          it back. No scraping, no residue, no hassle. That&apos;s the kind of
          service we&apos;d want ourselves.
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
