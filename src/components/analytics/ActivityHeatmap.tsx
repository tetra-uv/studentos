import { useMemo } from "react";
import { clsx } from "clsx";
import { subDays, format, startOfWeek, eachDayOfInterval } from "date-fns";

interface ActivityHeatmapProps {
  data: Date[];
  days?: number;
  colorClass?: string; // e.g. "bg-primary" or "bg-emerald-500"
}

export function ActivityHeatmap({ data, days = 365, colorClass = "bg-primary" }: ActivityHeatmapProps) {
  const heatmapGrid = useMemo(() => {
    const today = new Date();
    // Start exactly `days` ago, but align to start of the week for nice columns
    const startDate = subDays(today, days - 1);
    const alignedStartDate = startOfWeek(startDate, { weekStartsOn: 0 }); // Sunday start

    const allDays = eachDayOfInterval({ start: alignedStartDate, end: today });

    // Create lookup
    const datesMap = new Set(data.map((d) => format(d, "yyyy-MM-dd")));

    return allDays.map((date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      const isActive = datesMap.has(dateStr);
      // Determine if it's within our actual range or just padding for week alignment
      const isPadding = date < startDate;

      return {
        date,
        isActive,
        isPadding,
      };
    });
  }, [data, days]);

  // Divide into weeks (columns)
  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < heatmapGrid.length; i += 7) {
      w.push(heatmapGrid.slice(i, i + 7));
    }
    return w;
  }, [heatmapGrid]);

  return (
    <div className="flex flex-col overflow-x-auto pb-2">
      <div className="flex gap-1">
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1">
            {week.map((day, dIndex) => (
              <div
                key={dIndex}
                title={format(day.date, "MMM d, yyyy")}
                className={clsx(
                  "w-3 h-3 rounded-sm transition-colors",
                  day.isPadding ? "opacity-0" : "",
                  day.isActive && !day.isPadding ? colorClass : "bg-slate-100 dark:bg-slate-800",
                  day.isActive && !day.isPadding ? "opacity-100" : "opacity-40"
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800 opacity-40"></div>
        <div className={clsx("w-3 h-3 rounded-sm", colorClass)}></div>
        <span>More</span>
      </div>
    </div>
  );
}
