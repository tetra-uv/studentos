import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { clsx } from "clsx";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";
import { AssignmentStatusBadge } from "./AssignmentStatusBadge";
import { AssignmentPriorityBadge } from "./AssignmentPriorityBadge";
import { formatDueDate, getDueDateStatus } from "../../utils/assignments";
import { AssignmentStatus } from "../../types/assignmentStatus";
import { useAssignmentStore } from "../../store/assignmentStore";
import type { Assignment } from "../../types/assignment";

interface AssignmentCardProps {
  assignment: Assignment;
  onEdit: (assignment: Assignment) => void;
  onDeleteOverride?: () => void;
}

const DUE_DATE_COLORS: Record<string, string> = {
  overdue: "text-red-600 dark:text-red-400",
  today: "text-orange-600 dark:text-orange-400",
  soon: "text-amber-600 dark:text-amber-500",
  upcoming: "text-slate-500 dark:text-slate-400",
  none: "text-slate-400 dark:text-slate-500",
};

export function AssignmentCard({ assignment, onEdit, onDeleteOverride }: AssignmentCardProps) {
  const { updateAssignment, deleteAssignment } = useAssignmentStore();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const isDone = assignment.status === AssignmentStatus.DONE;
  const dueDateStatus = getDueDateStatus(assignment.dueDate);

  const handleDelete = () => {
    if (isConfirmingDelete) {
      if (onDeleteOverride) {
        onDeleteOverride();
      } else {
        deleteAssignment(assignment.id);
      }
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const handleToggleDone = () => {
    updateAssignment(assignment.id, {
      status: isDone ? AssignmentStatus.TODO : AssignmentStatus.DONE,
    });
  };

  return (
    <Card className={clsx("p-4 flex flex-col gap-3 transition-opacity", isDone && "opacity-60")}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 min-w-0">
          {/* Done toggle checkbox */}
          <button
            onClick={handleToggleDone}
            aria-label={isDone ? "Mark as not done" : "Mark as done"}
            className={clsx(
              "mt-0.5 h-4 w-4 shrink-0 rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1",
              isDone
                ? "border-emerald-500 bg-emerald-500 dark:border-emerald-400 dark:bg-emerald-400"
                : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900"
            )}
          >
            {isDone && (
              <svg viewBox="0 0 12 12" className="h-full w-full text-white" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <div className="min-w-0">
            <p className={clsx("text-sm font-medium text-slate-900 dark:text-slate-50 leading-snug", isDone && "line-through")}>
              {assignment.title}
            </p>
            {assignment.subjectName && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{assignment.subjectName}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        {isConfirmingDelete ? (
          <div className="flex items-center gap-1 shrink-0 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md border border-red-200 dark:border-red-800">
            <span className="text-xs font-semibold text-red-700 dark:text-red-400 whitespace-nowrap">Delete?</span>
            <Button variant="ghost" size="sm" onClick={handleDelete} className="h-6 px-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900">Yes</Button>
            <Button variant="ghost" size="sm" onClick={() => setIsConfirmingDelete(false)} className="h-6 px-1.5 hover:bg-slate-200">No</Button>
          </div>
        ) : (
          <div className="flex gap-1 shrink-0">
            <Button variant="ghost" size="sm" onClick={() => onEdit(assignment)} aria-label="Edit assignment">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete} aria-label="Delete assignment">
              <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-500" />
            </Button>
          </div>
        )}
      </div>

      {/* Description */}
      {assignment.description && (
        <Text variant="muted" className="text-xs leading-relaxed pl-7">
          {assignment.description}
        </Text>
      )}

      {/* Footer row */}
      <div className="flex flex-wrap items-center gap-2 pl-7">
        <AssignmentStatusBadge status={assignment.status} />
        <AssignmentPriorityBadge priority={assignment.priority} />
        <span className={clsx("text-xs font-medium", DUE_DATE_COLORS[dueDateStatus])}>
          {formatDueDate(assignment.dueDate)}
        </span>
      </div>
    </Card>
  );
}
