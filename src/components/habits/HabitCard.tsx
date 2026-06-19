import { useState } from "react";
import { Edit2, Trash2, Flame, Trophy } from "lucide-react";
import { clsx } from "clsx";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";
import { useHabitStore } from "../../store/habitStore";
import {
  getCurrentStreak,
  getLongestStreak,
  getCompletionPercentage,
  getLast7DayStatuses,
  isCompletedToday,
  isCompletedYesterday,
  getTodayString,
  getYesterdayString,
} from "../../utils/habits";
import type { Habit } from "../../types/habit";
import type { DayStatus } from "../../utils/habits";

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDeleteOverride?: () => void;
}

function SevenDayStrip({ statuses }: { statuses: DayStatus[] }) {
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  const today = new Date();
  // Compute actual day-of-week labels for the 7 displayed days
  const labels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return dayLabels[d.getDay()];
  });

  return (
    <div className="flex items-end gap-1.5" aria-label="Last 7 days activity">
      {statuses.map((status, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className={clsx(
              "h-3 w-3 rounded-full transition-colors",
              i === 6 && "ring-2 ring-offset-1 ring-slate-300 dark:ring-slate-600",
              status === "done"
                ? "bg-emerald-500 dark:bg-emerald-400"
                : "bg-muted"
            )}
            title={status === "done" ? "Completed" : "Missed"}
          />
          <span className="text-[9px] text-muted-foreground">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function HabitCard({ habit, onEdit, onDeleteOverride }: HabitCardProps) {
  const { toggleCompletion, deleteHabit } = useHabitStore();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const streak = getCurrentStreak(habit.completionLog);
  const longest = getLongestStreak(habit.completionLog);
  const pct = getCompletionPercentage(habit.completionLog, habit.createdAt);
  const statuses = getLast7DayStatuses(habit.completionLog);
  const todayDone = isCompletedToday(habit.completionLog);
  const yesterdayDone = isCompletedYesterday(habit.completionLog);

  const handleDelete = () => {
    if (isConfirmingDelete) {
      if (onDeleteOverride) onDeleteOverride();
      else deleteHabit(habit.id);
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const accentStyle = habit.color ? { borderLeftColor: habit.color } : undefined;

  return (
    <Card
      className={clsx("p-5 flex flex-col gap-4", habit.color && "border-l-4")}
      style={accentStyle}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {habit.icon && <span className="text-xl shrink-0">{habit.icon}</span>}
          <div className="min-w-0">
            <Text variant="h3" className="truncate">{habit.name}</Text>
            {habit.description && (
              <Text variant="muted" className="text-xs mt-0.5 line-clamp-1">{habit.description}</Text>
            )}
          </div>
        </div>

        {isConfirmingDelete ? (
          <div className="flex items-center gap-1 shrink-0 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md border border-red-200 dark:border-red-800">
            <span className="text-xs font-semibold text-red-700 dark:text-red-400 whitespace-nowrap">Delete?</span>
            <Button variant="ghost" size="sm" onClick={handleDelete} className="h-6 px-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900">Yes</Button>
            <Button variant="ghost" size="sm" onClick={() => setIsConfirmingDelete(false)} className="h-6 px-1.5 hover:bg-accent">No</Button>
          </div>
        ) : (
          <div className="flex gap-1 shrink-0">
            <Button variant="ghost" size="sm" onClick={() => onEdit(habit)} aria-label="Edit habit">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete} aria-label="Delete habit">
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
            </Button>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-orange-500 dark:text-orange-400">
          <Flame className="h-4 w-4" />
          <span className="font-semibold tabular-nums">{streak}</span>
          <span className="text-xs text-muted-foreground">streak</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Trophy className="h-4 w-4" />
          <span className="font-semibold tabular-nums">{longest}</span>
          <span className="text-xs text-muted-foreground">best</span>
        </div>
        <div className="ml-auto text-xs text-muted-foreground tabular-nums font-medium">
          {pct}% last 30d
        </div>
      </div>

      {/* 7-day strip */}
      <SevenDayStrip statuses={statuses} />

      {/* Completion actions */}
      <div className="flex gap-2 pt-2 border-t border-border">
        <Button
          variant={todayDone ? "secondary" : "primary"}
          className={clsx("flex-1 text-sm", todayDone && "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 border-0")}
          onClick={() => toggleCompletion(habit.id, getTodayString())}
          aria-pressed={todayDone}
        >
          {todayDone ? "✓ Done Today" : "Mark Done"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={clsx("text-xs shrink-0", yesterdayDone && "opacity-60")}
          onClick={() => toggleCompletion(habit.id, getYesterdayString())}
          aria-pressed={yesterdayDone}
          title={yesterdayDone ? "Undo yesterday" : "Mark yesterday as done"}
        >
          {yesterdayDone ? "✓ Yesterday" : "Yesterday"}
        </Button>
      </div>
    </Card>
  );
}
