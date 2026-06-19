import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface BentoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ title, description, icon, children, className, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={clsx(
        "group relative flex flex-col overflow-hidden rounded-3xl border-2 dark:border border-border-strong bg-card hover:bg-accent/50 transition-all duration-300 shadow-sm hover:shadow-md",
        className
      )}
    >
      <div className="relative z-10 flex flex-col gap-2 p-8 h-full">
        {icon && (
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-foreground group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        
        {children && (
          <div className="mt-8 flex-1 flex items-end justify-center">
            {children}
          </div>
        )}
      </div>
      
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--color-foreground)_0%,transparent_70%)]" />
    </motion.div>
  );
}
