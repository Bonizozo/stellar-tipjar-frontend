"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/Button";

interface CommentFormProps {
  onSubmit: (body: string) => void;
  isLoading?: boolean;
  error?: string | null;
  placeholder?: string;
  /** When set, renders as a compact inline reply form */
  compact?: boolean;
  onCancel?: () => void;
}

const MAX_CHARS = 500;

// Basic profanity/spam filter — blocks obvious patterns
const BLOCKED = [/\bspam\b/i, /buy cheap/i, /click here/i, /free money/i];

function isFlagged(text: string): boolean {
  return BLOCKED.some((re) => re.test(text));
}

export function CommentForm({
  onSubmit,
  isLoading,
  error,
  placeholder = "Leave a public message...",
  compact = false,
  onCancel,
}: CommentFormProps) {
  const [body, setBody] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const remaining = MAX_CHARS - body.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) {
      setLocalError("Message cannot be empty.");
      return;
    }
    if (trimmed.length > MAX_CHARS) {
      setLocalError(`Message must be ${MAX_CHARS} characters or fewer.`);
      return;
    }
    if (isFlagged(trimmed)) {
      setLocalError("Your message was flagged as potential spam. Please revise it.");
      return;
    }
    setLocalError(null);
    onSubmit(trimmed);
    setBody("");
  };

  const displayError = localError ?? error;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Post a comment">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            if (localError) setLocalError(null);
          }}
          placeholder={placeholder}
          maxLength={MAX_CHARS}
          rows={compact ? 2 : 3}
          aria-label="Comment text"
          aria-invalid={!!displayError}
          aria-describedby={displayError ? "comment-form-error" : undefined}
          className={`w-full resize-none rounded-xl border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 ${
            displayError ? "border-error/60 focus:ring-error/30" : "border-ink/20 focus:ring-wave/30"
          }`}
        />
        <span
          aria-live="polite"
          className={`absolute bottom-2 right-3 text-xs ${remaining < 50 ? "text-error" : "text-ink/30"}`}
        >
          {remaining}
        </span>
      </div>

      {displayError && (
        <p
          id="comment-form-error"
          role="alert"
          className="mt-1 text-xs text-error"
        >
          {displayError}
        </p>
      )}

      <div className="mt-2 flex items-center gap-2">
        <Button
          type="submit"
          disabled={isLoading || !body.trim()}
          aria-busy={isLoading}
          className={compact ? "px-3 py-1.5 text-xs" : ""}
        >
          {isLoading ? "Posting..." : "Post"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className={compact ? "px-3 py-1.5 text-xs" : ""}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
