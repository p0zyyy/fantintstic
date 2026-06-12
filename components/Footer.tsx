"use client";

import Marquee from "./Marquee";
import Wordmark from "./Wordmark";

/**
 * Footer — wordmark, link columns, socials and fine print. A final marquee
 * of the brand name sits at the very bottom as a signature flourish.
 */
const COLUMNS: { heading: string; links: string[] }[] = [
  { heading: "Product", links: ["Shop", "Shades", "Find your fit", "Gift cards"] },
  { heading: "Support", links: ["How it works", "FAQ", "Warranty", "Contact"] },
  { heading: "Company", links: ["About", "Press", "Sustainability", "Careers"] },
];

const SOCIALS = ["Instagram", "TikTok", "YouTube", "X"];

export default function Footer() {
  return (
    <footer className="bg-ink pt-[10vh]">
      <div className="mx-auto max-w-[1600px] px-[5vw]">
        {/* Top: wordmark + tagline / link columns */}
        <div className="grid grid-cols-1 gap-12 border-b border-graphite pb-16 lg:grid-cols-[1.5fr_2fr]">
          <div>
            <Wordmark className="text-3xl font-black tracking-crush md:text-5xl" />
            <p className="mt-4 max-w-xs text-mist">
              Reusable, removable car window tint. Tint on your terms.
            </p>

            {/* Socials */}
            <ul className="mt-8 flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    data-cursor=""
                    className="inline-block rounded-full border border-graphite px-4 py-2 text-xs uppercase tracking-wider text-mist transition-colors hover:border-paper hover:text-paper"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="mb-5 text-xs uppercase tracking-[0.3em] text-ash">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        data-cursor=""
                        className="group relative inline-block text-base text-mist transition-colors hover:text-paper"
                      >
                        {link}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Fine print */}
        <div className="flex flex-col items-start justify-between gap-4 py-8 text-xs uppercase tracking-wider text-ash md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} Fantintstic Inc. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" data-cursor="" className="hover:text-paper">
              Privacy
            </a>
            <a href="#" data-cursor="" className="hover:text-paper">
              Terms
            </a>
            <a href="#" data-cursor="" className="hover:text-paper">
              Tint law guide
            </a>
          </div>
          {/* TODO: wire up real legal pages + region-specific tint-law guide. */}
        </div>
      </div>

      {/* Signature marquee */}
      <div className="border-t border-graphite py-6 opacity-60">
        <Marquee
          items={["Fantintstic", "Tint on your terms"]}
          duration={40}
          separator="·"
        />
      </div>
    </footer>
  );
}
