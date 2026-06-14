import Link from "next/link";
import Wordmark from "./Wordmark";
import Footer from "./Footer";

/**
 * Shared layout + typography for the static legal pages (Privacy, Terms, Tint
 * Law Guide). Content is supplied as plain-string data so the documents stay
 * easy to edit and free of JSX-escaping pitfalls. A light header links back to
 * the main site; the full Footer (which also links between the legal pages)
 * sits at the bottom for consistency.
 */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro?: string[];
  sections: LegalSection[];
}

export default function LegalPage({
  title,
  lastUpdated,
  intro = [],
  sections,
}: LegalPageProps) {
  return (
    <>
      <header className="border-b border-graphite">
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-[5vw] py-6">
          <Link href="/" aria-label="Fantintstic — home">
            <Wordmark className="text-2xl font-black tracking-crush" />
          </Link>
          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-ash transition-colors hover:text-paper"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[800px] px-[5vw] py-[12vh]">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-ash">Legal</p>
        <h1 className="mb-5 text-5xl font-black leading-[0.95] tracking-crush">
          {title}
        </h1>
        <p className="mb-12 text-sm text-ash">Last updated: {lastUpdated}</p>

        {intro.map((p, i) => (
          <p key={i} className="mb-5 leading-relaxed text-mist">
            {p}
          </p>
        ))}

        {sections.map((section, i) => (
          <section key={i} className="mt-12">
            <h2 className="mb-4 text-2xl font-black tracking-tightest">
              {`${i + 1}. ${section.heading}`}
            </h2>
            {section.blocks.map((block, j) => {
              if (block.type === "h3") {
                return (
                  <h3
                    key={j}
                    className="mb-3 mt-6 text-lg font-bold text-paper"
                  >
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "list") {
                return (
                  <ul
                    key={j}
                    className="mb-5 list-disc space-y-2 pl-6 text-mist"
                  >
                    {block.items.map((item, k) => (
                      <li key={k} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={j} className="mb-5 leading-relaxed text-mist">
                  {block.text}
                </p>
              );
            })}
          </section>
        ))}
      </main>

      <Footer />
    </>
  );
}
