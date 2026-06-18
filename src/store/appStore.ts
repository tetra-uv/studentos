import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { activeStorageAdapter } from "./storageAdapter";

export type Theme = "light" | "dark" | "system";

export interface AppSettings {
  theme: Theme;
  compactMode: boolean;
  animationsEnabled: boolean;
}

interface AppState {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: {
        theme: "system",
        compactMode: false,
        animationsEnabled: true,
      },
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),
    }),
    { 
      name: "studentos-app-storage",
      storage: createJSONStorage(() => activeStorageAdapter)
    }
  )
);
