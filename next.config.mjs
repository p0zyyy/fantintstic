/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The site is fully static (no API routes, server actions or dynamic data),
  // so we export it to plain HTML/CSS/JS in `out/`. This removes the need for a
  // running Node server on the host — fixing the 503s — and lets any static
  // host (e.g. Hostinger) serve it directly.
  output: "export",
  // Emit `route/index.html` (e.g. /privacy/index.html) so static servers like
  // LiteSpeed/Apache resolve clean URLs via directory indexes.
  trailingSlash: true,
  images: {
    // The host (Hostinger) doesn't run Next.js's image optimization server, so
    // the default `/_next/image` endpoint 404s in production and images break.
    // `unoptimized` makes next/image emit a plain <img> pointing at the real
    // source URL, which loads on any host (static or Node).
    unoptimized: true,
    // Remote placeholder imagery. Swap these hosts for your CDN when real
    // product photography is ready. TODO: replace Unsplash with owned assets.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
