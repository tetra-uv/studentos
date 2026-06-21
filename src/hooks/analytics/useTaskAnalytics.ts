import { useMemo } from "react";
import { useTodoStore } from "../../store/todoStore";
import { isSameDay } from "date-fns";

export function useTaskAnalytics() {
  const { todos } = useTodoStore();

  return useMemo(() => {
    if (todos.length === 0) return null;

    const today = new Date();
    
    let completedTodayCount = 0;
    let overdueCount = 0;
    let totalCompleted = 0;

    todos.forEach(todo => {
      const isCompleted = todo.status === "completed";
      
      if (isCompleted) {
        totalCompleted++;
        if (todo.completedAt && isSameDay(new Date(todo.completedAt), today)) {
          completedTodayCount++;
        }
      } else {
        if (todo.dueDate && new Date(todo.dueDate) < today && !isSameDay(new Date(todo.dueDate), today)) {
          overdueCount++;
        }
      }
    });

    const completionRate = (totalCompleted / todos.length) * 100;

    // Data for Pie Chart
    const statusData = [
      { name: "Completed", value: totalCompleted, color: "var(--color-emerald-500)" },
      { name: "Pending", value: todos.length - totalCompleted - overdueCount, color: "var(--color-slate-400)" },
      { name: "Overdue", value: overdueCount, color: "var(--color-rose-500)" },
    ];

    return {
      completedTodayCount,
      completionRate,
      overdueCount,
      totalTasks: todos.length,
      statusData,
    };
  }, [todos]);
}
