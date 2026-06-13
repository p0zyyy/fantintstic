"use client";

import Reveal, { MaskedText } from "./Reveal";

/**
 * Testimonials — large minimal pull-quotes. No avatars, no star ratings;
 * just oversized type and an attribution. Each quote reveals on scroll.
 */
const QUOTES = [
  {
    quote:
      "I peel it off for my morning inspection route and stick it back on by lunch. It's the first tint that actually fits my life.",
    name: "Mara V.",
    role: "Rideshare driver, Austin",
  },
  {
    quote:
      "Sold my car with factory-clean glass and kept the tint for the next one. Nobody told me that was even possible.",
    name: "Devon R.",
    role: "Enthusiast, Denver",
  },
  {
    quote:
      "The cabin used to hit fifty degrees by noon. Now it's bearable, and I didn't have to commit to anything permanent.",
    name: "Priya N.",
    role: "Field photographer, Phoenix",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-graphite bg-coal px-[5vw] py-[14vh]">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 flex items-center gap-4">
          <span className="text-sm uppercase tracking-[0.3em] text-ash">
            (Word of mouth)
          </span>
          <span className="h-px flex-1 bg-graphite" />
        </div>

        <div className="flex flex-col gap-24">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} variant="rise" amount={0.4}>
              <figure
                className={`max-w-5xl ${
                  i % 2 === 1 ? "ml-auto text-right" : ""
                }`}
              >
                <blockquote className="text-6xl font-bold leading-[1.15] tracking-tight">
                  <span className="text-ash">“</span>
                  {q.quote}
                  <span className="text-ash">”</span>
                </blockquote>
                <figcaption
                  className={`mt-8 flex items-center gap-4 ${
                    i % 2 === 1 ? "justify-end" : ""
                  }`}
                >
                  <span className="text-lg font-black tracking-tight">
                    {q.name}
                  </span>
                  <span className="h-px w-10 bg-ash" />
                  <span className="text-sm uppercase tracking-wider text-ash">
                    {q.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
