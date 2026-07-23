import {
  IconBrain,
  IconTargetArrow,
  IconCompass,
  IconArrowUpRight,
} from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"

const CHAPTERS = [
  ["Human Physiology", 68],
  ["Organic Chemistry", 54],
  ["Genetics", 41],
] as const

export function Pillars() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Three things, done with unfair focus.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Not a content dump. A system that decides what you study next, then
          walks you into the seat that score earns.
        </p>
      </Reveal>

      {/* asymmetric bento: 1 large + 2, real visual variation */}
      <div className="mt-12 grid gap-4 md:grid-cols-6 md:grid-rows-2">
        {/* large: adaptive prep with a live mastery panel */}
        <Reveal className="md:col-span-4 md:row-span-2">
          <article className="flex h-full flex-col justify-between rounded-2xl border bg-card p-8">
            <div>
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <IconBrain className="size-6" stroke={1.8} />
              </span>
              <h3 className="mt-5 text-xl font-semibold">Adaptive preparation</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Every attempt is scored and tomorrow re-orders around the chapters
                costing you the most marks. Small batches, mentor calls, 94,000
                tagged questions.
              </p>
            </div>

            <div className="mt-8 rounded-xl border bg-background p-4">
              <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
                Today&rsquo;s priority
              </p>
              <ul className="space-y-2.5">
                {CHAPTERS.map(([name, mastery]) => (
                  <li key={name} className="flex items-center gap-3">
                    <span className="w-40 shrink-0 text-sm">{name}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${mastery}%` }}
                      />
                    </span>
                    <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                      {mastery}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>

        {/* predictors: tinted lime cell */}
        <Reveal className="md:col-span-2">
          <article className="flex h-full flex-col justify-between rounded-2xl border bg-primary/10 p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <IconTargetArrow className="size-6" stroke={1.8} />
            </span>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Precision predictors</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Marks to rank, rank to a real college shortlist. Category-aware.
              </p>
              <a
                href="#predictors"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
              >
                Try them
                <IconArrowUpRight className="size-4" stroke={2.2} />
              </a>
            </div>
          </article>
        </Reveal>

        {/* consultancy: neutral cell */}
        <Reveal className="md:col-span-2">
          <article className="flex h-full flex-col justify-between rounded-2xl border bg-card p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">
              <IconCompass className="size-6" stroke={1.8} />
            </span>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Admission consultancy</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Counsellors sit on the call through every round of choice-filling.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
