import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ListTodo, CheckCircle2, Clock, CalendarIcon, AlertCircle } from "lucide-react";
import { useTodoStore } from "../../store/todoStore";
import { APP_ROUTES } from "../../config/routes";
import { motion, AnimatePresence } from "framer-motion";

export function TodoWidget() {
  const navigate = useNavigate();
  const { todos } = useTodoStore();

  const stats = useMemo(() => {
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59, 999);

    let completedToday = 0;
    let overdue = 0;
    let dueToday = 0;
    let upcoming = 0;

    todos.forEach((todo) => {
      if (todo.status === "completed") {
        if (todo.completedAt && todo.completedAt >= todayStart && todo.completedAt <= todayEnd) {
          completedToday++;
        }
      } else {
        if (todo.dueDate) {
          if (todo.dueDate < todayStart) {
            overdue++;
          } else if (todo.dueDate >= todayStart && todo.dueDate <= todayEnd) {
            dueToday++;
          } else {
            upcoming++;
          }
        } else {
          // No due date treats as upcoming/backlog
          upcoming++;
        }
      }
    });

    return { completedToday, overdue, dueToday, upcoming };
  }, [todos]);

  const activeTodos = todos.filter(t => t.status !== "completed");
  const recentTasks = [...activeTodos].sort((a, b) => {
    // Sort by due date, then priority, then creation
    if (a.dueDate && b.dueDate) return a.dueDate - b.dueDate;
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    return b.createdAt - a.createdAt;
  }).slice(0, 3); // Top 3 tasks

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <ListTodo className="w-5 h-5 text-primary" />
          <h3>Tasks Overview</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(APP_ROUTES.TODO)}
          className="h-8 text-xs font-semibold"
        >
          View All
        </Button>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="flex flex-col p-3 rounded-xl bg-muted/30 border border-border/50">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1">
            <CalendarIcon className="w-3.5 h-3.5 text-blue-500" />
            Due Today
          </span>
          <span className="text-2xl font-bold text-foreground">{stats.dueToday}</span>
        </div>
        <div className="flex flex-col p-3 rounded-xl bg-muted/30 border border-border/50">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Done Today
          </span>
          <span className="text-2xl font-bold text-foreground">{stats.completedToday}</span>
        </div>
        <div className="flex flex-col p-3 rounded-xl bg-muted/30 border border-border/50">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Upcoming
          </span>
          <span className="text-2xl font-bold text-foreground">{stats.upcoming}</span>
        </div>
        <div className="flex flex-col p-3 rounded-xl bg-muted/30 border border-border/50">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            Overdue
          </span>
          <span className="text-2xl font-bold text-foreground">{stats.overdue}</span>
        </div>
      </div>

      {recentTasks.length > 0 && (
        <div className="px-4 pb-4">
          <div className="h-px bg-border/50 mb-3" />
          <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-2">Up Next</p>
          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {recentTasks.map(task => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-sm text-foreground truncate">{task.title}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Card>
  );
}
