"use client"

import { cn } from "@/lib/utils"
import type { UIMessage } from "ai"
import type { HTMLAttributes } from "react"

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"]
}

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full max-w-[90%] flex-col gap-2",
      from === "user" ? "is-user ml-auto items-end" : "is-assistant items-start",
      className
    )}
    {...props}
  />
)

export type MessageContentProps = HTMLAttributes<HTMLDivElement>

export const MessageContent = ({
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      "rounded-2xl px-4 py-3 text-sm leading-relaxed",
      "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
      "group-[.is-assistant]:bg-muted group-[.is-assistant]:text-foreground",
      className
    )}
    {...props}
  />
)
