import type { Metadata } from "next"
import { ToolPage } from "@/components/tool-page"

export const metadata: Metadata = {
  title: "Rank to College Predictor 2026 — Colleges from your NEET AIR",
  description:
    "Enter your NEET All India Rank and category to see which government medical colleges you can get, grouped into Safe, Moderate, and Reach.",
}

export default function Page() {
  return (
    <ToolPage
      variant="rank-to-college"
      selfHref="/rank-to-college-predictor-2026"
      title="Rank to College Predictor 2026"
      subtitle="Already have your All India Rank? Enter it with your category and course to get a tiered college shortlist you can take into counselling."
      notes={[
        "Uses your exact All India Rank against per-category closing ranks.",
        "Filter by MBBS, BDS, or B.Sc Nursing.",
        "Safe, Moderate, and Reach reflect how comfortably your rank clears each cutoff.",
      ]}
    />
  )
}
