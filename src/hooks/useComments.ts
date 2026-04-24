"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getComments,
  postComment,
  toggleReaction,
  reportComment,
  type Comment,
  type CommentsPage,
} from "@/services/api";

export const commentKeys = {
  list: (username: string) => ["comments", username] as const,
};

/** Flat list of visible comments (hidden ones filtered out for non-moderators) */
function flattenVisible(page: CommentsPage): Comment[] {
  return page.comments.filter((c) => !c.hidden);
}

export function useComments(creatorUsername: string) {
  const queryClient = useQueryClient();
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const query = useQuery({
    queryKey: commentKeys.list(creatorUsername),
    queryFn: () => getComments(creatorUsername, cursor),
    staleTime: 30_000,
    enabled: !!creatorUsername,
  });

  const comments = query.data ? flattenVisible(query.data) : [];
  const hasMore = !!query.data?.nextCursor;

  const loadMore = useCallback(() => {
    if (query.data?.nextCursor) {
      setCursor(query.data.nextCursor);
      queryClient.invalidateQueries({ queryKey: commentKeys.list(creatorUsername) });
    }
  }, [query.data?.nextCursor, creatorUsername, queryClient]);

  // Post a new comment / reply
  const postMutation = useMutation({
    mutationFn: (vars: { body: string; parentId?: string }) =>
      postComment({ creatorUsername, ...vars }),
    onSuccess: (newComment) => {
      queryClient.setQueryData<CommentsPage>(
        commentKeys.list(creatorUsername),
        (old) => {
          if (!old) return { comments: [newComment], nextCursor: null };
          return { ...old, comments: [newComment, ...old.comments] };
        },
      );
    },
  });

  // Toggle emoji reaction (optimistic)
  const reactMutation = useMutation({
    mutationFn: (vars: { commentId: string; emoji: string }) => toggleReaction(vars),
    onMutate: async ({ commentId, emoji }) => {
      await queryClient.cancelQueries({ queryKey: commentKeys.list(creatorUsername) });
      const prev = queryClient.getQueryData<CommentsPage>(commentKeys.list(creatorUsername));

      queryClient.setQueryData<CommentsPage>(commentKeys.list(creatorUsername), (old) => {
        if (!old) return old;
        return {
          ...old,
          comments: old.comments.map((c) => {
            if (c.id !== commentId) return c;
            const already = c.myReactions.includes(emoji);
            return {
              ...c,
              myReactions: already
                ? c.myReactions.filter((e) => e !== emoji)
                : [...c.myReactions, emoji],
              reactions: {
                ...c.reactions,
                [emoji]: Math.max(0, (c.reactions[emoji] ?? 0) + (already ? -1 : 1)),
              },
            };
          }),
        };
      });

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(commentKeys.list(creatorUsername), ctx.prev);
      }
    },
  });

  // Report a comment (moderation)
  const reportMutation = useMutation({
    mutationFn: (commentId: string) => reportComment(commentId),
    onSuccess: (_data, commentId) => {
      // Optimistically hide the reported comment locally
      queryClient.setQueryData<CommentsPage>(commentKeys.list(creatorUsername), (old) => {
        if (!old) return old;
        return {
          ...old,
          comments: old.comments.map((c) =>
            c.id === commentId ? { ...c, hidden: true } : c,
          ),
        };
      });
    },
  });

  return {
    comments,
    isLoading: query.isLoading,
    isError: query.isError,
    hasMore,
    loadMore,
    postComment: postMutation.mutate,
    isPosting: postMutation.isPending,
    postError: postMutation.error?.message ?? null,
    toggleReaction: reactMutation.mutate,
    reportComment: reportMutation.mutate,
  };
}
