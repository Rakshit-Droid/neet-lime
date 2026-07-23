import { IconCheck, IconArrowRight } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"

interface Program {
  tag: string
  title: string
  duration: string
  price: string
  featured?: boolean
  points: string[]
}

const PROGRAMS: Program[] = [
  {
    tag: "Flagship",
    title: "Dropper Intensive",
    duration: "11 months",
    price: "84,000",
    featured: true,
    points: ["Full NCERT rebuild", "42 mocks, 1:1 reviews", "Weekly mentor call"],
  },
  {
    tag: "Foundation",
    title: "Class 11 Track",
    duration: "24 months",
    price: "62,000",
    points: ["Board plus NEET as one", "Concept-first pacing", "Quarterly parent review"],
  },
  {
    tag: "Accelerator",
    title: "Class 12 + NEET",
    duration: "14 months",
    price: "71,000",
    points: ["Timelines de-conflicted", "DPPs graded in 24h", "Simulation weeks"],
  },
  {
    tag: "Sprint",
    title: "45-Day Crash",
    duration: "6 weeks",
    price: "27,500",
    points: ["High-yield chapters", "Two mocks a week", "Rapid revision decks"],
  },
]

export function Programs() {
  return (
    <section id="programs" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Small batches. Uncomfortable accountability.
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          We cap every batch on purpose. A mentor who knows all 42 names notices
          the week you slip.
        </p>
      </Reveal>

      {/* horizontal scroll-snap rail */}
      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROGRAMS.map((p) => (
          <article
            key={p.title}
            className={`flex min-w-[270px] flex-1 snap-start flex-col rounded-2xl border p-6 ${
              p.featured ? "border-primary/40 bg-primary/[0.06]" : "bg-card"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  p.featured ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {p.tag}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{p.duration}</span>
            </div>

            <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>

            <ul className="mt-4 space-y-2.5">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm">
                  <IconCheck
                    className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-primary" : "text-muted-foreground"}`}
                    stroke={2.4}
                  />
                  <span className="text-muted-foreground">{pt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-end justify-between border-t pt-5">
              <div>
                <p className="text-xs text-muted-foreground">Full program</p>
                <p className="font-mono text-xl font-semibold">&#8377;{p.price}</p>
              </div>
              <a
                href="#start"
                aria-label={`Reserve a seat in ${p.title}`}
                className={`grid size-9 place-items-center rounded-lg transition-transform duration-300 hover:translate-x-0.5 ${
                  p.featured ? "bg-primary text-primary-foreground" : "border bg-background"
                }`}
              >
                <IconArrowRight className="size-4" stroke={2.2} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
