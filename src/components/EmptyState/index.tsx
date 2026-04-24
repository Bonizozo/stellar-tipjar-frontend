"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { Button } from "@/components/Button";
import {
  NoResultsIllustration,
  NoDataIllustration,
  ErrorIllustration,
  OfflineIllustration,
} from "./illustrations";

type EmptyStateVariant = "no-results" | "no-data" | "error" | "offline";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
}

const illustrations: Record<EmptyStateVariant, ReactNode> = {
  "no-results": <NoResultsIllustration />,
  "no-data": <NoDataIllustration />,
  error: <ErrorIllustration />,
  offline: <OfflineIllustration />,
};

export function EmptyState({
  variant = "no-data",
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-64 h-64 mb-6 text-gray-400 dark:text-gray-600">
        {icon || illustrations[variant]}
      </div>
      <h3 className="text-2xl font-bold text-ink dark:text-ink-dark mb-2 text-center">
        {title}
      </h3>
      <p className="text-ink/70 dark:text-ink-dark/70 text-center max-w-md mb-6">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
