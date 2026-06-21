import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { EmptyStateStory } from "../../components/analytics/EmptyStateStory";
import { usePomodoroAnalytics } from "../../hooks/analytics/usePomodoroAnalytics";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsPomodoroPage() {
  const analytics = usePomodoroAnalytics();

  if (!analytics) {
    return (
      <Container>
        <PageHeader title="Focus Insights" description="Understand your productivity sessions." />
        <EmptyStateStory title="Your story starts here." description="Start your first focus session to see your productivity trends." />
      </Container>
    );
  }

  const { totalFocusHours, todayMinutes, dailyAverage, sessionsCompleted, chartData } = analytics;

  return (
    <Container>
      <PageHeader title="Focus Insights" description="Understand your productivity sessions." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Focus Time" value={`${totalFocusHours.toFixed(1)}h`} />
        <StatCard title="Today" value={`${Math.round(todayMinutes)}m`} />
        <StatCard title="Daily Average" value={`${dailyAverage.toFixed(1)}h`} />
        <StatCard title="Sessions Completed" value={sessionsCompleted.toString()} />
      </div>

      <div className="p-6 border rounded-xl bg-card border-border/50 mb-8">
        <h3 className="text-sm font-semibold mb-6">Focus Hours (Last 7 Days)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "4 4" }}
                contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px" }}
              />
              <Area type="monotone" dataKey="hours" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Container>
  );
}
