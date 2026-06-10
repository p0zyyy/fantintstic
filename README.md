# PEEL® — Detachable Car Window Tint (marketing site)

An Awwwards-style, **strictly black & white** single-page marketing site for a
reusable, removable car window tint. The whole experience sells one idea:
**tint on your terms — snap on, peel off.**

Built with Next.js (App Router) + TypeScript, Tailwind, Framer Motion and
Lenis smooth scrolling.

## Quick start

```bash
npm install      # already run during setup
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

> Requires Node 18.17+ (developed on Node 24).

## What's in here

| Area | File |
| --- | --- |
| Page composition | `app/page.tsx` |
| Fonts + metadata | `app/layout.tsx` (Poppins via `next/font`) |
| Design tokens / cursor / reduced-motion CSS | `app/globals.css`, `tailwind.config.ts` |
| Smooth scroll (Lenis) | `components/SmoothScroll.tsx` |
| Custom animated cursor | `components/CustomCursor.tsx` |
| Page-load intro (counter + curtain) | `components/Preloader.tsx` |
| Magnetic buttons | `components/MagneticButton.tsx` |
| Scroll reveals + masked text | `components/Reveal.tsx` |
| Infinite marquees | `components/Marquee.tsx`, `MarqueeStrip.tsx` |
| Reduced-motion / touch hooks | `lib/hooks.ts` |

### Sections (one component each)

`Navbar` → `Hero` → `MarqueeStrip` → `HowItWorks` → `AttachDetachDemo`
→ `Features` → `Gallery` → `Specs` → `Testimonials` → `FAQ` → `ClosingCTA`
→ `Footer`

The **AttachDetachDemo** is the centerpiece: a draggable before/after slider
(mouse, touch **and** keyboard) that wipes a car window between clear and
tinted — literally "snap on / peel off".

## Design system

- **Color:** pure `#000` / `#fff` only, with grays (`#111 #1a1a1a #888 #e5e5e5`)
  for depth. **No color accents anywhere** — see the `colors` block in
  `tailwind.config.ts`.
- **Type:** Poppins. Black (900) / Bold (700) for oversized `clamp`-scaled
  display headings with tight tracking; 400/500 for body copy.
- **Motion:** Lenis smooth scroll, scroll-triggered masked/clip reveals,
  parallax imagery, magnetic buttons, infinite marquees, custom cursor.

## Accessibility & performance

- Semantic landmarks, skip link, keyboard-operable nav/FAQ/slider, visible
  focus rings.
- **`prefers-reduced-motion` is fully honored** — Lenis, the preloader, the
  custom cursor and all reveal/parallax effects switch off (see
  `lib/hooks.ts` → `usePrefersReducedMotion`).
- The custom cursor and magnetic effect **auto-disable on touch devices**
  (`useIsTouchDevice`).
- Images use `next/image` (lazy by default; hero is `priority`) with fixed
  aspect ratios to avoid layout shift.

## Replacing the placeholder assets

All imagery is **Unsplash placeholder URLs** marked with `TODO` comments.
Search the repo for `TODO` to find every swap point:

- `components/Hero.tsx` — hero photography
- `components/AttachDetachDemo.tsx` — the clear/tinted window photo (uses one
  image with a brightness filter for the "tinted" layer; swap for a real
  clear vs. tinted pair if you have them)
- `components/Gallery.tsx` — lifestyle gallery shots
- `components/Specs.tsx` — replace representative figures with certified lab data
- `app/layout.tsx` — set `metadataBase` to your production domain
- `next.config.mjs` — replace the Unsplash `remotePatterns` host with your CDN

Drop owned files into `public/` and point the `src` props there
(e.g. `src="/hero.jpg"`).
