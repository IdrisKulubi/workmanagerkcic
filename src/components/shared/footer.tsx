"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const Footer = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <footer
      ref={ref}
      className={cn(
        "border-t bg-background w-full",
        className
      )}
      {...props}
    >
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with ❤️ by{" "}
            <Link
              href="/"
              className="font-medium underline underline-offset-4"
            >
              IACL Consulting
            </Link>
            . All rights reserved.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Terms
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
})
Footer.displayName = "Footer"

export { Footer } 