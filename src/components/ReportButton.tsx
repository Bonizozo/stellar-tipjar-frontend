"use client";

import { useState } from "react";
import { ReportModal } from "@/components/ReportModal";

interface ReportButtonProps {
  targetUser: string;
  className?: string;
}

export function ReportButton({ targetUser, className = "" }: ReportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Report @${targetUser}`}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-ink/15 px-3 py-2 text-sm font-medium text-ink/50 transition-colors hover:border-error/40 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/40 ${className}`}
      >
        <span aria-hidden="true">⚑</span> Report
      </button>

      {open && <ReportModal targetUser={targetUser} onClose={() => setOpen(false)} />}
    </>
  );
}
