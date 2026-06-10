"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Custom animated cursor: a small white dot that trails the pointer and
 * grows into a ring when hovering interactive elements (anything with
 * [data-cursor] or native a/button). A trailing outer ring lags slightly
 * behind for a premium feel.
 *
 * Disabled entirely on touch devices and when reduced motion is requested,
 * in which case the OS cursor is left untouched.
 */
export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const enabled = !isTouch && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-active");

    // Pointer position (exact) and the lerp-smoothed ring position.
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...pos };
    let frame = 0;

    const render = () => {
      // Dot follows the pointer 1:1.
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      // Ring lags behind with linear interpolation for a trailing feel.
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) setVisible(true);
    };

    // Event delegation: detect hover over interactive targets.
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor], input, textarea, [role='button']"
      ) as HTMLElement | null;
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor-label"));
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor], input, textarea, [role='button']"
      );
      if (target) {
        setHovering(false);
        setLabel(null);
      }
    };

    const onLeaveWindow = () => setVisible(false);
    const onEnterWindow = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
    >
      {/* Inner dot — exact pointer position */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full bg-paper"
        style={{
          width: "var(--cursor-size)",
          height: "var(--cursor-size)",
          mixBlendMode: "difference",
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s",
          opacity: hovering ? 0 : 1,
        }}
      />
      {/* Outer ring — trails, expands on hover, can show a label */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-paper text-[10px] font-semibold uppercase tracking-widest text-paper"
        style={{
          width: hovering ? 80 : 36,
          height: hovering ? 80 : 36,
          mixBlendMode: hovering ? "normal" : "difference",
          background: hovering ? "rgba(255,255,255,1)" : "transparent",
          color: hovering ? "#000" : "#fff",
          transition:
            "width 0.3s ease, height 0.3s ease, background 0.3s ease, color 0.3s ease",
        }}
      >
        {label}
      </div>
    </div>
  );
}
