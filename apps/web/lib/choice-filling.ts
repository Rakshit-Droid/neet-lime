// Choice-Filling Assistant engine (Pro).
// UI-first: produces a genuinely ordered choice list from the college dataset so
// the flow shows real output. The full optimiser (round-by-round mock allotment,
// domicile/state-quota weighting, seat-matrix depth) and credit metering are
// wired later — see the marked TODOs.

import {
  rankToColleges,
  formatIndian,
  type Category,
  type Course,
  type CollegeMatch,
  type Tier,
} from "@/lib/predictors"

export type Quota = "All India Quota" | "State Quota"
export const QUOTAS: Quota[] = ["All India Quota", "State Quota"]

// Credits a single full choice-list generation costs (Pro). Placeholder value.
export const CHOICE_LIST_CREDIT_COST = 20
// How many choices a non-Pro visitor previews before the paywall.
export const FREE_PREVIEW_CHOICES = 3

export interface ChoiceInput {
  rank: number
  category: Category
  course: Course
  quota: Quota
}

export interface Choice {
  order: number
  college: CollegeMatch
  advice: string
}

export interface ChoiceList {
  choices: Choice[]
  counts: Record<Tier, number>
  total: number
}

const ADVICE: Record<Tier, string> = {
  Reach: "Aspirational. List it high, cutoffs can loosen in later rounds.",
  Moderate: "On-target. The core of a competitive list.",
  Safe: "Anchor. Locks a confirmed seat as a backstop.",
}

// Choice-filling strategy: order best-to-worst (reach first, safe last), because
// counselling allots the highest preference you clear, so aspirational picks sit
// at the top and safe anchors at the bottom.
export function buildChoiceList(input: ChoiceInput): ChoiceList {
  const { matches } = rankToColleges(input.rank, input.category, input.course)
  const ordered = [...matches].sort((a, b) => a.closing - b.closing)

  const choices: Choice[] = ordered.map((c, i) => ({
    order: i + 1,
    college: c,
    advice: ADVICE[c.tier],
  }))

  const counts: Record<Tier, number> = { Safe: 0, Moderate: 0, Reach: 0 }
  for (const c of ordered) counts[c.tier]++

  return { choices, counts, total: choices.length }
}

export { formatIndian }
