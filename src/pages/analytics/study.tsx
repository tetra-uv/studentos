import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { EmptyStateStory } from "../../components/analytics/EmptyStateStory";
import { ActivityHeatmap } from "../../components/analytics/ActivityHeatmap";
import { useStudyAnalytics } from "../../hooks/analytics/useStudyAnalytics";
import { BookOpen } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function AnalyticsStudyPage() {
  const analytics = useStudyAnalytics();

  if (!analytics) {
    return (
      <Container>
        <PageHeader title="Study Insights" description="Understand your learning patterns." />
        <EmptyStateStory 
          title="Your story starts here." 
          description="Log your first study session to reveal your learning trends." 
          icon={<BookOpen className="h-6 w-6" />}
        />
      </Container>
    );
  }

  const { thisWeekHours, thisMonthHours, averageSessionLength, longestStreak, courseDistribution, allSessionDates } = analytics;

  return (
    <Container>
      <PageHeader title="Study Insights" description="Understand your learning patterns." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="This Week" value={`${thisWeekHours.toFixed(1)}h`} />
        <StatCard title="This Month" value={`${thisMonthHours.toFixed(1)}h`} />
        <StatCard title="Avg Session" value={`${Math.round(averageSessionLength)}m`} />
        <StatCard title="Longest Streak" value={`${longestStreak} days`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 border rounded-xl bg-card border-border/50 overflow-hidden">
          <h3 className="text-sm font-semibold mb-6">Study Activity Heatmap</h3>
          <ActivityHeatmap data={allSessionDates} days={365} colorClass="bg-violet-500" />
        </div>

        <div className="p-6 border rounded-xl bg-card border-border/50 flex flex-col">
          <h3 className="text-sm font-semibold mb-6">Time by Course (Hours)</h3>
          <div className="h-[250px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-4 text-xs text-muted-foreground overflow-y-auto max-h-[100px] no-scrollbar">
            {courseDistribution.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }}></div>
                  <span className="truncate max-w-[120px]">{d.name}</span>
                </div>
                <span>{d.value}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
