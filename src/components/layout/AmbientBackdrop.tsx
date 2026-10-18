// Drifting brand-red glow behind every page, plus a fine static grain so
// large black areas have depth. Pure CSS (see .ambient-* in globals.css):
// three gradient blobs drift on offset 24-40s loops, animating transform only,
// so it stays on the compositor and costs almost nothing per frame. Frozen
// for prefers-reduced-motion. Sits behind content (-z-10) and ignores
// pointer events.
export function AmbientBackdrop() {
  return (
    <div aria-hidden="true" className="ambient-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-blob ambient-blob--one" />
      <div className="ambient-blob ambient-blob--two" />
      <div className="ambient-blob ambient-blob--three" />
      <div className="ambient-grain" />
    </div>
  );
}
