"use client"

import { useEffect, useState } from "react"
import {
  IconSparkles,
  IconLock,
  IconDownload,
  IconRefresh,
  IconInfoCircle,
  IconCircleCheck,
} from "@tabler/icons-react"
import { CATEGORIES, COURSES, type Category, type Course, type Tier } from "@/lib/predictors"
import {
  buildChoiceList,
  QUOTAS,
  CHOICE_LIST_CREDIT_COST,
  FREE_PREVIEW_CHOICES,
  formatIndian,
  type Quota,
  type ChoiceList,
} from "@/lib/choice-filling"

const TIER_CHIP: Record<Tier, string> = {
  Reach: "bg-destructive/12 text-destructive",
  Moderate: "bg-amber-500/12 text-amber-600 dark:text-amber-400",
  Safe: "bg-primary/12 text-primary",
}

export function ChoiceFillingAssistant() {
  const [rankStr, setRankStr] = useState("4200")
  const [category, setCategory] = useState<Category>("General")
  const [course, setCourse] = useState<Course>("MBBS")
  const [quota, setQuota] = useState<Quota>("All India Quota")
  const [result, setResult] = useState<ChoiceList | null>(null)

  // Prefill from the predictor hand-off (?rank=&category=&course=). Runs after
  // mount so server and first client render stay identical (no hydration drift).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const r = p.get("rank")
    const cat = p.get("category")
    const crs = p.get("course")
    if (r && /^\d+$/.test(r)) setRankStr(r)
    if (cat && (CATEGORIES as readonly string[]).includes(cat)) setCategory(cat as Category)
    if (crs && (COURSES as readonly string[]).includes(crs)) setCourse(crs as Course)
  }, [])

  const rank = Number(rankStr.replace(/[^0-9]/g, "")) || 0

  function generate() {
    if (rank <= 0) return
    // TODO: meter credits + call the full optimiser once wired.
    setResult(buildChoiceList({ rank, category, course, quota }))
  }

  return (
    <div className="overflow-hidden rounded-2xl border glass-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b bg-primary/[0.06] px-6 py-4">
        <div>
          <h3 className="flex items-center gap-2 font-semibold">
            <IconSparkles className="size-5 text-primary" stroke={2.2} />
            Choice-Filling Assistant
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            An ordered, allotment-ready preference list built for your rank.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
          Pro
        </span>
      </div>

      <div className="p-6">
        {/* inputs */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your All India Rank">
            <input
              inputMode="numeric"
              value={rankStr}
              onChange={(e) => setRankStr(e.target.value)}
              placeholder="e.g. 4200"
              className="w-full rounded-lg border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </Field>
          <Field label="Category">
            <Select value={category} onChange={(v) => setCategory(v as Category)} options={CATEGORIES} />
          </Field>
          <Field label="Course">
            <Select value={course} onChange={(v) => setCourse(v as Course)} options={COURSES} />
          </Field>
          <Field label="Quota">
            <Select value={quota} onChange={(v) => setQuota(v as Quota)} options={QUOTAS} />
          </Field>
        </div>

        <button
          onClick={generate}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-transform duration-300 active:scale-[0.98]"
        >
          <IconSparkles className="size-4" stroke={2.2} />
          Generate my choice list
          <span className="rounded-full bg-black/15 px-2 py-0.5 text-[11px] font-bold">
            {CHOICE_LIST_CREDIT_COST} credits
          </span>
        </button>

        {result && <Result result={result} onReset={() => setResult(null)} />}

        <p className="mt-5 flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
          <IconInfoCircle className="mt-0.5 size-3.5 shrink-0" stroke={2} />
          Order strategy follows MCC/state counselling logic. Confirm on the
          official portal before choice locking.
        </p>
      </div>
    </div>
  )
}

function Result({ result, onReset }: { result: ChoiceList; onReset: () => void }) {
  const locked = result.choices.slice(FREE_PREVIEW_CHOICES)

  if (result.total === 0) {
    return (
      <div className="mt-6 rounded-xl border border-dashed py-10 text-center text-sm text-muted-foreground">
        No government seats matched that rank. Deemed and private options are on our roadmap.
      </div>
    )
  }

  return (
    <div className="mt-6">
      {/* summary */}
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-xl border bg-border text-center">
        <Stat v={result.total} k="Choices" />
        <Stat v={result.counts.Reach} k="Reach" />
        <Stat v={result.counts.Moderate} k="Moderate" />
        <Stat v={result.counts.Safe} k="Safe" />
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Your ordered preference list
      </p>

      {/* free preview */}
      <ul className="mt-2 grid gap-2">
        {result.choices.slice(0, FREE_PREVIEW_CHOICES).map((c) => (
          <ChoiceRow key={`${c.college.name}-${c.college.city}`} order={c.order} name={c.college.name} city={`${c.college.city}, ${c.college.state}`} tier={c.college.tier} advice={c.advice} />
        ))}
      </ul>

      {/* paywall for the rest */}
      {locked.length > 0 && (
        <div className="relative mt-2">
          <ul className="grid gap-2 blur-[3px]" aria-hidden>
            {locked.slice(0, 4).map((c) => (
              <ChoiceRow key={`${c.college.name}-${c.college.city}`} order={c.order} name={c.college.name} city="" tier={c.college.tier} advice="" />
            ))}
          </ul>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-transparent via-card/70 to-card text-center">
            <span className="grid size-9 place-items-center rounded-full bg-primary/12 text-primary">
              <IconLock className="size-4" stroke={2} />
            </span>
            <p className="text-sm font-semibold">
              Unlock your full {result.total}-choice list
            </p>
            <p className="max-w-xs text-xs text-muted-foreground">
              {locked.length} more colleges, round-by-round strategy, and a downloadable list.
            </p>
            <a
              href="/pricing"
              className="mt-1 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Go Pro
              <span className="rounded-full bg-black/15 px-2 py-0.5 text-[11px] font-bold">
                {CHOICE_LIST_CREDIT_COST} credits
              </span>
            </a>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          disabled
          className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-semibold text-muted-foreground"
        >
          <IconDownload className="size-4" stroke={2} /> Download list
          <IconLock className="size-3.5" stroke={2} />
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-accent"
        >
          <IconRefresh className="size-4" stroke={2} /> Start over
        </button>
      </div>
    </div>
  )
}

function ChoiceRow({ order, name, city, tier, advice }: { order: number; name: string; city: string; tier: Tier; advice: string }) {
  return (
    <li className="flex items-start gap-3 rounded-lg border bg-background px-3.5 py-2.5">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-muted font-mono text-xs font-semibold">
        {order}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{name}</p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${TIER_CHIP[tier]}`}>{tier}</span>
        </div>
        {city && <p className="mt-0.5 text-xs text-muted-foreground">{city}</p>}
        {advice && <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground"><IconCircleCheck className="size-3 text-primary" stroke={2.4} />{advice}</p>}
      </div>
    </li>
  )
}

function Stat({ v, k }: { v: number; k: string }) {
  return (
    <div className="bg-card px-2 py-3">
      <div className="font-mono text-lg font-semibold">{formatIndian(v)}</div>
      <div className="text-[11px] text-muted-foreground">{k}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  )
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  )
}
