import { clsx } from "clsx";
import type { CalendarEvent } from "../../types/calendar";
import { CheckCircle2, Clock, FileText, BookOpen } from "lucide-react";

interface EventCardProps {
  event: CalendarEvent;
  isCompact?: boolean;
}

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/50",
  blue: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50",
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50",
  violet: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-900/50",
};

const IconMap = {
  task: CheckCircle2,
  assignment: FileText,
  pomodoro: Clock,
  study: BookOpen,
};

export function EventCard({ event, isCompact = false }: EventCardProps) {
  const colorClass = colorMap[event.color] || colorMap.blue;
  const Icon = IconMap[event.type];

  if (isCompact) {
    return (
      <div 
        className={clsx(
          "w-full px-1.5 py-0.5 rounded text-[10px] font-semibold truncate border",
          colorClass,
          event.isCompleted && "opacity-50 line-through"
        )}
        title={event.title}
      >
        {event.title}
      </div>
    );
  }

  return (
    <div 
      className={clsx(
        "flex flex-col gap-1 w-full p-2.5 rounded-lg border transition-all active:scale-[0.98]",
        colorClass,
        event.isCompleted && "opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
          <span className={clsx("text-xs font-semibold truncate leading-tight", event.isCompleted && "line-through")}>
            {event.title}
          </span>
        </div>
      </div>
      {event.description && (
        <p className="text-[10px] opacity-80 line-clamp-1 pl-5">
          {event.description}
        </p>
      )}
    </div>
  );
}
