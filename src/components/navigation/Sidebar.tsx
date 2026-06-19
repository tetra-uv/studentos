import { Logo } from "../ui/Logo";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, FileText, Activity, Clock, Settings, Download } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { APP_ROUTES } from "../../config/routes";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { UserProfileDropdown } from "../user/UserProfileDropdown";

const NAV_ITEMS = [
  { name: "Dashboard", path: APP_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: "Attendance", path: APP_ROUTES.ATTENDANCE, icon: CheckSquare },
  { name: "Assignments", path: APP_ROUTES.ASSIGNMENTS, icon: FileText },
  { name: "Habits", path: APP_ROUTES.HABITS, icon: Activity },
  { name: "Pomodoro", path: APP_ROUTES.POMODORO, icon: Clock },
];

export function Sidebar() {
  const { isInstallable, promptInstall } = useInstallPrompt();
  const location = useLocation();

  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-surface-sidebar md:flex shrink-0">
      <div className="flex h-14 shrink-0 items-center px-6 border-b border-transparent">
        <Logo />
      </div>
      
      <div className="px-2 pt-2 pb-1 shrink-0">
        <WorkspaceSwitcher />
      </div>

      <nav className="flex-1 space-y-1 px-4 py-2 overflow-y-auto relative">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={clsx(
                "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="h-4 w-4 relative z-10" />
              <span className="relative z-10">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mt-auto flex flex-col gap-1 shrink-0">
        <NavLink
          to={APP_ROUTES.SETTINGS}
          className={clsx(
            "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 mb-2",
            location.pathname === APP_ROUTES.SETTINGS
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {location.pathname === APP_ROUTES.SETTINGS && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute inset-0 rounded-lg bg-accent"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Settings className="h-4 w-4 relative z-10" />
          <span className="relative z-10">Settings</span>
        </NavLink>

        {isInstallable && (
          <button
            onClick={promptInstall}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 mb-2"
          >
            <Download className="h-4 w-4" />
            Install App
          </button>
        )}
        <div className="mt-2">
          <UserProfileDropdown variant="sidebar" />
        </div>
      </div>
    </aside>
  );
}


