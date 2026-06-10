"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedText } from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Gallery — full-bleed monochrome car imagery. Each frame parallaxes its
 * image inside an overflow-hidden mask as it scrolls, and zooms on hover.
 * Images lazy-load via next/image (no priority) with fixed aspect ratios so
 * there's zero layout shift.
 *
 * TODO: replace all Unsplash URLs with owned product/lifestyle photography.
 */
const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    alt: "Low front-three-quarter shot of a coupe with tinted glass",
    caption: "City nights",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop",
    alt: "Detail of a car door and side window",
    caption: "Daily driver",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2070&auto=format&fit=crop",
    alt: "Modern car interior seen through tinted windows",
    caption: "Cabin calm",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop",
    alt: "SUV parked with privacy tint engaged",
    caption: "Off the grid",
    tall: true,
  },
];

export default function Gallery() {
  return (
    <section className="bg-ink px-[5vw] py-[12vh]">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="display text-[12vw] leading-[0.85] tracking-crush lg:text-[7vw]">
            <MaskedText text="On the" as="span" />
            <br />
            <MaskedText text="road." as="span" className="text-ash" />
          </h2>
          <span className="hidden text-sm uppercase tracking-[0.3em] text-ash md:block">
            (Gallery)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SHOTS.map((shot, i) => (
            <GalleryItem key={shot.src} shot={shot} offset={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  shot,
  offset,
}: {
  shot: (typeof SHOTS)[number];
  offset: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image drifts vertically inside its mask for a parallax effect.
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={ref}
      data-cursor=""
      data-cursor-label="View"
      className={`group relative overflow-hidden rounded-2xl border border-graphite ${
        shot.tall ? "aspect-[4/5]" : "aspect-[4/3]"
      } ${offset ? "sm:mt-0" : "sm:mt-16"}`}
    >
      {/* Parallax + hover zoom wrapper. Image is oversized (scale 1.25) so
          the parallax translate never exposes an edge. */}
      <motion.div
        className="absolute inset-0 scale-125"
        style={prefersReducedMotion ? undefined : { y }}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />

      <span className="absolute bottom-6 left-6 text-2xl font-black tracking-tightest text-paper md:text-3xl">
        {shot.caption}
      </span>
    </motion.div>
  );
}
