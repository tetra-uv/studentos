export type TodoPriority = "low" | "medium" | "high";
export type TodoStatus = "todo" | "in_progress" | "completed";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  courseId?: string;
  priority: TodoPriority;
  status: TodoStatus;
  dueDate?: number;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
}
