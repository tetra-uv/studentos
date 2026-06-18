import { clsx } from "clsx";
import { AssignmentPriority } from "../../types/assignmentPriority";

const PRIORITY_LABELS: Record<AssignmentPriority, string> = {
  [AssignmentPriority.LOW]: "Low",
  [AssignmentPriority.MEDIUM]: "Medium",
  [AssignmentPriority.HIGH]: "High",
  [AssignmentPriority.URGENT]: "Urgent",
};

const PRIORITY_STYLES: Record<AssignmentPriority, string> = {
  [AssignmentPriority.LOW]:
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  [AssignmentPriority.MEDIUM]:
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  [AssignmentPriority.HIGH]:
    "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
  [AssignmentPriority.URGENT]:
    "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
};

interface AssignmentPriorityBadgeProps {
  priority: AssignmentPriority;
  className?: string;
}

export function AssignmentPriorityBadge({ priority, className }: AssignmentPriorityBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
        PRIORITY_STYLES[priority],
        className
      )}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
