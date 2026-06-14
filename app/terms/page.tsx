import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Fantintstic",
  description:
    "The terms governing your use of the Fantintstic website and purchase of our detachable window film, under Singapore law.",
};

const LAST_UPDATED = "15 June 2026";

const INTRO = [
  "These Terms of Service (“Terms”) govern your access to and use of the Fantintstic website and your purchase of our products. Please read them carefully. By accessing our website or placing an order, you agree to be bound by these Terms.",
  "Fantintstic (“we”, “our” or “us”) is a business based in Singapore. If you do not agree to these Terms, please do not use our website or purchase our products.",
];

const SECTIONS: LegalSection[] = [
  {
    heading: "Definitions",
    blocks: [
      {
        type: "list",
        items: [
          "“Products” means the detachable window films and related items offered for sale by Fantintstic.",
          "“You” or “Customer” means the person accessing our website or purchasing our Products.",
          "“Website” means our website and any related pages or content operated by us.",
        ],
      },
    ],
  },
  {
    heading: "Eligibility",
    blocks: [
      {
        type: "p",
        text: "By using our website or purchasing our Products, you confirm that you are at least 18 years old, or are accessing the website under the supervision of a parent or legal guardian, and that you are able to enter into a legally binding contract.",
      },
    ],
  },
  {
    heading: "Products and Descriptions",
    blocks: [
      {
        type: "p",
        text: "We take care to describe and display our Products accurately. However, product images, colours, shade percentages and finishes are shown for illustration and may vary slightly due to screen settings, manufacturing tolerances and the glass to which they are applied. Slight variations do not constitute a defect.",
      },
    ],
  },
  {
    heading: "Orders, Pricing and Payment",
    blocks: [
      {
        type: "list",
        items: [
          "All orders are subject to acceptance and availability. We may decline or cancel an order at our discretion, including where there is an error in pricing or product information.",
          "Prices are stated in Singapore Dollars (SGD). Where Goods and Services Tax (GST) applies, this will be indicated at checkout.",
          "Payment is processed through third-party payment providers. By submitting payment information, you represent that you are authorised to use the payment method.",
        ],
      },
    ],
  },
  {
    heading: "Shipping and Delivery",
    blocks: [
      {
        type: "p",
        text: "We will make reasonable efforts to deliver Products within the estimated timeframes indicated at checkout. Delivery times are estimates only and are not guaranteed. Risk in the Products passes to you on delivery.",
      },
    ],
  },
  {
    heading: "Returns, Refunds and Warranty",
    blocks: [
      {
        type: "p",
        text: "We offer a 30-day satisfaction guarantee and a 6-month limited warranty against manufacturing defects, on the terms communicated at the point of sale. To be eligible, Products must be returned in line with our returns process.",
      },
      {
        type: "p",
        text: "Nothing in these Terms affects your statutory rights as a consumer under Singapore law, including the Consumer Protection (Fair Trading) Act 2003 and the Sale of Goods Act 1979, which cannot be excluded or limited.",
      },
      {
        type: "p",
        text: "Our warranty does not cover damage caused by misuse, improper installation or removal, accidents, normal wear and tear, or use of the Products in a manner that does not comply with applicable law.",
      },
    ],
  },
  {
    heading: "Regulatory Compliance and Use of Products",
    blocks: [
      {
        type: "p",
        text: "Our Products are detachable and are designed to be applied and removed by you. You are solely responsible for ensuring that your use of the Products complies with all applicable laws and regulations, including the vehicle window tint (Visible Light Transmission) requirements set by the Land Transport Authority (LTA) and the Road Traffic Act for use on Singapore roads.",
      },
      {
        type: "p",
        text: "It is your responsibility to confirm the current legal requirements before applying or driving with our Products on any vehicle used on public roads. Where a Product does not meet the legal tint requirements for a given window, it must not be used on that window while the vehicle is driven on public roads.",
      },
      {
        type: "p",
        text: "To the fullest extent permitted by law, Fantintstic accepts no liability for any fines, penalties, demerit points, inspection failures, enforcement action or other consequences arising from your use of the Products in a manner that does not comply with applicable law. Please refer to our Tint Law Guide for general guidance.",
      },
    ],
  },
  {
    heading: "Acceptable Use of the Website",
    blocks: [
      {
        type: "p",
        text: "You agree not to use our website for any unlawful purpose, to interfere with its operation or security, to attempt to gain unauthorised access to our systems, or to copy, scrape or misuse its content.",
      },
    ],
  },
  {
    heading: "Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "All content on the website, including the Fantintstic name, logo, text, graphics, images and designs, is owned by or licensed to us and is protected by intellectual property laws. You may not use, reproduce or distribute any of it without our prior written permission.",
      },
    ],
  },
  {
    heading: "Disclaimers",
    blocks: [
      {
        type: "p",
        text: "Our website and Products are provided on an “as is” and “as available” basis. To the fullest extent permitted by law, and without affecting your non-excludable statutory rights, we make no warranties or representations of any kind, whether express or implied, regarding the website or the Products, including as to merchantability, fitness for a particular purpose, or uninterrupted or error-free operation of the website.",
      },
    ],
  },
  {
    heading: "Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "To the fullest extent permitted by law, and except for liability that cannot be excluded under Singapore law, Fantintstic shall not be liable for any indirect, incidental, special or consequential loss, or any loss of profits, revenue, data or goodwill, arising out of or in connection with your use of the website or Products.",
      },
      {
        type: "p",
        text: "Our total aggregate liability arising out of or in connection with the website or any Product shall not exceed the amount you paid for the Product giving rise to the claim.",
      },
    ],
  },
  {
    heading: "Indemnity",
    blocks: [
      {
        type: "p",
        text: "You agree to indemnify and hold harmless Fantintstic and its officers, employees and agents from and against any claims, losses, liabilities, damages, costs and expenses (including reasonable legal fees) arising out of or in connection with your breach of these Terms or your use of the Products in a manner that does not comply with applicable law.",
      },
    ],
  },
  {
    heading: "Third-Party Links and Services",
    blocks: [
      {
        type: "p",
        text: "Our website may contain links to third-party websites or services, including WhatsApp and payment providers. We are not responsible for the content, policies or practices of those third parties, and your use of them is at your own risk and subject to their terms.",
      },
    ],
  },
  {
    heading: "Termination",
    blocks: [
      {
        type: "p",
        text: "We may suspend or terminate your access to the website at any time, without notice, where we reasonably believe you have breached these Terms or applicable law.",
      },
    ],
  },
  {
    heading: "Changes to These Terms",
    blocks: [
      {
        type: "p",
        text: "We may update these Terms from time to time. The current version will always be posted on this page with the “Last updated” date above. Your continued use of the website or purchase of Products after any changes constitutes acceptance of the revised Terms.",
      },
    ],
  },
  {
    heading: "Governing Law and Jurisdiction",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by and construed in accordance with the laws of Singapore. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Singapore. The parties may first seek to resolve any dispute amicably, including through mediation at the Singapore Mediation Centre.",
      },
    ],
  },
  {
    heading: "General",
    blocks: [
      {
        type: "list",
        items: [
          "If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.",
          "Our failure to enforce any right or provision of these Terms will not constitute a waiver of that right or provision.",
          "These Terms constitute the entire agreement between you and us regarding the website and Products, and supersede any prior agreements.",
        ],
      },
    ],
  },
  {
    heading: "Contact",
    blocks: [
      {
        type: "p",
        text: "If you have any questions about these Terms, please contact us at support@fantintstic.com.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
