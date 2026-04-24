"use client";

import { useState } from "react";
import Image from "next/image";
import { type Comment } from "@/services/api";
import { EmojiPicker } from "@/components/EmojiPicker";
import { CommentForm } from "@/components/CommentForm";

interface CommentCardProps {
  comment: Comment;
  replies: Comment[];
  onReact: (commentId: string, emoji: string) => void;
  onReport: (commentId: string) => void;
  onReply: (body: string, parentId: string) => void;
  isPostingReply?: boolean;
  replyError?: string | null;
  /** Indent level — replies are indented once */
  depth?: number;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function CommentCard({
  comment,
  replies,
  onReact,
  onReport,
  onReply,
  isPostingReply,
  replyError,
  depth = 0,
}: CommentCardProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [reported, setReported] = useState(false);

  const handleReport = () => {
    if (reported) return;
    setReported(true);
    onReport(comment.id);
  };

  const handleReply = (body: string) => {
    onReply(body, comment.id);
    setShowReplyForm(false);
  };

  return (
    <article
      aria-label={`Comment by ${comment.displayName}`}
      className={`${depth > 0 ? "ml-8 border-l-2 border-wave/20 pl-4" : ""}`}
    >
      <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
        {/* Author row */}
        <div className="flex items-start gap-3">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-wave/20">
            <Image
              src={comment.avatarUrl}
              alt={`Avatar for ${comment.displayName}`}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-semibold text-ink">{comment.displayName}</span>
              <span className="text-xs text-ink/40">@{comment.username}</span>
              <time
                dateTime={comment.createdAt}
                className="ml-auto text-xs text-ink/40"
                title={new Date(comment.createdAt).toLocaleString()}
              >
                {timeAgo(comment.createdAt)}
              </time>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-ink/80">{comment.body}</p>
          </div>
        </div>

        {/* Actions row */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {/* Existing reactions */}
          {Object.entries(comment.reactions)
            .filter(([, count]) => count > 0)
            .map(([emoji, count]) => (
              <button
                key={emoji}
                type="button"
                onClick={() => onReact(comment.id, emoji)}
                aria-label={`${count} ${emoji} reaction${count !== 1 ? "s" : ""}. Click to toggle.`}
                aria-pressed={comment.myReactions.includes(emoji)}
                className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors ${
                  comment.myReactions.includes(emoji)
                    ? "border-wave/40 bg-wave/10 text-wave"
                    : "border-ink/15 text-ink/60 hover:border-wave/30 hover:bg-wave/5"
                }`}
              >
                <span aria-hidden="true">{emoji}</span>
                <span>{count}</span>
              </button>
            ))}

          {/* Add reaction */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPicker((v) => !v)}
              aria-label="Add emoji reaction"
              aria-expanded={showPicker}
              className="rounded-full border border-ink/15 px-2 py-0.5 text-xs text-ink/50 transition-colors hover:border-wave/30 hover:text-wave"
            >
              + 😊
            </button>
            {showPicker && (
              <EmojiPicker
                selected={comment.myReactions}
                onSelect={(emoji) => onReact(comment.id, emoji)}
                onClose={() => setShowPicker(false)}
              />
            )}
          </div>

          {/* Reply (only top-level comments can be replied to) */}
          {depth === 0 && (
            <button
              type="button"
              onClick={() => setShowReplyForm((v) => !v)}
              aria-expanded={showReplyForm}
              className="ml-1 text-xs text-ink/50 transition-colors hover:text-wave"
            >
              Reply
            </button>
          )}

          {/* Report */}
          <button
            type="button"
            onClick={handleReport}
            disabled={reported}
            aria-label={reported ? "Comment reported" : "Report this comment"}
            className="ml-auto text-xs text-ink/30 transition-colors hover:text-error disabled:opacity-50"
          >
            {reported ? "Reported" : "Report"}
          </button>
        </div>

        {/* Inline reply form */}
        {showReplyForm && (
          <div className="mt-3 border-t border-ink/10 pt-3">
            <CommentForm
              onSubmit={handleReply}
              isLoading={isPostingReply}
              error={replyError}
              placeholder={`Reply to ${comment.displayName}...`}
              compact
              onCancel={() => setShowReplyForm(false)}
            />
          </div>
        )}
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              replies={[]}
              onReact={onReact}
              onReport={onReport}
              onReply={onReply}
              depth={1}
            />
          ))}
        </div>
      )}
    </article>
  );
}
