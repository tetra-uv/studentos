import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { activeStorageAdapter } from "./storageAdapter";
import type { Subject } from "../types/subject";

export interface AttendanceRecord {
  courseId: string;
  totalClasses: number;
  attendedClasses: number;
  targetAttendance?: number;
}

interface AttendanceState {
  subjects: Subject[]; // Legacy fallback
  records: AttendanceRecord[]; // New course-centric records
  isMigratedToCourses: boolean;
  
  // Legacy actions
  addSubject: (subject: Omit<Subject, "id" | "createdAt" | "updatedAt">) => void;
  updateSubject: (id: string, updates: Partial<Omit<Subject, "id">>) => void;
  deleteSubject: (id: string) => void;
  importData: (subjects: Subject[]) => void;
  resetData: () => void;
  restoreSubject: (subject: Subject) => void;
  
  // New actions
  addRecord: (record: AttendanceRecord) => void;
  updateRecord: (courseId: string, updates: Partial<AttendanceRecord>) => void;
  deleteRecord: (courseId: string) => void;
  setMigrated: (status: boolean) => void;
}

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => ({
      subjects: [],
      records: [],
      isMigratedToCourses: false,

      // --- Legacy Subject Actions ---
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
      restoreSubject: (subject) => {
        set((state) => ({
          subjects: state.subjects.some(s => s.id === subject.id) 
            ? state.subjects 
            : [...state.subjects, subject],
        }));
      },

      // --- New Record Actions ---
      addRecord: (record) => {
        set((state) => ({ records: [...state.records, record] }));
      },
      updateRecord: (courseId, updates) => {
        set((state) => ({
          records: state.records.map((r) =>
            r.courseId === courseId ? { ...r, ...updates } : r
          ),
        }));
      },
      deleteRecord: (courseId) => {
        set((state) => ({
          records: state.records.filter((r) => r.courseId !== courseId),
        }));
      },
      
      setMigrated: (status) => set({ isMigratedToCourses: status }),

      importData: (subjects) => {
        set({ subjects });
      },
      resetData: () => {
        set({ subjects: [], records: [] });
      },
    }),
    {
      name: "studentos-attendance-storage",
      storage: createJSONStorage(() => activeStorageAdapter),
    }
  )
);
