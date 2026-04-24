"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { motion } from "framer-motion";
import { PaperAirplaneIcon, CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface TeamInviteProps {
  onInvite: (email: string) => void;
  pendingInvitations?: Array<{ id: string; email: string; status: string }>;
  onCancelInvitation?: (id: string) => void;
  isLoading?: boolean;
}

export function TeamInvite({
  onInvite,
  pendingInvitations = [],
  onCancelInvitation,
  isLoading = false,
}: TeamInviteProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter an email address." });
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    // Check if already invited
    if (pendingInvitations.some((inv) => inv.email === email.trim())) {
      setMessage({ type: "error", text: "This email has already been invited." });
      return;
    }

    setIsSubmitting(true);
    try {
      onInvite(email.trim());
      setMessage({ type: "success", text: `Invitation sent to ${email}` });
      setEmail("");

      // Auto-clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to send invitation.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6 space-y-4">
      <div>
        <h3 className="font-semibold text-ink">Invite Team Members</h3>
        <p className="text-sm text-ink/60 mt-1">Send invitations to collaborate and share revenue</p>
      </div>

      {/* Invitation form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage(null);
          }}
          placeholder="colleague@example.com"
          disabled={isSubmitting || isLoading}
          className="flex-1 rounded-lg border border-ink/20 px-4 py-2.5 text-sm placeholder:text-ink/40 focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave/20 disabled:opacity-50"
          aria-label="Email to invite"
        />
        <Button
          type="submit"
          disabled={!email.trim() || isSubmitting || isLoading}
          className="flex items-center justify-center gap-2 whitespace-nowrap sm:w-auto"
        >
          <PaperAirplaneIcon className="h-4 w-4" />
          <span>Send Invite</span>
        </Button>
      </form>

      {/* Messages */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
            message.type === "success"
              ? "bg-moss/10 text-moss"
              : "bg-error/10 text-error"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircleIcon className="h-4 w-4 flex-shrink-0" />
          ) : (
            <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0" />
          )}
          <p>{message.text}</p>
        </motion.div>
      )}

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-ink/70 mb-2">
            Pending Invitations ({pendingInvitations.length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {pendingInvitations.map((invitation, index) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between rounded-lg bg-ink/5 p-3"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wave/10 flex-shrink-0">
                    <PaperAirplaneIcon className="h-4 w-4 text-wave" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink line-clamp-1">{invitation.email}</p>
                    <Badge variant="secondary" className="inline-flex mt-1">
                      {invitation.status === "pending" ? "⏳ Pending" : "✓ Accepted"}
                    </Badge>
                  </div>
                </div>
                {invitation.status === "pending" && onCancelInvitation && (
                  <button
                    onClick={() => onCancelInvitation(invitation.id)}
                    disabled={isLoading}
                    className="ml-2 p-1.5 text-ink/60 hover:text-error rounded-lg hover:bg-error/10 transition disabled:opacity-50"
                    aria-label={`Cancel invitation to ${invitation.email}`}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Help text */}
      <p className="text-xs text-ink/50">
        💡 Invited members will receive an email with a link to join your team. They can choose their role and confirm their participation.
      </p>
    </div>
  );
}
