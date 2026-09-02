"use client"

import { Message, MessageContent } from "@/components/ai-elements/message"
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input"
import { InterviewResultCard } from "@/components/interview-result-card"
import {
  BASE_TOTAL,
  formatQuestionMessage,
  getFirstQuestion,
  placeholderFor,
} from "@/lib/interview/questions"
import type {
  GradeResult,
  InterviewAnswer,
  InterviewResponse,
  Question,
} from "@/lib/interview/types"
import { nanoid } from "nanoid"
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react"

type ChatItem = {
  id: string
  role: "assistant" | "user"
  content: string
  question?: Question
  result?: GradeResult
}

const GREETING =
  "Я задам вопросы про вашу реальную работу за последние 12–24 месяца — не про должность в резюме. Где есть варианты, можно номер или свой текст. Где нужен пример — своими словами, без номера. Enter начинает новую строку, отправка — кнопкой."

export function InterviewChat({ header }: { header?: ReactNode }) {
  const firstQuestion = useMemo(() => getFirstQuestion(), [])
  const scrollRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [answers, setAnswers] = useState<InterviewAnswer[]>([])
  const [question, setQuestion] = useState<Question>(firstQuestion)
  const [progress, setProgress] = useState({ current: 0, total: BASE_TOTAL })
  const [done, setDone] = useState(false)
  const [messages, setMessages] = useState<ChatItem[]>(() => [
    {
      id: nanoid(),
      role: "assistant",
      content: `${GREETING}\n\n${formatQuestionMessage(firstQuestion)}`,
      question: firstQuestion,
    },
  ])

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" })
  }, [messages, busy])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy || done) return

    setBusy(true)
    setInput("")
    setMessages((current) => [
      ...current,
      { id: nanoid(), role: "user", content: trimmed },
    ])

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers,
          currentQuestionId: question.id,
          message: trimmed,
        }),
      })
      const payload = (await response.json()) as InterviewResponse & { error?: string }
      if (!response.ok) {
        throw new Error(payload.error ?? "Не удалось продолжить опрос")
      }

      if (payload.type === "off_topic") {
        setProgress(payload.progress)
        setMessages((current) => [
          ...current,
          {
            id: nanoid(),
            role: "assistant",
            content: payload.reply,
            question,
          },
        ])
        return
      }

      if (payload.type === "next") {
        if (!payload.question?.id) {
          throw new Error("Сервер вернул следующий шаг без вопроса")
        }
        setAnswers(payload.answers ?? answers)
        setProgress(payload.progress)
        setQuestion(payload.question)
        setMessages((current) => [
          ...current,
          {
            id: nanoid(),
            role: "assistant",
            content: payload.reply,
            question: payload.question,
          },
        ])
        return
      }

      if (payload.type !== "result" || !payload.result) {
        throw new Error("Сервер не вернул результат опроса")
      }

      setAnswers(payload.answers ?? answers)
      setProgress(payload.progress)
      setDone(true)
      setMessages((current) => [
        ...current,
        {
          id: nanoid(),
          role: "assistant",
          content: payload.reply,
          result: payload.result,
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: nanoid(),
          role: "assistant",
          content: "Не получилось отправить ответ. Попробуйте ещё раз.",
          question,
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  function onSubmit(message: PromptInputMessage) {
    void send(message.text)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overscroll-none">
      <div ref={scrollRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
        {header}
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-2 pb-6">
          {messages.map((item) => (
            <Message from={item.role} key={item.id}>
              {item.result ? (
                <InterviewResultCard result={item.result} />
              ) : (
                <MessageContent className="whitespace-pre-wrap">
                  {item.content}
                </MessageContent>
              )}
            </Message>
          ))}
        </div>
      </div>

      <div className="shrink-0 bg-background pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] group-data-[keyboard-open=true]/app:pb-2">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-2 flex items-center justify-between gap-3 px-1 group-data-[keyboard-open=true]/app:hidden">
            <p className="text-muted-foreground text-sm">Вопрос</p>
            <p className="font-mono text-sm tabular-nums">
              {progress.current} / {progress.total}
            </p>
          </div>
          <PromptInput onSubmit={onSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                disabled={busy || done}
                onChange={(event) => setInput(event.currentTarget.value)}
                placeholder={placeholderFor(question, done)}
                value={input}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools />
              <PromptInputSubmit
                disabled={busy || done || !input.trim()}
                status={busy ? "submitted" : "ready"}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  )
}
