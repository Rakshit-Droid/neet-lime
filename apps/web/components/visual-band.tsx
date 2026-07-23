import { IconArrowRight } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"

export function VisualBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border glass-card">
          {/* Decorative grayscale texture only. Kept faint on purpose so the exact
              stock content is irrelevant (keyword services can't guarantee it). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://loremflickr.com/1440/560/medical,doctor/all?lock=34"
            alt=""
            aria-hidden="true"
            width={1440}
            height={560}
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50 grayscale"
          />
          {/* brand wash: readable card on the left, lime accent to the right */}
          <div className="absolute inset-0 bg-gradient-to-br from-card via-card/70 to-primary/[0.16]" />

          <div className="relative flex min-h-[280px] items-center sm:min-h-[340px]">
            <div className="max-w-lg px-6 py-10 sm:px-10 md:px-14">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Every serious aspirant deserves an honest shot.
              </h2>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground sm:text-base">
                Free tools, real cutoff data, and no sign-up walls. Built by people
                who remember exactly how counselling season feels.
              </p>
              <a
                href="/colleges"
                className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 active:scale-[0.98]"
              >
                Explore Colleges
                <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" stroke={2.2} />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
