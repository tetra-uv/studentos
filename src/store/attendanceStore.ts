import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { activeStorageAdapter } from "./storageAdapter";
import type { Subject } from "../types/subject";

interface AttendanceState {
  subjects: Subject[];
  addSubject: (subject: Omit<Subject, "id" | "createdAt" | "updatedAt">) => void;
  updateSubject: (id: string, updates: Partial<Omit<Subject, "id">>) => void;
  deleteSubject: (id: string) => void;
  importData: (subjects: Subject[]) => void;
  resetData: () => void;
  restoreSubject: (subject: Subject) => void;
}

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => ({
      subjects: [],
      addSubject: (subjectData) => {
        const now = Date.now();
        const newSubject: Subject = {
          ...subjectData,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ subjects: [...state.subjects, newSubject] }));
      },
      updateSubject: (id, updates) => {
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s
          ),
        }));
      },
      deleteSubject: (id) => {
        set((state) => ({
          subjects: state.subjects.filter((s) => s.id !== id),
        }));
      },
      importData: (subjects) => {
        set({ subjects });
      },
      resetData: () => {
        set({ subjects: [] });
      },
      restoreSubject: (subject) => {
        set((state) => ({
          // Ensure we don't duplicate if restore is called twice
          subjects: state.subjects.some(s => s.id === subject.id) 
            ? state.subjects 
            : [...state.subjects, subject],
        }));
      },
    }),
    {
      name: "studentos-attendance-storage",
      storage: createJSONStorage(() => activeStorageAdapter),
    }
  )
);
