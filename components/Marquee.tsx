"use client";

import { Fragment } from "react";

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
 * Infinite horizontal marquee. The track holds two identical copies of the
 * content and translates -50%, so the loop is seamless. Driven by a pure CSS
 * keyframe (see tailwind.config) — cheap and 60fps. Pauses on hover.
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
  const Track = () => (
    <div
      className="flex shrink-0 items-center"
      // duplicated content sits side-by-side; translateX(-50%) loops it
    >
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
    </div>
  );

  return (
    <div
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
        <Track />
        <Track />
      </div>
    </div>
  );
}
