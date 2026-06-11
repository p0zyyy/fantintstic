"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MaskedText } from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

const STEPS = [
  {
    n: "01",
    title: "Align",
    body: "Hold the pre-cut panel to your window. Custom-shaped for your exact make and model, it lines up on its own.",
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
          <h2 className="display text-[14vw] leading-[0.85] tracking-crush lg:text-[7vw]">
            <MaskedText text="Three" as="span" />
            <br />
            <MaskedText text="moves." as="span" className="text-ash" />
          </h2>
          <p className="mt-8 max-w-sm text-lg text-mist">
            No installers. No heat guns. No appointments. The whole system is
            built to go on and come off by you, right in your driveway.
          </p>
        </div>

        {/* Scrolling steps */}
        <div className="relative flex flex-col px-[5vw] py-16 lg:py-[20vh]">
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

          {STEPS.map((step, i) => (
            <Step
              key={step.n}
              step={step}
              index={i}
              total={STEPS.length}
              progress={scrollYProgress}
              reduced={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
  total,
  progress,
  reduced,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // Each step "lights up" as the scroll progress passes its band.
  const band = index / total;
  const opacity = useTransform(
    progress,
    [band - 0.15, band + 0.05, band + 0.4, band + 0.55],
    [0.25, 1, 1, 0.25]
  );

  return (
    <motion.div
      className="min-h-[55vh] pl-0 lg:pl-[8vw]"
      style={reduced ? undefined : { opacity }}
    >
      <span className="block text-[18vw] font-black leading-none tracking-crush text-steel lg:text-[10vw]">
        {step.n}
      </span>
      <h3 className="mt-2 text-5xl font-black tracking-tightest lg:text-7xl">
        {step.title}
      </h3>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
        {step.body}
      </p>
    </motion.div>
  );
}
