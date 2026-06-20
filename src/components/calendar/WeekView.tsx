import { useMemo } from "react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import type { CalendarEvent } from "../../types/calendar";
import { EventCard } from "./EventCard";
import { clsx } from "clsx";

interface WeekViewProps {
  events: CalendarEvent[];
  currentDate: Date;
}

export function WeekView({ events, currentDate }: WeekViewProps) {
  const days = useMemo(() => {
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentDate]);

  return (
    <div className="flex w-full h-full min-h-[600px] border rounded-2xl bg-card overflow-hidden shadow-sm divide-x">
      {days.map(day => {
        const isDayToday = isToday(day);
        const dayEvents = events.filter(e => isSameDay(new Date(e.date), day));

        return (
          <div key={day.toISOString()} className="flex-1 flex flex-col min-w-[120px]">
            {/* Header */}
            <div className={clsx(
              "flex flex-col items-center justify-center py-3 border-b border-border/50 transition-colors",
              isDayToday ? "bg-primary/10" : "bg-muted/20"
            )}>
              <span className={clsx("text-xs font-bold uppercase tracking-wider mb-1", isDayToday ? "text-primary" : "text-muted-foreground")}>
                {format(day, 'EEE')}
              </span>
              <span className={clsx(
                "text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full",
                isDayToday ? "bg-primary text-primary-foreground" : "text-foreground"
              )}>
                {format(day, 'd')}
              </span>
            </div>

            {/* Events List */}
            <div className={clsx("flex-1 p-2 flex flex-col gap-2 overflow-y-auto", isDayToday && "bg-primary/5")}>
              {dayEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
