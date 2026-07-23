"use client"

import { Reveal } from "@/components/reveal"
import { Counter } from "@/components/counter"
import { formatIndian } from "@/lib/predictors"

interface Stat {
  to: number
  format?: (n: number) => string
  suffix?: string
  decimals?: number
  label: string
}

const STATS: Stat[] = [
  { to: 1428, format: (n) => formatIndian(n), label: "students scored above 650 in 2024" },
  { to: 9, suffix: " min", label: "median doubt resolution by faculty" },
  { to: 8200, format: (n) => formatIndian(n), suffix: "+", label: "hours of recorded lessons" },
  { to: 96.4, suffix: "%", decimals: 1, label: "would recommend to a junior" },
]

export function Results() {
  return (
    <section id="results" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Numbers we can defend in an audit.
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            No rounded-up vanity figures. Verified admissions across government,
            deemed, and state-quota seats, counted the boring, honest way.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.label} className="bg-card p-8">
                <dt className="font-mono text-4xl font-semibold tracking-tight sm:text-5xl">
                  <Counter to={s.to} format={s.format} decimals={s.decimals ?? 0} />
                  {s.suffix && <span className="text-primary">{s.suffix}</span>}
                </dt>
                <dd className="mt-3 text-sm text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
