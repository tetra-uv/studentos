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
        "rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className
      )}
      {...props}
    >
      {title && (
        <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
        </div>
      )}
      {children}
    </div>
  )
);
DashboardCard.displayName = "DashboardCard";
