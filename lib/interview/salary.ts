import type { EvidenceConfidence, Grade } from "./types"

export type SalaryBand = {
  min: number
  median: number
  max: number
  currency: string
  period: "month"
}

const GRADE_KEYS = [
  "Junior",
  "Middle",
  "Strong Middle",
  "Senior",
  "Senior+",
  "Lead IC",
  "Lead",
  "Staff / Principal",
] as const

type GradeKey = (typeof GRADE_KEYS)[number]

const BANDS: Record<string, Record<GradeKey, SalaryBand>> = {
  ru: {
    Junior: { min: 90_000, median: 130_000, max: 170_000, currency: "RUB", period: "month" },
    Middle: { min: 160_000, median: 220_000, max: 280_000, currency: "RUB", period: "month" },
    "Strong Middle": { min: 200_000, median: 270_000, max: 330_000, currency: "RUB", period: "month" },
    Senior: { min: 280_000, median: 360_000, max: 450_000, currency: "RUB", period: "month" },
    "Senior+": { min: 340_000, median: 420_000, max: 520_000, currency: "RUB", period: "month" },
    "Lead IC": { min: 400_000, median: 500_000, max: 620_000, currency: "RUB", period: "month" },
    Lead: { min: 420_000, median: 540_000, max: 680_000, currency: "RUB", period: "month" },
    "Staff / Principal": { min: 550_000, median: 720_000, max: 900_000, currency: "RUB", period: "month" },
  },
  cis: {
    Junior: { min: 800, median: 1_200, max: 1_600, currency: "USD", period: "month" },
    Middle: { min: 1_500, median: 2_100, max: 2_700, currency: "USD", period: "month" },
    "Strong Middle": { min: 2_000, median: 2_600, max: 3_200, currency: "USD", period: "month" },
    Senior: { min: 2_600, median: 3_400, max: 4_200, currency: "USD", period: "month" },
    "Senior+": { min: 3_200, median: 4_000, max: 4_800, currency: "USD", period: "month" },
    "Lead IC": { min: 3_800, median: 4_800, max: 5_800, currency: "USD", period: "month" },
    Lead: { min: 4_000, median: 5_200, max: 6_400, currency: "USD", period: "month" },
    "Staff / Principal": { min: 5_200, median: 6_800, max: 8_500, currency: "USD", period: "month" },
  },
  eu: {
    Junior: { min: 2_500, median: 3_200, max: 3_800, currency: "EUR", period: "month" },
    Middle: { min: 3_500, median: 4_400, max: 5_200, currency: "EUR", period: "month" },
    "Strong Middle": { min: 4_200, median: 5_100, max: 5_800, currency: "EUR", period: "month" },
    Senior: { min: 5_000, median: 6_200, max: 7_500, currency: "EUR", period: "month" },
    "Senior+": { min: 6_000, median: 7_200, max: 8_400, currency: "EUR", period: "month" },
    "Lead IC": { min: 6_800, median: 8_200, max: 9_600, currency: "EUR", period: "month" },
    Lead: { min: 7_200, median: 8_800, max: 10_500, currency: "EUR", period: "month" },
    "Staff / Principal": { min: 9_000, median: 11_000, max: 14_000, currency: "EUR", period: "month" },
  },
  us: {
    Junior: { min: 5_500, median: 7_000, max: 8_500, currency: "USD", period: "month" },
    Middle: { min: 7_500, median: 9_500, max: 11_500, currency: "USD", period: "month" },
    "Strong Middle": { min: 9_000, median: 11_000, max: 13_000, currency: "USD", period: "month" },
    Senior: { min: 11_000, median: 13_500, max: 16_000, currency: "USD", period: "month" },
    "Senior+": { min: 13_000, median: 15_500, max: 18_000, currency: "USD", period: "month" },
    "Lead IC": { min: 14_500, median: 17_500, max: 20_500, currency: "USD", period: "month" },
    Lead: { min: 15_000, median: 18_500, max: 22_000, currency: "USD", period: "month" },
    "Staff / Principal": { min: 18_000, median: 22_000, max: 28_000, currency: "USD", period: "month" },
  },
  mena: {
    Junior: { min: 1_500, median: 2_100, max: 2_700, currency: "USD", period: "month" },
    Middle: { min: 2_400, median: 3_200, max: 4_000, currency: "USD", period: "month" },
    "Strong Middle": { min: 3_000, median: 3_900, max: 4_800, currency: "USD", period: "month" },
    Senior: { min: 4_000, median: 5_200, max: 6_500, currency: "USD", period: "month" },
    "Senior+": { min: 4_800, median: 6_000, max: 7_200, currency: "USD", period: "month" },
    "Lead IC": { min: 5_500, median: 7_000, max: 8_500, currency: "USD", period: "month" },
    Lead: { min: 6_000, median: 7_500, max: 9_200, currency: "USD", period: "month" },
    "Staff / Principal": { min: 7_500, median: 9_500, max: 12_000, currency: "USD", period: "month" },
  },
  remote: {
    Junior: { min: 1_800, median: 2_600, max: 3_400, currency: "USD", period: "month" },
    Middle: { min: 3_000, median: 4_200, max: 5_400, currency: "USD", period: "month" },
    "Strong Middle": { min: 3_800, median: 5_000, max: 6_200, currency: "USD", period: "month" },
    Senior: { min: 5_000, median: 6_800, max: 8_500, currency: "USD", period: "month" },
    "Senior+": { min: 6_200, median: 8_000, max: 9_800, currency: "USD", period: "month" },
    "Lead IC": { min: 7_000, median: 9_000, max: 11_000, currency: "USD", period: "month" },
    Lead: { min: 7_500, median: 9_800, max: 12_000, currency: "USD", period: "month" },
    "Staff / Principal": { min: 9_500, median: 12_500, max: 16_000, currency: "USD", period: "month" },
  },
}

BANDS.other = BANDS.remote

export const MARKET_LABELS: Record<string, string> = {
  ru: "Россия",
  cis: "СНГ",
  eu: "Европа",
  us: "США / Канада",
  mena: "Ближний Восток / ОАЭ",
  remote: "Международный удалённый формат",
  other: "Другой рынок",
}

function employmentModifier(employmentId: string): number {
  if (employmentId === "2") return 0.92
  if (employmentId === "3") return 1.06
  if (employmentId === "4" || employmentId === "5") return 1.1
  return 1
}

export function formatMoney(value: number, currency: string): string {
  const rounded = Math.round(value)
  if (currency === "RUB") {
    return `${rounded.toLocaleString("ru-RU")} ₽`
  }
  const symbol = currency === "EUR" ? "€" : "$"
  return `${symbol}${rounded.toLocaleString("en-US")}`
}

export function getSalaryBand(
  grade: Grade,
  market: string,
  employmentId: string
): SalaryBand | null {
  const table = BANDS[market] ?? BANDS.remote
  if (!table) return null
  const base = table[grade]
  const modifier = Math.min(1.2, Math.max(0.8, employmentModifier(employmentId)))
  return {
    ...base,
    min: Math.round(base.min * modifier),
    median: Math.round(base.median * modifier),
    max: Math.round(base.max * modifier),
  }
}

export function hourlyFromMonthly(band: SalaryBand) {
  const fteMin = Math.round(band.min / 160)
  const fteMax = Math.round(band.max / 160)
  const freelanceMin = Math.round(band.min / 120)
  const freelanceMax = Math.round(band.max / 100)
  return {
    fte: `${formatMoney(fteMin, band.currency)}–${formatMoney(fteMax, band.currency)}/ч`,
    freelance: `${formatMoney(freelanceMin, band.currency)}–${formatMoney(freelanceMax, band.currency)}/ч`,
  }
}

export function rangeLabel(band: SalaryBand): string {
  return `${formatMoney(band.min, band.currency)}–${formatMoney(band.max, band.currency)} / мес`
}

export function estimateCurrentAmount(
  optionId: string | undefined,
  market: string
): number | undefined {
  const table = BANDS[market] ?? BANDS.ru
  const senior = table.Senior
  const buckets: Record<string, number> = {
    "1": senior.min * 0.35,
    "2": senior.min * 0.6,
    "3": senior.median * 0.85,
    "4": senior.median,
    "5": senior.max * 0.95,
    "6": senior.max * 1.15,
  }
  if (!optionId || optionId === "7" || optionId === "8") return undefined
  return buckets[optionId]
}
