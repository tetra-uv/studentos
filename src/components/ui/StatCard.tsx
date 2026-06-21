import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  delay?: number;
  subtext?: string;
}

export function StatCard({ title, value, icon, trend, delay = 0, subtext }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </h3>
        <div className="text-slate-400 dark:text-slate-500">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          {value}
        </p>
        {trend && (
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend.value}
          </span>
        )}
      </div>
      {subtext && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
