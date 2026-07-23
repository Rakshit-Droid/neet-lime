import { Reveal } from "@/components/reveal"

interface Story {
  quote: string
  name: string
  air: string
  college: string
  seed: string
}

const STORIES: Story[] = [
  {
    quote:
      "The predictor had Maulana Azad on my Safe list weeks before counselling. It matched my final allotment almost exactly.",
    name: "Aditya Nair",
    air: "AIR 214",
    college: "Maulana Azad Medical College",
    seed: "aditya-nair",
  },
  {
    quote:
      "I compared states on the explorer and found Telangana gave me a far better seat than my home state. It changed my whole choice list.",
    name: "Sneha Reddy",
    air: "AIR 1,908",
    college: "Osmania Medical College",
    seed: "sneha-reddy",
  },
  {
    quote:
      "No sign-up, no spam, just honest Safe, Moderate, and Reach tiers. I checked it after every single mock.",
    name: "Rehan Qureshi",
    air: "AIR 5,472",
    college: "Grant Medical College, Mumbai",
    seed: "rehan-qureshi",
  },
  {
    quote:
      "The rank predictor was scary close. It said 3,600 off my last mock and I finished at AIR 3,418. That trust mattered.",
    name: "Ananya Iyer",
    air: "AIR 3,418",
    college: "Bangalore Medical College",
    seed: "ananya-iyer",
  },
  {
    quote:
      "The state explorer's cutoffs helped my parents understand my options without me explaining every college one by one.",
    name: "Ishita Deshpande",
    air: "AIR 902",
    college: "IMS BHU, Varanasi",
    seed: "ishita-deshpande",
  },
]

export function Testimonials() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            The only review that counts is the seat.
          </h2>
        </Reveal>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {STORIES.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.05}>
              <figure className="break-inside-avoid rounded-2xl border glass-card p-6">
                <blockquote className="text-[15px] leading-relaxed">{s.quote}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t pt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://loremflickr.com/160/160/indian,portrait/all?lock=${41 + i}`}
                    alt={`${s.name}, now at ${s.college}`}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="size-10 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-mono text-primary">{s.air}</span> · {s.college}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
