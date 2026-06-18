import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { Text } from "./Text";

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, description, className, ...props }, ref) => (
    <div ref={ref} className={clsx("flex flex-col gap-1", className)} {...props}>
      <Text variant="h2">{title}</Text>
      {description && <Text variant="muted">{description}</Text>}
    </div>
  )
);
SectionHeader.displayName = "SectionHeader";



