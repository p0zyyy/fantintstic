"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedText } from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

const STEPS = [
  {
    n: "01",
    title: "Align",
    body: "Slide the pre-cut panel in at a 45° angle, set it perfectly fitted against your window.",
  },
  {
    n: "02",
    title: "Stick on",
    body: "Press the discreet 3M tabs along the top edge of the glass and smooth the panel down. They hold the film flat and bubble-free in one motion. Seconds, not hours.",
  },
  {
    n: "03",
    title: "Peel off",
    body: "Heading through a checkpoint, selling the car, or just want clarity? Lift the tabs and the whole panel peels away clean. No tools, no haze, zero residue.",
  },
];

/**
 * "How it works" — a pinned section. The left column sticks while the right
 * column scrolls through the three steps. A vertical progress bar fills as
 * you move, and each step fades/lifts into focus. Scrub math is disabled for
 * reduced-motion users (steps simply stack and reveal).
 */
export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how" ref={ref} className="relative bg-ink">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-0 lg:grid-cols-2">
        {/* Sticky left column */}
        <div className="top-0 flex h-[60vh] flex-col justify-center px-[5vw] py-16 lg:sticky lg:h-screen">
          <span className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-ash">
            (How it works)
          </span>
          <h2 className="display text-display leading-[0.85] tracking-crush">
            <MaskedText text="Three" as="span" />
            <br />
            <MaskedText text="steps." as="span" className="text-ash" />
          </h2>
          <p className="mt-8 max-w-sm text-lg text-mist">
            No installers. No heat guns. No appointments. The whole system is
            built to go on and come off by you, right in your driveway.
          </p>
        </div>

        {/* Scrolling steps. A fixed flex `gap` keeps the spacing between every
            step identical regardless of how long each step's body copy is
            (content-sized steps, not fixed-height blocks with variable
            trailing space). */}
        <div className="relative flex flex-col gap-[16vh] px-[5vw] py-16 lg:py-[20vh]">
          {/* Vertical progress rail */}
          <div className="absolute left-[5vw] top-0 hidden h-full w-px bg-graphite lg:block">
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-paper"
              style={
                prefersReducedMotion
                  ? { scaleY: 1 }
                  : { scaleY: progressScaleY }
              }
            />
          </div>

          {STEPS.map((step) => (
            <Step key={step.n} step={step} reduced={prefersReducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  reduced,
}: {
  step: (typeof STEPS)[number];
  reduced: boolean;
}) {
  // Each step "lights up" based on its OWN position in the viewport, so every
  // step — including the last — brightens as it crosses the centre and dims as
  // it enters/leaves. (Deriving this from the whole section's progress left the
  // final step's dim-out range beyond the reachable 0–1 band.)
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.25, 1, 1, 0.25]
  );

  return (
    <motion.div
      ref={ref}
      className="relative pl-0 lg:pl-[8vw]"
      style={reduced ? undefined : { opacity }}
    >
      <span className="block text-[clamp(2.875rem,10vw,9rem)] font-black leading-none tracking-crush text-steel">
        {step.n}
      </span>
      <h3 className="mt-2 text-7xl font-black tracking-tightest">
        {step.title}
      </h3>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
        {step.body}
      </p>
    </motion.div>
  );
}
