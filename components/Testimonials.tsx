"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal, { MaskedText } from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Testimonials — photo-led social proof. Each owner's car (a wide side-profile
 * shot) sits beside one short, punchy line. Rows alternate the image left/right
 * so the wall reads like an editorial spread. Images parallax inside an
 * overflow-hidden mask on scroll and load lazily via next/image.
 *
 * Owner photos live in /public/testimonials. To swap one, replace the file and
 * keep the same name (or update `src` below).
 */
const TESTIMONIALS = [
  {
    src: "/testimonials/bmw-316i.jpg",
    alt: "White BMW 316i sedan, side profile, parked in a garage",
    quote:
      "Took a total of 30 minutes for installation. I tried removing it and it only takes a couple minutes to finish removing all the tint.",
    name: "Wei Jun",
    car: "BMW 316i",
  },
  {
    src: "/testimonials/hyundai-i30.jpg",
    alt: "Beige Hyundai i30 wagon, side profile, parked in a garage",
    quote:
      "I travel around frequently for work and many times on site. This tint has really helped my car to stay cool whenever I park outdoor.",
    name: "M. Hafiz",
    car: "Hyundai i30",
  },
  {
    src: "/testimonials/maserati-ghibli.jpg",
    alt: "Blue Maserati Ghibli, side profile, parked in a garage",
    quote:
      "Clean and sleek looking. Can't see the tape once the window is rolled up.",
    name: "Di Xiao",
    car: "Maserati Ghibli",
  },
  {
    src: "/testimonials/mercedes-glb.jpg",
    alt: "White Mercedes GLB SUV, side profile, parked in a garage",
    quote:
      "Very satisfied with how the tint looks and performed. It really gives me the privacy I want and is removable in minutes.",
    name: "Priya N.",
    car: "Mercedes GLB 180",
  },
  {
    src: "/testimonials/tesla-model-y.jpg",
    alt: "Grey Tesla Model Y, side profile, parked in a garage",
    quote:
      "Came pre-cut perfectly for my car. Followed the instructions and managed to install by myself within 30 minutes. Overall, I'm satisfied with how it looks and the privacy it gives.",
    name: "Wei Ling",
    car: "Tesla Model Y",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ink px-[5vw] py-[14vh]">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20 flex items-end justify-between">
          <h2 className="display text-display leading-[0.85] tracking-crush">
            <MaskedText text="Real" as="span" />
            <br />
            <MaskedText text="customers." as="span" className="text-ash" />
          </h2>
          <span className="hidden text-sm uppercase tracking-[0.3em] text-ash md:block">
            (Word of mouth)
          </span>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {TESTIMONIALS.map((item, i) => (
            <TestimonialRow key={item.src} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialRow({
  item,
  index,
}: {
  item: (typeof TESTIMONIALS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const flip = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image drifts vertically inside its mask for a parallax effect.
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <figure className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      {/* Photo */}
      <motion.div
        ref={ref}
        data-cursor=""
        className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-graphite ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <motion.div
          className="absolute inset-0 scale-110"
          style={prefersReducedMotion ? undefined : { y }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
      </motion.div>

      {/* Quote */}
      <Reveal variant="rise" amount={0.4} className={flip ? "lg:order-1" : ""}>
        <figcaption>
          <blockquote className="text-2xl font-bold leading-[1.3] tracking-tight sm:text-3xl">
            <span className="text-ash">“</span>
            {item.quote}
            <span className="text-ash">”</span>
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-lg font-black tracking-tight">
              {item.name}
            </span>
            <span className="h-px w-10 bg-ash" />
            <span className="text-sm uppercase tracking-wider text-ash">
              {item.car}
            </span>
          </div>
        </figcaption>
      </Reveal>
    </figure>
  );
}
