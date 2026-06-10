import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

/**
 * Poppins via next/font — self-hosted at build time (no layout shift, no
 * render-blocking network call). We pull the weights the design uses:
 *   400 / 500 → body copy
 *   700 (Bold) / 800 / 900 (Black) → oversized display headings
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"), // TODO: set production domain
  title: "PEEL — Tint On Your Terms | Detachable Car Window Tint",
  description:
    "The reusable, removable car window tint. Snap on privacy, heat and glare control whenever you want it — peel it off with zero residue. Tint on your terms.",
  keywords: [
    "detachable car tint",
    "removable window tint",
    "reusable tint film",
    "no residue tint",
    "privacy tint",
  ],
  openGraph: {
    title: "PEEL — Tint On Your Terms",
    description:
      "Reusable, removable car window tint. Snap on. Peel off. Zero residue.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-ink text-paper antialiased">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
