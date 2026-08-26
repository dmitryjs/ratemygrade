import { processInterviewTurn } from "@/lib/interview/engine"
import type { InterviewAnswer } from "@/lib/interview/types"
import { NextResponse } from "next/server"

export const maxDuration = 60

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    answers?: InterviewAnswer[]
    currentQuestionId?: string
    message?: string
    optionId?: string
  } | null

  if (!body?.currentQuestionId || typeof body.message !== "string") {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 })
  }

  try {
    const result = await processInterviewTurn({
      answers: Array.isArray(body.answers) ? body.answers : [],
      currentQuestionId: body.currentQuestionId,
      message: body.message,
      optionId: body.optionId,
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error("[interview]", error)
    return NextResponse.json(
      { error: "Не удалось продолжить опрос" },
      { status: 500 }
    )
  }
}
