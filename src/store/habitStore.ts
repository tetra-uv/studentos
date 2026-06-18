import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { activeStorageAdapter } from "./storageAdapter";
import type { Habit } from "../types/habit";
import { getTodayString, getYesterdayString } from "../utils/habits";

interface HabitState {
  habits: Habit[];
  addHabit: (data: Omit<Habit, "id" | "createdAt" | "updatedAt" | "completionLog">) => void;
  updateHabit: (id: string, updates: Partial<Omit<Habit, "id" | "completionLog">>) => void;
  deleteHabit: (id: string) => void;
  restoreHabit: (habit: Habit) => void;
  toggleCompletion: (id: string, dateStr: string) => void;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: [],
      addHabit: (data) => {
        const now = Date.now();
        const newHabit: Habit = {
          ...data,
          id: crypto.randomUUID(),
          completionLog: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ habits: [...state.habits, newHabit] }));
      },
      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, ...updates, updatedAt: Date.now() } : h
          ),
        }));
      },
      deleteHabit: (id) => {
        set((state) => ({ habits: state.habits.filter((h) => h.id !== id) }));
      },
      restoreHabit: (habit) => {
        set((state) => ({
          habits: state.habits.some((h) => h.id === habit.id)
            ? state.habits
            : [...state.habits, habit],
        }));
      },
      toggleCompletion: (id, dateStr) => {
        // Guard: only allow today or yesterday
        const allowed = [getTodayString(), getYesterdayString()];
        if (!allowed.includes(dateStr)) return;

        set((state) => ({
          habits: state.habits.map((h) => {
            if (h.id !== id) return h;
            const hasDate = h.completionLog.includes(dateStr);
            return {
              ...h,
              completionLog: hasDate
                ? h.completionLog.filter((d) => d !== dateStr)
                : [...h.completionLog, dateStr],
              updatedAt: Date.now(),
            };
          }),
        }));
      },
    }),
    { 
      name: "studentos-habit-storage",
      storage: createJSONStorage(() => activeStorageAdapter)
    }
  )
);
