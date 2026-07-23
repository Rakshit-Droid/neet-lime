"use client"

import { useMemo, useState } from "react"
import { IconTargetArrow } from "@tabler/icons-react"
import { marksToRank, formatIndian, MAX_MARKS } from "@/lib/predictors"
import { Counter } from "@/components/counter"

function verdictFor(air: number): string {
  if (air <= 1000) return "Elite govt seat range"
  if (air <= 15000) return "Strong govt MBBS shot"
  if (air <= 60000) return "State / deemed in reach"
  if (air <= 150000) return "Counselling strategy critical"
  return "Rework the weak chapters"
}

export function MarksToRank() {
  const [marks, setMarks] = useState(640)
  const pred = useMemo(() => marksToRank(marks), [marks])
  const pct = (marks / MAX_MARKS) * 100

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
          <IconTargetArrow className="size-4 text-primary" stroke={2} />
          Marks to rank
        </span>
        <span className="text-xs text-muted-foreground">Live estimate</span>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <label htmlFor="hero-marks" className="text-sm text-muted-foreground">
          Expected NEET score
        </label>
        <div className="font-mono text-2xl font-semibold tabular-nums">
          {marks}
          <span className="text-sm text-muted-foreground">/{MAX_MARKS}</span>
        </div>
      </div>

      <input
        id="hero-marks"
        type="range"
        min={0}
        max={MAX_MARKS}
        value={marks}
        onChange={(e) => setMarks(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow"
        style={{
          background: `linear-gradient(to right, var(--primary) ${pct}%, var(--muted) ${pct}%)`,
        }}
      />

      <div className="mt-6 rounded-xl bg-muted/50 p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Predicted All India Rank
        </p>
        <div className="mt-1 font-mono text-4xl font-semibold tracking-tight text-primary">
          <Counter to={pred.air} live format={(n) => formatIndian(n)} />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-mono text-muted-foreground">
            {formatIndian(pred.low)} to {formatIndian(pred.high)}
          </span>
          <span className="font-medium text-foreground">{verdictFor(pred.air)}</span>
        </div>
      </div>
    </div>
  )
}
