"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import Wordmark from "./Wordmark";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Demo", href: "#demo" },
  { label: "Features", href: "#features" },
  { label: "Specs", href: "#specs" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Sticky minimal navigation. Stays transparent over the hero, then gains a
 * subtle blurred bar once the user scrolls. Anchor links route through the
 * Lenis smooth-scroll bridge (custom event). Includes an accessible mobile
 * menu toggle.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bridge to Lenis (see SmoothScroll.tsx). Falls back to native scroll.
  const scrollTo = (href: string) => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent("lenis:scroll-to", { detail: href }));
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[80]"
    >
      <nav
        className={`flex items-center justify-between px-[5vw] py-5 transition-all duration-500 ${
          scrolled
            ? "bg-ink/70 backdrop-blur-md"
            : "bg-transparent"
        }`}
        aria-label="Primary"
      >
        {/* Wordmark */}
        <button
          onClick={() => scrollTo("#hero")}
          data-cursor=""
          className="text-xl font-black tracking-crush md:text-2xl"
          aria-label="Fantintstic — back to top"
        >
          <Wordmark />
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                data-cursor=""
                className="group relative text-sm font-medium uppercase tracking-wider text-mist transition-colors hover:text-paper"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <MagneticButton
            onClick={() => scrollTo("#cta")}
            cursorLabel="Buy"
            className="hidden rounded-full bg-paper px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-mist sm:inline-flex"
          >
            Get Yours
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`h-0.5 w-6 bg-paper transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-paper transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-paper transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <motion.div
        initial={false}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden bg-ink/95 backdrop-blur-md lg:hidden"
      >
        <ul className="flex flex-col gap-2 px-[5vw] py-6">
          {LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="w-full py-3 text-left text-3xl font-bold tracking-tightest"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-4">
            <button
              onClick={() => scrollTo("#cta")}
              className="w-full rounded-full bg-paper py-4 text-center text-base font-bold uppercase tracking-wider text-ink"
            >
              Get Yours
            </button>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
