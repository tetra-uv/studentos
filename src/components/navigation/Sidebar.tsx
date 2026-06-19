import { Logo } from "../ui/Logo";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, FileText, Activity, Clock, Settings, Download } from "lucide-react";
import { clsx } from "clsx";
import { APP_ROUTES } from "../../config/routes";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

const NAV_ITEMS = [
  { name: "Dashboard", path: APP_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: "Attendance", path: APP_ROUTES.ATTENDANCE, icon: CheckSquare },
  { name: "Assignments", path: APP_ROUTES.ASSIGNMENTS, icon: FileText },
  { name: "Habits", path: APP_ROUTES.HABITS, icon: Activity },
  { name: "Pomodoro", path: APP_ROUTES.POMODORO, icon: Clock },
];

export function Sidebar() {
  const { isInstallable, promptInstall } = useInstallPrompt();

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50 md:flex">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-transparent">
        <Logo />
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                isActive
                  ? "bg-slate-200/50 text-muted-foreground dark:bg-slate-800/50 dark:text-muted-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-muted-foreground dark:hover:bg-accent dark:hover:text-muted-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto flex flex-col gap-1">
        {isInstallable && (
          <button
            onClick={promptInstall}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Download className="h-4 w-4" />
            Install App
          </button>
        )}
        <NavLink
          to={APP_ROUTES.SETTINGS}
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
              isActive
                ? "bg-slate-200/50 text-muted-foreground dark:bg-slate-800/50 dark:text-muted-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-muted-foreground dark:hover:bg-accent dark:hover:text-muted-foreground"
            )
          }
        >
          <Settings className="h-4 w-4" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}


