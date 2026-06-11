"use client";

import Marquee from "./Marquee";

/**
 * Full-width marquee band between the hero and the explainer. Two rows scroll
 * in opposite directions for a kinetic, editorial feel. Pure CSS animation.
 */
export default function MarqueeStrip() {
  return (
    <section className="relative z-0 border-y border-graphite/30 bg-transparent py-8">
      <Marquee
        items={["99% UVR", "95+% IRR", "100% Reusable"]}
        duration={28}
      />
      <div className="h-4" />
      <Marquee
        items={[
          "30-Days Money-Back Guarantee",
          "Free Shipping & Professional Installation in 48 Hrs",
        ]}
        duration={34}
        reverse
        separator="/"
      />
    </section>
  );
}
