import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground hover:opacity-90",
      secondary: "bg-muted text-foreground hover:bg-muted/80",
      outline: "text-foreground border border-border",
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";



