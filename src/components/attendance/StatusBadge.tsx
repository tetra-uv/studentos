import { clsx } from "clsx";
import { AttendanceStatus } from "../../types/attendanceStatus";

export function StatusBadge({ status }: { status: AttendanceStatus }) {
  const styles = {
    [AttendanceStatus.SAFE]: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    [AttendanceStatus.WARNING]: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    [AttendanceStatus.CRITICAL]: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    [AttendanceStatus.IMPOSSIBLE]: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
  };

  return (
    <span className={clsx("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border", styles[status])}>
      {status}
    </span>
  );
}
