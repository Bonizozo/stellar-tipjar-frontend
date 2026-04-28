/**
 * Tips data store with optimistic updates (#221).
 *
 * Optimistic updates allow the UI to show the tip immediately while the
 * Stellar transaction is pending. If the transaction fails, the optimistic
 * entry is removed so the UI stays consistent with on-chain state.
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Tip {
  id: string;
  creatorUsername: string;
  amount: string;
  transactionHash: string;
  message?: string;
  createdAt: string;
  /** True while the on-chain transaction is pending. */
  pending?: boolean;
}

interface TipsState {
  tips: Tip[];
  loading: boolean;
  error: string | null;

  fetchTips: (username: string) => Promise<void>;
  addTip: (tip: Tip) => void;
  /** Returns a temporary ID for the optimistic entry. */
  addTipOptimistic: (tip: Omit<Tip, "id" | "createdAt" | "pending">) => string;
  /** Replace the temporary entry with the confirmed on-chain data. */
  confirmTip: (tempId: string, tip: Tip) => void;
  removeTip: (id: string) => void;
  clearTips: () => void;
}

export const useTipsStore = create<TipsState>()(
  devtools(
    (set) => ({
      tips: [],
      loading: false,
      error: null,

      fetchTips: async (username) => {
        set({ loading: true, error: null }, false, "tips/fetchStart");
        try {
          const res = await fetch(`/api/creators/${username}/tips`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data: Tip[] = await res.json();
          set({ tips: data, loading: false }, false, "tips/fetchSuccess");
        } catch (err) {
          set(
            {
              error: err instanceof Error ? err.message : "Failed to fetch tips",
              loading: false,
            },
            false,
            "tips/fetchError",
          );
        }
      },

      addTip: (tip) =>
        set(
          (state) => ({ tips: [tip, ...state.tips] }),
          false,
          "tips/add",
        ),

      addTipOptimistic: (tip) => {
        const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const optimistic: Tip = {
          ...tip,
          id: tempId,
          createdAt: new Date().toISOString(),
          pending: true,
        };
        set(
          (state) => ({ tips: [optimistic, ...state.tips] }),
          false,
          "tips/addOptimistic",
        );
        return tempId;
      },

      confirmTip: (tempId, tip) =>
        set(
          (state) => ({
            tips: state.tips.map((t) => (t.id === tempId ? tip : t)),
          }),
          false,
          "tips/confirm",
        ),

      removeTip: (id) =>
        set(
          (state) => ({ tips: state.tips.filter((t) => t.id !== id) }),
          false,
          "tips/remove",
        ),

      clearTips: () =>
        set({ tips: [], error: null }, false, "tips/clear"),
    }),
    { name: "TipsStore" },
  ),
);

// ── Selectors ─────────────────────────────────────────────────────────────────

export const useTips = () => useTipsStore((s) => s.tips);
export const useTipsLoading = () => useTipsStore((s) => s.loading);
export const useTipsError = () => useTipsStore((s) => s.error);
export const usePendingTips = () =>
  useTipsStore((s) => s.tips.filter((t) => t.pending));
