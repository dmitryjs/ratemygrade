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

export function InterviewResultCard({ result }: { result: GradeResult }) {
  const confidencePct = Math.round(result.confidence * 100)

  return (
    <Card className="w-full max-w-2xl border-border/80 bg-card/95 py-5 shadow-sm">
      <CardHeader className="gap-3 px-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="rounded-full px-3 py-1 text-sm">{result.grade}</Badge>
          <span className="text-muted-foreground text-xs">
            уверенность {confidencePct}%
          </span>
        </div>
        <CardTitle className="text-lg">Ваш грейд</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-5">
        <section className="space-y-2">
          <h3 className="font-medium text-sm">Почему такой грейд</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{result.summary}</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm">Компенсация</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <Fact label="Рынок" value={result.compensation.market} />
            <Fact label="Сейчас" value={result.compensation.current ?? "не указано"} />
            <Fact
              label="Рекомендуемая вилка"
              value={result.compensation.recommendedRange ?? "мало данных по рынку"}
            />
            <Fact label="Целевая вилка" value={result.compensation.targetAsk ?? "—"} />
            <Fact
              label="FTE-эквивалент"
              value={result.compensation.fteHourlyEquivalent ?? "—"}
            />
            <Fact
              label="Контракт / фриланс"
              value={result.compensation.freelanceHourlyRange ?? "—"}
            />
          </div>
          {result.compensation.marketPosition ? (
            <p className="text-muted-foreground text-xs">
              Позиция: {POSITION_LABEL[result.compensation.marketPosition]}
            </p>
          ) : null}
          {result.compensation.note ? (
            <p className="text-muted-foreground text-xs">{result.compensation.note}</p>
          ) : null}
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm">Сильные стороны</h3>
          <ul className="space-y-2">
            {result.strengths.map((item) => (
              <li key={item.title} className="rounded-xl bg-muted/60 px-3 py-2">
                <div className="font-medium text-sm">{item.title}</div>
                <p className="text-muted-foreground text-sm">{item.reason}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm">Что подтянуть</h3>
          <ul className="space-y-2">
            {result.growthAreas.map((item) => (
              <li key={item.title} className="rounded-xl bg-muted/60 px-3 py-2">
                <div className="font-medium text-sm">{item.title}</div>
                <p className="text-muted-foreground text-sm">{item.reason}</p>
                <p className="mt-1 text-sm">{item.nextStep}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm">Следующий уровень: {result.nextGrade.grade}</h3>
          <p className="text-muted-foreground text-sm">
            Не хватает: {result.nextGrade.missingSignals.join(", ")}.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {result.nextGrade.recommendedActions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
