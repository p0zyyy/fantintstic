"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MaskedText } from "./Reveal";

/**
 * Interactive attach/detach demo — a draggable before/after slider.
 *
 * Two stacked layers of the same car-window photo:
 *   • base layer  = CLEAR glass (full brightness)
 *   • top layer   = TINTED glass (darkened + scrim), clipped to the slider
 *
 * Dragging the handle (mouse, touch or keyboard arrows) wipes between the
 * two states, letting the user literally "stick on / peel off" the tint.
 * The divider position is a single 0–100 value so it's fully controllable
 * and accessible (exposed as an ARIA slider).
 */
export default function AttachDetachDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(58); // % of width showing TINT
  const [dragging, setDragging] = useState(false);
  const hasInteracted = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const next = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPct(next);
  }, []);

  const onPointerDown = (e: ReactPointerEvent) => {
    hasInteracted.current = true;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => setDragging(false);

  // Keyboard control for the slider handle.
  const onKeyDown = (e: React.KeyboardEvent) => {
    hasInteracted.current = true;
    if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 4));
    if (e.key === "Home") setPct(0);
    if (e.key === "End") setPct(100);
  };

  // Gentle one-time auto "demo" wiggle to invite interaction once in view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasInteracted.current) {
          // nudge: 58 → 40 → 58 so users see it move
          let raf = 0;
          const start = performance.now();
          const animate = (now: number) => {
            if (hasInteracted.current) return;
            const t = Math.min((now - start) / 1400, 1);
            const eased = Math.sin(t * Math.PI * 2) * 12;
            setPct(58 - eased);
            if (t < 1) raf = requestAnimationFrame(animate);
            else setPct(58);
          };
          raf = requestAnimationFrame(animate);
          io.disconnect();
          return () => cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="demo" className="relative bg-ink px-[5vw] py-[12vh]">
      <div className="mx-auto max-w-[1600px]">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="display text-[12vw] leading-[0.85] tracking-crush md:text-[7vw]">
            <MaskedText text="Drag to" as="span" />
            <br />
            <MaskedText text="decide." as="span" className="text-ash" />
          </h2>
          <p className="max-w-sm text-lg text-mist">
            One panel. Two realities. Pull the handle to bring the tint on —
            push it back to peel it clean off. That control is yours, every
            single day.
          </p>
        </div>

        {/* Before/After stage */}
        <div
          ref={containerRef}
          className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-2xl border border-graphite md:aspect-[16/9]"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* BASE layer — CLEAR glass */}
          {/* TODO: swap for owned photo of a car seen through clear glass. */}
          <Image
            src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop"
            alt="A car seen through clear, untinted glass"
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover grayscale"
            draggable={false}
          />
          <span className="absolute bottom-5 right-5 z-10 rounded-full border border-paper/40 bg-ink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            Tint off
          </span>
          {/* TODO: optional — overlay a subtle graphic of the 3M top tabs here
              to make the holding mechanism explicit in the demo. */}

          {/* TOP layer — TINTED glass, clipped to the slider % */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          >
            <Image
              src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop"
              alt="The same car with detachable tint on, cutting glare and heat"
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover grayscale brightness-[0.28] contrast-125"
              draggable={false}
            />
            {/* extra scrim sells the privacy/darkness of the tint */}
            <div className="absolute inset-0 bg-ink/40" />
            <span className="absolute bottom-5 left-5 rounded-full border border-ink/10 bg-paper px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink backdrop-blur-sm">
              Tint on
            </span>
          </div>

          {/* Divider + handle (the ARIA slider) */}
          <div
            className="absolute inset-y-0 z-20 w-px bg-paper"
            style={{ left: `${pct}%` }}
          >
            <button
              role="slider"
              aria-label="Reveal tinted versus clear window"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pct)}
              aria-valuetext={`${Math.round(pct)}% tinted`}
              onKeyDown={onKeyDown}
              data-cursor=""
              data-cursor-label="Drag"
              className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink bg-paper text-ink shadow-2xl transition-transform active:scale-95"
            >
              {/* drag arrows */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 7l-5 5 5 5M15 7l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Live readout */}
        <motion.p
          className="mt-6 text-center text-sm uppercase tracking-[0.3em] text-ash"
          aria-hidden="true"
        >
          {pct > 75
            ? "Maximum privacy"
            : pct > 35
            ? "Drag the handle ←→"
            : "Crystal clear"}
        </motion.p>
      </div>
    </section>
  );
}
