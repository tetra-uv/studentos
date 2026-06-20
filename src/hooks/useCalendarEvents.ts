import { useMemo } from "react";
import { useTodoStore } from "../store/todoStore";
import { useAssignmentStore } from "../store/assignmentStore";
import { usePomodoroStore } from "../store/pomodoroStore";
import { AssignmentStatus } from "../types/assignmentStatus";
import { PomodoroMode } from "../types/pomodoroMode";
import type { CalendarEvent } from "../types/calendar";

export function useCalendarEvents(): CalendarEvent[] {
  const { todos } = useTodoStore();
  const { assignments } = useAssignmentStore();
  const { sessions } = usePomodoroStore();

  return useMemo(() => {
    const events: CalendarEvent[] = [];

    // Map Todos
    todos.forEach((todo) => {
      const eventDate = todo.dueDate;
      
      if (eventDate) {
        events.push({
          id: `todo-${todo.id}`,
          title: todo.title,
          date: eventDate,
          type: "task",
          color: "blue",
          isCompleted: todo.status === "completed",
          priority: todo.priority,
          description: todo.description,
        });
      }
    });

    // Map Assignments
    assignments.forEach((assignment) => {
      if (assignment.dueDate) {
        events.push({
          id: `assignment-${assignment.id}`,
          title: assignment.title,
          date: assignment.dueDate,
          type: "assignment",
          color: "indigo",
          isCompleted: assignment.status === AssignmentStatus.DONE,
          priority: assignment.priority,
          description: assignment.description,
        });
      }
    });

    // Map Pomodoros
    sessions.forEach((session) => {
      events.push({
        id: `pomodoro-${session.id}`,
        title: `${session.mode === PomodoroMode.FOCUS ? "Focus" : "Break"} Session (${session.durationMinutes}m)`,
        date: session.completedAt,
        type: "pomodoro",
        color: "emerald",
        isCompleted: true,
      });
    });

    return events;
  }, [todos, assignments, sessions]);
}
