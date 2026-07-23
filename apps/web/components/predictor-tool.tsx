"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { IconSearch, IconBuildingHospital, IconInfoCircle, IconListNumbers, IconArrowRight } from "@tabler/icons-react"
import {
  marksToRank,
  rankToColleges,
  formatIndian,
  CATEGORIES,
  COURSES,
  MAX_MARKS,
  type Category,
  type Course,
  type Tier,
  type CollegeMatch,
} from "@/lib/predictors"
import { Counter } from "@/components/counter"

export type PredictorVariant =
  | "neet"
  | "rank-to-college"
  | "marks-to-college"
  | "rank-predictor"

const TIER_META: { tier: Tier; label: string; dot: string; chip: string }[] = [
  { tier: "Safe", label: "Safe", dot: "bg-primary", chip: "bg-primary/12 text-primary" },
  { tier: "Moderate", label: "Moderate", dot: "bg-amber-500", chip: "bg-amber-500/12 text-amber-600 dark:text-amber-400" },
  { tier: "Reach", label: "Reach", dot: "bg-destructive", chip: "bg-destructive/12 text-destructive" },
]

function verdictFor(air: number): string {
  if (air <= 1000) return "Elite govt seat range"
  if (air <= 15000) return "Strong govt MBBS shot"
  if (air <= 60000) return "State / deemed in reach"
  if (air <= 150000) return "Counselling strategy critical"
  return "Rework the weak chapters"
}

export function PredictorTool({ variant }: { variant: PredictorVariant }) {
  const showsColleges = variant !== "rank-predictor"
  const hasModeToggle = variant === "neet"
  const fixedMarks = variant === "marks-to-college" || variant === "rank-predictor"

  const [mode, setMode] = useState<"marks" | "rank">(fixedMarks ? "marks" : "rank")
  const [marks, setMarks] = useState(600)
  const [rankStr, setRankStr] = useState("5000")
  const [category, setCategory] = useState<Category>("General")
  const [course, setCourse] = useState<Course>("MBBS")

  const effMode = hasModeToggle ? mode : fixedMarks ? "marks" : "rank"
  const rankNum = Number(rankStr.replace(/[^0-9]/g, "")) || 0
  const pred = useMemo(() => marksToRank(marks), [marks])
  const effRank = effMode === "marks" ? pred.air : rankNum

  const result = useMemo(
    () =>
      showsColleges && effRank > 0
        ? rankToColleges(effRank, category, course)
        : { matches: [] as CollegeMatch[], total: 0 },
    [showsColleges, effRank, category, course],
  )

  const groups = useMemo(() => {
    const g: Record<Tier, CollegeMatch[]> = { Safe: [], Moderate: [], Reach: [] }
    for (const m of result.matches) g[m.tier].push(m)
    return g
  }, [result])

  const pct = (marks / MAX_MARKS) * 100

  return (
    <div className="rounded-2xl border glass-card p-6 shadow-sm">
      {/* mode toggle (NEET predictor only) */}
      {hasModeToggle && (
        <div className="mb-5 inline-flex rounded-lg border bg-background p-1 text-sm">
          {(["marks", "rank"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-4 py-1.5 font-medium transition-colors ${
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {m === "marks" ? "I have marks" : "I have a rank"}
            </button>
          ))}
        </div>
      )}

      {/* inputs */}
      {effMode === "marks" ? (
        <div>
          <div className="flex items-end justify-between">
            <label htmlFor="pt-marks" className="text-sm text-muted-foreground">
              Expected NEET score
            </label>
            <div className="font-mono text-2xl font-semibold tabular-nums">
              {marks}
              <span className="text-sm text-muted-foreground">/{MAX_MARKS}</span>
            </div>
          </div>
          <input
            id="pt-marks"
            type="range"
            min={0}
            max={MAX_MARKS}
            value={marks}
            onChange={(e) => setMarks(Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background"
            style={{ background: `linear-gradient(to right, var(--primary) ${pct}%, var(--muted) ${pct}%)` }}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label htmlFor="pt-rank" className="text-sm text-muted-foreground">
            Your All India Rank
          </label>
          <div className="flex items-center gap-2 rounded-lg border bg-background px-3 focus-within:ring-2 focus-within:ring-primary/40">
            <IconSearch className="size-4 text-muted-foreground" stroke={2} />
            <input
              id="pt-rank"
              inputMode="numeric"
              value={rankStr}
              onChange={(e) => setRankStr(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full bg-transparent py-2.5 font-mono text-base outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      {/* category + course (college variants only) */}
      {showsColleges && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pt-cat" className="text-xs text-muted-foreground">Category</label>
            <select
              id="pt-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            >
              {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pt-course" className="text-xs text-muted-foreground">Course</label>
            <select
              id="pt-course"
              value={course}
              onChange={(e) => setCourse(e.target.value as Course)}
              className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            >
              {COURSES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
        </div>
      )}

      {/* ---------- rank predictor output ---------- */}
      {variant === "rank-predictor" && (
        <div className="mt-6 rounded-xl bg-muted/50 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Predicted All India Rank</p>
          <div className="mt-1 font-mono text-4xl font-semibold tracking-tight text-primary">
            <Counter to={pred.air} live format={(n) => formatIndian(n)} />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-mono text-muted-foreground">
              Range {formatIndian(pred.low)} to {formatIndian(pred.high)}
            </span>
            <span className="font-medium">{verdictFor(pred.air)}</span>
          </div>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            approx {pred.percentile}th percentile
          </p>
        </div>
      )}

      {/* ---------- college output ---------- */}
      {showsColleges && (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {effRank > 0 ? (
                <>
                  <span className="font-mono font-semibold text-foreground">
                    <Counter to={result.total} live />
                  </span>{" "}
                  colleges match
                  {effMode === "marks" && (
                    <> at approx AIR <span className="font-mono font-semibold text-foreground">{formatIndian(effRank)}</span></>
                  )}
                </>
              ) : (
                "Enter a value to see matching colleges"
              )}
            </p>
          </div>

          {effRank <= 0 ? (
            <EmptyState />
          ) : result.total === 0 ? (
            <NoMatchState value={formatIndian(effRank)} />
          ) : (
            <div className="space-y-5">
              {TIER_META.map(({ tier, label, dot, chip }) => {
                const list = groups[tier]
                if (list.length === 0) return null
                return (
                  <div key={tier}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`size-2 rounded-full ${dot}`} />
                      <span className="text-sm font-semibold">{label}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${chip}`}>
                        {list.length}
                      </span>
                    </div>
                    <ul className="grid gap-2">
                      <AnimatePresence mode="popLayout">
                        {list.map((m, i) => (
                          <motion.li
                            key={`${m.name}-${m.city}`}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center justify-between gap-3 rounded-lg border bg-background px-4 py-2.5"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">{m.name}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {m.city}, {m.state} · {m.type}
                              </p>
                            </div>
                            <span className="shrink-0 font-mono text-xs text-muted-foreground">
                              ~{formatIndian(m.threshold)}
                            </span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </div>
                )
              })}
            </div>
          )}

          {/* funnel → Pro Choice-Filling Assistant */}
          {effRank > 0 && result.total > 0 && (
            <a
              href={`/choice-filling?rank=${effRank}&category=${encodeURIComponent(category)}&course=${encodeURIComponent(course)}`}
              className="group mt-5 flex items-center gap-3 rounded-xl border border-primary/40 bg-primary/[0.06] p-4 transition-colors hover:bg-primary/10"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                <IconListNumbers className="size-5" stroke={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  Order these into a winning list
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary-foreground">Pro</span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Turn these matches into an allotment-ready choice order for counselling.
                </p>
              </div>
              <IconArrowRight className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" stroke={2.2} />
            </a>
          )}
        </div>
      )}

      <p className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground">
        <IconInfoCircle className="size-3.5" stroke={2} />
        Indicative model on 2024 AIQ trends. Verify on official counselling.
      </p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed py-10 text-center">
      <IconBuildingHospital className="size-6 text-muted-foreground" stroke={1.5} />
      <p className="mt-3 text-sm text-muted-foreground">Enter a value above to reveal matching seats.</p>
    </div>
  )
}

function NoMatchState({ value }: { value: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed py-10 text-center">
      <IconInfoCircle className="size-6 text-destructive" stroke={1.5} />
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">
        {value} sits outside our tracked government cutoffs. Deemed and state-quota
        seats are still on the table.
      </p>
    </div>
  )
}
