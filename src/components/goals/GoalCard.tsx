"use client";

import { useState } from "react";
import { CheckCircle, Clock, Share2, Pencil, Trash2 } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { useToast } from "@/hooks/useToast";
import { getShareUrl } from "@/utils/shareUtils";

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: "active" | "completed" | "expired";
  supporters?: { address: string; amount: number }[];
}

interface GoalCardProps {
  goal: Goal;
  onEdit?: (goal: Goal) => void;
  onDelete?: (id: string) => void;
}

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const { success, error } = useToast();
  const [celebrating, setCelebrating] = useState(goal.status === "completed");

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const daysLeft = Math.ceil(
    (new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Help me reach my goal: ${goal.title} — ${goal.currentAmount}/${goal.targetAmount} XLM raised!`;
    try {
      if (navigator.share) {
        await navigator.share({ title: goal.title, text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        success("Goal link copied to clipboard!");
      }
    } catch {
      error("Failed to share goal.");
    }
  };

  return (
    <div className="relative rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card transition-shadow hover:shadow-lg">
      {/* Celebration overlay */}
      {celebrating && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-emerald-500/10 backdrop-blur-sm"
          onClick={() => setCelebrating(false)}
        >
          <CheckCircle className="h-14 w-14 text-emerald-400 animate-bounce" />
          <p className="text-lg font-bold text-emerald-600">🎉 Goal Completed!</p>
          <p className="text-xs text-ink/60">Tap to dismiss</p>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-ink">{goal.title}</h3>
          {goal.description && (
            <p className="mt-1 text-sm text-ink/60 line-clamp-2">{goal.description}</p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            goal.status === "completed"
              ? "bg-emerald-100 text-emerald-700"
              : goal.status === "expired"
              ? "bg-rose-100 text-rose-700"
              : "bg-wave/10 text-wave"
          }`}
        >
          {goal.status}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm text-ink/70">
          <span className="font-mono">{goal.currentAmount.toLocaleString()} XLM raised</span>
          <span className="font-mono">{goal.targetAmount.toLocaleString()} XLM goal</span>
        </div>
        <ProgressBar progress={progress} />
        <div className="flex items-center justify-between text-xs text-ink/50">
          <span>{Math.min(progress, 100).toFixed(1)}% complete</span>
          {goal.status === "active" && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {daysLeft > 0 ? `${daysLeft}d left` : "Deadline passed"}
            </span>
          )}
        </div>
      </div>

      {goal.supporters && goal.supporters.length > 0 && (
        <p className="mt-3 text-xs text-ink/50">
          {goal.supporters.length} supporter{goal.supporters.length !== 1 ? "s" : ""}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2 border-t border-ink/5 pt-4">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink/60 hover:bg-ink/5 hover:text-ink transition-colors"
          aria-label="Share goal"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(goal)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink/60 hover:bg-ink/5 hover:text-ink transition-colors"
            aria-label="Edit goal"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(goal.id)}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-500/70 hover:bg-rose-50 hover:text-rose-600 transition-colors"
            aria-label="Delete goal"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
