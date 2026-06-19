import { clsx } from "clsx";
import type { UserProfile } from "../../lib/domain/models/user";

interface UserAvatarProps {
  user: UserProfile;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const colorMap: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-500 dark:bg-violet-500/20 dark:text-violet-400 border-violet-500/20",
  emerald: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20",
  rose: "bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400 border-rose-500/20",
  amber: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20",
  blue: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20",
  cyan: "bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-500/20",
  indigo: "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-500/20",
};

const sizeMap = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
  xl: "h-16 w-16 text-xl",
};

function getInitials(name: string) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function UserAvatar({ user, className, size = "md" }: UserAvatarProps) {
  const colorClass = colorMap[user.avatarColor] || colorMap.violet;
  const sizeClass = sizeMap[size];

  return (
    <div
      className={clsx(
        "relative flex shrink-0 items-center justify-center rounded-full overflow-hidden border font-semibold select-none",
        colorClass,
        sizeClass,
        className
      )}
    >
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
      ) : (
        <span>{getInitials(user.name)}</span>
      )}
    </div>
  );
}
