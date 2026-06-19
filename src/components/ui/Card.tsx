import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "rounded-2xl border border-border-strong bg-card text-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";



