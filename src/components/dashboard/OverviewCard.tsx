import type { ReactNode } from "react";
import { DashboardCard } from "./DashboardCard";

interface StatItem {
  label: string;
  value: string | number;
  icon?: ReactNode;
  subtext?: string;
}

interface OverviewCardProps {
  stats: StatItem[];
}

/**
 * OverviewCard — a responsive grid of stat tiles.
 * Generic enough to be reused by future modules.
 */
export function OverviewCard({ stats }: OverviewCardProps) {
  return (
    <DashboardCard>
      <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 dark:divide-slate-800">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col gap-1 p-5">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              {stat.icon}
              <p className="text-xs font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight">
              {stat.value}
            </p>
            {stat.subtext && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{stat.subtext}</p>
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
