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
