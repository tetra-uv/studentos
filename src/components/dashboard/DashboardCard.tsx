import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { clsx } from "clsx";

interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
}

/**
 * DashboardCard — semantic wrapper for all dashboard sections.
 * Thin layer on top of the base Card so dashboard cards can be
 * visually distinguished without duplicating Card logic.
 */
export const DashboardCard = forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ title, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "rounded-xl border border-border bg-card shadow-sm",
        className
      )}
      {...props}
    >
      {title && (
        <div className="px-5 pt-5 pb-3 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
        </div>
      )}
      {children}
    </div>
  )
);
DashboardCard.displayName = "DashboardCard";
