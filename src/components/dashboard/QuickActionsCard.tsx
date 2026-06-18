import { useNavigate } from "react-router-dom";
import { CheckSquare, Plus } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { useAttendanceStore } from "../../store/attendanceStore";

/**
 * QuickActionsCard — navigation shortcuts only.
 * "Add Subject" navigates to Attendance and signals to open the form
 * via the page's own state; no cross-module state needed here.
 */
export function QuickActionsCard() {
  const navigate = useNavigate();
  const { subjects } = useAttendanceStore();

  const actions = [
    {
      id: "open-attendance",
      icon: <CheckSquare className="h-5 w-5" />,
      label: "Open Attendance",
      description: `${subjects.length} subject${subjects.length !== 1 ? "s" : ""} tracked`,
      onClick: () => navigate("/attendance"),
    },
    {
      id: "add-subject",
      icon: <Plus className="h-5 w-5" />,
      label: "Add Subject",
      description: "Track a new class",
      onClick: () => navigate("/attendance?action=add"),
    },
  ];

  return (
    <DashboardCard title="Quick Actions">
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {actions.map((action) => (
          <li key={action.id}>
            <button
              onClick={action.onClick}
              className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {action.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                  {action.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {action.description}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
