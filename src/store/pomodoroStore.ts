import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { activeStorageAdapter } from "./storageAdapter";
import type { PomodoroSession } from "../types/pomodoroSession";
import type { PomodoroSettings } from "../types/pomodoroSettings";
import { DEFAULT_POMODORO_SETTINGS } from "../types/pomodoroSettings";
import { PomodoroMode } from "../types/pomodoroMode";

interface PomodoroState {
  sessions: PomodoroSession[];
  settings: PomodoroSettings;
  addSession: (mode: PomodoroMode, durationMinutes: number) => void;
  clearHistory: () => void;
  updateSettings: (updates: Partial<PomodoroSettings>) => void;
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set) => ({
      sessions: [],
      settings: DEFAULT_POMODORO_SETTINGS,
      addSession: (mode, durationMinutes) => {
        const session: PomodoroSession = {
          id: crypto.randomUUID(),
          mode,
          durationMinutes,
          completedAt: Date.now(),
        };
        set((state) => ({
          sessions: [session, ...state.sessions].slice(0, 100), // cap history
        }));
      },
      clearHistory: () => set({ sessions: [] }),
      updateSettings: (updates) =>
        set((state) => ({ settings: { ...state.settings, ...updates } })),
    }),
    { 
      name: "studentos-pomodoro-storage",
      storage: createJSONStorage(() => activeStorageAdapter)
    }
  )
);
