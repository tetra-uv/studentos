import { motion } from "framer-motion";
import { Check, Circle, Clock, GripVertical, Trash2 } from "lucide-react";
import { clsx } from "clsx";
import type { Todo } from "../../types/todo";
import { useTodoStore } from "../../store/todoStore";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { updateTodo, deleteTodo } = useTodoStore();

  const toggleStatus = () => {
    const newStatus = todo.status === "completed" ? "todo" : "completed";
    updateTodo(todo.id, { status: newStatus });
  };

  const priorityColors = {
    low: "text-blue-500 bg-blue-500/10",
    medium: "text-amber-500 bg-amber-500/10",
    high: "text-rose-500 bg-rose-500/10",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={clsx(
        "group flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.99]",
        todo.status === "completed"
          ? "bg-muted/30 border-transparent opacity-60"
          : "bg-card border-border-strong dark:border-border shadow-sm hover:border-primary/30 hover:shadow-md"
      )}
    >
      <div className="flex items-center justify-center opacity-0 group-hover:opacity-40 cursor-grab active:cursor-grabbing transition-opacity">
        <GripVertical className="w-4 h-4" />
      </div>

      <button
        onClick={toggleStatus}
        className={clsx(
          "shrink-0 flex items-center justify-center w-5 h-5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          todo.status === "completed"
            ? "bg-primary border-primary text-primary-foreground"
            : "border-muted-foreground/50 hover:border-primary text-transparent"
        )}
      >
        {todo.status === "completed" ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
      </button>

      <div className="flex-1 flex flex-col min-w-0">
        <span
          className={clsx(
            "text-sm font-medium truncate transition-all duration-200",
            todo.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
          )}
        >
          {todo.title}
        </span>
        
        {(todo.dueDate || todo.tags.length > 0 || todo.priority !== "low") && (
          <div className="flex items-center gap-2 mt-1">
            {todo.priority !== "low" && (
              <span className={clsx("text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded", priorityColors[todo.priority])}>
                {todo.priority}
              </span>
            )}
            {todo.dueDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {new Date(todo.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            )}
            {todo.tags.map(tag => (
              <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
