"use client";

import { useMemo } from "react";
import { Copy, Check, Glasses } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export interface TipGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  deadline?: Date;
  supporters: number;
}

function ProgressBar({ current, target }: { current: number; target: number }) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

function CompactWidget({ goal }: { goal: TipGoal }) {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
        {goal.title}
      </h3>
      <ProgressBar current={goal.currentAmount} target={goal.targetAmount} />
      <div className="flex justify-between items-center mt-2 text-xs text-gray-600 dark:text-gray-400">
        <span>
          {goal.currentAmount} / {goal.targetAmount} {goal.currency}
        </span>
        <span className="font-medium">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}

function StandardWidget({ goal }: { goal: TipGoal }) {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
        {goal.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {goal.description}
      </p>
      <ProgressBar current={goal.currentAmount} target={goal.targetAmount} />
      <div className="flex justify-between items-center mt-3 text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {goal.currentAmount} / {goal.targetAmount} {goal.currency}
        </span>
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
          {Math.round(percentage)}%
        </span>
      </div>
      {goal.supporters > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          {goal.supporters} supporter{goal.supporters !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

function DetailedWidget({ goal }: { goal: TipGoal }) {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-indigo-200 dark:border-gray-700 shadow-md">
      <div className="mb-4">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white">
          {goal.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {goal.description}
        </p>
      </div>

      <ProgressBar current={goal.currentAmount} target={goal.targetAmount} />

      <div className="grid grid-cols-3 gap-3 mt-4 text-center">
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Raised</p>
          <p className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
            {goal.currentAmount}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Remaining</p>
          <p className="font-bold text-lg text-gray-900 dark:text-white">
            {remaining}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Progress</p>
          <p className="font-bold text-lg text-purple-600 dark:text-purple-400">
            {Math.round(percentage)}%
          </p>
        </div>
      </div>

      {goal.deadline && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
          Deadline: {goal.deadline.toLocaleDateString()}
        </p>
      )}

      {goal.supporters > 0 && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
          {goal.supporters} supporter{goal.supporters !== 1 ? "s" : ""} contributing
        </p>
      )}
    </div>
  );
}

interface TipGoalWidgetProps {
  goal: TipGoal;
  variant?: "compact" | "standard" | "detailed";
  showEmbed?: boolean;
  showAR?: boolean;
}

export function TipGoalWidget({
  goal,
  variant = "standard",
  showEmbed = false,
  showAR = false,
}: TipGoalWidgetProps) {
  const [copied, setCopied] = useState(false);

  const embedCode = useMemo(() => {
    return `<iframe src="${typeof window !== "undefined" ? window.location.origin : ""}/widgets/goal/${goal.id}" width="400" height="300" frameborder="0"></iframe>`;
  }, [goal.id]);

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const widget =
    variant === "compact" ? (
      <CompactWidget goal={goal} />
    ) : variant === "detailed" ? (
      <DetailedWidget goal={goal} />
    ) : (
      <StandardWidget goal={goal} />
    );

  return (
    <div className="space-y-4">
      {widget}

      {showAR && (
        <Link
          href={`/ar?mode=goal&goalId=${goal.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900"
        >
          <Glasses className="h-4 w-4" />
          View in AR
        </Link>
      )}

      {showEmbed && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Embed Code
          </p>
          <div className="flex gap-2">
            <code className="flex-1 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto text-gray-600 dark:text-gray-400 font-mono">
              {embedCode}
            </code>
            <button
              onClick={handleCopyEmbed}
              className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-medium transition-colors"
              title="Copy embed code"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
