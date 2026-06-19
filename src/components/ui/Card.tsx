import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";

export interface CardProps extends HTMLMotionProps<"div"> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, whileHover, transition, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={whileHover ?? { y: -2, scale: 1.01 }}
      transition={transition ?? { duration: 0.2, ease: "easeOut" }}
      className={clsx(
        "rounded-2xl border-2 dark:border border-border-strong bg-card text-foreground shadow-sm hover:border-primary/50 transition-colors",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";



