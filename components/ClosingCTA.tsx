"use client";

import { useEffect, useRef } from "react";
import MagneticButton from "./MagneticButton";
import { MaskedText } from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { WHATSAPP_CHAT_URL } from "@/lib/links";

/**
 * Big closing CTA — enormous type that fills the viewport, a single magnetic
 * button, and a faint parallax word ("Fantintstic") drifting behind for depth.
 */
export default function ClosingCTA() {
  const ref = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Parallax for the ghost word. Framer-motion's useScroll doesn't track
  // Lenis's smooth scroll here (it sits frozen), so we measure the section's
  // real position every frame and write the transform straight to the node.
  // Drift is ±20% of the word's own box and follows its orientation: vertical
  // (Y) below 500px where the word is rotated, horizontal (X) above it.
  useEffect(() => {
    const section = ref.current;
    const ghost = ghostRef.current;
    if (!section || !ghost) return;
    if (prefersReducedMotion) {
      ghost.style.transform = "";
      return;
    }

    let raf = 0;
    const update = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 as the section enters from the bottom, 1 as it leaves past the top.
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const norm = (p - 0.5) * 0.4; // -0.2..0.2  → ±20%
      ghost.style.transform =
        window.innerWidth < 500
          ? `translateY(${(norm * r.height).toFixed(1)}px)`
          : `translateX(${(norm * r.width).toFixed(1)}px)`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

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
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap text-[clamp(4rem,17vw,15rem)] font-black leading-none tracking-crush text-mist max-[499px]:[writing-mode:vertical-rl] max-[499px]:text-[15.2vh]"
      >
        Fantintstic
      </span>

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
            href={WHATSAPP_CHAT_URL}
            target="_blank"
            cursorLabel="Buy"
            strength={0.6}
            ariaLabel="Chat with Fantintstic on WhatsApp"
            className="rounded-full bg-ink px-14 py-6 text-lg font-bold uppercase tracking-wider text-paper"
          >
            Get Yours →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
