// Animated hourglass. Lime sand drains top to bottom, the timer flips over to
// reset, and it loops seamlessly. Pure SVG; the keyframes live in
// app/hourglass.css (imported by the root layout) so there is no raw <style>
// inside a React component. Honors prefers-reduced-motion (freezes half-full).

const TOP_INTERIOR =
  "M54 95 C50 80 14 74 14 46 C14 22 36 15 60 15 C84 15 106 22 106 46 C106 74 70 80 66 95 Z"
const BOT_INTERIOR =
  "M54 96 C50 111 14 117 14 145 C14 169 36 176 60 176 C84 176 106 169 106 145 C106 117 70 111 66 96 Z"

export function Hourglass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 191" className={className} role="img" aria-label="Animated hourglass timer">
      <defs>
        <clipPath id="hg-top-clip">
          <path d={TOP_INTERIOR} />
        </clipPath>
        <clipPath id="hg-bot-clip">
          <path d={BOT_INTERIOR} />
        </clipPath>
      </defs>

      <g className="hg-flip">
        {/* glass chambers */}
        <path d={TOP_INTERIOR} className="fill-muted/20 stroke-foreground/25" strokeWidth={2.5} />
        <path d={BOT_INTERIOR} className="fill-muted/20 stroke-foreground/25" strokeWidth={2.5} />

        {/* end caps */}
        <rect x={26} y={7} width={68} height={7} rx={3.5} className="fill-foreground/40" />
        <rect x={26} y={177} width={68} height={7} rx={3.5} className="fill-foreground/40" />

        {/* sand */}
        <g clipPath="url(#hg-top-clip)">
          <rect x={13} y={15} width={94} height={81} className="hg-top fill-primary" />
        </g>
        <g clipPath="url(#hg-bot-clip)">
          <rect x={13} y={96} width={94} height={81} className="hg-bot fill-primary" />
        </g>

        {/* falling stream */}
        <rect x={58} y={90} width={4} height={64} rx={2} className="hg-stream fill-primary" />
      </g>
    </svg>
  )
}
