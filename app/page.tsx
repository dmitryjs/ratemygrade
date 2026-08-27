"use client"

import { InterviewChat } from "@/components/interview-chat"
import { ThemeToggleTabs } from "@/components/theme-toggle-tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

function Brand() {
  return (
    <>
      <Link
        href="https://www.instagram.com/galkin.products/"
        target="_blank"
        rel="noopener noreferrer"
        className="block sm:hidden"
      >
        <div className="space-y-0.5 font-mono text-[14px] font-medium tracking-tight">
          <div className="text-foreground">ratemygrade</div>
          <div className="text-foreground/50">by dmitry galkin</div>
        </div>
      </Link>
      <div className="hidden space-y-0.5 font-mono text-[14px] font-medium tracking-tight sm:block">
        <div className="text-foreground">ratemygrade</div>
        <Link
          href="https://www.instagram.com/galkin.products/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/50 underline-offset-4 hover:underline"
        >
          by dmitry galkin
        </Link>
      </div>
    </>
  )
}

export default function Page() {
  const [started, setStarted] = useState(false)

  return (
    <main
      className={cn(
        "px-4 sm:px-8 lg:px-[120px]",
        started
          ? "flex h-dvh max-h-dvh flex-col overflow-hidden pt-4"
          : "py-6 sm:py-8"
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-5xl flex-col",
          started && "min-h-0 flex-1"
        )}
      >
        <div className="absolute top-0 left-0 z-10">
          <ThemeToggleTabs />
        </div>
        <div className="absolute top-0 right-0 z-10 font-mono text-[14px] font-medium tracking-tight text-foreground/50">
          v3.0
        </div>

        {started ? (
          <InterviewChat
            header={
              <header className="pt-10 pb-6 text-center sm:pt-0">
                <Brand />
              </header>
            }
          />
        ) : (
          <>
            <header className="pt-10 text-center sm:pt-0">
              <Brand />
              <h1 className="mt-10 font-sans text-[22px] font-semibold text-foreground sm:mt-16 sm:text-[28px]">
                Узнай свой грейд, ставку и зарплату
              </h1>
              <p className="mx-auto mt-3 max-w-2xl font-sans text-[14px] leading-[150%] text-foreground/60">
                ИИ-интервью по реальной работе — не по должности в резюме. Грейд считается
                по примерам, а не по самооценке. В конце: уровень, вилка зарплаты,
                почасовая ставка, сильные стороны и что подтянуть для следующего грейда.
              </p>
            </header>
            <section className="mt-8 flex justify-center">
              <Button size="lg" onClick={() => setStarted(true)}>
                Приступить
              </Button>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
