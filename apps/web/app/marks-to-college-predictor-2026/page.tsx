import type { Metadata } from "next"
import { ToolPage } from "@/components/tool-page"

export const metadata: Metadata = {
  title: "Marks to College Predictor 2026 — Colleges from your NEET score",
  description:
    "Enter your NEET score and category to see matching government medical colleges directly, with your estimated All India Rank.",
}

export default function Page() {
  return (
    <ToolPage
      variant="marks-to-college"
      selfHref="/marks-to-college-predictor-2026"
      title="Marks to College Predictor 2026"
      subtitle="Skip the rank step. Enter your NEET score with category and course to jump straight to a tiered list of colleges, with your estimated rank shown alongside."
      notes={[
        "Converts your score to an estimated All India Rank, then matches colleges.",
        "Covers All India Quota MBBS, BDS, and B.Sc Nursing seats.",
        "Best used with your expected or actual NEET marks out of 720.",
      ]}
    />
  )
}
