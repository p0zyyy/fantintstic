"use client";

import { Fragment, useEffect, useRef, useState } from "react";

interface MarqueeProps {
  /** Phrases joined with the separator and repeated to fill the strip. */
  items: string[];
  /** Pixels-per-second feel via CSS animation duration (seconds). */
  duration?: number;
  reverse?: boolean;
  separator?: string;
  className?: string;
}

/**
 * Infinite horizontal marquee.
 *
 * Seamlessness model: the animated container is split into TWO identical
 * halves and translated by exactly -50% via a CSS keyframe (see
 * tailwind.config). At -50% the second half sits precisely where the first
 * began, so each cycle reverts to a pixel-identical first frame — no jump,
 * no gap.
 *
 * For that to hold with *any* content, each half must be at least as wide as
 * the viewport; otherwise short content (e.g. "99% UVR · …") runs out and a
 * gap appears before the loop. So we measure one group of items against the
 * container and repeat it enough times to always overflow. Re-measured on
 * resize and after web-fonts load (which changes text width).
 *
 * Decorative, so the whole strip is aria-hidden.
 */
export default function Marquee({
  items,
  duration = 30,
  reverse = false,
  separator = "✶",
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  // How many times the item-group repeats inside ONE half. Starts at 2 (a safe
  // default that already fills most viewports, avoiding a first-paint gap) and
  // grows after measurement so a half always exceeds the container width.
  const [repeat, setRepeat] = useState(2);

  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      const group = groupRef.current;
      if (!container || !group) return;
      const containerWidth = container.offsetWidth;
      // group.offsetWidth is one repetition's width regardless of `repeat`,
      // because we measure the first group only.
      const groupWidth = group.offsetWidth / repeat || 1;
      // +1 for safety margin so the half always overflows the viewport.
      const needed = Math.max(1, Math.ceil(containerWidth / groupWidth) + 1);
      if (needed !== repeat) setRepeat(needed);
    };

    compute();

    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);

    // Poppins loads after first paint and shifts text width — re-measure.
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(compute).catch(() => {});
    }

    return () => ro.disconnect();
  }, [items, repeat, separator]);

  // One group = the full item list (with trailing separators) rendered once.
  const Group = () => (
    <>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="px-8 text-[8vw] font-black uppercase leading-none tracking-tightest md:text-[5vw]">
            {item}
          </span>
          <span
            className="px-2 text-[5vw] leading-none text-ash md:text-[3vw]"
            aria-hidden="true"
          >
            {separator}
          </span>
        </Fragment>
      ))}
    </>
  );

  // One half = `repeat` groups. The first half carries the measuring ref.
  const Half = ({ measure = false }: { measure?: boolean }) => (
    <div
      ref={measure ? groupRef : undefined}
      className="flex shrink-0 items-center"
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <Group key={i} />
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`group relative flex w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {/* Two identical halves; the keyframe slides the pair by -50%. */}
        <Half measure />
        <Half />
      </div>
    </div>
  );
}
