"use client"

import { motion } from "motion/react"
import { IconArrowRight, IconTargetArrow, IconBuildingHospital } from "@tabler/icons-react"
import { HeroPredictor } from "@/components/hero-predictor"

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* themed backdrop image, kept subtle so copy stays legible. Masked to
         fade out toward the bottom so it dissolves into the next section
         instead of a hard clipped edge. */}
      <img
        src="/hero-bg.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 size-full object-cover opacity-[0.1]"
        style={{
          maskImage: "linear-gradient(to bottom, black 35%, transparent 88%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 88%)",
          filter: "grayscale(0.6)",
        }}
      />
      {/* restrained lime wash behind the widget, not neon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 40%, color-mix(in oklch, var(--primary) 9%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* left: copy */}
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Free forever. No registration.
          </motion.span>

          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.06 }}
            className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Turn your NEET score into a{" "}
            <span className="text-primary">seat.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.16 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Free predictors map a NEET score or rank to Safe, Moderate, and Reach
            colleges. Then the Pro Choice-Filling Assistant orders them into an
            allotment-ready counselling list.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.26 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="/neet-predictor-2026"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary py-3 pl-5 pr-4 font-semibold text-primary-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
            >
              <IconTargetArrow className="size-4" stroke={2.2} />
              Try NEET Predictor
              <IconArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                stroke={2.2}
              />
            </a>
            <a
              href="/colleges"
              className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-3 font-semibold transition-colors hover:bg-accent"
            >
              <IconBuildingHospital className="size-4 text-primary" stroke={2.2} />
              Explore Colleges
            </a>
          </motion.div>
        </div>

        {/* right: multi-step rank predictor card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="w-full max-w-md justify-self-center lg:justify-self-end"
        >
          <HeroPredictor />
        </motion.div>
      </div>
    </section>
  )
}
