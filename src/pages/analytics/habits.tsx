import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { EmptyStateStory } from "../../components/analytics/EmptyStateStory";
import { ActivityHeatmap } from "../../components/analytics/ActivityHeatmap";
import { useHabitAnalytics } from "../../hooks/analytics/useHabitAnalytics";
import { Flame } from "lucide-react";

export default function AnalyticsHabitsPage() {
  const analytics = useHabitAnalytics();

  if (!analytics) {
    return (
      <Container>
        <PageHeader title="Habit Insights" description="Understand your daily consistency." />
        <EmptyStateStory title="Your story starts here." description="Start tracking your habits to unlock a beautiful heatmap of your progress." />
      </Container>
    );
  }

  const { completionPercentage, bestHabit, maxStreak, allCompletionDates, totalCompletions } = analytics;

  return (
    <Container>
      <PageHeader title="Habit Insights" description="Understand your daily consistency." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Completion Rate" value={`${completionPercentage.toFixed(1)}%`} />
        <StatCard title="Total Completions" value={totalCompletions.toString()} />
        <StatCard 
          title="Best Streak" 
          value={`${maxStreak} days`} 
          icon={<Flame className="h-4 w-4 text-orange-500" />} 
          subtext={bestHabit ? bestHabit.name : ""} 
        />
        <StatCard title="Habits Tracked" value={bestHabit ? "Active" : "—"} />
      </div>

      <div className="p-6 border rounded-xl bg-card border-border/50 overflow-hidden mb-8">
        <h3 className="text-sm font-semibold mb-6">Consistency Heatmap</h3>
        <ActivityHeatmap data={allCompletionDates} days={365} colorClass="bg-emerald-500" />
      </div>
    </Container>
  );
}
