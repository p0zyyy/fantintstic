"use client";

import Reveal, { MaskedText } from "./Reveal";

/**
 * Specs / comparison — a split layout. Left: hard product specs. Right: a
 * head-to-head comparison vs traditional bonded tint, rendered as a clean
 * monochrome table where Fantintstic wins are bold/filled and the legacy column is
 * muted. Mobile collapses the table into stacked rows.
 */

const SPECS = [
  { label: "UV block", value: "99%" },
  { label: "Heat (IR) rejection", value: "Up to 99%" },
  { label: "Install time", value: "2 mins / window" },
  { label: "Reuses", value: "Unlimited" },
  { label: "Mounting", value: "3M top tabs" },
  { label: "Residue", value: "None" },
  { label: "Shade options", value: "5 / 20 / 30%" },
];

// Every feature is phrased as a positive capability, so a tick (✓) in the
// Fantintstic column and a cross (✗) in the Bonded column read consistently.
const COMPARISON: { feature: string }[] = [
  { feature: "Removable & reusable" },
  { feature: "Residue-free" },
  { feature: "No installer needed" },
  { feature: "Move between cars" },
  { feature: "Adjust for the law" },
  { feature: "Stays bubble-free" },
];

export default function Specs() {
  return (
    <section id="specs" className="bg-ink px-[5vw] py-[14vh]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Left — specs */}
        <div>
          <h2 className="display mb-12 text-display leading-[0.85] tracking-crush">
            <MaskedText text="The" as="span" />
            <br />
            <MaskedText text="numbers." as="span" className="text-ash" />
          </h2>

          <dl className="border-t border-graphite">
            {SPECS.map((spec, i) => (
              <Reveal key={spec.label} variant="fade" delay={i * 0.05}>
                <div className="flex items-baseline justify-between border-b border-graphite py-6">
                  <dt className="text-base uppercase tracking-wider text-ash">
                    {spec.label}
                  </dt>
                  <dd className="text-3xl font-black tracking-tightest">
                    {spec.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Right — comparison vs traditional tint */}
        <div className="lg:pt-12">
          <Reveal variant="rise">
            <div className="overflow-hidden rounded-2xl border border-graphite">
              {/* Header row */}
              <div className="grid grid-cols-[minmax(0,1fr)_3.5rem_3.5rem] bg-coal md:grid-cols-[1.4fr_1fr_1fr]">
                <div className="px-4 py-4 text-xs uppercase tracking-widest text-ash md:p-5">
                  vs. Traditional
                </div>
                <div className="bg-paper px-0.5 py-4 text-center text-[8px] font-black uppercase leading-none tracking-tighter text-ink md:p-5 md:text-sm md:tracking-tight">
                  Fantintstic
                </div>
                <div className="px-0.5 py-4 text-center text-[8px] font-bold uppercase leading-none tracking-tight text-ash md:p-5 md:text-sm md:tracking-wider">
                  Bonded
                </div>
              </div>

              {/* Rows */}
              {COMPARISON.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[minmax(0,1fr)_3.5rem_3.5rem] border-t border-graphite md:grid-cols-[1.4fr_1fr_1fr]"
                >
                  <div className="px-4 py-4 text-sm font-medium leading-tight text-paper md:p-5">
                    {row.feature}
                  </div>
                  <div className="flex items-center justify-center bg-paper/95 px-1 py-4 text-ink md:p-5">
                    {/* Tick = Fantintstic has this capability */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      role="img"
                      aria-label="Yes"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center px-1 py-4 text-ash md:p-5">
                    {/* Cross = traditional bonded tint does not */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      role="img"
                      aria-label="No"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ash">
              * Figures are representative of the flagship 20% VLT panel.
              {/* TODO: replace with certified lab figures before launch. */}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
