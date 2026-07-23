import {
  IconTargetArrow,
  IconMap2,
  IconListCheck,
  IconClipboardCheck,
  IconCalendarStats,
  IconBulb,
  IconArrowRight,
} from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"
import { ThemedImage } from "@/components/themed-image"
import { IndiaMapGraphic } from "@/components/india-map-graphic"

interface LiveTool {
  icon: typeof IconTargetArrow
  title: string
  body: string
  href: string
  keywords?: string
  lock?: number
  logo?: string
  logoAlt?: string
  mapGraphic?: boolean
}

interface SoonTool {
  icon: typeof IconTargetArrow
  title: string
}

const LIVE: LiveTool[] = [
  {
    icon: IconTargetArrow,
    title: "NEET Predictor",
    body: "Turn a score or rank into a tiered list of Safe, Moderate, and Reach colleges across MBBS, BDS, and Nursing.",
    href: "/neet-predictor-2026",
    logo: "/aiims.png",
    logoAlt: "All India Institute of Medical Sciences (AIIMS) logo",
  },
  {
    icon: IconMap2,
    title: "State Explorer",
    body: "Browse every state by college count and cutoff, then drill into a state for its full directory with closing data.",
    href: "/states",
    mapGraphic: true,
  },
]

const SOON: SoonTool[] = [
  { icon: IconListCheck, title: "Syllabus Tracker" },
  { icon: IconClipboardCheck, title: "Mock Tests + Counselling" },
  { icon: IconCalendarStats, title: "Daily Preparation Goals" },
  { icon: IconBulb, title: "Quick Tips & Strategies" },
]

// Criss-cross bento placement: two 2x2 live blocks on the top-left / bottom-right
// diagonal, four small "coming soon" cells filling the anti-diagonal corners.
const PLACEMENT = {
  neet: "md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2",
  state: "md:col-start-3 md:row-start-2 md:col-span-2 md:row-span-2",
  soon: [
    "md:col-start-3 md:row-start-1",
    "md:col-start-4 md:row-start-1",
    "md:col-start-1 md:row-start-3",
    "md:col-start-2 md:row-start-3",
  ],
}

export function PlatformFeatures() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need, in one place.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Two tools are live today. The rest of the preparation stack is on the way.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[13rem]">
        <Reveal className={PLACEMENT.neet}>
          <LiveCard tool={LIVE[0]!} />
        </Reveal>
        <Reveal className={PLACEMENT.state} delay={0.05}>
          <LiveCard tool={LIVE[1]!} />
        </Reveal>
        {SOON.map((tool, i) => (
          <Reveal key={tool.title} className={PLACEMENT.soon[i]} delay={0.1 + i * 0.05}>
            <SoonCard tool={tool} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function LiveCard({ tool }: { tool: LiveTool }) {
  return (
    <a
      href={tool.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border glass-card transition-colors hover:border-primary/40"
    >
      <div className="relative aspect-[16/10] border-b md:aspect-auto md:min-h-0 md:flex-1">
        {tool.logo ? (
          <div className="flex h-full items-center justify-center bg-white p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tool.logo}
              alt={tool.logoAlt ?? `${tool.title} logo`}
              loading="lazy"
              className="max-h-full w-auto max-w-[62%] object-contain"
            />
          </div>
        ) : tool.mapGraphic ? (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/[0.06] to-primary/[0.16] p-5">
            <IndiaMapGraphic className="h-full max-h-[240px] w-auto" />
          </div>
        ) : (
          <ThemedImage
            keywords={tool.keywords ?? "medical,india"}
            lock={tool.lock ?? 1}
            grayscale
            alt={`${tool.title} preview`}
            width={720}
            height={480}
            rounded="rounded-none"
            className="absolute inset-0 h-full w-full border-0"
          />
        )}
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow">
          Live
        </span>
        <span className="absolute -bottom-5 left-6 inline-flex size-11 items-center justify-center rounded-xl border bg-card text-primary shadow-sm">
          <tool.icon className="size-6" stroke={1.8} />
        </span>
      </div>
      <div className="flex flex-col p-6 pt-8">
        <h3 className="text-lg font-semibold">{tool.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {tool.body}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Open
          <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" stroke={2.2} />
        </span>
      </div>
    </a>
  )
}

function SoonCard({ tool }: { tool: SoonTool }) {
  return (
    <div className="relative flex h-full min-h-[9rem] flex-col justify-between overflow-hidden rounded-2xl border glass-card p-6">
      {/* large branded icon graphic fills the space (no unreliable stock) */}
      <tool.icon
        className="pointer-events-none absolute -right-6 -top-4 size-40 rotate-6 text-primary/[0.10]"
        stroke={1}
      />
      <span className="relative inline-flex size-10 items-center justify-center rounded-lg border bg-background text-primary">
        <tool.icon className="size-5" stroke={1.8} />
      </span>
      <div className="relative mt-6">
        <h3 className="text-sm font-semibold">{tool.title}</h3>
        <span className="mt-2 inline-block rounded-full border bg-background/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          Coming soon
        </span>
      </div>
    </div>
  )
}
