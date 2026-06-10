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
        ash: "#888888",
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
