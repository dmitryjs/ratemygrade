export type Grade =
  | "Junior"
  | "Middle"
  | "Strong Middle"
  | "Senior"
  | "Senior+"
  | "Lead IC"
  | "Lead"
  | "Staff / Principal"

export type DimensionId =
  | "scope_ownership"
  | "autonomy"
  | "product_thinking"
  | "impact_metrics"
  | "ux_complexity"
  | "systems_thinking"
  | "delivery_qa"
  | "research"
  | "product_judgment"
  | "influence"
  | "leadership"
  | "technical_fluency"
  | "ambiguity"

export type QuestionKind = "single_select" | "multi_select" | "open" | "hybrid"

export type EvidenceConfidence = "low" | "medium" | "high"

export type QuestionOption = {
  id: string
  label: string
  score?: 0 | 1 | 2 | 3 | 4
}

export type Question = {
  id: string
  phase: "core" | "adaptive" | "compensation"
  kind: QuestionKind
  dimension?: DimensionId
  extraDimensions?: DimensionId[]
  text: string
  hints?: string[]
  placeholder?: string
  followUp?: string
  gradeRelevant?: boolean
  options: QuestionOption[]
}

export type InterviewAnswer = {
  questionId: string
  optionId?: string
  text: string
  score?: 0 | 1 | 2 | 3 | 4
  confidence?: EvidenceConfidence
  evidence?: string
  signals?: Partial<Record<DimensionId, 0 | 1 | 2 | 3 | 4>>
}

export type DimensionScore = {
  id: DimensionId
  name: string
  score: number
  confidence: number
}

export type GradeResult = {
  grade: Grade
  score: number
  confidence: number
  summary: string
  dimensions: DimensionScore[]
  strengths: { title: string; reason: string; evidence?: string }[]
  growthAreas: { title: string; reason: string; nextStep: string }[]
  nextGrade: {
    grade: string
    missingSignals: string[]
    recommendedActions: string[]
  }
  compensation: {
    market: string
    current?: string
    recommendedRange?: string
    targetAsk?: string
    fteHourlyEquivalent?: string
    freelanceHourlyRange?: string
    marketPosition?:
      | "significantly below"
      | "below"
      | "in range"
      | "above"
      | "significantly above"
    confidence: EvidenceConfidence
    note?: string
  }
}

export type InterviewPhase = "core" | "adaptive" | "compensation" | "done"

export type InterviewResponse =
  | {
      type: "off_topic"
      reply: string
      progress: { current: number; total: number }
    }
  | {
      type: "next"
      reply: string
      question: Question
      progress: { current: number; total: number }
      answers: InterviewAnswer[]
    }
  | {
      type: "result"
      reply: string
      result: GradeResult
      progress: { current: number; total: number }
      answers: InterviewAnswer[]
    }
