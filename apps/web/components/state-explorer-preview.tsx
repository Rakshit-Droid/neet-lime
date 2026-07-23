import { IconArrowRight, IconMapPin } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"
import { IndiaChoropleth } from "@/components/india-choropleth"
import { statesSummary, PLATFORM_STATS, formatIndian } from "@/lib/predictors"

export function StateExplorerPreview() {
  const top = statesSummary().slice(0, 5)
  const stats = [
    { v: formatIndian(PLATFORM_STATS.colleges), k: "Colleges" },
    { v: PLATFORM_STATS.states, k: "States & UTs" },
    { v: PLATFORM_STATS.courses, k: "Courses" },
  ]

  return (
    <section id="states" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <IconMapPin className="size-3.5 text-primary" stroke={2} />
          Explore by State
        </span>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          Medical colleges across India 2026
        </h2>
        <p className="mt-4 text-muted-foreground">
          Discover NEET AIQ medical, dental, and nursing colleges in every state.
          Tap any state to explore its cutoff ranks and available seats.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <Reveal>
          <IndiaChoropleth />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-4">
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border bg-border">
            {stats.map((s) => (
              <div key={s.k} className="bg-card p-4 text-center">
                <dt className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">{s.v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.k}</dd>
              </div>
            ))}
          </dl>

          <div className="flex-1 rounded-2xl border glass-card p-2">
            <p className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Top states by colleges
            </p>
            <ul className="grid gap-1">
              {top.map((s, i) => (
                <li key={s.slug}>
                  <a href={`/states/${s.slug}`} className="flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-accent">
                    <div className="flex items-center gap-3">
                      <span className="grid size-6 place-items-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{s.state}</span>
                    </div>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-mono text-sm font-semibold text-foreground">{s.collegeCount}</span>
                      <IconArrowRight className="size-4" stroke={2} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="/states"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform duration-300 active:scale-[0.98]"
          >
            Explore All States
            <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" stroke={2.2} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
