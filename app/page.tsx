import { GradeMatrix } from "@/components/grade-matrix"
import { ThemeToggleTabs } from "@/components/theme-toggle-tabs"

export default function Page() {
  return (
    <main className="min-h-svh px-4 py-10">
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="absolute left-0 top-0">
          <ThemeToggleTabs />
        </div>
        <header className="text-center">
          <div className="font-mono text-[14px] font-medium tracking-tight text-foreground">
            ratemygrade
          </div>
          <h1 className="mt-20 font-sans text-[16px] font-semibold text-foreground">
            Определи свой грейд
          </h1>
          <p className="mx-auto mt-2 max-w-3xl font-sans text-[14px] leading-[140%] text-foreground/50">
            Отмечайте пункты в матрице, которые соответствуют вашему опыту и
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
