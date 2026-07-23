// Shared nav/footer link data. Plain module (not a client component) so it can
// be imported as real values by both Server and Client Components.

export const PREDICTOR_LINKS = [
  { label: "NEET Predictor", href: "/neet-predictor-2026", desc: "Score or rank to colleges" },
  { label: "Rank to College Predictor", href: "/rank-to-college-predictor-2026", desc: "Colleges from your AIR" },
  { label: "Marks to College Predictor", href: "/marks-to-college-predictor-2026", desc: "Colleges from your score" },
  { label: "Rank Predictor", href: "/rank-predictor-2026", desc: "Estimate your AIR from marks" },
  { label: "Choice-Filling Assistant", href: "/choice-filling", desc: "Pro · allotment-ready preference list" },
]

export const EXPLORE_LINKS = [
  { label: "States", href: "/states", desc: "Browse colleges by state" },
  { label: "Colleges", href: "/colleges", desc: "The full directory" },
]
