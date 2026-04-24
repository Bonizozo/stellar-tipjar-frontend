"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityItem, ActivityType, getActivityFeed } from "@/services/activityService";
import { useWebSocket } from "@/hooks/useWebSocket";

export function useActivityFeed(creator?: string) {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [filter, setFilter] = useState<ActivityType | "all">("all");
  const [loading, setLoading] = useState(true);

  const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
  const { socketRef, status } = useWebSocket({ url: wsUrl });

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    const data = await getActivityFeed(creator);
    setItems(data);
    setLoading(false);
  }, [creator]);

  useEffect(() => { fetchFeed(); }, [fetchFeed]);

  // Real-time: prepend new activities pushed from the server
  const filterRef = useRef(filter);
  filterRef.current = filter;

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleActivity = (item: ActivityItem) => {
      if (creator && item.creator !== creator) return;
      setItems((prev) => [item, ...prev]);
    };

    socket.on("activity:new", handleActivity);
    return () => { socket.off("activity:new", handleActivity); };
  }, [socketRef, creator]);

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);

  return { items: filtered, filter, setFilter, loading, connectionStatus: status, refresh: fetchFeed };
}
