import { useNavigate } from "react-router-dom";
import { DashboardCard } from "./DashboardCard";
import { StatusBadge } from "../attendance/StatusBadge";
import { ProgressBar } from "../ui/ProgressBar";
import { AttendanceStatus } from "../../types/attendanceStatus";
import { calculateCurrentPercentage, calculateStatus, formatPercentage } from "../../utils/attendance";
import type { Subject } from "../../types/subject";

interface WarningSubjectsCardProps {
  subjects: Subject[];
}

const STATUS_ORDER: Record<AttendanceStatus, number> = {
  [AttendanceStatus.IMPOSSIBLE]: 0,
  [AttendanceStatus.CRITICAL]: 1,
  [AttendanceStatus.WARNING]: 2,
  [AttendanceStatus.SAFE]: 3,
};

/**
 * WarningSubjectsCard — shows top 3 subjects sorted by severity.
 * Reuses existing calculation utilities; owns zero business logic.
 */
export function WarningSubjectsCard({ subjects }: WarningSubjectsCardProps) {
  const navigate = useNavigate();

  const sorted = [...subjects]
    .map((s) => ({
      subject: s,
      status: calculateStatus(s.targetAttendance ?? 75, s.totalClasses, s.attendedClasses),
      percentage: calculateCurrentPercentage(s.attendedClasses, s.totalClasses),
    }))
    .filter(({ status }) => status !== AttendanceStatus.SAFE)
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
    .slice(0, 3);

  if (sorted.length === 0) {
    return (
      <DashboardCard title="Subjects Needing Attention">
        <div className="px-5 py-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All subjects are on track. Keep it up! 🎉
          </p>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Subjects Needing Attention">
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {sorted.map(({ subject, status, percentage }) => (
          <li
            key={subject.id}
            className="flex flex-col gap-2 px-5 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            onClick={() => navigate("/attendance")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/attendance")}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate pr-2">
                {subject.name}
              </p>
              <StatusBadge status={status} />
            </div>
            <div className="flex items-center gap-3">
              <ProgressBar percentage={percentage} className="flex-1" />
              <p className="text-xs tabular-nums text-slate-500 dark:text-slate-400 shrink-0">
                {formatPercentage(percentage)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
