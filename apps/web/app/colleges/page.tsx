import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { CollegeDirectory } from "@/components/college-directory"
import { COLLEGES, PLATFORM_STATS, formatIndian } from "@/lib/predictors"

export const metadata: Metadata = {
  title: "College Directory — NEET Medical Colleges & Cutoffs",
  description:
    "Search NEET medical colleges by name, city, state, region, and course. See approximate closing ranks and cutoff scores for MBBS, BDS, and Nursing.",
}

export default function CollegesPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 pt-28 pb-24 sm:px-6 md:pt-32">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            College directory
          </h1>
          <p className="mt-4 text-muted-foreground">
            {formatIndian(PLATFORM_STATS.colleges)} tracked colleges across{" "}
            {PLATFORM_STATS.states} states. Search and filter by region and course,
            then sort into your own shortlist.
          </p>
        </header>

        <div className="mt-8">
          <CollegeDirectory colleges={COLLEGES} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
