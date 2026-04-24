"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { commentSchema, type CommentSchemaValues } from "@/schemas";

interface CommentFormProps {
  onSubmit: (body: string) => void;
  isLoading?: boolean;
  error?: string | null;
  placeholder?: string;
  compact?: boolean;
  onCancel?: () => void;
}

const MAX_CHARS = 500;

export function CommentForm({
  onSubmit,
  isLoading,
  error,
  placeholder = "Leave a public message...",
  compact = false,
  onCancel,
}: CommentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentSchemaValues>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
  });

  const body = watch("body") ?? "";
  const remaining = MAX_CHARS - body.length;

  const onValid = (values: CommentSchemaValues) => {
    onSubmit(values.body);
    reset();
  };

  const displayError = errors.body?.message ?? error;

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate aria-label="Post a comment">
      <div className="relative">
        <textarea
          {...register("body")}
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
        <p id="comment-form-error" role="alert" className="mt-1 text-xs text-error">
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
