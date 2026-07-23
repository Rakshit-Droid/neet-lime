import { Reveal } from "@/components/reveal"

const STATS = [
  { v: "12,847", k: "seats secured since 2019" },
  { v: "AIR 27", k: "best rank last cycle" },
  { v: "94.3%", k: "clear the cutoff" },
  { v: "42", k: "students per batch" },
]

export function Credibility() {
  return (
    <section className="border-y bg-muted/30">
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((s) => (
            <div key={s.k} className="px-4 py-6 sm:py-8">
              <dt className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
                {s.v}
              </dt>
              <dd className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                {s.k}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
