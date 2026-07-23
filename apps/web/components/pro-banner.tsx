import { IconArrowRight, IconSparkles, IconListNumbers } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"

export function ProBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 glass-card ring-1 ring-primary/20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(90% 120% at 100% 0%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 60%)",
            }}
          />
          <div className="relative grid items-center gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
                <IconSparkles className="size-3.5" stroke={2.4} />
                Pro
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Your rank is half the battle. The choice list wins the seat.
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
                The free predictor tells you where you stand. The Choice-Filling
                Assistant orders every eligible college into one allotment-ready
                list, so you never hand a better seat to a worse-ranked aspirant.
              </p>
              <a
                href="/choice-filling"
                className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-primary py-3 pl-5 pr-4 font-semibold text-primary-foreground transition-transform duration-300 active:scale-[0.98]"
              >
                Open the Choice-Filling Assistant
                <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" stroke={2.2} />
              </a>
            </div>

            <div className="hidden justify-self-end md:block">
              <div className="w-64 rounded-2xl border bg-card p-4 shadow-sm">
                <p className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <IconListNumbers className="size-4 text-primary" stroke={2} />
                  Your preference order
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    ["01", "AIIMS, New Delhi", "Reach"],
                    ["02", "Maulana Azad MC", "Reach"],
                    ["03", "Grant MC, Mumbai", "Moderate"],
                    ["04", "SMS, Jaipur", "Safe"],
                  ].map(([n, name, tier]) => (
                    <li key={n} className="flex items-center justify-between gap-2 rounded-lg border bg-background px-2.5 py-1.5 text-xs">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-muted-foreground">{n}</span>
                        <span className="font-medium">{name}</span>
                      </span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                          tier === "Safe" ? "bg-primary/12 text-primary" : tier === "Moderate" ? "bg-amber-500/12 text-amber-600 dark:text-amber-400" : "bg-destructive/12 text-destructive"
                        }`}
                      >
                        {tier}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
