/**
 * User session store (#221).
 *
 * Persists the authenticated user across page loads.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createZustandStorage } from "@/lib/storage";

// SECURITY: Only display / profile fields are persisted here.
// No passwords, session tokens, or auth credentials are stored.
// `email` is PII used for display only — not a credential.
// If a server-side auth layer is added, any session/auth token MUST live in
// an httpOnly cookie so JavaScript (including XSS payloads) cannot read it.
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
      storage: createJSONStorage(() => createZustandStorage('store', 'user-storage')),
    },
  ),
);

// ── Selectors ─────────────────────────────────────────────────────────────────

export const useCurrentUser = () => useUserStore((s) => s.user);
export const useIsAuthenticated = () => useUserStore((s) => s.isAuthenticated);
export const useUserRole = () => useUserStore((s) => s.user?.role);
