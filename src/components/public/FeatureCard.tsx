import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="group relative p-8 rounded-3xl border-2 dark:border border-border-strong bg-card shadow-sm hover:shadow-md hover:bg-accent/50 transition-all duration-300 overflow-hidden"
    >
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 text-foreground group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--color-foreground)_0%,transparent_70%)]" />
    </motion.div>
  );
}
