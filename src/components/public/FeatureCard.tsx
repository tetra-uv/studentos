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
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-slate-900 dark:text-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
