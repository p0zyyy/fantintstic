/**
 * Brand wordmark — "Fantintstic".
 *
 * The name hides the word "tint", so by default we lean into that pun in a
 * strictly-monochrome way: the outer letters sit in gray (ash) while the
 * "tint" in the middle stays full white, making the eye read the product
 * right out of the logo. Pass `emphasis={false}` for a flat single-color
 * wordmark (e.g. where the surrounding context is already low-contrast).
 *
 * Intended to render on dark backgrounds (the whole site is black-based).
 */
export default function Wordmark({
  className = "",
  emphasis = true,
  registered = true,
}: {
  className?: string;
  emphasis?: boolean;
  registered?: boolean;
}) {
  const reg = registered ? (
    <span className="align-super text-[0.45em] text-ash">®</span>
  ) : null;

  if (!emphasis) {
    return (
      <span className={className}>
        Fantintstic{reg}
      </span>
    );
  }

  return (
    <span className={className}>
      <span className="text-ash">Fan</span>
      {/* "tint" inherits the element colour (white on dark) so it pops */}
      tint
      <span className="text-ash">stic</span>
      {reg}
    </span>
  );
}
