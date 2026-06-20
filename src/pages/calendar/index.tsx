import { useState, useEffect } from "react";
import { addMonths, subMonths, addWeeks, subWeeks, format } from "date-fns";
import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { Button } from "../../components/ui/Button";
import { ChevronLeft, ChevronRight, LayoutGrid, List, LayoutTemplate } from "lucide-react";
import { clsx } from "clsx";

import { useCalendarEvents } from "../../hooks/useCalendarEvents";
import { MonthView } from "../../components/calendar/MonthView";
import { WeekView } from "../../components/calendar/WeekView";
import { AgendaView } from "../../components/calendar/AgendaView";

type ViewType = "month" | "week" | "agenda";

export default function CalendarPage() {
  const events = useCalendarEvents();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Persist view preference or default to month (agenda on mobile)
  const [view, setView] = useState<ViewType>(() => {
    const saved = localStorage.getItem("studentos-calendar-view");
    if (saved === "month" || saved === "week" || saved === "agenda") return saved;
    return window.innerWidth < 640 ? "agenda" : "month";
  });

  useEffect(() => {
    localStorage.setItem("studentos-calendar-view", view);
  }, [view]);

  const handlePrevious = () => {
    if (view === "month") setCurrentDate(subMonths(currentDate, 1));
    else if (view === "week") setCurrentDate(subWeeks(currentDate, 1));
    else {
      // For Agenda, jump 1 month back for simplicity
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (view === "month") setCurrentDate(addMonths(currentDate, 1));
    else if (view === "week") setCurrentDate(addWeeks(currentDate, 1));
    else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getHeaderLabel = () => {
    if (view === "month") return format(currentDate, "MMMM yyyy");
    if (view === "week") return `Week of ${format(currentDate, "MMM d, yyyy")}`;
    return "All Scheduled Events";
  };

  return (
    <Container className="flex flex-col h-full overflow-hidden pb-4">
      <PageHeader title="Calendar" description="Your academic timeline." className="shrink-0 mb-4" />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-foreground min-w-[200px]">
            {getHeaderLabel()}
          </h2>
          
          <div className="flex items-center bg-card border rounded-lg p-0.5 shadow-sm">
            <Button variant="ghost" size="sm" onClick={handlePrevious} className="px-2 h-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleToday} className="px-3 h-8 text-xs font-semibold">
              Today
            </Button>
            <Button variant="ghost" size="sm" onClick={handleNext} className="px-2 h-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center bg-muted/50 p-1 rounded-xl">
          <button
            onClick={() => setView("month")}
            className={clsx(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              view === "month" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Month</span>
          </button>
          <button
            onClick={() => setView("week")}
            className={clsx(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              view === "week" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span className="hidden sm:inline">Week</span>
          </button>
          <button
            onClick={() => setView("agenda")}
            className={clsx(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              view === "agenda" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Agenda</span>
          </button>
        </div>
      </div>

      {/* View Container */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <div className="min-w-[800px] h-full sm:min-w-0">
          {view === "month" && <MonthView events={events} currentDate={currentDate} />}
          {view === "week" && <WeekView events={events} currentDate={currentDate} />}
        </div>
        {view === "agenda" && (
          <div className="w-full h-full mt-2">
             <AgendaView events={events} />
          </div>
        )}
      </div>
    </Container>
  );
}
