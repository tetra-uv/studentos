import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { Text } from "./Text";

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, actions, className, ...props }, ref) => (
    <div ref={ref} className={clsx("flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6", className)} {...props}>
      <div className="flex flex-col gap-1">
        <Text variant="h1">{title}</Text>
        {description && <Text variant="muted">{description}</Text>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
);
PageHeader.displayName = "PageHeader";



