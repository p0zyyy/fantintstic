"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

type RevealVariant = "rise" | "fade" | "mask";
// Restrict to the handful of semantic tags we actually reveal. Keeping this a
// string union lets us index the framer-motion proxy (motion[tag]) instead of
// calling motion(Component) inside render, which would recreate — and remount
// — the component on every render.
type Tag = "div" | "span" | "p" | "section" | "li" | "ul";

interface RevealProps {
  children: ReactNode;
  /** rise = fade + translate up, fade = opacity only, mask = clip wipe. */
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: Tag;
  /** Fraction of element in view before triggering (0–1). */
  amount?: number;
  once?: boolean;
}

/**
 * Scroll-triggered reveal wrapper. Animates on enter once the element is in
 * view. When the user prefers reduced motion the content renders statically
 * (no transform / opacity tricks).
 */
export default function Reveal({
  children,
  variant = "rise",
  delay = 0,
  duration = 0.8,
  className = "",
  as = "div",
  amount = 0.3,
  once = true,
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  const variants: Record<RevealVariant, Variants> = {
    rise: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    mask: {
      hidden: { clipPath: "inset(0 0 100% 0)", y: 20 },
      visible: { clipPath: "inset(0 0 0% 0)", y: 0 },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Word-by-word masked headline reveal. Each word sits in an overflow-hidden
 * line and slides up into place, staggered. Ideal for the oversized hero
 * and section titles. Falls back to static text under reduced motion.
 */
export function MaskedText({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "div" | "p";
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const Tag = as;

  // Observe the STABLE container (not the translated word spans). Each word's
  // inner span starts shifted 110% down, so observing it directly makes the
  // intersection threshold unreliable — the reveal would never fire. Watching
  // the container, whose box never moves, triggers the animation dependably.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  if (prefersReducedMotion) {
    return (
      <Tag className={`${className} whitespace-nowrap`.trim()}>{text}</Tag>
    );
  }

  const words = text.split(" ");

  return (
    // whitespace-nowrap keeps a MaskedText group on one line: the per-word
    // clip padding nudges widths just enough to tip a near-full line (e.g. the
    // hero's "your terms.") into an unwanted wrap. Line breaks come only from
    // the explicit <br> between groups.
    <Tag
      ref={ref}
      className={`${className} whitespace-nowrap`.trim()}
      aria-label={text}
    >
      {words.map((word, i) => (
        // The overflow-hidden mask must clear the full glyph extents (the dot
        // of "i", ascenders, descenders like g/y/p, and the trailing period),
        // which spill outside the tight 0.85 line box. We pad the mask on
        // every side to give that clip room, then pull it back with equal
        // negative margins so the heading's line spacing is unchanged.
        // mr is trimmed to keep the inter-word gap (the new horizontal padding
        // adds back the visual space).
        <span
          key={`${word}-${i}`}
          className="reveal-mask inline-block align-bottom px-[0.1em] py-[0.28em] -ml-[0.1em] mr-[0.15em] -my-[0.28em]"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            // Slide distance accounts for the bottom padding so the word still
            // hides completely behind the (now taller) mask when collapsed.
            initial={{ y: "150%" }}
            animate={inView ? { y: "0%" } : { y: "150%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
