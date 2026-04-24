"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCreatorEvents,
  createCreatorEvent,
  deleteCreatorEvent,
  type CreatorEvent,
} from "@/services/api";

export const calendarKeys = {
  list: (username: string) => ["calendar", username] as const,
};

export function useCalendar(creatorUsername: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: calendarKeys.list(creatorUsername),
    queryFn: () => getCreatorEvents(creatorUsername),
    staleTime: 60_000,
    enabled: !!creatorUsername,
  });

  const createMutation = useMutation({
    mutationFn: (payload: Omit<CreatorEvent, "id">) => createCreatorEvent(payload),
    onSuccess: (newEvent) => {
      queryClient.setQueryData<CreatorEvent[]>(
        calendarKeys.list(creatorUsername),
        (old) => (old ? [newEvent, ...old] : [newEvent]),
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (eventId: string) => deleteCreatorEvent(eventId),
    onMutate: async (eventId) => {
      await queryClient.cancelQueries({ queryKey: calendarKeys.list(creatorUsername) });
      const prev = queryClient.getQueryData<CreatorEvent[]>(calendarKeys.list(creatorUsername));
      queryClient.setQueryData<CreatorEvent[]>(
        calendarKeys.list(creatorUsername),
        (old) => old?.filter((e) => e.id !== eventId) ?? [],
      );
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(calendarKeys.list(creatorUsername), ctx.prev);
    },
  });

  // Upcoming events sorted by start time
  const upcomingEvents = (query.data ?? [])
    .filter((e) => new Date(e.startIso) >= new Date())
    .sort((a, b) => new Date(a.startIso).getTime() - new Date(b.startIso).getTime());

  // Past events
  const pastEvents = (query.data ?? [])
    .filter((e) => new Date(e.startIso) < new Date())
    .sort((a, b) => new Date(b.startIso).getTime() - new Date(a.startIso).getTime());

  return {
    events: query.data ?? [],
    upcomingEvents,
    pastEvents,
    isLoading: query.isLoading,
    isError: query.isError,
    createEvent: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error?.message ?? null,
    deleteEvent: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}
