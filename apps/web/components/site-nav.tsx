"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  IconActivityHeartbeat,
  IconChevronDown,
  IconTargetArrow,
  IconMenu2,
  IconX,
} from "@tabler/icons-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { PREDICTOR_LINKS, EXPLORE_LINKS } from "@/lib/nav-links"

const ease = [0.16, 1, 0.3, 1] as const

function Wordmark() {
  return (
    <a href="/" aria-label="NEET Companion home" className="flex items-center gap-2">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <IconActivityHeartbeat className="size-5" stroke={2.2} />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        NEET<span className="text-muted-foreground"> Companion</span>
      </span>
    </a>
  )
}

function Dropdown({
  label,
  items,
}: {
  label: string
  items: { label: string; href: string; desc: string }[]
}) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground group-focus-within:text-foreground">
        {label}
        <IconChevronDown className="size-3.5 transition-transform group-hover:rotate-180" stroke={2.2} />
      </button>
      <div className="invisible absolute left-0 top-full z-10 w-72 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="glass glass-panel rounded-xl border p-2 shadow-lg">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
            >
              <p className="text-sm font-medium">{it.label}</p>
              <p className="text-xs text-muted-foreground">{it.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 glass ${scrolled ? "border-b" : ""}`}
        style={{
          backgroundColor: "color-mix(in oklch, var(--background) var(--header-opacity, 100%), transparent)",
          backdropFilter: "blur(12px) saturate(1.6)",
          WebkitBackdropFilter: "blur(12px) saturate(1.6)",
        }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Wordmark />

          <div className="hidden items-center gap-1 md:flex">
            <Dropdown label="Predictors" items={PREDICTOR_LINKS} />
            <a href="/states" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">States</a>
            <a href="/colleges" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">Colleges</a>
            <Dropdown label="Explore" items={EXPLORE_LINKS} />
            <a
              href="/choice-filling"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Choice Filling
              <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">Pro</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/neet-predictor-2026"
              className="group hidden items-center gap-1.5 rounded-lg bg-primary py-2 pl-4 pr-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] md:inline-flex"
            >
              <IconTargetArrow className="size-4" stroke={2.2} />
              Try NEET Predictor
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-lg ring-1 ring-border md:hidden"
            >
              {open ? <IconX className="size-5" stroke={2} /> : <IconMenu2 className="size-5" stroke={2} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass glass-panel fixed inset-0 top-16 z-40 overflow-y-auto px-6 py-6 md:hidden"
          >
            <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Predictors</p>
            <div className="mt-2 mb-6 grid gap-1">
              {PREDICTOR_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-1 py-2.5 text-lg font-medium">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="grid gap-1">
              <a href="/states" onClick={() => setOpen(false)} className="rounded-lg px-1 py-2.5 text-lg font-medium">States</a>
              <a href="/colleges" onClick={() => setOpen(false)} className="rounded-lg px-1 py-2.5 text-lg font-medium">Colleges</a>
              <a href="/choice-filling" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-1 py-2.5 text-lg font-medium">
                Choice Filling
                <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">Pro</span>
              </a>
            </div>
            <a
              href="/neet-predictor-2026"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 font-semibold text-primary-foreground"
            >
              <IconTargetArrow className="size-4" stroke={2.2} />
              Try NEET Predictor
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
