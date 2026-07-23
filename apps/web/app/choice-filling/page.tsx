import type { Metadata } from "next"
import { IconTargetArrow, IconListNumbers, IconShieldCheck, IconArrowRight } from "@tabler/icons-react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { ChoiceFillingAssistant } from "@/components/choice-filling-assistant"

export const metadata: Metadata = {
  title: "Choice-Filling Assistant (Pro) — NEET Counselling Preference List",
  description:
    "Build an allotment-ready, correctly ordered NEET counselling choice list for your rank. Safe, Moderate, and Reach colleges sequenced round-by-round.",
}

const WHY = [
  {
    icon: IconListNumbers,
    title: "Order is everything",
    body: "Counselling allots the highest preference you clear. A mis-ordered list hands a better seat to someone else.",
  },
  {
    icon: IconTargetArrow,
    title: "Reach without risk",
    body: "We stack aspirational choices on top and safe anchors at the bottom, so you chase upside without losing a seat.",
  },
  {
    icon: IconShieldCheck,
    title: "Round-by-round ready",
    body: "A list you can carry straight into MCC or state counselling and lock with confidence.",
  },
]

export default function ChoiceFillingPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 md:pt-32">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">Pro</span>
                Counselling season, handled
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                The list that turns your rank into a seat.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Most qualified aspirants lose a better college to a badly ordered
                choice list. The Assistant sequences every eligible college into
                one allotment-ready preference order.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5">
              {WHY.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.06}>
                  <div className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border bg-background text-primary">
                      <w.icon className="size-5" stroke={1.8} />
                    </span>
                    <div>
                      <h2 className="font-semibold">{w.title}</h2>
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <a
                href="/pricing"
                className="group mt-10 inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-3 font-semibold transition-colors hover:bg-accent"
              >
                See Pro plans &amp; credits
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" stroke={2.2} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <ChoiceFillingAssistant />
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
