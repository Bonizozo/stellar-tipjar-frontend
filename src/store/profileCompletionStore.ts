/**
 * Profile completion tracking store.
 *
 * Tracks which profile fields are filled and calculates completion percentage.
 * Dismissable items allow creators to hide completed sections.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ProfileField {
  id: string;
  label: string;
  description: string;
  link: string;
  filled: boolean;
  importance: "high" | "medium" | "low";
}

interface ProfileCompletionState {
  dismissedItems: Set<string>;
  fields: ProfileField[];

  setFields: (fields: ProfileField[]) => void;
  dismissItem: (itemId: string) => void;
  restoreItem: (itemId: string) => void;
  getCompletionPercentage: () => number;
  getIncompleteFields: () => ProfileField[];
  hasDismissedAll: () => boolean;
}

const defaultFields: ProfileField[] = [
  {
    id: "avatar",
    label: "Profile Avatar",
    description: "Add a profile picture to make your profile memorable",
    link: "/profile#avatar",
    filled: false,
    importance: "high",
  },
  {
    id: "bio",
    label: "Bio",
    description: "Write a short bio to help supporters understand what you do",
    link: "/profile#bio",
    filled: false,
    importance: "high",
  },
  {
    id: "displayName",
    label: "Display Name",
    description: "Set a professional display name for your profile",
    link: "/profile#displayName",
    filled: false,
    importance: "high",
  },
  {
    id: "tags",
    label: "Tags & Categories",
    description:
      "Add tags to improve discoverability and help supporters find you",
    link: "/profile#tags",
    filled: false,
    importance: "medium",
  },
  {
    id: "website",
    label: "Website or Portfolio",
    description: "Link to your personal website or portfolio",
    link: "/profile#website",
    filled: false,
    importance: "medium",
  },
  {
    id: "social",
    label: "Social Links",
    description: "Connect your social media profiles",
    link: "/profile#social",
    filled: false,
    importance: "low",
  },
];

export const useProfileCompletionStore = create<ProfileCompletionState>()(
  persist(
    (set, get) => ({
      dismissedItems: new Set<string>(),
      fields: defaultFields,

      setFields: (fields) => set({ fields }),

      dismissItem: (itemId) =>
        set((state) => ({
          dismissedItems: new Set([...state.dismissedItems, itemId]),
        })),

      restoreItem: (itemId) =>
        set((state) => {
          const updated = new Set(state.dismissedItems);
          updated.delete(itemId);
          return { dismissedItems: updated };
        }),

      getCompletionPercentage: () => {
        const state = get();
        const filledCount = state.fields.filter((f) => f.filled).length;
        return Math.round((filledCount / state.fields.length) * 100);
      },

      getIncompleteFields: () => {
        const state = get();
        return state.fields
          .filter((f) => !f.filled)
          .filter((f) => !state.dismissedItems.has(f.id))
          .sort((a, b) => {
            const importanceOrder = { high: 0, medium: 1, low: 2 };
            return (
              importanceOrder[a.importance] - importanceOrder[b.importance]
            );
          });
      },

      hasDismissedAll: () => {
        const state = get();
        const incompleteFields = state.fields.filter((f) => !f.filled);
        return incompleteFields.every((f) => state.dismissedItems.has(f.id));
      },
    }),
    {
      name: "profile-completion-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        dismissedItems: Array.from(state.dismissedItems),
      }),
    },
  ),
);

// ── Selectors ─────────────────────────────────────────────────────────────────

export const useCompletionPercentage = () =>
  useProfileCompletionStore((s) => s.getCompletionPercentage());

export const useIncompleteFields = () =>
  useProfileCompletionStore((s) => s.getIncompleteFields());

export const useProfileFields = () =>
  useProfileCompletionStore((s) => s.fields);

export const useHasProfileDismissedAll = () =>
  useProfileCompletionStore((s) => s.hasDismissedAll());
