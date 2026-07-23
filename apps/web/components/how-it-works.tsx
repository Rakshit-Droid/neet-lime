import { IconPencilPlus, IconLayersIntersect, IconMapPin, IconListNumbers, IconArrowRight } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"
import { ThemedImage } from "@/components/themed-image"

const STEPS = [
  {
    icon: IconPencilPlus,
    n: "01",
    title: "Enter your score or rank",
    body: "No sign-up, no personal data. Pick a category and course, type a number, and you are in.",
    pro: false,
  },
  {
    icon: IconLayersIntersect,
    n: "02",
    title: "Compare Safe, Moderate, Reach",
    body: "Colleges group into three honest tiers on last cycle's closing ranks, so you know where you truly stand.",
    pro: false,
  },
  {
    icon: IconMapPin,
    n: "03",
    title: "Explore states and cutoffs",
    body: "Drill into any state's colleges and closing ranks to shortlist before counselling registration opens.",
    pro: false,
  },
  {
    icon: IconListNumbers,
    n: "04",
    title: "Order and lock your choices",
    body: "The Pro Choice-Filling Assistant sequences your shortlist into an allotment-ready order you can carry into MCC or state rounds.",
    pro: true,
  },
]

export function HowItWorks() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="order-last lg:order-first">
            <ThemedImage
              keywords="student,studying"
              lock={22}
              grayscale
              tint="none"
              alt="A NEET aspirant studying and planning college choices"
              width={720}
              height={760}
              className="aspect-[4/5] w-full lg:aspect-square"
            />
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                From a number to a locked seat in four moves.
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border bg-background text-primary">
                      <s.icon className="size-5" stroke={1.8} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                        <h3 className="text-lg font-semibold">{s.title}</h3>
                        {s.pro && (
                          <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
                            Pro
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <a
                href="/neet-predictor-2026"
                className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary py-3 pl-5 pr-4 font-semibold text-primary-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
              >
                Start with the NEET Predictor
                <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" stroke={2.2} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
