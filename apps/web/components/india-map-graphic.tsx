import IndiaMapData from "@svg-maps/india"

interface SvgLocation {
  id: string
  name: string
  path: string
}
const INDIA = IndiaMapData as unknown as { viewBox: string; locations: SvgLocation[] }

// Static, decorative India silhouette in brand lime. Reliable (real geography,
// no stock imagery) and perfectly on-topic for the State Explorer.
export function IndiaMapGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={INDIA.viewBox}
      className={className}
      role="img"
      aria-label="Map of India"
      preserveAspectRatio="xMidYMid meet"
    >
      {INDIA.locations.map((loc) => (
        <path
          key={loc.id}
          d={loc.path}
          className="fill-primary/20 stroke-primary/40"
          strokeWidth={0.6}
        />
      ))}
    </svg>
  )
}
