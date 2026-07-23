import type { Metadata } from "next"
import { ToolPage } from "@/components/tool-page"

export const metadata: Metadata = {
  title: "NEET College Predictor 2026 — Score or Rank to Colleges",
  description:
    "Free NEET 2026 college predictor. Enter your score or All India Rank with category and course to see Safe, Moderate, and Reach government colleges.",
}

export default function Page() {
  return (
    <ToolPage
      variant="neet"
      selfHref="/neet-predictor-2026"
      title="NEET College Predictor 2026"
      subtitle="Enter a score or a rank, pick your category and course, and see the colleges you can realistically target, grouped into Safe, Moderate, and Reach tiers."
      notes={[
        "Works from either your expected NEET score or a known All India Rank.",
        "Covers All India Quota MBBS, BDS, and B.Sc Nursing seats.",
        "Tiers are based on last cycle's closing ranks per category, not a guarantee.",
      ]}
    />
  )
}
