"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { TipGoal } from "@/components/TipGoalWidget";

// Dynamically import AR components to avoid SSR issues with WebXR
const ARViewer = dynamic(
  () => import("@/components/ar/ARViewer").then((m) => ({ default: m.ARViewer })),
  { ssr: false, loading: () => <ARLoadingFallback /> }
);
const ARTipGoal = dynamic(
  () => import("@/components/ar/ARTipGoal").then((m) => ({ default: m.ARTipGoal })),
  { ssr: false }
);
const ARCreatorProfile = dynamic(
  () => import("@/components/ar/ARCreatorProfile").then((m) => ({ default: m.ARCreatorProfile })),
  { ssr: false }
);

function ARLoadingFallback() {
  return (
    <div className="flex min-h-[300px] items-center justify-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      <span className="text-sm text-gray-600 dark:text-gray-400">Loading AR…</span>
    </div>
  );
}

// Demo data used when no query params are provided
const DEMO_GOAL: TipGoal = {
  id: "demo-goal",
  title: "New Studio Equipment",
  description: "Help me upgrade my recording setup for better content.",
  targetAmount: 500,
  currentAmount: 320,
  currency: "XLM",
  supporters: 42,
};

const DEMO_CREATOR = {
  username: "demo_creator",
  displayName: "Demo Creator",
  bio: "Making awesome content on the Stellar network.",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo_creator",
  isVerified: true,
  tipsReceived: 1240,
  supporters: 87,
};

type ARMode = "goal" | "profile";

function ARPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = (searchParams.get("mode") as ARMode) ?? "goal";
  const [activeMode, setActiveMode] = useState<ARMode>(mode);
  const [arActive, setArActive] = useState(false);

  if (arActive) {
    return (
      <ARViewer onClose={() => setArActive(false)}>
        {activeMode === "goal" ? (
          // ARTipGoal in DOM-overlay mode doesn't need session/referenceSpace
          // when rendered as a child of ARViewer (overlay is handled by ARViewer)
          <div className="pointer-events-none fixed inset-0 flex items-end justify-center pb-24">
            <div className="w-80 rounded-2xl bg-black/70 p-5 text-white backdrop-blur-md">
              <h2 className="mb-1 text-lg font-bold">{DEMO_GOAL.title}</h2>
              <p className="mb-3 text-xs text-white/70">{DEMO_GOAL.description}</p>
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
                  style={{
                    width: `${Math.min((DEMO_GOAL.currentAmount / DEMO_GOAL.targetAmount) * 100, 100)}%`,
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
              </div>
              <div className="mt-3 flex justify-between text-sm">
                <span className="font-semibold text-indigo-300">
                  {DEMO_GOAL.currentAmount} {DEMO_GOAL.currency}
                </span>
                <span className="font-bold text-purple-300">
                  {Math.round((DEMO_GOAL.currentAmount / DEMO_GOAL.targetAmount) * 100)}%
                </span>
                <span className="text-white/60">
                  / {DEMO_GOAL.targetAmount} {DEMO_GOAL.currency}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <ARCreatorProfile {...DEMO_CREATOR} />
        )}
      </ARViewer>
    );
  }

  return (
    <section className="mx-auto max-w-lg space-y-8 px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AR Experience</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          View tip goals and creator profiles in augmented reality using your device camera.
        </p>
      </div>

      {/* Mode selector */}
      <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {(["goal", "profile"] as ARMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setActiveMode(m)}
            className={`flex-1 py-2.5 text-sm font-medium capitalize transition-colors ${
              activeMode === m
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {m === "goal" ? "Tip Goal" : "Creator Profile"}
          </button>
        ))}
      </div>

      {/* Preview card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {activeMode === "goal" ? (
          <div className="space-y-3">
            <h2 className="font-bold text-gray-900 dark:text-white">{DEMO_GOAL.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{DEMO_GOAL.description}</p>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                style={{
                  width: `${Math.min((DEMO_GOAL.currentAmount / DEMO_GOAL.targetAmount) * 100, 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                {DEMO_GOAL.currentAmount} / {DEMO_GOAL.targetAmount} {DEMO_GOAL.currency}
              </span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {Math.round((DEMO_GOAL.currentAmount / DEMO_GOAL.targetAmount) * 100)}%
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEMO_CREATOR.avatarUrl}
              alt={DEMO_CREATOR.displayName}
              className="h-14 w-14 rounded-full ring-2 ring-purple-400"
            />
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{DEMO_CREATOR.displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">@{DEMO_CREATOR.username}</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{DEMO_CREATOR.bio}</p>
            </div>
          </div>
        )}
      </div>

      {/* Launch AR button */}
      <button
        onClick={() => setArActive(true)}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90 active:opacity-80"
      >
        Launch AR View
      </button>

      <button
        onClick={() => router.back()}
        className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        Go Back
      </button>
    </section>
  );
}

export default function ARPage() {
  return (
    <Suspense fallback={<ARLoadingFallback />}>
      <ARPageContent />
    </Suspense>
  );
}
