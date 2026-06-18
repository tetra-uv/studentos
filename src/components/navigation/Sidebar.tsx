import { Logo } from "../ui/Logo";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, FileText, Activity, Clock, Settings, Download } from "lucide-react";
import { clsx } from "clsx";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Attendance", path: "/attendance", icon: CheckSquare },
  { name: "Assignments", path: "/assignments", icon: FileText },
  { name: "Habits", path: "/habits", icon: Activity },
  { name: "Pomodoro", path: "/pomodoro", icon: Clock },
];

import { useInstallPrompt } from "../../hooks/useInstallPrompt";

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
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-200/50 text-slate-900 dark:bg-slate-800/50 dark:text-slate-50"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
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
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors focus:outline-none"
          >
            <Download className="h-4 w-4" />
            Install App
          </button>
        )}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-slate-200/50 text-slate-900 dark:bg-slate-800/50 dark:text-slate-50"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
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


