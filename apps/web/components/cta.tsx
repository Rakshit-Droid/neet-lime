import { IconArrowRight, IconPhone } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"

export function CTA() {
  return (
    <section id="start" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 md:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground md:px-16 md:py-24">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Your seat is a plan away, not luck.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-primary-foreground/80">
            Start with the free rank prediction, then let a counsellor turn that
            number into a strategy. 2026 batches close as seats fill.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#top"
              className="group inline-flex items-center gap-2 rounded-lg bg-background py-3 pl-5 pr-4 font-semibold text-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
            >
              Start free
              <IconArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                stroke={2.2}
              />
            </a>
            <a
              href="tel:+919833041827"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/25 px-5 py-3 font-semibold transition-colors hover:bg-primary-foreground/10"
            >
              <IconPhone className="size-4" stroke={2.2} />
              Talk to a counsellor
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
