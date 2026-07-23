import {
  IconActivityHeartbeat,
  IconBrandWhatsapp,
  IconBrandX,
  IconBrandFacebook,
  IconBrandTelegram,
  IconBrandLinkedin,
  IconBrandReddit,
} from "@tabler/icons-react"
import { PREDICTOR_LINKS } from "@/lib/nav-links"

const SITE = "https://neetcompanion.com"
const SHARE_TEXT = "Free NEET college and rank predictors"

const SHARE = [
  { Icon: IconBrandWhatsapp, label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + SITE)}` },
  { Icon: IconBrandX, label: "X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE)}&text=${encodeURIComponent(SHARE_TEXT)}` },
  { Icon: IconBrandFacebook, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE)}` },
  { Icon: IconBrandTelegram, label: "Telegram", href: `https://t.me/share/url?url=${encodeURIComponent(SITE)}&text=${encodeURIComponent(SHARE_TEXT)}` },
  { Icon: IconBrandLinkedin, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE)}` },
  { Icon: IconBrandReddit, label: "Reddit", href: `https://www.reddit.com/submit?url=${encodeURIComponent(SITE)}&title=${encodeURIComponent(SHARE_TEXT)}` },
]

const EXPLORE = [
  { label: "States", href: "/states" },
  { label: "Colleges", href: "/colleges" },
  { label: "Pricing", href: "/pricing" },
  { label: "Sitemap", href: "/sitemap" },
]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <IconActivityHeartbeat className="size-5" stroke={2.2} />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                NEET<span className="text-muted-foreground"> Companion</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Free NEET predictors and a college and state explorer, plus the Pro
              Choice-Filling Assistant. Built on real counselling patterns.
            </p>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Share</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {SHARE.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share on ${label}`}
                    className="grid size-9 place-items-center rounded-lg border text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-4" stroke={2} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Predictors</h3>
            <ul className="mt-4 space-y-2.5">
              {PREDICTOR_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; 2026 NEET Companion. Predictor estimates are indicative, not official counselling data.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
