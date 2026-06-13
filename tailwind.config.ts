import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strictly monochrome. No color accents anywhere on the site.
        ink: "#000000",
        paper: "#ffffff",
        // Grays reserved purely for depth / contrast.
        coal: "#111111",
        graphite: "#1a1a1a",
        // `steel` — muted mid-gray for large decorative numerals on dark.
        steel: "#4d4d4d",
        // `ash` is the secondary-text gray. Lifted from #888 so it stays
        // clearly legible on the black base (~9:1 contrast) while still
        // reading as secondary to the white/mist primary text.
        ash: "#b3b3b3",
        mist: "#e5e5e5",
      },
      fontFamily: {
        // Bound to the next/font Poppins CSS variable set in layout.tsx
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      // Fluid type scale. Every size is a clamp() that grows smoothly with the
      // viewport — no breakpoint jumps. Each scales between a minimum tuned to
      // stay aligned at 320px and a maximum reached around 1280px (the display
      // sizes top out a little wider). Because these override Tailwind's default
      // `text-*` keys, components use a single class (e.g. `text-3xl`) and the
      // size tracks the screen width; the old `md:`/`lg:` size variants are gone.
      // `vw` middles assume the standard 320 → 1280px reference range.
      fontSize: {
        // xs is intentionally left near-constant — tiny labels read fine at 320.
        sm: ["clamp(0.78rem, 0.75rem + 0.16vw, 0.875rem)", { lineHeight: "1.45" }],
        base: ["clamp(0.875rem, 0.833rem + 0.21vw, 1rem)", { lineHeight: "1.55" }],
        lg: ["clamp(0.938rem, 0.875rem + 0.31vw, 1.125rem)", { lineHeight: "1.6" }],
        xl: ["clamp(1.031rem, 0.958rem + 0.36vw, 1.25rem)", { lineHeight: "1.5" }],
        "2xl": ["clamp(1.188rem, 1.083rem + 0.52vw, 1.5rem)", { lineHeight: "1.3" }],
        "3xl": ["clamp(1.125rem, 1rem + 0.625vw, 1.5rem)", { lineHeight: "1.2" }],
        "4xl": ["clamp(1.75rem, 1.583rem + 0.83vw, 2.25rem)", { lineHeight: "1.1" }],
        "5xl": ["clamp(1.875rem, 1.5rem + 1.88vw, 3rem)", { lineHeight: "1.05" }],
        "6xl": ["clamp(1.625rem, 0.917rem + 3.54vw, 3.75rem)", { lineHeight: "1.05" }],
        "7xl": ["clamp(2.125rem, 1.333rem + 3.96vw, 4.5rem)", { lineHeight: "1" }],
        // Big section headlines — paired with the `.display` helper / leading-*.
        display: ["clamp(2.5rem, 1.333rem + 5.83vw, 6rem)", { lineHeight: "0.9" }],
        // Hero headline — same idea, scaled larger and out to ~1440px.
        "display-hero": ["clamp(2.75rem, 0.857rem + 9.46vw, 9.375rem)", { lineHeight: "0.85" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
        crush: "-0.065em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
