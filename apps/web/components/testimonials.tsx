import { IconQuote } from "@tabler/icons-react"
import { Reveal } from "@/components/reveal"

interface Story {
  quote: string
  name: string
  air: string
  college: string
}

const STORIES: Story[] = [
  {
    quote:
      "The predictor had Maulana Azad on my Safe list weeks before counselling. It matched my final allotment almost exactly.",
    name: "Aditya Nair",
    air: "AIR 214",
    college: "Maulana Azad Medical College",
  },
  {
    quote:
      "I compared states on the explorer and found Telangana gave me a far better seat than my home state. It changed my whole choice list.",
    name: "Sneha Reddy",
    air: "AIR 1,908",
    college: "Osmania Medical College",
  },
  {
    quote:
      "No sign-up, no spam, just honest Safe, Moderate, and Reach tiers. I checked it after every single mock.",
    name: "Rehan Qureshi",
    air: "AIR 5,472",
    college: "Grant Medical College, Mumbai",
  },
  {
    quote:
      "The rank predictor was scary close. It said 3,600 off my last mock and I finished at AIR 3,418. That trust mattered.",
    name: "Ananya Iyer",
    air: "AIR 3,418",
    college: "Bangalore Medical College",
  },
  {
    quote:
      "The state explorer's cutoffs helped my parents understand my options without me explaining every college one by one.",
    name: "Ishita Deshpande",
    air: "AIR 902",
    college: "IMS BHU, Varanasi",
  },
  {
    quote:
      "Filed my choice list straight off the Reach-to-Safe order it suggested. Locked my seat without second-guessing a single preference.",
    name: "Karthik Menon",
    air: "AIR 7,640",
    college: "GMC Kozhikode",
  },
  {
    quote:
      "Predicted AIR 12k, I finished at 11,540. Close enough that I trusted the college list completely — and it was right about my allotment.",
    name: "Priya Malhotra",
    air: "AIR 11,540",
    college: "SMS Medical College, Jaipur",
  },
  {
    quote:
      "The marks-to-college tool matched what my coaching promised, minus the counselling fee. That's the whole pitch, honestly.",
    name: "Farhan Sheikh",
    air: "AIR 4,205",
    college: "Seth GS Medical College, Mumbai",
  },
  {
    quote:
      "As a dropper I tracked every mock against last year's cutoffs. Watching my Safe tier grow week by week kept me sane.",
    name: "Divya Pillai",
    air: "AIR 15,900",
    college: "GMC Thrissur",
  },
  {
    quote:
      "My parents kept pushing the local private college. The state explorer found a government seat two states away for the same rank.",
    name: "Arjun Bhatt",
    air: "AIR 2,760",
    college: "BJ Medical College, Ahmedabad",
  },
  {
    quote:
      "OBC cutoffs are a maze everywhere else. Here I picked my category once and every list was already adjusted. No spreadsheets.",
    name: "Meera Krishnan",
    air: "AIR 8,320",
    college: "Stanley Medical College, Chennai",
  },
  {
    quote:
      "Top 1,000 feels like a coin toss for the best seats. Seeing exactly which colleges were in reach turned panic into a checklist.",
    name: "Rohan Gupta",
    air: "AIR 610",
    college: "VMMC & Safdarjung, New Delhi",
  },
]

const ROW_A = STORIES.slice(0, 6)
const ROW_B = STORIES.slice(6)

// Horizontal edge fade so cards dissolve in/out instead of clipping hard.
const FADE = "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)"

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function StoryCard({ s }: { s: Story }) {
  return (
    <figure className="mr-6 flex w-[340px] shrink-0 flex-col gap-5 rounded-2xl border glass-card p-6">
      <IconQuote className="size-6 text-primary/70" stroke={2} />
      <blockquote className="text-[15px] leading-relaxed text-foreground">{s.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t pt-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
          {initials(s.name)}
        </span>
        <div>
          <p className="text-sm font-semibold">{s.name}</p>
          <p className="text-xs text-muted-foreground">
            <span className="font-mono text-primary">{s.air}</span> · {s.college}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section className="overflow-hidden border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 md:pt-32">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            The only review that counts is the seat.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real outcomes from aspirants who turned a score into a plan — and a plan into an allotment.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col gap-6 pb-24 md:pb-32">
        {/* top row → drifts right */}
        <div
          className="marquee-pause overflow-hidden"
          style={{ "--marquee-duration": "70s", maskImage: FADE, WebkitMaskImage: FADE } as React.CSSProperties}
        >
          <div className="marquee-track marquee-right">
            {[...ROW_A, ...ROW_A].map((s, i) => (
              <StoryCard key={`a-${i}`} s={s} />
            ))}
          </div>
        </div>

        {/* bottom row → drifts left */}
        <div
          className="marquee-pause overflow-hidden"
          style={{ "--marquee-duration": "85s", maskImage: FADE, WebkitMaskImage: FADE } as React.CSSProperties}
        >
          <div className="marquee-track marquee-left">
            {[...ROW_B, ...ROW_B].map((s, i) => (
              <StoryCard key={`b-${i}`} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
