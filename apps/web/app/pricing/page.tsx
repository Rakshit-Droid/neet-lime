import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Pricing } from "@/components/pricing"

export const metadata: Metadata = {
  title: "Pricing — NEET Companion Pro credits",
  description:
    "Free NEET predictors and explorer. Go Pro with credits to unlock the Choice-Filling Assistant and allotment-ready counselling lists.",
}

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-16">
        <Pricing />
      </main>
      <SiteFooter />
    </>
  )
}
