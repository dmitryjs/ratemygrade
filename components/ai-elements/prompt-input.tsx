"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { ChatStatus } from "ai"
import { CornerDownLeftIcon, SquareIcon, XIcon } from "lucide-react"
import {
  type ComponentProps,
  type FormEvent,
  type FormEventHandler,
  type HTMLAttributes,
  type KeyboardEventHandler,
  useCallback,
  useState,
} from "react"

export type PromptInputMessage = {
  text: string
}

export type PromptInputProps = Omit<
  HTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  onSubmit: (
    message: PromptInputMessage,
    event: FormEvent<HTMLFormElement>
  ) => void | Promise<void>
}

export const PromptInput = ({
  className,
  onSubmit,
  children,
  ...props
}: PromptInputProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const text = String(formData.get("message") ?? "")
    void onSubmit({ text }, event)
  }

  return (
    <form
      className={cn(
        "w-full overflow-hidden rounded-3xl border bg-card p-2 shadow-xs",
        className
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  )
}

export type PromptInputBodyProps = HTMLAttributes<HTMLDivElement>

export const PromptInputBody = ({
  className,
  ...props
}: PromptInputBodyProps) => (
  <div className={cn("flex flex-col", className)} {...props} />
)

export type PromptInputTextareaProps = ComponentProps<typeof Textarea>

export const PromptInputTextarea = ({
  className,
  onKeyDown,
  placeholder = "What would you like to know?",
  ...props
}: PromptInputTextareaProps) => {
  const [isComposing, setIsComposing] = useState(false)

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.key !== "Enter") return
    if (isComposing || event.nativeEvent.isComposing || event.shiftKey) return
    event.preventDefault()
    const submitButton = event.currentTarget.form?.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement | null
    if (submitButton?.disabled) return
    event.currentTarget.form?.requestSubmit()
  }

  return (
    <Textarea
      className={cn(
        "min-h-12 rounded-xl border-0 bg-transparent px-3 py-2 shadow-none focus-visible:border-transparent focus-visible:ring-0",
        className
      )}
      name="message"
      onCompositionEnd={() => setIsComposing(false)}
      onCompositionStart={() => setIsComposing(true)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
    />
  )
}

export type PromptInputFooterProps = HTMLAttributes<HTMLDivElement>

export const PromptInputFooter = ({
  className,
  ...props
}: PromptInputFooterProps) => (
  <div
    className={cn("flex items-center justify-between gap-1 p-1", className)}
    {...props}
  />
)

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>

export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <div className={cn("flex min-w-0 items-center gap-1", className)} {...props} />
)

export type PromptInputSubmitProps = ComponentProps<typeof Button> & {
  status?: ChatStatus
}

export const PromptInputSubmit = ({
  className,
  variant = "default",
  size = "icon-sm",
  status,
  children,
  ...props
}: PromptInputSubmitProps) => {
  const isGenerating = status === "submitted" || status === "streaming"

  const icon = useCallback(() => {
    if (status === "submitted") return <Spinner />
    if (status === "streaming") return <SquareIcon className="size-4" />
    if (status === "error") return <XIcon className="size-4" />
    return <CornerDownLeftIcon className="size-4" />
  }, [status])()

  return (
    <Button
      aria-label={isGenerating ? "Stop" : "Submit"}
      className={cn("rounded-xl", className)}
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ?? icon}
    </Button>
  )
}
