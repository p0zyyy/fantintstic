/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
