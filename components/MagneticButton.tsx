"use client";

import { ReactNode, useRef, MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/lib/hooks";

interface MagneticButtonProps {
  children: ReactNode;
  /** Render as a link instead of a button when href is provided. */
  href?: string;
  onClick?: () => void;
  className?: string;
  /** How strongly the button follows the cursor (0–1). */
  strength?: number;
  cursorLabel?: string;
  ariaLabel?: string;
}

/**
 * Magnetic button: gently follows the cursor while hovered, then springs
 * back to rest. The inner content moves a touch further than the shell for
 * depth. Effect is disabled on touch devices / reduced-motion, where it
 * behaves like a normal button.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.4,
  cursorLabel,
  ariaLabel,
}: MagneticButtonProps) {
  // Single shared ref; both render paths point at the same element type set.
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = !isTouch && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 15, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMove = (e: ReactMouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass =
    "relative inline-flex items-center justify-center select-none";

  // Inner content rides the same spring as the shell, so it compounds into a
  // subtle parallax — the label drifts a touch further than the pill itself.
  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      style={enabled ? { x: springX, y: springY } : undefined}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor={cursorLabel ? "" : undefined}
        data-cursor-label={cursorLabel}
        className={`${baseClass} ${className}`}
        style={enabled ? { x: springX, y: springY } : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor={cursorLabel ? "" : undefined}
      data-cursor-label={cursorLabel}
      className={`${baseClass} ${className}`}
      style={enabled ? { x: springX, y: springY } : undefined}
    >
      {content}
    </motion.button>
  );
}
