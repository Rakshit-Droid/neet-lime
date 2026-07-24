import { IconActivityHeartbeat } from "@tabler/icons-react"
import { PREDICTOR_LINKS } from "@/lib/nav-links"

const SITE = "https://neetcompanion.com"
const SHARE_TEXT = "Free NEET college and rank predictors"

const EXPLORE = [
  { label: "States", href: "/states" },
  { label: "Colleges", href: "/colleges" },
  { label: "Choice Filling", href: "/choice-filling" },
  { label: "Pricing", href: "/pricing" },
]

const CONNECT = [
  { label: "Contact", href: "#contact" },
  { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + SITE)}` },
  { label: "X (Twitter)", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE)}&text=${encodeURIComponent(SHARE_TEXT)}` },
  { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE)}` },
]

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/55">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <a
              href={l.href}
              className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* info bar */}
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 md:py-16">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary-foreground text-primary">
                <IconActivityHeartbeat className="size-5" stroke={2.2} />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">NEET Companion</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
              Turn your NEET rank into a seat. Free predictors and a state explorer,
              plus the Pro Choice-Filling Assistant — built on real counselling patterns.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-3 py-1 text-xs font-medium">
              <span className="size-1.5 rounded-full bg-primary-foreground" />
              Free forever · No registration
            </span>
          </div>

          <FooterCol title="Predictors" links={PREDICTOR_LINKS} />
          <FooterCol title="Explore" links={EXPLORE} />
          <FooterCol title="Connect" links={CONNECT} />
        </div>

        {/* legal row */}
        <div className="flex flex-col gap-3 border-t border-primary-foreground/20 py-6 text-xs text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 NEET Companion. Predictor estimates are indicative, not official counselling data.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-primary-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-primary-foreground">Disclaimer</a>
          </div>
        </div>
      </div>

      {/* giant wordmark — fills the width and clips at the edges */}
      <div className="w-full overflow-hidden" aria-hidden>
        <div className="flex select-none justify-center">
          <span className="-mb-[0.12em] whitespace-nowrap font-heading text-[19vw] font-bold leading-[0.8] tracking-tighter">
            NEET<span className="mx-[0.04em] font-sans">&rarr;</span>SEAT
          </span>
        </div>
      </div>
    </footer>
  )
}
