"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { MaskedText } from "./Reveal";
import MagneticButton from "./MagneticButton";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Hero — oversized clamp-scaled headline ("TINT ON YOUR TERMS"), a one-line
 * subhead, primary CTA and a scroll indicator. A full-bleed grayscale car
 * image sits behind with a subtle scroll parallax + dark gradient for
 * legibility.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background drifts down slightly + headline rises as you scroll away.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-x-clip"
    >
      {/* Full-bleed background image with parallax.
          The layer bleeds ~10rem below the hero so the image continues behind
          the marquee strip below it (which is transparent). `object-top` keeps
          the car anchored to the top, so the extra height reveals more of the
          image downward rather than zooming/scaling the car. */}
      <motion.div
        className="absolute inset-x-0 top-0 -z-10 h-[calc(100%+10rem)]"
        style={
          prefersReducedMotion ? undefined : { y: bgY, scale: bgScale }
        }
      >
        {/* TODO: replace with owned hero photography (luxury sedan, side glass). */}
        <Image
          src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2070&auto=format&fit=crop"
          alt="Direct side profile of a black luxury sedan with tinted windows"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top grayscale"
        />
        {/* Gradient scrims keep the white type readable over the image while
            still letting it show (faintly) behind the marquee at the bottom. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />
      </motion.div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 px-[5vw] pb-[12vh] pt-[28vh]"
        style={
          prefersReducedMotion
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mb-6 max-w-md text-sm font-medium uppercase tracking-[0.3em] text-mist"
        >
          Reusable · Removable · Residue-free
        </motion.p>

        <h1 className="display text-[50px] leading-[0.82] tracking-crush md:text-[12vw]">
          <MaskedText text="Tint on" delay={1.9} as="span" />
          <br />
          <MaskedText
            text="your terms."
            delay={2.05}
            as="span"
            className="text-ash"
          />
        </h1>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="max-w-md text-base font-normal leading-relaxed text-mist md:text-xl"
          >
            Premium nano-ceramic tint that blocks 99% of UV and up to 98% of
            infrared heat, yet peels off effortlessly clean whenever you
            choose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.65 }}
          >
            <MagneticButton
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("lenis:scroll-to", { detail: "#cta" })
                )
              }
              cursorLabel="Buy"
              strength={0.5}
              className="rounded-full bg-paper px-10 py-5 text-base font-bold uppercase tracking-wider text-ink"
            >
              Get Yours →
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-ash">
            Scroll
          </span>
          <div className="relative h-12 w-px overflow-hidden bg-graphite">
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-paper"
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
