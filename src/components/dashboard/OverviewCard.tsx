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
      <div className="grid grid-cols-2 divide-x divide-y divide-border">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col gap-1 p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              {stat.icon}
              <p className="text-xs font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
            <p className="text-2xl font-semibold text-foreground tracking-tight">
              {stat.value}
            </p>
            {stat.subtext && (
              <p className="text-xs text-muted-foreground">{stat.subtext}</p>
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
