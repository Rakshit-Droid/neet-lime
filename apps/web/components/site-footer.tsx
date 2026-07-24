import {
  IconArrowRight,
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandTelegram,
} from "@tabler/icons-react"

const PREDICTORS = [
  { label: "NEET Predictor", href: "/neet-predictor-2026" },
  { label: "Rank to College", href: "/rank-to-college-predictor-2026" },
  { label: "Marks to College", href: "/marks-to-college-predictor-2026" },
  { label: "Rank Predictor", href: "/rank-predictor-2026" },
]

const EXPLORE = [
  { label: "States", href: "/states" },
  { label: "Colleges", href: "/colleges" },
  { label: "Choice Filling", href: "/choice-filling" },
  { label: "Pricing", href: "/pricing" },
]

const SUPPORT = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#contact" },
]

const LEGAL = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Disclaimer", href: "#" },
]

const SOCIAL = [
  { Icon: IconBrandX, label: "X", href: "#" },
  { Icon: IconBrandInstagram, label: "Instagram", href: "#" },
  { Icon: IconBrandLinkedin, label: "LinkedIn", href: "#" },
  { Icon: IconBrandWhatsapp, label: "WhatsApp", href: "#" },
  { Icon: IconBrandTelegram, label: "Telegram", href: "#" },
]

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-wider text-white/40">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <a href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
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
    <footer className="bg-[#0a0a0b] text-white">
      {/* giant logotype */}
      <div className="overflow-hidden px-4 pt-12 sm:px-6 md:pt-16">
        <h2 className="whitespace-nowrap font-heading text-[12vw] font-bold leading-[0.9] tracking-tight">
          <span className="text-primary">NEET</span> Companion
        </h2>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          {/* CTA */}
          <div>
            <a
              href="/neet-predictor-2026"
              className="group inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pl-5 pr-4 text-sm font-semibold text-primary-foreground transition-transform duration-300 active:scale-[0.97]"
            >
              Get started
              <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" stroke={2.2} />
            </a>
            <p className="mt-4 max-w-[13rem] text-xs leading-relaxed text-white/45">
              Free NEET predictors &amp; state explorer, plus the Pro Choice-Filling Assistant.
            </p>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterCol title="Predictors" links={PREDICTORS} />
            <FooterCol title="Explore" links={EXPLORE} />
            <FooterCol title="Support" links={SUPPORT} />
            <FooterCol title="Legal" links={LEGAL} />
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 NEET Companion. Predictor estimates are indicative, not official counselling data.</p>
          <div className="flex items-center gap-2">
            {SOCIAL.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-8 place-items-center rounded-lg text-white/55 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="size-4" stroke={2} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
