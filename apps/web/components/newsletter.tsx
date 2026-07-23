"use client"

import { useState } from "react"
import { IconMailPlus, IconCircleCheck } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.")
      return
    }
    setError("")
    setDone(true)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="rounded-3xl border glass-card px-6 py-12 text-center md:px-16 md:py-16">
          <span className="mx-auto inline-flex size-12 items-center justify-center rounded-xl bg-primary/12 text-primary">
            <IconMailPlus className="size-6" stroke={1.8} />
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
            More features are coming.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Get an email when the Syllabus Tracker, Mock Tests, and counselling
            walkthrough go live. No spam, unsubscribe anytime.
          </p>

          {done ? (
            <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg bg-primary/12 px-4 py-2.5 text-sm font-medium text-primary">
              <IconCircleCheck className="size-4" stroke={2} />
              You are on the list. We will be in touch.
            </p>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 active:scale-[0.98]"
                >
                  Notify me
                </button>
              </div>
              {error && <p className="text-left text-xs text-destructive">{error}</p>}
            </form>
          )}
        </div>
      </Reveal>
    </section>
  )
}
