// Regenerate the raster icon fallbacks from the SVG source in app/icon.svg.
//
// One-off tooling, not part of the build. The generated files
// (app/favicon.ico, app/apple-icon.png) are committed; this script only needs
// to run again if the icon design changes. To run:
//
//   npm i -D sharp png-to-ico && node scripts/generate-icons.mjs
//
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFile, writeFile } from "node:fs/promises";

const rounded = await readFile("app/icon.svg");

// favicon.ico — legacy fallback (older browsers, /favicon.ico requests).
// Multi-size PNG-in-ICO from the rounded mark.
const ico = await pngToIco(
  await Promise.all(
    [16, 32, 48].map((s) => sharp(rounded).resize(s, s).png().toBuffer())
  )
);
await writeFile("app/favicon.ico", ico);

// apple-icon.png — iOS home-screen / Safari. Rendered full-bleed (no rounded,
// transparent corners) because iOS applies its own rounded mask; transparent
// corners would otherwise fill with black.
const appleSquare = `<svg width="180" height="180" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="l"><rect width="50" height="100"/></clipPath>
    <clipPath id="r"><rect x="50" width="50" height="100"/></clipPath>
  </defs>
  <rect width="50" height="100" fill="#ffffff"/>
  <rect x="50" width="50" height="100" fill="#000000"/>
  <g fill="#000000" clip-path="url(#l)">
    <rect x="34" y="26" width="15" height="50"/>
    <rect x="34" y="26" width="36" height="14"/>
    <rect x="34" y="45" width="28" height="12"/>
  </g>
  <g fill="#ffffff" clip-path="url(#r)">
    <rect x="34" y="26" width="15" height="50"/>
    <rect x="34" y="26" width="36" height="14"/>
    <rect x="34" y="45" width="28" height="12"/>
  </g>
</svg>`;
await writeFile(
  "app/apple-icon.png",
  await sharp(Buffer.from(appleSquare)).resize(180, 180).png().toBuffer()
);

console.log("Generated app/favicon.ico and app/apple-icon.png");
