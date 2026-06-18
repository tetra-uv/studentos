import { useNavigate } from "react-router-dom";
import { DashboardCard } from "./DashboardCard";
import { formatPercentage, calculateCurrentPercentage } from "../../utils/attendance";
import type { Subject } from "../../types/subject";

interface RecentSubjectsCardProps {
  subjects: Subject[];
}

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * RecentSubjectsCard — last 5 subjects sorted by updatedAt.
 * Shows name, current percentage, and a human-friendly timestamp.
 */
export function RecentSubjectsCard({ subjects }: RecentSubjectsCardProps) {
  const navigate = useNavigate();

  const recent = [...subjects]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <DashboardCard title="Recently Updated">
        <div className="px-5 py-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No recent activity yet.
          </p>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Recently Updated">
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {recent.map((subject) => {
          const pct = calculateCurrentPercentage(subject.attendedClasses, subject.totalClasses);
          return (
            <li
              key={subject.id}
              className="flex items-center justify-between gap-4 px-5 py-3.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              onClick={() => navigate("/attendance")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/attendance")}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">
                  {subject.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {timeAgo(subject.updatedAt)}
                </p>
              </div>
              <p className="text-sm tabular-nums font-medium text-slate-700 dark:text-slate-300 shrink-0">
                {formatPercentage(pct)}
              </p>
            </li>
          );
        })}
      </ul>
    </DashboardCard>
  );
}
