import { IconArrowRight } from "@tabler/icons-react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { PREDICTOR_LINKS } from "@/lib/nav-links"
import { PredictorTool, type PredictorVariant } from "@/components/predictor-tool"

interface ToolPageProps {
  variant: PredictorVariant
  title: string
  subtitle: string
  selfHref: string
  notes?: string[]
}

export function ToolPage({ variant, title, subtitle, selfHref, notes }: ToolPageProps) {
  const others = PREDICTOR_LINKS.filter((l) => l.href !== selfHref)

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 pt-28 pb-24 sm:px-6 md:pt-32">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 text-muted-foreground">{subtitle}</p>
        </header>

        <div className="mt-8">
          <PredictorTool variant={variant} />
        </div>

        {notes && notes.length > 0 && (
          <div className="mt-10 rounded-2xl border bg-muted/30 p-6">
            <h2 className="text-sm font-semibold">How this works</h2>
            <ul className="mt-3 space-y-2">
              {notes.map((n) => (
                <li key={n} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}

        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Other predictors
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex flex-col justify-between rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <p className="text-sm font-medium">{l.label}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Open
                  <IconArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" stroke={2.2} />
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
