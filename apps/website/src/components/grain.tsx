// Subtle SVG noise overlay applied site-wide for a tactile, film-grain feel.
// Inlined as a data URI so it costs zero network requests.
const NOISE_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04] mix-blend-overlay dark:opacity-[0.06]"
      style={{
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}
