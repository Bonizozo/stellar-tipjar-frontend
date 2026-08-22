"use client";

import { useState } from "react";
import type { Goal } from "./GoalCard";

type GoalFormData = Omit<Goal, "id" | "currentAmount" | "status" | "supporters">;

interface GoalFormProps {
  initial?: Partial<GoalFormData>;
  onSubmit: (data: GoalFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const today = new Date().toISOString().split("T")[0];

export function GoalForm({ initial, onSubmit, onCancel, isSubmitting }: GoalFormProps) {
  const [form, setForm] = useState<GoalFormData>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    targetAmount: initial?.targetAmount ?? 0,
    deadline: initial?.deadline ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof GoalFormData, string>>>({});

  const set = <K extends keyof GoalFormData>(key: K, value: GoalFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (form.targetAmount <= 0) next.targetAmount = "Target must be greater than 0.";
    if (!form.deadline) next.deadline = "Deadline is required.";
    else if (form.deadline < today) next.deadline = "Deadline must be in the future.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="goal-title" className="block text-sm font-medium text-ink mb-1">
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="goal-title"
          type="text"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. New recording equipment"
          className="w-full rounded-lg border border-ink/20 bg-[color:var(--surface)] px-4 py-2.5 text-sm text-ink placeholder-ink/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
          aria-describedby={errors.title ? "goal-title-error" : undefined}
        />
        {errors.title && (
          <p id="goal-title-error" className="mt-1 text-xs text-rose-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="goal-desc" className="block text-sm font-medium text-ink mb-1">
          Description
        </label>
        <textarea
          id="goal-desc"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Tell supporters what this goal is for…"
          rows={3}
          className="w-full rounded-lg border border-ink/20 bg-[color:var(--surface)] px-4 py-2.5 text-sm text-ink placeholder-ink/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="goal-amount" className="block text-sm font-medium text-ink mb-1">
            Target (XLM) <span className="text-rose-500">*</span>
          </label>
          <input
            id="goal-amount"
            type="number"
            min={1}
            step="any"
            value={form.targetAmount || ""}
            onChange={(e) => set("targetAmount", parseFloat(e.target.value) || 0)}
            placeholder="1000"
            className="w-full rounded-lg border border-ink/20 bg-[color:var(--surface)] px-4 py-2.5 text-sm text-ink placeholder-ink/40 focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
            aria-describedby={errors.targetAmount ? "goal-amount-error" : undefined}
          />
          {errors.targetAmount && (
            <p id="goal-amount-error" className="mt-1 text-xs text-rose-500">{errors.targetAmount}</p>
          )}
        </div>

        <div>
          <label htmlFor="goal-deadline" className="block text-sm font-medium text-ink mb-1">
            Deadline <span className="text-rose-500">*</span>
          </label>
          <input
            id="goal-deadline"
            type="date"
            min={today}
            value={form.deadline}
            onChange={(e) => set("deadline", e.target.value)}
            className="w-full rounded-lg border border-ink/20 bg-[color:var(--surface)] px-4 py-2.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
            aria-describedby={errors.deadline ? "goal-deadline-error" : undefined}
          />
          {errors.deadline && (
            <p id="goal-deadline-error" className="mt-1 text-xs text-rose-500">{errors.deadline}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-ink/60 hover:bg-ink/5 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-wave px-5 py-2 text-sm font-medium text-white hover:bg-wave/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Saving…" : initial?.title ? "Save Changes" : "Create Goal"}
        </button>
      </div>
    </form>
  );
}
