"use client"

import { useEffect, useRef } from "react"

type VirtualKeyboard = {
  overlaysContent: boolean
  boundingRect: DOMRect
  addEventListener(type: "geometrychange", listener: () => void): void
  removeEventListener(type: "geometrychange", listener: () => void): void
}

function virtualKeyboard(): VirtualKeyboard | undefined {
  return (navigator as Navigator & { virtualKeyboard?: VirtualKeyboard }).virtualKeyboard
}

function isTextField(node: EventTarget | null): boolean {
  if (!(node instanceof HTMLElement)) return false
  const tag = node.tagName
  return tag === "TEXTAREA" || tag === "INPUT" || node.isContentEditable
}

export function useVisualViewportLock<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!active || !el) return

    const root = document.documentElement
    root.classList.add("interview-active")

    let raf = 0
    let pollUntil = 0
    const vk = virtualKeyboard()
    if (vk) vk.overlaysContent = true

    const apply = () => {
      const vv = window.visualViewport
      const inner = window.innerHeight
      const client = root.clientHeight
      const vvHeight = vv?.height ?? inner
      const vvTop = vv?.offsetTop ?? 0
      const vkHeight = vk?.boundingRect.height ?? 0
      const editing = isTextField(document.activeElement)

      const visible = Math.max(
        160,
        Math.round(
          vkHeight > 0
            ? Math.min(vvHeight, inner - vkHeight, client)
            : editing
              ? Math.min(vvHeight, inner, client)
              : vvHeight
        )
      )
      const top = Math.max(0, Math.round(vvTop))
      const inset = Math.max(0, Math.max(inner, client) - visible - top)

      el.style.position = "fixed"
      el.style.left = "0px"
      el.style.right = "0px"
      el.style.width = "100%"
      el.style.top = `${top}px`
      el.style.height = `${visible}px`
      el.style.maxHeight = `${visible}px`
      el.style.overflow = "hidden"
      el.style.setProperty("--vv-height", `${visible}px`)
      el.dataset.keyboardOpen = inset > 64 || (editing && vkHeight > 24) ? "true" : "false"

      if (editing && window.scrollY > 0) {
        window.scrollTo(0, 0)
      }
    }

    const tick = () => {
      apply()
      if (performance.now() < pollUntil) {
        raf = window.requestAnimationFrame(tick)
      }
    }

    const startPoll = (durationMs: number) => {
      pollUntil = Math.max(pollUntil, performance.now() + durationMs)
      window.cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(tick)
    }

    const onFocusIn = (event: FocusEvent) => {
      if (isTextField(event.target)) startPoll(1400)
    }

    const onTouchStart = (event: TouchEvent) => {
      if (isTextField(event.target)) startPoll(1400)
    }

    const onResize = () => startPoll(800)

    const onOrientation = () => startPoll(1000)

    apply()
    startPoll(400)

    window.visualViewport?.addEventListener("resize", onResize)
    window.visualViewport?.addEventListener("scroll", apply)
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onOrientation)
    window.addEventListener("focusin", onFocusIn)
    window.addEventListener("focusout", apply)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    vk?.addEventListener("geometrychange", onResize)

    return () => {
      window.cancelAnimationFrame(raf)
      window.visualViewport?.removeEventListener("resize", onResize)
      window.visualViewport?.removeEventListener("scroll", apply)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onOrientation)
      window.removeEventListener("focusin", onFocusIn)
      window.removeEventListener("focusout", apply)
      window.removeEventListener("touchstart", onTouchStart)
      vk?.removeEventListener("geometrychange", onResize)
      root.classList.remove("interview-active")
      el.style.position = ""
      el.style.left = ""
      el.style.right = ""
      el.style.width = ""
      el.style.top = ""
      el.style.height = ""
      el.style.maxHeight = ""
      el.style.overflow = ""
      el.style.removeProperty("--vv-height")
      delete el.dataset.keyboardOpen
    }
  }, [active])

  return ref
}
