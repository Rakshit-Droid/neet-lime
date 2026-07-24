"use client"

import { useMemo, useState } from "react"
import {
  IconChartLine,
  IconArrowRight,
  IconArrowLeft,
  IconSparkles,
  IconTrophy,
  IconCheck,
  IconRefresh,
  IconInfoCircle,
  IconPencil,
} from "@tabler/icons-react"
import { marksToRank, rankToColleges, formatIndian, MAX_MARKS } from "@/lib/predictors"

type Step = "score" | "details" | "result"

interface Details {
  name: string
  mobile: string
  email: string
  city: string
}

const STEPS: { key: Step; label: string }[] = [
  { key: "score", label: "Score" },
  { key: "details", label: "Details" },
  { key: "result", label: "Result" },
]

function bandFor(score: number): string {
  if (score >= 650) return "Exceptional"
  if (score >= 600) return "Excellent"
  if (score >= 520) return "Very good"
  if (score >= 420) return "Good"
  if (score >= 300) return "Fair"
  return "Keep pushing"
}

export function HeroPredictor() {
  const [step, setStep] = useState<Step>("score")
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(360)
  const [details, setDetails] = useState<Details>({ name: "", mobile: "", email: "", city: "" })
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({})

  const stepIndex = STEPS.findIndex((s) => s.key === step)
  const pct = (score / MAX_MARKS) * 100

  // Your calculation method: score -> rank/percentile, then rank -> colleges.
  const result = useMemo(() => {
    const p = marksToRank(score)
    const colleges = rankToColleges(p.air, "General").total
    return {
      ...p,
      colleges,
      qualified: score >= 164, // approx general qualifying cutoff
    }
  }, [score])

  function setField(k: keyof Details, v: string) {
    setDetails((d) => ({ ...d, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Details, string>> = {}
    if (!details.name.trim()) next.name = "Please enter your name."
    // mobile & email are optional — only validate the format when provided.
    if (details.mobile && !/^[6-9]\d{9}$/.test(details.mobile)) next.mobile = "Enter a valid 10-digit mobile number."
    if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) next.email = "Enter a valid email address."
    if (!details.city.trim()) next.city = "Please enter your city."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function submitAndPredict() {
    if (!validate()) return
    setLoading(true)
    // Note: no backend wired — plug your lead endpoint here (POST details).
    window.setTimeout(() => {
      setLoading(false)
      setStep("result")
    }, 1300)
  }

  function restart() {
    setStep("score")
    setScore(360)
    setDetails({ name: "", mobile: "", email: "", city: "" })
    setErrors({})
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border glass-card shadow-sm">
      {/* loader overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-card/85 backdrop-blur-sm">
          <span className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
          <p className="text-[0.82rem] font-semibold text-muted-foreground">Calculating your rank…</p>
        </div>
      )}

      {/* header */}
      <div className="bg-primary px-6 py-5 text-primary-foreground">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <IconChartLine className="size-5" stroke={2.2} />
          NEET Rank Predictor
        </h3>
        <p className="mt-0.5 text-sm text-primary-foreground/80">
          2 quick steps, get your rank in seconds
        </p>
      </div>

      <div className="p-6">
        {/* step pills */}
        <div className="mb-6 flex items-center">
          {STEPS.map((s, i) => {
            const done = i < stepIndex
            const active = i === stepIndex
            return (
              <div key={s.key} className={i < STEPS.length - 1 ? "flex flex-1 items-center" : "flex items-center"}>
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`grid size-8 place-items-center rounded-full text-xs font-semibold ${
                      active || done ? "bg-primary text-primary-foreground" : "border bg-muted text-muted-foreground"
                    }`}
                  >
                    {done ? <IconCheck className="size-4" stroke={2.5} /> : i + 1}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <span className={`mx-2 -mt-5 h-px flex-1 ${done ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* STEP 1: score */}
        {step === "score" && (
          <div>
            <p className="mb-3 text-center text-xs font-semibold text-muted-foreground">
              Enter or slide your expected NEET 2026 score
            </p>
            <div className="flex items-end justify-center gap-2">
              <input
                type="number"
                min={0}
                max={MAX_MARKS}
                value={score}
                onChange={(e) => setScore(Math.max(0, Math.min(MAX_MARKS, Number(e.target.value) || 0)))}
                className="w-28 border-b-2 border-primary bg-transparent text-center font-heading text-5xl font-bold tabular-nums text-primary outline-none"
              />
              <span className="pb-1 text-lg text-muted-foreground">/ {MAX_MARKS}</span>
            </div>

            <input
              type="range"
              min={0}
              max={MAX_MARKS}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              aria-label="Expected NEET score"
              className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background"
              style={{ background: `linear-gradient(to right, var(--primary) ${pct}%, var(--muted) ${pct}%)` }}
            />
            <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
              <span>0</span><span>180</span><span>360</span><span>540</span><span>720</span>
            </div>

            <div className="mt-5 rounded-lg bg-primary/10 py-2.5 text-center text-sm font-semibold text-primary">
              {bandFor(score)}
            </div>

            <button
              onClick={() => setStep("details")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-transform duration-300 active:scale-[0.98]"
            >
              Continue <IconArrowRight className="size-4" stroke={2.2} />
            </button>
          </div>
        )}

        {/* STEP 2: details */}
        {step === "details" && (
          <div>
            <div className="mb-4 flex items-center justify-between rounded-lg border bg-muted/50 px-3.5 py-2.5">
              <span className="text-xs text-muted-foreground">Your score</span>
              <strong className="font-mono text-primary">{score} / {MAX_MARKS}</strong>
              <button onClick={() => setStep("score")} className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <IconPencil className="size-3.5" stroke={2.2} /> Edit
              </button>
            </div>

            <Field label="Student name" error={errors.name}>
              <input className="sc-input" value={details.name} onChange={(e) => setField("name", e.target.value)} placeholder="Your full name" />
            </Field>
            <Field label="Mobile number" error={errors.mobile} optional>
              <div className="flex items-center overflow-hidden rounded-lg border bg-background focus-within:ring-2 focus-within:ring-primary/40">
                <span className="border-r bg-muted px-3 py-2.5 text-sm text-muted-foreground">+91</span>
                <input
                  inputMode="numeric"
                  maxLength={10}
                  value={details.mobile}
                  onChange={(e) => setField("mobile", e.target.value.replace(/\D/g, ""))}
                  placeholder="10-digit number"
                  className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </Field>
            <Field label="Email address" error={errors.email} optional>
              <input type="email" className="sc-input" value={details.email} onChange={(e) => setField("email", e.target.value)} placeholder="your@email.com" />
            </Field>
            <Field label="City" error={errors.city}>
              <input className="sc-input" value={details.city} onChange={(e) => setField("city", e.target.value)} placeholder="Your city" />
            </Field>

            <button
              onClick={submitAndPredict}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-transform duration-300 active:scale-[0.98]"
            >
              <IconSparkles className="size-4" stroke={2.2} /> Predict my rank now
            </button>
            <button
              onClick={() => setStep("score")}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              <IconArrowLeft className="size-4" stroke={2.2} /> Back
            </button>
          </div>
        )}

        {/* STEP 3: result */}
        {step === "result" && (
          <div className="text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/12 text-primary">
              <IconTrophy className="size-6" stroke={2} />
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Your predicted AIR
            </p>
            <div className="mt-1 font-heading text-4xl font-bold text-primary">
              {formatIndian(result.air)}
            </div>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              range {formatIndian(result.low)} to {formatIndian(result.high)}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <ResBox value={`${result.percentile}`} label="Percentile" />
              <ResBox value={`${score}/${MAX_MARKS}`} label="Your score" />
              <ResBox value={result.qualified ? "Qualified" : "Below cutoff"} label="NEET status" />
              <ResBox value={formatIndian(result.colleges)} label="Est. colleges" />
            </div>

            <button
              onClick={restart}
              className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              <IconRefresh className="size-4" stroke={2.2} /> Predict again
            </button>
          </div>
        )}

        <p className="mt-5 flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
          <IconInfoCircle className="mt-0.5 size-3.5 shrink-0" stroke={2} />
          Predictions are estimates based on historical NEET trends. Await official NTA results for confirmed rankings.
        </p>
      </div>
    </div>
  )
}

function Field({ label, error, optional, children }: { label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="mb-3.5 flex flex-col gap-1.5">
      <label className="text-xs font-semibold">
        {label}
        {optional ? <span className="font-normal text-muted-foreground"> (optional)</span> : " *"}
      </label>
      {children}
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  )
}

function ResBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-muted/40 px-3 py-2.5">
      <strong className="block font-mono text-base">{value}</strong>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}
