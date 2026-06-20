import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { activeStorageAdapter } from "./storageAdapter";
import type { Todo, TodoStatus } from "../types/todo";

interface TodoState {
  todos: Todo[];
  lastDeletedTodo: Todo | null;
  addTodo: (data: Omit<Todo, "id" | "createdAt" | "updatedAt" | "status" | "tags"> & { status?: TodoStatus, tags?: string[] }) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, "id">>) => void;
  deleteTodo: (id: string) => void;
  undoDelete: () => void;
  importData: (todos: Todo[]) => void;
  resetData: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      lastDeletedTodo: null,
      
      addTodo: (data) => {
        const now = Date.now();
        const newTodo: Todo = {
          ...data,
          id: crypto.randomUUID(),
          status: data.status || "todo",
          tags: data.tags || [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ todos: [...state.todos, newTodo] }));
      },
      
      updateTodo: (id, updates) =>
        set((state) => {
          const now = Date.now();
          return {
            todos: state.todos.map((todo) => {
              if (todo.id !== id) return todo;
              
              const updatedTodo = { ...todo, ...updates, updatedAt: now };
              
              // Handle completion timestamp
              if (updates.status === "completed" && todo.status !== "completed") {
                updatedTodo.completedAt = now;
              } else if (updates.status !== undefined && updates.status !== "completed") {
                updatedTodo.completedAt = undefined;
              }
              
              return updatedTodo;
            }),
          };
        }),
        
      deleteTodo: (id) =>
        set((state) => {
          const todoToDelete = state.todos.find((t) => t.id === id);
          if (!todoToDelete) return state;
          
          return {
            todos: state.todos.filter((t) => t.id !== id),
            lastDeletedTodo: todoToDelete, // Store for undo
          };
        }),
        
      undoDelete: () =>
        set((state) => {
          if (!state.lastDeletedTodo) return state;
          
          // Check if it already exists to prevent duplicates
          if (state.todos.some((t) => t.id === state.lastDeletedTodo!.id)) {
            return { lastDeletedTodo: null };
          }
          
          return {
            todos: [...state.todos, state.lastDeletedTodo],
            lastDeletedTodo: null, // Clear after undo
          };
        }),
        
      importData: (todos) => set({ todos }),
      
      resetData: () => set({ todos: [], lastDeletedTodo: null }),
    }),
    {
      name: "studentos-todo-storage",
      storage: createJSONStorage(() => activeStorageAdapter),
    }
  )
);
