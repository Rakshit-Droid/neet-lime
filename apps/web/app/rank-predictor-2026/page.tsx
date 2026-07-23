import type { Metadata } from "next"
import { ToolPage } from "@/components/tool-page"

export const metadata: Metadata = {
  title: "NEET Rank Predictor 2026 — Estimate your All India Rank",
  description:
    "Enter your expected NEET score to estimate your All India Rank, with a confidence range and percentile based on historical trends.",
}

export default function Page() {
  return (
    <ToolPage
      variant="rank-predictor"
      selfHref="/rank-predictor-2026"
      title="NEET Rank Predictor 2026"
      subtitle="Drag your expected NEET score to see the All India Rank it typically earns, with a confidence range and percentile drawn from historical result trends."
      notes={[
        "Maps your score out of 720 to an estimated All India Rank.",
        "Shows a range, not a single number, because cutoffs shift each year.",
        "Pair it with the college predictors to turn that rank into a seat list.",
      ]}
    />
  )
}
