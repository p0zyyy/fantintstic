"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaskedText } from "./Reveal";

/**
 * FAQ — clean monochrome accordion. One panel open at a time. Built on
 * native button semantics with aria-expanded / aria-controls so it's fully
 * keyboard- and screen-reader-friendly. Height animates via Framer Motion.
 */
const FAQS = [
  {
    q: "Does it really leave zero residue?",
    a: "Yes. Each panel hangs from a few small 3M tabs along the very top of the window, using the same residue-free adhesive 3M makes for removable wall mounts. The tabs hold the tint in place, then lift away clean, and the film itself never bonds to the glass. Remove it after a day or a decade and the window is exactly as it was.",
  },
  {
    q: "How does it stay on the window?",
    a: "Small 3M tabs along the top edge of the glass carry the weight of the panel, so it sits flush and taut without any adhesive across the film. There's nothing to bubble, nothing to cure, and nothing holding on except a few removable tabs you can lift at will.",
  },
  {
    q: "Will it fit my car?",
    a: "Every panel is pre-cut to your exact year, make and model from our database. You select your vehicle at checkout and the set arrives shaped and labelled per window.",
  },
  {
    q: "Is detachable tint legal?",
    a: "That's the entire point. Laws vary by region and change often. Because Fantintstic comes off in seconds, you can run darker tint when it's allowed and peel down to legal, or fully clear, for inspections and checkpoints.",
  },
  {
    q: "How long does it last?",
    a: "The film is rated for years of repeated application. Between seasons it folds into the included sleeve and stores flat behind a seat or in a closet.",
  },
  {
    q: "Can I move it to another car?",
    a: "If the window dimensions match, yes. Many owners keep their set through a trade-in. For a different body shape, a fresh pre-cut set is the reliable route.",
  },
  {
    q: "Does it affect visibility at night?",
    a: "Choose the shade (VLT %) that suits you. Lighter panels keep night visibility crisp; and if conditions change, you simply peel it off for the drive home.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink px-[5vw] py-[14vh]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="display sticky top-32 text-[50px] leading-[0.85] tracking-crush md:text-[12vw] lg:text-[6vw]">
            <MaskedText text="You" as="span" />
            <br />
            <MaskedText text="asked." as="span" className="text-ash" />
          </h2>
        </div>

        <div className="border-t border-graphite">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-graphite">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    data-cursor=""
                    className="flex w-full items-center justify-between gap-6 py-8 text-left"
                  >
                    <span className="text-xl font-bold tracking-tight md:text-3xl">
                      {item.q}
                    </span>
                    {/* Plus / minus morph */}
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                      <span className="absolute h-0.5 w-5 bg-paper" />
                      <motion.span
                        className="absolute h-0.5 w-5 bg-paper"
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 text-base md:text-lg leading-relaxed text-mist">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
