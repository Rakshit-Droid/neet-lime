"use client"

import { useState } from "react"
import { IconCircleCheck } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"

const HELP_TYPES = [
  "College prediction help",
  "State or counselling query",
  "Report incorrect data",
  "Feature request",
  "Something else",
]

export function ContactForm() {
  const [form, setForm] = useState({ help: HELP_TYPES[0]!, name: "", email: "", phone: "", message: "" })
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function set(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = "Please add your name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email."
    if (!form.message.trim()) next.message = "Tell us how we can help."
    setErrors(next)
    if (Object.keys(next).length === 0) setDone(true)
  }

  return (
    <section id="contact" className="border-t bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 md:py-32">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Need a hand?</h2>
          <p className="mt-4 text-muted-foreground">
            Ask about a prediction, flag a wrong cutoff, or request a feature. We read every message.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {done ? (
            <div className="flex flex-col items-center rounded-2xl border glass-card p-12 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-primary/12 text-primary">
                <IconCircleCheck className="size-6" stroke={2} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Message sent</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Thanks {form.name.split(" ")[0]}. We will reply at {form.email} within a working day.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-2xl border glass-card p-6 sm:p-8">
              <div className="grid gap-5">
                <Field label="How can we help?" htmlFor="help">
                  <select
                    id="help"
                    value={form.help}
                    onChange={(e) => set("help", e.target.value)}
                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {HELP_TYPES.map((h) => (<option key={h} value={h}>{h}</option>))}
                  </select>
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" htmlFor="name" error={errors.name}>
                    <input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
                  </Field>
                  <Field label="Phone (optional)" htmlFor="phone">
                    <input id="phone" inputMode="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
                  </Field>
                </div>

                <Field label="Email" htmlFor="email" error={errors.email}>
                  <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
                </Field>

                <Field label="Message" htmlFor="message" error={errors.message}>
                  <textarea id="message" rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} className="w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
                </Field>

                <button
                  type="submit"
                  className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform duration-300 active:scale-[0.98]"
                >
                  Request Help
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
