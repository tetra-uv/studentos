import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { Text } from "./Text";

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-800",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        {icon}
      </div>
      <Text variant="h3" className="mb-1">
        {title}
      </Text>
      <Text variant="muted" className="mb-6 max-w-sm">
        {description}
      </Text>
      {action && <div>{action}</div>}
    </div>
  )
);
EmptyState.displayName = "EmptyState";



