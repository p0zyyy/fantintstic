/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
