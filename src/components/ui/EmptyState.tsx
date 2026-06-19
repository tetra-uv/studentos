import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { Text } from "./Text";
import { motion } from "framer-motion";

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      ref={ref as any}
      className={clsx(
        "flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200/60 bg-slate-50/50 p-8 text-center dark:border-slate-800/60 dark:bg-slate-900/30 shadow-sm",
        className
      )}
      {...(props as any)}
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/10 shadow-sm">
        {icon}
      </div>
      <Text variant="h3" className="mb-2 text-slate-900 dark:text-slate-50 font-semibold tracking-tight text-xl">
        {title}
      </Text>
      <Text variant="muted" className="mb-8 max-w-sm leading-relaxed">
        {description}
      </Text>
      {action && <div>{action}</div>}
    </motion.div>
  )
);
EmptyState.displayName = "EmptyState";



