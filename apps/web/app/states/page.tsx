import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { StateExplorer } from "@/components/state-explorer"
import { IndiaChoropleth } from "@/components/india-choropleth"
import { statesSummary, PLATFORM_STATS, formatIndian } from "@/lib/predictors"

export const metadata: Metadata = {
  title: "State Explorer — NEET Medical Colleges by State",
  description:
    "Browse NEET medical colleges across every state and union territory. See college counts, cutoffs, and top colleges, filtered by region.",
}

export default function StatesPage() {
  const states = statesSummary()
  const stats = [
    { v: formatIndian(PLATFORM_STATS.colleges), k: "Colleges" },
    { v: PLATFORM_STATS.states, k: "States & UTs" },
    { v: PLATFORM_STATS.courses, k: "Courses" },
  ]

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 md:pt-32">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore medical colleges by state
          </h1>
          <p className="mt-4 text-muted-foreground">
            Every state and union territory, with college counts, best cutoffs, and
            top colleges. Filter by region, then drill into a state for its full
            directory.
          </p>
        </header>

        <dl className="mt-8 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border bg-border">
          {stats.map((s) => (
            <div key={s.k} className="bg-card p-4 text-center">
              <dt className="font-mono text-2xl font-semibold tracking-tight">{s.v}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{s.k}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <IndiaChoropleth />
          </div>
          <StateExplorer states={states} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
