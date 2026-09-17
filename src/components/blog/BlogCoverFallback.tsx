// Shown in place of a cover image for posts with no real photo — a
// branded gradient instead of either a broken/blank slot or a stock photo
// misrepresenting itself as real. Not decorative filler pretending to be
// content; just an honest "no photo for this one" treatment.
export function BlogCoverFallback({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-primary via-[#7d150f] to-black ${className}`}
    >
      <img src="/images/aceroyal-symbol-white.png" alt="" className="h-12 w-12 object-contain opacity-90" />
    </div>
  );
}
