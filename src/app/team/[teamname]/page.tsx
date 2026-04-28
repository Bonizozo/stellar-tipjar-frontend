"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TeamInvite } from "@/components/TeamInvite";
import { TeamMembers } from "@/components/TeamMembers";
import { RevenueSplit } from "@/components/RevenueSplit";
import { TeamStatisticsCard } from "@/components/TeamStatistics";
import { TeamEarnings } from "@/components/TeamEarnings";
import { TeamRoleManager } from "@/components/TeamRoleManager";
import { useTeam, TeamRole, TEAM_ROLE_LABELS } from "@/hooks/useTeam";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Spinner } from "@/components/Spinner/index";
import {
  PlusIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface TeamPageProps {
  params: { teamname: string };
}

type ActiveTab = "members" | "splits" | "roles" | "earnings" | "invitations";

const TABS: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "members",
    label: "Members",
    icon: <UserGroupIcon className="h-4 w-4" />,
  },
  {
    id: "splits",
    label: "Revenue Split",
    icon: <ChartBarIcon className="h-4 w-4" />,
  },
  {
    id: "roles",
    label: "Roles",
    icon: <ShieldCheckIcon className="h-4 w-4" />,
  },
  {
    id: "earnings",
    label: "Earnings",
    icon: <CurrencyDollarIcon className="h-4 w-4" />,
  },
  {
    id: "invitations",
    label: "Invitations",
    icon: <EnvelopeIcon className="h-4 w-4" />,
  },
];

export default function TeamPage({ params }: TeamPageProps) {
  const { teamname } = params;
  const {
    team,
    stats,
    isLoading,
    createTeam,
    addMember,
    removeMember,
    updateMember,
    updateSplit,
    updateRole,
    inviteMember,
    cancelInvitation,
    pendingInvitations,
  } = useTeam(teamname);

  const [activeTab, setActiveTab] = useState<ActiveTab>("members");
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [split, setSplit] = useState(0);
  const [role, setRole] = useState<TeamRole>("member");
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize team on first load
  if (!team.displayName && !isLoading) {
    createTeam(teamname, `Team ${teamname}`);
  }

  const handleAddMember = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);

    if (!name.trim()) {
      setFormMessage({ type: "error", text: "Please enter a member name." });
      return;
    }
    if (split < 0 || split > 100) {
      setFormMessage({
        type: "error",
        text: "Split must be between 0 and 100.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      addMember({
        name: name.trim(),
        email: email.trim() || undefined,
        walletAddress: walletAddress.trim() || undefined,
        split,
        role,
      });
      setFormMessage({
        type: "success",
        text: `${name.trim()} added to the team.`,
      });
      setName("");
      setEmail("");
      setWalletAddress("");
      setSplit(0);
      setRole("member");
      setShowAddForm(false);
      setTimeout(() => setFormMessage(null), 3000);
    } catch (err) {
      setFormMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to add member.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
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
      className="space-y-8 pb-16"
    >
      {/* Breadcrumb */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <Link href="/explore">
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-ink/70 transition hover:bg-ink/10 hover:text-ink">
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </button>
        </Link>
        <nav
          className="flex items-center gap-2 text-xs text-ink/50"
          aria-label="Breadcrumb"
        >
          <span>Teams</span>
          <span>/</span>
          <span className="font-medium text-ink">{teamname}</span>
        </nav>
      </motion.div>

      {/* Hero */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-wave/5 via-transparent to-sunrise/5 shadow-card"
      >
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(15,108,123,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,120,90,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col-reverse items-center justify-between gap-6 p-8 md:flex-row md:p-12">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-wave/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-wave">
              <UserGroupIcon className="h-4 w-4" />
              Team Management
            </div>

            <h1 className="mb-2 text-4xl font-bold text-ink md:text-5xl">
              {team.displayName || `Team ${teamname}`}
            </h1>

            {team.description && (
              <p className="mb-4 max-w-xl text-ink/70">{team.description}</p>
            )}

            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <Badge color="neutral" style="soft">
                {stats.activeMemberCount} active member
                {stats.activeMemberCount !== 1 ? "s" : ""}
              </Badge>
              <Badge
                color={stats.isBalanced ? "success" : "warning"}
                style="soft"
              >
                {stats.isBalanced
                  ? "✓ Split balanced"
                  : `${stats.totalSplit}% / 100% allocated`}
              </Badge>
              {stats.totalTipsReceived > 0 && (
                <Badge color="primary" style="soft">
                  {stats.totalTipsReceived.toLocaleString()} XLM earned
                </Badge>
              )}
            </div>
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-wave/20 to-sunrise/20 ring-4 ring-ink/5">
            <UserGroupIcon className="h-12 w-12 text-wave" />
          </div>
        </div>
      </motion.div>

      {/* Quick stats row */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {[
          {
            label: "Active Members",
            value: stats.activeMemberCount,
            sub: `${stats.memberCount} total`,
            color: "text-wave",
          },
          {
            label: "Split Allocated",
            value: `${stats.totalSplit}%`,
            sub: stats.isBalanced
              ? "Balanced ✓"
              : `${100 - stats.totalSplit}% remaining`,
            color: stats.isBalanced ? "text-moss" : "text-amber-500",
          },
          {
            label: "Avg. Split",
            value: `${stats.averageSplit.toFixed(1)}%`,
            sub: "per active member",
            color: "text-ink",
          },
          {
            label: "Total Earned",
            value: `${stats.totalTipsReceived.toLocaleString()}`,
            sub: "XLM",
            color: "text-sunrise",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 shadow-sm"
          >
            <p className="text-xs font-medium text-ink/60">{stat.label}</p>
            <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs text-ink/50">{stat.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Add Member Form */}
      <motion.div
        variants={itemVariants}
        className="rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Add Team Member</h2>
          {showAddForm && (
            <button
              onClick={() => {
                setShowAddForm(false);
                setFormMessage(null);
              }}
              className="text-sm text-ink/50 transition hover:text-ink"
            >
              ✕ Close
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {showAddForm ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddMember}
              className="mt-4 space-y-4 overflow-hidden"
            >
              {/* Row 1: Name + Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-ink"
                    htmlFor="member-name"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="member-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alice Smith"
                    disabled={isSubmitting}
                    required
                    className="w-full rounded-lg border border-ink/20 px-4 py-2.5 text-sm placeholder:text-ink/40 focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave/20 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-ink"
                    htmlFor="member-email"
                  >
                    Email <span className="text-ink/40">(optional)</span>
                  </label>
                  <input
                    id="member-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alice@example.com"
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-ink/20 px-4 py-2.5 text-sm placeholder:text-ink/40 focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave/20 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Row 2: Wallet + Role */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-ink"
                    htmlFor="member-wallet"
                  >
                    Stellar Wallet{" "}
                    <span className="text-ink/40">(optional)</span>
                  </label>
                  <input
                    id="member-wallet"
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="G..."
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-ink/20 px-4 py-2.5 font-mono text-xs placeholder:font-sans placeholder:text-ink/40 focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave/20 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-ink"
                    htmlFor="member-role"
                  >
                    Role
                  </label>
                  <div className="relative">
                    <select
                      id="member-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value as TeamRole)}
                      disabled={isSubmitting}
                      className="w-full appearance-none rounded-lg border border-ink/20 px-4 py-2.5 pr-10 text-sm focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave/20 disabled:opacity-50"
                    >
                      {(Object.keys(TEAM_ROLE_LABELS) as TeamRole[]).map(
                        (r) => (
                          <option key={r} value={r}>
                            {TEAM_ROLE_LABELS[r]}
                          </option>
                        ),
                      )}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                  </div>
                </div>
              </div>

              {/* Split slider */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    className="text-sm font-medium text-ink"
                    htmlFor="member-split"
                  >
                    Revenue Split
                  </label>
                  <span className="text-sm font-bold text-wave">{split}%</span>
                </div>
                <input
                  id="member-split"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={split}
                  onChange={(e) => setSplit(Number(e.target.value))}
                  disabled={isSubmitting}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-ink/10 accent-wave disabled:opacity-50"
                />
                <div className="mt-1 flex justify-between text-xs text-ink/40">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                {stats.totalSplit + split > 100 && (
                  <p className="mt-1 text-xs text-amber-500">
                    ⚠ Total split will exceed 100% ({stats.totalSplit + split}%)
                  </p>
                )}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {formMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
                      formMessage.type === "success"
                        ? "bg-moss/10 text-moss"
                        : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                    }`}
                  >
                    {formMessage.type === "success" ? (
                      <CheckCircleIcon className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
                    )}
                    {formMessage.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? <Spinner size="sm" inline /> : "Add Member"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormMessage(null);
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              <Button
                onClick={() => setShowAddForm(true)}
                className="flex w-full items-center justify-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Add Member
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tabbed management area */}
      <motion.div variants={itemVariants} className="space-y-4">
        {/* Tab bar */}
        <div
          className="flex gap-1 overflow-x-auto rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-1.5"
          role="tablist"
          aria-label="Team management sections"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-wave text-white shadow-sm"
                  : "text-ink/60 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-label={TABS.find((t) => t.id === activeTab)?.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "members" && (
              <TeamMembers
                members={team.members}
                onRemove={removeMember}
                onEdit={(id, updates) => updateMember(id, updates)}
                isLoading={isLoading}
              />
            )}

            {activeTab === "splits" && (
              <RevenueSplit
                members={team.members}
                onUpdateSplit={updateSplit}
                totalSplit={stats.totalSplit}
                isLoading={isLoading}
              />
            )}

            {activeTab === "roles" && (
              <TeamRoleManager
                members={team.members}
                onUpdateRole={updateRole}
                isLoading={isLoading}
              />
            )}

            {activeTab === "earnings" && (
              <TeamEarnings members={team.members} stats={stats} />
            )}

            {activeTab === "invitations" && (
              <TeamInvite
                onInvite={inviteMember}
                pendingInvitations={pendingInvitations}
                onCancelInvitation={cancelInvitation}
                isLoading={isLoading}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 text-center text-xs text-ink/50"
      >
        Team created {new Date(team.createdAt).toLocaleDateString()} · Last
        updated {new Date(team.updatedAt).toLocaleDateString()}
      </motion.div>
    </motion.div>
  );
}
