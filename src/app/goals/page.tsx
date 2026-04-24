"use client";

import { useState } from "react";
import { Plus, Target, CheckCircle2, Clock } from "lucide-react";
import { GoalCard } from "@/components/goals/GoalCard";
import { GoalForm } from "@/components/goals/GoalForm";
import { useGoals } from "@/hooks/useGoals";
import { useToast } from "@/hooks/useToast";
import type { Goal } from "@/components/goals/GoalCard";

type Tab = "active" | "completed" | "history";

export default function GoalsPage() {
  const { goals, activeGoals, completedGoals, expiredGoals, isLoading, createGoal, updateGoal, deleteGoal } =
    useGoals();
  const { success } = useToast();

  const [tab, setTab] = useState<Tab>("active");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Goal | null>(null);

  const handleCreate = (data: Omit<Goal, "id" | "currentAmount" | "status" | "supporters">) => {
    createGoal(data);
    setShowForm(false);
    success("Goal created!");
  };

  const handleUpdate = (data: Omit<Goal, "id" | "currentAmount" | "status" | "supporters">) => {
    if (!editing) return;
    updateGoal(editing.id, data);
    setEditing(null);
    success("Goal updated!");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this goal?")) return;
    deleteGoal(id);
    success("Goal deleted.");
  };

  const tabGoals: Record<Tab, Goal[]> = {
    active: activeGoals,
    completed: completedGoals,
    history: expiredGoals,
  };

  const displayed = tabGoals[tab];

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: "active", label: "Active", icon: <Target className="h-4 w-4" />, count: activeGoals.length },
    { key: "completed", label: "Completed", icon: <CheckCircle2 className="h-4 w-4" />, count: completedGoals.length },
    { key: "history", label: "History", icon: <Clock className="h-4 w-4" />, count: expiredGoals.length },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Funding Goals</h1>
          <p className="mt-2 text-ink/60">
            Set goals, track progress, and celebrate milestones with your supporters.
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white hover:bg-wave/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Goal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Goals", value: activeGoals.length },
          { label: "Completed", value: completedGoals.length },
          {
            label: "Total Raised",
            value: `${goals.reduce((s, g) => s + g.currentAmount, 0).toLocaleString()} XLM`,
          },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
            <p className="text-sm text-ink/60">{label}</p>
            <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      {/* Create / Edit form */}
      {(showForm || editing) && (
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-ink">
            {editing ? "Edit Goal" : "Create New Goal"}
          </h2>
          <GoalForm
            initial={editing ?? undefined}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-ink/10 bg-ink/5 p-1 w-fit">
        {tabs.map(({ key, label, icon, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === key
                ? "bg-[color:var(--surface)] text-ink shadow-sm"
                : "text-ink/50 hover:text-ink"
            }`}
          >
            {icon}
            {label}
            {count > 0 && (
              <span className="rounded-full bg-wave/10 px-1.5 py-0.5 text-xs text-wave">
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Goal list */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-wave/20 border-t-wave" />
        </div>
      ) : displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/20 py-16 text-center">
          <Target className="h-10 w-10 text-ink/20 mb-3" />
          <p className="text-ink/50 text-sm">
            {tab === "active"
              ? "No active goals yet. Create one to get started!"
              : tab === "completed"
              ? "No completed goals yet. Keep going!"
              : "No expired goals."}
          </p>
          {tab === "active" && (
            <button
              type="button"
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white hover:bg-wave/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Goal
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={(g) => { setEditing(g); setShowForm(false); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
