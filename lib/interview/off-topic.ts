import type { Question } from "./types"

const JAILBREAK =
  /игнорируй (все|предыдущ)|ignore (all|previous|instructions)|system prompt|jailbreak|ты теперь|act as|developer mode|forget your (instructions|rules)/i

const COMMAND =
  /^(напиши|сделай|сгенерируй|придумай|переведи|реши|найди|погугли|search the web|напиши код|сочини|роль|представь что)/i

const ASSISTANT_QUESTION =
  /^(а )?(кто ты|что ты|что умеешь|какие у тебя|расскажи о себе|какой у меня (грейд|grade|уровень)|сколько я (стою|должен|зарабатываю)|посчитай( грейд)?|выведи результат|какой следующий вопрос)/i

export const OFF_TOPIC_REPLY =
  "Давайте останемся в рамках опроса — это не ответ на текущий вопрос. Можно номер варианта, короткий пример или фразу «не могу вспомнить пример»."

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[«»"'.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function isSkipExample(text: string): boolean {
  return /не могу вспомнить|нет примера|не вспомина/i.test(text)
}

export function matchOption(text: string, question: Question) {
  if (question.options.length === 0) return undefined
  const normalized = normalize(text)
  if (!normalized) return undefined

  const numbered = normalized.match(/^(\d{1,2})([.)]|\b)/)
  if (numbered) {
    const byId = question.options.find((option) => option.id === numbered[1])
    if (byId) return byId
    const index = Number(numbered[1]) - 1
    const byNumber = question.options[index]
    if (byNumber) return byNumber
  }

  const byId = question.options.find(
    (option) => normalized === option.id || normalized === option.id.toUpperCase()
  )
  if (byId) return byId

  return question.options.find((option) => {
    const label = normalize(option.label)
    return (
      normalized === label ||
      (normalized.length > 12 && (label.includes(normalized) || normalized.includes(label)))
    )
  })
}

export function matchOptions(text: string, question: Question) {
  if (question.options.length === 0) return []
  const compact = text.trim()
  const looksLikeNumberList = compact.length < 80 && /^[\d\s,;./]+$/.test(compact)
  if (looksLikeNumberList) {
    const unique = [...new Set([...compact.matchAll(/\d{1,2}/g)].map((match) => match[0]))]
    return unique
      .map(
        (id) =>
          question.options.find((option) => option.id === id) ?? question.options[Number(id) - 1]
      )
      .filter((option): option is NonNullable<typeof option> => Boolean(option))
  }
  const single = matchOption(text, question)
  return single ? [single] : []
}

export function isOffTopic(text: string, question: Question): boolean {
  const trimmed = text.trim()
  if (!trimmed) return true
  if (JAILBREAK.test(trimmed) || COMMAND.test(trimmed) || ASSISTANT_QUESTION.test(trimmed)) {
    return true
  }
  if (isSkipExample(trimmed)) return false
  if (question.options.length > 0 && (matchOption(trimmed, question) || matchOptions(trimmed, question).length > 0)) {
    return false
  }

  const looksLikeQuestion =
    trimmed.includes("?") ||
    /^(а )?(что|как|почему|зачем|можешь|можете|расскажи|объясни|подскажи|сколько)\b/i.test(
      trimmed
    )
  const looksLikeAnswer =
    /^(я |у меня |обычно |в основном |работаю |делаю |отвечаю |сейчас |мы |как правило )/i.test(
      trimmed
    ) || trimmed.length >= 24

  if (question.kind === "open" || question.kind === "hybrid") {
    if (trimmed.length >= 20) return false
    if (looksLikeQuestion && !looksLikeAnswer) return true
    return trimmed.length < 8
  }

  if (looksLikeQuestion && !looksLikeAnswer) return true
  return false
}
