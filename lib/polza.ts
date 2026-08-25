type PolzaJson = {
  choices?: { message?: { content?: string } }[]
}

export async function polzaJson<T>(system: string, user: string): Promise<T | null> {
  const apiUrl = process.env.POLZA_API_URL
  const apiKey = process.env.POLZA_API_KEY
  const model = process.env.POLZA_MODEL ?? "openai/gpt-4o"

  if (!apiUrl || !apiKey) return null

  const response = await fetch(apiUrl, {
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
  }).catch(() => null)

  if (!response?.ok) return null

  const payload = (await response.json().catch(() => null)) as PolzaJson | null
  const content = payload?.choices?.[0]?.message?.content
  if (!content) return null

  try {
    return JSON.parse(content) as T
  } catch {
    return null
  }
}
