"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ThemeToggleTabs() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-[78px] rounded-4xl bg-muted p-[3px]" />
  }

  const value = resolvedTheme === "dark" ? "dark" : "light"

  return (
    <Tabs
      value={value}
      onValueChange={(v) => setTheme(v === "dark" ? "dark" : "light")}
      className="w-auto"
    >
      <TabsList aria-label="Theme" className="h-9">
        <TabsTrigger
          value="light"
          aria-label="Light theme"
          className="w-9 px-0"
        >
          <Sun className="size-4" />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          aria-label="Dark theme"
          className="w-9 px-0"
        >
          <Moon className="size-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

