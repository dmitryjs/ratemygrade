import type { Question } from "./types"

const JAILBREAK =
  /игнорируй (все|предыдущ)|ignore (all|previous|instructions)|system prompt|jailbreak|ты теперь|act as|developer mode|forget your (instructions|rules)/i

const SHORT_META =
  /^(а )?(кто ты|что ты|что умеешь|какие у тебя|расскажи о себе|какой у меня (грейд|grade|уровень)|сколько я (стою|должен|зарабатываю)|посчитай( грейд)?|выведи результат|какой следующий вопрос)\??$/i

export function offTopicReply(question?: Question): string {
  if (!question || question.kind === "open") {
    return "Это не ответ на текущий вопрос. Напишите пример своими словами — выбирать номер здесь не нужно. Если кейса нет, напишите: не могу вспомнить пример."
  }
  if (question.kind === "hybrid") {
    return "Давайте останемся на этом вопросе. Можно номер и короткий пример или сразу описать своими словами."
  }
  if (question.kind === "multi_select") {
    return "Давайте останемся на этом вопросе. Можно несколько номеров через запятую или описать текстом."
  }
  return "Давайте останемся на этом вопросе. Можно номер варианта или свой ответ текстом."
}

/** @deprecated Use offTopicReply(question) */
export const OFF_TOPIC_REPLY = offTopicReply()

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[«»"'.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function optionByNumber(question: Question, raw: string) {
  const byId = question.options.find((option) => option.id === raw)
  if (byId) return byId
  const index = Number(raw) - 1
  return question.options[index]
}

export function isSkipExample(text: string): boolean {
  return /не могу вспомнить|нет примера|не вспомина/i.test(text)
}

export function isJailbreak(text: string): boolean {
  return JAILBREAK.test(text.trim())
}

export function matchOption(text: string, question: Question) {
  if (question.options.length === 0) return undefined
  const trimmed = text.trim()
  if (!trimmed) return undefined
  const normalized = normalize(trimmed)

  const bare = trimmed.match(/^(\d{1,2})\s*[.)]?$/)
  if (bare) return optionByNumber(question, bare[1])

  const dotted = trimmed.match(/^(\d{1,2})\s*[.)]\s+\S/)
  if (dotted) return optionByNumber(question, dotted[1])

  const byId = question.options.find(
    (option) => normalized === option.id || normalized === option.id.toUpperCase()
  )
  if (byId) return byId

  const exact = question.options.find((option) => normalize(option.label) === normalized)
  if (exact) return exact

  if (normalized.length <= 48) {
    return question.options.find((option) => {
      const label = normalize(option.label)
      if (!label || label.length < 4) return false
      return label === normalized || normalized === label
    })
  }

  return undefined
}

export function matchOptions(text: string, question: Question) {
  if (question.options.length === 0) return []
  const compact = text.trim()
  const looksLikeNumberList = compact.length < 80 && /^[\d\s,;./]+$/.test(compact)
  if (looksLikeNumberList) {
    const unique = [...new Set([...compact.matchAll(/\d{1,2}/g)].map((match) => match[0]))]
    return unique
      .map((id) => optionByNumber(question, id))
      .filter((option): option is NonNullable<typeof option> => Boolean(option))
  }

  const found = question.options.filter((option) => {
    const label = normalize(option.label)
    if (label.length < 5) return false
    return normalize(compact) === label
  })
  if (found.length > 0) return found

  const single = matchOption(text, question)
  return single ? [single] : []
}

export function isOffTopic(text: string, question: Question): boolean {
  const trimmed = text.trim()
  if (!trimmed) return true
  if (isJailbreak(trimmed)) return true
  if (isSkipExample(trimmed)) return false
  if (question.kind === "open" || question.kind === "hybrid") return false
  if (trimmed.length <= 80 && SHORT_META.test(trimmed)) return true
  return false
}
