"use client";

import Marquee from "./Marquee";

/**
 * Full-width marquee band between the hero and the explainer. Two rows scroll
 * in opposite directions for a kinetic, editorial feel. Pure CSS animation.
 */
export default function MarqueeStrip() {
  return (
    <section className="border-y border-graphite bg-ink py-8">
      <Marquee
        items={[
          "Stick on",
          "Peel off",
          "Tint on your terms",
          "Privacy on demand",
        ]}
        duration={28}
      />
      <div className="h-4" />
      <Marquee
        items={[
          "Zero residue",
          "100% reusable",
          "Legal flexibility",
          "Heat · Glare · Privacy",
        ]}
        duration={34}
        reverse
        separator="/"
      />
    </section>
  );
}
