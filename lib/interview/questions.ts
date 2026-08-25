import type { DimensionId, InterviewAnswer, Question } from "./types"

export const OPEN_HINT =
  "Можно коротко, 3–6 предложений. Главное — реальный пример."
export const SKIP_HINT =
  "Если не вспоминается пример, напишите: не могу вспомнить пример."

function opt(
  id: string,
  label: string,
  score?: 0 | 1 | 2 | 3 | 4
): Question["options"][number] {
  return score === undefined ? { id, label } : { id, label, score }
}

function numbered(
  labels: [string, 0 | 1 | 2 | 3 | 4 | undefined][]
): Question["options"] {
  return labels.map(([label, score], i) => opt(String(i + 1), label, score))
}

export const CORE_QUESTION_IDS = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
  "q11",
  "q12",
  "q13",
  "q14",
  "q15",
  "q16",
  "q17",
  "q18",
  "q19",
  "q20",
  "q21",
  "q22",
  "q23",
  "q24",
] as const

export const COMPENSATION_IDS = ["c1", "c2", "c3"] as const
export const BASE_TOTAL = 27
export const MAX_TOTAL = 32
export const MAX_ADAPTIVE = MAX_TOTAL - CORE_QUESTION_IDS.length - COMPENSATION_IDS.length

export const DIMENSION_META: Record<DimensionId, { name: string; weight: number }> = {
  scope_ownership: { name: "Масштаб и ownership", weight: 0.14 },
  autonomy: { name: "Автономность", weight: 0.12 },
  product_thinking: { name: "Продуктовое мышление", weight: 0.1 },
  impact_metrics: { name: "Влияние и метрики", weight: 0.1 },
  ux_complexity: { name: "Сложность UX", weight: 0.08 },
  systems_thinking: { name: "Системное мышление", weight: 0.08 },
  delivery_qa: { name: "Delivery и дизайн-QA", weight: 0.08 },
  research: { name: "Исследования", weight: 0.06 },
  product_judgment: { name: "Продуктовое суждение", weight: 0.06 },
  influence: { name: "Влияние и коллаборация", weight: 0.06 },
  leadership: { name: "Лидерство", weight: 0.05 },
  technical_fluency: { name: "Техническая беглость", weight: 0.04 },
  ambiguity: { name: "Работа с неопределённостью", weight: 0.03 },
}

const CORE_QUESTIONS: Question[] = [
  {
    id: "q1",
    phase: "core",
    kind: "single_select",
    gradeRelevant: false,
    text: "На каком рынке вы сейчас работаете или ищете работу?",
    options: numbered([
      ["Россия", undefined],
      ["СНГ", undefined],
      ["Европа", undefined],
      ["США / Канада", undefined],
      ["Ближний Восток / ОАЭ", undefined],
      ["Международный удалённый формат", undefined],
      ["Другое", undefined],
    ]),
  },
  {
    id: "q2",
    phase: "core",
    kind: "single_select",
    gradeRelevant: false,
    text: "Какой у вас основной формат работы?",
    options: numbered([
      ["Full-time", undefined],
      ["Part-time", undefined],
      ["Долгосрочный контракт", undefined],
      ["Проектная работа / freelance", undefined],
      ["Несколько клиентов", undefined],
      ["Сейчас не работаю", undefined],
      ["Другое", undefined],
    ]),
  },
  {
    id: "q3",
    phase: "core",
    kind: "single_select",
    gradeRelevant: false,
    text: "Сколько у вас коммерческого опыта в product / UX / UI design?",
    options: numbered([
      ["<1 года", undefined],
      ["1–2 года", undefined],
      ["2–4 года", undefined],
      ["4–7 лет", undefined],
      ["7+ лет", undefined],
    ]),
  },
  {
    id: "q4",
    phase: "core",
    kind: "open",
    dimension: "scope_ownership",
    extraDimensions: ["autonomy"],
    text: "Расскажите про самую крупную задачу или инициативу, за которую вы лично отвечали за последние 12–18 месяцев.",
    hints: [
      "Что это был за продукт или задача?",
      "За какую часть отвечали именно вы?",
      "Что решали сами, а что было уже задано?",
      "Чем всё закончилось?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q5",
    phase: "core",
    kind: "hybrid",
    dimension: "scope_ownership",
    text: "Какой масштаб задач для вас обычный, а не исключение?",
    followUp: "После выбора приведите короткий пример задачи такого масштаба.",
    placeholder: "Номер варианта и короткий пример",
    options: numbered([
      ["Отдельные экраны", 1],
      ["Небольшие фичи", 2],
      ["Крупные флоу", 3],
      ["Продуктовая область / модуль", 3],
      ["Несколько областей / platform level", 4],
      ["Свой вариант", undefined],
    ]),
  },
  {
    id: "q6",
    phase: "core",
    kind: "open",
    dimension: "ambiguity",
    extraDimensions: ["autonomy", "product_thinking"],
    text: "Вспомните задачу, где вам дали очень размытый запрос. Что вы сделали дальше?",
    hints: [
      "Что было известно в начале?",
      "Как вы поняли, какую проблему реально нужно решать?",
      "Какие решения приняли сами?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q7",
    phase: "core",
    kind: "open",
    dimension: "product_thinking",
    extraDimensions: ["influence", "product_judgment"],
    text: "Расскажите про случай, когда вы поняли, что исходная постановка задачи была неправильной.",
    hints: [
      "Что просили сделать изначально?",
      "Почему вы решили, что проблема в другом?",
      "Как убедили команду?",
      "Что получилось?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q8",
    phase: "core",
    kind: "hybrid",
    dimension: "impact_metrics",
    extraDimensions: ["research"],
    text: "Как вы обычно понимаете, что дизайн решил проблему?",
    followUp:
      "После выбора расскажите про последний случай, когда вы реально проверяли результат после релиза.",
    placeholder: "Номер варианта и короткий пример",
    options: numbered([
      ["По субъективной оценке команды", 1],
      ["По пользовательскому фидбеку", 2],
      ["По аналитике после релиза", 3],
      ["Заранее определяем метрики успеха", 4],
      ["Зависит от задачи", 2],
      ["Свой ответ", undefined],
    ]),
  },
  {
    id: "q9",
    phase: "core",
    kind: "open",
    dimension: "impact_metrics",
    text: "Назовите один результат своей работы, который можно измерить.",
    hints: [
      "Что изменилось?",
      "Было → стало?",
      "За какой период?",
      "Насколько вы уверены, что именно ваша работа повлияла?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q10",
    phase: "core",
    kind: "open",
    dimension: "ux_complexity",
    extraDimensions: ["systems_thinking", "product_judgment"],
    text: "Расскажите про самый сложный интерфейс или сценарий, который вы проектировали.",
    hints: [
      "В чём была сложность?",
      "Какие роли, состояния, ограничения или зависимости были?",
      "Как вы структурировали решение?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q11",
    phase: "core",
    kind: "multi_select",
    dimension: "ux_complexity",
    text: "С чем из этого вы реально работали за последние 2 года?",
    placeholder: "Номера через запятую, например: 1, 3, 7",
    options: numbered([
      ["Сложные формы", undefined],
      ["Data-heavy tables", undefined],
      ["Permissions / roles", undefined],
      ["Статусы / state logic", undefined],
      ["Связанные сущности", undefined],
      ["Сложные фильтры", undefined],
      ["Многошаговые процессы", undefined],
      ["Responsive / adaptive", undefined],
      ["Realtime", undefined],
      ["Fintech / money flows", undefined],
      ["Enterprise / admin", undefined],
      ["Marketplace", undefined],
      ["Onboarding", undefined],
      ["Subscriptions", undefined],
      ["Другое", undefined],
    ]),
  },
  {
    id: "q12",
    phase: "core",
    kind: "open",
    dimension: "systems_thinking",
    extraDimensions: ["influence"],
    text: "Расскажите про случай, когда вы не просто сделали экран, а создали решение, которое потом использовали повторно.",
    hints: [
      "Что стало reusable?",
      "Это был компонент, паттерн, шаблон страницы, правило поведения или процесс?",
      "Кто ещё этим пользовался?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q13",
    phase: "core",
    kind: "hybrid",
    dimension: "systems_thinking",
    text: "Какой у вас реальный опыт с дизайн-системами?",
    followUp: "После выбора: какое самое системное изменение в design system сделали лично вы?",
    placeholder: "Номер варианта и короткий пример",
    options: numbered([
      ["В основном использую готовую", 1],
      ["Создавал компоненты", 2],
      ["Строил patterns / templates", 3],
      ["Работал с tokens / variables / architecture", 3],
      ["Отвечал за governance / adoption", 4],
      ["Свой вариант", undefined],
    ]),
  },
  {
    id: "q14",
    phase: "core",
    kind: "open",
    dimension: "delivery_qa",
    extraDimensions: ["scope_ownership", "systems_thinking"],
    text: "Расскажите про ситуацию, когда разработка реализовала дизайн не так, как ожидалось.",
    hints: [
      "Как вы это обнаружили?",
      "Что сделали?",
      "Исправили только экран или изменили сам процесс?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q15",
    phase: "core",
    kind: "single_select",
    dimension: "delivery_qa",
    text: "Насколько глубоко вы обычно участвуете после handoff?",
    options: numbered([
      ["Почти не участвую", 0],
      ["Отвечаю на вопросы", 1],
      ["Проверяю ключевые экраны", 2],
      ["Регулярно делаю design QA", 3],
      ["Участвую до production и post-release", 3],
      ["Сам выстраивал delivery / review process", 4],
    ]),
  },
  {
    id: "q16",
    phase: "core",
    kind: "open",
    dimension: "influence",
    extraDimensions: ["product_judgment"],
    text: "Расскажите про решение, с которым команда или стейкхолдер изначально не соглашались, но вам удалось изменить направление.",
    hints: [
      "Кто был против?",
      "В чём был конфликт?",
      "Какие аргументы, данные или прототипы использовали?",
      "Чем закончилось?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q17",
    phase: "core",
    kind: "multi_select",
    gradeRelevant: false,
    text: "С кем вы обычно напрямую принимаете продуктовые решения?",
    placeholder: "Номера через запятую, например: 2, 4, 11",
    options: numbered([
      ["Дизайнеры", undefined],
      ["PM / PO", undefined],
      ["Аналитики", undefined],
      ["Frontend", undefined],
      ["Backend", undefined],
      ["QA", undefined],
      ["Research", undefined],
      ["Marketing", undefined],
      ["Sales", undefined],
      ["Support", undefined],
      ["Head / C-level", undefined],
      ["Внешние клиенты / партнёры", undefined],
    ]),
  },
  {
    id: "q18",
    phase: "core",
    kind: "open",
    dimension: "leadership",
    extraDimensions: ["influence", "scope_ownership"],
    text: "Расскажите про случай, когда результат зависел не только от вашей собственной работы.",
    hints: [
      "Нужно ли было координировать других?",
      "Как обеспечивали качество?",
      "Что делали сами, а что делали другие?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q19",
    phase: "core",
    kind: "hybrid",
    dimension: "leadership",
    text: "Как вы обычно помогаете другим дизайнерам становиться сильнее?",
    followUp: "После выбора приведите один конкретный пример.",
    placeholder: "Номер варианта и короткий пример",
    options: numbered([
      ["Почти не взаимодействую", 0],
      ["Даю ситуативный feedback", 1],
      ["Регулярно делаю design review", 2],
      ["Менторю", 3],
      ["Задаю стандарты / процессы", 3],
      ["Координирую работу дизайнеров", 4],
      ["Свой вариант", undefined],
    ]),
  },
  {
    id: "q20",
    phase: "core",
    kind: "open",
    dimension: "technical_fluency",
    extraDimensions: ["product_judgment"],
    text: "Расскажите про случай, когда технические ограничения сильно повлияли на ваше дизайн-решение.",
    hints: [
      "Что было ограничением?",
      "Как вы это выяснили?",
      "Как изменили решение?",
      "С кем обсуждали компромисс?",
    ],
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q21",
    phase: "core",
    kind: "multi_select",
    dimension: "technical_fluency",
    text: "С какими техническими вещами вы реально работаете самостоятельно?",
    placeholder: "Номера через запятую, например: 1, 2, 7",
    options: numbered([
      ["DevTools", undefined],
      ["HTML / CSS", undefined],
      ["React / frontend", undefined],
      ["API", undefined],
      ["Data models", undefined],
      ["SQL", undefined],
      ["Analytics tools", undefined],
      ["Git", undefined],
      ["Cursor / AI coding", undefined],
      ["Coded prototypes", undefined],
      ["Ничего из этого", undefined],
      ["Другое", undefined],
    ]),
  },
  {
    id: "q22",
    phase: "core",
    kind: "open",
    gradeRelevant: false,
    text: "Какая часть работы у вас сейчас получается сильнее всего?",
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q23",
    phase: "core",
    kind: "open",
    gradeRelevant: false,
    text: "В какой ситуации вы чаще всего чувствуете, что вам не хватает опыта?",
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "q24",
    phase: "core",
    kind: "open",
    gradeRelevant: false,
    text: "Если бы завтра вас повысили на следующий грейд, какая часть новой ответственности была бы для вас самой сложной?",
    placeholder: OPEN_HINT,
    options: [],
  },
]

const ADAPTIVE_QUESTIONS: Question[] = [
  {
    id: "a1",
    phase: "adaptive",
    kind: "open",
    dimension: "autonomy",
    extraDimensions: ["scope_ownership"],
    text: "Что именно в этой задаче могли решить только вы, а что решал PM, лид или команда?",
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "a2",
    phase: "adaptive",
    kind: "open",
    dimension: "impact_metrics",
    text: "Вы сказали, что решение улучшило результат. Как вы это поняли?",
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "a3",
    phase: "adaptive",
    kind: "open",
    dimension: "scope_ownership",
    text: "Это был единичный случай или такие задачи составляют заметную часть вашей работы?",
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "a4",
    phase: "adaptive",
    kind: "open",
    dimension: "influence",
    text: "Что бы произошло, если бы вы просто согласились с первоначальным решением команды?",
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "a5",
    phase: "adaptive",
    kind: "open",
    dimension: "leadership",
    extraDimensions: ["systems_thinking"],
    text: "Назовите изменение, которое продолжало работать даже без вашего постоянного участия.",
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "a6",
    phase: "adaptive",
    kind: "open",
    dimension: "influence",
    extraDimensions: ["scope_ownership", "systems_thinking"],
    text: "Какое ваше решение повлияло на несколько команд или продуктовых направлений одновременно?",
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "a7",
    phase: "adaptive",
    kind: "open",
    dimension: "impact_metrics",
    extraDimensions: ["product_judgment"],
    text: "Какую часть результата вы считаете своим вкладом, а какую — работой команды, рынка или других изменений?",
    placeholder: OPEN_HINT,
    options: [],
  },
  {
    id: "a8",
    phase: "adaptive",
    kind: "open",
    dimension: "product_judgment",
    extraDimensions: ["autonomy"],
    text: "Расскажите про решение, которое не сработало. Как вы поняли это и что сделали после?",
    placeholder: OPEN_HINT,
    options: [],
  },
]

const C2: Question = {
  id: "c2",
  phase: "compensation",
  kind: "hybrid",
  gradeRelevant: false,
  text: "Какая у вас текущая почасовая / контрактная ставка?",
  followUp: "Если удобно, укажите валюту и формат: hourly / daily / project.",
  options: numbered([
    ["Не работаю почасово", undefined],
    ["< $15/ч", undefined],
    ["$15–30/ч", undefined],
    ["$30–50/ч", undefined],
    ["$50–80/ч", undefined],
    ["$80–120/ч", undefined],
    ["$120+/ч", undefined],
    ["Другая валюта / своя цифра", undefined],
    ["Предпочитаю не говорить", undefined],
  ]),
}

const C3: Question = {
  id: "c3",
  phase: "compensation",
  kind: "hybrid",
  gradeRelevant: false,
  text: "На какую компенсацию вы целитесь в ближайшие 6–12 месяцев?",
  followUp: "Можно номер или свою цифру.",
  options: numbered([
    ["Примерно как сейчас", undefined],
    ["+10–20%", undefined],
    ["+20–40%", undefined],
    ["+40–70%", undefined],
    ["x2 и больше", undefined],
    ["Пока не уверен", undefined],
    ["Другое", undefined],
  ]),
}

const QUESTION_INDEX = new Map<string, Question>(
  [...CORE_QUESTIONS, ...ADAPTIVE_QUESTIONS, C2, C3].map((question) => [
    question.id,
    question,
  ])
)

export function getCoreQuestions(): Question[] {
  return CORE_QUESTIONS
}

export function getFirstQuestion(): Question {
  return CORE_QUESTIONS[0]
}

export function isSkipExample(text: string): boolean {
  return /не могу вспомнить|нет примера|не вспомина/i.test(text)
}

export function placeholderFor(question: Question, done = false): string {
  if (done) return "Опрос завершён"
  if (question.placeholder) return question.placeholder
  if (question.kind === "multi_select") return "Номера через запятую или свой ответ"
  if (question.kind === "open") return OPEN_HINT
  if (question.kind === "hybrid") return "Номер варианта и короткий пример"
  return "Номер варианта или свой ответ"
}

export function formatQuestionMessage(question: Question): string {
  const parts = [question.text]
  if (question.hints?.length) {
    parts.push(question.hints.map((hint) => `— ${hint}`).join("\n"))
  }
  if (question.options.length > 0) {
    const options = question.options
      .map((option, index) => `${index + 1}. ${option.label}`)
      .join("\n")
    parts.push(options)
  }
  if (question.kind === "multi_select") {
    parts.push("Можно несколько номеров через запятую.")
  }
  if (question.followUp) {
    parts.push(question.followUp)
  }
  if (
    (question.kind === "open" || question.kind === "hybrid") &&
    question.phase !== "compensation"
  ) {
    if (question.placeholder && question.placeholder !== question.text) {
      parts.push(question.placeholder)
    }
    parts.push(SKIP_HINT)
  }
  return parts.join("\n\n")
}

function inferMarketFromText(text: string): string | undefined {
  const value = text.toLowerCase()
  if (/росс|рф\b|москв|питер|петербург/.test(value)) return "ru"
  if (/снг|казах|беларус|украин|узбек|армен|азербай|грузи/.test(value)) return "cis"
  if (/европ|germany|berlin|london|\buk\b|франц|нидерл|польш|spain|итал/.test(value)) {
    return "eu"
  }
  if (/сша|usa|амер|канада|canada/.test(value)) return "us"
  if (/оаэ|дуба|uae|мена|сауд|qatar/.test(value)) return "mena"
  if (/удал|remote|международ/.test(value)) return "remote"
  return undefined
}

function marketFromAnswers(answers: InterviewAnswer[]): string {
  const q1 = answers.find((answer) => answer.questionId === "q1")
  const id = q1?.optionId?.split(",")[0]
  if (id === "1") return "ru"
  if (id === "2") return "cis"
  if (id === "3") return "eu"
  if (id === "4") return "us"
  if (id === "5") return "mena"
  if (id === "6") return "remote"
  return inferMarketFromText(q1?.text ?? "") ?? "other"
}

function buildC1(answers: InterviewAnswer[]): Question {
  const market = marketFromAnswers(answers)
  const optionsByMarket: Record<string, Question["options"]> = {
    ru: numbered([
      ["<100k ₽ / мес", undefined],
      ["100–200k ₽", undefined],
      ["200–300k ₽", undefined],
      ["300–450k ₽", undefined],
      ["450–650k ₽", undefined],
      ["650k+ ₽", undefined],
      ["Другое", undefined],
      ["Предпочитаю не говорить", undefined],
    ]),
    cis: numbered([
      ["<$1k / мес", undefined],
      ["$1–2k", undefined],
      ["$2–3.5k", undefined],
      ["$3.5–5k", undefined],
      ["$5–8k", undefined],
      ["$8k+", undefined],
      ["Другое", undefined],
      ["Предпочитаю не говорить", undefined],
    ]),
    eu: numbered([
      ["<€2.5k / мес", undefined],
      ["€2.5–4k", undefined],
      ["€4–6k", undefined],
      ["€6–8k", undefined],
      ["€8–11k", undefined],
      ["€11k+", undefined],
      ["Другое", undefined],
      ["Предпочитаю не говорить", undefined],
    ]),
    us: numbered([
      ["<$5k / мес", undefined],
      ["$5–8k", undefined],
      ["$8–12k", undefined],
      ["$12–16k", undefined],
      ["$16–22k", undefined],
      ["$22k+", undefined],
      ["Другое", undefined],
      ["Предпочитаю не говорить", undefined],
    ]),
    mena: numbered([
      ["<$2k / мес", undefined],
      ["$2–3.5k", undefined],
      ["$3.5–5.5k", undefined],
      ["$5.5–8k", undefined],
      ["$8–12k", undefined],
      ["$12k+", undefined],
      ["Другое", undefined],
      ["Предпочитаю не говорить", undefined],
    ]),
    remote: numbered([
      ["<$2k / мес", undefined],
      ["$2–4k", undefined],
      ["$4–7k", undefined],
      ["$7–10k", undefined],
      ["$10–15k", undefined],
      ["$15k+", undefined],
      ["Другое", undefined],
      ["Предпочитаю не говорить", undefined],
    ]),
    other: numbered([
      ["Ниже рынка / стартовый уровень", undefined],
      ["Около младней вилки", undefined],
      ["Около средней вилки", undefined],
      ["Около старшей вилки", undefined],
      ["Выше типичной старшей вилки", undefined],
      ["Своя цифра", undefined],
      ["Предпочитаю не говорить", undefined],
    ]),
  }

  return {
    id: "c1",
    phase: "compensation",
    kind: "hybrid",
    gradeRelevant: false,
    text: "Какая у вас текущая компенсация? Если удобно — сумма, валюта, gross/net и период.",
    followUp: "Можно номер диапазона или свою цифру, бонус тоже можно указать.",
    options: optionsByMarket[market] ?? optionsByMarket.other,
  }
}

export function getQuestion(
  id: string,
  answers: InterviewAnswer[] = []
): Question | undefined {
  if (id === "c1") return buildC1(answers)
  return QUESTION_INDEX.get(id)
}

export function getMarketId(answers: InterviewAnswer[]): string {
  return marketFromAnswers(answers)
}

export function getEmploymentId(answers: InterviewAnswer[]): string {
  const q2 = answers.find((answer) => answer.questionId === "q2")
  return q2?.optionId?.split(",")[0] ?? "other"
}

export function answerLooksLikeMetrics(text: string): boolean {
  return /(\d+\s*%|\d+\s*(x|раз)|конверс|retention|ретенш|nps|csat|mau|wau|dau|churn|ошиб|метрик)/i.test(
    text
  )
}

export function scoreMultiSelect(question: Question, optionIds: string[]): 0 | 1 | 2 | 3 | 4 {
  const ids = new Set(optionIds)
  if (question.id === "q11") {
    const complex = ["1", "2", "3", "4", "5", "6", "7", "9", "10", "11"]
    const simpler = ["8", "12", "13", "14"]
    const complexCount = complex.filter((id) => ids.has(id)).length
    const simplerOnly =
      complexCount === 0 && simpler.some((id) => ids.has(id)) && optionIds.length > 0
    if (simplerOnly) return 2
    if (complexCount >= 7) return 4
    if (complexCount >= 4) return 3
    if (complexCount >= 2) return 2
    if (complexCount >= 1 || optionIds.length > 0) return 1
    return 1
  }
  if (question.id === "q21") {
    if (ids.has("11") && optionIds.length === 1) return 0
    const count = optionIds.filter((id) => id !== "11").length
    if (count >= 8) return 4
    if (count >= 5) return 3
    if (count >= 3) return 2
    if (count >= 1) return 1
    return 0
  }
  return Math.min(4, Math.max(1, optionIds.length)) as 0 | 1 | 2 | 3 | 4
}
