"use client"

import { useMemo, useState } from "react"
import { IconMapPin, IconArrowRight } from "@tabler/icons-react"
import { REGIONS, type Region, type StateSummary } from "@/lib/predictors"

export function StateExplorer({ states }: { states: StateSummary[] }) {
  const [region, setRegion] = useState<Region | "All">("All")

  const filtered = useMemo(
    () => (region === "All" ? states : states.filter((s) => s.region === region)),
    [region, states],
  )

  return (
    <div>
      {/* region filter */}
      <div className="flex flex-wrap gap-2">
        {(["All", ...REGIONS] as const).map((r) => {
          const active = region === r
          return (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {states.length} states &amp; UTs
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <a
            key={s.slug}
            href={`/states/${s.slug}`}
            className="group flex flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-lg bg-primary/12 text-primary">
                  <IconMapPin className="size-4" stroke={2} />
                </span>
                <div>
                  <p className="font-semibold leading-tight">{s.state}</p>
                  <p className="text-xs text-muted-foreground">{s.region}</p>
                </div>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                {s.collegeCount} colleges
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Best cutoff</dt>
                <dd className="font-mono font-semibold">{s.bestCutoffMarks}/720</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Courses</dt>
                <dd className="font-medium">{s.courses.length}</dd>
              </div>
            </dl>

            <p className="mt-3 truncate text-xs text-muted-foreground">Top: {s.topCollege}</p>

            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              View colleges
              <IconArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" stroke={2.2} />
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
