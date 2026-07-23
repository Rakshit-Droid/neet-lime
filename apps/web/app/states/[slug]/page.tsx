import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { IconArrowLeft } from "@tabler/icons-react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import {
  statesSummary,
  collegesByState,
  rankToApproxMarks,
  formatIndian,
} from "@/lib/predictors"

export function generateStaticParams() {
  return statesSummary().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = collegesByState(slug)
  if (!data) return { title: "State not found — NEET Companion" }
  return {
    title: `${data.state} — NEET Medical Colleges & Cutoffs`,
    description: `Government NEET medical colleges in ${data.state} with approximate closing ranks and cutoff scores for MBBS, BDS, and Nursing.`,
  }
}

export default async function StateDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = collegesByState(slug)
  if (!data) notFound()

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 pt-28 pb-24 sm:px-6 md:pt-32">
        <a href="/states" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <IconArrowLeft className="size-4" stroke={2} />
          All states
        </a>

        <header className="mt-5">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Medical colleges in {data.state}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {data.colleges.length} tracked government and institute colleges, sorted
            by competitiveness. Cutoffs are approximate All India Quota closing data.
          </p>
        </header>

        <div className="mt-8 overflow-hidden rounded-2xl border">
          <div className="hidden grid-cols-[1fr_auto_auto] gap-4 border-b bg-muted/40 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
            <span>College</span>
            <span className="text-right">Closing rank</span>
            <span className="text-right">Cutoff score</span>
          </div>
          <ul className="divide-y">
            {data.colleges.map((c) => (
              <li key={`${c.name}-${c.city}`} className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4">
                <div className="min-w-0">
                  <p className="font-medium">{c.name}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                    <span>{c.city}</span>
                    <span className="size-1 rounded-full bg-border" />
                    <span>{c.type}</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.courses.map((course) => (
                      <span key={course} className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs text-muted-foreground sm:hidden">Closing rank: </span>
                  <span className="font-mono text-sm font-semibold">~{formatIndian(c.closing)}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs text-muted-foreground sm:hidden">Cutoff score: </span>
                  <span className="font-mono text-sm">{rankToApproxMarks(c.closing)}/720</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Indicative data for planning. Always confirm on the official MCC or state counselling portal.
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
