import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { GradeResult } from "@/lib/interview/types"

const POSITION_LABEL: Record<
  NonNullable<GradeResult["compensation"]["marketPosition"]>,
  string
> = {
  "significantly below": "существенно ниже рынка",
  below: "ниже рынка",
  "in range": "внутри рыночной вилки",
  above: "выше рынка",
  "significantly above": "существенно выше рынка",
}

function asText(value: unknown, fallback = "—"): string {
  return typeof value === "string" && value.trim() ? value : fallback
}

export function InterviewResultCard({ result }: { result: GradeResult }) {
  const confidence = typeof result.confidence === "number" ? result.confidence : 0
  const confidencePct = Math.round(confidence * 100)
  const compensation = result.compensation ?? {
    market: "Другой рынок",
    confidence: "low" as const,
  }
  const strengths = Array.isArray(result.strengths) ? result.strengths : []
  const growthAreas = Array.isArray(result.growthAreas) ? result.growthAreas : []
  const nextGrade = result.nextGrade ?? {
    grade: "следующий уровень",
    missingSignals: [] as string[],
    recommendedActions: [] as string[],
  }
  const missingSignals = Array.isArray(nextGrade.missingSignals)
    ? nextGrade.missingSignals.filter((item): item is string => typeof item === "string")
    : []
  const recommendedActions = Array.isArray(nextGrade.recommendedActions)
    ? nextGrade.recommendedActions.filter((item): item is string => typeof item === "string")
    : []
  const marketPosition = compensation.marketPosition
  const positionLabel =
    marketPosition && marketPosition in POSITION_LABEL
      ? POSITION_LABEL[marketPosition]
      : undefined

  return (
    <Card className="w-full max-w-2xl border-border/80 bg-card/95 py-5 shadow-sm">
      <CardHeader className="gap-3 px-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="rounded-full px-3 py-1 text-sm">
            {asText(result.grade, "Грейд")}
          </Badge>
          <span className="text-muted-foreground text-xs">
            уверенность {confidencePct}%
          </span>
        </div>
        <CardTitle className="text-lg">Ваш грейд</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-5">
        <section className="space-y-2">
          <h3 className="font-medium text-sm">Почему такой грейд</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {asText(result.summary, "Недостаточно данных для подробного разбора.")}
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm">Компенсация</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <Fact label="Рынок" value={asText(compensation.market, "не указано")} />
            <Fact label="Сейчас" value={asText(compensation.current, "не указано")} />
            <Fact
              label="Рекомендуемая вилка"
              value={asText(compensation.recommendedRange, "мало данных по рынку")}
            />
            <Fact label="Целевая вилка" value={asText(compensation.targetAsk)} />
            <Fact
              label="FTE-эквивалент"
              value={asText(compensation.fteHourlyEquivalent)}
            />
            <Fact
              label="Контракт / фриланс"
              value={asText(compensation.freelanceHourlyRange)}
            />
          </div>
          {positionLabel ? (
            <p className="text-muted-foreground text-xs">Позиция: {positionLabel}</p>
          ) : null}
          {compensation.note ? (
            <p className="text-muted-foreground text-xs">{compensation.note}</p>
          ) : null}
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm">Сильные стороны</h3>
          {strengths.length > 0 ? (
            <ul className="space-y-2">
              {strengths.map((item, index) => (
                <li
                  key={`${asText(item?.title, "strength")}-${index}`}
                  className="rounded-xl bg-muted/60 px-3 py-2"
                >
                  <div className="font-medium text-sm">{asText(item?.title, "Сильная сторона")}</div>
                  <p className="text-muted-foreground text-sm">{asText(item?.reason)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">Пока мало явных сильных сигналов.</p>
          )}
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm">Что подтянуть</h3>
          {growthAreas.length > 0 ? (
            <ul className="space-y-2">
              {growthAreas.map((item, index) => (
                <li
                  key={`${asText(item?.title, "growth")}-${index}`}
                  className="rounded-xl bg-muted/60 px-3 py-2"
                >
                  <div className="font-medium text-sm">{asText(item?.title, "Зона роста")}</div>
                  <p className="text-muted-foreground text-sm">{asText(item?.reason)}</p>
                  {item?.nextStep ? (
                    <p className="mt-1 text-sm">{asText(item.nextStep)}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">Явных зон роста не выделено.</p>
          )}
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm">
            Следующий уровень: {asText(nextGrade.grade, "следующий уровень")}
          </h3>
          <p className="text-muted-foreground text-sm">
            Не хватает:{" "}
            {missingSignals.length > 0 ? missingSignals.join(", ") : "больше подтверждённых примеров"}.
          </p>
          {recommendedActions.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {recommendedActions.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      </CardContent>
    </Card>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 px-3 py-2">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  )
}
