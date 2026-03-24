"use client";

import type { Tip } from "@/hooks/useTipHistory";

interface TipRowProps {
  tip: Tip;
}

const statusColors = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
};

const statusLabels = {
  completed: "Completed",
  pending: "Pending",
  failed: "Failed",
};

export function TipRow({ tip }: TipRowProps) {
  const formattedDate = new Date(tip.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <tr className="border-b border-ink/10 hover:bg-ink/5">
      <td className="px-4 py-3 text-sm text-ink">{formattedDate}</td>
      <td className="px-4 py-3 text-sm font-medium text-ink">{tip.amount} XLM</td>
      <td className="px-4 py-3 text-sm text-ink">
        <a
          href={`/creator/${tip.recipient}`}
          className="text-wave hover:underline"
        >
          @{tip.recipient}
        </a>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            statusColors[tip.status]
          }`}
        >
          {statusLabels[tip.status]}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-ink/60">
        {tip.memo || "-"}
      </td>
      <td className="px-4 py-3 text-sm">
        {tip.transactionHash ? (
          <a
            href={`https://stellar.expert/explorer/public/tx/${tip.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-wave hover:underline"
            title={tip.transactionHash}
          >
            {tip.transactionHash.slice(0, 8)}...
          </a>
        ) : (
          <span className="text-ink/40">-</span>
        )}
      </td>
    </tr>
  );
}
