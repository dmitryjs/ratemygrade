import { GradeMatrix } from "@/components/grade-matrix"
import { ThemeToggleTabs } from "@/components/theme-toggle-tabs"
import Link from "next/link"

export default function Page() {
  return (
    <main className="min-h-svh px-4 py-6 sm:px-10 sm:py-10 lg:px-[120px]">
      <div className="relative mx-auto w-full max-w-none">
        <div className="absolute left-0 top-0 sm:left-0 sm:top-0">
          <ThemeToggleTabs />
        </div>
        <div className="absolute right-0 top-0 font-mono text-[14px] font-medium tracking-tight text-foreground/50">
          v1.0
        </div>
        <header className="pt-10 text-center sm:pt-0">
          {/* Mobile: whole logo is clickable */}
          <Link
            href="https://www.threads.com/@dmitry.gallkin?igshid=NTc4MTIwNjQ2YQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="block sm:hidden"
          >
            <div className="space-y-0.5 font-mono text-[14px] font-medium tracking-tight">
              <div className="text-foreground">ratemygrate</div>
              <div className="text-foreground/50">by dmitry galkin</div>
            </div>
          </Link>

          {/* Desktop: only the byline is a link */}
          <div className="hidden space-y-0.5 font-mono text-[14px] font-medium tracking-tight sm:block">
            <div className="text-foreground">ratemygrate</div>
            <Link
              href="https://www.threads.com/@dmitry.gallkin?igshid=NTc4MTIwNjQ2YQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 underline-offset-4 hover:underline"
            >
              by dmitry galkin
            </Link>
          </div>
          <h1 className="mt-10 font-sans text-[16px] font-semibold text-foreground sm:mt-20">
            Определи свой грейд
          </h1>
          <p className="mx-auto mt-2 max-w-3xl font-sans text-[14px] leading-[140%] text-foreground/50">
            Кликайте на пункты в матрице, которые соответствуют вашему опыту и
            навыкам, система подстроится под ваши ответы и даст вам рекомендации
            по грейду и уровню зп для разных рынков (РФ / Европа / США / Азия)
          </p>
        </header>

        <section className="mt-8">
          <GradeMatrix />
        </section>
      </div>
    </main>
  )
}
