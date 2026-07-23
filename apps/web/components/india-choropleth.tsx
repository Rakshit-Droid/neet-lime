"use client"

import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import IndiaMapData from "@svg-maps/india"
import { statesSummary } from "@/lib/predictors"

interface SvgLocation {
  id: string
  name: string
  path: string
}
const INDIA = IndiaMapData as unknown as { viewBox: string; locations: SvgLocation[] }

type Metric = "colleges" | "cutoff"
interface Datum {
  slug: string
  colleges: number
  cutoff: number
}

export function IndiaChoropleth() {
  const router = useRouter()
  const [metric, setMetric] = useState<Metric>("colleges")
  const [hover, setHover] = useState<{ name: string; datum: Datum | null } | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const wrapRef = useRef<HTMLDivElement>(null)

  const { byState, maxColleges, minCutoff, maxCutoff } = useMemo(() => {
    const m = new Map<string, Datum>()
    const summ = statesSummary()
    for (const s of summ) {
      m.set(s.state, { slug: s.slug, colleges: s.collegeCount, cutoff: s.bestCutoffMarks })
    }
    const cols = summ.map((s) => s.collegeCount)
    const cuts = summ.map((s) => s.bestCutoffMarks)
    return {
      byState: m,
      maxColleges: Math.max(1, ...cols),
      minCutoff: cuts.length ? Math.min(...cuts) : 0,
      maxCutoff: Math.max(1, ...cuts),
    }
  }, [])

  function intensity(d: Datum): number {
    if (metric === "colleges") return d.colleges / maxColleges
    const span = Math.max(1, maxCutoff - minCutoff)
    return (d.cutoff - minCutoff) / span
  }

  function fillFor(name: string): string {
    const d = byState.get(name)
    if (!d) return "var(--muted)"
    const pct = Math.round(18 + intensity(d) * 78)
    return `color-mix(in oklch, var(--primary) ${pct}%, var(--card))`
  }

  function go(name: string) {
    const d = byState.get(name)
    if (d) router.push(`/states/${d.slug}`)
  }

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="mb-3 inline-flex rounded-lg border bg-background p-1 text-xs">
        {(["colleges", "cutoff"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMetric(m)}
            aria-pressed={metric === m}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              metric === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {m === "colleges" ? "By Colleges" : "By Cutoff"}
          </button>
        ))}
      </div>

      <div
        ref={wrapRef}
        className="relative"
        onMouseMove={(e) => {
          const r = wrapRef.current?.getBoundingClientRect()
          if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
        }}
        onMouseLeave={() => setHover(null)}
      >
        <svg
          viewBox={INDIA.viewBox}
          className="mx-auto h-auto w-full max-w-sm"
          role="img"
          aria-label="Map of India showing NEET medical colleges by state"
        >
          {INDIA.locations.map((loc) => {
            const d = byState.get(loc.name)
            const has = !!d
            return (
              <path
                key={loc.id}
                d={loc.path}
                fill={fillFor(loc.name)}
                stroke="var(--border)"
                strokeWidth={0.5}
                tabIndex={has ? 0 : -1}
                role={has ? "button" : undefined}
                aria-label={
                  has ? `${loc.name}: ${d!.colleges} colleges, best cutoff ${d!.cutoff}` : `${loc.name}: no data`
                }
                className={
                  has
                    ? "cursor-pointer outline-none transition-[fill,opacity] duration-200 hover:opacity-80 focus-visible:stroke-foreground focus-visible:[stroke-width:2]"
                    : "transition-[fill] duration-200"
                }
                onMouseEnter={() => setHover({ name: loc.name, datum: d ?? null })}
                onFocus={(e) => {
                  const pathRect = e.currentTarget.getBoundingClientRect()
                  const wrapRect = wrapRef.current?.getBoundingClientRect()
                  if (wrapRect) {
                    setPos({
                      x: pathRect.left + pathRect.width / 2 - wrapRect.left,
                      y: pathRect.top - wrapRect.top,
                    })
                  }
                  setHover({ name: loc.name, datum: d ?? null })
                }}
                onBlur={() => setHover(null)}
                onClick={() => go(loc.name)}
                onKeyDown={(e) => {
                  if (has && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault()
                    go(loc.name)
                  }
                }}
              />
            )
          })}
        </svg>

        {hover && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border bg-popover px-3 py-2 text-xs shadow-lg"
            style={{ left: pos.x, top: pos.y - 8 }}
          >
            <p className="font-semibold">{hover.name}</p>
            {hover.datum ? (
              <p className="text-muted-foreground">
                {hover.datum.colleges} colleges · best {hover.datum.cutoff}/720
              </p>
            ) : (
              <p className="text-muted-foreground">No tracked colleges</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>{metric === "colleges" ? "Fewer" : "Lower"}</span>
          <span
            className="h-2 w-24 rounded-full"
            style={{ background: "linear-gradient(to right, color-mix(in oklch, var(--primary) 18%, var(--card)), var(--primary))" }}
          />
          <span>{metric === "colleges" ? "More" : "Higher"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full border" style={{ background: "var(--muted)" }} />
          <span>No data</span>
        </div>
      </div>
    </div>
  )
}
