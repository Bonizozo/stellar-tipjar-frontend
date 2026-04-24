"use client";

import { RefundRequest } from "@/hooks/useRefunds";
import { Button } from "@/components/Button";

interface RefundStatusProps {
  refund: RefundRequest;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
  onProcess: (id: string) => void;
}

export function RefundStatusItem({ refund, onApprove, onDeny, onProcess }: RefundStatusProps) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold text-ink">Refund Request {refund.id}</span>
        <span className="text-sm text-ink/70">Status: {refund.status}</span>
      </div>
      <p className="text-sm text-ink/80">Tip ID: {refund.tipId}</p>
      <p className="text-sm text-ink/80">Amount: {refund.amount} XLM</p>
      <p className="text-sm text-ink/80">Requested: {new Date(refund.requestedAt).toLocaleString()}</p>
      {refund.creatorNote && <p className="text-sm text-ink/80">Creator Note: {refund.creatorNote}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        {refund.status === "pending" && (
          <>
            <Button onClick={() => onApprove(refund.id)}>Approve</Button>
            <Button variant="secondary" onClick={() => onDeny(refund.id)}>Deny</Button>
          </>
        )}
        {refund.status === "approved" && (
          <Button onClick={() => onProcess(refund.id)}>Mark as Processed</Button>
        )}
      </div>
    </div>
  );
}

interface RefundStatusListProps {
  requests: RefundRequest[];
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
  onProcess: (id: string) => void;
}

export function RefundStatusList({ requests, onApprove, onDeny, onProcess }: RefundStatusListProps) {
  if (requests.length === 0) {
    return <p className="text-sm text-ink/70">No refund requests found.</p>;
  }

  return (
    <div className="space-y-3">
      {requests.map((item) => (
        <RefundStatusItem
          key={item.id}
          refund={item}
          onApprove={onApprove}
          onDeny={onDeny}
          onProcess={onProcess}
        />
      ))}
    </div>
  );
}
