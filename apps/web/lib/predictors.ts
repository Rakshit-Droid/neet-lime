// -----------------------------------------------------------------------------
// NEET Companion engine
// Indicative models built on approximate NEET (AIQ / MBBS) trend data.
// Not official counselling data — a directional read for aspirants.
// -----------------------------------------------------------------------------

export const MAX_MARKS = 720

const RANK_ANCHORS: Array<[marks: number, air: number]> = [
  [720, 1],
  [715, 22],
  [705, 130],
  [690, 520],
  [675, 1250],
  [660, 2650],
  [640, 5600],
  [620, 9900],
  [600, 16200],
  [580, 24300],
  [560, 34100],
  [540, 47200],
  [520, 63400],
  [500, 82600],
  [480, 105800],
  [450, 148900],
  [420, 201200],
  [400, 241700],
  [360, 331400],
  [320, 442800],
  [280, 561900],
  [240, 693200],
  [200, 824500],
  [164, 1002300],
  [0, 1360000],
]

export interface RankPrediction {
  air: number
  low: number
  high: number
  percentile: number
}

export function marksToRank(marks: number): RankPrediction {
  const m = Math.max(0, Math.min(MAX_MARKS, marks))
  let air = RANK_ANCHORS[RANK_ANCHORS.length - 1]![1]
  for (let i = 0; i < RANK_ANCHORS.length - 1; i++) {
    const [mHi, rHi] = RANK_ANCHORS[i]!
    const [mLo, rLo] = RANK_ANCHORS[i + 1]!
    if (m <= mHi && m >= mLo) {
      const t = mHi === mLo ? 0 : (mHi - m) / (mHi - mLo)
      air = Math.round(rHi + (rLo - rHi) * t)
      break
    }
  }
  const band = Math.max(3, Math.round(air * 0.08))
  const percentile = Math.max(0, Math.min(99.99, (1 - air / 1360000) * 100))
  return {
    air,
    low: Math.max(1, air - band),
    high: air + band,
    percentile: Math.round(percentile * 100) / 100,
  }
}

// Inverse: approximate NEET score for a given AIR (used for state cutoff display).
export function rankToApproxMarks(air: number): number {
  const r = Math.max(1, air)
  for (let i = 0; i < RANK_ANCHORS.length - 1; i++) {
    const [mHi, rHi] = RANK_ANCHORS[i]!
    const [mLo, rLo] = RANK_ANCHORS[i + 1]!
    if (r >= rHi && r <= rLo) {
      const t = rLo === rHi ? 0 : (r - rHi) / (rLo - rHi)
      return Math.round(mHi + (mLo - mHi) * t)
    }
  }
  return 0
}

export type Category = "General" | "OBC" | "SC" | "ST" | "EWS" | "PwD"
export const CATEGORIES: Category[] = ["General", "OBC", "SC", "ST", "EWS", "PwD"]

export type Course = "MBBS" | "BDS" | "B.Sc Nursing"
export const COURSES: Course[] = ["MBBS", "BDS", "B.Sc Nursing"]

const CATEGORY_FACTOR: Record<Category, number> = {
  General: 1,
  EWS: 1.18,
  OBC: 1.65,
  PwD: 1.35,
  SC: 6.4,
  ST: 9.8,
}

export type Region = "North" | "South" | "East" | "West" | "Central" | "Northeast"
export const REGIONS: Region[] = ["North", "South", "East", "West", "Central", "Northeast"]

const REGION_BY_STATE: Record<string, Region> = {
  Delhi: "North",
  "Uttar Pradesh": "North",
  Rajasthan: "North",
  Punjab: "North",
  Haryana: "North",
  "Himachal Pradesh": "North",
  Uttarakhand: "North",
  Chandigarh: "North",
  "Jammu & Kashmir": "North",
  "Tamil Nadu": "South",
  Karnataka: "South",
  Kerala: "South",
  "Andhra Pradesh": "South",
  Telangana: "South",
  Puducherry: "South",
  "West Bengal": "East",
  Bihar: "East",
  Jharkhand: "East",
  Odisha: "East",
  Maharashtra: "West",
  Gujarat: "West",
  Goa: "West",
  "Madhya Pradesh": "Central",
  Chhattisgarh: "Central",
  Assam: "Northeast",
  Manipur: "Northeast",
  Tripura: "Northeast",
  Meghalaya: "Northeast",
}

export interface College {
  name: string
  city: string
  state: string
  type: "Government" | "Institute of National Importance" | "Deemed"
  closing: number // approx general-category AIQ closing rank for MBBS
  courses: Course[]
}

export const COLLEGES: College[] = [
  { name: "AIIMS, New Delhi", city: "New Delhi", state: "Delhi", type: "Institute of National Importance", closing: 57, courses: ["MBBS", "B.Sc Nursing"] },
  { name: "Maulana Azad Medical College", city: "New Delhi", state: "Delhi", type: "Government", closing: 172, courses: ["MBBS"] },
  { name: "JIPMER", city: "Puducherry", state: "Puducherry", type: "Institute of National Importance", closing: 214, courses: ["MBBS", "B.Sc Nursing"] },
  { name: "VMMC & Safdarjung Hospital", city: "New Delhi", state: "Delhi", type: "Government", closing: 243, courses: ["MBBS"] },
  { name: "Lady Hardinge Medical College", city: "New Delhi", state: "Delhi", type: "Government", closing: 486, courses: ["MBBS"] },
  { name: "University College of Medical Sciences", city: "New Delhi", state: "Delhi", type: "Government", closing: 512, courses: ["MBBS"] },
  { name: "Maulana Azad Institute of Dental Sciences", city: "New Delhi", state: "Delhi", type: "Government", closing: 3400, courses: ["BDS"] },
  { name: "Seth GS Medical College (KEM)", city: "Mumbai", state: "Maharashtra", type: "Government", closing: 812, courses: ["MBBS"] },
  { name: "Grant Medical College", city: "Mumbai", state: "Maharashtra", type: "Government", closing: 1327, courses: ["MBBS", "BDS"] },
  { name: "BJ Government Medical College", city: "Pune", state: "Maharashtra", type: "Government", closing: 2148, courses: ["MBBS"] },
  { name: "Govt. Medical College", city: "Nagpur", state: "Maharashtra", type: "Government", closing: 5233, courses: ["MBBS", "B.Sc Nursing"] },
  { name: "Institute of Medical Sciences, BHU", city: "Varanasi", state: "Uttar Pradesh", type: "Government", closing: 934, courses: ["MBBS", "BDS"] },
  { name: "King George's Medical University", city: "Lucknow", state: "Uttar Pradesh", type: "Government", closing: 1683, courses: ["MBBS", "BDS"] },
  { name: "GSVM Medical College", city: "Kanpur", state: "Uttar Pradesh", type: "Government", closing: 6120, courses: ["MBBS"] },
  { name: "Madras Medical College", city: "Chennai", state: "Tamil Nadu", type: "Government", closing: 1462, courses: ["MBBS"] },
  { name: "Stanley Medical College", city: "Chennai", state: "Tamil Nadu", type: "Government", closing: 3892, courses: ["MBBS", "B.Sc Nursing"] },
  { name: "Coimbatore Medical College", city: "Coimbatore", state: "Tamil Nadu", type: "Government", closing: 7450, courses: ["MBBS"] },
  { name: "Bangalore Medical College", city: "Bengaluru", state: "Karnataka", type: "Government", closing: 2472, courses: ["MBBS"] },
  { name: "Mysore Medical College", city: "Mysuru", state: "Karnataka", type: "Government", closing: 6844, courses: ["MBBS", "BDS"] },
  { name: "Karnataka Institute of Medical Sciences", city: "Hubli", state: "Karnataka", type: "Government", closing: 9200, courses: ["MBBS"] },
  { name: "Govt. Medical College", city: "Thiruvananthapuram", state: "Kerala", type: "Government", closing: 3644, courses: ["MBBS"] },
  { name: "Govt. Medical College", city: "Kozhikode", state: "Kerala", type: "Government", closing: 4287, courses: ["MBBS", "B.Sc Nursing"] },
  { name: "Osmania Medical College", city: "Hyderabad", state: "Telangana", type: "Government", closing: 3418, courses: ["MBBS"] },
  { name: "Gandhi Medical College", city: "Hyderabad", state: "Telangana", type: "Government", closing: 5641, courses: ["MBBS"] },
  { name: "Andhra Medical College", city: "Visakhapatnam", state: "Andhra Pradesh", type: "Government", closing: 6980, courses: ["MBBS"] },
  { name: "SMS Medical College", city: "Jaipur", state: "Rajasthan", type: "Government", closing: 3126, courses: ["MBBS", "BDS"] },
  { name: "Govt. Medical College", city: "Kota", state: "Rajasthan", type: "Government", closing: 8917, courses: ["MBBS"] },
  { name: "Sardar Patel Medical College", city: "Bikaner", state: "Rajasthan", type: "Government", closing: 11240, courses: ["MBBS"] },
  { name: "AIIMS, Jodhpur", city: "Jodhpur", state: "Rajasthan", type: "Institute of National Importance", closing: 1288, courses: ["MBBS"] },
  { name: "Government Medical College", city: "Chandigarh", state: "Chandigarh", type: "Government", closing: 342, courses: ["MBBS"] },
  { name: "Government Medical College", city: "Patiala", state: "Punjab", type: "Government", closing: 7100, courses: ["MBBS", "BDS"] },
  { name: "Dayanand Medical College", city: "Ludhiana", state: "Punjab", type: "Deemed", closing: 14800, courses: ["MBBS", "BDS"] },
  { name: "Pt. BD Sharma PGIMS", city: "Rohtak", state: "Haryana", type: "Government", closing: 6600, courses: ["MBBS"] },
  { name: "Indira Gandhi Medical College", city: "Shimla", state: "Himachal Pradesh", type: "Government", closing: 10400, courses: ["MBBS"] },
  { name: "Gujarat Medical College (BJ)", city: "Ahmedabad", state: "Gujarat", type: "Government", closing: 4900, courses: ["MBBS"] },
  { name: "Government Medical College", city: "Surat", state: "Gujarat", type: "Government", closing: 8300, courses: ["MBBS", "BDS"] },
  { name: "Gandhi Medical College", city: "Bhopal", state: "Madhya Pradesh", type: "Government", closing: 7200, courses: ["MBBS"] },
  { name: "Mahatma Gandhi Memorial MC", city: "Indore", state: "Madhya Pradesh", type: "Government", closing: 6400, courses: ["MBBS", "B.Sc Nursing"] },
  { name: "Pt. JNM Medical College", city: "Raipur", state: "Chhattisgarh", type: "Government", closing: 9900, courses: ["MBBS"] },
  { name: "Medical College", city: "Kolkata", state: "West Bengal", type: "Government", closing: 2600, courses: ["MBBS", "BDS"] },
  { name: "R.G. Kar Medical College", city: "Kolkata", state: "West Bengal", type: "Government", closing: 4100, courses: ["MBBS"] },
  { name: "Patna Medical College", city: "Patna", state: "Bihar", type: "Government", closing: 7412, courses: ["MBBS"] },
  { name: "Nalanda Medical College", city: "Patna", state: "Bihar", type: "Government", closing: 12900, courses: ["MBBS"] },
  { name: "SCB Medical College", city: "Cuttack", state: "Odisha", type: "Government", closing: 5300, courses: ["MBBS", "BDS"] },
  { name: "Rajendra Institute of Medical Sciences", city: "Ranchi", state: "Jharkhand", type: "Government", closing: 15320, courses: ["MBBS"] },
  { name: "Gauhati Medical College", city: "Guwahati", state: "Assam", type: "Government", closing: 14560, courses: ["MBBS"] },
  { name: "Regional Institute of Medical Sciences", city: "Imphal", state: "Manipur", type: "Government", closing: 12180, courses: ["MBBS", "B.Sc Nursing"] },
  { name: "Goa Medical College", city: "Bambolim", state: "Goa", type: "Government", closing: 8100, courses: ["MBBS"] },
]

export function regionOf(state: string): Region {
  return REGION_BY_STATE[state] ?? "North"
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export type Tier = "Safe" | "Moderate" | "Reach"

export interface CollegeMatch extends College {
  tier: Tier
  threshold: number
}

export function rankToColleges(
  rank: number,
  category: Category,
  course: Course = "MBBS",
): { matches: CollegeMatch[]; total: number } {
  const r = Math.max(1, Math.round(rank))
  const factor = CATEGORY_FACTOR[category]
  const eligible: CollegeMatch[] = []
  for (const c of COLLEGES) {
    if (!c.courses.includes(course)) continue
    const threshold = Math.round(c.closing * factor)
    if (r <= threshold) {
      const margin = r / threshold
      const tier: Tier = margin <= 0.6 ? "Safe" : margin <= 0.85 ? "Moderate" : "Reach"
      eligible.push({ ...c, tier, threshold })
    }
  }
  eligible.sort((a, b) => a.closing - b.closing)
  return { matches: eligible.slice(0, 12), total: eligible.length }
}

export function marksToColleges(marks: number, category: Category, course: Course = "MBBS") {
  const pred = marksToRank(marks)
  return { ...rankToColleges(pred.air, category, course), rank: pred }
}

export interface StateSummary {
  state: string
  slug: string
  region: Region
  collegeCount: number
  topCollege: string
  bestCutoffMarks: number
  courses: Course[]
}

export function statesSummary(): StateSummary[] {
  const byState = new Map<string, College[]>()
  for (const c of COLLEGES) {
    const arr = byState.get(c.state) ?? []
    arr.push(c)
    byState.set(c.state, arr)
  }
  const out: StateSummary[] = []
  for (const [state, list] of byState) {
    const sorted = [...list].sort((a, b) => a.closing - b.closing)
    const best = sorted[0]!
    const courses = Array.from(new Set(list.flatMap((c) => c.courses))) as Course[]
    out.push({
      state,
      slug: slugify(state),
      region: regionOf(state),
      collegeCount: list.length,
      topCollege: best.name,
      bestCutoffMarks: rankToApproxMarks(best.closing),
      courses,
    })
  }
  return out.sort((a, b) => b.collegeCount - a.collegeCount)
}

export function collegesByState(slug: string): { state: string; colleges: College[] } | null {
  const match = COLLEGES.filter((c) => slugify(c.state) === slug)
  if (match.length === 0) return null
  return {
    state: match[0]!.state,
    colleges: [...match].sort((a, b) => a.closing - b.closing),
  }
}

export const PLATFORM_STATS = {
  colleges: COLLEGES.length,
  states: new Set(COLLEGES.map((c) => c.state)).size,
  courses: COURSES.length,
}

export function formatIndian(n: number): string {
  const s = Math.round(n).toString()
  if (s.length <= 3) return s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3
}
