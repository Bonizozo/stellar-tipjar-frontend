"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TeamInvite } from "@/components/TeamInvite";
import { TeamMembers } from "@/components/TeamMembers";
import { RevenueSplit } from "@/components/RevenueSplit";
import { TeamStatisticsCard } from "@/components/TeamStatistics";
import { useTeam } from "@/hooks/useTeam";
import { Button } from "@/components/Button";
import { SectionCard } from "@/components/SectionCard";
import { Spinner } from "@/components/Spinner";
import {
  PlusIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface TeamPageProps {
  params: { teamname: string };
}

export default function TeamPage({ params }: TeamPageProps) {
  const { teamname } = params;
  const {
    team,
    stats,
    isLoading,
    createTeam,
    addMember,
    removeMember,
    updateSplit,
    inviteMember,
    cancelInvitation,
    pendingInvitations,
  } = useTeam(teamname);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [split, setSplit] = useState(50);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize team on first load
  if (!team.displayName && !isLoading) {
    createTeam(teamname, `Team ${teamname}`);
  }

  const handleAddMember = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);

    if (!name.trim()) {
      setFormMessage({ type: "error", text: "Please enter a member name" });
      return;
    }

    if (split <= 0) {
      setFormMessage({ type: "error", text: "Split must be greater than 0" });
      return;
    }

    setIsSubmitting(true);
    try {
      addMember({ name: name.trim(), email: email.trim() || undefined, split });
      setFormMessage({ type: "success", text: `Added ${name} to the team` });
      setName("");
      setEmail("");
      setSplit(50);
      setShowAddForm(false);

      // Auto-clear success message
      setTimeout(() => setFormMessage(null), 3000);
    } catch (err) {
      setFormMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to add member",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 pb-12"
    >
      {/* Header Navigation */}
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <Link href="/explore">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-ink/10 transition text-ink/70 hover:text-ink">
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </button>
        </Link>
        <nav className="flex items-center gap-2 text-xs text-ink/60">
          <span>Teams</span>
          <span>/</span>
          <span className="text-ink font-medium">{teamname}</span>
        </nav>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        variants={itemVariants}
        className="relative min-h-[300px] rounded-3xl border border-ink/10 bg-gradient-to-br from-wave/5 via-transparent to-sunrise/5 overflow-hidden shadow-card"
      >
        <div className="absolute inset-0 soft-grid opacity-50" aria-hidden="true" />

        <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between p-8 md:p-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-wave/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-wave mb-4 md:inline-flex">
              <UserGroupIcon className="h-4 w-4" />
              Team Collaboration
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-3">
              {team.displayName || `Team ${teamname}`}
            </h1>

            {team.description && (
              <p className="text-lg text-ink/70 mb-6 max-w-2xl">{team.description}</p>
            )}

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-sm text-ink/60">Members:</span>
                <span className="text-lg font-bold text-ink">{stats.activeMemberCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-ink/60">Split Status:</span>
                <span className={`text-lg font-bold ${stats.isBalanced ? "text-moss" : "text-warning"}`}>
                  {stats.isBalanced ? "✓ Balanced" : "⚠ Incomplete"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8 md:mb-0 md:ml-8">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-wave/20 to-sunrise/20 ring-4 ring-ink/5">
              <UserGroupIcon className="h-12 w-12 text-wave" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SectionCard
          title="Active Members"
          description={`${stats.activeMemberCount} of ${stats.memberCount}`}
          icon={<span className="text-2xl">👥</span>}
        />
        <SectionCard
          title="Split Allocation"
          description={`${stats.totalSplit}% / 100%`}
          icon={<span className="text-2xl">📊</span>}
        />
        <SectionCard
          title="Average Split"
          description={`${stats.averageSplit.toFixed(1)}% per member`}
          icon={<span className="text-2xl">⚖️</span>}
        />
        <SectionCard
          title="Total Tips"
          description={`${stats.totalTipsReceived} XLM`}
          icon={<span className="text-2xl">💰</span>}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Forms and Management */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Add Member Section */}
          <div className="rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-ink">Add Team Member</h3>
              {showAddForm && (
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-ink/60 hover:text-ink transition"
                >
                  ✕ Close
                </button>
              )}
            </div>

            {showAddForm ? (
              <form onSubmit={handleAddMember} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Member name"
                    disabled={isSubmitting}
                    className="rounded-lg border border-ink/20 px-4 py-2.5 text-sm focus:border-wave focus:outline-none disabled:opacity-50"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email (optional)"
                    disabled={isSubmitting}
                    className="rounded-lg border border-ink/20 px-4 py-2.5 text-sm focus:border-wave focus:outline-none disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Revenue Split: {split}%</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={split}
                    onChange={(e) => setSplit(Number(e.target.value))}
                    disabled={isSubmitting}
                    className="w-full h-2 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-wave disabled:opacity-50"
                  />
                </div>

                {formMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
                      formMessage.type === "success"
                        ? "bg-moss/10 text-moss"
                        : "bg-error/10 text-error"
                    }`}
                  >
                    {formMessage.type === "success" ? (
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
                    )}
                    <p>{formMessage.text}</p>
                  </motion.div>
                )}

                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? <Spinner size="sm" /> : <>Add Member</>}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowAddForm(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <Button
                onClick={() => setShowAddForm(true)}
                className="w-full flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Add Member
              </Button>
            )}
          </div>

          {/* Team Members */}
          {team.members.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className="mb-4 text-lg font-semibold text-ink">Team Members</h3>
              <TeamMembers
                members={team.members}
                onRemove={removeMember}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {/* Revenue Split Configuration */}
          <motion.div variants={itemVariants}>
            <RevenueSplit
              members={team.members}
              onUpdateSplit={updateSplit}
              totalSplit={stats.totalSplit}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        {/* Right Column - Statistics and Invitations */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Team Statistics */}
          <TeamStatisticsCard stats={stats} teamName={teamname} isLoading={isLoading} />

          {/* Team Invitations */}
          <motion.div variants={itemVariants}>
            <TeamInvite
              onInvite={inviteMember}
              pendingInvitations={pendingInvitations}
              onCancelInvitation={cancelInvitation}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Info */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 text-center"
      >
        <p className="text-sm text-ink/60">
          Team created: {new Date(team.createdAt).toLocaleDateString()} • Last updated:{" "}
          {new Date(team.updatedAt).toLocaleDateString()}
        </p>
      </motion.div>
    </motion.div>
  );
}
