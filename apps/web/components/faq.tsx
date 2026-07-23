"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { IconPlus } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"

const FAQS = [
  {
    q: "How accurate are the predictors?",
    a: "They are directional models on the previous cycle's All India Quota closing trends. Expect the predicted rank within roughly 8% of the real one for a stable score, and treat the college matcher as a shortlist to validate. Official counselling data always overrides our estimate.",
  },
  {
    q: "Online, offline, or both?",
    a: "Every program is hybrid. Attend the physical classroom or join the same session live online, and all classes are recorded. Doubts, mocks, and mentor calls work identically for both.",
  },
  {
    q: "Why cap the batches so small?",
    a: "Accountability does not scale. A mentor responsible for 42 students notices the week you slip and intervenes. In a hall of 300 you become invisible exactly when you most need to be seen.",
  },
  {
    q: "Is consultancy included or separate?",
    a: "Counselling strategy is bundled free for every enrolled student. If you prepared elsewhere and only need choice-filling help, we also offer it as a standalone engagement.",
  },
  {
    q: "I am a dropper who scored low. Worth it?",
    a: "Most of our best turnarounds are droppers. The Dropper Intensive diagnoses exactly where last year leaked marks and rebuilds those chapters, rather than re-teaching everything from zero.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Before you commit a year.
          </h2>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Still unsure? The strategy call answers the ones specific to your score
            and category.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y border-y">
            {FAQS.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-lg font-medium">{item.q}</span>
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen ? "rotate-45 border-primary/40 bg-primary/10 text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <IconPlus className="size-4" stroke={2.2} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-5 pr-10 text-[15px] leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
