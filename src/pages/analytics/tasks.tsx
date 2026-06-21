import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { EmptyStateStory } from "../../components/analytics/EmptyStateStory";
import { useTaskAnalytics } from "../../hooks/analytics/useTaskAnalytics";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function AnalyticsTasksPage() {
  const analytics = useTaskAnalytics();

  if (!analytics) {
    return (
      <Container>
        <PageHeader title="Task Insights" description="Understand your task completion rates." />
        <EmptyStateStory title="Your story starts here." description="Add tasks to your to-do list to start analyzing your productivity." />
      </Container>
    );
  }

  const { completedTodayCount, completionRate, overdueCount, totalTasks, statusData } = analytics;

  return (
    <Container>
      <PageHeader title="Task Insights" description="Understand your task completion rates." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Tasks" value={totalTasks.toString()} />
        <StatCard title="Completed Today" value={completedTodayCount.toString()} />
        <StatCard title="Completion Rate" value={`${completionRate.toFixed(1)}%`} />
        <StatCard title="Overdue Tasks" value={overdueCount.toString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 border rounded-xl bg-card border-border/50 flex flex-col">
          <h3 className="text-sm font-semibold mb-6">Task Status</h3>
          <div className="h-[300px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
            {statusData.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
