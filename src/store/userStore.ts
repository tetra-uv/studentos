import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { activeStorageAdapter } from "./storageAdapter";
import type { UserProfile } from "../lib/domain/models/user";

interface Workspace {
  id: string;
  name: string;
  icon?: string;
}

interface UserState {
  profile: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  clearProfile: () => void;
  activeWorkspaceId: string;
  workspaces: Workspace[];
  setActiveWorkspace: (id: string) => void;
}

const DEFAULT_GUEST_PROFILE: UserProfile = {
  id: "guest",
  name: "Guest",
  subtitle: "Built by students",
  avatarColor: "violet",
  isGuest: true,
};

const DEFAULT_WORKSPACES: Workspace[] = [
  { id: "ws-personal", name: "StudentOS Personal", icon: "🏠" },
  { id: "ws-ml", name: "AI & ML Semester", icon: "🤖" },
  { id: "ws-year2", name: "Second Year", icon: "📚" },
];

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: DEFAULT_GUEST_PROFILE,
      activeWorkspaceId: "ws-personal",
      workspaces: DEFAULT_WORKSPACES,
      setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, ...updates }
            : { ...DEFAULT_GUEST_PROFILE, ...updates },
        })),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "studentos-user-storage",
      storage: createJSONStorage(() => activeStorageAdapter),
    }
  )
);
