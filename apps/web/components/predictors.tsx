"use client"

import { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "motion/react"
import { IconTargetArrow, IconBuildingHospital, IconGauge, IconChartBar } from "@tabler/icons-react"
import { PredictorTool, type PredictorVariant } from "@/components/predictor-tool"
import { Reveal } from "@/components/reveal"

const TABS: { id: PredictorVariant; label: string; icon: typeof IconGauge }[] = [
  { id: "neet", label: "NEET Predictor", icon: IconTargetArrow },
  { id: "rank-to-college", label: "Rank to College", icon: IconBuildingHospital },
  { id: "marks-to-college", label: "Marks to College", icon: IconChartBar },
  { id: "rank-predictor", label: "Rank Predictor", icon: IconGauge },
]

export function Predictors() {
  const [tab, setTab] = useState<PredictorVariant>("neet")

  return (
    <section id="predictors" className="border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Free predictors, no registration.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built on last cycle&rsquo;s All India Quota closing data across MBBS, BDS,
            and B.Sc Nursing. Directional, not a promise, but it is the math our
            counsellors open on call one.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mx-auto mt-10 max-w-2xl">
          <LayoutGroup>
            <div className="flex flex-wrap gap-1.5 rounded-xl border bg-background p-1.5">
              {TABS.map((t) => {
                const active = tab === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors"
                  >
                    {active && (
                      <motion.span
                        layoutId="home-pred-tab"
                        className="absolute inset-0 rounded-lg bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-2 ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>
                      <t.icon className="size-4" stroke={2} />
                      <span className="hidden sm:inline">{t.label}</span>
                      <span className="sm:hidden">{t.label.split(" ")[0]}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>

          <div className="mt-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <PredictorTool variant={tab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
