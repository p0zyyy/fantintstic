import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Warranty | Fantintstic",
  description:
    "Fantintstic's 30-day satisfaction guarantee and 6-month limited warranty against manufacturing defects on our detachable window film.",
};

const LAST_UPDATED = "28 June 2026";

const INTRO = [
  "We want you to be confident in your Fantintstic film. This page summarises the cover we provide and how to make a claim. It should be read together with our Terms of Service and does not affect your non-excludable statutory rights as a consumer under Singapore law.",
];

const SECTIONS: LegalSection[] = [
  {
    heading: "30-Day Satisfaction Guarantee",
    blocks: [
      {
        type: "p",
        text: "If you're not satisfied with your purchase, you may return it within 30 days of delivery for a refund, provided the film is returned in line with our returns process and in resaleable condition. Contact us first so we can guide you through the steps.",
      },
    ],
  },
  {
    heading: "6-Month Limited Warranty",
    blocks: [
      {
        type: "p",
        text: "For six months from the date of delivery, we warrant that the film is free from manufacturing defects in materials and workmanship under normal use. If a covered defect appears, we will repair or replace the affected panel, or refund it, at our discretion.",
      },
    ],
  },
  {
    heading: "What's Covered",
    blocks: [
      {
        type: "list",
        items: [
          "Manufacturing defects in the film material.",
          "Adhesive tabs that fail under normal use within the warranty period.",
          "Cutting or sizing errors on pre-cut sets supplied by us.",
        ],
      },
    ],
  },
  {
    heading: "What's Not Covered",
    blocks: [
      {
        type: "list",
        items: [
          "Damage from misuse, accidents, or improper installation or removal.",
          "Normal wear and tear, scratches, or marks from cleaning with unsuitable products.",
          "Loss or damage to film that has been altered, trimmed or modified after purchase.",
          "Any consequences of using the film in a manner that does not comply with applicable law, including window tint (VLT) requirements for use on public roads.",
        ],
      },
    ],
  },
  {
    heading: "How to Make a Claim",
    blocks: [
      {
        type: "p",
        text: "Reach us on WhatsApp using the “Get Yours” button on the site, or email support@fantintstic.com with your order details, a description of the issue and clear photos. Please keep your proof of purchase, as it may be required to process a claim.",
      },
    ],
  },
  {
    heading: "Your Statutory Rights",
    blocks: [
      {
        type: "p",
        text: "Nothing in this warranty limits or excludes your rights under Singapore law, including the Consumer Protection (Fair Trading) Act 2003 and the Sale of Goods Act 1979. This warranty is provided in addition to those rights.",
      },
    ],
  },
];

export default function WarrantyPage() {
  return (
    <LegalPage
      title="Warranty"
      eyebrow="Warranty"
      lastUpdated={LAST_UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
