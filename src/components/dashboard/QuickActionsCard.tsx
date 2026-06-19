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
      <ul className="divide-y divide-border">
        {actions.map((action) => (
          <li key={action.id}>
            <button
              onClick={action.onClick}
              className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                {action.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {action.label}
                </p>
                <p className="text-xs text-muted-foreground">
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
