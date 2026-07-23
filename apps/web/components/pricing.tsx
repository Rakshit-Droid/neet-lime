import { IconCheck, IconBolt, IconArrowRight } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"
import { CHOICE_LIST_CREDIT_COST } from "@/lib/choice-filling"

interface Plan {
  name: string
  price: string
  cadence: string
  credits: string
  blurb: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
}

// Placeholder amounts — swap for your live prices when the billing flow is wired.
const PLANS: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    cadence: "forever",
    credits: "0 credits",
    blurb: "The tools that tell you where you stand.",
    features: [
      "Marks, rank & college predictors",
      "State & college explorer",
      "3-choice preview of the Assistant",
    ],
    cta: "Start free",
    href: "/neet-predictor-2026",
  },
  {
    name: "Pro",
    price: "₹499",
    cadence: "per month",
    credits: "200 credits / month",
    blurb: "For the counselling season that decides your seat.",
    features: [
      "Full Choice-Filling Assistant",
      "Round-by-round preference strategy",
      "Downloadable, allotment-ready lists",
      "Category & quota-aware ordering",
    ],
    cta: "Go Pro",
    href: "#",
    featured: true,
  },
  {
    name: "Season Pass",
    price: "₹1,299",
    cadence: "one-time",
    credits: "800 credits",
    blurb: "Everything in Pro for the whole NEET 2026 cycle.",
    features: [
      "800 credits, valid all season",
      "Unlimited re-generations within credits",
      "Priority cutoff-data updates",
    ],
    cta: "Buy the pass",
    href: "#",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <IconBolt className="size-3.5 text-primary" stroke={2.2} />
          Credit-based, no lock-in
        </span>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          Free to explore. Pro when it counts.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Credits power the Pro tools. One full choice list is {CHOICE_LIST_CREDIT_COST} credits,
          so a single Pro month covers a whole season of iterating.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <div
              className={`flex h-full flex-col rounded-2xl border p-6 ${
                p.featured ? "border-primary/50 glass-card ring-1 ring-primary/30" : "glass-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                    Most popular
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-semibold tracking-tight">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.cadence}</span>
              </div>
              <p className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-xs font-semibold text-primary">
                <IconBolt className="size-3.5" stroke={2.4} />
                {p.credits}
              </p>

              <p className="mt-4 text-sm text-muted-foreground">{p.blurb}</p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" stroke={2.4} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={p.href}
                className={`group mt-6 inline-flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
                  p.featured
                    ? "bg-primary text-primary-foreground"
                    : "border bg-card hover:bg-accent"
                }`}
              >
                {p.cta}
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" stroke={2.2} />
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mx-auto mt-6 max-w-2xl text-center">
        <p className="text-xs text-muted-foreground">
          Prices are indicative and shown for preview. Billing and credit metering
          are being finalised.
        </p>
      </Reveal>
    </section>
  )
}
