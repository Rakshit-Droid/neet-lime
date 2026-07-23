"use client"

import { useMemo, useState } from "react"
import { IconSearch } from "@tabler/icons-react"
import {
  REGIONS,
  COURSES,
  regionOf,
  slugify,
  formatIndian,
  rankToApproxMarks,
  type College,
  type Region,
  type Course,
} from "@/lib/predictors"

export function CollegeDirectory({ colleges }: { colleges: College[] }) {
  const [q, setQ] = useState("")
  const [region, setRegion] = useState<Region | "All">("All")
  const [course, setCourse] = useState<Course | "All">("All")

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return colleges
      .filter((c) => (region === "All" ? true : regionOf(c.state) === region))
      .filter((c) => (course === "All" ? true : c.courses.includes(course)))
      .filter((c) =>
        query === ""
          ? true
          : `${c.name} ${c.city} ${c.state}`.toLowerCase().includes(query),
      )
      .sort((a, b) => a.closing - b.closing)
  }, [colleges, q, region, course])

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div className="flex items-center gap-2 rounded-lg border bg-background px-3 focus-within:ring-2 focus-within:ring-primary/40">
          <IconSearch className="size-4 text-muted-foreground" stroke={2} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search college, city, or state"
            aria-label="Search colleges"
            className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value as Region | "All")}
          aria-label="Filter by region"
          className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="All">All regions</option>
          {REGIONS.map((r) => (<option key={r} value={r}>{r}</option>))}
        </select>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value as Course | "All")}
          aria-label="Filter by course"
          className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="All">All courses</option>
          {COURSES.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "college" : "colleges"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed py-12 text-center">
          <p className="text-sm text-muted-foreground">No colleges match those filters. Try widening the search.</p>
        </div>
      ) : (
        <ul className="mt-4 grid gap-3">
          {filtered.map((c) => (
            <li key={`${c.name}-${c.city}`} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card px-5 py-4">
              <div className="min-w-0">
                <p className="font-medium">{c.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {c.city} ·{" "}
                  <a href={`/states/${slugify(c.state)}`} className="hover:text-foreground hover:underline">
                    {c.state}
                  </a>{" "}
                  · {c.type}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.courses.map((course) => (
                    <span key={course} className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-semibold">~{formatIndian(c.closing)}</p>
                <p className="text-xs text-muted-foreground">{rankToApproxMarks(c.closing)}/720 cutoff</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
