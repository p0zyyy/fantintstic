import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "About | Fantintstic",
  description:
    "Fantintstic makes detachable, reusable car window tint — premium nano-ceramic film you can put on and peel off in minutes, with zero residue.",
};

const INTRO = [
  "Fantintstic was started by drivers who were tired of the trade-off. Permanent tint meant choosing between the heat, the glare and your privacy on one side, and staying on the right side of the law on the other. Once it was on the glass, you were stuck with it — through inspections, resale and every change in the rules.",
  "So we built tint that comes off. Premium nano-ceramic film, pre-cut to your exact vehicle, held in place by a few discreet 3M tabs along the top of each window. It blocks the heat and UV you'd expect from a quality tint, then lifts away clean whenever you choose. No heat guns, no installer fees, no commitment.",
];

const SECTIONS: LegalSection[] = [
  {
    heading: "What we make",
    blocks: [
      {
        type: "p",
        text: "Every set is nano-ceramic film cut to your year, make and model, so it sits flush and looks factory once the windows are up. It rejects up to 99% of infrared heat and blocks 99% of UV, keeping your cabin cooler and your interior protected — without bonding to the glass.",
      },
    ],
  },
  {
    heading: "Why detachable matters",
    blocks: [
      {
        type: "p",
        text: "Tint laws vary by region and change often. Because Fantintstic peels off in minutes, you decide how much shade to run and when. Roll it on for a hot day at an outdoor car park, peel it down for an inspection or a checkpoint, and store it flat behind a seat between seasons.",
      },
      {
        type: "p",
        text: "The same flexibility follows the car through its life. Sell with factory-clean glass and keep the tint for the next vehicle, or move it on with the car — the choice stays yours.",
      },
    ],
  },
  {
    heading: "Built in Singapore",
    blocks: [
      {
        type: "p",
        text: "We're a Singapore-based business and we design for local conditions — strong sun, hot car parks, and clear VLT and road-safety rules. Drivers remain responsible for complying with the requirements that apply to them, and our Tint Law Guide is there to help you make an informed choice.",
      },
    ],
  },
  {
    heading: "Talk to us",
    blocks: [
      {
        type: "p",
        text: "Questions about fit, shade options or your specific vehicle? Reach us on WhatsApp using the “Get Yours” button anywhere on the site, or email support@fantintstic.com. We'd love to help you tint on your terms.",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <LegalPage
      title="About Fantintstic"
      eyebrow="Company"
      intro={INTRO}
      sections={SECTIONS}
      numbered={false}
    />
  );
}
