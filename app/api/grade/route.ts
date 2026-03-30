import { NextResponse } from "next/server"
import { competencies, grades } from "@/lib/matrix"

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { selectedItemIds?: unknown }
    | null

  const selectedItemIds = Array.isArray(body?.selectedItemIds)
    ? body?.selectedItemIds.filter((x): x is string => typeof x === "string")
    : []

  const apiUrl = process.env.POLZA_API_URL
  const apiKey = process.env.POLZA_API_KEY
  const model = process.env.POLZA_MODEL ?? "openai/gpt-4o"

  if (!apiUrl || !apiKey) {
    // MVP: если не настроен внешний API — отдаём заглушку, чтобы фронт работал.
    return NextResponse.json(
      {
        grade: "Middle",
        salaryBands: {
          rf: { min: 180000, max: 260000, currency: "RUB" },
          eu: { min: 4500, max: 6500, currency: "EUR" },
          us: { min: 7000, max: 10000, currency: "USD" },
          asia: { min: 5500, max: 8500, currency: "USD" },
        },
        strengths: "Стабильное качество и проактивность.",
        weaknesses: "Мало примеров влияния на продукт и исследования.",
        nextGradePlan:
          "Укрепить системное мышление, научиться защищать решения метриками и проводить исследования.",
        recommendations: [
          "Добавьте больше примеров влияния на продукт (метрики, результаты).",
          "Уточните опыт работы с неопределённостью и исследованиями.",
        ],
      },
      { status: 200 }
    )
  }

  const itemTextById = new Map<string, string>()
  for (const c of competencies) {
    for (const g of grades) {
      for (const it of c.cells[g.key]) {
        itemTextById.set(it.id, it.text)
      }
    }
  }

  const selectedItems = selectedItemIds.map((id) => ({
    id,
    text: itemTextById.get(id) ?? id,
  }))

  const system = [
    "Ты оцениваешь грейд продуктового/UX/UI дизайнера по отмеченным утверждениям.",
    "Верни СТРОГО валидный JSON без markdown и без пояснений вокруг.",
    "Схема ответа:",
    `{`,
    `  "grade": "Junior" | "Middle" | "Middle +" | "Senior" | "Team Lead",`,
    `  "strengths": "кратко (1-2 предложения)",`,
    `  "weaknesses": "кратко (1-2 предложения)",`,
    `  "nextGradePlan": "кратко (2-4 пункта или 2-4 предложения)",`,
    `  "salaryBands": {`,
    `    "rf": {"min": number, "max": number, "currency": "RUB"},`,
    `    "eu": {"min": number, "max": number, "currency": "EUR"},`,
    `    "us": {"min": number, "max": number, "currency": "USD"},`,
    `    "asia": {"min": number, "max": number, "currency": "USD"}`,
    `  },`,
    `  "recommendations": string[]`,
    `}`,
    "Если данных недостаточно, всё равно выбери ближайший грейд и дай разумные рекомендации.",
    "Диапазоны зарплат дай ориентировочно для дизайнера соответствующего уровня (не занижай/не завышай сильно).",
  ].join("\n")

  const user = [
    "Отмеченные пункты пользователя:",
    ...selectedItems.map((x) => `- (${x.id}) ${x.text}`),
  ].join("\n")

  const upstream = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  }).catch((e) => e as Error)

  if (upstream instanceof Error) {
    return NextResponse.json(
      { error: "Не удалось обратиться к Polza AI API" },
      { status: 502 }
    )
  }

  const text = await upstream.text()
  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Polza AI API вернул ошибку", details: text },
      { status: 502 }
    )
  }

  try {
    const completion = JSON.parse(text) as {
      choices?: { message?: { content?: string } }[]
    }
    const content = completion.choices?.[0]?.message?.content
    if (!content) {
      return NextResponse.json(
        { error: "Пустой ответ от Polza AI" },
        { status: 502 }
      )
    }

    const payload = JSON.parse(content) as unknown
    return NextResponse.json(payload, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: "Некорректный JSON от Polza AI API" },
      { status: 502 }
    )
  }
}

