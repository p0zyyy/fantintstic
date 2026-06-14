import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Tint Law Guide | Fantintstic",
  description:
    "A general guide to Singapore's vehicle window tint (VLT) rules and how detachable film helps you stay compliant. Not legal advice.",
};

const LAST_UPDATED = "15 June 2026";

const INTRO = [
  "This guide gives a general overview of vehicle window tint rules in Singapore and how our detachable film fits within them. It is provided for general information only and is not legal advice. Tint regulations can change, and the responsibility for compliance rests with the vehicle owner and driver.",
  "Always confirm the current requirements directly with the Land Transport Authority (LTA) via OneMotoring (onemotoring.lta.gov.sg) before applying tint or driving with it on Singapore roads.",
];

const SECTIONS: LegalSection[] = [
  {
    heading: "The Key Rule: Visible Light Transmission (VLT)",
    blocks: [
      {
        type: "p",
        text: "In Singapore, window tint is regulated by reference to Visible Light Transmission (VLT) — the percentage of visible light that passes through the glass and film combined. The higher the VLT, the lighter and more transparent the window; the lower the VLT, the darker it is.",
      },
      {
        type: "p",
        text: "As a general guide, the LTA currently requires a minimum VLT of around 70% for the front windscreen and the two front side windows, and around 50% for the rear windscreen and rear side windows. These figures are indicative only and may be updated — please verify the latest standard with the LTA before relying on them.",
      },
    ],
  },
  {
    heading: "What This Means for Darker Films",
    blocks: [
      {
        type: "p",
        text: "Films with a low VLT (for example, our darker shade options) significantly reduce the amount of light passing through the glass. Used on the front windscreen or front side windows, a dark film will usually bring the combined VLT below the legal minimum, and is therefore generally not permitted for those windows on vehicles driven on public roads.",
      },
      {
        type: "p",
        text: "Darker films may be acceptable on rear windows provided the combined VLT still meets the minimum requirement. You are responsible for checking the resulting VLT for each window before driving.",
      },
    ],
  },
  {
    heading: "How Detachable Film Helps You Stay Compliant",
    blocks: [
      {
        type: "p",
        text: "Because Fantintstic film is designed to be attached and removed by you, it gives you flexibility that permanent bonded tint does not:",
      },
      {
        type: "list",
        items: [
          "You can remove the film before driving on public roads or before a vehicle inspection, then reapply it when the vehicle is parked or used off-road.",
          "You can choose a lighter, road-legal VLT for windows where a permanent appearance is desired.",
          "You avoid the cost and residue of stripping permanent film if regulations change or your vehicle is sold.",
        ],
      },
      {
        type: "p",
        text: "The detachable design is a tool to help you comply — it does not, by itself, make any particular use lawful. Using a non-compliant film while driving on public roads remains your responsibility and may breach the law.",
      },
    ],
  },
  {
    heading: "Inspections and Enforcement",
    blocks: [
      {
        type: "p",
        text: "Vehicles in Singapore are subject to periodic inspection and roadside enforcement. Non-compliant window tint can result in your vehicle failing inspection, and may attract fines or other enforcement action under the Road Traffic Act and LTA regulations. Ensure your windows meet the required VLT before inspection or driving.",
      },
    ],
  },
  {
    heading: "Medical and Other Exemptions",
    blocks: [
      {
        type: "p",
        text: "The LTA may, in limited circumstances, grant exemptions (for example, on medical grounds) that allow darker tint. Any such exemption must be obtained from the LTA in advance and carried or displayed as required. We cannot grant or guarantee any exemption.",
      },
    ],
  },
  {
    heading: "Your Responsibility",
    blocks: [
      {
        type: "p",
        text: "By purchasing and using our Products, you acknowledge that you are responsible for ensuring your window tint complies with all applicable laws at the time you drive. Fantintstic is not liable for any fines, penalties, demerit points or other consequences resulting from non-compliant use. Please also see our Terms of Service.",
      },
    ],
  },
  {
    heading: "Disclaimer",
    blocks: [
      {
        type: "p",
        text: "This guide is provided for general information only and does not constitute legal advice. While we aim to keep it accurate, we make no warranty as to its completeness or currency. For authoritative and up-to-date requirements, consult the LTA or a qualified professional.",
      },
    ],
  },
];

export default function TintLawGuidePage() {
  return (
    <LegalPage
      title="Tint Law Guide"
      lastUpdated={LAST_UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
