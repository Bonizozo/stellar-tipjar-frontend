/**
 * User session store (#221).
 *
 * Persists the authenticated user across page loads.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string;
  username: string;
  displayName?: string;
  email?: string;
  role: "creator" | "supporter";
  avatarUrl?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  updateUser: (patch: Partial<User>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({ user, isAuthenticated: true }),

      updateUser: (patch) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...patch } });
      },

      logout: () =>
        set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// ── Selectors ─────────────────────────────────────────────────────────────────

export const useCurrentUser = () => useUserStore((s) => s.user);
export const useIsAuthenticated = () => useUserStore((s) => s.isAuthenticated);
export const useUserRole = () => useUserStore((s) => s.user?.role);
