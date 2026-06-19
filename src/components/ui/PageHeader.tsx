import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { Text } from "./Text";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: ReactNode;
}

import { motion } from "framer-motion";

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, actions, className, ...props }, ref) => (
    <div ref={ref} className={clsx("flex flex-col mb-8", className)} {...props}>
      <Breadcrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Text variant="h1">{title}</Text>
          </motion.div>
          {description && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            >
              <Text variant="muted">{description}</Text>
            </motion.div>
          )}
        </div>
        {actions && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            {actions}
          </motion.div>
        )}
      </div>
    </div>
  )
);
PageHeader.displayName = "PageHeader";



