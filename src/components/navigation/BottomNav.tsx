import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, FileText, Activity, Clock } from "lucide-react";
import { clsx } from "clsx";

const NAV_ITEMS = [
  { name: "Home", path: "/", icon: LayoutDashboard },
  { name: "Attend", path: "/attendance", icon: CheckSquare },
  { name: "Tasks", path: "/assignments", icon: FileText },
  { name: "Habits", path: "/habits", icon: Activity },
  { name: "Timer", path: "/pomodoro", icon: Clock },
];

export function BottomNav() {
  return (
    <nav className="flex h-16 shrink-0 items-center justify-around border-t border-slate-200 bg-white px-2 pb-safe dark:border-slate-800 dark:bg-slate-900 md:hidden">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-1.5 min-w-[64px] transition-colors",
              isActive
                ? "text-slate-900 dark:text-slate-50"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            )
          }
        >
          <item.icon className="h-5 w-5" />
          <span className="text-[10px] font-medium leading-none">{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}


