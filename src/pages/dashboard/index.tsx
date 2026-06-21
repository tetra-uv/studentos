import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Activity, Clock, FileText, ChevronRight, Target, BookOpen } from "lucide-react";

import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";

import { WarningSubjectsCard } from "../../components/dashboard/WarningSubjectsCard";
import { RecentSubjectsCard } from "../../components/dashboard/RecentSubjectsCard";
import { QuickActionsCard } from "../../components/dashboard/QuickActionsCard";
import { TodoWidget } from "../../components/dashboard/TodoWidget";

import { useAttendanceAnalytics } from "../../hooks/analytics/useAttendanceAnalytics";
import { useHabitAnalytics } from "../../hooks/analytics/useHabitAnalytics";
import { usePomodoroAnalytics } from "../../hooks/analytics/usePomodoroAnalytics";
import { useTaskAnalytics } from "../../hooks/analytics/useTaskAnalytics";
import { useStudyAnalytics } from "../../hooks/analytics/useStudyAnalytics";
import { useAttendanceStore } from "../../store/attendanceStore";

import { formatPercentage } from "../../utils/attendance";
import { APP_ROUTES } from "../../config/routes";

function SnapshotCard({ title, value, icon, link }: { title: string, value: string, icon: React.ReactNode, link: string }) {
  return (
    <Link to={link} className="flex flex-col p-4 border border-border/50 bg-card rounded-xl hover:border-primary/50 transition-colors group">
      <div className="flex items-center justify-between mb-3 text-muted-foreground">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="text-2xl font-semibold">{value}</div>
    </Link>
  );
}

export default function DashboardPage() {
  const { subjects } = useAttendanceStore();

  const attendance = useAttendanceAnalytics();
  const habits = useHabitAnalytics();
  const pomodoro = usePomodoroAnalytics();
  const tasks = useTaskAnalytics();
  const study = useStudyAnalytics();

  // Productivity Score Heuristic (0-100)
  const productivityScore = useMemo(() => {
    let score = 0;
    // Tasks contribution (max 30)
    if (tasks) score += tasks.completionRate * 0.3;
    
    // Focus contribution (Pomodoro + Study) (max 40)
    // Assuming 3 hours total a day is optimal
    const focusMinutes = (pomodoro?.todayMinutes || 0) + (study?.todayMinutes || 0);
    score += Math.min((focusMinutes / 60 / 3) * 40, 40);
    
    // Habits contribution (max 30)
    if (habits) score += habits.completionPercentage * 0.3;
    
    return Math.round(score);
  }, [tasks, pomodoro, habits, study]);

  return (
    <Container>
      <PageHeader title="Dashboard" description="Your academic command center." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Today's Snapshot */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Today's Snapshot</h2>
          <div className="grid grid-cols-2 gap-4">
            <SnapshotCard 
              title="Tasks Done" 
              value={tasks ? `${tasks.completedTodayCount}` : "0"} 
              icon={<FileText className="h-4 w-4" />} 
              link={APP_ROUTES.ANALYTICS_TASKS}
            />
            <SnapshotCard 
              title="Focus Time" 
              value={pomodoro ? `${Math.round(pomodoro.todayMinutes)}m` : "0m"} 
              icon={<Clock className="h-4 w-4" />} 
              link={APP_ROUTES.ANALYTICS_POMODORO}
            />
            <SnapshotCard 
              title="Habits" 
              value={habits ? `${habits.completionPercentage.toFixed(0)}%` : "0%"} 
              icon={<Activity className="h-4 w-4" />} 
              link={APP_ROUTES.ANALYTICS_HABITS}
            />
            <SnapshotCard 
              title="Attendance" 
              value={attendance ? formatPercentage(attendance.overallPercentage) : "0%"} 
              icon={<CheckSquare className="h-4 w-4" />} 
              link={APP_ROUTES.ANALYTICS_ATTENDANCE}
            />
          </div>
        </div>

        {/* Productivity Score */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Productivity</h2>
          <div className="flex-1 flex flex-col items-center justify-center p-6 border border-border/50 bg-card rounded-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target className="h-32 w-32" />
            </div>
            <div className="text-5xl font-bold text-primary mb-2 relative z-10">{productivityScore}</div>
            <div className="text-sm text-muted-foreground relative z-10">Score Today</div>
          </div>
        </div>
      </div>
      
      {/* Study Hours Widget */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Study Hours</h2>
          <Link to={APP_ROUTES.ANALYTICS_STUDY} className="text-sm text-primary hover:underline flex items-center gap-1">
            View Analytics <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border/50 bg-card rounded-xl flex items-center gap-4">
            <div className="p-3 bg-violet-500/10 text-violet-500 rounded-lg">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Today's Study Time</div>
              <div className="text-xl font-semibold">{study ? `${Math.round(study.todayMinutes)}m` : "0m"}</div>
            </div>
          </div>
          <div className="p-4 border border-border/50 bg-card rounded-xl flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Weekly Total</div>
              <div className="text-xl font-semibold">{study ? `${study.thisWeekHours.toFixed(1)}h` : "0h"}</div>
            </div>
          </div>
          <div className="p-4 border border-border/50 bg-card rounded-xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Favorite Course</div>
              <div className="text-xl font-semibold truncate max-w-[150px]">{study?.favoriteCourse.name || "—"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold tracking-tight mb-4">Weekly Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-border/50 bg-card rounded-xl">
            <div className="text-sm text-muted-foreground mb-1">Task Completion</div>
            <div className="text-xl font-semibold">{tasks ? `${tasks.completionRate.toFixed(1)}%` : "—"}</div>
          </div>
          <div className="p-4 border border-border/50 bg-card rounded-xl">
            <div className="text-sm text-muted-foreground mb-1">Focus Time</div>
            <div className="text-xl font-semibold">{pomodoro ? `${(pomodoro.thisWeekMinutes / 60).toFixed(1)}h` : "—"}</div>
          </div>
          <div className="p-4 border border-border/50 bg-card rounded-xl">
            <div className="text-sm text-muted-foreground mb-1">Best Streak</div>
            <div className="text-xl font-semibold">{habits ? `${habits.maxStreak} days` : "—"}</div>
          </div>
          <div className="p-4 border border-border/50 bg-card rounded-xl">
            <div className="text-sm text-muted-foreground mb-1">Overdue Tasks</div>
            <div className="text-xl font-semibold text-rose-500">{tasks ? tasks.overdueCount : "0"}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {subjects.length > 0 && <WarningSubjectsCard subjects={subjects} />}
          <TodoWidget />
        </div>

        <div className="flex flex-col gap-6">
          <QuickActionsCard />
          {subjects.length > 0 && <RecentSubjectsCard subjects={subjects} />}
        </div>
      </div>

    </Container>
  );
}
