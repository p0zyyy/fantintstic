"use client";

import { ReactNode } from "react";
import Reveal, { MaskedText } from "./Reveal";

/**
 * Features / benefits grid. Asymmetric bento layout — a couple of large
 * "hero" tiles anchor the grid while supporting benefits fill smaller cells.
 * Every tile reveals on scroll and lifts subtly on hover. Pure monochrome:
 * inverted (white-on-black ↔ black-on-white) tiles create the rhythm.
 */

type Feature = {
  title: string;
  body: string;
  icon: ReactNode;
  /** Inverted (white-on-black) tile for visual rhythm. */
  invert?: boolean;
};

// Minimal line icons, drawn inline so they stay crisp and monochrome.
const icon = (path: ReactNode) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {path}
  </svg>
);

const FEATURES: Feature[] = [
  {
    title: "Heat reduction",
    body: "Rejects up to 99% of infrared heat. Step into a cabin that hasn't turned into an oven, so you can ask less of your A/C.",
    icon: icon(
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </>
    ),
    invert: true,
  },
  {
    title: "On-demand privacy",
    body: "Block prying eyes the moment you park. Clear it again before you drive.",
    icon: icon(
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M3 3l18 18" />
      </>
    ),
  },
  {
    title: "Legal flexibility",
    body: "Peel it off for inspections, checkpoints or resale. Stay compliant without losing the benefits.",
    icon: icon(
      <>
        <path d="M12 3v18M5 7h14M7 7l-3 7a4 4 0 0 0 6 0L7 7ZM17 7l-3 7a4 4 0 0 0 6 0l-3-7Z" />
      </>
    ),
    invert: true,
  },
  {
    title: "100% reusable",
    body: "Remove whenever, store it if you want, reapply for years. One purchase, endless use.",
    icon: icon(
      <>
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
      </>
    ),
  },
  {
    title: "Residue-free",
    body: "Held by a few removable 3M tabs up top. No glue across the glass, no sticky haze, no razor blades. Factory-clean underneath.",
    icon: icon(
      <>
        <path d="M20 6 9 17l-5-5" />
      </>
    ),
    invert: true,
  },
  {
    title: "Roll it up",
    body: "Simply roll the tint up and store it somewhere if needed. It doesn't damage the tint.",
    icon: icon(
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-ink px-[5vw] py-[14vh]">
      <div className="mx-auto max-w-[1600px]">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="display text-[12vw] leading-[0.85] tracking-crush lg:text-[7vw]">
            <MaskedText text="Every" as="span" />
            <br />
            <MaskedText text="upside." as="span" className="text-ash" />
          </h2>
          <Reveal variant="rise" className="max-w-sm text-lg text-mist">
            <p>
              All the protection of premium tint, minus the permanence, the
              installer fees, and the regret. Six reasons it lives in your
              car.
            </p>
          </Reveal>
        </div>

        {/* Uniform grid: 6 equal panels — 2 rows of 3 on desktop. */}
        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              variant="rise"
              delay={(i % 3) * 0.08}
              className="h-full"
            >
              <article
                data-cursor=""
                className={`group flex h-full flex-col justify-between rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-1 ${
                  f.invert
                    ? "border-paper bg-paper text-ink hover:bg-mist"
                    : "border-graphite bg-coal text-paper hover:border-ash"
                }`}
              >
                <div className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                  {f.icon}
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-black tracking-tightest md:text-3xl">
                    {f.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-md text-base leading-relaxed ${
                      f.invert ? "text-graphite" : "text-mist"
                    }`}
                  >
                    {f.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
