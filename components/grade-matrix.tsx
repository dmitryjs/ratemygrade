"use client"

import * as React from "react"
import { toast } from "sonner"
import { LoaderCircle, ThumbsDown, ThumbsUp } from "lucide-react"
import Image from "next/image"

import { competencies, grades, type GradeKey } from "@/lib/matrix"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type GradeResponse = {
  grade: string
  strengths?: string
  weaknesses?: string
  nextGradePlan?: string
  salaryBands?: Record<
    "rf" | "eu" | "us" | "asia" | string,
    { min: number; max: number; currency: string }
  >
  recommendations?: string[]
}

function formatMoney(n: number) {
  if (!Number.isFinite(n)) return String(n)
  if (Math.abs(n) < 10000) return String(Math.round(n))
  return Math.round(n).toLocaleString("en-US")
}

function gradeBadgeClass(grade: string) {
  const g = grade.trim().toLowerCase()
  if (g === "junior") return "bg-sky-500 text-white"
  if (g === "middle") return "bg-indigo-500 text-white"
  if (g === "middle +") return "bg-violet-500 text-white"
  if (g === "senior") return "bg-amber-500 text-black"
  if (g === "team lead") return "bg-emerald-600 text-white"
  return ""
}

function ItemButton({
  id,
  text,
  selected,
  onToggle,
}: {
  id: string
  text: string
  selected: boolean
  onToggle: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={cn(
        "block w-full rounded-md border px-2 py-1.5 text-left text-[12px] leading-snug transition-colors",
        "hover:bg-muted",
        selected
          ? "border-emerald-500/70 bg-emerald-200/70 text-foreground dark:border-emerald-400/80 dark:bg-emerald-500/25"
          : "border-transparent bg-transparent text-foreground"
      )}
    >
      <span className="flex gap-2">
        <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-foreground/50" />
        <span className="min-w-0">{text}</span>
      </span>
    </button>
  )
}

export function GradeMatrix() {
  const [selectedItemIds, setSelectedItemIds] = React.useState<Set<string>>(
    () => new Set()
  )
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<GradeResponse | null>(null)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const toggle = React.useCallback((id: string) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  async function onSubmit() {
    setIsDialogOpen(true)
    setIsLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ selectedItemIds: Array.from(selectedItemIds) }),
      })
      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(text || `HTTP ${res.status}`)
      }
      const json = (await res.json()) as GradeResponse
      setResult(json)
    } catch (e) {
      setResult(null)
      const msg = e instanceof Error ? e.message : "Неизвестная ошибка"
      setError(msg)
      toast.error("Не удалось рассчитать грейд", { description: msg })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedCount = selectedItemIds.size

  const marketMeta: Record<string, { label: string; flag: React.ReactNode }> =
    {
      rf: {
        label: "РФ",
        flag: (
          <Image
            src="/flags/rf.png"
            alt="РФ"
            width={24}
            height={16}
            className="h-4 w-6 rounded-sm object-cover"
          />
        ),
      },
      eu: {
        label: "ЕС",
        flag: (
          <Image
            src="/flags/eu.png"
            alt="ЕС"
            width={24}
            height={16}
            className="h-4 w-6 rounded-sm object-cover"
          />
        ),
      },
      us: {
        label: "США",
        flag: (
          <Image
            src="/flags/us.png"
            alt="США"
            width={24}
            height={16}
            className="h-4 w-6 rounded-sm object-cover"
          />
        ),
      },
      asia: { label: "Азия", flag: <span className="text-base">🌏</span> },
    }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-foreground/70">
          Выбрано пунктов: <span className="font-medium">{selectedCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={isLoading || selectedCount === 0}
            onClick={() => {
              setSelectedItemIds(new Set())
              setResult(null)
              setError(null)
            }}
          >
            Сбросить
          </Button>
          <Button disabled={isLoading || selectedCount === 0} onClick={onSubmit}>
            {isLoading ? "Считаем…" : "Рассчитать"}
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <Table containerClassName="no-scrollbar overflow-y-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 z-20 min-w-[220px] bg-card">
                Компетенция
              </TableHead>
              {grades.map((g) => (
                <TableHead key={g.key} className="min-w-[240px]">
                  {g.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {competencies.map((c) => (
              <TableRow key={c.id} className="align-top">
                <TableCell className="sticky left-0 z-10 bg-card font-medium">
                  {c.title}
                </TableCell>
                {grades.map((g) => (
                  <TableCell key={g.key} className="align-top">
                    <div className="space-y-2">
                      {c.cells[g.key as GradeKey].map((it) => (
                        <ItemButton
                          key={it.id}
                          id={it.id}
                          text={it.text}
                          selected={selectedItemIds.has(it.id)}
                          onToggle={toggle}
                        />
                      ))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Результаты</DialogTitle>
            <DialogDescription>
              Мы покажем, какие пункты вы отметили, и результат расчёта.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center gap-3">
              <LoaderCircle className="size-6 animate-spin text-foreground/70" />
              <div className="text-sm text-foreground/70">
                Рассчитываем ваш грейд
              </div>
            </div>
          ) : error ? (
            <div className="text-sm text-destructive">{error}</div>
          ) : result ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm text-foreground/70">Грейд</div>
                <Badge className={gradeBadgeClass(result.grade)}>
                  {result.grade}
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border bg-muted/20 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ThumbsUp className="size-4 text-emerald-500" />
                    <span>Сильные стороны</span>
                  </div>
                  <div className="mt-2 text-sm text-foreground/70">
                    {result.strengths ?? "—"}
                  </div>
                </div>
                <div className="rounded-md border bg-muted/20 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ThumbsDown className="size-4 text-red-500" />
                    <span>Слабые стороны</span>
                  </div>
                  <div className="mt-2 text-sm text-foreground/70">
                    {result.weaknesses ?? "—"}
                  </div>
                </div>
              </div>

              <div className="rounded-md border bg-muted/20 p-3">
                <div className="text-sm font-medium">
                  Что прокачать для следующего грейда
                </div>
                <div className="mt-2 text-sm text-foreground/70">
                  {result.nextGradePlan ?? "—"}
                </div>
              </div>

              {result.salaryBands ? (
                <div>
                  <div className="text-sm font-medium">Зарплата по регионам</div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {Object.entries(result.salaryBands).map(([market, band]) => {
                      const meta = marketMeta[market] ?? {
                        label: market.toUpperCase(),
                        flag: "🏳️",
                      }
                      return (
                        <div
                          key={market}
                          className="rounded-md border bg-muted/20 px-3 py-2 text-sm"
                        >
                          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-foreground/50">
                            {meta.flag}
                            <span>{meta.label}</span>
                          </div>
                          <div className="mt-1 font-medium">
                            {formatMoney(band.min)}–{formatMoney(band.max)}{" "}
                            {band.currency}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : null}

              {result.recommendations?.length ? (
                <div>
                  <div className="text-sm font-medium">Рекомендации</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/70">
                    {result.recommendations.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="text-sm text-foreground/70">—</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

