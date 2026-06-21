import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { activeStorageAdapter } from "./storageAdapter";
import type { Course } from "../types/course";

interface CourseState {
  courses: Course[];
  lastDeletedCourse: Course | null;
  addCourse: (course: Omit<Course, "id" | "createdAt" | "updatedAt"> & { id?: string }) => void;
  updateCourse: (id: string, updates: Partial<Omit<Course, "id">>) => void;
  deleteCourse: (id: string) => void;
  undoDelete: () => void;
  importData: (courses: Course[]) => void;
  resetData: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      courses: [],
      lastDeletedCourse: null,

      addCourse: (courseData) => {
        const now = Date.now();
        const newCourse: Course = {
          ...courseData,
          id: courseData.id || crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ courses: [...state.courses, newCourse] }));
      },

      updateCourse: (id, updates) => {
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
          ),
        }));
      },

      deleteCourse: (id) => {
        set((state) => {
          const courseToDelete = state.courses.find((c) => c.id === id);
          if (!courseToDelete) return state;
          
          return {
            courses: state.courses.filter((c) => c.id !== id),
            lastDeletedCourse: courseToDelete,
          };
        });
      },

      undoDelete: () => {
        set((state) => {
          if (!state.lastDeletedCourse) return state;
          
          if (state.courses.some((c) => c.id === state.lastDeletedCourse!.id)) {
            return { lastDeletedCourse: null };
          }
          
          return {
            courses: [...state.courses, state.lastDeletedCourse],
            lastDeletedCourse: null,
          };
        });
      },

      importData: (courses) => {
        set({ courses });
      },

      resetData: () => {
        set({ courses: [], lastDeletedCourse: null });
      },
    }),
    {
      name: "studentos-course-storage",
      storage: createJSONStorage(() => activeStorageAdapter),
    }
  )
);
