import { useState, useMemo } from "react";
import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Toast } from "../../components/ui/Toast";
import { useTodoStore } from "../../store/todoStore";
import { TodoItem } from "../../components/todo/TodoItem";
import { Plus, Search, ListTodo, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function TodoPage() {
  const { todos, addTodo, undoDelete, lastDeletedTodo } = useTodoStore();
  const [search, setSearch] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTodo({
      title: newTaskTitle.trim(),
      priority: "medium", // Default
      status: "todo",
      tags: [],
    });
    setNewTaskTitle("");
  };

  const filteredTodos = useMemo(() => {
    let result = todos;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q)));
    }
    // Sort: In Progress -> Todo -> Completed. And High -> Medium -> Low
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    
    return result.sort((a, b) => {
      if (a.status === "completed" && b.status !== "completed") return 1;
      if (a.status !== "completed" && b.status === "completed") return -1;
      
      if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      return b.createdAt - a.createdAt;
    });
  }, [todos, search]);

  const activeTodos = filteredTodos.filter(t => t.status !== "completed");
  const completedTodos = filteredTodos.filter(t => t.status === "completed");

  return (
    <Container>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <PageHeader title="To-Do" description="Your daily tasks and goals." className="mb-0" />
        
        <div className="flex flex-1 sm:flex-none items-center gap-2 max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 bg-muted/50 border-transparent focus-visible:bg-background"
            />
          </div>
          <Button variant="outline" size="md" className="shrink-0 h-10 w-10 p-0 rounded-xl">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-24 lg:pb-12">
        {/* Quick Add Form */}
        <form 
          onSubmit={handleAddTodo}
          className={`relative flex items-center bg-card border rounded-2xl p-2 transition-all shadow-sm ${isFocused ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-border-strong dark:border-border'}`}
        >
          <div className="pl-3 pr-2 text-muted-foreground">
            <Plus className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground h-10"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <AnimatePresence>
            {newTaskTitle.trim() && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <Button type="submit" size="sm" className="h-8 px-4 rounded-xl font-semibold">
                  Add Task
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Task Lists */}
        {filteredTodos.length === 0 ? (
          <EmptyState
            icon={<ListTodo className="w-6 h-6" />}
            title={search ? "No matches found" : "Your day is clear"}
            description={search ? "Try a different search term" : "Add some tasks to get started."}
          />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {activeTodos.map(todo => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </AnimatePresence>
            </div>

            {completedTodos.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px bg-border/50 flex-1" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                    Completed ({completedTodos.length})
                  </span>
                  <div className="h-px bg-border/50 flex-1" />
                </div>
                <AnimatePresence mode="popLayout">
                  {completedTodos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-20 right-4 sm:hidden z-40">
        <Button 
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
          onClick={() => {
            const el = document.querySelector('input[placeholder="Add a new task..."]') as HTMLInputElement;
            if (el) el.focus();
          }}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Undo Toast */}
      {lastDeletedTodo && (
        <Toast 
          message={`Task deleted`} 
          onUndo={undoDelete} 
          onClose={() => { useTodoStore.setState({ lastDeletedTodo: null }) }} 
        />
      )}
    </Container>
  );
}
