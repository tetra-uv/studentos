import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { activeStorageAdapter } from "./storageAdapter";
import type { Assignment } from "../types/assignment";

interface AssignmentState {
  assignments: Assignment[];
  addAssignment: (data: Omit<Assignment, "id" | "createdAt" | "updatedAt">) => void;
  updateAssignment: (id: string, updates: Partial<Omit<Assignment, "id">>) => void;
  deleteAssignment: (id: string) => void;
  restoreAssignment: (assignment: Assignment) => void;
  importData: (assignments: Assignment[]) => void;
  resetData: () => void;
}

export const useAssignmentStore = create<AssignmentState>()(
  persist(
    (set) => ({
      assignments: [],
      addAssignment: (data) => {
        const now = Date.now();
        const newAssignment: Assignment = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ assignments: [...state.assignments, newAssignment] }));
      },
      updateAssignment: (id, updates) =>
        set((state) => ({
          assignments: state.assignments.map((a) =>
            a.id === id ? { ...a, ...updates, updatedAt: Date.now() } : a
          ),
        })),
      deleteAssignment: (id) => {
        set((state) => ({
          assignments: state.assignments.filter((a) => a.id !== id),
        }));
      },
      restoreAssignment: (assignment) => {
        set((state) => ({
          assignments: state.assignments.some((a) => a.id === assignment.id)
            ? state.assignments
            : [...state.assignments, assignment],
        }));
      },
      importData: (assignments) => {
        set({ assignments });
      },
      resetData: () => {
        set({ assignments: [] });
      },
    }),
    {
      name: "studentos-assignment-storage",
      storage: createJSONStorage(() => activeStorageAdapter),
    }
  )
);
