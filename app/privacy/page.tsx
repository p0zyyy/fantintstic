import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Fantintstic",
  description:
    "How Fantintstic collects, uses, discloses and protects your personal data in accordance with Singapore's Personal Data Protection Act (PDPA).",
};

const LAST_UPDATED = "15 June 2026";

const INTRO = [
  "This Privacy Policy explains how Fantintstic (“we”, “our” or “us”) collects, uses, discloses and protects your personal data when you visit our website, contact us, or purchase our products. We are committed to handling your personal data in accordance with Singapore’s Personal Data Protection Act 2012 (the “PDPA”).",
  "By using our website or providing us with your personal data, you acknowledge that you have read and understood this Policy. If you do not agree with it, please do not use our website or services.",
];

const SECTIONS: LegalSection[] = [
  {
    heading: "Personal Data We Collect",
    blocks: [
      {
        type: "p",
        text: "“Personal data” means data, whether true or not, about an individual who can be identified from that data, or from that data and other information to which we have or are likely to have access. We may collect:",
      },
      {
        type: "list",
        items: [
          "Identity and contact data — your name, email address, phone number, and delivery or billing address.",
          "Order and transaction data — the products you purchase, order value, and correspondence relating to your orders. Card and payment details are handled directly by our third-party payment processors and are not stored by us.",
          "Communications — messages you send us via WhatsApp, email, contact forms or social media.",
          "Technical and usage data — IP address, browser type, device information, pages visited and similar analytics data collected automatically through cookies and similar technologies.",
        ],
      },
    ],
  },
  {
    heading: "How We Collect Personal Data",
    blocks: [
      {
        type: "list",
        items: [
          "Directly from you, when you place an order, contact us, or interact with our website or social channels.",
          "Automatically, through cookies and analytics tools when you browse our website.",
          "From third parties, such as payment processors, delivery partners and analytics providers, where you have engaged them or consented to such sharing.",
        ],
      },
    ],
  },
  {
    heading: "Purposes for Which We Use Your Personal Data",
    blocks: [
      {
        type: "p",
        text: "We collect, use and disclose your personal data for purposes for which you have given consent (or are deemed to have given consent under the PDPA), or as otherwise permitted by law, including to:",
      },
      {
        type: "list",
        items: [
          "process, fulfil and deliver your orders, and provide related customer support;",
          "respond to your enquiries and communicate with you about your orders or our products;",
          "process payments and manage returns, refunds and warranty claims;",
          "operate, maintain, improve and secure our website;",
          "send you marketing or promotional information about our products, where you have consented to receive it; and",
          "comply with applicable laws, regulations and lawful requests by public authorities.",
        ],
      },
    ],
  },
  {
    heading: "Consent and Withdrawal of Consent",
    blocks: [
      {
        type: "p",
        text: "Where required by the PDPA, we will obtain your consent before collecting, using or disclosing your personal data. In certain circumstances, we may rely on deemed consent or other exceptions permitted under the PDPA.",
      },
      {
        type: "p",
        text: "You may withdraw your consent to our continued use of your personal data at any time by contacting our Data Protection Officer (see section 11). Upon receiving your request, we will inform you of the likely consequences of withdrawal. Please note that withdrawing consent may mean we are unable to continue providing certain products or services to you.",
      },
    ],
  },
  {
    heading: "Disclosure of Personal Data",
    blocks: [
      {
        type: "p",
        text: "We do not sell your personal data. We may disclose your personal data to:",
      },
      {
        type: "list",
        items: [
          "service providers and partners who perform functions on our behalf, such as payment processing, delivery, IT hosting, analytics and marketing;",
          "professional advisers, regulators or law-enforcement agencies, where required or permitted by law; and",
          "a successor entity in connection with any merger, acquisition or sale of our business assets.",
        ],
      },
      {
        type: "p",
        text: "We require parties who handle personal data on our behalf to protect it to a standard comparable to that required under the PDPA.",
      },
    ],
  },
  {
    heading: "Transfer of Personal Data Outside Singapore",
    blocks: [
      {
        type: "p",
        text: "Some of our service providers may store or process personal data outside Singapore. Where we transfer personal data overseas, we will take reasonable steps to ensure that the receiving party provides a standard of protection comparable to that under the PDPA, in accordance with the Transfer Limitation Obligation.",
      },
    ],
  },
  {
    heading: "Protection and Retention of Personal Data",
    blocks: [
      {
        type: "p",
        text: "We make reasonable security arrangements to protect personal data in our possession or control against unauthorised access, collection, use, disclosure, copying, modification, disposal or similar risks.",
      },
      {
        type: "p",
        text: "We retain personal data only for as long as it is necessary to fulfil the purposes for which it was collected, or as required by applicable laws. When personal data is no longer needed, we will take reasonable steps to delete or anonymise it.",
      },
    ],
  },
  {
    heading: "Access and Correction",
    blocks: [
      {
        type: "p",
        text: "Subject to the PDPA, you may request access to the personal data we hold about you and information about how it has been used or disclosed, and you may request that we correct any error or omission. We may charge a reasonable fee for an access request and will inform you of the fee before processing it.",
      },
      {
        type: "p",
        text: "To make an access or correction request, please contact our Data Protection Officer (see section 11).",
      },
    ],
  },
  {
    heading: "Cookies and Analytics",
    blocks: [
      {
        type: "p",
        text: "Our website uses cookies and similar technologies to operate the site, remember your preferences, and understand how visitors use the site. You can manage or disable cookies through your browser settings, although some features of the site may not function properly as a result.",
      },
    ],
  },
  {
    heading: "Marketing and the Do Not Call Provisions",
    blocks: [
      {
        type: "p",
        text: "Where you have consented, we may send you marketing messages by email, SMS, WhatsApp or other channels. You may opt out at any time using the unsubscribe mechanism provided or by contacting us. We comply with the Do Not Call provisions of the PDPA and the Spam Control Act when sending marketing messages.",
      },
    ],
  },
  {
    heading: "Data Protection Officer",
    blocks: [
      {
        type: "p",
        text: "If you have any questions, feedback or requests regarding this Policy or your personal data, please contact our Data Protection Officer at dpo@fantintstic.com.",
      },
    ],
  },
  {
    heading: "Children’s Privacy",
    blocks: [
      {
        type: "p",
        text: "Our website and products are not directed at children, and we do not knowingly collect personal data from minors without appropriate parental or guardian consent. If you believe we have collected such data, please contact us so that we can take appropriate action.",
      },
    ],
  },
  {
    heading: "Changes to This Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Policy from time to time. The current version will always be posted on this page with the “Last updated” date above. Your continued use of our website or services after any changes constitutes acceptance of the revised Policy.",
      },
    ],
  },
  {
    heading: "Governing Law",
    blocks: [
      {
        type: "p",
        text: "This Policy is governed by and construed in accordance with the laws of Singapore.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
