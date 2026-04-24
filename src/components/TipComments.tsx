"use client";

import { useComments } from "@/hooks/useComments";
import { CommentCard } from "@/components/CommentCard";
import { CommentForm } from "@/components/CommentForm";
import { Button } from "@/components/Button";
import type { Comment } from "@/services/api";

interface TipCommentsProps {
  creatorUsername: string;
}

/** Groups flat comment list into top-level + replies map */
function groupComments(comments: Comment[]): {
  topLevel: Comment[];
  repliesById: Map<string, Comment[]>;
} {
  const topLevel: Comment[] = [];
  const repliesById = new Map<string, Comment[]>();

  for (const c of comments) {
    if (c.parentId === null) {
      topLevel.push(c);
    } else {
      const bucket = repliesById.get(c.parentId) ?? [];
      bucket.push(c);
      repliesById.set(c.parentId, bucket);
    }
  }

  return { topLevel, repliesById };
}

export function TipComments({ creatorUsername }: TipCommentsProps) {
  const {
    comments,
    isLoading,
    isError,
    hasMore,
    loadMore,
    postComment,
    isPosting,
    postError,
    toggleReaction,
    reportComment,
  } = useComments(creatorUsername);

  const { topLevel, repliesById } = groupComments(comments);

  return (
    <section aria-labelledby="comments-heading" className="space-y-6">
      <h2 id="comments-heading" className="text-xl font-semibold text-ink">
        Community Messages
        {comments.length > 0 && (
          <span className="ml-2 text-sm font-normal text-ink/50">({comments.length})</span>
        )}
      </h2>

      {/* New comment form */}
      <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-5 shadow-card">
        <p className="mb-3 text-sm text-ink/60">
          Leave a public message for {creatorUsername} and the community.
        </p>
        <CommentForm
          onSubmit={(body) => postComment({ body })}
          isLoading={isPosting}
          error={postError}
        />
      </div>

      {/* States */}
      {isLoading && (
        <div className="space-y-3" aria-busy="true" aria-label="Loading comments">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl border border-ink/10 bg-ink/5"
            />
          ))}
        </div>
      )}

      {isError && (
        <p role="alert" className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
          Failed to load comments. Please refresh the page.
        </p>
      )}

      {!isLoading && !isError && topLevel.length === 0 && (
        <p className="text-sm text-ink/50">No messages yet — be the first!</p>
      )}

      {/* Comment list */}
      {!isLoading && (
        <div className="space-y-4">
          {topLevel.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              replies={repliesById.get(comment.id) ?? []}
              onReact={(commentId, emoji) => toggleReaction({ commentId, emoji })}
              onReport={(commentId) => reportComment(commentId)}
              onReply={(body, parentId) => postComment({ body, parentId })}
              isPostingReply={isPosting}
              replyError={postError}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={loadMore}>
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
