import type { ReactNode } from "react";
import { DashboardCard } from "./DashboardCard";

interface Insight {
  icon?: ReactNode;
  message: string;
}

interface InsightCardProps {
  insights: Insight[];
}

/**
 * InsightCard — renders a list of human-friendly insight messages.
 * Intentionally stateless; caller computes the messages.
 */
export function InsightCard({ insights }: InsightCardProps) {
  if (insights.length === 0) return null;

  return (
    <DashboardCard title="Insights">
      <ul className="divide-y divide-border">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start gap-3 px-5 py-4">
            {insight.icon && (
              <span className="mt-0.5 shrink-0 text-muted-foreground">
                {insight.icon}
              </span>
            )}
            <p className="text-sm text-muted-foreground">{insight.message}</p>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
